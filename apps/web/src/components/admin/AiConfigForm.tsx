"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateAiConfig } from "@/app/admin/ai-config/actions"
import { AI_PROVIDER_MODELS, AI_PROVIDER_LABELS, type AIConfig, type AIProvider } from "@news-app/types"

const schema = z.object({
  provider: z.enum(["AZURE_OPENAI", "GROQ", "OPENROUTER"]),
  model: z.string().min(1, "Model is required"),
  temperature: z.number().min(0).max(2),
  maxTokens: z.number().int().min(256).max(32000),
  baseUrl: z.string().url().optional().or(z.literal("")),
  splitThreshold: z.number().int().min(1000).max(500000),
})

type FormValues = z.infer<typeof schema>

export function AiConfigForm({ config }: { config: AIConfig }) {
  const [isPending, startTransition] = useTransition()
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(config.provider)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      provider: config.provider,
      model: config.model,
      temperature: config.temperature,
      maxTokens: config.maxTokens,
      baseUrl: config.baseUrl ?? "",
      splitThreshold: config.splitThreshold,
    },
  })

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const result = await updateAiConfig({
        ...values,
        baseUrl: values.baseUrl || undefined,
        splitThreshold: values.splitThreshold,
      })
      if (result.success) {
        toast.success("AI config updated")
      } else {
        toast.error(result.error ?? "Failed to update config")
      }
    })
  }

  const models = AI_PROVIDER_MODELS[selectedProvider]

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">AI Configuration</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Configure the AI provider and model used for article generation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Provider Settings</CardTitle>
          <CardDescription>
            Select the AI provider and model for content generation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(val) => {
                          if (!val) return
                          field.onChange(val)
                          setSelectedProvider(val as AIProvider)
                          form.setValue("model", AI_PROVIDER_MODELS[val as AIProvider][0].id)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.entries(AI_PROVIDER_LABELS) as [AIProvider, string][]).map(
                            ([key, label]) => (
                              <SelectItem key={key} value={key}>
                                {label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={(val) => { if (val) field.onChange(val) }}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {models.map(({ id, label }) => (
                            <SelectItem key={id} value={id}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          max="2"
                          value={field.value}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>0 = deterministic, 2 = creative</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxTokens"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Tokens</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="256"
                          min="256"
                          max="32000"
                          value={field.value}
                          onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                        />
                      </FormControl>
                      <FormDescription>256–32,000</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {(selectedProvider === "AZURE_OPENAI" || selectedProvider === "OPENROUTER") && (
                <FormField
                  control={form.control}
                  name="baseUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormDescription>
                        {selectedProvider === "AZURE_OPENAI"
                          ? "Your Azure OpenAI endpoint"
                          : "OpenRouter base URL (optional)"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit" disabled={isPending}>
                <Save className="size-4" />
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline Settings</CardTitle>
          <CardDescription>
            Controls how YouTube transcripts are processed into articles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="splitThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Split Threshold (characters)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1000"
                        min="1000"
                        max="500000"
                        value={field.value}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      />
                    </FormControl>
                    <FormDescription>
                      Transcripts longer than this are analysed for topic-based splitting into multiple articles. Default: 25,000 chars (~15–20 min video).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending}>
                <Save className="size-4" />
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
