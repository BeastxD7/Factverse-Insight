# Production Deployment Guide — Factverse Insights

> Explained simply. No assumed knowledge. Every command copy-pasteable.
> Target setup: one Ubuntu VM + Nginx reverse proxy + Docker for database + PM2 for processes.

---

## Table of Contents

1. [How the Production Architecture Works](#1-how-the-production-architecture-works)
2. [What You Need Before Starting](#2-what-you-need-before-starting)
3. [Step 1 — Set Up the VM](#3-step-1--set-up-the-vm)
4. [Step 2 — Install Everything](#4-step-2--install-everything)
5. [Step 3 — Get the Code on the Server](#5-step-3--get-the-code-on-the-server)
6. [Step 4 — Environment Variables (The Most Important Step)](#6-step-4--environment-variables-the-most-important-step)
7. [Step 5 — Start the Database and Redis](#7-step-5--start-the-database-and-redis)
8. [Step 6 — Set Up the Database](#8-step-6--set-up-the-database)
9. [Step 7 — Build the Apps](#9-step-7--build-the-apps)
10. [Step 8 — Run the Apps with PM2](#10-step-8--run-the-apps-with-pm2)
11. [Step 9 — Configure Nginx](#11-step-9--configure-nginx)
12. [Step 10 — SSL Certificate (HTTPS)](#12-step-10--ssl-certificate-https)
13. [Security Checklist](#13-security-checklist)
14. [How to Update / Redeploy](#14-how-to-update--redeploy)
15. [Scaling Architecture](#15-scaling-architecture)
16. [Monitoring & Logs](#16-monitoring--logs)
17. [Troubleshooting](#17-troubleshooting)

---

## 1. How the Production Architecture Works

Before touching the server, understand what's actually running and how traffic flows.

```
INTERNET
   │
   │  (port 80 / 443 — the only ports open to internet)
   ▼
NGINX  (reverse proxy — the "bouncer" at the door)
   │
   ├──── /          → Next.js app    (port 3000, internal only)
   │
   └──── /api/v1/   → Express server (port 3001, internal only)

NEXT.JS (port 3000)
   │
   └──── talks to Express server internally at http://localhost:3001

EXPRESS SERVER (port 3001)
   │
   ├──── PostgreSQL (port 5432, internal only, via Docker)
   │
   └──── Redis      (port 6379, internal only, via Docker)
```

**The key rule:** Only Nginx talks to the internet. Everything else (Express, PostgreSQL, Redis) is locked to `localhost` — nobody outside the VM can reach them directly.

Think of it like a restaurant:
- **Nginx** = the front door and host — customers only talk to the host
- **Next.js** = the dining room — serves pages to customers
- **Express** = the kitchen — does the real work, never seen by customers
- **PostgreSQL** = the fridge — stores everything, never leaves the kitchen
- **Redis** = the chef's notepad — temporary fast storage for job queues

---

## 2. What You Need Before Starting

### Things to have ready:
- [ ] A domain name pointing to your VM's IP address (e.g. `factverseinsights.com` → `123.45.67.89`)
- [ ] A VM with at least **2 CPU cores, 4GB RAM, 40GB disk** (DigitalOcean, Hetzner, AWS EC2, etc.)
- [ ] Ubuntu 22.04 LTS on the VM (recommended)
- [ ] SSH access to the VM
- [ ] Your API keys ready (Azure OpenAI, Pexels, etc.)
- [ ] Your GitHub repo URL

### Recommended VM providers (cheapest to most expensive):
- **Hetzner CX22** — €4/month, 2 vCPU, 4GB RAM (best value)
- **DigitalOcean Basic** — $12/month, 2 vCPU, 2GB RAM
- **AWS EC2 t3.small** — ~$15/month, 2 vCPU, 2GB RAM

---

## 3. Step 1 — Set Up the VM

### Connect to your VM:
```bash
ssh root@YOUR_VM_IP_ADDRESS
```

### Create a non-root user (never run as root in production):
```bash
# Create a user called "deploy"
adduser deploy

# Give them sudo access
usermod -aG sudo deploy

# Copy your SSH key to the new user (so you can SSH as deploy)
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy

# Switch to the deploy user
su - deploy
```

### Set up a basic firewall:
```bash
# Allow SSH (so you don't lock yourself out!)
sudo ufw allow OpenSSH

# Allow HTTP and HTTPS (Nginx)
sudo ufw allow 80
sudo ufw allow 443

# Turn on the firewall
sudo ufw enable

# Check it's working
sudo ufw status
```

**What this does:** Only ports 22 (SSH), 80 (HTTP), and 443 (HTTPS) are open to the internet. Ports 3000, 3001, 5432, 6379 are all blocked from outside.

---

## 4. Step 2 — Install Everything

Run these commands on your VM as the `deploy` user:

### Install Bun:
```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Verify it works
bun --version
```

### Install Node.js 20 (needed for some tooling):
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # should say v20.x.x
```

### Install Docker (for PostgreSQL and Redis):
```bash
# Install Docker
curl -fsSL https://get.docker.com | sudo sh

# Let the deploy user run Docker without sudo
sudo usermod -aG docker deploy

# Log out and back in for this to take effect
exit
ssh deploy@YOUR_VM_IP_ADDRESS

# Verify Docker works
docker --version
```

### Install PM2 (keeps your apps running forever):
```bash
# PM2 is a process manager — it restarts your app if it crashes
# and starts it automatically when the VM reboots
sudo npm install -g pm2
pm2 --version
```

### Install Nginx (reverse proxy):
```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx  # start automatically on reboot

# Test: open http://YOUR_VM_IP in browser — you should see "Welcome to nginx"
```

### Install Python dependencies (needed for YouTube transcript fetching):
```bash
sudo apt install python3 python3-pip -y
pip3 install youtube-transcript-api yt-dlp
```

### Install Git:
```bash
sudo apt install git -y
```

---

## 5. Step 3 — Get the Code on the Server

```bash
# Go to the home directory
cd ~

# Clone your repo
git clone git@github.com:BeastxD7/NewsForge.git factverse
# OR use HTTPS if you haven't set up SSH keys:
# git clone https://github.com/BeastxD7/NewsForge.git factverse

cd factverse

# Install all dependencies
bun install
```

---

## 6. Step 4 — Environment Variables (The Most Important Step)

This is where most people mess up. This monorepo needs **4 separate `.env` files** in different locations. Each process reads its own file.

> Think of .env files like instruction sheets. The Next.js app reads one sheet, the Express server reads another, the database tools read a third. They don't share.

### Which file goes where:

```
news-app/
├── .env                          ← Root .env — used by Prisma CLI and Docker tools
├── packages/db/.env              ← Copy of root .env — Prisma needs its own copy
├── apps/server/.env              ← Express server — ALL server-side secrets
└── apps/web/.env.local           ← Next.js — only public URL + auth + API secret
```

---

### File 1: Root `.env`

```bash
nano ~/factverse/.env
```

Paste this (replace ALL values with your real ones):

```env
# ── Database ──────────────────────────────────────────────────────────────────
DATABASE_URL=postgresql://news:CHANGE_THIS_STRONG_PASSWORD@localhost:5432/newsapp

# ── Redis ─────────────────────────────────────────────────────────────────────
REDIS_URL=redis://localhost:6379

# ── Auth ──────────────────────────────────────────────────────────────────────
NEXTAUTH_SECRET=PASTE_64_RANDOM_CHARS_HERE
NEXTAUTH_URL=https://www.factverseinsights.com

# ── Express Server ────────────────────────────────────────────────────────────
PORT=3001
NODE_ENV=production
API_SECRET=PASTE_ANOTHER_64_RANDOM_CHARS_HERE

# ── AI Providers ──────────────────────────────────────────────────────────────
AZURE_OPENAI_API_KEY=your-azure-key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_VERSION=2025-01-01-preview
GROQ_API_KEY=
OPENROUTER_API_KEY=

# ── Content APIs ──────────────────────────────────────────────────────────────
PEXELS_API_KEY=your-pexels-key
NEWSAPI_KEY=
GNEWS_API_KEY=
YOUTUBE_API_KEY=

# ── Frontend ──────────────────────────────────────────────────────────────────
NEXT_PUBLIC_API_URL=https://www.factverseinsights.com
```

**How to generate random secrets:**
```bash
# Run this twice — once for NEXTAUTH_SECRET, once for API_SECRET
openssl rand -base64 48
```

---

### File 2: `packages/db/.env` (exact copy of root .env — Prisma CLI needs this)

```bash
cp ~/factverse/.env ~/factverse/packages/db/.env
```

---

### File 3: `apps/server/.env` (Express server — copy of root .env)

```bash
cp ~/factverse/.env ~/factverse/apps/server/.env
```

---

### File 4: `apps/web/.env.local` (Next.js — only what the web app needs)

```bash
nano ~/factverse/apps/web/.env.local
```

```env
# The public URL of your API (goes through Nginx, NOT direct to Express port)
NEXT_PUBLIC_API_URL=https://www.factverseinsights.com

# NextAuth — must match exactly
NEXTAUTH_SECRET=SAME_VALUE_AS_ROOT_ENV
NEXTAUTH_URL=https://www.factverseinsights.com

# Internal secret shared between Next.js and Express
API_SECRET=SAME_VALUE_AS_ROOT_ENV

# Database (Next.js needs this for Auth.js to look up users)
DATABASE_URL=postgresql://news:CHANGE_THIS_STRONG_PASSWORD@localhost:5432/newsapp

# Pexels (for cover image picker in admin)
PEXELS_API_KEY=your-pexels-key
```

> **Why does Next.js need DATABASE_URL?** Because Auth.js (NextAuth) looks up users directly in the database to verify passwords. It bypasses the Express API for auth.

---

### Update the Docker Compose database password

The Docker Compose file creates the PostgreSQL user with password `news` by default. Change this to match your `DATABASE_URL`:

```bash
nano ~/factverse/docker-compose.yml
```

Change:
```yaml
POSTGRES_PASSWORD: news
```
To:
```yaml
POSTGRES_PASSWORD: CHANGE_THIS_STRONG_PASSWORD
```

---

## 7. Step 5 — Start the Database and Redis

```bash
cd ~/factverse

# Start PostgreSQL and Redis in the background
docker compose up -d

# Check they're running (both should say "healthy")
docker compose ps

# Wait 10 seconds, then verify PostgreSQL is accepting connections
docker exec newsapp_postgres pg_isready -U news -d newsapp
```

You should see: `localhost:5432 - accepting connections`

---

## 8. Step 6 — Set Up the Database

```bash
cd ~/factverse

# Apply all database migrations (creates all tables)
bun run db:migrate

# Seed the database (creates admin user, default categories, AI config)
bun run db:seed
```

After seeding, you'll have a default admin account. Check the seed file to see the default email/password, then **change the password immediately** after your first login.

---

## 9. Step 7 — Build the Apps

```bash
cd ~/factverse

# Build the Express server (compiles TypeScript to JavaScript)
bun run --filter './apps/server' build

# Build the Next.js app (creates optimised production bundle)
bun run --filter './apps/web' build
```

The build step for Next.js will take 1–3 minutes. It pre-renders all static pages and optimises all JavaScript.

**If the build fails:** 99% of the time it's a missing environment variable. Check `apps/web/.env.local` has all required values.

---

## 10. Step 8 — Run the Apps with PM2

PM2 is like a babysitter for your apps. If an app crashes, PM2 restarts it. When the VM reboots, PM2 starts all apps automatically.

### Start the Express server:
```bash
cd ~/factverse/apps/server

pm2 start dist/index.js \
  --name "factverse-server" \
  --env production \
  --max-memory-restart 500M

pm2 logs factverse-server --lines 20
# Should see: "Server running on port 3001"
```

### Start the Next.js app:
```bash
cd ~/factverse/apps/web

pm2 start "bun run start" \
  --name "factverse-web" \
  --env production \
  --max-memory-restart 800M

pm2 logs factverse-web --lines 20
# Should see: "Ready - started server on 0.0.0.0:3000"
```

### Save the PM2 process list (so it survives reboots):
```bash
pm2 save

# Set PM2 to start on system boot
pm2 startup
# This prints a command — COPY and RUN that command (it needs sudo)
# It looks like: sudo env PATH=... pm2 startup systemd -u deploy --hp /home/deploy
```

### Useful PM2 commands:
```bash
pm2 list                    # see all running apps + CPU/memory
pm2 logs factverse-web      # live logs for Next.js
pm2 logs factverse-server   # live logs for Express
pm2 restart factverse-web   # restart Next.js
pm2 restart factverse-server # restart Express
pm2 stop all                # stop everything
pm2 monit                   # real-time dashboard
```

---

## 11. Step 9 — Configure Nginx

Nginx sits in front of everything. It receives all traffic on port 80/443 and forwards it to the right app.

### Create the Nginx config file:
```bash
sudo nano /etc/nginx/sites-available/factverse
```

Paste this entire config:

```nginx
# Redirect all HTTP traffic to HTTPS
server {
    listen 80;
    server_name factverseinsights.com www.factverseinsights.com;
    return 301 https://$host$request_uri;
}

# Main HTTPS server
server {
    listen 443 ssl http2;
    server_name factverseinsights.com www.factverseinsights.com;

    # SSL certificates (Certbot fills these in — see Step 10)
    ssl_certificate     /etc/letsencrypt/live/factverseinsights.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/factverseinsights.com/privkey.pem;

    # Strong SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;

    # Max upload size (for image uploads)
    client_max_body_size 10M;

    # Security headers (belt-and-suspenders alongside Next.js headers)
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;

    # ── API routes → Express server (port 3001) ────────────────────────────
    location /api/v1/ {
        proxy_pass         http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;  # long timeout for AI generation
    }

    # ── Everything else → Next.js (port 3000) ─────────────────────────────
    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # ── Gzip compression (makes pages load faster) ─────────────────────────
    gzip on;
    gzip_types text/plain text/css application/json application/javascript
               text/xml application/xml application/xml+rss text/javascript
               image/svg+xml;
    gzip_min_length 1000;
    gzip_comp_level 6;

    # ── Access logs ────────────────────────────────────────────────────────
    access_log /var/log/nginx/factverse_access.log;
    error_log  /var/log/nginx/factverse_error.log;
}
```

### Enable the config and test it:
```bash
# Enable the site (creates a symlink)
sudo ln -s /etc/nginx/sites-available/factverse /etc/nginx/sites-enabled/

# Remove the default Nginx page
sudo rm -f /etc/nginx/sites-enabled/default

# Test the config for syntax errors
sudo nginx -t
# Should say: "syntax is ok" and "test is successful"

# Apply the config
sudo systemctl reload nginx
```

---

## 12. Step 10 — SSL Certificate (HTTPS)

HTTPS is not optional. Google won't rank HTTP sites. Install a free SSL certificate from Let's Encrypt using Certbot.

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get a certificate for your domain
# This automatically edits your Nginx config too
sudo certbot --nginx -d factverseinsights.com -d www.factverseinsights.com

# Follow the prompts:
# - Enter your email address
# - Agree to terms of service
# - Choose option 2 (redirect HTTP to HTTPS)
```

Certbot auto-renews certificates every 90 days. Verify auto-renewal works:
```bash
sudo certbot renew --dry-run
# Should say "Congratulations, all renewals succeeded"
```

### Test your site:
Open `https://www.factverseinsights.com` in your browser. You should see the green padlock.

Check your SSL grade: go to `https://www.ssllabs.com/ssltest/` and enter your domain. Aim for A or A+.

---

## 13. Security Checklist

Go through this list before calling it production-ready.

### Secrets (Most Critical)
- [ ] `NEXTAUTH_SECRET` is at least 48 random characters (generated with `openssl rand -base64 48`)
- [ ] `API_SECRET` is at least 48 random characters (different from `NEXTAUTH_SECRET`)
- [ ] PostgreSQL password is strong (not `news` — that's dev only)
- [ ] No `.env` files are committed to git (check with `git log --all -- "*.env"`)
- [ ] `.env`, `.env.local`, `apps/server/.env` are all in `.gitignore`

### Firewall
- [ ] Only ports 22, 80, 443 are open (`sudo ufw status`)
- [ ] Port 3000 is NOT open to internet (Next.js direct access blocked)
- [ ] Port 3001 is NOT open to internet (Express direct access blocked)
- [ ] Port 5432 is NOT open to internet (PostgreSQL blocked)
- [ ] Port 6379 is NOT open to internet (Redis blocked)

### Application
- [ ] `NODE_ENV=production` is set in `apps/server/.env`
- [ ] All apps are running under the `deploy` user, NOT root
- [ ] PM2 is set to start on reboot (`pm2 startup` was run)
- [ ] Database was migrated and seeded
- [ ] Default admin password has been changed after first login

### Nginx
- [ ] HTTPS redirect is working (visiting `http://` redirects to `https://`)
- [ ] `nginx -t` returns no errors
- [ ] `Strict-Transport-Security` header is present (check at `https://securityheaders.com`)

### Database
- [ ] PostgreSQL is NOT accessible from outside the VM
- [ ] Redis is NOT accessible from outside the VM
- [ ] Docker volumes are persisting data (`docker volume ls` shows `postgres_data`, `redis_data`)
- [ ] A backup strategy is in place (see Scaling section)

---

## 14. How to Update / Redeploy

Every time you push new code and want to update production:

```bash
# SSH into the VM
ssh deploy@YOUR_VM_IP

cd ~/factverse

# Pull the latest code
git pull origin master

# Install any new dependencies
bun install

# Rebuild the server
bun run --filter './apps/server' build

# Rebuild Next.js
bun run --filter './apps/web' build

# If you changed the database schema, run migrations
bun run db:migrate

# Restart both apps
pm2 restart factverse-server
pm2 restart factverse-web

# Check everything came back up
pm2 list
pm2 logs factverse-web --lines 20
```

**Zero-downtime tip:** Next.js handles reloads gracefully — requests are served from the old version until the new one is ready. But for the Express server, there's a ~1 second gap during restart. If that matters, look into PM2's `--wait-ready` flag.

---

## 15. Scaling Architecture

### Right now (single VM — handles ~10,000 visitors/day easily):

```
VM (4GB RAM, 2 CPU)
├── Nginx
├── Next.js (PM2, 1 instance)
├── Express Server (PM2, 1 instance)
├── PostgreSQL (Docker)
└── Redis (Docker)
```

### When you outgrow it — scale in this order:

#### Step 1: Add more CPU to the same VM (cheapest, do this first)
Your current PM2 setup runs one instance of each app. Use all CPU cores:
```bash
# Run Next.js on all available CPU cores
pm2 delete factverse-web
pm2 start "bun run start" --name "factverse-web" -i max

# Run Express on all CPU cores
pm2 delete factverse-server
pm2 start dist/index.js --name "factverse-server" -i max
```

`-i max` tells PM2 to start one instance per CPU core and load-balance between them automatically.

#### Step 2: Move the database to a managed service (~$25/month)
When your DB gets large or you want automatic backups:
- Move PostgreSQL to **Supabase**, **Neon**, or **AWS RDS**
- Move Redis to **Upstash** or **Redis Cloud**
- Update `DATABASE_URL` and `REDIS_URL` in all `.env` files
- Stop the Docker containers (`docker compose stop`)

#### Step 3: Add a second VM (load balancing)
When one VM can't handle the traffic:

```
INTERNET
    │
LOAD BALANCER (DigitalOcean, AWS ALB, or Nginx on a separate VM)
    │
    ├── VM 1 (Next.js + Express)
    └── VM 2 (Next.js + Express)
         │
    Shared PostgreSQL (managed)
    Shared Redis (managed)
```

Both VMs must point to the **same** PostgreSQL and Redis. Session data must be shared between VMs (already works — sessions are in the database).

#### Step 4: Separate the Express server onto its own VM
The BullMQ workers do heavy AI processing. Move them to a dedicated VM so article generation doesn't slow down the website.

```
VM 1 (Web, 2 CPU) — Next.js only
VM 2 (API, 4 CPU) — Express + BullMQ workers (heavy AI work)
VM 3 (DB, 2 CPU)  — PostgreSQL + Redis
```

#### Step 5: CDN for static assets (free, do this anytime)
Put Cloudflare in front of your domain (free plan). It caches static assets globally:
- Sign up at cloudflare.com
- Add your domain and update nameservers
- Turn on "Proxy" (orange cloud) for your A record
- Enable "Auto Minify" and "Rocket Loader"
- All static files (`/_next/static/`) are served from Cloudflare's global CDN

This alone can make your site 3–5× faster for international visitors.

---

## 16. Monitoring & Logs

### View live application logs:
```bash
pm2 logs factverse-web       # Next.js logs
pm2 logs factverse-server    # Express + worker logs
pm2 monit                    # real-time CPU + memory dashboard
```

### View Nginx logs:
```bash
sudo tail -f /var/log/nginx/factverse_access.log   # all requests
sudo tail -f /var/log/nginx/factverse_error.log    # errors only
```

### View Docker logs (PostgreSQL, Redis):
```bash
docker logs newsapp_postgres --tail 50
docker logs newsapp_redis --tail 50
```

### Check disk space (databases grow over time):
```bash
df -h                        # overall disk usage
docker system df             # Docker disk usage
du -sh ~/factverse           # app directory size
```

### Set up basic uptime monitoring (free):
- Go to **UptimeRobot** (uptimerobot.com) — free plan
- Add your domain (`https://www.factverseinsights.com`)
- It pings every 5 minutes and emails you if the site goes down

---

## 17. Troubleshooting

### "502 Bad Gateway" in browser
Nginx is running but can't reach Next.js or Express.
```bash
pm2 list             # are both apps running?
pm2 logs factverse-web --lines 50    # any crash errors?
pm2 restart factverse-web
```

### "500 Internal Server Error"
The app is running but something inside crashed.
```bash
pm2 logs factverse-server --lines 100   # look for error messages
# Usually a missing env variable or database connection issue
```

### App crashes and won't restart
```bash
pm2 logs factverse-server --lines 200   # read the crash message
# Common causes:
# - DATABASE_URL wrong → "connection refused"
# - REDIS_URL wrong → "connection refused"
# - Missing env var → "Invalid environment variables"
```

### Database connection refused
```bash
docker compose ps          # is postgres running?
docker compose up -d       # start it if not
# Check the DATABASE_URL password matches POSTGRES_PASSWORD in docker-compose.yml
```

### Next.js build fails
```bash
# Almost always a missing env variable at build time
cat ~/factverse/apps/web/.env.local   # verify all values are set
bun run --filter './apps/web' build   # try again
```

### Out of memory (OOM kill)
```bash
free -h                    # check available RAM
pm2 monit                  # check which process is eating memory
# If Express/workers are using too much:
pm2 restart factverse-server
# Consider upgrading to a VM with more RAM
```

### SSL certificate expired
```bash
sudo certbot renew          # force renewal
sudo systemctl reload nginx
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│  FACTVERSE PRODUCTION QUICK REFERENCE                       │
├─────────────────────────────────────────────────────────────┤
│  VM Login:     ssh deploy@YOUR_IP                           │
│  App folder:   ~/factverse                                  │
├─────────────────────────────────────────────────────────────┤
│  .env FILES                                                 │
│  ~/factverse/.env                  → root (Prisma + Docker) │
│  ~/factverse/packages/db/.env      → Prisma CLI             │
│  ~/factverse/apps/server/.env      → Express server         │
│  ~/factverse/apps/web/.env.local   → Next.js                │
├─────────────────────────────────────────────────────────────┤
│  PROCESSES                                                  │
│  pm2 list                  → see all running apps           │
│  pm2 logs factverse-web    → Next.js logs                   │
│  pm2 logs factverse-server → Express logs                   │
│  pm2 restart all           → restart everything             │
├─────────────────────────────────────────────────────────────┤
│  DATABASE                                                   │
│  docker compose ps         → check DB is running            │
│  docker compose up -d      → start DB if stopped            │
│  bun run db:migrate        → apply schema changes           │
│  bun run db:studio         → visual DB browser              │
├─────────────────────────────────────────────────────────────┤
│  NGINX                                                      │
│  sudo nginx -t             → test config                    │
│  sudo systemctl reload nginx → apply config changes         │
│  sudo tail -f /var/log/nginx/factverse_error.log → errors   │
├─────────────────────────────────────────────────────────────┤
│  DEPLOY NEW CODE                                            │
│  git pull && bun install                                    │
│  bun run --filter './apps/server' build                     │
│  bun run --filter './apps/web' build                        │
│  bun run db:migrate  (only if schema changed)               │
│  pm2 restart all                                            │
└─────────────────────────────────────────────────────────────┘
```
