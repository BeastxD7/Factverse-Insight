
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model Article
 * 
 */
export type Article = $Result.DefaultSelection<Prisma.$ArticlePayload>
/**
 * Model ArticleTag
 * 
 */
export type ArticleTag = $Result.DefaultSelection<Prisma.$ArticleTagPayload>
/**
 * Model Topic
 * 
 */
export type Topic = $Result.DefaultSelection<Prisma.$TopicPayload>
/**
 * Model ContentSource
 * 
 */
export type ContentSource = $Result.DefaultSelection<Prisma.$ContentSourcePayload>
/**
 * Model YoutubeChannel
 * 
 */
export type YoutubeChannel = $Result.DefaultSelection<Prisma.$YoutubeChannelPayload>
/**
 * Model MediaUpload
 * 
 */
export type MediaUpload = $Result.DefaultSelection<Prisma.$MediaUploadPayload>
/**
 * Model JobRun
 * 
 */
export type JobRun = $Result.DefaultSelection<Prisma.$JobRunPayload>
/**
 * Model AiConfig
 * 
 */
export type AiConfig = $Result.DefaultSelection<Prisma.$AiConfigPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AIProvider: {
  AZURE_OPENAI: 'AZURE_OPENAI',
  GROQ: 'GROQ',
  OPENROUTER: 'OPENROUTER'
};

export type AIProvider = (typeof AIProvider)[keyof typeof AIProvider]


export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ArticleStatus: {
  DRAFT: 'DRAFT',
  REVIEW: 'REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ARCHIVED: 'ARCHIVED'
};

export type ArticleStatus = (typeof ArticleStatus)[keyof typeof ArticleStatus]


export const SourceType: {
  NEWS_API: 'NEWS_API',
  GNEWS: 'GNEWS',
  RSS_FEED: 'RSS_FEED',
  GOOGLE_TRENDS: 'GOOGLE_TRENDS',
  YOUTUBE_VIDEO: 'YOUTUBE_VIDEO',
  YOUTUBE_CHANNEL: 'YOUTUBE_CHANNEL',
  PODCAST_UPLOAD: 'PODCAST_UPLOAD'
};

export type SourceType = (typeof SourceType)[keyof typeof SourceType]


export const JobStatus: {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]


export const JobType: {
  NEWS_FETCH: 'NEWS_FETCH',
  RSS_FETCH: 'RSS_FETCH',
  TRENDS_FETCH: 'TRENDS_FETCH',
  YOUTUBE_MONITOR: 'YOUTUBE_MONITOR',
  YOUTUBE_PROCESS: 'YOUTUBE_PROCESS',
  AUDIO_PROCESS: 'AUDIO_PROCESS'
};

export type JobType = (typeof JobType)[keyof typeof JobType]

}

export type AIProvider = $Enums.AIProvider

export const AIProvider: typeof $Enums.AIProvider

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ArticleStatus = $Enums.ArticleStatus

export const ArticleStatus: typeof $Enums.ArticleStatus

export type SourceType = $Enums.SourceType

export const SourceType: typeof $Enums.SourceType

export type JobStatus = $Enums.JobStatus

export const JobStatus: typeof $Enums.JobStatus

export type JobType = $Enums.JobType

export const JobType: typeof $Enums.JobType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.article`: Exposes CRUD operations for the **Article** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Articles
    * const articles = await prisma.article.findMany()
    * ```
    */
  get article(): Prisma.ArticleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.articleTag`: Exposes CRUD operations for the **ArticleTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArticleTags
    * const articleTags = await prisma.articleTag.findMany()
    * ```
    */
  get articleTag(): Prisma.ArticleTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.topic`: Exposes CRUD operations for the **Topic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Topics
    * const topics = await prisma.topic.findMany()
    * ```
    */
  get topic(): Prisma.TopicDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contentSource`: Exposes CRUD operations for the **ContentSource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContentSources
    * const contentSources = await prisma.contentSource.findMany()
    * ```
    */
  get contentSource(): Prisma.ContentSourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.youtubeChannel`: Exposes CRUD operations for the **YoutubeChannel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more YoutubeChannels
    * const youtubeChannels = await prisma.youtubeChannel.findMany()
    * ```
    */
  get youtubeChannel(): Prisma.YoutubeChannelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mediaUpload`: Exposes CRUD operations for the **MediaUpload** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MediaUploads
    * const mediaUploads = await prisma.mediaUpload.findMany()
    * ```
    */
  get mediaUpload(): Prisma.MediaUploadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobRun`: Exposes CRUD operations for the **JobRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobRuns
    * const jobRuns = await prisma.jobRun.findMany()
    * ```
    */
  get jobRun(): Prisma.JobRunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiConfig`: Exposes CRUD operations for the **AiConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiConfigs
    * const aiConfigs = await prisma.aiConfig.findMany()
    * ```
    */
  get aiConfig(): Prisma.AiConfigDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    Category: 'Category',
    Tag: 'Tag',
    Article: 'Article',
    ArticleTag: 'ArticleTag',
    Topic: 'Topic',
    ContentSource: 'ContentSource',
    YoutubeChannel: 'YoutubeChannel',
    MediaUpload: 'MediaUpload',
    JobRun: 'JobRun',
    AiConfig: 'AiConfig'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "session" | "verificationToken" | "category" | "tag" | "article" | "articleTag" | "topic" | "contentSource" | "youtubeChannel" | "mediaUpload" | "jobRun" | "aiConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      Article: {
        payload: Prisma.$ArticlePayload<ExtArgs>
        fields: Prisma.ArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findFirst: {
            args: Prisma.ArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findMany: {
            args: Prisma.ArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          create: {
            args: Prisma.ArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          createMany: {
            args: Prisma.ArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          delete: {
            args: Prisma.ArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          update: {
            args: Prisma.ArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          deleteMany: {
            args: Prisma.ArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArticleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          upsert: {
            args: Prisma.ArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          aggregate: {
            args: Prisma.ArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticle>
          }
          groupBy: {
            args: Prisma.ArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleCountAggregateOutputType> | number
          }
        }
      }
      ArticleTag: {
        payload: Prisma.$ArticleTagPayload<ExtArgs>
        fields: Prisma.ArticleTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTagPayload>
          }
          findFirst: {
            args: Prisma.ArticleTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTagPayload>
          }
          findMany: {
            args: Prisma.ArticleTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTagPayload>[]
          }
          create: {
            args: Prisma.ArticleTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTagPayload>
          }
          createMany: {
            args: Prisma.ArticleTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTagPayload>[]
          }
          delete: {
            args: Prisma.ArticleTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTagPayload>
          }
          update: {
            args: Prisma.ArticleTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTagPayload>
          }
          deleteMany: {
            args: Prisma.ArticleTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArticleTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTagPayload>[]
          }
          upsert: {
            args: Prisma.ArticleTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTagPayload>
          }
          aggregate: {
            args: Prisma.ArticleTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticleTag>
          }
          groupBy: {
            args: Prisma.ArticleTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleTagCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleTagCountAggregateOutputType> | number
          }
        }
      }
      Topic: {
        payload: Prisma.$TopicPayload<ExtArgs>
        fields: Prisma.TopicFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TopicFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TopicFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicPayload>
          }
          findFirst: {
            args: Prisma.TopicFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TopicFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicPayload>
          }
          findMany: {
            args: Prisma.TopicFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicPayload>[]
          }
          create: {
            args: Prisma.TopicCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicPayload>
          }
          createMany: {
            args: Prisma.TopicCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TopicCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicPayload>[]
          }
          delete: {
            args: Prisma.TopicDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicPayload>
          }
          update: {
            args: Prisma.TopicUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicPayload>
          }
          deleteMany: {
            args: Prisma.TopicDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TopicUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TopicUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicPayload>[]
          }
          upsert: {
            args: Prisma.TopicUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicPayload>
          }
          aggregate: {
            args: Prisma.TopicAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTopic>
          }
          groupBy: {
            args: Prisma.TopicGroupByArgs<ExtArgs>
            result: $Utils.Optional<TopicGroupByOutputType>[]
          }
          count: {
            args: Prisma.TopicCountArgs<ExtArgs>
            result: $Utils.Optional<TopicCountAggregateOutputType> | number
          }
        }
      }
      ContentSource: {
        payload: Prisma.$ContentSourcePayload<ExtArgs>
        fields: Prisma.ContentSourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContentSourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentSourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContentSourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentSourcePayload>
          }
          findFirst: {
            args: Prisma.ContentSourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentSourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContentSourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentSourcePayload>
          }
          findMany: {
            args: Prisma.ContentSourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentSourcePayload>[]
          }
          create: {
            args: Prisma.ContentSourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentSourcePayload>
          }
          createMany: {
            args: Prisma.ContentSourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContentSourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentSourcePayload>[]
          }
          delete: {
            args: Prisma.ContentSourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentSourcePayload>
          }
          update: {
            args: Prisma.ContentSourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentSourcePayload>
          }
          deleteMany: {
            args: Prisma.ContentSourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContentSourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContentSourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentSourcePayload>[]
          }
          upsert: {
            args: Prisma.ContentSourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentSourcePayload>
          }
          aggregate: {
            args: Prisma.ContentSourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContentSource>
          }
          groupBy: {
            args: Prisma.ContentSourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContentSourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContentSourceCountArgs<ExtArgs>
            result: $Utils.Optional<ContentSourceCountAggregateOutputType> | number
          }
        }
      }
      YoutubeChannel: {
        payload: Prisma.$YoutubeChannelPayload<ExtArgs>
        fields: Prisma.YoutubeChannelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.YoutubeChannelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeChannelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.YoutubeChannelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeChannelPayload>
          }
          findFirst: {
            args: Prisma.YoutubeChannelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeChannelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.YoutubeChannelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeChannelPayload>
          }
          findMany: {
            args: Prisma.YoutubeChannelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeChannelPayload>[]
          }
          create: {
            args: Prisma.YoutubeChannelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeChannelPayload>
          }
          createMany: {
            args: Prisma.YoutubeChannelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.YoutubeChannelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeChannelPayload>[]
          }
          delete: {
            args: Prisma.YoutubeChannelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeChannelPayload>
          }
          update: {
            args: Prisma.YoutubeChannelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeChannelPayload>
          }
          deleteMany: {
            args: Prisma.YoutubeChannelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.YoutubeChannelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.YoutubeChannelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeChannelPayload>[]
          }
          upsert: {
            args: Prisma.YoutubeChannelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeChannelPayload>
          }
          aggregate: {
            args: Prisma.YoutubeChannelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateYoutubeChannel>
          }
          groupBy: {
            args: Prisma.YoutubeChannelGroupByArgs<ExtArgs>
            result: $Utils.Optional<YoutubeChannelGroupByOutputType>[]
          }
          count: {
            args: Prisma.YoutubeChannelCountArgs<ExtArgs>
            result: $Utils.Optional<YoutubeChannelCountAggregateOutputType> | number
          }
        }
      }
      MediaUpload: {
        payload: Prisma.$MediaUploadPayload<ExtArgs>
        fields: Prisma.MediaUploadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaUploadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaUploadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>
          }
          findFirst: {
            args: Prisma.MediaUploadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaUploadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>
          }
          findMany: {
            args: Prisma.MediaUploadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>[]
          }
          create: {
            args: Prisma.MediaUploadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>
          }
          createMany: {
            args: Prisma.MediaUploadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaUploadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>[]
          }
          delete: {
            args: Prisma.MediaUploadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>
          }
          update: {
            args: Prisma.MediaUploadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>
          }
          deleteMany: {
            args: Prisma.MediaUploadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaUploadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MediaUploadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>[]
          }
          upsert: {
            args: Prisma.MediaUploadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>
          }
          aggregate: {
            args: Prisma.MediaUploadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMediaUpload>
          }
          groupBy: {
            args: Prisma.MediaUploadGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaUploadGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaUploadCountArgs<ExtArgs>
            result: $Utils.Optional<MediaUploadCountAggregateOutputType> | number
          }
        }
      }
      JobRun: {
        payload: Prisma.$JobRunPayload<ExtArgs>
        fields: Prisma.JobRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRunPayload>
          }
          findFirst: {
            args: Prisma.JobRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRunPayload>
          }
          findMany: {
            args: Prisma.JobRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRunPayload>[]
          }
          create: {
            args: Prisma.JobRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRunPayload>
          }
          createMany: {
            args: Prisma.JobRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRunPayload>[]
          }
          delete: {
            args: Prisma.JobRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRunPayload>
          }
          update: {
            args: Prisma.JobRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRunPayload>
          }
          deleteMany: {
            args: Prisma.JobRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRunPayload>[]
          }
          upsert: {
            args: Prisma.JobRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRunPayload>
          }
          aggregate: {
            args: Prisma.JobRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobRun>
          }
          groupBy: {
            args: Prisma.JobRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobRunCountArgs<ExtArgs>
            result: $Utils.Optional<JobRunCountAggregateOutputType> | number
          }
        }
      }
      AiConfig: {
        payload: Prisma.$AiConfigPayload<ExtArgs>
        fields: Prisma.AiConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>
          }
          findFirst: {
            args: Prisma.AiConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>
          }
          findMany: {
            args: Prisma.AiConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>[]
          }
          create: {
            args: Prisma.AiConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>
          }
          createMany: {
            args: Prisma.AiConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>[]
          }
          delete: {
            args: Prisma.AiConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>
          }
          update: {
            args: Prisma.AiConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>
          }
          deleteMany: {
            args: Prisma.AiConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AiConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>[]
          }
          upsert: {
            args: Prisma.AiConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>
          }
          aggregate: {
            args: Prisma.AiConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiConfig>
          }
          groupBy: {
            args: Prisma.AiConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiConfigCountArgs<ExtArgs>
            result: $Utils.Optional<AiConfigCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    category?: CategoryOmit
    tag?: TagOmit
    article?: ArticleOmit
    articleTag?: ArticleTagOmit
    topic?: TopicOmit
    contentSource?: ContentSourceOmit
    youtubeChannel?: YoutubeChannelOmit
    mediaUpload?: MediaUploadOmit
    jobRun?: JobRunOmit
    aiConfig?: AiConfigOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    articles: number
    topics: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    articles?: boolean | CategoryCountOutputTypeCountArticlesArgs
    topics?: boolean | CategoryCountOutputTypeCountTopicsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountTopicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TopicWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    articles: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    articles?: boolean | TagCountOutputTypeCountArticlesArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleTagWhereInput
  }


  /**
   * Count Type ArticleCountOutputType
   */

  export type ArticleCountOutputType = {
    tags: number
  }

  export type ArticleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | ArticleCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCountOutputType
     */
    select?: ArticleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleTagWhereInput
  }


  /**
   * Count Type TopicCountOutputType
   */

  export type TopicCountOutputType = {
    sources: number
    channels: number
  }

  export type TopicCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sources?: boolean | TopicCountOutputTypeCountSourcesArgs
    channels?: boolean | TopicCountOutputTypeCountChannelsArgs
  }

  // Custom InputTypes
  /**
   * TopicCountOutputType without action
   */
  export type TopicCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicCountOutputType
     */
    select?: TopicCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TopicCountOutputType without action
   */
  export type TopicCountOutputTypeCountSourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContentSourceWhereInput
  }

  /**
   * TopicCountOutputType without action
   */
  export type TopicCountOutputTypeCountChannelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: YoutubeChannelWhereInput
  }


  /**
   * Count Type ContentSourceCountOutputType
   */

  export type ContentSourceCountOutputType = {
    jobRuns: number
  }

  export type ContentSourceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobRuns?: boolean | ContentSourceCountOutputTypeCountJobRunsArgs
  }

  // Custom InputTypes
  /**
   * ContentSourceCountOutputType without action
   */
  export type ContentSourceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSourceCountOutputType
     */
    select?: ContentSourceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContentSourceCountOutputType without action
   */
  export type ContentSourceCountOutputTypeCountJobRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobRunWhereInput
  }


  /**
   * Count Type YoutubeChannelCountOutputType
   */

  export type YoutubeChannelCountOutputType = {
    jobRuns: number
  }

  export type YoutubeChannelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobRuns?: boolean | YoutubeChannelCountOutputTypeCountJobRunsArgs
  }

  // Custom InputTypes
  /**
   * YoutubeChannelCountOutputType without action
   */
  export type YoutubeChannelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannelCountOutputType
     */
    select?: YoutubeChannelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * YoutubeChannelCountOutputType without action
   */
  export type YoutubeChannelCountOutputTypeCountJobRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobRunWhereInput
  }


  /**
   * Count Type JobRunCountOutputType
   */

  export type JobRunCountOutputType = {
    articles: number
  }

  export type JobRunCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    articles?: boolean | JobRunCountOutputTypeCountArticlesArgs
  }

  // Custom InputTypes
  /**
   * JobRunCountOutputType without action
   */
  export type JobRunCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRunCountOutputType
     */
    select?: JobRunCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobRunCountOutputType without action
   */
  export type JobRunCountOutputTypeCountArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    emailVerified: Date | null
    name: string | null
    image: string | null
    role: $Enums.Role | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    emailVerified: Date | null
    name: string | null
    image: string | null
    role: $Enums.Role | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    emailVerified: number
    name: number
    image: number
    role: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    name?: true
    image?: true
    role?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    name?: true
    image?: true
    role?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    name?: true
    image?: true
    role?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    emailVerified: Date | null
    name: string | null
    image: string | null
    role: $Enums.Role
    passwordHash: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    role?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    role?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    role?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    role?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "emailVerified" | "name" | "image" | "role" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      emailVerified: Date | null
      name: string | null
      image: string | null
      role: $Enums.Role
      passwordHash: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly name: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    createdAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    createdAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    articles?: boolean | Category$articlesArgs<ExtArgs>
    topics?: boolean | Category$topicsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "createdAt", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    articles?: boolean | Category$articlesArgs<ExtArgs>
    topics?: boolean | Category$topicsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      articles: Prisma.$ArticlePayload<ExtArgs>[]
      topics: Prisma.$TopicPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    articles<T extends Category$articlesArgs<ExtArgs> = {}>(args?: Subset<T, Category$articlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    topics<T extends Category$topicsArgs<ExtArgs> = {}>(args?: Subset<T, Category$topicsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly slug: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.articles
   */
  export type Category$articlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    cursor?: ArticleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Category.topics
   */
  export type Category$topicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicInclude<ExtArgs> | null
    where?: TopicWhereInput
    orderBy?: TopicOrderByWithRelationInput | TopicOrderByWithRelationInput[]
    cursor?: TopicWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TopicScalarFieldEnum | TopicScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: string
    name: string
    slug: string
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    articles?: boolean | Tag$articlesArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    articles?: boolean | Tag$articlesArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      articles: Prisma.$ArticleTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    articles<T extends Tag$articlesArgs<ExtArgs> = {}>(args?: Subset<T, Tag$articlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'String'>
    readonly name: FieldRef<"Tag", 'String'>
    readonly slug: FieldRef<"Tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.articles
   */
  export type Tag$articlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTag
     */
    select?: ArticleTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTag
     */
    omit?: ArticleTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTagInclude<ExtArgs> | null
    where?: ArticleTagWhereInput
    orderBy?: ArticleTagOrderByWithRelationInput | ArticleTagOrderByWithRelationInput[]
    cursor?: ArticleTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleTagScalarFieldEnum | ArticleTagScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model Article
   */

  export type AggregateArticle = {
    _count: ArticleCountAggregateOutputType | null
    _avg: ArticleAvgAggregateOutputType | null
    _sum: ArticleSumAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  export type ArticleAvgAggregateOutputType = {
    viewCount: number | null
  }

  export type ArticleSumAggregateOutputType = {
    viewCount: number | null
  }

  export type ArticleMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    excerpt: string | null
    content: string | null
    metaTitle: string | null
    metaDescription: string | null
    ogImage: string | null
    status: $Enums.ArticleStatus | null
    publishedAt: Date | null
    featured: boolean | null
    viewCount: number | null
    sourceType: $Enums.SourceType | null
    sourceUrl: string | null
    sourceId: string | null
    aiGenerated: boolean | null
    aiModel: string | null
    aiPromptVersion: string | null
    categoryId: string | null
    jobRunId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    excerpt: string | null
    content: string | null
    metaTitle: string | null
    metaDescription: string | null
    ogImage: string | null
    status: $Enums.ArticleStatus | null
    publishedAt: Date | null
    featured: boolean | null
    viewCount: number | null
    sourceType: $Enums.SourceType | null
    sourceUrl: string | null
    sourceId: string | null
    aiGenerated: boolean | null
    aiModel: string | null
    aiPromptVersion: string | null
    categoryId: string | null
    jobRunId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    excerpt: number
    content: number
    metaTitle: number
    metaDescription: number
    ogImage: number
    keywords: number
    status: number
    publishedAt: number
    featured: number
    viewCount: number
    sourceType: number
    sourceUrl: number
    sourceId: number
    aiGenerated: number
    aiModel: number
    aiPromptVersion: number
    categoryId: number
    jobRunId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArticleAvgAggregateInputType = {
    viewCount?: true
  }

  export type ArticleSumAggregateInputType = {
    viewCount?: true
  }

  export type ArticleMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    excerpt?: true
    content?: true
    metaTitle?: true
    metaDescription?: true
    ogImage?: true
    status?: true
    publishedAt?: true
    featured?: true
    viewCount?: true
    sourceType?: true
    sourceUrl?: true
    sourceId?: true
    aiGenerated?: true
    aiModel?: true
    aiPromptVersion?: true
    categoryId?: true
    jobRunId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    excerpt?: true
    content?: true
    metaTitle?: true
    metaDescription?: true
    ogImage?: true
    status?: true
    publishedAt?: true
    featured?: true
    viewCount?: true
    sourceType?: true
    sourceUrl?: true
    sourceId?: true
    aiGenerated?: true
    aiModel?: true
    aiPromptVersion?: true
    categoryId?: true
    jobRunId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    excerpt?: true
    content?: true
    metaTitle?: true
    metaDescription?: true
    ogImage?: true
    keywords?: true
    status?: true
    publishedAt?: true
    featured?: true
    viewCount?: true
    sourceType?: true
    sourceUrl?: true
    sourceId?: true
    aiGenerated?: true
    aiModel?: true
    aiPromptVersion?: true
    categoryId?: true
    jobRunId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Article to aggregate.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Articles
    **/
    _count?: true | ArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArticleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArticleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleMaxAggregateInputType
  }

  export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticle[P]>
      : GetScalarType<T[P], AggregateArticle[P]>
  }




  export type ArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithAggregationInput | ArticleOrderByWithAggregationInput[]
    by: ArticleScalarFieldEnum[] | ArticleScalarFieldEnum
    having?: ArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCountAggregateInputType | true
    _avg?: ArticleAvgAggregateInputType
    _sum?: ArticleSumAggregateInputType
    _min?: ArticleMinAggregateInputType
    _max?: ArticleMaxAggregateInputType
  }

  export type ArticleGroupByOutputType = {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: string
    metaTitle: string | null
    metaDescription: string | null
    ogImage: string | null
    keywords: string[]
    status: $Enums.ArticleStatus
    publishedAt: Date | null
    featured: boolean
    viewCount: number
    sourceType: $Enums.SourceType | null
    sourceUrl: string | null
    sourceId: string | null
    aiGenerated: boolean
    aiModel: string | null
    aiPromptVersion: string | null
    categoryId: string | null
    jobRunId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ArticleCountAggregateOutputType | null
    _avg: ArticleAvgAggregateOutputType | null
    _sum: ArticleSumAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  type GetArticleGroupByPayload<T extends ArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleGroupByOutputType[P]>
        }
      >
    >


  export type ArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    excerpt?: boolean
    content?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    ogImage?: boolean
    keywords?: boolean
    status?: boolean
    publishedAt?: boolean
    featured?: boolean
    viewCount?: boolean
    sourceType?: boolean
    sourceUrl?: boolean
    sourceId?: boolean
    aiGenerated?: boolean
    aiModel?: boolean
    aiPromptVersion?: boolean
    categoryId?: boolean
    jobRunId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Article$categoryArgs<ExtArgs>
    tags?: boolean | Article$tagsArgs<ExtArgs>
    jobRun?: boolean | Article$jobRunArgs<ExtArgs>
    _count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    excerpt?: boolean
    content?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    ogImage?: boolean
    keywords?: boolean
    status?: boolean
    publishedAt?: boolean
    featured?: boolean
    viewCount?: boolean
    sourceType?: boolean
    sourceUrl?: boolean
    sourceId?: boolean
    aiGenerated?: boolean
    aiModel?: boolean
    aiPromptVersion?: boolean
    categoryId?: boolean
    jobRunId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Article$categoryArgs<ExtArgs>
    jobRun?: boolean | Article$jobRunArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    excerpt?: boolean
    content?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    ogImage?: boolean
    keywords?: boolean
    status?: boolean
    publishedAt?: boolean
    featured?: boolean
    viewCount?: boolean
    sourceType?: boolean
    sourceUrl?: boolean
    sourceId?: boolean
    aiGenerated?: boolean
    aiModel?: boolean
    aiPromptVersion?: boolean
    categoryId?: boolean
    jobRunId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Article$categoryArgs<ExtArgs>
    jobRun?: boolean | Article$jobRunArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    excerpt?: boolean
    content?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    ogImage?: boolean
    keywords?: boolean
    status?: boolean
    publishedAt?: boolean
    featured?: boolean
    viewCount?: boolean
    sourceType?: boolean
    sourceUrl?: boolean
    sourceId?: boolean
    aiGenerated?: boolean
    aiModel?: boolean
    aiPromptVersion?: boolean
    categoryId?: boolean
    jobRunId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "excerpt" | "content" | "metaTitle" | "metaDescription" | "ogImage" | "keywords" | "status" | "publishedAt" | "featured" | "viewCount" | "sourceType" | "sourceUrl" | "sourceId" | "aiGenerated" | "aiModel" | "aiPromptVersion" | "categoryId" | "jobRunId" | "createdAt" | "updatedAt", ExtArgs["result"]["article"]>
  export type ArticleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Article$categoryArgs<ExtArgs>
    tags?: boolean | Article$tagsArgs<ExtArgs>
    jobRun?: boolean | Article$jobRunArgs<ExtArgs>
    _count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ArticleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Article$categoryArgs<ExtArgs>
    jobRun?: boolean | Article$jobRunArgs<ExtArgs>
  }
  export type ArticleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Article$categoryArgs<ExtArgs>
    jobRun?: boolean | Article$jobRunArgs<ExtArgs>
  }

  export type $ArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Article"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs> | null
      tags: Prisma.$ArticleTagPayload<ExtArgs>[]
      jobRun: Prisma.$JobRunPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      excerpt: string | null
      content: string
      metaTitle: string | null
      metaDescription: string | null
      ogImage: string | null
      keywords: string[]
      status: $Enums.ArticleStatus
      publishedAt: Date | null
      featured: boolean
      viewCount: number
      sourceType: $Enums.SourceType | null
      sourceUrl: string | null
      sourceId: string | null
      aiGenerated: boolean
      aiModel: string | null
      aiPromptVersion: string | null
      categoryId: string | null
      jobRunId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["article"]>
    composites: {}
  }

  type ArticleGetPayload<S extends boolean | null | undefined | ArticleDefaultArgs> = $Result.GetResult<Prisma.$ArticlePayload, S>

  type ArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleCountAggregateInputType | true
    }

  export interface ArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Article'], meta: { name: 'Article' } }
    /**
     * Find zero or one Article that matches the filter.
     * @param {ArticleFindUniqueArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleFindUniqueArgs>(args: SelectSubset<T, ArticleFindUniqueArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Article that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleFindUniqueOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleFindFirstArgs>(args?: SelectSubset<T, ArticleFindFirstArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Articles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Articles
     * const articles = await prisma.article.findMany()
     * 
     * // Get first 10 Articles
     * const articles = await prisma.article.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleWithIdOnly = await prisma.article.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleFindManyArgs>(args?: SelectSubset<T, ArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Article.
     * @param {ArticleCreateArgs} args - Arguments to create a Article.
     * @example
     * // Create one Article
     * const Article = await prisma.article.create({
     *   data: {
     *     // ... data to create a Article
     *   }
     * })
     * 
     */
    create<T extends ArticleCreateArgs>(args: SelectSubset<T, ArticleCreateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Articles.
     * @param {ArticleCreateManyArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleCreateManyArgs>(args?: SelectSubset<T, ArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Articles and returns the data saved in the database.
     * @param {ArticleCreateManyAndReturnArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Article.
     * @param {ArticleDeleteArgs} args - Arguments to delete one Article.
     * @example
     * // Delete one Article
     * const Article = await prisma.article.delete({
     *   where: {
     *     // ... filter to delete one Article
     *   }
     * })
     * 
     */
    delete<T extends ArticleDeleteArgs>(args: SelectSubset<T, ArticleDeleteArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Article.
     * @param {ArticleUpdateArgs} args - Arguments to update one Article.
     * @example
     * // Update one Article
     * const article = await prisma.article.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleUpdateArgs>(args: SelectSubset<T, ArticleUpdateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Articles.
     * @param {ArticleDeleteManyArgs} args - Arguments to filter Articles to delete.
     * @example
     * // Delete a few Articles
     * const { count } = await prisma.article.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleDeleteManyArgs>(args?: SelectSubset<T, ArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleUpdateManyArgs>(args: SelectSubset<T, ArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles and returns the data updated in the database.
     * @param {ArticleUpdateManyAndReturnArgs} args - Arguments to update many Articles.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArticleUpdateManyAndReturnArgs>(args: SelectSubset<T, ArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Article.
     * @param {ArticleUpsertArgs} args - Arguments to update or create a Article.
     * @example
     * // Update or create a Article
     * const article = await prisma.article.upsert({
     *   create: {
     *     // ... data to create a Article
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Article we want to update
     *   }
     * })
     */
    upsert<T extends ArticleUpsertArgs>(args: SelectSubset<T, ArticleUpsertArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCountArgs} args - Arguments to filter Articles to count.
     * @example
     * // Count the number of Articles
     * const count = await prisma.article.count({
     *   where: {
     *     // ... the filter for the Articles we want to count
     *   }
     * })
    **/
    count<T extends ArticleCountArgs>(
      args?: Subset<T, ArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArticleAggregateArgs>(args: Subset<T, ArticleAggregateArgs>): Prisma.PrismaPromise<GetArticleAggregateType<T>>

    /**
     * Group by Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleGroupByArgs['orderBy'] }
        : { orderBy?: ArticleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Article model
   */
  readonly fields: ArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Article.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends Article$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Article$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tags<T extends Article$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Article$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    jobRun<T extends Article$jobRunArgs<ExtArgs> = {}>(args?: Subset<T, Article$jobRunArgs<ExtArgs>>): Prisma__JobRunClient<$Result.GetResult<Prisma.$JobRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Article model
   */
  interface ArticleFieldRefs {
    readonly id: FieldRef<"Article", 'String'>
    readonly title: FieldRef<"Article", 'String'>
    readonly slug: FieldRef<"Article", 'String'>
    readonly excerpt: FieldRef<"Article", 'String'>
    readonly content: FieldRef<"Article", 'String'>
    readonly metaTitle: FieldRef<"Article", 'String'>
    readonly metaDescription: FieldRef<"Article", 'String'>
    readonly ogImage: FieldRef<"Article", 'String'>
    readonly keywords: FieldRef<"Article", 'String[]'>
    readonly status: FieldRef<"Article", 'ArticleStatus'>
    readonly publishedAt: FieldRef<"Article", 'DateTime'>
    readonly featured: FieldRef<"Article", 'Boolean'>
    readonly viewCount: FieldRef<"Article", 'Int'>
    readonly sourceType: FieldRef<"Article", 'SourceType'>
    readonly sourceUrl: FieldRef<"Article", 'String'>
    readonly sourceId: FieldRef<"Article", 'String'>
    readonly aiGenerated: FieldRef<"Article", 'Boolean'>
    readonly aiModel: FieldRef<"Article", 'String'>
    readonly aiPromptVersion: FieldRef<"Article", 'String'>
    readonly categoryId: FieldRef<"Article", 'String'>
    readonly jobRunId: FieldRef<"Article", 'String'>
    readonly createdAt: FieldRef<"Article", 'DateTime'>
    readonly updatedAt: FieldRef<"Article", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Article findUnique
   */
  export type ArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findUniqueOrThrow
   */
  export type ArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findFirst
   */
  export type ArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findFirstOrThrow
   */
  export type ArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findMany
   */
  export type ArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Articles to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article create
   */
  export type ArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to create a Article.
     */
    data: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
  }

  /**
   * Article createMany
   */
  export type ArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Article createManyAndReturn
   */
  export type ArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Article update
   */
  export type ArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to update a Article.
     */
    data: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
    /**
     * Choose, which Article to update.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article updateMany
   */
  export type ArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
  }

  /**
   * Article updateManyAndReturn
   */
  export type ArticleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Article upsert
   */
  export type ArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The filter to search for the Article to update in case it exists.
     */
    where: ArticleWhereUniqueInput
    /**
     * In case the Article found by the `where` argument doesn't exist, create a new Article with this data.
     */
    create: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
    /**
     * In case the Article was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
  }

  /**
   * Article delete
   */
  export type ArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter which Article to delete.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article deleteMany
   */
  export type ArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Articles to delete
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to delete.
     */
    limit?: number
  }

  /**
   * Article.category
   */
  export type Article$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Article.tags
   */
  export type Article$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTag
     */
    select?: ArticleTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTag
     */
    omit?: ArticleTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTagInclude<ExtArgs> | null
    where?: ArticleTagWhereInput
    orderBy?: ArticleTagOrderByWithRelationInput | ArticleTagOrderByWithRelationInput[]
    cursor?: ArticleTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleTagScalarFieldEnum | ArticleTagScalarFieldEnum[]
  }

  /**
   * Article.jobRun
   */
  export type Article$jobRunArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunInclude<ExtArgs> | null
    where?: JobRunWhereInput
  }

  /**
   * Article without action
   */
  export type ArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
  }


  /**
   * Model ArticleTag
   */

  export type AggregateArticleTag = {
    _count: ArticleTagCountAggregateOutputType | null
    _min: ArticleTagMinAggregateOutputType | null
    _max: ArticleTagMaxAggregateOutputType | null
  }

  export type ArticleTagMinAggregateOutputType = {
    articleId: string | null
    tagId: string | null
  }

  export type ArticleTagMaxAggregateOutputType = {
    articleId: string | null
    tagId: string | null
  }

  export type ArticleTagCountAggregateOutputType = {
    articleId: number
    tagId: number
    _all: number
  }


  export type ArticleTagMinAggregateInputType = {
    articleId?: true
    tagId?: true
  }

  export type ArticleTagMaxAggregateInputType = {
    articleId?: true
    tagId?: true
  }

  export type ArticleTagCountAggregateInputType = {
    articleId?: true
    tagId?: true
    _all?: true
  }

  export type ArticleTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleTag to aggregate.
     */
    where?: ArticleTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleTags to fetch.
     */
    orderBy?: ArticleTagOrderByWithRelationInput | ArticleTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArticleTags
    **/
    _count?: true | ArticleTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleTagMaxAggregateInputType
  }

  export type GetArticleTagAggregateType<T extends ArticleTagAggregateArgs> = {
        [P in keyof T & keyof AggregateArticleTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticleTag[P]>
      : GetScalarType<T[P], AggregateArticleTag[P]>
  }




  export type ArticleTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleTagWhereInput
    orderBy?: ArticleTagOrderByWithAggregationInput | ArticleTagOrderByWithAggregationInput[]
    by: ArticleTagScalarFieldEnum[] | ArticleTagScalarFieldEnum
    having?: ArticleTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleTagCountAggregateInputType | true
    _min?: ArticleTagMinAggregateInputType
    _max?: ArticleTagMaxAggregateInputType
  }

  export type ArticleTagGroupByOutputType = {
    articleId: string
    tagId: string
    _count: ArticleTagCountAggregateOutputType | null
    _min: ArticleTagMinAggregateOutputType | null
    _max: ArticleTagMaxAggregateOutputType | null
  }

  type GetArticleTagGroupByPayload<T extends ArticleTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleTagGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleTagGroupByOutputType[P]>
        }
      >
    >


  export type ArticleTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    articleId?: boolean
    tagId?: boolean
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleTag"]>

  export type ArticleTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    articleId?: boolean
    tagId?: boolean
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleTag"]>

  export type ArticleTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    articleId?: boolean
    tagId?: boolean
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleTag"]>

  export type ArticleTagSelectScalar = {
    articleId?: boolean
    tagId?: boolean
  }

  export type ArticleTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"articleId" | "tagId", ExtArgs["result"]["articleTag"]>
  export type ArticleTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type ArticleTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type ArticleTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $ArticleTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArticleTag"
    objects: {
      article: Prisma.$ArticlePayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      articleId: string
      tagId: string
    }, ExtArgs["result"]["articleTag"]>
    composites: {}
  }

  type ArticleTagGetPayload<S extends boolean | null | undefined | ArticleTagDefaultArgs> = $Result.GetResult<Prisma.$ArticleTagPayload, S>

  type ArticleTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleTagCountAggregateInputType | true
    }

  export interface ArticleTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArticleTag'], meta: { name: 'ArticleTag' } }
    /**
     * Find zero or one ArticleTag that matches the filter.
     * @param {ArticleTagFindUniqueArgs} args - Arguments to find a ArticleTag
     * @example
     * // Get one ArticleTag
     * const articleTag = await prisma.articleTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleTagFindUniqueArgs>(args: SelectSubset<T, ArticleTagFindUniqueArgs<ExtArgs>>): Prisma__ArticleTagClient<$Result.GetResult<Prisma.$ArticleTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArticleTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleTagFindUniqueOrThrowArgs} args - Arguments to find a ArticleTag
     * @example
     * // Get one ArticleTag
     * const articleTag = await prisma.articleTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleTagFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleTagClient<$Result.GetResult<Prisma.$ArticleTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArticleTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleTagFindFirstArgs} args - Arguments to find a ArticleTag
     * @example
     * // Get one ArticleTag
     * const articleTag = await prisma.articleTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleTagFindFirstArgs>(args?: SelectSubset<T, ArticleTagFindFirstArgs<ExtArgs>>): Prisma__ArticleTagClient<$Result.GetResult<Prisma.$ArticleTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArticleTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleTagFindFirstOrThrowArgs} args - Arguments to find a ArticleTag
     * @example
     * // Get one ArticleTag
     * const articleTag = await prisma.articleTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleTagFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleTagClient<$Result.GetResult<Prisma.$ArticleTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArticleTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArticleTags
     * const articleTags = await prisma.articleTag.findMany()
     * 
     * // Get first 10 ArticleTags
     * const articleTags = await prisma.articleTag.findMany({ take: 10 })
     * 
     * // Only select the `articleId`
     * const articleTagWithArticleIdOnly = await prisma.articleTag.findMany({ select: { articleId: true } })
     * 
     */
    findMany<T extends ArticleTagFindManyArgs>(args?: SelectSubset<T, ArticleTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArticleTag.
     * @param {ArticleTagCreateArgs} args - Arguments to create a ArticleTag.
     * @example
     * // Create one ArticleTag
     * const ArticleTag = await prisma.articleTag.create({
     *   data: {
     *     // ... data to create a ArticleTag
     *   }
     * })
     * 
     */
    create<T extends ArticleTagCreateArgs>(args: SelectSubset<T, ArticleTagCreateArgs<ExtArgs>>): Prisma__ArticleTagClient<$Result.GetResult<Prisma.$ArticleTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArticleTags.
     * @param {ArticleTagCreateManyArgs} args - Arguments to create many ArticleTags.
     * @example
     * // Create many ArticleTags
     * const articleTag = await prisma.articleTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleTagCreateManyArgs>(args?: SelectSubset<T, ArticleTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArticleTags and returns the data saved in the database.
     * @param {ArticleTagCreateManyAndReturnArgs} args - Arguments to create many ArticleTags.
     * @example
     * // Create many ArticleTags
     * const articleTag = await prisma.articleTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArticleTags and only return the `articleId`
     * const articleTagWithArticleIdOnly = await prisma.articleTag.createManyAndReturn({
     *   select: { articleId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleTagCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArticleTag.
     * @param {ArticleTagDeleteArgs} args - Arguments to delete one ArticleTag.
     * @example
     * // Delete one ArticleTag
     * const ArticleTag = await prisma.articleTag.delete({
     *   where: {
     *     // ... filter to delete one ArticleTag
     *   }
     * })
     * 
     */
    delete<T extends ArticleTagDeleteArgs>(args: SelectSubset<T, ArticleTagDeleteArgs<ExtArgs>>): Prisma__ArticleTagClient<$Result.GetResult<Prisma.$ArticleTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArticleTag.
     * @param {ArticleTagUpdateArgs} args - Arguments to update one ArticleTag.
     * @example
     * // Update one ArticleTag
     * const articleTag = await prisma.articleTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleTagUpdateArgs>(args: SelectSubset<T, ArticleTagUpdateArgs<ExtArgs>>): Prisma__ArticleTagClient<$Result.GetResult<Prisma.$ArticleTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArticleTags.
     * @param {ArticleTagDeleteManyArgs} args - Arguments to filter ArticleTags to delete.
     * @example
     * // Delete a few ArticleTags
     * const { count } = await prisma.articleTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleTagDeleteManyArgs>(args?: SelectSubset<T, ArticleTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArticleTags
     * const articleTag = await prisma.articleTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleTagUpdateManyArgs>(args: SelectSubset<T, ArticleTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleTags and returns the data updated in the database.
     * @param {ArticleTagUpdateManyAndReturnArgs} args - Arguments to update many ArticleTags.
     * @example
     * // Update many ArticleTags
     * const articleTag = await prisma.articleTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArticleTags and only return the `articleId`
     * const articleTagWithArticleIdOnly = await prisma.articleTag.updateManyAndReturn({
     *   select: { articleId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArticleTagUpdateManyAndReturnArgs>(args: SelectSubset<T, ArticleTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArticleTag.
     * @param {ArticleTagUpsertArgs} args - Arguments to update or create a ArticleTag.
     * @example
     * // Update or create a ArticleTag
     * const articleTag = await prisma.articleTag.upsert({
     *   create: {
     *     // ... data to create a ArticleTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArticleTag we want to update
     *   }
     * })
     */
    upsert<T extends ArticleTagUpsertArgs>(args: SelectSubset<T, ArticleTagUpsertArgs<ExtArgs>>): Prisma__ArticleTagClient<$Result.GetResult<Prisma.$ArticleTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArticleTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleTagCountArgs} args - Arguments to filter ArticleTags to count.
     * @example
     * // Count the number of ArticleTags
     * const count = await prisma.articleTag.count({
     *   where: {
     *     // ... the filter for the ArticleTags we want to count
     *   }
     * })
    **/
    count<T extends ArticleTagCountArgs>(
      args?: Subset<T, ArticleTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArticleTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArticleTagAggregateArgs>(args: Subset<T, ArticleTagAggregateArgs>): Prisma.PrismaPromise<GetArticleTagAggregateType<T>>

    /**
     * Group by ArticleTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArticleTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleTagGroupByArgs['orderBy'] }
        : { orderBy?: ArticleTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArticleTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArticleTag model
   */
  readonly fields: ArticleTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArticleTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    article<T extends ArticleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArticleDefaultArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ArticleTag model
   */
  interface ArticleTagFieldRefs {
    readonly articleId: FieldRef<"ArticleTag", 'String'>
    readonly tagId: FieldRef<"ArticleTag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ArticleTag findUnique
   */
  export type ArticleTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTag
     */
    select?: ArticleTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTag
     */
    omit?: ArticleTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTagInclude<ExtArgs> | null
    /**
     * Filter, which ArticleTag to fetch.
     */
    where: ArticleTagWhereUniqueInput
  }

  /**
   * ArticleTag findUniqueOrThrow
   */
  export type ArticleTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTag
     */
    select?: ArticleTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTag
     */
    omit?: ArticleTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTagInclude<ExtArgs> | null
    /**
     * Filter, which ArticleTag to fetch.
     */
    where: ArticleTagWhereUniqueInput
  }

  /**
   * ArticleTag findFirst
   */
  export type ArticleTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTag
     */
    select?: ArticleTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTag
     */
    omit?: ArticleTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTagInclude<ExtArgs> | null
    /**
     * Filter, which ArticleTag to fetch.
     */
    where?: ArticleTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleTags to fetch.
     */
    orderBy?: ArticleTagOrderByWithRelationInput | ArticleTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleTags.
     */
    cursor?: ArticleTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleTags.
     */
    distinct?: ArticleTagScalarFieldEnum | ArticleTagScalarFieldEnum[]
  }

  /**
   * ArticleTag findFirstOrThrow
   */
  export type ArticleTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTag
     */
    select?: ArticleTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTag
     */
    omit?: ArticleTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTagInclude<ExtArgs> | null
    /**
     * Filter, which ArticleTag to fetch.
     */
    where?: ArticleTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleTags to fetch.
     */
    orderBy?: ArticleTagOrderByWithRelationInput | ArticleTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleTags.
     */
    cursor?: ArticleTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleTags.
     */
    distinct?: ArticleTagScalarFieldEnum | ArticleTagScalarFieldEnum[]
  }

  /**
   * ArticleTag findMany
   */
  export type ArticleTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTag
     */
    select?: ArticleTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTag
     */
    omit?: ArticleTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTagInclude<ExtArgs> | null
    /**
     * Filter, which ArticleTags to fetch.
     */
    where?: ArticleTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleTags to fetch.
     */
    orderBy?: ArticleTagOrderByWithRelationInput | ArticleTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArticleTags.
     */
    cursor?: ArticleTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleTags.
     */
    skip?: number
    distinct?: ArticleTagScalarFieldEnum | ArticleTagScalarFieldEnum[]
  }

  /**
   * ArticleTag create
   */
  export type ArticleTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTag
     */
    select?: ArticleTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTag
     */
    omit?: ArticleTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTagInclude<ExtArgs> | null
    /**
     * The data needed to create a ArticleTag.
     */
    data: XOR<ArticleTagCreateInput, ArticleTagUncheckedCreateInput>
  }

  /**
   * ArticleTag createMany
   */
  export type ArticleTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArticleTags.
     */
    data: ArticleTagCreateManyInput | ArticleTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArticleTag createManyAndReturn
   */
  export type ArticleTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTag
     */
    select?: ArticleTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTag
     */
    omit?: ArticleTagOmit<ExtArgs> | null
    /**
     * The data used to create many ArticleTags.
     */
    data: ArticleTagCreateManyInput | ArticleTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArticleTag update
   */
  export type ArticleTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTag
     */
    select?: ArticleTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTag
     */
    omit?: ArticleTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTagInclude<ExtArgs> | null
    /**
     * The data needed to update a ArticleTag.
     */
    data: XOR<ArticleTagUpdateInput, ArticleTagUncheckedUpdateInput>
    /**
     * Choose, which ArticleTag to update.
     */
    where: ArticleTagWhereUniqueInput
  }

  /**
   * ArticleTag updateMany
   */
  export type ArticleTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArticleTags.
     */
    data: XOR<ArticleTagUpdateManyMutationInput, ArticleTagUncheckedUpdateManyInput>
    /**
     * Filter which ArticleTags to update
     */
    where?: ArticleTagWhereInput
    /**
     * Limit how many ArticleTags to update.
     */
    limit?: number
  }

  /**
   * ArticleTag updateManyAndReturn
   */
  export type ArticleTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTag
     */
    select?: ArticleTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTag
     */
    omit?: ArticleTagOmit<ExtArgs> | null
    /**
     * The data used to update ArticleTags.
     */
    data: XOR<ArticleTagUpdateManyMutationInput, ArticleTagUncheckedUpdateManyInput>
    /**
     * Filter which ArticleTags to update
     */
    where?: ArticleTagWhereInput
    /**
     * Limit how many ArticleTags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArticleTag upsert
   */
  export type ArticleTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTag
     */
    select?: ArticleTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTag
     */
    omit?: ArticleTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTagInclude<ExtArgs> | null
    /**
     * The filter to search for the ArticleTag to update in case it exists.
     */
    where: ArticleTagWhereUniqueInput
    /**
     * In case the ArticleTag found by the `where` argument doesn't exist, create a new ArticleTag with this data.
     */
    create: XOR<ArticleTagCreateInput, ArticleTagUncheckedCreateInput>
    /**
     * In case the ArticleTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleTagUpdateInput, ArticleTagUncheckedUpdateInput>
  }

  /**
   * ArticleTag delete
   */
  export type ArticleTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTag
     */
    select?: ArticleTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTag
     */
    omit?: ArticleTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTagInclude<ExtArgs> | null
    /**
     * Filter which ArticleTag to delete.
     */
    where: ArticleTagWhereUniqueInput
  }

  /**
   * ArticleTag deleteMany
   */
  export type ArticleTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleTags to delete
     */
    where?: ArticleTagWhereInput
    /**
     * Limit how many ArticleTags to delete.
     */
    limit?: number
  }

  /**
   * ArticleTag without action
   */
  export type ArticleTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTag
     */
    select?: ArticleTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTag
     */
    omit?: ArticleTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTagInclude<ExtArgs> | null
  }


  /**
   * Model Topic
   */

  export type AggregateTopic = {
    _count: TopicCountAggregateOutputType | null
    _min: TopicMinAggregateOutputType | null
    _max: TopicMaxAggregateOutputType | null
  }

  export type TopicMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    enabled: boolean | null
    categoryId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TopicMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    enabled: boolean | null
    categoryId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TopicCountAggregateOutputType = {
    id: number
    name: number
    description: number
    keywords: number
    enabled: number
    categoryId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TopicMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    enabled?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TopicMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    enabled?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TopicCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    keywords?: true
    enabled?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TopicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Topic to aggregate.
     */
    where?: TopicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Topics to fetch.
     */
    orderBy?: TopicOrderByWithRelationInput | TopicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TopicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Topics
    **/
    _count?: true | TopicCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TopicMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TopicMaxAggregateInputType
  }

  export type GetTopicAggregateType<T extends TopicAggregateArgs> = {
        [P in keyof T & keyof AggregateTopic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTopic[P]>
      : GetScalarType<T[P], AggregateTopic[P]>
  }




  export type TopicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TopicWhereInput
    orderBy?: TopicOrderByWithAggregationInput | TopicOrderByWithAggregationInput[]
    by: TopicScalarFieldEnum[] | TopicScalarFieldEnum
    having?: TopicScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TopicCountAggregateInputType | true
    _min?: TopicMinAggregateInputType
    _max?: TopicMaxAggregateInputType
  }

  export type TopicGroupByOutputType = {
    id: string
    name: string
    description: string | null
    keywords: string[]
    enabled: boolean
    categoryId: string | null
    createdAt: Date
    updatedAt: Date
    _count: TopicCountAggregateOutputType | null
    _min: TopicMinAggregateOutputType | null
    _max: TopicMaxAggregateOutputType | null
  }

  type GetTopicGroupByPayload<T extends TopicGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TopicGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TopicGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TopicGroupByOutputType[P]>
            : GetScalarType<T[P], TopicGroupByOutputType[P]>
        }
      >
    >


  export type TopicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    keywords?: boolean
    enabled?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Topic$categoryArgs<ExtArgs>
    sources?: boolean | Topic$sourcesArgs<ExtArgs>
    channels?: boolean | Topic$channelsArgs<ExtArgs>
    _count?: boolean | TopicCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["topic"]>

  export type TopicSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    keywords?: boolean
    enabled?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Topic$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["topic"]>

  export type TopicSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    keywords?: boolean
    enabled?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Topic$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["topic"]>

  export type TopicSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    keywords?: boolean
    enabled?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TopicOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "keywords" | "enabled" | "categoryId" | "createdAt" | "updatedAt", ExtArgs["result"]["topic"]>
  export type TopicInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Topic$categoryArgs<ExtArgs>
    sources?: boolean | Topic$sourcesArgs<ExtArgs>
    channels?: boolean | Topic$channelsArgs<ExtArgs>
    _count?: boolean | TopicCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TopicIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Topic$categoryArgs<ExtArgs>
  }
  export type TopicIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Topic$categoryArgs<ExtArgs>
  }

  export type $TopicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Topic"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs> | null
      sources: Prisma.$ContentSourcePayload<ExtArgs>[]
      channels: Prisma.$YoutubeChannelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      keywords: string[]
      enabled: boolean
      categoryId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["topic"]>
    composites: {}
  }

  type TopicGetPayload<S extends boolean | null | undefined | TopicDefaultArgs> = $Result.GetResult<Prisma.$TopicPayload, S>

  type TopicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TopicFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TopicCountAggregateInputType | true
    }

  export interface TopicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Topic'], meta: { name: 'Topic' } }
    /**
     * Find zero or one Topic that matches the filter.
     * @param {TopicFindUniqueArgs} args - Arguments to find a Topic
     * @example
     * // Get one Topic
     * const topic = await prisma.topic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TopicFindUniqueArgs>(args: SelectSubset<T, TopicFindUniqueArgs<ExtArgs>>): Prisma__TopicClient<$Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Topic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TopicFindUniqueOrThrowArgs} args - Arguments to find a Topic
     * @example
     * // Get one Topic
     * const topic = await prisma.topic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TopicFindUniqueOrThrowArgs>(args: SelectSubset<T, TopicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TopicClient<$Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Topic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicFindFirstArgs} args - Arguments to find a Topic
     * @example
     * // Get one Topic
     * const topic = await prisma.topic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TopicFindFirstArgs>(args?: SelectSubset<T, TopicFindFirstArgs<ExtArgs>>): Prisma__TopicClient<$Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Topic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicFindFirstOrThrowArgs} args - Arguments to find a Topic
     * @example
     * // Get one Topic
     * const topic = await prisma.topic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TopicFindFirstOrThrowArgs>(args?: SelectSubset<T, TopicFindFirstOrThrowArgs<ExtArgs>>): Prisma__TopicClient<$Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Topics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Topics
     * const topics = await prisma.topic.findMany()
     * 
     * // Get first 10 Topics
     * const topics = await prisma.topic.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const topicWithIdOnly = await prisma.topic.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TopicFindManyArgs>(args?: SelectSubset<T, TopicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Topic.
     * @param {TopicCreateArgs} args - Arguments to create a Topic.
     * @example
     * // Create one Topic
     * const Topic = await prisma.topic.create({
     *   data: {
     *     // ... data to create a Topic
     *   }
     * })
     * 
     */
    create<T extends TopicCreateArgs>(args: SelectSubset<T, TopicCreateArgs<ExtArgs>>): Prisma__TopicClient<$Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Topics.
     * @param {TopicCreateManyArgs} args - Arguments to create many Topics.
     * @example
     * // Create many Topics
     * const topic = await prisma.topic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TopicCreateManyArgs>(args?: SelectSubset<T, TopicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Topics and returns the data saved in the database.
     * @param {TopicCreateManyAndReturnArgs} args - Arguments to create many Topics.
     * @example
     * // Create many Topics
     * const topic = await prisma.topic.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Topics and only return the `id`
     * const topicWithIdOnly = await prisma.topic.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TopicCreateManyAndReturnArgs>(args?: SelectSubset<T, TopicCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Topic.
     * @param {TopicDeleteArgs} args - Arguments to delete one Topic.
     * @example
     * // Delete one Topic
     * const Topic = await prisma.topic.delete({
     *   where: {
     *     // ... filter to delete one Topic
     *   }
     * })
     * 
     */
    delete<T extends TopicDeleteArgs>(args: SelectSubset<T, TopicDeleteArgs<ExtArgs>>): Prisma__TopicClient<$Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Topic.
     * @param {TopicUpdateArgs} args - Arguments to update one Topic.
     * @example
     * // Update one Topic
     * const topic = await prisma.topic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TopicUpdateArgs>(args: SelectSubset<T, TopicUpdateArgs<ExtArgs>>): Prisma__TopicClient<$Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Topics.
     * @param {TopicDeleteManyArgs} args - Arguments to filter Topics to delete.
     * @example
     * // Delete a few Topics
     * const { count } = await prisma.topic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TopicDeleteManyArgs>(args?: SelectSubset<T, TopicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Topics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Topics
     * const topic = await prisma.topic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TopicUpdateManyArgs>(args: SelectSubset<T, TopicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Topics and returns the data updated in the database.
     * @param {TopicUpdateManyAndReturnArgs} args - Arguments to update many Topics.
     * @example
     * // Update many Topics
     * const topic = await prisma.topic.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Topics and only return the `id`
     * const topicWithIdOnly = await prisma.topic.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TopicUpdateManyAndReturnArgs>(args: SelectSubset<T, TopicUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Topic.
     * @param {TopicUpsertArgs} args - Arguments to update or create a Topic.
     * @example
     * // Update or create a Topic
     * const topic = await prisma.topic.upsert({
     *   create: {
     *     // ... data to create a Topic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Topic we want to update
     *   }
     * })
     */
    upsert<T extends TopicUpsertArgs>(args: SelectSubset<T, TopicUpsertArgs<ExtArgs>>): Prisma__TopicClient<$Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Topics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicCountArgs} args - Arguments to filter Topics to count.
     * @example
     * // Count the number of Topics
     * const count = await prisma.topic.count({
     *   where: {
     *     // ... the filter for the Topics we want to count
     *   }
     * })
    **/
    count<T extends TopicCountArgs>(
      args?: Subset<T, TopicCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TopicCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Topic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TopicAggregateArgs>(args: Subset<T, TopicAggregateArgs>): Prisma.PrismaPromise<GetTopicAggregateType<T>>

    /**
     * Group by Topic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TopicGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TopicGroupByArgs['orderBy'] }
        : { orderBy?: TopicGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TopicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTopicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Topic model
   */
  readonly fields: TopicFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Topic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TopicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends Topic$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Topic$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sources<T extends Topic$sourcesArgs<ExtArgs> = {}>(args?: Subset<T, Topic$sourcesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentSourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    channels<T extends Topic$channelsArgs<ExtArgs> = {}>(args?: Subset<T, Topic$channelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YoutubeChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Topic model
   */
  interface TopicFieldRefs {
    readonly id: FieldRef<"Topic", 'String'>
    readonly name: FieldRef<"Topic", 'String'>
    readonly description: FieldRef<"Topic", 'String'>
    readonly keywords: FieldRef<"Topic", 'String[]'>
    readonly enabled: FieldRef<"Topic", 'Boolean'>
    readonly categoryId: FieldRef<"Topic", 'String'>
    readonly createdAt: FieldRef<"Topic", 'DateTime'>
    readonly updatedAt: FieldRef<"Topic", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Topic findUnique
   */
  export type TopicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicInclude<ExtArgs> | null
    /**
     * Filter, which Topic to fetch.
     */
    where: TopicWhereUniqueInput
  }

  /**
   * Topic findUniqueOrThrow
   */
  export type TopicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicInclude<ExtArgs> | null
    /**
     * Filter, which Topic to fetch.
     */
    where: TopicWhereUniqueInput
  }

  /**
   * Topic findFirst
   */
  export type TopicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicInclude<ExtArgs> | null
    /**
     * Filter, which Topic to fetch.
     */
    where?: TopicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Topics to fetch.
     */
    orderBy?: TopicOrderByWithRelationInput | TopicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Topics.
     */
    cursor?: TopicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Topics.
     */
    distinct?: TopicScalarFieldEnum | TopicScalarFieldEnum[]
  }

  /**
   * Topic findFirstOrThrow
   */
  export type TopicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicInclude<ExtArgs> | null
    /**
     * Filter, which Topic to fetch.
     */
    where?: TopicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Topics to fetch.
     */
    orderBy?: TopicOrderByWithRelationInput | TopicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Topics.
     */
    cursor?: TopicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Topics.
     */
    distinct?: TopicScalarFieldEnum | TopicScalarFieldEnum[]
  }

  /**
   * Topic findMany
   */
  export type TopicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicInclude<ExtArgs> | null
    /**
     * Filter, which Topics to fetch.
     */
    where?: TopicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Topics to fetch.
     */
    orderBy?: TopicOrderByWithRelationInput | TopicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Topics.
     */
    cursor?: TopicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Topics.
     */
    skip?: number
    distinct?: TopicScalarFieldEnum | TopicScalarFieldEnum[]
  }

  /**
   * Topic create
   */
  export type TopicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicInclude<ExtArgs> | null
    /**
     * The data needed to create a Topic.
     */
    data: XOR<TopicCreateInput, TopicUncheckedCreateInput>
  }

  /**
   * Topic createMany
   */
  export type TopicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Topics.
     */
    data: TopicCreateManyInput | TopicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Topic createManyAndReturn
   */
  export type TopicCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * The data used to create many Topics.
     */
    data: TopicCreateManyInput | TopicCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Topic update
   */
  export type TopicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicInclude<ExtArgs> | null
    /**
     * The data needed to update a Topic.
     */
    data: XOR<TopicUpdateInput, TopicUncheckedUpdateInput>
    /**
     * Choose, which Topic to update.
     */
    where: TopicWhereUniqueInput
  }

  /**
   * Topic updateMany
   */
  export type TopicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Topics.
     */
    data: XOR<TopicUpdateManyMutationInput, TopicUncheckedUpdateManyInput>
    /**
     * Filter which Topics to update
     */
    where?: TopicWhereInput
    /**
     * Limit how many Topics to update.
     */
    limit?: number
  }

  /**
   * Topic updateManyAndReturn
   */
  export type TopicUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * The data used to update Topics.
     */
    data: XOR<TopicUpdateManyMutationInput, TopicUncheckedUpdateManyInput>
    /**
     * Filter which Topics to update
     */
    where?: TopicWhereInput
    /**
     * Limit how many Topics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Topic upsert
   */
  export type TopicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicInclude<ExtArgs> | null
    /**
     * The filter to search for the Topic to update in case it exists.
     */
    where: TopicWhereUniqueInput
    /**
     * In case the Topic found by the `where` argument doesn't exist, create a new Topic with this data.
     */
    create: XOR<TopicCreateInput, TopicUncheckedCreateInput>
    /**
     * In case the Topic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TopicUpdateInput, TopicUncheckedUpdateInput>
  }

  /**
   * Topic delete
   */
  export type TopicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicInclude<ExtArgs> | null
    /**
     * Filter which Topic to delete.
     */
    where: TopicWhereUniqueInput
  }

  /**
   * Topic deleteMany
   */
  export type TopicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Topics to delete
     */
    where?: TopicWhereInput
    /**
     * Limit how many Topics to delete.
     */
    limit?: number
  }

  /**
   * Topic.category
   */
  export type Topic$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Topic.sources
   */
  export type Topic$sourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSource
     */
    select?: ContentSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentSource
     */
    omit?: ContentSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentSourceInclude<ExtArgs> | null
    where?: ContentSourceWhereInput
    orderBy?: ContentSourceOrderByWithRelationInput | ContentSourceOrderByWithRelationInput[]
    cursor?: ContentSourceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContentSourceScalarFieldEnum | ContentSourceScalarFieldEnum[]
  }

  /**
   * Topic.channels
   */
  export type Topic$channelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannel
     */
    select?: YoutubeChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeChannel
     */
    omit?: YoutubeChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YoutubeChannelInclude<ExtArgs> | null
    where?: YoutubeChannelWhereInput
    orderBy?: YoutubeChannelOrderByWithRelationInput | YoutubeChannelOrderByWithRelationInput[]
    cursor?: YoutubeChannelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: YoutubeChannelScalarFieldEnum | YoutubeChannelScalarFieldEnum[]
  }

  /**
   * Topic without action
   */
  export type TopicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicInclude<ExtArgs> | null
  }


  /**
   * Model ContentSource
   */

  export type AggregateContentSource = {
    _count: ContentSourceCountAggregateOutputType | null
    _min: ContentSourceMinAggregateOutputType | null
    _max: ContentSourceMaxAggregateOutputType | null
  }

  export type ContentSourceMinAggregateOutputType = {
    id: string | null
    type: $Enums.SourceType | null
    name: string | null
    url: string | null
    enabled: boolean | null
    topicId: string | null
    lastFetchAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContentSourceMaxAggregateOutputType = {
    id: string | null
    type: $Enums.SourceType | null
    name: string | null
    url: string | null
    enabled: boolean | null
    topicId: string | null
    lastFetchAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContentSourceCountAggregateOutputType = {
    id: number
    type: number
    name: number
    url: number
    config: number
    enabled: number
    topicId: number
    lastFetchAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ContentSourceMinAggregateInputType = {
    id?: true
    type?: true
    name?: true
    url?: true
    enabled?: true
    topicId?: true
    lastFetchAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContentSourceMaxAggregateInputType = {
    id?: true
    type?: true
    name?: true
    url?: true
    enabled?: true
    topicId?: true
    lastFetchAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContentSourceCountAggregateInputType = {
    id?: true
    type?: true
    name?: true
    url?: true
    config?: true
    enabled?: true
    topicId?: true
    lastFetchAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ContentSourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContentSource to aggregate.
     */
    where?: ContentSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContentSources to fetch.
     */
    orderBy?: ContentSourceOrderByWithRelationInput | ContentSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContentSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContentSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContentSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContentSources
    **/
    _count?: true | ContentSourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContentSourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContentSourceMaxAggregateInputType
  }

  export type GetContentSourceAggregateType<T extends ContentSourceAggregateArgs> = {
        [P in keyof T & keyof AggregateContentSource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContentSource[P]>
      : GetScalarType<T[P], AggregateContentSource[P]>
  }




  export type ContentSourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContentSourceWhereInput
    orderBy?: ContentSourceOrderByWithAggregationInput | ContentSourceOrderByWithAggregationInput[]
    by: ContentSourceScalarFieldEnum[] | ContentSourceScalarFieldEnum
    having?: ContentSourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContentSourceCountAggregateInputType | true
    _min?: ContentSourceMinAggregateInputType
    _max?: ContentSourceMaxAggregateInputType
  }

  export type ContentSourceGroupByOutputType = {
    id: string
    type: $Enums.SourceType
    name: string
    url: string | null
    config: JsonValue | null
    enabled: boolean
    topicId: string | null
    lastFetchAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ContentSourceCountAggregateOutputType | null
    _min: ContentSourceMinAggregateOutputType | null
    _max: ContentSourceMaxAggregateOutputType | null
  }

  type GetContentSourceGroupByPayload<T extends ContentSourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContentSourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContentSourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContentSourceGroupByOutputType[P]>
            : GetScalarType<T[P], ContentSourceGroupByOutputType[P]>
        }
      >
    >


  export type ContentSourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    url?: boolean
    config?: boolean
    enabled?: boolean
    topicId?: boolean
    lastFetchAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    topic?: boolean | ContentSource$topicArgs<ExtArgs>
    jobRuns?: boolean | ContentSource$jobRunsArgs<ExtArgs>
    _count?: boolean | ContentSourceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contentSource"]>

  export type ContentSourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    url?: boolean
    config?: boolean
    enabled?: boolean
    topicId?: boolean
    lastFetchAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    topic?: boolean | ContentSource$topicArgs<ExtArgs>
  }, ExtArgs["result"]["contentSource"]>

  export type ContentSourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    url?: boolean
    config?: boolean
    enabled?: boolean
    topicId?: boolean
    lastFetchAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    topic?: boolean | ContentSource$topicArgs<ExtArgs>
  }, ExtArgs["result"]["contentSource"]>

  export type ContentSourceSelectScalar = {
    id?: boolean
    type?: boolean
    name?: boolean
    url?: boolean
    config?: boolean
    enabled?: boolean
    topicId?: boolean
    lastFetchAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ContentSourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "name" | "url" | "config" | "enabled" | "topicId" | "lastFetchAt" | "createdAt" | "updatedAt", ExtArgs["result"]["contentSource"]>
  export type ContentSourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    topic?: boolean | ContentSource$topicArgs<ExtArgs>
    jobRuns?: boolean | ContentSource$jobRunsArgs<ExtArgs>
    _count?: boolean | ContentSourceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContentSourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    topic?: boolean | ContentSource$topicArgs<ExtArgs>
  }
  export type ContentSourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    topic?: boolean | ContentSource$topicArgs<ExtArgs>
  }

  export type $ContentSourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContentSource"
    objects: {
      topic: Prisma.$TopicPayload<ExtArgs> | null
      jobRuns: Prisma.$JobRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.SourceType
      name: string
      url: string | null
      config: Prisma.JsonValue | null
      enabled: boolean
      topicId: string | null
      lastFetchAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["contentSource"]>
    composites: {}
  }

  type ContentSourceGetPayload<S extends boolean | null | undefined | ContentSourceDefaultArgs> = $Result.GetResult<Prisma.$ContentSourcePayload, S>

  type ContentSourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContentSourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContentSourceCountAggregateInputType | true
    }

  export interface ContentSourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContentSource'], meta: { name: 'ContentSource' } }
    /**
     * Find zero or one ContentSource that matches the filter.
     * @param {ContentSourceFindUniqueArgs} args - Arguments to find a ContentSource
     * @example
     * // Get one ContentSource
     * const contentSource = await prisma.contentSource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContentSourceFindUniqueArgs>(args: SelectSubset<T, ContentSourceFindUniqueArgs<ExtArgs>>): Prisma__ContentSourceClient<$Result.GetResult<Prisma.$ContentSourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContentSource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContentSourceFindUniqueOrThrowArgs} args - Arguments to find a ContentSource
     * @example
     * // Get one ContentSource
     * const contentSource = await prisma.contentSource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContentSourceFindUniqueOrThrowArgs>(args: SelectSubset<T, ContentSourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContentSourceClient<$Result.GetResult<Prisma.$ContentSourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContentSource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentSourceFindFirstArgs} args - Arguments to find a ContentSource
     * @example
     * // Get one ContentSource
     * const contentSource = await prisma.contentSource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContentSourceFindFirstArgs>(args?: SelectSubset<T, ContentSourceFindFirstArgs<ExtArgs>>): Prisma__ContentSourceClient<$Result.GetResult<Prisma.$ContentSourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContentSource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentSourceFindFirstOrThrowArgs} args - Arguments to find a ContentSource
     * @example
     * // Get one ContentSource
     * const contentSource = await prisma.contentSource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContentSourceFindFirstOrThrowArgs>(args?: SelectSubset<T, ContentSourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContentSourceClient<$Result.GetResult<Prisma.$ContentSourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContentSources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentSourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContentSources
     * const contentSources = await prisma.contentSource.findMany()
     * 
     * // Get first 10 ContentSources
     * const contentSources = await prisma.contentSource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contentSourceWithIdOnly = await prisma.contentSource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContentSourceFindManyArgs>(args?: SelectSubset<T, ContentSourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentSourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContentSource.
     * @param {ContentSourceCreateArgs} args - Arguments to create a ContentSource.
     * @example
     * // Create one ContentSource
     * const ContentSource = await prisma.contentSource.create({
     *   data: {
     *     // ... data to create a ContentSource
     *   }
     * })
     * 
     */
    create<T extends ContentSourceCreateArgs>(args: SelectSubset<T, ContentSourceCreateArgs<ExtArgs>>): Prisma__ContentSourceClient<$Result.GetResult<Prisma.$ContentSourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContentSources.
     * @param {ContentSourceCreateManyArgs} args - Arguments to create many ContentSources.
     * @example
     * // Create many ContentSources
     * const contentSource = await prisma.contentSource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContentSourceCreateManyArgs>(args?: SelectSubset<T, ContentSourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContentSources and returns the data saved in the database.
     * @param {ContentSourceCreateManyAndReturnArgs} args - Arguments to create many ContentSources.
     * @example
     * // Create many ContentSources
     * const contentSource = await prisma.contentSource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContentSources and only return the `id`
     * const contentSourceWithIdOnly = await prisma.contentSource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContentSourceCreateManyAndReturnArgs>(args?: SelectSubset<T, ContentSourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentSourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContentSource.
     * @param {ContentSourceDeleteArgs} args - Arguments to delete one ContentSource.
     * @example
     * // Delete one ContentSource
     * const ContentSource = await prisma.contentSource.delete({
     *   where: {
     *     // ... filter to delete one ContentSource
     *   }
     * })
     * 
     */
    delete<T extends ContentSourceDeleteArgs>(args: SelectSubset<T, ContentSourceDeleteArgs<ExtArgs>>): Prisma__ContentSourceClient<$Result.GetResult<Prisma.$ContentSourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContentSource.
     * @param {ContentSourceUpdateArgs} args - Arguments to update one ContentSource.
     * @example
     * // Update one ContentSource
     * const contentSource = await prisma.contentSource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContentSourceUpdateArgs>(args: SelectSubset<T, ContentSourceUpdateArgs<ExtArgs>>): Prisma__ContentSourceClient<$Result.GetResult<Prisma.$ContentSourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContentSources.
     * @param {ContentSourceDeleteManyArgs} args - Arguments to filter ContentSources to delete.
     * @example
     * // Delete a few ContentSources
     * const { count } = await prisma.contentSource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContentSourceDeleteManyArgs>(args?: SelectSubset<T, ContentSourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContentSources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentSourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContentSources
     * const contentSource = await prisma.contentSource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContentSourceUpdateManyArgs>(args: SelectSubset<T, ContentSourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContentSources and returns the data updated in the database.
     * @param {ContentSourceUpdateManyAndReturnArgs} args - Arguments to update many ContentSources.
     * @example
     * // Update many ContentSources
     * const contentSource = await prisma.contentSource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContentSources and only return the `id`
     * const contentSourceWithIdOnly = await prisma.contentSource.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContentSourceUpdateManyAndReturnArgs>(args: SelectSubset<T, ContentSourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentSourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContentSource.
     * @param {ContentSourceUpsertArgs} args - Arguments to update or create a ContentSource.
     * @example
     * // Update or create a ContentSource
     * const contentSource = await prisma.contentSource.upsert({
     *   create: {
     *     // ... data to create a ContentSource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContentSource we want to update
     *   }
     * })
     */
    upsert<T extends ContentSourceUpsertArgs>(args: SelectSubset<T, ContentSourceUpsertArgs<ExtArgs>>): Prisma__ContentSourceClient<$Result.GetResult<Prisma.$ContentSourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContentSources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentSourceCountArgs} args - Arguments to filter ContentSources to count.
     * @example
     * // Count the number of ContentSources
     * const count = await prisma.contentSource.count({
     *   where: {
     *     // ... the filter for the ContentSources we want to count
     *   }
     * })
    **/
    count<T extends ContentSourceCountArgs>(
      args?: Subset<T, ContentSourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContentSourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContentSource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentSourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContentSourceAggregateArgs>(args: Subset<T, ContentSourceAggregateArgs>): Prisma.PrismaPromise<GetContentSourceAggregateType<T>>

    /**
     * Group by ContentSource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentSourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContentSourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContentSourceGroupByArgs['orderBy'] }
        : { orderBy?: ContentSourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContentSourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContentSourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContentSource model
   */
  readonly fields: ContentSourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContentSource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContentSourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    topic<T extends ContentSource$topicArgs<ExtArgs> = {}>(args?: Subset<T, ContentSource$topicArgs<ExtArgs>>): Prisma__TopicClient<$Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    jobRuns<T extends ContentSource$jobRunsArgs<ExtArgs> = {}>(args?: Subset<T, ContentSource$jobRunsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContentSource model
   */
  interface ContentSourceFieldRefs {
    readonly id: FieldRef<"ContentSource", 'String'>
    readonly type: FieldRef<"ContentSource", 'SourceType'>
    readonly name: FieldRef<"ContentSource", 'String'>
    readonly url: FieldRef<"ContentSource", 'String'>
    readonly config: FieldRef<"ContentSource", 'Json'>
    readonly enabled: FieldRef<"ContentSource", 'Boolean'>
    readonly topicId: FieldRef<"ContentSource", 'String'>
    readonly lastFetchAt: FieldRef<"ContentSource", 'DateTime'>
    readonly createdAt: FieldRef<"ContentSource", 'DateTime'>
    readonly updatedAt: FieldRef<"ContentSource", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContentSource findUnique
   */
  export type ContentSourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSource
     */
    select?: ContentSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentSource
     */
    omit?: ContentSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentSourceInclude<ExtArgs> | null
    /**
     * Filter, which ContentSource to fetch.
     */
    where: ContentSourceWhereUniqueInput
  }

  /**
   * ContentSource findUniqueOrThrow
   */
  export type ContentSourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSource
     */
    select?: ContentSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentSource
     */
    omit?: ContentSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentSourceInclude<ExtArgs> | null
    /**
     * Filter, which ContentSource to fetch.
     */
    where: ContentSourceWhereUniqueInput
  }

  /**
   * ContentSource findFirst
   */
  export type ContentSourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSource
     */
    select?: ContentSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentSource
     */
    omit?: ContentSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentSourceInclude<ExtArgs> | null
    /**
     * Filter, which ContentSource to fetch.
     */
    where?: ContentSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContentSources to fetch.
     */
    orderBy?: ContentSourceOrderByWithRelationInput | ContentSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContentSources.
     */
    cursor?: ContentSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContentSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContentSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContentSources.
     */
    distinct?: ContentSourceScalarFieldEnum | ContentSourceScalarFieldEnum[]
  }

  /**
   * ContentSource findFirstOrThrow
   */
  export type ContentSourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSource
     */
    select?: ContentSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentSource
     */
    omit?: ContentSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentSourceInclude<ExtArgs> | null
    /**
     * Filter, which ContentSource to fetch.
     */
    where?: ContentSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContentSources to fetch.
     */
    orderBy?: ContentSourceOrderByWithRelationInput | ContentSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContentSources.
     */
    cursor?: ContentSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContentSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContentSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContentSources.
     */
    distinct?: ContentSourceScalarFieldEnum | ContentSourceScalarFieldEnum[]
  }

  /**
   * ContentSource findMany
   */
  export type ContentSourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSource
     */
    select?: ContentSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentSource
     */
    omit?: ContentSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentSourceInclude<ExtArgs> | null
    /**
     * Filter, which ContentSources to fetch.
     */
    where?: ContentSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContentSources to fetch.
     */
    orderBy?: ContentSourceOrderByWithRelationInput | ContentSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContentSources.
     */
    cursor?: ContentSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContentSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContentSources.
     */
    skip?: number
    distinct?: ContentSourceScalarFieldEnum | ContentSourceScalarFieldEnum[]
  }

  /**
   * ContentSource create
   */
  export type ContentSourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSource
     */
    select?: ContentSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentSource
     */
    omit?: ContentSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentSourceInclude<ExtArgs> | null
    /**
     * The data needed to create a ContentSource.
     */
    data: XOR<ContentSourceCreateInput, ContentSourceUncheckedCreateInput>
  }

  /**
   * ContentSource createMany
   */
  export type ContentSourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContentSources.
     */
    data: ContentSourceCreateManyInput | ContentSourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContentSource createManyAndReturn
   */
  export type ContentSourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSource
     */
    select?: ContentSourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContentSource
     */
    omit?: ContentSourceOmit<ExtArgs> | null
    /**
     * The data used to create many ContentSources.
     */
    data: ContentSourceCreateManyInput | ContentSourceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentSourceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContentSource update
   */
  export type ContentSourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSource
     */
    select?: ContentSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentSource
     */
    omit?: ContentSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentSourceInclude<ExtArgs> | null
    /**
     * The data needed to update a ContentSource.
     */
    data: XOR<ContentSourceUpdateInput, ContentSourceUncheckedUpdateInput>
    /**
     * Choose, which ContentSource to update.
     */
    where: ContentSourceWhereUniqueInput
  }

  /**
   * ContentSource updateMany
   */
  export type ContentSourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContentSources.
     */
    data: XOR<ContentSourceUpdateManyMutationInput, ContentSourceUncheckedUpdateManyInput>
    /**
     * Filter which ContentSources to update
     */
    where?: ContentSourceWhereInput
    /**
     * Limit how many ContentSources to update.
     */
    limit?: number
  }

  /**
   * ContentSource updateManyAndReturn
   */
  export type ContentSourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSource
     */
    select?: ContentSourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContentSource
     */
    omit?: ContentSourceOmit<ExtArgs> | null
    /**
     * The data used to update ContentSources.
     */
    data: XOR<ContentSourceUpdateManyMutationInput, ContentSourceUncheckedUpdateManyInput>
    /**
     * Filter which ContentSources to update
     */
    where?: ContentSourceWhereInput
    /**
     * Limit how many ContentSources to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentSourceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContentSource upsert
   */
  export type ContentSourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSource
     */
    select?: ContentSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentSource
     */
    omit?: ContentSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentSourceInclude<ExtArgs> | null
    /**
     * The filter to search for the ContentSource to update in case it exists.
     */
    where: ContentSourceWhereUniqueInput
    /**
     * In case the ContentSource found by the `where` argument doesn't exist, create a new ContentSource with this data.
     */
    create: XOR<ContentSourceCreateInput, ContentSourceUncheckedCreateInput>
    /**
     * In case the ContentSource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContentSourceUpdateInput, ContentSourceUncheckedUpdateInput>
  }

  /**
   * ContentSource delete
   */
  export type ContentSourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSource
     */
    select?: ContentSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentSource
     */
    omit?: ContentSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentSourceInclude<ExtArgs> | null
    /**
     * Filter which ContentSource to delete.
     */
    where: ContentSourceWhereUniqueInput
  }

  /**
   * ContentSource deleteMany
   */
  export type ContentSourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContentSources to delete
     */
    where?: ContentSourceWhereInput
    /**
     * Limit how many ContentSources to delete.
     */
    limit?: number
  }

  /**
   * ContentSource.topic
   */
  export type ContentSource$topicArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicInclude<ExtArgs> | null
    where?: TopicWhereInput
  }

  /**
   * ContentSource.jobRuns
   */
  export type ContentSource$jobRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunInclude<ExtArgs> | null
    where?: JobRunWhereInput
    orderBy?: JobRunOrderByWithRelationInput | JobRunOrderByWithRelationInput[]
    cursor?: JobRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobRunScalarFieldEnum | JobRunScalarFieldEnum[]
  }

  /**
   * ContentSource without action
   */
  export type ContentSourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSource
     */
    select?: ContentSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentSource
     */
    omit?: ContentSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentSourceInclude<ExtArgs> | null
  }


  /**
   * Model YoutubeChannel
   */

  export type AggregateYoutubeChannel = {
    _count: YoutubeChannelCountAggregateOutputType | null
    _min: YoutubeChannelMinAggregateOutputType | null
    _max: YoutubeChannelMaxAggregateOutputType | null
  }

  export type YoutubeChannelMinAggregateOutputType = {
    id: string | null
    channelId: string | null
    channelName: string | null
    channelUrl: string | null
    enabled: boolean | null
    topicId: string | null
    lastCheckedAt: Date | null
    lastVideoId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type YoutubeChannelMaxAggregateOutputType = {
    id: string | null
    channelId: string | null
    channelName: string | null
    channelUrl: string | null
    enabled: boolean | null
    topicId: string | null
    lastCheckedAt: Date | null
    lastVideoId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type YoutubeChannelCountAggregateOutputType = {
    id: number
    channelId: number
    channelName: number
    channelUrl: number
    enabled: number
    topicId: number
    lastCheckedAt: number
    lastVideoId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type YoutubeChannelMinAggregateInputType = {
    id?: true
    channelId?: true
    channelName?: true
    channelUrl?: true
    enabled?: true
    topicId?: true
    lastCheckedAt?: true
    lastVideoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type YoutubeChannelMaxAggregateInputType = {
    id?: true
    channelId?: true
    channelName?: true
    channelUrl?: true
    enabled?: true
    topicId?: true
    lastCheckedAt?: true
    lastVideoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type YoutubeChannelCountAggregateInputType = {
    id?: true
    channelId?: true
    channelName?: true
    channelUrl?: true
    enabled?: true
    topicId?: true
    lastCheckedAt?: true
    lastVideoId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type YoutubeChannelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which YoutubeChannel to aggregate.
     */
    where?: YoutubeChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeChannels to fetch.
     */
    orderBy?: YoutubeChannelOrderByWithRelationInput | YoutubeChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: YoutubeChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeChannels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeChannels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned YoutubeChannels
    **/
    _count?: true | YoutubeChannelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: YoutubeChannelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: YoutubeChannelMaxAggregateInputType
  }

  export type GetYoutubeChannelAggregateType<T extends YoutubeChannelAggregateArgs> = {
        [P in keyof T & keyof AggregateYoutubeChannel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateYoutubeChannel[P]>
      : GetScalarType<T[P], AggregateYoutubeChannel[P]>
  }




  export type YoutubeChannelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: YoutubeChannelWhereInput
    orderBy?: YoutubeChannelOrderByWithAggregationInput | YoutubeChannelOrderByWithAggregationInput[]
    by: YoutubeChannelScalarFieldEnum[] | YoutubeChannelScalarFieldEnum
    having?: YoutubeChannelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: YoutubeChannelCountAggregateInputType | true
    _min?: YoutubeChannelMinAggregateInputType
    _max?: YoutubeChannelMaxAggregateInputType
  }

  export type YoutubeChannelGroupByOutputType = {
    id: string
    channelId: string
    channelName: string
    channelUrl: string
    enabled: boolean
    topicId: string | null
    lastCheckedAt: Date | null
    lastVideoId: string | null
    createdAt: Date
    updatedAt: Date
    _count: YoutubeChannelCountAggregateOutputType | null
    _min: YoutubeChannelMinAggregateOutputType | null
    _max: YoutubeChannelMaxAggregateOutputType | null
  }

  type GetYoutubeChannelGroupByPayload<T extends YoutubeChannelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<YoutubeChannelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof YoutubeChannelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], YoutubeChannelGroupByOutputType[P]>
            : GetScalarType<T[P], YoutubeChannelGroupByOutputType[P]>
        }
      >
    >


  export type YoutubeChannelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    channelId?: boolean
    channelName?: boolean
    channelUrl?: boolean
    enabled?: boolean
    topicId?: boolean
    lastCheckedAt?: boolean
    lastVideoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    topic?: boolean | YoutubeChannel$topicArgs<ExtArgs>
    jobRuns?: boolean | YoutubeChannel$jobRunsArgs<ExtArgs>
    _count?: boolean | YoutubeChannelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["youtubeChannel"]>

  export type YoutubeChannelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    channelId?: boolean
    channelName?: boolean
    channelUrl?: boolean
    enabled?: boolean
    topicId?: boolean
    lastCheckedAt?: boolean
    lastVideoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    topic?: boolean | YoutubeChannel$topicArgs<ExtArgs>
  }, ExtArgs["result"]["youtubeChannel"]>

  export type YoutubeChannelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    channelId?: boolean
    channelName?: boolean
    channelUrl?: boolean
    enabled?: boolean
    topicId?: boolean
    lastCheckedAt?: boolean
    lastVideoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    topic?: boolean | YoutubeChannel$topicArgs<ExtArgs>
  }, ExtArgs["result"]["youtubeChannel"]>

  export type YoutubeChannelSelectScalar = {
    id?: boolean
    channelId?: boolean
    channelName?: boolean
    channelUrl?: boolean
    enabled?: boolean
    topicId?: boolean
    lastCheckedAt?: boolean
    lastVideoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type YoutubeChannelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "channelId" | "channelName" | "channelUrl" | "enabled" | "topicId" | "lastCheckedAt" | "lastVideoId" | "createdAt" | "updatedAt", ExtArgs["result"]["youtubeChannel"]>
  export type YoutubeChannelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    topic?: boolean | YoutubeChannel$topicArgs<ExtArgs>
    jobRuns?: boolean | YoutubeChannel$jobRunsArgs<ExtArgs>
    _count?: boolean | YoutubeChannelCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type YoutubeChannelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    topic?: boolean | YoutubeChannel$topicArgs<ExtArgs>
  }
  export type YoutubeChannelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    topic?: boolean | YoutubeChannel$topicArgs<ExtArgs>
  }

  export type $YoutubeChannelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "YoutubeChannel"
    objects: {
      topic: Prisma.$TopicPayload<ExtArgs> | null
      jobRuns: Prisma.$JobRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      channelId: string
      channelName: string
      channelUrl: string
      enabled: boolean
      topicId: string | null
      lastCheckedAt: Date | null
      lastVideoId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["youtubeChannel"]>
    composites: {}
  }

  type YoutubeChannelGetPayload<S extends boolean | null | undefined | YoutubeChannelDefaultArgs> = $Result.GetResult<Prisma.$YoutubeChannelPayload, S>

  type YoutubeChannelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<YoutubeChannelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: YoutubeChannelCountAggregateInputType | true
    }

  export interface YoutubeChannelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['YoutubeChannel'], meta: { name: 'YoutubeChannel' } }
    /**
     * Find zero or one YoutubeChannel that matches the filter.
     * @param {YoutubeChannelFindUniqueArgs} args - Arguments to find a YoutubeChannel
     * @example
     * // Get one YoutubeChannel
     * const youtubeChannel = await prisma.youtubeChannel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends YoutubeChannelFindUniqueArgs>(args: SelectSubset<T, YoutubeChannelFindUniqueArgs<ExtArgs>>): Prisma__YoutubeChannelClient<$Result.GetResult<Prisma.$YoutubeChannelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one YoutubeChannel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {YoutubeChannelFindUniqueOrThrowArgs} args - Arguments to find a YoutubeChannel
     * @example
     * // Get one YoutubeChannel
     * const youtubeChannel = await prisma.youtubeChannel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends YoutubeChannelFindUniqueOrThrowArgs>(args: SelectSubset<T, YoutubeChannelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__YoutubeChannelClient<$Result.GetResult<Prisma.$YoutubeChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first YoutubeChannel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeChannelFindFirstArgs} args - Arguments to find a YoutubeChannel
     * @example
     * // Get one YoutubeChannel
     * const youtubeChannel = await prisma.youtubeChannel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends YoutubeChannelFindFirstArgs>(args?: SelectSubset<T, YoutubeChannelFindFirstArgs<ExtArgs>>): Prisma__YoutubeChannelClient<$Result.GetResult<Prisma.$YoutubeChannelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first YoutubeChannel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeChannelFindFirstOrThrowArgs} args - Arguments to find a YoutubeChannel
     * @example
     * // Get one YoutubeChannel
     * const youtubeChannel = await prisma.youtubeChannel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends YoutubeChannelFindFirstOrThrowArgs>(args?: SelectSubset<T, YoutubeChannelFindFirstOrThrowArgs<ExtArgs>>): Prisma__YoutubeChannelClient<$Result.GetResult<Prisma.$YoutubeChannelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more YoutubeChannels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeChannelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all YoutubeChannels
     * const youtubeChannels = await prisma.youtubeChannel.findMany()
     * 
     * // Get first 10 YoutubeChannels
     * const youtubeChannels = await prisma.youtubeChannel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const youtubeChannelWithIdOnly = await prisma.youtubeChannel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends YoutubeChannelFindManyArgs>(args?: SelectSubset<T, YoutubeChannelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YoutubeChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a YoutubeChannel.
     * @param {YoutubeChannelCreateArgs} args - Arguments to create a YoutubeChannel.
     * @example
     * // Create one YoutubeChannel
     * const YoutubeChannel = await prisma.youtubeChannel.create({
     *   data: {
     *     // ... data to create a YoutubeChannel
     *   }
     * })
     * 
     */
    create<T extends YoutubeChannelCreateArgs>(args: SelectSubset<T, YoutubeChannelCreateArgs<ExtArgs>>): Prisma__YoutubeChannelClient<$Result.GetResult<Prisma.$YoutubeChannelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many YoutubeChannels.
     * @param {YoutubeChannelCreateManyArgs} args - Arguments to create many YoutubeChannels.
     * @example
     * // Create many YoutubeChannels
     * const youtubeChannel = await prisma.youtubeChannel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends YoutubeChannelCreateManyArgs>(args?: SelectSubset<T, YoutubeChannelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many YoutubeChannels and returns the data saved in the database.
     * @param {YoutubeChannelCreateManyAndReturnArgs} args - Arguments to create many YoutubeChannels.
     * @example
     * // Create many YoutubeChannels
     * const youtubeChannel = await prisma.youtubeChannel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many YoutubeChannels and only return the `id`
     * const youtubeChannelWithIdOnly = await prisma.youtubeChannel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends YoutubeChannelCreateManyAndReturnArgs>(args?: SelectSubset<T, YoutubeChannelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YoutubeChannelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a YoutubeChannel.
     * @param {YoutubeChannelDeleteArgs} args - Arguments to delete one YoutubeChannel.
     * @example
     * // Delete one YoutubeChannel
     * const YoutubeChannel = await prisma.youtubeChannel.delete({
     *   where: {
     *     // ... filter to delete one YoutubeChannel
     *   }
     * })
     * 
     */
    delete<T extends YoutubeChannelDeleteArgs>(args: SelectSubset<T, YoutubeChannelDeleteArgs<ExtArgs>>): Prisma__YoutubeChannelClient<$Result.GetResult<Prisma.$YoutubeChannelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one YoutubeChannel.
     * @param {YoutubeChannelUpdateArgs} args - Arguments to update one YoutubeChannel.
     * @example
     * // Update one YoutubeChannel
     * const youtubeChannel = await prisma.youtubeChannel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends YoutubeChannelUpdateArgs>(args: SelectSubset<T, YoutubeChannelUpdateArgs<ExtArgs>>): Prisma__YoutubeChannelClient<$Result.GetResult<Prisma.$YoutubeChannelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more YoutubeChannels.
     * @param {YoutubeChannelDeleteManyArgs} args - Arguments to filter YoutubeChannels to delete.
     * @example
     * // Delete a few YoutubeChannels
     * const { count } = await prisma.youtubeChannel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends YoutubeChannelDeleteManyArgs>(args?: SelectSubset<T, YoutubeChannelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more YoutubeChannels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeChannelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many YoutubeChannels
     * const youtubeChannel = await prisma.youtubeChannel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends YoutubeChannelUpdateManyArgs>(args: SelectSubset<T, YoutubeChannelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more YoutubeChannels and returns the data updated in the database.
     * @param {YoutubeChannelUpdateManyAndReturnArgs} args - Arguments to update many YoutubeChannels.
     * @example
     * // Update many YoutubeChannels
     * const youtubeChannel = await prisma.youtubeChannel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more YoutubeChannels and only return the `id`
     * const youtubeChannelWithIdOnly = await prisma.youtubeChannel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends YoutubeChannelUpdateManyAndReturnArgs>(args: SelectSubset<T, YoutubeChannelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YoutubeChannelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one YoutubeChannel.
     * @param {YoutubeChannelUpsertArgs} args - Arguments to update or create a YoutubeChannel.
     * @example
     * // Update or create a YoutubeChannel
     * const youtubeChannel = await prisma.youtubeChannel.upsert({
     *   create: {
     *     // ... data to create a YoutubeChannel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the YoutubeChannel we want to update
     *   }
     * })
     */
    upsert<T extends YoutubeChannelUpsertArgs>(args: SelectSubset<T, YoutubeChannelUpsertArgs<ExtArgs>>): Prisma__YoutubeChannelClient<$Result.GetResult<Prisma.$YoutubeChannelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of YoutubeChannels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeChannelCountArgs} args - Arguments to filter YoutubeChannels to count.
     * @example
     * // Count the number of YoutubeChannels
     * const count = await prisma.youtubeChannel.count({
     *   where: {
     *     // ... the filter for the YoutubeChannels we want to count
     *   }
     * })
    **/
    count<T extends YoutubeChannelCountArgs>(
      args?: Subset<T, YoutubeChannelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], YoutubeChannelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a YoutubeChannel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeChannelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends YoutubeChannelAggregateArgs>(args: Subset<T, YoutubeChannelAggregateArgs>): Prisma.PrismaPromise<GetYoutubeChannelAggregateType<T>>

    /**
     * Group by YoutubeChannel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeChannelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends YoutubeChannelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: YoutubeChannelGroupByArgs['orderBy'] }
        : { orderBy?: YoutubeChannelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, YoutubeChannelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetYoutubeChannelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the YoutubeChannel model
   */
  readonly fields: YoutubeChannelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for YoutubeChannel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__YoutubeChannelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    topic<T extends YoutubeChannel$topicArgs<ExtArgs> = {}>(args?: Subset<T, YoutubeChannel$topicArgs<ExtArgs>>): Prisma__TopicClient<$Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    jobRuns<T extends YoutubeChannel$jobRunsArgs<ExtArgs> = {}>(args?: Subset<T, YoutubeChannel$jobRunsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the YoutubeChannel model
   */
  interface YoutubeChannelFieldRefs {
    readonly id: FieldRef<"YoutubeChannel", 'String'>
    readonly channelId: FieldRef<"YoutubeChannel", 'String'>
    readonly channelName: FieldRef<"YoutubeChannel", 'String'>
    readonly channelUrl: FieldRef<"YoutubeChannel", 'String'>
    readonly enabled: FieldRef<"YoutubeChannel", 'Boolean'>
    readonly topicId: FieldRef<"YoutubeChannel", 'String'>
    readonly lastCheckedAt: FieldRef<"YoutubeChannel", 'DateTime'>
    readonly lastVideoId: FieldRef<"YoutubeChannel", 'String'>
    readonly createdAt: FieldRef<"YoutubeChannel", 'DateTime'>
    readonly updatedAt: FieldRef<"YoutubeChannel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * YoutubeChannel findUnique
   */
  export type YoutubeChannelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannel
     */
    select?: YoutubeChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeChannel
     */
    omit?: YoutubeChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YoutubeChannelInclude<ExtArgs> | null
    /**
     * Filter, which YoutubeChannel to fetch.
     */
    where: YoutubeChannelWhereUniqueInput
  }

  /**
   * YoutubeChannel findUniqueOrThrow
   */
  export type YoutubeChannelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannel
     */
    select?: YoutubeChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeChannel
     */
    omit?: YoutubeChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YoutubeChannelInclude<ExtArgs> | null
    /**
     * Filter, which YoutubeChannel to fetch.
     */
    where: YoutubeChannelWhereUniqueInput
  }

  /**
   * YoutubeChannel findFirst
   */
  export type YoutubeChannelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannel
     */
    select?: YoutubeChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeChannel
     */
    omit?: YoutubeChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YoutubeChannelInclude<ExtArgs> | null
    /**
     * Filter, which YoutubeChannel to fetch.
     */
    where?: YoutubeChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeChannels to fetch.
     */
    orderBy?: YoutubeChannelOrderByWithRelationInput | YoutubeChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for YoutubeChannels.
     */
    cursor?: YoutubeChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeChannels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeChannels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YoutubeChannels.
     */
    distinct?: YoutubeChannelScalarFieldEnum | YoutubeChannelScalarFieldEnum[]
  }

  /**
   * YoutubeChannel findFirstOrThrow
   */
  export type YoutubeChannelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannel
     */
    select?: YoutubeChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeChannel
     */
    omit?: YoutubeChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YoutubeChannelInclude<ExtArgs> | null
    /**
     * Filter, which YoutubeChannel to fetch.
     */
    where?: YoutubeChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeChannels to fetch.
     */
    orderBy?: YoutubeChannelOrderByWithRelationInput | YoutubeChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for YoutubeChannels.
     */
    cursor?: YoutubeChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeChannels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeChannels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YoutubeChannels.
     */
    distinct?: YoutubeChannelScalarFieldEnum | YoutubeChannelScalarFieldEnum[]
  }

  /**
   * YoutubeChannel findMany
   */
  export type YoutubeChannelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannel
     */
    select?: YoutubeChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeChannel
     */
    omit?: YoutubeChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YoutubeChannelInclude<ExtArgs> | null
    /**
     * Filter, which YoutubeChannels to fetch.
     */
    where?: YoutubeChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeChannels to fetch.
     */
    orderBy?: YoutubeChannelOrderByWithRelationInput | YoutubeChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing YoutubeChannels.
     */
    cursor?: YoutubeChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeChannels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeChannels.
     */
    skip?: number
    distinct?: YoutubeChannelScalarFieldEnum | YoutubeChannelScalarFieldEnum[]
  }

  /**
   * YoutubeChannel create
   */
  export type YoutubeChannelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannel
     */
    select?: YoutubeChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeChannel
     */
    omit?: YoutubeChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YoutubeChannelInclude<ExtArgs> | null
    /**
     * The data needed to create a YoutubeChannel.
     */
    data: XOR<YoutubeChannelCreateInput, YoutubeChannelUncheckedCreateInput>
  }

  /**
   * YoutubeChannel createMany
   */
  export type YoutubeChannelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many YoutubeChannels.
     */
    data: YoutubeChannelCreateManyInput | YoutubeChannelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * YoutubeChannel createManyAndReturn
   */
  export type YoutubeChannelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannel
     */
    select?: YoutubeChannelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeChannel
     */
    omit?: YoutubeChannelOmit<ExtArgs> | null
    /**
     * The data used to create many YoutubeChannels.
     */
    data: YoutubeChannelCreateManyInput | YoutubeChannelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YoutubeChannelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * YoutubeChannel update
   */
  export type YoutubeChannelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannel
     */
    select?: YoutubeChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeChannel
     */
    omit?: YoutubeChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YoutubeChannelInclude<ExtArgs> | null
    /**
     * The data needed to update a YoutubeChannel.
     */
    data: XOR<YoutubeChannelUpdateInput, YoutubeChannelUncheckedUpdateInput>
    /**
     * Choose, which YoutubeChannel to update.
     */
    where: YoutubeChannelWhereUniqueInput
  }

  /**
   * YoutubeChannel updateMany
   */
  export type YoutubeChannelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update YoutubeChannels.
     */
    data: XOR<YoutubeChannelUpdateManyMutationInput, YoutubeChannelUncheckedUpdateManyInput>
    /**
     * Filter which YoutubeChannels to update
     */
    where?: YoutubeChannelWhereInput
    /**
     * Limit how many YoutubeChannels to update.
     */
    limit?: number
  }

  /**
   * YoutubeChannel updateManyAndReturn
   */
  export type YoutubeChannelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannel
     */
    select?: YoutubeChannelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeChannel
     */
    omit?: YoutubeChannelOmit<ExtArgs> | null
    /**
     * The data used to update YoutubeChannels.
     */
    data: XOR<YoutubeChannelUpdateManyMutationInput, YoutubeChannelUncheckedUpdateManyInput>
    /**
     * Filter which YoutubeChannels to update
     */
    where?: YoutubeChannelWhereInput
    /**
     * Limit how many YoutubeChannels to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YoutubeChannelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * YoutubeChannel upsert
   */
  export type YoutubeChannelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannel
     */
    select?: YoutubeChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeChannel
     */
    omit?: YoutubeChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YoutubeChannelInclude<ExtArgs> | null
    /**
     * The filter to search for the YoutubeChannel to update in case it exists.
     */
    where: YoutubeChannelWhereUniqueInput
    /**
     * In case the YoutubeChannel found by the `where` argument doesn't exist, create a new YoutubeChannel with this data.
     */
    create: XOR<YoutubeChannelCreateInput, YoutubeChannelUncheckedCreateInput>
    /**
     * In case the YoutubeChannel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<YoutubeChannelUpdateInput, YoutubeChannelUncheckedUpdateInput>
  }

  /**
   * YoutubeChannel delete
   */
  export type YoutubeChannelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannel
     */
    select?: YoutubeChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeChannel
     */
    omit?: YoutubeChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YoutubeChannelInclude<ExtArgs> | null
    /**
     * Filter which YoutubeChannel to delete.
     */
    where: YoutubeChannelWhereUniqueInput
  }

  /**
   * YoutubeChannel deleteMany
   */
  export type YoutubeChannelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which YoutubeChannels to delete
     */
    where?: YoutubeChannelWhereInput
    /**
     * Limit how many YoutubeChannels to delete.
     */
    limit?: number
  }

  /**
   * YoutubeChannel.topic
   */
  export type YoutubeChannel$topicArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: TopicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topic
     */
    omit?: TopicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicInclude<ExtArgs> | null
    where?: TopicWhereInput
  }

  /**
   * YoutubeChannel.jobRuns
   */
  export type YoutubeChannel$jobRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunInclude<ExtArgs> | null
    where?: JobRunWhereInput
    orderBy?: JobRunOrderByWithRelationInput | JobRunOrderByWithRelationInput[]
    cursor?: JobRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobRunScalarFieldEnum | JobRunScalarFieldEnum[]
  }

  /**
   * YoutubeChannel without action
   */
  export type YoutubeChannelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannel
     */
    select?: YoutubeChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeChannel
     */
    omit?: YoutubeChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YoutubeChannelInclude<ExtArgs> | null
  }


  /**
   * Model MediaUpload
   */

  export type AggregateMediaUpload = {
    _count: MediaUploadCountAggregateOutputType | null
    _avg: MediaUploadAvgAggregateOutputType | null
    _sum: MediaUploadSumAggregateOutputType | null
    _min: MediaUploadMinAggregateOutputType | null
    _max: MediaUploadMaxAggregateOutputType | null
  }

  export type MediaUploadAvgAggregateOutputType = {
    sizeBytes: number | null
  }

  export type MediaUploadSumAggregateOutputType = {
    sizeBytes: number | null
  }

  export type MediaUploadMinAggregateOutputType = {
    id: string | null
    filename: string | null
    originalName: string | null
    mimeType: string | null
    sizeBytes: number | null
    storagePath: string | null
    transcript: string | null
    processed: boolean | null
    createdAt: Date | null
  }

  export type MediaUploadMaxAggregateOutputType = {
    id: string | null
    filename: string | null
    originalName: string | null
    mimeType: string | null
    sizeBytes: number | null
    storagePath: string | null
    transcript: string | null
    processed: boolean | null
    createdAt: Date | null
  }

  export type MediaUploadCountAggregateOutputType = {
    id: number
    filename: number
    originalName: number
    mimeType: number
    sizeBytes: number
    storagePath: number
    transcript: number
    processed: number
    createdAt: number
    _all: number
  }


  export type MediaUploadAvgAggregateInputType = {
    sizeBytes?: true
  }

  export type MediaUploadSumAggregateInputType = {
    sizeBytes?: true
  }

  export type MediaUploadMinAggregateInputType = {
    id?: true
    filename?: true
    originalName?: true
    mimeType?: true
    sizeBytes?: true
    storagePath?: true
    transcript?: true
    processed?: true
    createdAt?: true
  }

  export type MediaUploadMaxAggregateInputType = {
    id?: true
    filename?: true
    originalName?: true
    mimeType?: true
    sizeBytes?: true
    storagePath?: true
    transcript?: true
    processed?: true
    createdAt?: true
  }

  export type MediaUploadCountAggregateInputType = {
    id?: true
    filename?: true
    originalName?: true
    mimeType?: true
    sizeBytes?: true
    storagePath?: true
    transcript?: true
    processed?: true
    createdAt?: true
    _all?: true
  }

  export type MediaUploadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaUpload to aggregate.
     */
    where?: MediaUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaUploads to fetch.
     */
    orderBy?: MediaUploadOrderByWithRelationInput | MediaUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MediaUploads
    **/
    _count?: true | MediaUploadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaUploadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaUploadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaUploadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaUploadMaxAggregateInputType
  }

  export type GetMediaUploadAggregateType<T extends MediaUploadAggregateArgs> = {
        [P in keyof T & keyof AggregateMediaUpload]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMediaUpload[P]>
      : GetScalarType<T[P], AggregateMediaUpload[P]>
  }




  export type MediaUploadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaUploadWhereInput
    orderBy?: MediaUploadOrderByWithAggregationInput | MediaUploadOrderByWithAggregationInput[]
    by: MediaUploadScalarFieldEnum[] | MediaUploadScalarFieldEnum
    having?: MediaUploadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaUploadCountAggregateInputType | true
    _avg?: MediaUploadAvgAggregateInputType
    _sum?: MediaUploadSumAggregateInputType
    _min?: MediaUploadMinAggregateInputType
    _max?: MediaUploadMaxAggregateInputType
  }

  export type MediaUploadGroupByOutputType = {
    id: string
    filename: string
    originalName: string
    mimeType: string
    sizeBytes: number
    storagePath: string
    transcript: string | null
    processed: boolean
    createdAt: Date
    _count: MediaUploadCountAggregateOutputType | null
    _avg: MediaUploadAvgAggregateOutputType | null
    _sum: MediaUploadSumAggregateOutputType | null
    _min: MediaUploadMinAggregateOutputType | null
    _max: MediaUploadMaxAggregateOutputType | null
  }

  type GetMediaUploadGroupByPayload<T extends MediaUploadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaUploadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaUploadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaUploadGroupByOutputType[P]>
            : GetScalarType<T[P], MediaUploadGroupByOutputType[P]>
        }
      >
    >


  export type MediaUploadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    originalName?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    storagePath?: boolean
    transcript?: boolean
    processed?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["mediaUpload"]>

  export type MediaUploadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    originalName?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    storagePath?: boolean
    transcript?: boolean
    processed?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["mediaUpload"]>

  export type MediaUploadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    originalName?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    storagePath?: boolean
    transcript?: boolean
    processed?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["mediaUpload"]>

  export type MediaUploadSelectScalar = {
    id?: boolean
    filename?: boolean
    originalName?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    storagePath?: boolean
    transcript?: boolean
    processed?: boolean
    createdAt?: boolean
  }

  export type MediaUploadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "filename" | "originalName" | "mimeType" | "sizeBytes" | "storagePath" | "transcript" | "processed" | "createdAt", ExtArgs["result"]["mediaUpload"]>

  export type $MediaUploadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MediaUpload"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      filename: string
      originalName: string
      mimeType: string
      sizeBytes: number
      storagePath: string
      transcript: string | null
      processed: boolean
      createdAt: Date
    }, ExtArgs["result"]["mediaUpload"]>
    composites: {}
  }

  type MediaUploadGetPayload<S extends boolean | null | undefined | MediaUploadDefaultArgs> = $Result.GetResult<Prisma.$MediaUploadPayload, S>

  type MediaUploadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaUploadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaUploadCountAggregateInputType | true
    }

  export interface MediaUploadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MediaUpload'], meta: { name: 'MediaUpload' } }
    /**
     * Find zero or one MediaUpload that matches the filter.
     * @param {MediaUploadFindUniqueArgs} args - Arguments to find a MediaUpload
     * @example
     * // Get one MediaUpload
     * const mediaUpload = await prisma.mediaUpload.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaUploadFindUniqueArgs>(args: SelectSubset<T, MediaUploadFindUniqueArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MediaUpload that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaUploadFindUniqueOrThrowArgs} args - Arguments to find a MediaUpload
     * @example
     * // Get one MediaUpload
     * const mediaUpload = await prisma.mediaUpload.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaUploadFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaUploadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaUpload that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadFindFirstArgs} args - Arguments to find a MediaUpload
     * @example
     * // Get one MediaUpload
     * const mediaUpload = await prisma.mediaUpload.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaUploadFindFirstArgs>(args?: SelectSubset<T, MediaUploadFindFirstArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaUpload that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadFindFirstOrThrowArgs} args - Arguments to find a MediaUpload
     * @example
     * // Get one MediaUpload
     * const mediaUpload = await prisma.mediaUpload.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaUploadFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaUploadFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MediaUploads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MediaUploads
     * const mediaUploads = await prisma.mediaUpload.findMany()
     * 
     * // Get first 10 MediaUploads
     * const mediaUploads = await prisma.mediaUpload.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaUploadWithIdOnly = await prisma.mediaUpload.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaUploadFindManyArgs>(args?: SelectSubset<T, MediaUploadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MediaUpload.
     * @param {MediaUploadCreateArgs} args - Arguments to create a MediaUpload.
     * @example
     * // Create one MediaUpload
     * const MediaUpload = await prisma.mediaUpload.create({
     *   data: {
     *     // ... data to create a MediaUpload
     *   }
     * })
     * 
     */
    create<T extends MediaUploadCreateArgs>(args: SelectSubset<T, MediaUploadCreateArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MediaUploads.
     * @param {MediaUploadCreateManyArgs} args - Arguments to create many MediaUploads.
     * @example
     * // Create many MediaUploads
     * const mediaUpload = await prisma.mediaUpload.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaUploadCreateManyArgs>(args?: SelectSubset<T, MediaUploadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MediaUploads and returns the data saved in the database.
     * @param {MediaUploadCreateManyAndReturnArgs} args - Arguments to create many MediaUploads.
     * @example
     * // Create many MediaUploads
     * const mediaUpload = await prisma.mediaUpload.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MediaUploads and only return the `id`
     * const mediaUploadWithIdOnly = await prisma.mediaUpload.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaUploadCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaUploadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MediaUpload.
     * @param {MediaUploadDeleteArgs} args - Arguments to delete one MediaUpload.
     * @example
     * // Delete one MediaUpload
     * const MediaUpload = await prisma.mediaUpload.delete({
     *   where: {
     *     // ... filter to delete one MediaUpload
     *   }
     * })
     * 
     */
    delete<T extends MediaUploadDeleteArgs>(args: SelectSubset<T, MediaUploadDeleteArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MediaUpload.
     * @param {MediaUploadUpdateArgs} args - Arguments to update one MediaUpload.
     * @example
     * // Update one MediaUpload
     * const mediaUpload = await prisma.mediaUpload.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaUploadUpdateArgs>(args: SelectSubset<T, MediaUploadUpdateArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MediaUploads.
     * @param {MediaUploadDeleteManyArgs} args - Arguments to filter MediaUploads to delete.
     * @example
     * // Delete a few MediaUploads
     * const { count } = await prisma.mediaUpload.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaUploadDeleteManyArgs>(args?: SelectSubset<T, MediaUploadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaUploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MediaUploads
     * const mediaUpload = await prisma.mediaUpload.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaUploadUpdateManyArgs>(args: SelectSubset<T, MediaUploadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaUploads and returns the data updated in the database.
     * @param {MediaUploadUpdateManyAndReturnArgs} args - Arguments to update many MediaUploads.
     * @example
     * // Update many MediaUploads
     * const mediaUpload = await prisma.mediaUpload.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MediaUploads and only return the `id`
     * const mediaUploadWithIdOnly = await prisma.mediaUpload.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MediaUploadUpdateManyAndReturnArgs>(args: SelectSubset<T, MediaUploadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MediaUpload.
     * @param {MediaUploadUpsertArgs} args - Arguments to update or create a MediaUpload.
     * @example
     * // Update or create a MediaUpload
     * const mediaUpload = await prisma.mediaUpload.upsert({
     *   create: {
     *     // ... data to create a MediaUpload
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MediaUpload we want to update
     *   }
     * })
     */
    upsert<T extends MediaUploadUpsertArgs>(args: SelectSubset<T, MediaUploadUpsertArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MediaUploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadCountArgs} args - Arguments to filter MediaUploads to count.
     * @example
     * // Count the number of MediaUploads
     * const count = await prisma.mediaUpload.count({
     *   where: {
     *     // ... the filter for the MediaUploads we want to count
     *   }
     * })
    **/
    count<T extends MediaUploadCountArgs>(
      args?: Subset<T, MediaUploadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaUploadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MediaUpload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaUploadAggregateArgs>(args: Subset<T, MediaUploadAggregateArgs>): Prisma.PrismaPromise<GetMediaUploadAggregateType<T>>

    /**
     * Group by MediaUpload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaUploadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaUploadGroupByArgs['orderBy'] }
        : { orderBy?: MediaUploadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaUploadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaUploadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MediaUpload model
   */
  readonly fields: MediaUploadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MediaUpload.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaUploadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MediaUpload model
   */
  interface MediaUploadFieldRefs {
    readonly id: FieldRef<"MediaUpload", 'String'>
    readonly filename: FieldRef<"MediaUpload", 'String'>
    readonly originalName: FieldRef<"MediaUpload", 'String'>
    readonly mimeType: FieldRef<"MediaUpload", 'String'>
    readonly sizeBytes: FieldRef<"MediaUpload", 'Int'>
    readonly storagePath: FieldRef<"MediaUpload", 'String'>
    readonly transcript: FieldRef<"MediaUpload", 'String'>
    readonly processed: FieldRef<"MediaUpload", 'Boolean'>
    readonly createdAt: FieldRef<"MediaUpload", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MediaUpload findUnique
   */
  export type MediaUploadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Filter, which MediaUpload to fetch.
     */
    where: MediaUploadWhereUniqueInput
  }

  /**
   * MediaUpload findUniqueOrThrow
   */
  export type MediaUploadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Filter, which MediaUpload to fetch.
     */
    where: MediaUploadWhereUniqueInput
  }

  /**
   * MediaUpload findFirst
   */
  export type MediaUploadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Filter, which MediaUpload to fetch.
     */
    where?: MediaUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaUploads to fetch.
     */
    orderBy?: MediaUploadOrderByWithRelationInput | MediaUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaUploads.
     */
    cursor?: MediaUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaUploads.
     */
    distinct?: MediaUploadScalarFieldEnum | MediaUploadScalarFieldEnum[]
  }

  /**
   * MediaUpload findFirstOrThrow
   */
  export type MediaUploadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Filter, which MediaUpload to fetch.
     */
    where?: MediaUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaUploads to fetch.
     */
    orderBy?: MediaUploadOrderByWithRelationInput | MediaUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaUploads.
     */
    cursor?: MediaUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaUploads.
     */
    distinct?: MediaUploadScalarFieldEnum | MediaUploadScalarFieldEnum[]
  }

  /**
   * MediaUpload findMany
   */
  export type MediaUploadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Filter, which MediaUploads to fetch.
     */
    where?: MediaUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaUploads to fetch.
     */
    orderBy?: MediaUploadOrderByWithRelationInput | MediaUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MediaUploads.
     */
    cursor?: MediaUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaUploads.
     */
    skip?: number
    distinct?: MediaUploadScalarFieldEnum | MediaUploadScalarFieldEnum[]
  }

  /**
   * MediaUpload create
   */
  export type MediaUploadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * The data needed to create a MediaUpload.
     */
    data: XOR<MediaUploadCreateInput, MediaUploadUncheckedCreateInput>
  }

  /**
   * MediaUpload createMany
   */
  export type MediaUploadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MediaUploads.
     */
    data: MediaUploadCreateManyInput | MediaUploadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaUpload createManyAndReturn
   */
  export type MediaUploadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * The data used to create many MediaUploads.
     */
    data: MediaUploadCreateManyInput | MediaUploadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaUpload update
   */
  export type MediaUploadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * The data needed to update a MediaUpload.
     */
    data: XOR<MediaUploadUpdateInput, MediaUploadUncheckedUpdateInput>
    /**
     * Choose, which MediaUpload to update.
     */
    where: MediaUploadWhereUniqueInput
  }

  /**
   * MediaUpload updateMany
   */
  export type MediaUploadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MediaUploads.
     */
    data: XOR<MediaUploadUpdateManyMutationInput, MediaUploadUncheckedUpdateManyInput>
    /**
     * Filter which MediaUploads to update
     */
    where?: MediaUploadWhereInput
    /**
     * Limit how many MediaUploads to update.
     */
    limit?: number
  }

  /**
   * MediaUpload updateManyAndReturn
   */
  export type MediaUploadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * The data used to update MediaUploads.
     */
    data: XOR<MediaUploadUpdateManyMutationInput, MediaUploadUncheckedUpdateManyInput>
    /**
     * Filter which MediaUploads to update
     */
    where?: MediaUploadWhereInput
    /**
     * Limit how many MediaUploads to update.
     */
    limit?: number
  }

  /**
   * MediaUpload upsert
   */
  export type MediaUploadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * The filter to search for the MediaUpload to update in case it exists.
     */
    where: MediaUploadWhereUniqueInput
    /**
     * In case the MediaUpload found by the `where` argument doesn't exist, create a new MediaUpload with this data.
     */
    create: XOR<MediaUploadCreateInput, MediaUploadUncheckedCreateInput>
    /**
     * In case the MediaUpload was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaUploadUpdateInput, MediaUploadUncheckedUpdateInput>
  }

  /**
   * MediaUpload delete
   */
  export type MediaUploadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Filter which MediaUpload to delete.
     */
    where: MediaUploadWhereUniqueInput
  }

  /**
   * MediaUpload deleteMany
   */
  export type MediaUploadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaUploads to delete
     */
    where?: MediaUploadWhereInput
    /**
     * Limit how many MediaUploads to delete.
     */
    limit?: number
  }

  /**
   * MediaUpload without action
   */
  export type MediaUploadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
  }


  /**
   * Model JobRun
   */

  export type AggregateJobRun = {
    _count: JobRunCountAggregateOutputType | null
    _min: JobRunMinAggregateOutputType | null
    _max: JobRunMaxAggregateOutputType | null
  }

  export type JobRunMinAggregateOutputType = {
    id: string | null
    type: $Enums.JobType | null
    status: $Enums.JobStatus | null
    bullJobId: string | null
    sourceId: string | null
    channelId: string | null
    errorMessage: string | null
    startedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
  }

  export type JobRunMaxAggregateOutputType = {
    id: string | null
    type: $Enums.JobType | null
    status: $Enums.JobStatus | null
    bullJobId: string | null
    sourceId: string | null
    channelId: string | null
    errorMessage: string | null
    startedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
  }

  export type JobRunCountAggregateOutputType = {
    id: number
    type: number
    status: number
    bullJobId: number
    sourceId: number
    channelId: number
    payload: number
    result: number
    errorMessage: number
    startedAt: number
    completedAt: number
    createdAt: number
    _all: number
  }


  export type JobRunMinAggregateInputType = {
    id?: true
    type?: true
    status?: true
    bullJobId?: true
    sourceId?: true
    channelId?: true
    errorMessage?: true
    startedAt?: true
    completedAt?: true
    createdAt?: true
  }

  export type JobRunMaxAggregateInputType = {
    id?: true
    type?: true
    status?: true
    bullJobId?: true
    sourceId?: true
    channelId?: true
    errorMessage?: true
    startedAt?: true
    completedAt?: true
    createdAt?: true
  }

  export type JobRunCountAggregateInputType = {
    id?: true
    type?: true
    status?: true
    bullJobId?: true
    sourceId?: true
    channelId?: true
    payload?: true
    result?: true
    errorMessage?: true
    startedAt?: true
    completedAt?: true
    createdAt?: true
    _all?: true
  }

  export type JobRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobRun to aggregate.
     */
    where?: JobRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobRuns to fetch.
     */
    orderBy?: JobRunOrderByWithRelationInput | JobRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobRuns
    **/
    _count?: true | JobRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobRunMaxAggregateInputType
  }

  export type GetJobRunAggregateType<T extends JobRunAggregateArgs> = {
        [P in keyof T & keyof AggregateJobRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobRun[P]>
      : GetScalarType<T[P], AggregateJobRun[P]>
  }




  export type JobRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobRunWhereInput
    orderBy?: JobRunOrderByWithAggregationInput | JobRunOrderByWithAggregationInput[]
    by: JobRunScalarFieldEnum[] | JobRunScalarFieldEnum
    having?: JobRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobRunCountAggregateInputType | true
    _min?: JobRunMinAggregateInputType
    _max?: JobRunMaxAggregateInputType
  }

  export type JobRunGroupByOutputType = {
    id: string
    type: $Enums.JobType
    status: $Enums.JobStatus
    bullJobId: string | null
    sourceId: string | null
    channelId: string | null
    payload: JsonValue | null
    result: JsonValue | null
    errorMessage: string | null
    startedAt: Date | null
    completedAt: Date | null
    createdAt: Date
    _count: JobRunCountAggregateOutputType | null
    _min: JobRunMinAggregateOutputType | null
    _max: JobRunMaxAggregateOutputType | null
  }

  type GetJobRunGroupByPayload<T extends JobRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobRunGroupByOutputType[P]>
            : GetScalarType<T[P], JobRunGroupByOutputType[P]>
        }
      >
    >


  export type JobRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    bullJobId?: boolean
    sourceId?: boolean
    channelId?: boolean
    payload?: boolean
    result?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    source?: boolean | JobRun$sourceArgs<ExtArgs>
    channel?: boolean | JobRun$channelArgs<ExtArgs>
    articles?: boolean | JobRun$articlesArgs<ExtArgs>
    _count?: boolean | JobRunCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobRun"]>

  export type JobRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    bullJobId?: boolean
    sourceId?: boolean
    channelId?: boolean
    payload?: boolean
    result?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    source?: boolean | JobRun$sourceArgs<ExtArgs>
    channel?: boolean | JobRun$channelArgs<ExtArgs>
  }, ExtArgs["result"]["jobRun"]>

  export type JobRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    bullJobId?: boolean
    sourceId?: boolean
    channelId?: boolean
    payload?: boolean
    result?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    source?: boolean | JobRun$sourceArgs<ExtArgs>
    channel?: boolean | JobRun$channelArgs<ExtArgs>
  }, ExtArgs["result"]["jobRun"]>

  export type JobRunSelectScalar = {
    id?: boolean
    type?: boolean
    status?: boolean
    bullJobId?: boolean
    sourceId?: boolean
    channelId?: boolean
    payload?: boolean
    result?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
  }

  export type JobRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "status" | "bullJobId" | "sourceId" | "channelId" | "payload" | "result" | "errorMessage" | "startedAt" | "completedAt" | "createdAt", ExtArgs["result"]["jobRun"]>
  export type JobRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | JobRun$sourceArgs<ExtArgs>
    channel?: boolean | JobRun$channelArgs<ExtArgs>
    articles?: boolean | JobRun$articlesArgs<ExtArgs>
    _count?: boolean | JobRunCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | JobRun$sourceArgs<ExtArgs>
    channel?: boolean | JobRun$channelArgs<ExtArgs>
  }
  export type JobRunIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | JobRun$sourceArgs<ExtArgs>
    channel?: boolean | JobRun$channelArgs<ExtArgs>
  }

  export type $JobRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobRun"
    objects: {
      source: Prisma.$ContentSourcePayload<ExtArgs> | null
      channel: Prisma.$YoutubeChannelPayload<ExtArgs> | null
      articles: Prisma.$ArticlePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.JobType
      status: $Enums.JobStatus
      bullJobId: string | null
      sourceId: string | null
      channelId: string | null
      payload: Prisma.JsonValue | null
      result: Prisma.JsonValue | null
      errorMessage: string | null
      startedAt: Date | null
      completedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["jobRun"]>
    composites: {}
  }

  type JobRunGetPayload<S extends boolean | null | undefined | JobRunDefaultArgs> = $Result.GetResult<Prisma.$JobRunPayload, S>

  type JobRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobRunCountAggregateInputType | true
    }

  export interface JobRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobRun'], meta: { name: 'JobRun' } }
    /**
     * Find zero or one JobRun that matches the filter.
     * @param {JobRunFindUniqueArgs} args - Arguments to find a JobRun
     * @example
     * // Get one JobRun
     * const jobRun = await prisma.jobRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobRunFindUniqueArgs>(args: SelectSubset<T, JobRunFindUniqueArgs<ExtArgs>>): Prisma__JobRunClient<$Result.GetResult<Prisma.$JobRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobRunFindUniqueOrThrowArgs} args - Arguments to find a JobRun
     * @example
     * // Get one JobRun
     * const jobRun = await prisma.jobRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobRunFindUniqueOrThrowArgs>(args: SelectSubset<T, JobRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobRunClient<$Result.GetResult<Prisma.$JobRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRunFindFirstArgs} args - Arguments to find a JobRun
     * @example
     * // Get one JobRun
     * const jobRun = await prisma.jobRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobRunFindFirstArgs>(args?: SelectSubset<T, JobRunFindFirstArgs<ExtArgs>>): Prisma__JobRunClient<$Result.GetResult<Prisma.$JobRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRunFindFirstOrThrowArgs} args - Arguments to find a JobRun
     * @example
     * // Get one JobRun
     * const jobRun = await prisma.jobRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobRunFindFirstOrThrowArgs>(args?: SelectSubset<T, JobRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobRunClient<$Result.GetResult<Prisma.$JobRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobRuns
     * const jobRuns = await prisma.jobRun.findMany()
     * 
     * // Get first 10 JobRuns
     * const jobRuns = await prisma.jobRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobRunWithIdOnly = await prisma.jobRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobRunFindManyArgs>(args?: SelectSubset<T, JobRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobRun.
     * @param {JobRunCreateArgs} args - Arguments to create a JobRun.
     * @example
     * // Create one JobRun
     * const JobRun = await prisma.jobRun.create({
     *   data: {
     *     // ... data to create a JobRun
     *   }
     * })
     * 
     */
    create<T extends JobRunCreateArgs>(args: SelectSubset<T, JobRunCreateArgs<ExtArgs>>): Prisma__JobRunClient<$Result.GetResult<Prisma.$JobRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobRuns.
     * @param {JobRunCreateManyArgs} args - Arguments to create many JobRuns.
     * @example
     * // Create many JobRuns
     * const jobRun = await prisma.jobRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobRunCreateManyArgs>(args?: SelectSubset<T, JobRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobRuns and returns the data saved in the database.
     * @param {JobRunCreateManyAndReturnArgs} args - Arguments to create many JobRuns.
     * @example
     * // Create many JobRuns
     * const jobRun = await prisma.jobRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobRuns and only return the `id`
     * const jobRunWithIdOnly = await prisma.jobRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobRunCreateManyAndReturnArgs>(args?: SelectSubset<T, JobRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobRun.
     * @param {JobRunDeleteArgs} args - Arguments to delete one JobRun.
     * @example
     * // Delete one JobRun
     * const JobRun = await prisma.jobRun.delete({
     *   where: {
     *     // ... filter to delete one JobRun
     *   }
     * })
     * 
     */
    delete<T extends JobRunDeleteArgs>(args: SelectSubset<T, JobRunDeleteArgs<ExtArgs>>): Prisma__JobRunClient<$Result.GetResult<Prisma.$JobRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobRun.
     * @param {JobRunUpdateArgs} args - Arguments to update one JobRun.
     * @example
     * // Update one JobRun
     * const jobRun = await prisma.jobRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobRunUpdateArgs>(args: SelectSubset<T, JobRunUpdateArgs<ExtArgs>>): Prisma__JobRunClient<$Result.GetResult<Prisma.$JobRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobRuns.
     * @param {JobRunDeleteManyArgs} args - Arguments to filter JobRuns to delete.
     * @example
     * // Delete a few JobRuns
     * const { count } = await prisma.jobRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobRunDeleteManyArgs>(args?: SelectSubset<T, JobRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobRuns
     * const jobRun = await prisma.jobRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobRunUpdateManyArgs>(args: SelectSubset<T, JobRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobRuns and returns the data updated in the database.
     * @param {JobRunUpdateManyAndReturnArgs} args - Arguments to update many JobRuns.
     * @example
     * // Update many JobRuns
     * const jobRun = await prisma.jobRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobRuns and only return the `id`
     * const jobRunWithIdOnly = await prisma.jobRun.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobRunUpdateManyAndReturnArgs>(args: SelectSubset<T, JobRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobRun.
     * @param {JobRunUpsertArgs} args - Arguments to update or create a JobRun.
     * @example
     * // Update or create a JobRun
     * const jobRun = await prisma.jobRun.upsert({
     *   create: {
     *     // ... data to create a JobRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobRun we want to update
     *   }
     * })
     */
    upsert<T extends JobRunUpsertArgs>(args: SelectSubset<T, JobRunUpsertArgs<ExtArgs>>): Prisma__JobRunClient<$Result.GetResult<Prisma.$JobRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRunCountArgs} args - Arguments to filter JobRuns to count.
     * @example
     * // Count the number of JobRuns
     * const count = await prisma.jobRun.count({
     *   where: {
     *     // ... the filter for the JobRuns we want to count
     *   }
     * })
    **/
    count<T extends JobRunCountArgs>(
      args?: Subset<T, JobRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobRunAggregateArgs>(args: Subset<T, JobRunAggregateArgs>): Prisma.PrismaPromise<GetJobRunAggregateType<T>>

    /**
     * Group by JobRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobRunGroupByArgs['orderBy'] }
        : { orderBy?: JobRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobRun model
   */
  readonly fields: JobRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    source<T extends JobRun$sourceArgs<ExtArgs> = {}>(args?: Subset<T, JobRun$sourceArgs<ExtArgs>>): Prisma__ContentSourceClient<$Result.GetResult<Prisma.$ContentSourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    channel<T extends JobRun$channelArgs<ExtArgs> = {}>(args?: Subset<T, JobRun$channelArgs<ExtArgs>>): Prisma__YoutubeChannelClient<$Result.GetResult<Prisma.$YoutubeChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    articles<T extends JobRun$articlesArgs<ExtArgs> = {}>(args?: Subset<T, JobRun$articlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobRun model
   */
  interface JobRunFieldRefs {
    readonly id: FieldRef<"JobRun", 'String'>
    readonly type: FieldRef<"JobRun", 'JobType'>
    readonly status: FieldRef<"JobRun", 'JobStatus'>
    readonly bullJobId: FieldRef<"JobRun", 'String'>
    readonly sourceId: FieldRef<"JobRun", 'String'>
    readonly channelId: FieldRef<"JobRun", 'String'>
    readonly payload: FieldRef<"JobRun", 'Json'>
    readonly result: FieldRef<"JobRun", 'Json'>
    readonly errorMessage: FieldRef<"JobRun", 'String'>
    readonly startedAt: FieldRef<"JobRun", 'DateTime'>
    readonly completedAt: FieldRef<"JobRun", 'DateTime'>
    readonly createdAt: FieldRef<"JobRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobRun findUnique
   */
  export type JobRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunInclude<ExtArgs> | null
    /**
     * Filter, which JobRun to fetch.
     */
    where: JobRunWhereUniqueInput
  }

  /**
   * JobRun findUniqueOrThrow
   */
  export type JobRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunInclude<ExtArgs> | null
    /**
     * Filter, which JobRun to fetch.
     */
    where: JobRunWhereUniqueInput
  }

  /**
   * JobRun findFirst
   */
  export type JobRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunInclude<ExtArgs> | null
    /**
     * Filter, which JobRun to fetch.
     */
    where?: JobRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobRuns to fetch.
     */
    orderBy?: JobRunOrderByWithRelationInput | JobRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobRuns.
     */
    cursor?: JobRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobRuns.
     */
    distinct?: JobRunScalarFieldEnum | JobRunScalarFieldEnum[]
  }

  /**
   * JobRun findFirstOrThrow
   */
  export type JobRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunInclude<ExtArgs> | null
    /**
     * Filter, which JobRun to fetch.
     */
    where?: JobRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobRuns to fetch.
     */
    orderBy?: JobRunOrderByWithRelationInput | JobRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobRuns.
     */
    cursor?: JobRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobRuns.
     */
    distinct?: JobRunScalarFieldEnum | JobRunScalarFieldEnum[]
  }

  /**
   * JobRun findMany
   */
  export type JobRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunInclude<ExtArgs> | null
    /**
     * Filter, which JobRuns to fetch.
     */
    where?: JobRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobRuns to fetch.
     */
    orderBy?: JobRunOrderByWithRelationInput | JobRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobRuns.
     */
    cursor?: JobRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobRuns.
     */
    skip?: number
    distinct?: JobRunScalarFieldEnum | JobRunScalarFieldEnum[]
  }

  /**
   * JobRun create
   */
  export type JobRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunInclude<ExtArgs> | null
    /**
     * The data needed to create a JobRun.
     */
    data: XOR<JobRunCreateInput, JobRunUncheckedCreateInput>
  }

  /**
   * JobRun createMany
   */
  export type JobRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobRuns.
     */
    data: JobRunCreateManyInput | JobRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobRun createManyAndReturn
   */
  export type JobRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * The data used to create many JobRuns.
     */
    data: JobRunCreateManyInput | JobRunCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobRun update
   */
  export type JobRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunInclude<ExtArgs> | null
    /**
     * The data needed to update a JobRun.
     */
    data: XOR<JobRunUpdateInput, JobRunUncheckedUpdateInput>
    /**
     * Choose, which JobRun to update.
     */
    where: JobRunWhereUniqueInput
  }

  /**
   * JobRun updateMany
   */
  export type JobRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobRuns.
     */
    data: XOR<JobRunUpdateManyMutationInput, JobRunUncheckedUpdateManyInput>
    /**
     * Filter which JobRuns to update
     */
    where?: JobRunWhereInput
    /**
     * Limit how many JobRuns to update.
     */
    limit?: number
  }

  /**
   * JobRun updateManyAndReturn
   */
  export type JobRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * The data used to update JobRuns.
     */
    data: XOR<JobRunUpdateManyMutationInput, JobRunUncheckedUpdateManyInput>
    /**
     * Filter which JobRuns to update
     */
    where?: JobRunWhereInput
    /**
     * Limit how many JobRuns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobRun upsert
   */
  export type JobRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunInclude<ExtArgs> | null
    /**
     * The filter to search for the JobRun to update in case it exists.
     */
    where: JobRunWhereUniqueInput
    /**
     * In case the JobRun found by the `where` argument doesn't exist, create a new JobRun with this data.
     */
    create: XOR<JobRunCreateInput, JobRunUncheckedCreateInput>
    /**
     * In case the JobRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobRunUpdateInput, JobRunUncheckedUpdateInput>
  }

  /**
   * JobRun delete
   */
  export type JobRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunInclude<ExtArgs> | null
    /**
     * Filter which JobRun to delete.
     */
    where: JobRunWhereUniqueInput
  }

  /**
   * JobRun deleteMany
   */
  export type JobRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobRuns to delete
     */
    where?: JobRunWhereInput
    /**
     * Limit how many JobRuns to delete.
     */
    limit?: number
  }

  /**
   * JobRun.source
   */
  export type JobRun$sourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentSource
     */
    select?: ContentSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentSource
     */
    omit?: ContentSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentSourceInclude<ExtArgs> | null
    where?: ContentSourceWhereInput
  }

  /**
   * JobRun.channel
   */
  export type JobRun$channelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeChannel
     */
    select?: YoutubeChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeChannel
     */
    omit?: YoutubeChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YoutubeChannelInclude<ExtArgs> | null
    where?: YoutubeChannelWhereInput
  }

  /**
   * JobRun.articles
   */
  export type JobRun$articlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    cursor?: ArticleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * JobRun without action
   */
  export type JobRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRun
     */
    select?: JobRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRun
     */
    omit?: JobRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRunInclude<ExtArgs> | null
  }


  /**
   * Model AiConfig
   */

  export type AggregateAiConfig = {
    _count: AiConfigCountAggregateOutputType | null
    _avg: AiConfigAvgAggregateOutputType | null
    _sum: AiConfigSumAggregateOutputType | null
    _min: AiConfigMinAggregateOutputType | null
    _max: AiConfigMaxAggregateOutputType | null
  }

  export type AiConfigAvgAggregateOutputType = {
    temperature: number | null
    maxTokens: number | null
  }

  export type AiConfigSumAggregateOutputType = {
    temperature: number | null
    maxTokens: number | null
  }

  export type AiConfigMinAggregateOutputType = {
    id: string | null
    provider: $Enums.AIProvider | null
    model: string | null
    temperature: number | null
    maxTokens: number | null
    baseUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiConfigMaxAggregateOutputType = {
    id: string | null
    provider: $Enums.AIProvider | null
    model: string | null
    temperature: number | null
    maxTokens: number | null
    baseUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiConfigCountAggregateOutputType = {
    id: number
    provider: number
    model: number
    temperature: number
    maxTokens: number
    baseUrl: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AiConfigAvgAggregateInputType = {
    temperature?: true
    maxTokens?: true
  }

  export type AiConfigSumAggregateInputType = {
    temperature?: true
    maxTokens?: true
  }

  export type AiConfigMinAggregateInputType = {
    id?: true
    provider?: true
    model?: true
    temperature?: true
    maxTokens?: true
    baseUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiConfigMaxAggregateInputType = {
    id?: true
    provider?: true
    model?: true
    temperature?: true
    maxTokens?: true
    baseUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiConfigCountAggregateInputType = {
    id?: true
    provider?: true
    model?: true
    temperature?: true
    maxTokens?: true
    baseUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AiConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiConfig to aggregate.
     */
    where?: AiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiConfigs to fetch.
     */
    orderBy?: AiConfigOrderByWithRelationInput | AiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiConfigs
    **/
    _count?: true | AiConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AiConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AiConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiConfigMaxAggregateInputType
  }

  export type GetAiConfigAggregateType<T extends AiConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateAiConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiConfig[P]>
      : GetScalarType<T[P], AggregateAiConfig[P]>
  }




  export type AiConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiConfigWhereInput
    orderBy?: AiConfigOrderByWithAggregationInput | AiConfigOrderByWithAggregationInput[]
    by: AiConfigScalarFieldEnum[] | AiConfigScalarFieldEnum
    having?: AiConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiConfigCountAggregateInputType | true
    _avg?: AiConfigAvgAggregateInputType
    _sum?: AiConfigSumAggregateInputType
    _min?: AiConfigMinAggregateInputType
    _max?: AiConfigMaxAggregateInputType
  }

  export type AiConfigGroupByOutputType = {
    id: string
    provider: $Enums.AIProvider
    model: string
    temperature: number
    maxTokens: number
    baseUrl: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: AiConfigCountAggregateOutputType | null
    _avg: AiConfigAvgAggregateOutputType | null
    _sum: AiConfigSumAggregateOutputType | null
    _min: AiConfigMinAggregateOutputType | null
    _max: AiConfigMaxAggregateOutputType | null
  }

  type GetAiConfigGroupByPayload<T extends AiConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiConfigGroupByOutputType[P]>
            : GetScalarType<T[P], AiConfigGroupByOutputType[P]>
        }
      >
    >


  export type AiConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    model?: boolean
    temperature?: boolean
    maxTokens?: boolean
    baseUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aiConfig"]>

  export type AiConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    model?: boolean
    temperature?: boolean
    maxTokens?: boolean
    baseUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aiConfig"]>

  export type AiConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    model?: boolean
    temperature?: boolean
    maxTokens?: boolean
    baseUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aiConfig"]>

  export type AiConfigSelectScalar = {
    id?: boolean
    provider?: boolean
    model?: boolean
    temperature?: boolean
    maxTokens?: boolean
    baseUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AiConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "model" | "temperature" | "maxTokens" | "baseUrl" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["aiConfig"]>

  export type $AiConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: $Enums.AIProvider
      model: string
      temperature: number
      maxTokens: number
      baseUrl: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aiConfig"]>
    composites: {}
  }

  type AiConfigGetPayload<S extends boolean | null | undefined | AiConfigDefaultArgs> = $Result.GetResult<Prisma.$AiConfigPayload, S>

  type AiConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiConfigCountAggregateInputType | true
    }

  export interface AiConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiConfig'], meta: { name: 'AiConfig' } }
    /**
     * Find zero or one AiConfig that matches the filter.
     * @param {AiConfigFindUniqueArgs} args - Arguments to find a AiConfig
     * @example
     * // Get one AiConfig
     * const aiConfig = await prisma.aiConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiConfigFindUniqueArgs>(args: SelectSubset<T, AiConfigFindUniqueArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiConfigFindUniqueOrThrowArgs} args - Arguments to find a AiConfig
     * @example
     * // Get one AiConfig
     * const aiConfig = await prisma.aiConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, AiConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConfigFindFirstArgs} args - Arguments to find a AiConfig
     * @example
     * // Get one AiConfig
     * const aiConfig = await prisma.aiConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiConfigFindFirstArgs>(args?: SelectSubset<T, AiConfigFindFirstArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConfigFindFirstOrThrowArgs} args - Arguments to find a AiConfig
     * @example
     * // Get one AiConfig
     * const aiConfig = await prisma.aiConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, AiConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiConfigs
     * const aiConfigs = await prisma.aiConfig.findMany()
     * 
     * // Get first 10 AiConfigs
     * const aiConfigs = await prisma.aiConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiConfigWithIdOnly = await prisma.aiConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiConfigFindManyArgs>(args?: SelectSubset<T, AiConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiConfig.
     * @param {AiConfigCreateArgs} args - Arguments to create a AiConfig.
     * @example
     * // Create one AiConfig
     * const AiConfig = await prisma.aiConfig.create({
     *   data: {
     *     // ... data to create a AiConfig
     *   }
     * })
     * 
     */
    create<T extends AiConfigCreateArgs>(args: SelectSubset<T, AiConfigCreateArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiConfigs.
     * @param {AiConfigCreateManyArgs} args - Arguments to create many AiConfigs.
     * @example
     * // Create many AiConfigs
     * const aiConfig = await prisma.aiConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiConfigCreateManyArgs>(args?: SelectSubset<T, AiConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiConfigs and returns the data saved in the database.
     * @param {AiConfigCreateManyAndReturnArgs} args - Arguments to create many AiConfigs.
     * @example
     * // Create many AiConfigs
     * const aiConfig = await prisma.aiConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiConfigs and only return the `id`
     * const aiConfigWithIdOnly = await prisma.aiConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, AiConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AiConfig.
     * @param {AiConfigDeleteArgs} args - Arguments to delete one AiConfig.
     * @example
     * // Delete one AiConfig
     * const AiConfig = await prisma.aiConfig.delete({
     *   where: {
     *     // ... filter to delete one AiConfig
     *   }
     * })
     * 
     */
    delete<T extends AiConfigDeleteArgs>(args: SelectSubset<T, AiConfigDeleteArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiConfig.
     * @param {AiConfigUpdateArgs} args - Arguments to update one AiConfig.
     * @example
     * // Update one AiConfig
     * const aiConfig = await prisma.aiConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiConfigUpdateArgs>(args: SelectSubset<T, AiConfigUpdateArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiConfigs.
     * @param {AiConfigDeleteManyArgs} args - Arguments to filter AiConfigs to delete.
     * @example
     * // Delete a few AiConfigs
     * const { count } = await prisma.aiConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiConfigDeleteManyArgs>(args?: SelectSubset<T, AiConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiConfigs
     * const aiConfig = await prisma.aiConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiConfigUpdateManyArgs>(args: SelectSubset<T, AiConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiConfigs and returns the data updated in the database.
     * @param {AiConfigUpdateManyAndReturnArgs} args - Arguments to update many AiConfigs.
     * @example
     * // Update many AiConfigs
     * const aiConfig = await prisma.aiConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AiConfigs and only return the `id`
     * const aiConfigWithIdOnly = await prisma.aiConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AiConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, AiConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AiConfig.
     * @param {AiConfigUpsertArgs} args - Arguments to update or create a AiConfig.
     * @example
     * // Update or create a AiConfig
     * const aiConfig = await prisma.aiConfig.upsert({
     *   create: {
     *     // ... data to create a AiConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiConfig we want to update
     *   }
     * })
     */
    upsert<T extends AiConfigUpsertArgs>(args: SelectSubset<T, AiConfigUpsertArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AiConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConfigCountArgs} args - Arguments to filter AiConfigs to count.
     * @example
     * // Count the number of AiConfigs
     * const count = await prisma.aiConfig.count({
     *   where: {
     *     // ... the filter for the AiConfigs we want to count
     *   }
     * })
    **/
    count<T extends AiConfigCountArgs>(
      args?: Subset<T, AiConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiConfigAggregateArgs>(args: Subset<T, AiConfigAggregateArgs>): Prisma.PrismaPromise<GetAiConfigAggregateType<T>>

    /**
     * Group by AiConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiConfigGroupByArgs['orderBy'] }
        : { orderBy?: AiConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiConfig model
   */
  readonly fields: AiConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiConfig model
   */
  interface AiConfigFieldRefs {
    readonly id: FieldRef<"AiConfig", 'String'>
    readonly provider: FieldRef<"AiConfig", 'AIProvider'>
    readonly model: FieldRef<"AiConfig", 'String'>
    readonly temperature: FieldRef<"AiConfig", 'Float'>
    readonly maxTokens: FieldRef<"AiConfig", 'Int'>
    readonly baseUrl: FieldRef<"AiConfig", 'String'>
    readonly isActive: FieldRef<"AiConfig", 'Boolean'>
    readonly createdAt: FieldRef<"AiConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"AiConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiConfig findUnique
   */
  export type AiConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * Filter, which AiConfig to fetch.
     */
    where: AiConfigWhereUniqueInput
  }

  /**
   * AiConfig findUniqueOrThrow
   */
  export type AiConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * Filter, which AiConfig to fetch.
     */
    where: AiConfigWhereUniqueInput
  }

  /**
   * AiConfig findFirst
   */
  export type AiConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * Filter, which AiConfig to fetch.
     */
    where?: AiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiConfigs to fetch.
     */
    orderBy?: AiConfigOrderByWithRelationInput | AiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiConfigs.
     */
    cursor?: AiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiConfigs.
     */
    distinct?: AiConfigScalarFieldEnum | AiConfigScalarFieldEnum[]
  }

  /**
   * AiConfig findFirstOrThrow
   */
  export type AiConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * Filter, which AiConfig to fetch.
     */
    where?: AiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiConfigs to fetch.
     */
    orderBy?: AiConfigOrderByWithRelationInput | AiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiConfigs.
     */
    cursor?: AiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiConfigs.
     */
    distinct?: AiConfigScalarFieldEnum | AiConfigScalarFieldEnum[]
  }

  /**
   * AiConfig findMany
   */
  export type AiConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * Filter, which AiConfigs to fetch.
     */
    where?: AiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiConfigs to fetch.
     */
    orderBy?: AiConfigOrderByWithRelationInput | AiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiConfigs.
     */
    cursor?: AiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiConfigs.
     */
    skip?: number
    distinct?: AiConfigScalarFieldEnum | AiConfigScalarFieldEnum[]
  }

  /**
   * AiConfig create
   */
  export type AiConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a AiConfig.
     */
    data: XOR<AiConfigCreateInput, AiConfigUncheckedCreateInput>
  }

  /**
   * AiConfig createMany
   */
  export type AiConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiConfigs.
     */
    data: AiConfigCreateManyInput | AiConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiConfig createManyAndReturn
   */
  export type AiConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * The data used to create many AiConfigs.
     */
    data: AiConfigCreateManyInput | AiConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiConfig update
   */
  export type AiConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a AiConfig.
     */
    data: XOR<AiConfigUpdateInput, AiConfigUncheckedUpdateInput>
    /**
     * Choose, which AiConfig to update.
     */
    where: AiConfigWhereUniqueInput
  }

  /**
   * AiConfig updateMany
   */
  export type AiConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiConfigs.
     */
    data: XOR<AiConfigUpdateManyMutationInput, AiConfigUncheckedUpdateManyInput>
    /**
     * Filter which AiConfigs to update
     */
    where?: AiConfigWhereInput
    /**
     * Limit how many AiConfigs to update.
     */
    limit?: number
  }

  /**
   * AiConfig updateManyAndReturn
   */
  export type AiConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * The data used to update AiConfigs.
     */
    data: XOR<AiConfigUpdateManyMutationInput, AiConfigUncheckedUpdateManyInput>
    /**
     * Filter which AiConfigs to update
     */
    where?: AiConfigWhereInput
    /**
     * Limit how many AiConfigs to update.
     */
    limit?: number
  }

  /**
   * AiConfig upsert
   */
  export type AiConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the AiConfig to update in case it exists.
     */
    where: AiConfigWhereUniqueInput
    /**
     * In case the AiConfig found by the `where` argument doesn't exist, create a new AiConfig with this data.
     */
    create: XOR<AiConfigCreateInput, AiConfigUncheckedCreateInput>
    /**
     * In case the AiConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiConfigUpdateInput, AiConfigUncheckedUpdateInput>
  }

  /**
   * AiConfig delete
   */
  export type AiConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * Filter which AiConfig to delete.
     */
    where: AiConfigWhereUniqueInput
  }

  /**
   * AiConfig deleteMany
   */
  export type AiConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiConfigs to delete
     */
    where?: AiConfigWhereInput
    /**
     * Limit how many AiConfigs to delete.
     */
    limit?: number
  }

  /**
   * AiConfig without action
   */
  export type AiConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    emailVerified: 'emailVerified',
    name: 'name',
    image: 'image',
    role: 'role',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const ArticleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    excerpt: 'excerpt',
    content: 'content',
    metaTitle: 'metaTitle',
    metaDescription: 'metaDescription',
    ogImage: 'ogImage',
    keywords: 'keywords',
    status: 'status',
    publishedAt: 'publishedAt',
    featured: 'featured',
    viewCount: 'viewCount',
    sourceType: 'sourceType',
    sourceUrl: 'sourceUrl',
    sourceId: 'sourceId',
    aiGenerated: 'aiGenerated',
    aiModel: 'aiModel',
    aiPromptVersion: 'aiPromptVersion',
    categoryId: 'categoryId',
    jobRunId: 'jobRunId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArticleScalarFieldEnum = (typeof ArticleScalarFieldEnum)[keyof typeof ArticleScalarFieldEnum]


  export const ArticleTagScalarFieldEnum: {
    articleId: 'articleId',
    tagId: 'tagId'
  };

  export type ArticleTagScalarFieldEnum = (typeof ArticleTagScalarFieldEnum)[keyof typeof ArticleTagScalarFieldEnum]


  export const TopicScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    keywords: 'keywords',
    enabled: 'enabled',
    categoryId: 'categoryId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TopicScalarFieldEnum = (typeof TopicScalarFieldEnum)[keyof typeof TopicScalarFieldEnum]


  export const ContentSourceScalarFieldEnum: {
    id: 'id',
    type: 'type',
    name: 'name',
    url: 'url',
    config: 'config',
    enabled: 'enabled',
    topicId: 'topicId',
    lastFetchAt: 'lastFetchAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ContentSourceScalarFieldEnum = (typeof ContentSourceScalarFieldEnum)[keyof typeof ContentSourceScalarFieldEnum]


  export const YoutubeChannelScalarFieldEnum: {
    id: 'id',
    channelId: 'channelId',
    channelName: 'channelName',
    channelUrl: 'channelUrl',
    enabled: 'enabled',
    topicId: 'topicId',
    lastCheckedAt: 'lastCheckedAt',
    lastVideoId: 'lastVideoId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type YoutubeChannelScalarFieldEnum = (typeof YoutubeChannelScalarFieldEnum)[keyof typeof YoutubeChannelScalarFieldEnum]


  export const MediaUploadScalarFieldEnum: {
    id: 'id',
    filename: 'filename',
    originalName: 'originalName',
    mimeType: 'mimeType',
    sizeBytes: 'sizeBytes',
    storagePath: 'storagePath',
    transcript: 'transcript',
    processed: 'processed',
    createdAt: 'createdAt'
  };

  export type MediaUploadScalarFieldEnum = (typeof MediaUploadScalarFieldEnum)[keyof typeof MediaUploadScalarFieldEnum]


  export const JobRunScalarFieldEnum: {
    id: 'id',
    type: 'type',
    status: 'status',
    bullJobId: 'bullJobId',
    sourceId: 'sourceId',
    channelId: 'channelId',
    payload: 'payload',
    result: 'result',
    errorMessage: 'errorMessage',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    createdAt: 'createdAt'
  };

  export type JobRunScalarFieldEnum = (typeof JobRunScalarFieldEnum)[keyof typeof JobRunScalarFieldEnum]


  export const AiConfigScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    model: 'model',
    temperature: 'temperature',
    maxTokens: 'maxTokens',
    baseUrl: 'baseUrl',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AiConfigScalarFieldEnum = (typeof AiConfigScalarFieldEnum)[keyof typeof AiConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ArticleStatus'
   */
  export type EnumArticleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ArticleStatus'>
    


  /**
   * Reference to a field of type 'ArticleStatus[]'
   */
  export type ListEnumArticleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ArticleStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'SourceType'
   */
  export type EnumSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceType'>
    


  /**
   * Reference to a field of type 'SourceType[]'
   */
  export type ListEnumSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'JobType'
   */
  export type EnumJobTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobType'>
    


  /**
   * Reference to a field of type 'JobType[]'
   */
  export type ListEnumJobTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobType[]'>
    


  /**
   * Reference to a field of type 'JobStatus'
   */
  export type EnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus'>
    


  /**
   * Reference to a field of type 'JobStatus[]'
   */
  export type ListEnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus[]'>
    


  /**
   * Reference to a field of type 'AIProvider'
   */
  export type EnumAIProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIProvider'>
    


  /**
   * Reference to a field of type 'AIProvider[]'
   */
  export type ListEnumAIProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIProvider[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    passwordHash?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    passwordHash?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    articles?: ArticleListRelationFilter
    topics?: TopicListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    articles?: ArticleOrderByRelationAggregateInput
    topics?: TopicOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    description?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    articles?: ArticleListRelationFilter
    topics?: TopicListRelationFilter
  }, "id" | "name" | "slug">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    slug?: StringWithAggregatesFilter<"Category"> | string
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    slug?: StringFilter<"Tag"> | string
    articles?: ArticleTagListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    articles?: ArticleTagOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    articles?: ArticleTagListRelationFilter
  }, "id" | "name" | "slug">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tag"> | string
    name?: StringWithAggregatesFilter<"Tag"> | string
    slug?: StringWithAggregatesFilter<"Tag"> | string
  }

  export type ArticleWhereInput = {
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    id?: StringFilter<"Article"> | string
    title?: StringFilter<"Article"> | string
    slug?: StringFilter<"Article"> | string
    excerpt?: StringNullableFilter<"Article"> | string | null
    content?: StringFilter<"Article"> | string
    metaTitle?: StringNullableFilter<"Article"> | string | null
    metaDescription?: StringNullableFilter<"Article"> | string | null
    ogImage?: StringNullableFilter<"Article"> | string | null
    keywords?: StringNullableListFilter<"Article">
    status?: EnumArticleStatusFilter<"Article"> | $Enums.ArticleStatus
    publishedAt?: DateTimeNullableFilter<"Article"> | Date | string | null
    featured?: BoolFilter<"Article"> | boolean
    viewCount?: IntFilter<"Article"> | number
    sourceType?: EnumSourceTypeNullableFilter<"Article"> | $Enums.SourceType | null
    sourceUrl?: StringNullableFilter<"Article"> | string | null
    sourceId?: StringNullableFilter<"Article"> | string | null
    aiGenerated?: BoolFilter<"Article"> | boolean
    aiModel?: StringNullableFilter<"Article"> | string | null
    aiPromptVersion?: StringNullableFilter<"Article"> | string | null
    categoryId?: StringNullableFilter<"Article"> | string | null
    jobRunId?: StringNullableFilter<"Article"> | string | null
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    tags?: ArticleTagListRelationFilter
    jobRun?: XOR<JobRunNullableScalarRelationFilter, JobRunWhereInput> | null
  }

  export type ArticleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    content?: SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    ogImage?: SortOrderInput | SortOrder
    keywords?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    featured?: SortOrder
    viewCount?: SortOrder
    sourceType?: SortOrderInput | SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    sourceId?: SortOrderInput | SortOrder
    aiGenerated?: SortOrder
    aiModel?: SortOrderInput | SortOrder
    aiPromptVersion?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    jobRunId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    tags?: ArticleTagOrderByRelationAggregateInput
    jobRun?: JobRunOrderByWithRelationInput
  }

  export type ArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    title?: StringFilter<"Article"> | string
    excerpt?: StringNullableFilter<"Article"> | string | null
    content?: StringFilter<"Article"> | string
    metaTitle?: StringNullableFilter<"Article"> | string | null
    metaDescription?: StringNullableFilter<"Article"> | string | null
    ogImage?: StringNullableFilter<"Article"> | string | null
    keywords?: StringNullableListFilter<"Article">
    status?: EnumArticleStatusFilter<"Article"> | $Enums.ArticleStatus
    publishedAt?: DateTimeNullableFilter<"Article"> | Date | string | null
    featured?: BoolFilter<"Article"> | boolean
    viewCount?: IntFilter<"Article"> | number
    sourceType?: EnumSourceTypeNullableFilter<"Article"> | $Enums.SourceType | null
    sourceUrl?: StringNullableFilter<"Article"> | string | null
    sourceId?: StringNullableFilter<"Article"> | string | null
    aiGenerated?: BoolFilter<"Article"> | boolean
    aiModel?: StringNullableFilter<"Article"> | string | null
    aiPromptVersion?: StringNullableFilter<"Article"> | string | null
    categoryId?: StringNullableFilter<"Article"> | string | null
    jobRunId?: StringNullableFilter<"Article"> | string | null
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    tags?: ArticleTagListRelationFilter
    jobRun?: XOR<JobRunNullableScalarRelationFilter, JobRunWhereInput> | null
  }, "id" | "slug">

  export type ArticleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    content?: SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    ogImage?: SortOrderInput | SortOrder
    keywords?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    featured?: SortOrder
    viewCount?: SortOrder
    sourceType?: SortOrderInput | SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    sourceId?: SortOrderInput | SortOrder
    aiGenerated?: SortOrder
    aiModel?: SortOrderInput | SortOrder
    aiPromptVersion?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    jobRunId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArticleCountOrderByAggregateInput
    _avg?: ArticleAvgOrderByAggregateInput
    _max?: ArticleMaxOrderByAggregateInput
    _min?: ArticleMinOrderByAggregateInput
    _sum?: ArticleSumOrderByAggregateInput
  }

  export type ArticleScalarWhereWithAggregatesInput = {
    AND?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    OR?: ArticleScalarWhereWithAggregatesInput[]
    NOT?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Article"> | string
    title?: StringWithAggregatesFilter<"Article"> | string
    slug?: StringWithAggregatesFilter<"Article"> | string
    excerpt?: StringNullableWithAggregatesFilter<"Article"> | string | null
    content?: StringWithAggregatesFilter<"Article"> | string
    metaTitle?: StringNullableWithAggregatesFilter<"Article"> | string | null
    metaDescription?: StringNullableWithAggregatesFilter<"Article"> | string | null
    ogImage?: StringNullableWithAggregatesFilter<"Article"> | string | null
    keywords?: StringNullableListFilter<"Article">
    status?: EnumArticleStatusWithAggregatesFilter<"Article"> | $Enums.ArticleStatus
    publishedAt?: DateTimeNullableWithAggregatesFilter<"Article"> | Date | string | null
    featured?: BoolWithAggregatesFilter<"Article"> | boolean
    viewCount?: IntWithAggregatesFilter<"Article"> | number
    sourceType?: EnumSourceTypeNullableWithAggregatesFilter<"Article"> | $Enums.SourceType | null
    sourceUrl?: StringNullableWithAggregatesFilter<"Article"> | string | null
    sourceId?: StringNullableWithAggregatesFilter<"Article"> | string | null
    aiGenerated?: BoolWithAggregatesFilter<"Article"> | boolean
    aiModel?: StringNullableWithAggregatesFilter<"Article"> | string | null
    aiPromptVersion?: StringNullableWithAggregatesFilter<"Article"> | string | null
    categoryId?: StringNullableWithAggregatesFilter<"Article"> | string | null
    jobRunId?: StringNullableWithAggregatesFilter<"Article"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
  }

  export type ArticleTagWhereInput = {
    AND?: ArticleTagWhereInput | ArticleTagWhereInput[]
    OR?: ArticleTagWhereInput[]
    NOT?: ArticleTagWhereInput | ArticleTagWhereInput[]
    articleId?: StringFilter<"ArticleTag"> | string
    tagId?: StringFilter<"ArticleTag"> | string
    article?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type ArticleTagOrderByWithRelationInput = {
    articleId?: SortOrder
    tagId?: SortOrder
    article?: ArticleOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type ArticleTagWhereUniqueInput = Prisma.AtLeast<{
    articleId_tagId?: ArticleTagArticleIdTagIdCompoundUniqueInput
    AND?: ArticleTagWhereInput | ArticleTagWhereInput[]
    OR?: ArticleTagWhereInput[]
    NOT?: ArticleTagWhereInput | ArticleTagWhereInput[]
    articleId?: StringFilter<"ArticleTag"> | string
    tagId?: StringFilter<"ArticleTag"> | string
    article?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "articleId_tagId">

  export type ArticleTagOrderByWithAggregationInput = {
    articleId?: SortOrder
    tagId?: SortOrder
    _count?: ArticleTagCountOrderByAggregateInput
    _max?: ArticleTagMaxOrderByAggregateInput
    _min?: ArticleTagMinOrderByAggregateInput
  }

  export type ArticleTagScalarWhereWithAggregatesInput = {
    AND?: ArticleTagScalarWhereWithAggregatesInput | ArticleTagScalarWhereWithAggregatesInput[]
    OR?: ArticleTagScalarWhereWithAggregatesInput[]
    NOT?: ArticleTagScalarWhereWithAggregatesInput | ArticleTagScalarWhereWithAggregatesInput[]
    articleId?: StringWithAggregatesFilter<"ArticleTag"> | string
    tagId?: StringWithAggregatesFilter<"ArticleTag"> | string
  }

  export type TopicWhereInput = {
    AND?: TopicWhereInput | TopicWhereInput[]
    OR?: TopicWhereInput[]
    NOT?: TopicWhereInput | TopicWhereInput[]
    id?: StringFilter<"Topic"> | string
    name?: StringFilter<"Topic"> | string
    description?: StringNullableFilter<"Topic"> | string | null
    keywords?: StringNullableListFilter<"Topic">
    enabled?: BoolFilter<"Topic"> | boolean
    categoryId?: StringNullableFilter<"Topic"> | string | null
    createdAt?: DateTimeFilter<"Topic"> | Date | string
    updatedAt?: DateTimeFilter<"Topic"> | Date | string
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    sources?: ContentSourceListRelationFilter
    channels?: YoutubeChannelListRelationFilter
  }

  export type TopicOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    keywords?: SortOrder
    enabled?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    sources?: ContentSourceOrderByRelationAggregateInput
    channels?: YoutubeChannelOrderByRelationAggregateInput
  }

  export type TopicWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TopicWhereInput | TopicWhereInput[]
    OR?: TopicWhereInput[]
    NOT?: TopicWhereInput | TopicWhereInput[]
    description?: StringNullableFilter<"Topic"> | string | null
    keywords?: StringNullableListFilter<"Topic">
    enabled?: BoolFilter<"Topic"> | boolean
    categoryId?: StringNullableFilter<"Topic"> | string | null
    createdAt?: DateTimeFilter<"Topic"> | Date | string
    updatedAt?: DateTimeFilter<"Topic"> | Date | string
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    sources?: ContentSourceListRelationFilter
    channels?: YoutubeChannelListRelationFilter
  }, "id" | "name">

  export type TopicOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    keywords?: SortOrder
    enabled?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TopicCountOrderByAggregateInput
    _max?: TopicMaxOrderByAggregateInput
    _min?: TopicMinOrderByAggregateInput
  }

  export type TopicScalarWhereWithAggregatesInput = {
    AND?: TopicScalarWhereWithAggregatesInput | TopicScalarWhereWithAggregatesInput[]
    OR?: TopicScalarWhereWithAggregatesInput[]
    NOT?: TopicScalarWhereWithAggregatesInput | TopicScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Topic"> | string
    name?: StringWithAggregatesFilter<"Topic"> | string
    description?: StringNullableWithAggregatesFilter<"Topic"> | string | null
    keywords?: StringNullableListFilter<"Topic">
    enabled?: BoolWithAggregatesFilter<"Topic"> | boolean
    categoryId?: StringNullableWithAggregatesFilter<"Topic"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Topic"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Topic"> | Date | string
  }

  export type ContentSourceWhereInput = {
    AND?: ContentSourceWhereInput | ContentSourceWhereInput[]
    OR?: ContentSourceWhereInput[]
    NOT?: ContentSourceWhereInput | ContentSourceWhereInput[]
    id?: StringFilter<"ContentSource"> | string
    type?: EnumSourceTypeFilter<"ContentSource"> | $Enums.SourceType
    name?: StringFilter<"ContentSource"> | string
    url?: StringNullableFilter<"ContentSource"> | string | null
    config?: JsonNullableFilter<"ContentSource">
    enabled?: BoolFilter<"ContentSource"> | boolean
    topicId?: StringNullableFilter<"ContentSource"> | string | null
    lastFetchAt?: DateTimeNullableFilter<"ContentSource"> | Date | string | null
    createdAt?: DateTimeFilter<"ContentSource"> | Date | string
    updatedAt?: DateTimeFilter<"ContentSource"> | Date | string
    topic?: XOR<TopicNullableScalarRelationFilter, TopicWhereInput> | null
    jobRuns?: JobRunListRelationFilter
  }

  export type ContentSourceOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    url?: SortOrderInput | SortOrder
    config?: SortOrderInput | SortOrder
    enabled?: SortOrder
    topicId?: SortOrderInput | SortOrder
    lastFetchAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    topic?: TopicOrderByWithRelationInput
    jobRuns?: JobRunOrderByRelationAggregateInput
  }

  export type ContentSourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContentSourceWhereInput | ContentSourceWhereInput[]
    OR?: ContentSourceWhereInput[]
    NOT?: ContentSourceWhereInput | ContentSourceWhereInput[]
    type?: EnumSourceTypeFilter<"ContentSource"> | $Enums.SourceType
    name?: StringFilter<"ContentSource"> | string
    url?: StringNullableFilter<"ContentSource"> | string | null
    config?: JsonNullableFilter<"ContentSource">
    enabled?: BoolFilter<"ContentSource"> | boolean
    topicId?: StringNullableFilter<"ContentSource"> | string | null
    lastFetchAt?: DateTimeNullableFilter<"ContentSource"> | Date | string | null
    createdAt?: DateTimeFilter<"ContentSource"> | Date | string
    updatedAt?: DateTimeFilter<"ContentSource"> | Date | string
    topic?: XOR<TopicNullableScalarRelationFilter, TopicWhereInput> | null
    jobRuns?: JobRunListRelationFilter
  }, "id">

  export type ContentSourceOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    url?: SortOrderInput | SortOrder
    config?: SortOrderInput | SortOrder
    enabled?: SortOrder
    topicId?: SortOrderInput | SortOrder
    lastFetchAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ContentSourceCountOrderByAggregateInput
    _max?: ContentSourceMaxOrderByAggregateInput
    _min?: ContentSourceMinOrderByAggregateInput
  }

  export type ContentSourceScalarWhereWithAggregatesInput = {
    AND?: ContentSourceScalarWhereWithAggregatesInput | ContentSourceScalarWhereWithAggregatesInput[]
    OR?: ContentSourceScalarWhereWithAggregatesInput[]
    NOT?: ContentSourceScalarWhereWithAggregatesInput | ContentSourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContentSource"> | string
    type?: EnumSourceTypeWithAggregatesFilter<"ContentSource"> | $Enums.SourceType
    name?: StringWithAggregatesFilter<"ContentSource"> | string
    url?: StringNullableWithAggregatesFilter<"ContentSource"> | string | null
    config?: JsonNullableWithAggregatesFilter<"ContentSource">
    enabled?: BoolWithAggregatesFilter<"ContentSource"> | boolean
    topicId?: StringNullableWithAggregatesFilter<"ContentSource"> | string | null
    lastFetchAt?: DateTimeNullableWithAggregatesFilter<"ContentSource"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ContentSource"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ContentSource"> | Date | string
  }

  export type YoutubeChannelWhereInput = {
    AND?: YoutubeChannelWhereInput | YoutubeChannelWhereInput[]
    OR?: YoutubeChannelWhereInput[]
    NOT?: YoutubeChannelWhereInput | YoutubeChannelWhereInput[]
    id?: StringFilter<"YoutubeChannel"> | string
    channelId?: StringFilter<"YoutubeChannel"> | string
    channelName?: StringFilter<"YoutubeChannel"> | string
    channelUrl?: StringFilter<"YoutubeChannel"> | string
    enabled?: BoolFilter<"YoutubeChannel"> | boolean
    topicId?: StringNullableFilter<"YoutubeChannel"> | string | null
    lastCheckedAt?: DateTimeNullableFilter<"YoutubeChannel"> | Date | string | null
    lastVideoId?: StringNullableFilter<"YoutubeChannel"> | string | null
    createdAt?: DateTimeFilter<"YoutubeChannel"> | Date | string
    updatedAt?: DateTimeFilter<"YoutubeChannel"> | Date | string
    topic?: XOR<TopicNullableScalarRelationFilter, TopicWhereInput> | null
    jobRuns?: JobRunListRelationFilter
  }

  export type YoutubeChannelOrderByWithRelationInput = {
    id?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    channelUrl?: SortOrder
    enabled?: SortOrder
    topicId?: SortOrderInput | SortOrder
    lastCheckedAt?: SortOrderInput | SortOrder
    lastVideoId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    topic?: TopicOrderByWithRelationInput
    jobRuns?: JobRunOrderByRelationAggregateInput
  }

  export type YoutubeChannelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    channelId?: string
    AND?: YoutubeChannelWhereInput | YoutubeChannelWhereInput[]
    OR?: YoutubeChannelWhereInput[]
    NOT?: YoutubeChannelWhereInput | YoutubeChannelWhereInput[]
    channelName?: StringFilter<"YoutubeChannel"> | string
    channelUrl?: StringFilter<"YoutubeChannel"> | string
    enabled?: BoolFilter<"YoutubeChannel"> | boolean
    topicId?: StringNullableFilter<"YoutubeChannel"> | string | null
    lastCheckedAt?: DateTimeNullableFilter<"YoutubeChannel"> | Date | string | null
    lastVideoId?: StringNullableFilter<"YoutubeChannel"> | string | null
    createdAt?: DateTimeFilter<"YoutubeChannel"> | Date | string
    updatedAt?: DateTimeFilter<"YoutubeChannel"> | Date | string
    topic?: XOR<TopicNullableScalarRelationFilter, TopicWhereInput> | null
    jobRuns?: JobRunListRelationFilter
  }, "id" | "channelId">

  export type YoutubeChannelOrderByWithAggregationInput = {
    id?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    channelUrl?: SortOrder
    enabled?: SortOrder
    topicId?: SortOrderInput | SortOrder
    lastCheckedAt?: SortOrderInput | SortOrder
    lastVideoId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: YoutubeChannelCountOrderByAggregateInput
    _max?: YoutubeChannelMaxOrderByAggregateInput
    _min?: YoutubeChannelMinOrderByAggregateInput
  }

  export type YoutubeChannelScalarWhereWithAggregatesInput = {
    AND?: YoutubeChannelScalarWhereWithAggregatesInput | YoutubeChannelScalarWhereWithAggregatesInput[]
    OR?: YoutubeChannelScalarWhereWithAggregatesInput[]
    NOT?: YoutubeChannelScalarWhereWithAggregatesInput | YoutubeChannelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"YoutubeChannel"> | string
    channelId?: StringWithAggregatesFilter<"YoutubeChannel"> | string
    channelName?: StringWithAggregatesFilter<"YoutubeChannel"> | string
    channelUrl?: StringWithAggregatesFilter<"YoutubeChannel"> | string
    enabled?: BoolWithAggregatesFilter<"YoutubeChannel"> | boolean
    topicId?: StringNullableWithAggregatesFilter<"YoutubeChannel"> | string | null
    lastCheckedAt?: DateTimeNullableWithAggregatesFilter<"YoutubeChannel"> | Date | string | null
    lastVideoId?: StringNullableWithAggregatesFilter<"YoutubeChannel"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"YoutubeChannel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"YoutubeChannel"> | Date | string
  }

  export type MediaUploadWhereInput = {
    AND?: MediaUploadWhereInput | MediaUploadWhereInput[]
    OR?: MediaUploadWhereInput[]
    NOT?: MediaUploadWhereInput | MediaUploadWhereInput[]
    id?: StringFilter<"MediaUpload"> | string
    filename?: StringFilter<"MediaUpload"> | string
    originalName?: StringFilter<"MediaUpload"> | string
    mimeType?: StringFilter<"MediaUpload"> | string
    sizeBytes?: IntFilter<"MediaUpload"> | number
    storagePath?: StringFilter<"MediaUpload"> | string
    transcript?: StringNullableFilter<"MediaUpload"> | string | null
    processed?: BoolFilter<"MediaUpload"> | boolean
    createdAt?: DateTimeFilter<"MediaUpload"> | Date | string
  }

  export type MediaUploadOrderByWithRelationInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    storagePath?: SortOrder
    transcript?: SortOrderInput | SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaUploadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MediaUploadWhereInput | MediaUploadWhereInput[]
    OR?: MediaUploadWhereInput[]
    NOT?: MediaUploadWhereInput | MediaUploadWhereInput[]
    filename?: StringFilter<"MediaUpload"> | string
    originalName?: StringFilter<"MediaUpload"> | string
    mimeType?: StringFilter<"MediaUpload"> | string
    sizeBytes?: IntFilter<"MediaUpload"> | number
    storagePath?: StringFilter<"MediaUpload"> | string
    transcript?: StringNullableFilter<"MediaUpload"> | string | null
    processed?: BoolFilter<"MediaUpload"> | boolean
    createdAt?: DateTimeFilter<"MediaUpload"> | Date | string
  }, "id">

  export type MediaUploadOrderByWithAggregationInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    storagePath?: SortOrder
    transcript?: SortOrderInput | SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
    _count?: MediaUploadCountOrderByAggregateInput
    _avg?: MediaUploadAvgOrderByAggregateInput
    _max?: MediaUploadMaxOrderByAggregateInput
    _min?: MediaUploadMinOrderByAggregateInput
    _sum?: MediaUploadSumOrderByAggregateInput
  }

  export type MediaUploadScalarWhereWithAggregatesInput = {
    AND?: MediaUploadScalarWhereWithAggregatesInput | MediaUploadScalarWhereWithAggregatesInput[]
    OR?: MediaUploadScalarWhereWithAggregatesInput[]
    NOT?: MediaUploadScalarWhereWithAggregatesInput | MediaUploadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MediaUpload"> | string
    filename?: StringWithAggregatesFilter<"MediaUpload"> | string
    originalName?: StringWithAggregatesFilter<"MediaUpload"> | string
    mimeType?: StringWithAggregatesFilter<"MediaUpload"> | string
    sizeBytes?: IntWithAggregatesFilter<"MediaUpload"> | number
    storagePath?: StringWithAggregatesFilter<"MediaUpload"> | string
    transcript?: StringNullableWithAggregatesFilter<"MediaUpload"> | string | null
    processed?: BoolWithAggregatesFilter<"MediaUpload"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MediaUpload"> | Date | string
  }

  export type JobRunWhereInput = {
    AND?: JobRunWhereInput | JobRunWhereInput[]
    OR?: JobRunWhereInput[]
    NOT?: JobRunWhereInput | JobRunWhereInput[]
    id?: StringFilter<"JobRun"> | string
    type?: EnumJobTypeFilter<"JobRun"> | $Enums.JobType
    status?: EnumJobStatusFilter<"JobRun"> | $Enums.JobStatus
    bullJobId?: StringNullableFilter<"JobRun"> | string | null
    sourceId?: StringNullableFilter<"JobRun"> | string | null
    channelId?: StringNullableFilter<"JobRun"> | string | null
    payload?: JsonNullableFilter<"JobRun">
    result?: JsonNullableFilter<"JobRun">
    errorMessage?: StringNullableFilter<"JobRun"> | string | null
    startedAt?: DateTimeNullableFilter<"JobRun"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"JobRun"> | Date | string | null
    createdAt?: DateTimeFilter<"JobRun"> | Date | string
    source?: XOR<ContentSourceNullableScalarRelationFilter, ContentSourceWhereInput> | null
    channel?: XOR<YoutubeChannelNullableScalarRelationFilter, YoutubeChannelWhereInput> | null
    articles?: ArticleListRelationFilter
  }

  export type JobRunOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    bullJobId?: SortOrderInput | SortOrder
    sourceId?: SortOrderInput | SortOrder
    channelId?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    source?: ContentSourceOrderByWithRelationInput
    channel?: YoutubeChannelOrderByWithRelationInput
    articles?: ArticleOrderByRelationAggregateInput
  }

  export type JobRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobRunWhereInput | JobRunWhereInput[]
    OR?: JobRunWhereInput[]
    NOT?: JobRunWhereInput | JobRunWhereInput[]
    type?: EnumJobTypeFilter<"JobRun"> | $Enums.JobType
    status?: EnumJobStatusFilter<"JobRun"> | $Enums.JobStatus
    bullJobId?: StringNullableFilter<"JobRun"> | string | null
    sourceId?: StringNullableFilter<"JobRun"> | string | null
    channelId?: StringNullableFilter<"JobRun"> | string | null
    payload?: JsonNullableFilter<"JobRun">
    result?: JsonNullableFilter<"JobRun">
    errorMessage?: StringNullableFilter<"JobRun"> | string | null
    startedAt?: DateTimeNullableFilter<"JobRun"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"JobRun"> | Date | string | null
    createdAt?: DateTimeFilter<"JobRun"> | Date | string
    source?: XOR<ContentSourceNullableScalarRelationFilter, ContentSourceWhereInput> | null
    channel?: XOR<YoutubeChannelNullableScalarRelationFilter, YoutubeChannelWhereInput> | null
    articles?: ArticleListRelationFilter
  }, "id">

  export type JobRunOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    bullJobId?: SortOrderInput | SortOrder
    sourceId?: SortOrderInput | SortOrder
    channelId?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: JobRunCountOrderByAggregateInput
    _max?: JobRunMaxOrderByAggregateInput
    _min?: JobRunMinOrderByAggregateInput
  }

  export type JobRunScalarWhereWithAggregatesInput = {
    AND?: JobRunScalarWhereWithAggregatesInput | JobRunScalarWhereWithAggregatesInput[]
    OR?: JobRunScalarWhereWithAggregatesInput[]
    NOT?: JobRunScalarWhereWithAggregatesInput | JobRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobRun"> | string
    type?: EnumJobTypeWithAggregatesFilter<"JobRun"> | $Enums.JobType
    status?: EnumJobStatusWithAggregatesFilter<"JobRun"> | $Enums.JobStatus
    bullJobId?: StringNullableWithAggregatesFilter<"JobRun"> | string | null
    sourceId?: StringNullableWithAggregatesFilter<"JobRun"> | string | null
    channelId?: StringNullableWithAggregatesFilter<"JobRun"> | string | null
    payload?: JsonNullableWithAggregatesFilter<"JobRun">
    result?: JsonNullableWithAggregatesFilter<"JobRun">
    errorMessage?: StringNullableWithAggregatesFilter<"JobRun"> | string | null
    startedAt?: DateTimeNullableWithAggregatesFilter<"JobRun"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"JobRun"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"JobRun"> | Date | string
  }

  export type AiConfigWhereInput = {
    AND?: AiConfigWhereInput | AiConfigWhereInput[]
    OR?: AiConfigWhereInput[]
    NOT?: AiConfigWhereInput | AiConfigWhereInput[]
    id?: StringFilter<"AiConfig"> | string
    provider?: EnumAIProviderFilter<"AiConfig"> | $Enums.AIProvider
    model?: StringFilter<"AiConfig"> | string
    temperature?: FloatFilter<"AiConfig"> | number
    maxTokens?: IntFilter<"AiConfig"> | number
    baseUrl?: StringNullableFilter<"AiConfig"> | string | null
    isActive?: BoolFilter<"AiConfig"> | boolean
    createdAt?: DateTimeFilter<"AiConfig"> | Date | string
    updatedAt?: DateTimeFilter<"AiConfig"> | Date | string
  }

  export type AiConfigOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    baseUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AiConfigWhereInput | AiConfigWhereInput[]
    OR?: AiConfigWhereInput[]
    NOT?: AiConfigWhereInput | AiConfigWhereInput[]
    provider?: EnumAIProviderFilter<"AiConfig"> | $Enums.AIProvider
    model?: StringFilter<"AiConfig"> | string
    temperature?: FloatFilter<"AiConfig"> | number
    maxTokens?: IntFilter<"AiConfig"> | number
    baseUrl?: StringNullableFilter<"AiConfig"> | string | null
    isActive?: BoolFilter<"AiConfig"> | boolean
    createdAt?: DateTimeFilter<"AiConfig"> | Date | string
    updatedAt?: DateTimeFilter<"AiConfig"> | Date | string
  }, "id">

  export type AiConfigOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    baseUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AiConfigCountOrderByAggregateInput
    _avg?: AiConfigAvgOrderByAggregateInput
    _max?: AiConfigMaxOrderByAggregateInput
    _min?: AiConfigMinOrderByAggregateInput
    _sum?: AiConfigSumOrderByAggregateInput
  }

  export type AiConfigScalarWhereWithAggregatesInput = {
    AND?: AiConfigScalarWhereWithAggregatesInput | AiConfigScalarWhereWithAggregatesInput[]
    OR?: AiConfigScalarWhereWithAggregatesInput[]
    NOT?: AiConfigScalarWhereWithAggregatesInput | AiConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiConfig"> | string
    provider?: EnumAIProviderWithAggregatesFilter<"AiConfig"> | $Enums.AIProvider
    model?: StringWithAggregatesFilter<"AiConfig"> | string
    temperature?: FloatWithAggregatesFilter<"AiConfig"> | number
    maxTokens?: IntWithAggregatesFilter<"AiConfig"> | number
    baseUrl?: StringNullableWithAggregatesFilter<"AiConfig"> | string | null
    isActive?: BoolWithAggregatesFilter<"AiConfig"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AiConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AiConfig"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    articles?: ArticleCreateNestedManyWithoutCategoryInput
    topics?: TopicCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    articles?: ArticleUncheckedCreateNestedManyWithoutCategoryInput
    topics?: TopicUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUpdateManyWithoutCategoryNestedInput
    topics?: TopicUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUncheckedUpdateManyWithoutCategoryNestedInput
    topics?: TopicUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagCreateInput = {
    id?: string
    name: string
    slug: string
    articles?: ArticleTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    articles?: ArticleTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articles?: ArticleTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articles?: ArticleTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagCreateManyInput = {
    id?: string
    name: string
    slug: string
  }

  export type TagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleCreateInput = {
    id?: string
    title: string
    slug: string
    excerpt?: string | null
    content: string
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: string | null
    keywords?: ArticleCreatekeywordsInput | string[]
    status?: $Enums.ArticleStatus
    publishedAt?: Date | string | null
    featured?: boolean
    viewCount?: number
    sourceType?: $Enums.SourceType | null
    sourceUrl?: string | null
    sourceId?: string | null
    aiGenerated?: boolean
    aiModel?: string | null
    aiPromptVersion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutArticlesInput
    tags?: ArticleTagCreateNestedManyWithoutArticleInput
    jobRun?: JobRunCreateNestedOneWithoutArticlesInput
  }

  export type ArticleUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    excerpt?: string | null
    content: string
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: string | null
    keywords?: ArticleCreatekeywordsInput | string[]
    status?: $Enums.ArticleStatus
    publishedAt?: Date | string | null
    featured?: boolean
    viewCount?: number
    sourceType?: $Enums.SourceType | null
    sourceUrl?: string | null
    sourceId?: string | null
    aiGenerated?: boolean
    aiModel?: string | null
    aiPromptVersion?: string | null
    categoryId?: string | null
    jobRunId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ArticleTagUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImage?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: ArticleUpdatekeywordsInput | string[]
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    sourceType?: NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutArticlesNestedInput
    tags?: ArticleTagUpdateManyWithoutArticleNestedInput
    jobRun?: JobRunUpdateOneWithoutArticlesNestedInput
  }

  export type ArticleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImage?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: ArticleUpdatekeywordsInput | string[]
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    sourceType?: NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptVersion?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    jobRunId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ArticleTagUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type ArticleCreateManyInput = {
    id?: string
    title: string
    slug: string
    excerpt?: string | null
    content: string
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: string | null
    keywords?: ArticleCreatekeywordsInput | string[]
    status?: $Enums.ArticleStatus
    publishedAt?: Date | string | null
    featured?: boolean
    viewCount?: number
    sourceType?: $Enums.SourceType | null
    sourceUrl?: string | null
    sourceId?: string | null
    aiGenerated?: boolean
    aiModel?: string | null
    aiPromptVersion?: string | null
    categoryId?: string | null
    jobRunId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImage?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: ArticleUpdatekeywordsInput | string[]
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    sourceType?: NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImage?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: ArticleUpdatekeywordsInput | string[]
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    sourceType?: NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptVersion?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    jobRunId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleTagCreateInput = {
    article: ArticleCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutArticlesInput
  }

  export type ArticleTagUncheckedCreateInput = {
    articleId: string
    tagId: string
  }

  export type ArticleTagUpdateInput = {
    article?: ArticleUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutArticlesNestedInput
  }

  export type ArticleTagUncheckedUpdateInput = {
    articleId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleTagCreateManyInput = {
    articleId: string
    tagId: string
  }

  export type ArticleTagUpdateManyMutationInput = {

  }

  export type ArticleTagUncheckedUpdateManyInput = {
    articleId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type TopicCreateInput = {
    id?: string
    name: string
    description?: string | null
    keywords?: TopicCreatekeywordsInput | string[]
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutTopicsInput
    sources?: ContentSourceCreateNestedManyWithoutTopicInput
    channels?: YoutubeChannelCreateNestedManyWithoutTopicInput
  }

  export type TopicUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    keywords?: TopicCreatekeywordsInput | string[]
    enabled?: boolean
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: ContentSourceUncheckedCreateNestedManyWithoutTopicInput
    channels?: YoutubeChannelUncheckedCreateNestedManyWithoutTopicInput
  }

  export type TopicUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: TopicUpdatekeywordsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutTopicsNestedInput
    sources?: ContentSourceUpdateManyWithoutTopicNestedInput
    channels?: YoutubeChannelUpdateManyWithoutTopicNestedInput
  }

  export type TopicUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: TopicUpdatekeywordsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: ContentSourceUncheckedUpdateManyWithoutTopicNestedInput
    channels?: YoutubeChannelUncheckedUpdateManyWithoutTopicNestedInput
  }

  export type TopicCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    keywords?: TopicCreatekeywordsInput | string[]
    enabled?: boolean
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TopicUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: TopicUpdatekeywordsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TopicUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: TopicUpdatekeywordsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentSourceCreateInput = {
    id?: string
    type: $Enums.SourceType
    name: string
    url?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: boolean
    lastFetchAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    topic?: TopicCreateNestedOneWithoutSourcesInput
    jobRuns?: JobRunCreateNestedManyWithoutSourceInput
  }

  export type ContentSourceUncheckedCreateInput = {
    id?: string
    type: $Enums.SourceType
    name: string
    url?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: boolean
    topicId?: string | null
    lastFetchAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobRuns?: JobRunUncheckedCreateNestedManyWithoutSourceInput
  }

  export type ContentSourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastFetchAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    topic?: TopicUpdateOneWithoutSourcesNestedInput
    jobRuns?: JobRunUpdateManyWithoutSourceNestedInput
  }

  export type ContentSourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    topicId?: NullableStringFieldUpdateOperationsInput | string | null
    lastFetchAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobRuns?: JobRunUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type ContentSourceCreateManyInput = {
    id?: string
    type: $Enums.SourceType
    name: string
    url?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: boolean
    topicId?: string | null
    lastFetchAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContentSourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastFetchAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentSourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    topicId?: NullableStringFieldUpdateOperationsInput | string | null
    lastFetchAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YoutubeChannelCreateInput = {
    id?: string
    channelId: string
    channelName: string
    channelUrl: string
    enabled?: boolean
    lastCheckedAt?: Date | string | null
    lastVideoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    topic?: TopicCreateNestedOneWithoutChannelsInput
    jobRuns?: JobRunCreateNestedManyWithoutChannelInput
  }

  export type YoutubeChannelUncheckedCreateInput = {
    id?: string
    channelId: string
    channelName: string
    channelUrl: string
    enabled?: boolean
    topicId?: string | null
    lastCheckedAt?: Date | string | null
    lastVideoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobRuns?: JobRunUncheckedCreateNestedManyWithoutChannelInput
  }

  export type YoutubeChannelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: StringFieldUpdateOperationsInput | string
    channelUrl?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastVideoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    topic?: TopicUpdateOneWithoutChannelsNestedInput
    jobRuns?: JobRunUpdateManyWithoutChannelNestedInput
  }

  export type YoutubeChannelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: StringFieldUpdateOperationsInput | string
    channelUrl?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    topicId?: NullableStringFieldUpdateOperationsInput | string | null
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastVideoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobRuns?: JobRunUncheckedUpdateManyWithoutChannelNestedInput
  }

  export type YoutubeChannelCreateManyInput = {
    id?: string
    channelId: string
    channelName: string
    channelUrl: string
    enabled?: boolean
    topicId?: string | null
    lastCheckedAt?: Date | string | null
    lastVideoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type YoutubeChannelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: StringFieldUpdateOperationsInput | string
    channelUrl?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastVideoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YoutubeChannelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: StringFieldUpdateOperationsInput | string
    channelUrl?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    topicId?: NullableStringFieldUpdateOperationsInput | string | null
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastVideoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadCreateInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    sizeBytes: number
    storagePath: string
    transcript?: string | null
    processed?: boolean
    createdAt?: Date | string
  }

  export type MediaUploadUncheckedCreateInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    sizeBytes: number
    storagePath: string
    transcript?: string | null
    processed?: boolean
    createdAt?: Date | string
  }

  export type MediaUploadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    storagePath?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    storagePath?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadCreateManyInput = {
    id?: string
    filename: string
    originalName: string
    mimeType: string
    sizeBytes: number
    storagePath: string
    transcript?: string | null
    processed?: boolean
    createdAt?: Date | string
  }

  export type MediaUploadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    storagePath?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    storagePath?: StringFieldUpdateOperationsInput | string
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobRunCreateInput = {
    id?: string
    type: $Enums.JobType
    status?: $Enums.JobStatus
    bullJobId?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    source?: ContentSourceCreateNestedOneWithoutJobRunsInput
    channel?: YoutubeChannelCreateNestedOneWithoutJobRunsInput
    articles?: ArticleCreateNestedManyWithoutJobRunInput
  }

  export type JobRunUncheckedCreateInput = {
    id?: string
    type: $Enums.JobType
    status?: $Enums.JobStatus
    bullJobId?: string | null
    sourceId?: string | null
    channelId?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    articles?: ArticleUncheckedCreateNestedManyWithoutJobRunInput
  }

  export type JobRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    bullJobId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: ContentSourceUpdateOneWithoutJobRunsNestedInput
    channel?: YoutubeChannelUpdateOneWithoutJobRunsNestedInput
    articles?: ArticleUpdateManyWithoutJobRunNestedInput
  }

  export type JobRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    bullJobId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUncheckedUpdateManyWithoutJobRunNestedInput
  }

  export type JobRunCreateManyInput = {
    id?: string
    type: $Enums.JobType
    status?: $Enums.JobStatus
    bullJobId?: string | null
    sourceId?: string | null
    channelId?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type JobRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    bullJobId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    bullJobId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiConfigCreateInput = {
    id?: string
    provider?: $Enums.AIProvider
    model?: string
    temperature?: number
    maxTokens?: number
    baseUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiConfigUncheckedCreateInput = {
    id?: string
    provider?: $Enums.AIProvider
    model?: string
    temperature?: number
    maxTokens?: number
    baseUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    model?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    maxTokens?: IntFieldUpdateOperationsInput | number
    baseUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    model?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    maxTokens?: IntFieldUpdateOperationsInput | number
    baseUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiConfigCreateManyInput = {
    id?: string
    provider?: $Enums.AIProvider
    model?: string
    temperature?: number
    maxTokens?: number
    baseUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    model?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    maxTokens?: IntFieldUpdateOperationsInput | number
    baseUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    model?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    maxTokens?: IntFieldUpdateOperationsInput | number
    baseUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    name?: SortOrder
    image?: SortOrder
    role?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    name?: SortOrder
    image?: SortOrder
    role?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    name?: SortOrder
    image?: SortOrder
    role?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type ArticleListRelationFilter = {
    every?: ArticleWhereInput
    some?: ArticleWhereInput
    none?: ArticleWhereInput
  }

  export type TopicListRelationFilter = {
    every?: TopicWhereInput
    some?: TopicWhereInput
    none?: TopicWhereInput
  }

  export type ArticleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TopicOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleTagListRelationFilter = {
    every?: ArticleTagWhereInput
    some?: ArticleTagWhereInput
    none?: ArticleTagWhereInput
  }

  export type ArticleTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumArticleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ArticleStatus | EnumArticleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumArticleStatusFilter<$PrismaModel> | $Enums.ArticleStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumSourceTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSourceTypeNullableFilter<$PrismaModel> | $Enums.SourceType | null
  }

  export type CategoryNullableScalarRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type JobRunNullableScalarRelationFilter = {
    is?: JobRunWhereInput | null
    isNot?: JobRunWhereInput | null
  }

  export type ArticleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    ogImage?: SortOrder
    keywords?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrder
    featured?: SortOrder
    viewCount?: SortOrder
    sourceType?: SortOrder
    sourceUrl?: SortOrder
    sourceId?: SortOrder
    aiGenerated?: SortOrder
    aiModel?: SortOrder
    aiPromptVersion?: SortOrder
    categoryId?: SortOrder
    jobRunId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleAvgOrderByAggregateInput = {
    viewCount?: SortOrder
  }

  export type ArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    ogImage?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrder
    featured?: SortOrder
    viewCount?: SortOrder
    sourceType?: SortOrder
    sourceUrl?: SortOrder
    sourceId?: SortOrder
    aiGenerated?: SortOrder
    aiModel?: SortOrder
    aiPromptVersion?: SortOrder
    categoryId?: SortOrder
    jobRunId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    ogImage?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrder
    featured?: SortOrder
    viewCount?: SortOrder
    sourceType?: SortOrder
    sourceUrl?: SortOrder
    sourceId?: SortOrder
    aiGenerated?: SortOrder
    aiModel?: SortOrder
    aiPromptVersion?: SortOrder
    categoryId?: SortOrder
    jobRunId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleSumOrderByAggregateInput = {
    viewCount?: SortOrder
  }

  export type EnumArticleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ArticleStatus | EnumArticleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumArticleStatusWithAggregatesFilter<$PrismaModel> | $Enums.ArticleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumArticleStatusFilter<$PrismaModel>
    _max?: NestedEnumArticleStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumSourceTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSourceTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.SourceType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSourceTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumSourceTypeNullableFilter<$PrismaModel>
  }

  export type ArticleScalarRelationFilter = {
    is?: ArticleWhereInput
    isNot?: ArticleWhereInput
  }

  export type TagScalarRelationFilter = {
    is?: TagWhereInput
    isNot?: TagWhereInput
  }

  export type ArticleTagArticleIdTagIdCompoundUniqueInput = {
    articleId: string
    tagId: string
  }

  export type ArticleTagCountOrderByAggregateInput = {
    articleId?: SortOrder
    tagId?: SortOrder
  }

  export type ArticleTagMaxOrderByAggregateInput = {
    articleId?: SortOrder
    tagId?: SortOrder
  }

  export type ArticleTagMinOrderByAggregateInput = {
    articleId?: SortOrder
    tagId?: SortOrder
  }

  export type ContentSourceListRelationFilter = {
    every?: ContentSourceWhereInput
    some?: ContentSourceWhereInput
    none?: ContentSourceWhereInput
  }

  export type YoutubeChannelListRelationFilter = {
    every?: YoutubeChannelWhereInput
    some?: YoutubeChannelWhereInput
    none?: YoutubeChannelWhereInput
  }

  export type ContentSourceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type YoutubeChannelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TopicCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    keywords?: SortOrder
    enabled?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TopicMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    enabled?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TopicMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    enabled?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeFilter<$PrismaModel> | $Enums.SourceType
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TopicNullableScalarRelationFilter = {
    is?: TopicWhereInput | null
    isNot?: TopicWhereInput | null
  }

  export type JobRunListRelationFilter = {
    every?: JobRunWhereInput
    some?: JobRunWhereInput
    none?: JobRunWhereInput
  }

  export type JobRunOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContentSourceCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    url?: SortOrder
    config?: SortOrder
    enabled?: SortOrder
    topicId?: SortOrder
    lastFetchAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContentSourceMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    url?: SortOrder
    enabled?: SortOrder
    topicId?: SortOrder
    lastFetchAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContentSourceMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    url?: SortOrder
    enabled?: SortOrder
    topicId?: SortOrder
    lastFetchAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.SourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceTypeFilter<$PrismaModel>
    _max?: NestedEnumSourceTypeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type YoutubeChannelCountOrderByAggregateInput = {
    id?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    channelUrl?: SortOrder
    enabled?: SortOrder
    topicId?: SortOrder
    lastCheckedAt?: SortOrder
    lastVideoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type YoutubeChannelMaxOrderByAggregateInput = {
    id?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    channelUrl?: SortOrder
    enabled?: SortOrder
    topicId?: SortOrder
    lastCheckedAt?: SortOrder
    lastVideoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type YoutubeChannelMinOrderByAggregateInput = {
    id?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    channelUrl?: SortOrder
    enabled?: SortOrder
    topicId?: SortOrder
    lastCheckedAt?: SortOrder
    lastVideoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaUploadCountOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    storagePath?: SortOrder
    transcript?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaUploadAvgOrderByAggregateInput = {
    sizeBytes?: SortOrder
  }

  export type MediaUploadMaxOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    storagePath?: SortOrder
    transcript?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaUploadMinOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    storagePath?: SortOrder
    transcript?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaUploadSumOrderByAggregateInput = {
    sizeBytes?: SortOrder
  }

  export type EnumJobTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeFilter<$PrismaModel> | $Enums.JobType
  }

  export type EnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type ContentSourceNullableScalarRelationFilter = {
    is?: ContentSourceWhereInput | null
    isNot?: ContentSourceWhereInput | null
  }

  export type YoutubeChannelNullableScalarRelationFilter = {
    is?: YoutubeChannelWhereInput | null
    isNot?: YoutubeChannelWhereInput | null
  }

  export type JobRunCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    bullJobId?: SortOrder
    sourceId?: SortOrder
    channelId?: SortOrder
    payload?: SortOrder
    result?: SortOrder
    errorMessage?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type JobRunMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    bullJobId?: SortOrder
    sourceId?: SortOrder
    channelId?: SortOrder
    errorMessage?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type JobRunMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    bullJobId?: SortOrder
    sourceId?: SortOrder
    channelId?: SortOrder
    errorMessage?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumJobTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeWithAggregatesFilter<$PrismaModel> | $Enums.JobType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobTypeFilter<$PrismaModel>
    _max?: NestedEnumJobTypeFilter<$PrismaModel>
  }

  export type EnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type EnumAIProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProvider | EnumAIProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAIProviderFilter<$PrismaModel> | $Enums.AIProvider
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AiConfigCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    baseUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiConfigAvgOrderByAggregateInput = {
    temperature?: SortOrder
    maxTokens?: SortOrder
  }

  export type AiConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    baseUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiConfigMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    baseUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiConfigSumOrderByAggregateInput = {
    temperature?: SortOrder
    maxTokens?: SortOrder
  }

  export type EnumAIProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProvider | EnumAIProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAIProviderWithAggregatesFilter<$PrismaModel> | $Enums.AIProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIProviderFilter<$PrismaModel>
    _max?: NestedEnumAIProviderFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type ArticleCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ArticleCreateWithoutCategoryInput, ArticleUncheckedCreateWithoutCategoryInput> | ArticleCreateWithoutCategoryInput[] | ArticleUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutCategoryInput | ArticleCreateOrConnectWithoutCategoryInput[]
    createMany?: ArticleCreateManyCategoryInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type TopicCreateNestedManyWithoutCategoryInput = {
    create?: XOR<TopicCreateWithoutCategoryInput, TopicUncheckedCreateWithoutCategoryInput> | TopicCreateWithoutCategoryInput[] | TopicUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TopicCreateOrConnectWithoutCategoryInput | TopicCreateOrConnectWithoutCategoryInput[]
    createMany?: TopicCreateManyCategoryInputEnvelope
    connect?: TopicWhereUniqueInput | TopicWhereUniqueInput[]
  }

  export type ArticleUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ArticleCreateWithoutCategoryInput, ArticleUncheckedCreateWithoutCategoryInput> | ArticleCreateWithoutCategoryInput[] | ArticleUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutCategoryInput | ArticleCreateOrConnectWithoutCategoryInput[]
    createMany?: ArticleCreateManyCategoryInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type TopicUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<TopicCreateWithoutCategoryInput, TopicUncheckedCreateWithoutCategoryInput> | TopicCreateWithoutCategoryInput[] | TopicUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TopicCreateOrConnectWithoutCategoryInput | TopicCreateOrConnectWithoutCategoryInput[]
    createMany?: TopicCreateManyCategoryInputEnvelope
    connect?: TopicWhereUniqueInput | TopicWhereUniqueInput[]
  }

  export type ArticleUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ArticleCreateWithoutCategoryInput, ArticleUncheckedCreateWithoutCategoryInput> | ArticleCreateWithoutCategoryInput[] | ArticleUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutCategoryInput | ArticleCreateOrConnectWithoutCategoryInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutCategoryInput | ArticleUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ArticleCreateManyCategoryInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutCategoryInput | ArticleUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutCategoryInput | ArticleUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type TopicUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<TopicCreateWithoutCategoryInput, TopicUncheckedCreateWithoutCategoryInput> | TopicCreateWithoutCategoryInput[] | TopicUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TopicCreateOrConnectWithoutCategoryInput | TopicCreateOrConnectWithoutCategoryInput[]
    upsert?: TopicUpsertWithWhereUniqueWithoutCategoryInput | TopicUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: TopicCreateManyCategoryInputEnvelope
    set?: TopicWhereUniqueInput | TopicWhereUniqueInput[]
    disconnect?: TopicWhereUniqueInput | TopicWhereUniqueInput[]
    delete?: TopicWhereUniqueInput | TopicWhereUniqueInput[]
    connect?: TopicWhereUniqueInput | TopicWhereUniqueInput[]
    update?: TopicUpdateWithWhereUniqueWithoutCategoryInput | TopicUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: TopicUpdateManyWithWhereWithoutCategoryInput | TopicUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: TopicScalarWhereInput | TopicScalarWhereInput[]
  }

  export type ArticleUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ArticleCreateWithoutCategoryInput, ArticleUncheckedCreateWithoutCategoryInput> | ArticleCreateWithoutCategoryInput[] | ArticleUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutCategoryInput | ArticleCreateOrConnectWithoutCategoryInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutCategoryInput | ArticleUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ArticleCreateManyCategoryInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutCategoryInput | ArticleUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutCategoryInput | ArticleUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type TopicUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<TopicCreateWithoutCategoryInput, TopicUncheckedCreateWithoutCategoryInput> | TopicCreateWithoutCategoryInput[] | TopicUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TopicCreateOrConnectWithoutCategoryInput | TopicCreateOrConnectWithoutCategoryInput[]
    upsert?: TopicUpsertWithWhereUniqueWithoutCategoryInput | TopicUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: TopicCreateManyCategoryInputEnvelope
    set?: TopicWhereUniqueInput | TopicWhereUniqueInput[]
    disconnect?: TopicWhereUniqueInput | TopicWhereUniqueInput[]
    delete?: TopicWhereUniqueInput | TopicWhereUniqueInput[]
    connect?: TopicWhereUniqueInput | TopicWhereUniqueInput[]
    update?: TopicUpdateWithWhereUniqueWithoutCategoryInput | TopicUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: TopicUpdateManyWithWhereWithoutCategoryInput | TopicUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: TopicScalarWhereInput | TopicScalarWhereInput[]
  }

  export type ArticleTagCreateNestedManyWithoutTagInput = {
    create?: XOR<ArticleTagCreateWithoutTagInput, ArticleTagUncheckedCreateWithoutTagInput> | ArticleTagCreateWithoutTagInput[] | ArticleTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ArticleTagCreateOrConnectWithoutTagInput | ArticleTagCreateOrConnectWithoutTagInput[]
    createMany?: ArticleTagCreateManyTagInputEnvelope
    connect?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
  }

  export type ArticleTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<ArticleTagCreateWithoutTagInput, ArticleTagUncheckedCreateWithoutTagInput> | ArticleTagCreateWithoutTagInput[] | ArticleTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ArticleTagCreateOrConnectWithoutTagInput | ArticleTagCreateOrConnectWithoutTagInput[]
    createMany?: ArticleTagCreateManyTagInputEnvelope
    connect?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
  }

  export type ArticleTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<ArticleTagCreateWithoutTagInput, ArticleTagUncheckedCreateWithoutTagInput> | ArticleTagCreateWithoutTagInput[] | ArticleTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ArticleTagCreateOrConnectWithoutTagInput | ArticleTagCreateOrConnectWithoutTagInput[]
    upsert?: ArticleTagUpsertWithWhereUniqueWithoutTagInput | ArticleTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: ArticleTagCreateManyTagInputEnvelope
    set?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    disconnect?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    delete?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    connect?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    update?: ArticleTagUpdateWithWhereUniqueWithoutTagInput | ArticleTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: ArticleTagUpdateManyWithWhereWithoutTagInput | ArticleTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: ArticleTagScalarWhereInput | ArticleTagScalarWhereInput[]
  }

  export type ArticleTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<ArticleTagCreateWithoutTagInput, ArticleTagUncheckedCreateWithoutTagInput> | ArticleTagCreateWithoutTagInput[] | ArticleTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ArticleTagCreateOrConnectWithoutTagInput | ArticleTagCreateOrConnectWithoutTagInput[]
    upsert?: ArticleTagUpsertWithWhereUniqueWithoutTagInput | ArticleTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: ArticleTagCreateManyTagInputEnvelope
    set?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    disconnect?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    delete?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    connect?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    update?: ArticleTagUpdateWithWhereUniqueWithoutTagInput | ArticleTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: ArticleTagUpdateManyWithWhereWithoutTagInput | ArticleTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: ArticleTagScalarWhereInput | ArticleTagScalarWhereInput[]
  }

  export type ArticleCreatekeywordsInput = {
    set: string[]
  }

  export type CategoryCreateNestedOneWithoutArticlesInput = {
    create?: XOR<CategoryCreateWithoutArticlesInput, CategoryUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutArticlesInput
    connect?: CategoryWhereUniqueInput
  }

  export type ArticleTagCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleTagCreateWithoutArticleInput, ArticleTagUncheckedCreateWithoutArticleInput> | ArticleTagCreateWithoutArticleInput[] | ArticleTagUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleTagCreateOrConnectWithoutArticleInput | ArticleTagCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleTagCreateManyArticleInputEnvelope
    connect?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
  }

  export type JobRunCreateNestedOneWithoutArticlesInput = {
    create?: XOR<JobRunCreateWithoutArticlesInput, JobRunUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: JobRunCreateOrConnectWithoutArticlesInput
    connect?: JobRunWhereUniqueInput
  }

  export type ArticleTagUncheckedCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleTagCreateWithoutArticleInput, ArticleTagUncheckedCreateWithoutArticleInput> | ArticleTagCreateWithoutArticleInput[] | ArticleTagUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleTagCreateOrConnectWithoutArticleInput | ArticleTagCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleTagCreateManyArticleInputEnvelope
    connect?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
  }

  export type ArticleUpdatekeywordsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumArticleStatusFieldUpdateOperationsInput = {
    set?: $Enums.ArticleStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumSourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.SourceType | null
  }

  export type CategoryUpdateOneWithoutArticlesNestedInput = {
    create?: XOR<CategoryCreateWithoutArticlesInput, CategoryUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutArticlesInput
    upsert?: CategoryUpsertWithoutArticlesInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutArticlesInput, CategoryUpdateWithoutArticlesInput>, CategoryUncheckedUpdateWithoutArticlesInput>
  }

  export type ArticleTagUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleTagCreateWithoutArticleInput, ArticleTagUncheckedCreateWithoutArticleInput> | ArticleTagCreateWithoutArticleInput[] | ArticleTagUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleTagCreateOrConnectWithoutArticleInput | ArticleTagCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleTagUpsertWithWhereUniqueWithoutArticleInput | ArticleTagUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleTagCreateManyArticleInputEnvelope
    set?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    disconnect?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    delete?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    connect?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    update?: ArticleTagUpdateWithWhereUniqueWithoutArticleInput | ArticleTagUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleTagUpdateManyWithWhereWithoutArticleInput | ArticleTagUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleTagScalarWhereInput | ArticleTagScalarWhereInput[]
  }

  export type JobRunUpdateOneWithoutArticlesNestedInput = {
    create?: XOR<JobRunCreateWithoutArticlesInput, JobRunUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: JobRunCreateOrConnectWithoutArticlesInput
    upsert?: JobRunUpsertWithoutArticlesInput
    disconnect?: JobRunWhereInput | boolean
    delete?: JobRunWhereInput | boolean
    connect?: JobRunWhereUniqueInput
    update?: XOR<XOR<JobRunUpdateToOneWithWhereWithoutArticlesInput, JobRunUpdateWithoutArticlesInput>, JobRunUncheckedUpdateWithoutArticlesInput>
  }

  export type ArticleTagUncheckedUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleTagCreateWithoutArticleInput, ArticleTagUncheckedCreateWithoutArticleInput> | ArticleTagCreateWithoutArticleInput[] | ArticleTagUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleTagCreateOrConnectWithoutArticleInput | ArticleTagCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleTagUpsertWithWhereUniqueWithoutArticleInput | ArticleTagUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleTagCreateManyArticleInputEnvelope
    set?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    disconnect?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    delete?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    connect?: ArticleTagWhereUniqueInput | ArticleTagWhereUniqueInput[]
    update?: ArticleTagUpdateWithWhereUniqueWithoutArticleInput | ArticleTagUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleTagUpdateManyWithWhereWithoutArticleInput | ArticleTagUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleTagScalarWhereInput | ArticleTagScalarWhereInput[]
  }

  export type ArticleCreateNestedOneWithoutTagsInput = {
    create?: XOR<ArticleCreateWithoutTagsInput, ArticleUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutTagsInput
    connect?: ArticleWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutArticlesInput = {
    create?: XOR<TagCreateWithoutArticlesInput, TagUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: TagCreateOrConnectWithoutArticlesInput
    connect?: TagWhereUniqueInput
  }

  export type ArticleUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<ArticleCreateWithoutTagsInput, ArticleUncheckedCreateWithoutTagsInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutTagsInput
    upsert?: ArticleUpsertWithoutTagsInput
    connect?: ArticleWhereUniqueInput
    update?: XOR<XOR<ArticleUpdateToOneWithWhereWithoutTagsInput, ArticleUpdateWithoutTagsInput>, ArticleUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutArticlesNestedInput = {
    create?: XOR<TagCreateWithoutArticlesInput, TagUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: TagCreateOrConnectWithoutArticlesInput
    upsert?: TagUpsertWithoutArticlesInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutArticlesInput, TagUpdateWithoutArticlesInput>, TagUncheckedUpdateWithoutArticlesInput>
  }

  export type TopicCreatekeywordsInput = {
    set: string[]
  }

  export type CategoryCreateNestedOneWithoutTopicsInput = {
    create?: XOR<CategoryCreateWithoutTopicsInput, CategoryUncheckedCreateWithoutTopicsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTopicsInput
    connect?: CategoryWhereUniqueInput
  }

  export type ContentSourceCreateNestedManyWithoutTopicInput = {
    create?: XOR<ContentSourceCreateWithoutTopicInput, ContentSourceUncheckedCreateWithoutTopicInput> | ContentSourceCreateWithoutTopicInput[] | ContentSourceUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: ContentSourceCreateOrConnectWithoutTopicInput | ContentSourceCreateOrConnectWithoutTopicInput[]
    createMany?: ContentSourceCreateManyTopicInputEnvelope
    connect?: ContentSourceWhereUniqueInput | ContentSourceWhereUniqueInput[]
  }

  export type YoutubeChannelCreateNestedManyWithoutTopicInput = {
    create?: XOR<YoutubeChannelCreateWithoutTopicInput, YoutubeChannelUncheckedCreateWithoutTopicInput> | YoutubeChannelCreateWithoutTopicInput[] | YoutubeChannelUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: YoutubeChannelCreateOrConnectWithoutTopicInput | YoutubeChannelCreateOrConnectWithoutTopicInput[]
    createMany?: YoutubeChannelCreateManyTopicInputEnvelope
    connect?: YoutubeChannelWhereUniqueInput | YoutubeChannelWhereUniqueInput[]
  }

  export type ContentSourceUncheckedCreateNestedManyWithoutTopicInput = {
    create?: XOR<ContentSourceCreateWithoutTopicInput, ContentSourceUncheckedCreateWithoutTopicInput> | ContentSourceCreateWithoutTopicInput[] | ContentSourceUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: ContentSourceCreateOrConnectWithoutTopicInput | ContentSourceCreateOrConnectWithoutTopicInput[]
    createMany?: ContentSourceCreateManyTopicInputEnvelope
    connect?: ContentSourceWhereUniqueInput | ContentSourceWhereUniqueInput[]
  }

  export type YoutubeChannelUncheckedCreateNestedManyWithoutTopicInput = {
    create?: XOR<YoutubeChannelCreateWithoutTopicInput, YoutubeChannelUncheckedCreateWithoutTopicInput> | YoutubeChannelCreateWithoutTopicInput[] | YoutubeChannelUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: YoutubeChannelCreateOrConnectWithoutTopicInput | YoutubeChannelCreateOrConnectWithoutTopicInput[]
    createMany?: YoutubeChannelCreateManyTopicInputEnvelope
    connect?: YoutubeChannelWhereUniqueInput | YoutubeChannelWhereUniqueInput[]
  }

  export type TopicUpdatekeywordsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CategoryUpdateOneWithoutTopicsNestedInput = {
    create?: XOR<CategoryCreateWithoutTopicsInput, CategoryUncheckedCreateWithoutTopicsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTopicsInput
    upsert?: CategoryUpsertWithoutTopicsInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutTopicsInput, CategoryUpdateWithoutTopicsInput>, CategoryUncheckedUpdateWithoutTopicsInput>
  }

  export type ContentSourceUpdateManyWithoutTopicNestedInput = {
    create?: XOR<ContentSourceCreateWithoutTopicInput, ContentSourceUncheckedCreateWithoutTopicInput> | ContentSourceCreateWithoutTopicInput[] | ContentSourceUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: ContentSourceCreateOrConnectWithoutTopicInput | ContentSourceCreateOrConnectWithoutTopicInput[]
    upsert?: ContentSourceUpsertWithWhereUniqueWithoutTopicInput | ContentSourceUpsertWithWhereUniqueWithoutTopicInput[]
    createMany?: ContentSourceCreateManyTopicInputEnvelope
    set?: ContentSourceWhereUniqueInput | ContentSourceWhereUniqueInput[]
    disconnect?: ContentSourceWhereUniqueInput | ContentSourceWhereUniqueInput[]
    delete?: ContentSourceWhereUniqueInput | ContentSourceWhereUniqueInput[]
    connect?: ContentSourceWhereUniqueInput | ContentSourceWhereUniqueInput[]
    update?: ContentSourceUpdateWithWhereUniqueWithoutTopicInput | ContentSourceUpdateWithWhereUniqueWithoutTopicInput[]
    updateMany?: ContentSourceUpdateManyWithWhereWithoutTopicInput | ContentSourceUpdateManyWithWhereWithoutTopicInput[]
    deleteMany?: ContentSourceScalarWhereInput | ContentSourceScalarWhereInput[]
  }

  export type YoutubeChannelUpdateManyWithoutTopicNestedInput = {
    create?: XOR<YoutubeChannelCreateWithoutTopicInput, YoutubeChannelUncheckedCreateWithoutTopicInput> | YoutubeChannelCreateWithoutTopicInput[] | YoutubeChannelUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: YoutubeChannelCreateOrConnectWithoutTopicInput | YoutubeChannelCreateOrConnectWithoutTopicInput[]
    upsert?: YoutubeChannelUpsertWithWhereUniqueWithoutTopicInput | YoutubeChannelUpsertWithWhereUniqueWithoutTopicInput[]
    createMany?: YoutubeChannelCreateManyTopicInputEnvelope
    set?: YoutubeChannelWhereUniqueInput | YoutubeChannelWhereUniqueInput[]
    disconnect?: YoutubeChannelWhereUniqueInput | YoutubeChannelWhereUniqueInput[]
    delete?: YoutubeChannelWhereUniqueInput | YoutubeChannelWhereUniqueInput[]
    connect?: YoutubeChannelWhereUniqueInput | YoutubeChannelWhereUniqueInput[]
    update?: YoutubeChannelUpdateWithWhereUniqueWithoutTopicInput | YoutubeChannelUpdateWithWhereUniqueWithoutTopicInput[]
    updateMany?: YoutubeChannelUpdateManyWithWhereWithoutTopicInput | YoutubeChannelUpdateManyWithWhereWithoutTopicInput[]
    deleteMany?: YoutubeChannelScalarWhereInput | YoutubeChannelScalarWhereInput[]
  }

  export type ContentSourceUncheckedUpdateManyWithoutTopicNestedInput = {
    create?: XOR<ContentSourceCreateWithoutTopicInput, ContentSourceUncheckedCreateWithoutTopicInput> | ContentSourceCreateWithoutTopicInput[] | ContentSourceUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: ContentSourceCreateOrConnectWithoutTopicInput | ContentSourceCreateOrConnectWithoutTopicInput[]
    upsert?: ContentSourceUpsertWithWhereUniqueWithoutTopicInput | ContentSourceUpsertWithWhereUniqueWithoutTopicInput[]
    createMany?: ContentSourceCreateManyTopicInputEnvelope
    set?: ContentSourceWhereUniqueInput | ContentSourceWhereUniqueInput[]
    disconnect?: ContentSourceWhereUniqueInput | ContentSourceWhereUniqueInput[]
    delete?: ContentSourceWhereUniqueInput | ContentSourceWhereUniqueInput[]
    connect?: ContentSourceWhereUniqueInput | ContentSourceWhereUniqueInput[]
    update?: ContentSourceUpdateWithWhereUniqueWithoutTopicInput | ContentSourceUpdateWithWhereUniqueWithoutTopicInput[]
    updateMany?: ContentSourceUpdateManyWithWhereWithoutTopicInput | ContentSourceUpdateManyWithWhereWithoutTopicInput[]
    deleteMany?: ContentSourceScalarWhereInput | ContentSourceScalarWhereInput[]
  }

  export type YoutubeChannelUncheckedUpdateManyWithoutTopicNestedInput = {
    create?: XOR<YoutubeChannelCreateWithoutTopicInput, YoutubeChannelUncheckedCreateWithoutTopicInput> | YoutubeChannelCreateWithoutTopicInput[] | YoutubeChannelUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: YoutubeChannelCreateOrConnectWithoutTopicInput | YoutubeChannelCreateOrConnectWithoutTopicInput[]
    upsert?: YoutubeChannelUpsertWithWhereUniqueWithoutTopicInput | YoutubeChannelUpsertWithWhereUniqueWithoutTopicInput[]
    createMany?: YoutubeChannelCreateManyTopicInputEnvelope
    set?: YoutubeChannelWhereUniqueInput | YoutubeChannelWhereUniqueInput[]
    disconnect?: YoutubeChannelWhereUniqueInput | YoutubeChannelWhereUniqueInput[]
    delete?: YoutubeChannelWhereUniqueInput | YoutubeChannelWhereUniqueInput[]
    connect?: YoutubeChannelWhereUniqueInput | YoutubeChannelWhereUniqueInput[]
    update?: YoutubeChannelUpdateWithWhereUniqueWithoutTopicInput | YoutubeChannelUpdateWithWhereUniqueWithoutTopicInput[]
    updateMany?: YoutubeChannelUpdateManyWithWhereWithoutTopicInput | YoutubeChannelUpdateManyWithWhereWithoutTopicInput[]
    deleteMany?: YoutubeChannelScalarWhereInput | YoutubeChannelScalarWhereInput[]
  }

  export type TopicCreateNestedOneWithoutSourcesInput = {
    create?: XOR<TopicCreateWithoutSourcesInput, TopicUncheckedCreateWithoutSourcesInput>
    connectOrCreate?: TopicCreateOrConnectWithoutSourcesInput
    connect?: TopicWhereUniqueInput
  }

  export type JobRunCreateNestedManyWithoutSourceInput = {
    create?: XOR<JobRunCreateWithoutSourceInput, JobRunUncheckedCreateWithoutSourceInput> | JobRunCreateWithoutSourceInput[] | JobRunUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: JobRunCreateOrConnectWithoutSourceInput | JobRunCreateOrConnectWithoutSourceInput[]
    createMany?: JobRunCreateManySourceInputEnvelope
    connect?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
  }

  export type JobRunUncheckedCreateNestedManyWithoutSourceInput = {
    create?: XOR<JobRunCreateWithoutSourceInput, JobRunUncheckedCreateWithoutSourceInput> | JobRunCreateWithoutSourceInput[] | JobRunUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: JobRunCreateOrConnectWithoutSourceInput | JobRunCreateOrConnectWithoutSourceInput[]
    createMany?: JobRunCreateManySourceInputEnvelope
    connect?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
  }

  export type EnumSourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.SourceType
  }

  export type TopicUpdateOneWithoutSourcesNestedInput = {
    create?: XOR<TopicCreateWithoutSourcesInput, TopicUncheckedCreateWithoutSourcesInput>
    connectOrCreate?: TopicCreateOrConnectWithoutSourcesInput
    upsert?: TopicUpsertWithoutSourcesInput
    disconnect?: TopicWhereInput | boolean
    delete?: TopicWhereInput | boolean
    connect?: TopicWhereUniqueInput
    update?: XOR<XOR<TopicUpdateToOneWithWhereWithoutSourcesInput, TopicUpdateWithoutSourcesInput>, TopicUncheckedUpdateWithoutSourcesInput>
  }

  export type JobRunUpdateManyWithoutSourceNestedInput = {
    create?: XOR<JobRunCreateWithoutSourceInput, JobRunUncheckedCreateWithoutSourceInput> | JobRunCreateWithoutSourceInput[] | JobRunUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: JobRunCreateOrConnectWithoutSourceInput | JobRunCreateOrConnectWithoutSourceInput[]
    upsert?: JobRunUpsertWithWhereUniqueWithoutSourceInput | JobRunUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: JobRunCreateManySourceInputEnvelope
    set?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    disconnect?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    delete?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    connect?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    update?: JobRunUpdateWithWhereUniqueWithoutSourceInput | JobRunUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: JobRunUpdateManyWithWhereWithoutSourceInput | JobRunUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: JobRunScalarWhereInput | JobRunScalarWhereInput[]
  }

  export type JobRunUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: XOR<JobRunCreateWithoutSourceInput, JobRunUncheckedCreateWithoutSourceInput> | JobRunCreateWithoutSourceInput[] | JobRunUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: JobRunCreateOrConnectWithoutSourceInput | JobRunCreateOrConnectWithoutSourceInput[]
    upsert?: JobRunUpsertWithWhereUniqueWithoutSourceInput | JobRunUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: JobRunCreateManySourceInputEnvelope
    set?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    disconnect?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    delete?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    connect?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    update?: JobRunUpdateWithWhereUniqueWithoutSourceInput | JobRunUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: JobRunUpdateManyWithWhereWithoutSourceInput | JobRunUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: JobRunScalarWhereInput | JobRunScalarWhereInput[]
  }

  export type TopicCreateNestedOneWithoutChannelsInput = {
    create?: XOR<TopicCreateWithoutChannelsInput, TopicUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: TopicCreateOrConnectWithoutChannelsInput
    connect?: TopicWhereUniqueInput
  }

  export type JobRunCreateNestedManyWithoutChannelInput = {
    create?: XOR<JobRunCreateWithoutChannelInput, JobRunUncheckedCreateWithoutChannelInput> | JobRunCreateWithoutChannelInput[] | JobRunUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: JobRunCreateOrConnectWithoutChannelInput | JobRunCreateOrConnectWithoutChannelInput[]
    createMany?: JobRunCreateManyChannelInputEnvelope
    connect?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
  }

  export type JobRunUncheckedCreateNestedManyWithoutChannelInput = {
    create?: XOR<JobRunCreateWithoutChannelInput, JobRunUncheckedCreateWithoutChannelInput> | JobRunCreateWithoutChannelInput[] | JobRunUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: JobRunCreateOrConnectWithoutChannelInput | JobRunCreateOrConnectWithoutChannelInput[]
    createMany?: JobRunCreateManyChannelInputEnvelope
    connect?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
  }

  export type TopicUpdateOneWithoutChannelsNestedInput = {
    create?: XOR<TopicCreateWithoutChannelsInput, TopicUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: TopicCreateOrConnectWithoutChannelsInput
    upsert?: TopicUpsertWithoutChannelsInput
    disconnect?: TopicWhereInput | boolean
    delete?: TopicWhereInput | boolean
    connect?: TopicWhereUniqueInput
    update?: XOR<XOR<TopicUpdateToOneWithWhereWithoutChannelsInput, TopicUpdateWithoutChannelsInput>, TopicUncheckedUpdateWithoutChannelsInput>
  }

  export type JobRunUpdateManyWithoutChannelNestedInput = {
    create?: XOR<JobRunCreateWithoutChannelInput, JobRunUncheckedCreateWithoutChannelInput> | JobRunCreateWithoutChannelInput[] | JobRunUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: JobRunCreateOrConnectWithoutChannelInput | JobRunCreateOrConnectWithoutChannelInput[]
    upsert?: JobRunUpsertWithWhereUniqueWithoutChannelInput | JobRunUpsertWithWhereUniqueWithoutChannelInput[]
    createMany?: JobRunCreateManyChannelInputEnvelope
    set?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    disconnect?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    delete?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    connect?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    update?: JobRunUpdateWithWhereUniqueWithoutChannelInput | JobRunUpdateWithWhereUniqueWithoutChannelInput[]
    updateMany?: JobRunUpdateManyWithWhereWithoutChannelInput | JobRunUpdateManyWithWhereWithoutChannelInput[]
    deleteMany?: JobRunScalarWhereInput | JobRunScalarWhereInput[]
  }

  export type JobRunUncheckedUpdateManyWithoutChannelNestedInput = {
    create?: XOR<JobRunCreateWithoutChannelInput, JobRunUncheckedCreateWithoutChannelInput> | JobRunCreateWithoutChannelInput[] | JobRunUncheckedCreateWithoutChannelInput[]
    connectOrCreate?: JobRunCreateOrConnectWithoutChannelInput | JobRunCreateOrConnectWithoutChannelInput[]
    upsert?: JobRunUpsertWithWhereUniqueWithoutChannelInput | JobRunUpsertWithWhereUniqueWithoutChannelInput[]
    createMany?: JobRunCreateManyChannelInputEnvelope
    set?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    disconnect?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    delete?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    connect?: JobRunWhereUniqueInput | JobRunWhereUniqueInput[]
    update?: JobRunUpdateWithWhereUniqueWithoutChannelInput | JobRunUpdateWithWhereUniqueWithoutChannelInput[]
    updateMany?: JobRunUpdateManyWithWhereWithoutChannelInput | JobRunUpdateManyWithWhereWithoutChannelInput[]
    deleteMany?: JobRunScalarWhereInput | JobRunScalarWhereInput[]
  }

  export type ContentSourceCreateNestedOneWithoutJobRunsInput = {
    create?: XOR<ContentSourceCreateWithoutJobRunsInput, ContentSourceUncheckedCreateWithoutJobRunsInput>
    connectOrCreate?: ContentSourceCreateOrConnectWithoutJobRunsInput
    connect?: ContentSourceWhereUniqueInput
  }

  export type YoutubeChannelCreateNestedOneWithoutJobRunsInput = {
    create?: XOR<YoutubeChannelCreateWithoutJobRunsInput, YoutubeChannelUncheckedCreateWithoutJobRunsInput>
    connectOrCreate?: YoutubeChannelCreateOrConnectWithoutJobRunsInput
    connect?: YoutubeChannelWhereUniqueInput
  }

  export type ArticleCreateNestedManyWithoutJobRunInput = {
    create?: XOR<ArticleCreateWithoutJobRunInput, ArticleUncheckedCreateWithoutJobRunInput> | ArticleCreateWithoutJobRunInput[] | ArticleUncheckedCreateWithoutJobRunInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutJobRunInput | ArticleCreateOrConnectWithoutJobRunInput[]
    createMany?: ArticleCreateManyJobRunInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type ArticleUncheckedCreateNestedManyWithoutJobRunInput = {
    create?: XOR<ArticleCreateWithoutJobRunInput, ArticleUncheckedCreateWithoutJobRunInput> | ArticleCreateWithoutJobRunInput[] | ArticleUncheckedCreateWithoutJobRunInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutJobRunInput | ArticleCreateOrConnectWithoutJobRunInput[]
    createMany?: ArticleCreateManyJobRunInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type EnumJobTypeFieldUpdateOperationsInput = {
    set?: $Enums.JobType
  }

  export type EnumJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.JobStatus
  }

  export type ContentSourceUpdateOneWithoutJobRunsNestedInput = {
    create?: XOR<ContentSourceCreateWithoutJobRunsInput, ContentSourceUncheckedCreateWithoutJobRunsInput>
    connectOrCreate?: ContentSourceCreateOrConnectWithoutJobRunsInput
    upsert?: ContentSourceUpsertWithoutJobRunsInput
    disconnect?: ContentSourceWhereInput | boolean
    delete?: ContentSourceWhereInput | boolean
    connect?: ContentSourceWhereUniqueInput
    update?: XOR<XOR<ContentSourceUpdateToOneWithWhereWithoutJobRunsInput, ContentSourceUpdateWithoutJobRunsInput>, ContentSourceUncheckedUpdateWithoutJobRunsInput>
  }

  export type YoutubeChannelUpdateOneWithoutJobRunsNestedInput = {
    create?: XOR<YoutubeChannelCreateWithoutJobRunsInput, YoutubeChannelUncheckedCreateWithoutJobRunsInput>
    connectOrCreate?: YoutubeChannelCreateOrConnectWithoutJobRunsInput
    upsert?: YoutubeChannelUpsertWithoutJobRunsInput
    disconnect?: YoutubeChannelWhereInput | boolean
    delete?: YoutubeChannelWhereInput | boolean
    connect?: YoutubeChannelWhereUniqueInput
    update?: XOR<XOR<YoutubeChannelUpdateToOneWithWhereWithoutJobRunsInput, YoutubeChannelUpdateWithoutJobRunsInput>, YoutubeChannelUncheckedUpdateWithoutJobRunsInput>
  }

  export type ArticleUpdateManyWithoutJobRunNestedInput = {
    create?: XOR<ArticleCreateWithoutJobRunInput, ArticleUncheckedCreateWithoutJobRunInput> | ArticleCreateWithoutJobRunInput[] | ArticleUncheckedCreateWithoutJobRunInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutJobRunInput | ArticleCreateOrConnectWithoutJobRunInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutJobRunInput | ArticleUpsertWithWhereUniqueWithoutJobRunInput[]
    createMany?: ArticleCreateManyJobRunInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutJobRunInput | ArticleUpdateWithWhereUniqueWithoutJobRunInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutJobRunInput | ArticleUpdateManyWithWhereWithoutJobRunInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type ArticleUncheckedUpdateManyWithoutJobRunNestedInput = {
    create?: XOR<ArticleCreateWithoutJobRunInput, ArticleUncheckedCreateWithoutJobRunInput> | ArticleCreateWithoutJobRunInput[] | ArticleUncheckedCreateWithoutJobRunInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutJobRunInput | ArticleCreateOrConnectWithoutJobRunInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutJobRunInput | ArticleUpsertWithWhereUniqueWithoutJobRunInput[]
    createMany?: ArticleCreateManyJobRunInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutJobRunInput | ArticleUpdateWithWhereUniqueWithoutJobRunInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutJobRunInput | ArticleUpdateManyWithWhereWithoutJobRunInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type EnumAIProviderFieldUpdateOperationsInput = {
    set?: $Enums.AIProvider
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumArticleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ArticleStatus | EnumArticleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumArticleStatusFilter<$PrismaModel> | $Enums.ArticleStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumSourceTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSourceTypeNullableFilter<$PrismaModel> | $Enums.SourceType | null
  }

  export type NestedEnumArticleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ArticleStatus | EnumArticleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumArticleStatusWithAggregatesFilter<$PrismaModel> | $Enums.ArticleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumArticleStatusFilter<$PrismaModel>
    _max?: NestedEnumArticleStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumSourceTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSourceTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.SourceType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSourceTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumSourceTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeFilter<$PrismaModel> | $Enums.SourceType
  }

  export type NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.SourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceTypeFilter<$PrismaModel>
    _max?: NestedEnumSourceTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumJobTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeFilter<$PrismaModel> | $Enums.JobType
  }

  export type NestedEnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type NestedEnumJobTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeWithAggregatesFilter<$PrismaModel> | $Enums.JobType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobTypeFilter<$PrismaModel>
    _max?: NestedEnumJobTypeFilter<$PrismaModel>
  }

  export type NestedEnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type NestedEnumAIProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProvider | EnumAIProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAIProviderFilter<$PrismaModel> | $Enums.AIProvider
  }

  export type NestedEnumAIProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProvider | EnumAIProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAIProviderWithAggregatesFilter<$PrismaModel> | $Enums.AIProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIProviderFilter<$PrismaModel>
    _max?: NestedEnumAIProviderFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ArticleCreateWithoutCategoryInput = {
    id?: string
    title: string
    slug: string
    excerpt?: string | null
    content: string
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: string | null
    keywords?: ArticleCreatekeywordsInput | string[]
    status?: $Enums.ArticleStatus
    publishedAt?: Date | string | null
    featured?: boolean
    viewCount?: number
    sourceType?: $Enums.SourceType | null
    sourceUrl?: string | null
    sourceId?: string | null
    aiGenerated?: boolean
    aiModel?: string | null
    aiPromptVersion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ArticleTagCreateNestedManyWithoutArticleInput
    jobRun?: JobRunCreateNestedOneWithoutArticlesInput
  }

  export type ArticleUncheckedCreateWithoutCategoryInput = {
    id?: string
    title: string
    slug: string
    excerpt?: string | null
    content: string
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: string | null
    keywords?: ArticleCreatekeywordsInput | string[]
    status?: $Enums.ArticleStatus
    publishedAt?: Date | string | null
    featured?: boolean
    viewCount?: number
    sourceType?: $Enums.SourceType | null
    sourceUrl?: string | null
    sourceId?: string | null
    aiGenerated?: boolean
    aiModel?: string | null
    aiPromptVersion?: string | null
    jobRunId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ArticleTagUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleCreateOrConnectWithoutCategoryInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutCategoryInput, ArticleUncheckedCreateWithoutCategoryInput>
  }

  export type ArticleCreateManyCategoryInputEnvelope = {
    data: ArticleCreateManyCategoryInput | ArticleCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type TopicCreateWithoutCategoryInput = {
    id?: string
    name: string
    description?: string | null
    keywords?: TopicCreatekeywordsInput | string[]
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: ContentSourceCreateNestedManyWithoutTopicInput
    channels?: YoutubeChannelCreateNestedManyWithoutTopicInput
  }

  export type TopicUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    description?: string | null
    keywords?: TopicCreatekeywordsInput | string[]
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: ContentSourceUncheckedCreateNestedManyWithoutTopicInput
    channels?: YoutubeChannelUncheckedCreateNestedManyWithoutTopicInput
  }

  export type TopicCreateOrConnectWithoutCategoryInput = {
    where: TopicWhereUniqueInput
    create: XOR<TopicCreateWithoutCategoryInput, TopicUncheckedCreateWithoutCategoryInput>
  }

  export type TopicCreateManyCategoryInputEnvelope = {
    data: TopicCreateManyCategoryInput | TopicCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ArticleUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ArticleWhereUniqueInput
    update: XOR<ArticleUpdateWithoutCategoryInput, ArticleUncheckedUpdateWithoutCategoryInput>
    create: XOR<ArticleCreateWithoutCategoryInput, ArticleUncheckedCreateWithoutCategoryInput>
  }

  export type ArticleUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ArticleWhereUniqueInput
    data: XOR<ArticleUpdateWithoutCategoryInput, ArticleUncheckedUpdateWithoutCategoryInput>
  }

  export type ArticleUpdateManyWithWhereWithoutCategoryInput = {
    where: ArticleScalarWhereInput
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ArticleScalarWhereInput = {
    AND?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
    OR?: ArticleScalarWhereInput[]
    NOT?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
    id?: StringFilter<"Article"> | string
    title?: StringFilter<"Article"> | string
    slug?: StringFilter<"Article"> | string
    excerpt?: StringNullableFilter<"Article"> | string | null
    content?: StringFilter<"Article"> | string
    metaTitle?: StringNullableFilter<"Article"> | string | null
    metaDescription?: StringNullableFilter<"Article"> | string | null
    ogImage?: StringNullableFilter<"Article"> | string | null
    keywords?: StringNullableListFilter<"Article">
    status?: EnumArticleStatusFilter<"Article"> | $Enums.ArticleStatus
    publishedAt?: DateTimeNullableFilter<"Article"> | Date | string | null
    featured?: BoolFilter<"Article"> | boolean
    viewCount?: IntFilter<"Article"> | number
    sourceType?: EnumSourceTypeNullableFilter<"Article"> | $Enums.SourceType | null
    sourceUrl?: StringNullableFilter<"Article"> | string | null
    sourceId?: StringNullableFilter<"Article"> | string | null
    aiGenerated?: BoolFilter<"Article"> | boolean
    aiModel?: StringNullableFilter<"Article"> | string | null
    aiPromptVersion?: StringNullableFilter<"Article"> | string | null
    categoryId?: StringNullableFilter<"Article"> | string | null
    jobRunId?: StringNullableFilter<"Article"> | string | null
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
  }

  export type TopicUpsertWithWhereUniqueWithoutCategoryInput = {
    where: TopicWhereUniqueInput
    update: XOR<TopicUpdateWithoutCategoryInput, TopicUncheckedUpdateWithoutCategoryInput>
    create: XOR<TopicCreateWithoutCategoryInput, TopicUncheckedCreateWithoutCategoryInput>
  }

  export type TopicUpdateWithWhereUniqueWithoutCategoryInput = {
    where: TopicWhereUniqueInput
    data: XOR<TopicUpdateWithoutCategoryInput, TopicUncheckedUpdateWithoutCategoryInput>
  }

  export type TopicUpdateManyWithWhereWithoutCategoryInput = {
    where: TopicScalarWhereInput
    data: XOR<TopicUpdateManyMutationInput, TopicUncheckedUpdateManyWithoutCategoryInput>
  }

  export type TopicScalarWhereInput = {
    AND?: TopicScalarWhereInput | TopicScalarWhereInput[]
    OR?: TopicScalarWhereInput[]
    NOT?: TopicScalarWhereInput | TopicScalarWhereInput[]
    id?: StringFilter<"Topic"> | string
    name?: StringFilter<"Topic"> | string
    description?: StringNullableFilter<"Topic"> | string | null
    keywords?: StringNullableListFilter<"Topic">
    enabled?: BoolFilter<"Topic"> | boolean
    categoryId?: StringNullableFilter<"Topic"> | string | null
    createdAt?: DateTimeFilter<"Topic"> | Date | string
    updatedAt?: DateTimeFilter<"Topic"> | Date | string
  }

  export type ArticleTagCreateWithoutTagInput = {
    article: ArticleCreateNestedOneWithoutTagsInput
  }

  export type ArticleTagUncheckedCreateWithoutTagInput = {
    articleId: string
  }

  export type ArticleTagCreateOrConnectWithoutTagInput = {
    where: ArticleTagWhereUniqueInput
    create: XOR<ArticleTagCreateWithoutTagInput, ArticleTagUncheckedCreateWithoutTagInput>
  }

  export type ArticleTagCreateManyTagInputEnvelope = {
    data: ArticleTagCreateManyTagInput | ArticleTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type ArticleTagUpsertWithWhereUniqueWithoutTagInput = {
    where: ArticleTagWhereUniqueInput
    update: XOR<ArticleTagUpdateWithoutTagInput, ArticleTagUncheckedUpdateWithoutTagInput>
    create: XOR<ArticleTagCreateWithoutTagInput, ArticleTagUncheckedCreateWithoutTagInput>
  }

  export type ArticleTagUpdateWithWhereUniqueWithoutTagInput = {
    where: ArticleTagWhereUniqueInput
    data: XOR<ArticleTagUpdateWithoutTagInput, ArticleTagUncheckedUpdateWithoutTagInput>
  }

  export type ArticleTagUpdateManyWithWhereWithoutTagInput = {
    where: ArticleTagScalarWhereInput
    data: XOR<ArticleTagUpdateManyMutationInput, ArticleTagUncheckedUpdateManyWithoutTagInput>
  }

  export type ArticleTagScalarWhereInput = {
    AND?: ArticleTagScalarWhereInput | ArticleTagScalarWhereInput[]
    OR?: ArticleTagScalarWhereInput[]
    NOT?: ArticleTagScalarWhereInput | ArticleTagScalarWhereInput[]
    articleId?: StringFilter<"ArticleTag"> | string
    tagId?: StringFilter<"ArticleTag"> | string
  }

  export type CategoryCreateWithoutArticlesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    topics?: TopicCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutArticlesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    topics?: TopicUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutArticlesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutArticlesInput, CategoryUncheckedCreateWithoutArticlesInput>
  }

  export type ArticleTagCreateWithoutArticleInput = {
    tag: TagCreateNestedOneWithoutArticlesInput
  }

  export type ArticleTagUncheckedCreateWithoutArticleInput = {
    tagId: string
  }

  export type ArticleTagCreateOrConnectWithoutArticleInput = {
    where: ArticleTagWhereUniqueInput
    create: XOR<ArticleTagCreateWithoutArticleInput, ArticleTagUncheckedCreateWithoutArticleInput>
  }

  export type ArticleTagCreateManyArticleInputEnvelope = {
    data: ArticleTagCreateManyArticleInput | ArticleTagCreateManyArticleInput[]
    skipDuplicates?: boolean
  }

  export type JobRunCreateWithoutArticlesInput = {
    id?: string
    type: $Enums.JobType
    status?: $Enums.JobStatus
    bullJobId?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    source?: ContentSourceCreateNestedOneWithoutJobRunsInput
    channel?: YoutubeChannelCreateNestedOneWithoutJobRunsInput
  }

  export type JobRunUncheckedCreateWithoutArticlesInput = {
    id?: string
    type: $Enums.JobType
    status?: $Enums.JobStatus
    bullJobId?: string | null
    sourceId?: string | null
    channelId?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type JobRunCreateOrConnectWithoutArticlesInput = {
    where: JobRunWhereUniqueInput
    create: XOR<JobRunCreateWithoutArticlesInput, JobRunUncheckedCreateWithoutArticlesInput>
  }

  export type CategoryUpsertWithoutArticlesInput = {
    update: XOR<CategoryUpdateWithoutArticlesInput, CategoryUncheckedUpdateWithoutArticlesInput>
    create: XOR<CategoryCreateWithoutArticlesInput, CategoryUncheckedCreateWithoutArticlesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutArticlesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutArticlesInput, CategoryUncheckedUpdateWithoutArticlesInput>
  }

  export type CategoryUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    topics?: TopicUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    topics?: TopicUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ArticleTagUpsertWithWhereUniqueWithoutArticleInput = {
    where: ArticleTagWhereUniqueInput
    update: XOR<ArticleTagUpdateWithoutArticleInput, ArticleTagUncheckedUpdateWithoutArticleInput>
    create: XOR<ArticleTagCreateWithoutArticleInput, ArticleTagUncheckedCreateWithoutArticleInput>
  }

  export type ArticleTagUpdateWithWhereUniqueWithoutArticleInput = {
    where: ArticleTagWhereUniqueInput
    data: XOR<ArticleTagUpdateWithoutArticleInput, ArticleTagUncheckedUpdateWithoutArticleInput>
  }

  export type ArticleTagUpdateManyWithWhereWithoutArticleInput = {
    where: ArticleTagScalarWhereInput
    data: XOR<ArticleTagUpdateManyMutationInput, ArticleTagUncheckedUpdateManyWithoutArticleInput>
  }

  export type JobRunUpsertWithoutArticlesInput = {
    update: XOR<JobRunUpdateWithoutArticlesInput, JobRunUncheckedUpdateWithoutArticlesInput>
    create: XOR<JobRunCreateWithoutArticlesInput, JobRunUncheckedCreateWithoutArticlesInput>
    where?: JobRunWhereInput
  }

  export type JobRunUpdateToOneWithWhereWithoutArticlesInput = {
    where?: JobRunWhereInput
    data: XOR<JobRunUpdateWithoutArticlesInput, JobRunUncheckedUpdateWithoutArticlesInput>
  }

  export type JobRunUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    bullJobId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: ContentSourceUpdateOneWithoutJobRunsNestedInput
    channel?: YoutubeChannelUpdateOneWithoutJobRunsNestedInput
  }

  export type JobRunUncheckedUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    bullJobId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCreateWithoutTagsInput = {
    id?: string
    title: string
    slug: string
    excerpt?: string | null
    content: string
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: string | null
    keywords?: ArticleCreatekeywordsInput | string[]
    status?: $Enums.ArticleStatus
    publishedAt?: Date | string | null
    featured?: boolean
    viewCount?: number
    sourceType?: $Enums.SourceType | null
    sourceUrl?: string | null
    sourceId?: string | null
    aiGenerated?: boolean
    aiModel?: string | null
    aiPromptVersion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutArticlesInput
    jobRun?: JobRunCreateNestedOneWithoutArticlesInput
  }

  export type ArticleUncheckedCreateWithoutTagsInput = {
    id?: string
    title: string
    slug: string
    excerpt?: string | null
    content: string
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: string | null
    keywords?: ArticleCreatekeywordsInput | string[]
    status?: $Enums.ArticleStatus
    publishedAt?: Date | string | null
    featured?: boolean
    viewCount?: number
    sourceType?: $Enums.SourceType | null
    sourceUrl?: string | null
    sourceId?: string | null
    aiGenerated?: boolean
    aiModel?: string | null
    aiPromptVersion?: string | null
    categoryId?: string | null
    jobRunId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleCreateOrConnectWithoutTagsInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutTagsInput, ArticleUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutArticlesInput = {
    id?: string
    name: string
    slug: string
  }

  export type TagUncheckedCreateWithoutArticlesInput = {
    id?: string
    name: string
    slug: string
  }

  export type TagCreateOrConnectWithoutArticlesInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutArticlesInput, TagUncheckedCreateWithoutArticlesInput>
  }

  export type ArticleUpsertWithoutTagsInput = {
    update: XOR<ArticleUpdateWithoutTagsInput, ArticleUncheckedUpdateWithoutTagsInput>
    create: XOR<ArticleCreateWithoutTagsInput, ArticleUncheckedCreateWithoutTagsInput>
    where?: ArticleWhereInput
  }

  export type ArticleUpdateToOneWithWhereWithoutTagsInput = {
    where?: ArticleWhereInput
    data: XOR<ArticleUpdateWithoutTagsInput, ArticleUncheckedUpdateWithoutTagsInput>
  }

  export type ArticleUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImage?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: ArticleUpdatekeywordsInput | string[]
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    sourceType?: NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutArticlesNestedInput
    jobRun?: JobRunUpdateOneWithoutArticlesNestedInput
  }

  export type ArticleUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImage?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: ArticleUpdatekeywordsInput | string[]
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    sourceType?: NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptVersion?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    jobRunId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUpsertWithoutArticlesInput = {
    update: XOR<TagUpdateWithoutArticlesInput, TagUncheckedUpdateWithoutArticlesInput>
    create: XOR<TagCreateWithoutArticlesInput, TagUncheckedCreateWithoutArticlesInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutArticlesInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutArticlesInput, TagUncheckedUpdateWithoutArticlesInput>
  }

  export type TagUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryCreateWithoutTopicsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    articles?: ArticleCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutTopicsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    articles?: ArticleUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutTopicsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutTopicsInput, CategoryUncheckedCreateWithoutTopicsInput>
  }

  export type ContentSourceCreateWithoutTopicInput = {
    id?: string
    type: $Enums.SourceType
    name: string
    url?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: boolean
    lastFetchAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobRuns?: JobRunCreateNestedManyWithoutSourceInput
  }

  export type ContentSourceUncheckedCreateWithoutTopicInput = {
    id?: string
    type: $Enums.SourceType
    name: string
    url?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: boolean
    lastFetchAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobRuns?: JobRunUncheckedCreateNestedManyWithoutSourceInput
  }

  export type ContentSourceCreateOrConnectWithoutTopicInput = {
    where: ContentSourceWhereUniqueInput
    create: XOR<ContentSourceCreateWithoutTopicInput, ContentSourceUncheckedCreateWithoutTopicInput>
  }

  export type ContentSourceCreateManyTopicInputEnvelope = {
    data: ContentSourceCreateManyTopicInput | ContentSourceCreateManyTopicInput[]
    skipDuplicates?: boolean
  }

  export type YoutubeChannelCreateWithoutTopicInput = {
    id?: string
    channelId: string
    channelName: string
    channelUrl: string
    enabled?: boolean
    lastCheckedAt?: Date | string | null
    lastVideoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobRuns?: JobRunCreateNestedManyWithoutChannelInput
  }

  export type YoutubeChannelUncheckedCreateWithoutTopicInput = {
    id?: string
    channelId: string
    channelName: string
    channelUrl: string
    enabled?: boolean
    lastCheckedAt?: Date | string | null
    lastVideoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobRuns?: JobRunUncheckedCreateNestedManyWithoutChannelInput
  }

  export type YoutubeChannelCreateOrConnectWithoutTopicInput = {
    where: YoutubeChannelWhereUniqueInput
    create: XOR<YoutubeChannelCreateWithoutTopicInput, YoutubeChannelUncheckedCreateWithoutTopicInput>
  }

  export type YoutubeChannelCreateManyTopicInputEnvelope = {
    data: YoutubeChannelCreateManyTopicInput | YoutubeChannelCreateManyTopicInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutTopicsInput = {
    update: XOR<CategoryUpdateWithoutTopicsInput, CategoryUncheckedUpdateWithoutTopicsInput>
    create: XOR<CategoryCreateWithoutTopicsInput, CategoryUncheckedCreateWithoutTopicsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutTopicsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutTopicsInput, CategoryUncheckedUpdateWithoutTopicsInput>
  }

  export type CategoryUpdateWithoutTopicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutTopicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ContentSourceUpsertWithWhereUniqueWithoutTopicInput = {
    where: ContentSourceWhereUniqueInput
    update: XOR<ContentSourceUpdateWithoutTopicInput, ContentSourceUncheckedUpdateWithoutTopicInput>
    create: XOR<ContentSourceCreateWithoutTopicInput, ContentSourceUncheckedCreateWithoutTopicInput>
  }

  export type ContentSourceUpdateWithWhereUniqueWithoutTopicInput = {
    where: ContentSourceWhereUniqueInput
    data: XOR<ContentSourceUpdateWithoutTopicInput, ContentSourceUncheckedUpdateWithoutTopicInput>
  }

  export type ContentSourceUpdateManyWithWhereWithoutTopicInput = {
    where: ContentSourceScalarWhereInput
    data: XOR<ContentSourceUpdateManyMutationInput, ContentSourceUncheckedUpdateManyWithoutTopicInput>
  }

  export type ContentSourceScalarWhereInput = {
    AND?: ContentSourceScalarWhereInput | ContentSourceScalarWhereInput[]
    OR?: ContentSourceScalarWhereInput[]
    NOT?: ContentSourceScalarWhereInput | ContentSourceScalarWhereInput[]
    id?: StringFilter<"ContentSource"> | string
    type?: EnumSourceTypeFilter<"ContentSource"> | $Enums.SourceType
    name?: StringFilter<"ContentSource"> | string
    url?: StringNullableFilter<"ContentSource"> | string | null
    config?: JsonNullableFilter<"ContentSource">
    enabled?: BoolFilter<"ContentSource"> | boolean
    topicId?: StringNullableFilter<"ContentSource"> | string | null
    lastFetchAt?: DateTimeNullableFilter<"ContentSource"> | Date | string | null
    createdAt?: DateTimeFilter<"ContentSource"> | Date | string
    updatedAt?: DateTimeFilter<"ContentSource"> | Date | string
  }

  export type YoutubeChannelUpsertWithWhereUniqueWithoutTopicInput = {
    where: YoutubeChannelWhereUniqueInput
    update: XOR<YoutubeChannelUpdateWithoutTopicInput, YoutubeChannelUncheckedUpdateWithoutTopicInput>
    create: XOR<YoutubeChannelCreateWithoutTopicInput, YoutubeChannelUncheckedCreateWithoutTopicInput>
  }

  export type YoutubeChannelUpdateWithWhereUniqueWithoutTopicInput = {
    where: YoutubeChannelWhereUniqueInput
    data: XOR<YoutubeChannelUpdateWithoutTopicInput, YoutubeChannelUncheckedUpdateWithoutTopicInput>
  }

  export type YoutubeChannelUpdateManyWithWhereWithoutTopicInput = {
    where: YoutubeChannelScalarWhereInput
    data: XOR<YoutubeChannelUpdateManyMutationInput, YoutubeChannelUncheckedUpdateManyWithoutTopicInput>
  }

  export type YoutubeChannelScalarWhereInput = {
    AND?: YoutubeChannelScalarWhereInput | YoutubeChannelScalarWhereInput[]
    OR?: YoutubeChannelScalarWhereInput[]
    NOT?: YoutubeChannelScalarWhereInput | YoutubeChannelScalarWhereInput[]
    id?: StringFilter<"YoutubeChannel"> | string
    channelId?: StringFilter<"YoutubeChannel"> | string
    channelName?: StringFilter<"YoutubeChannel"> | string
    channelUrl?: StringFilter<"YoutubeChannel"> | string
    enabled?: BoolFilter<"YoutubeChannel"> | boolean
    topicId?: StringNullableFilter<"YoutubeChannel"> | string | null
    lastCheckedAt?: DateTimeNullableFilter<"YoutubeChannel"> | Date | string | null
    lastVideoId?: StringNullableFilter<"YoutubeChannel"> | string | null
    createdAt?: DateTimeFilter<"YoutubeChannel"> | Date | string
    updatedAt?: DateTimeFilter<"YoutubeChannel"> | Date | string
  }

  export type TopicCreateWithoutSourcesInput = {
    id?: string
    name: string
    description?: string | null
    keywords?: TopicCreatekeywordsInput | string[]
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutTopicsInput
    channels?: YoutubeChannelCreateNestedManyWithoutTopicInput
  }

  export type TopicUncheckedCreateWithoutSourcesInput = {
    id?: string
    name: string
    description?: string | null
    keywords?: TopicCreatekeywordsInput | string[]
    enabled?: boolean
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    channels?: YoutubeChannelUncheckedCreateNestedManyWithoutTopicInput
  }

  export type TopicCreateOrConnectWithoutSourcesInput = {
    where: TopicWhereUniqueInput
    create: XOR<TopicCreateWithoutSourcesInput, TopicUncheckedCreateWithoutSourcesInput>
  }

  export type JobRunCreateWithoutSourceInput = {
    id?: string
    type: $Enums.JobType
    status?: $Enums.JobStatus
    bullJobId?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    channel?: YoutubeChannelCreateNestedOneWithoutJobRunsInput
    articles?: ArticleCreateNestedManyWithoutJobRunInput
  }

  export type JobRunUncheckedCreateWithoutSourceInput = {
    id?: string
    type: $Enums.JobType
    status?: $Enums.JobStatus
    bullJobId?: string | null
    channelId?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    articles?: ArticleUncheckedCreateNestedManyWithoutJobRunInput
  }

  export type JobRunCreateOrConnectWithoutSourceInput = {
    where: JobRunWhereUniqueInput
    create: XOR<JobRunCreateWithoutSourceInput, JobRunUncheckedCreateWithoutSourceInput>
  }

  export type JobRunCreateManySourceInputEnvelope = {
    data: JobRunCreateManySourceInput | JobRunCreateManySourceInput[]
    skipDuplicates?: boolean
  }

  export type TopicUpsertWithoutSourcesInput = {
    update: XOR<TopicUpdateWithoutSourcesInput, TopicUncheckedUpdateWithoutSourcesInput>
    create: XOR<TopicCreateWithoutSourcesInput, TopicUncheckedCreateWithoutSourcesInput>
    where?: TopicWhereInput
  }

  export type TopicUpdateToOneWithWhereWithoutSourcesInput = {
    where?: TopicWhereInput
    data: XOR<TopicUpdateWithoutSourcesInput, TopicUncheckedUpdateWithoutSourcesInput>
  }

  export type TopicUpdateWithoutSourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: TopicUpdatekeywordsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutTopicsNestedInput
    channels?: YoutubeChannelUpdateManyWithoutTopicNestedInput
  }

  export type TopicUncheckedUpdateWithoutSourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: TopicUpdatekeywordsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: YoutubeChannelUncheckedUpdateManyWithoutTopicNestedInput
  }

  export type JobRunUpsertWithWhereUniqueWithoutSourceInput = {
    where: JobRunWhereUniqueInput
    update: XOR<JobRunUpdateWithoutSourceInput, JobRunUncheckedUpdateWithoutSourceInput>
    create: XOR<JobRunCreateWithoutSourceInput, JobRunUncheckedCreateWithoutSourceInput>
  }

  export type JobRunUpdateWithWhereUniqueWithoutSourceInput = {
    where: JobRunWhereUniqueInput
    data: XOR<JobRunUpdateWithoutSourceInput, JobRunUncheckedUpdateWithoutSourceInput>
  }

  export type JobRunUpdateManyWithWhereWithoutSourceInput = {
    where: JobRunScalarWhereInput
    data: XOR<JobRunUpdateManyMutationInput, JobRunUncheckedUpdateManyWithoutSourceInput>
  }

  export type JobRunScalarWhereInput = {
    AND?: JobRunScalarWhereInput | JobRunScalarWhereInput[]
    OR?: JobRunScalarWhereInput[]
    NOT?: JobRunScalarWhereInput | JobRunScalarWhereInput[]
    id?: StringFilter<"JobRun"> | string
    type?: EnumJobTypeFilter<"JobRun"> | $Enums.JobType
    status?: EnumJobStatusFilter<"JobRun"> | $Enums.JobStatus
    bullJobId?: StringNullableFilter<"JobRun"> | string | null
    sourceId?: StringNullableFilter<"JobRun"> | string | null
    channelId?: StringNullableFilter<"JobRun"> | string | null
    payload?: JsonNullableFilter<"JobRun">
    result?: JsonNullableFilter<"JobRun">
    errorMessage?: StringNullableFilter<"JobRun"> | string | null
    startedAt?: DateTimeNullableFilter<"JobRun"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"JobRun"> | Date | string | null
    createdAt?: DateTimeFilter<"JobRun"> | Date | string
  }

  export type TopicCreateWithoutChannelsInput = {
    id?: string
    name: string
    description?: string | null
    keywords?: TopicCreatekeywordsInput | string[]
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutTopicsInput
    sources?: ContentSourceCreateNestedManyWithoutTopicInput
  }

  export type TopicUncheckedCreateWithoutChannelsInput = {
    id?: string
    name: string
    description?: string | null
    keywords?: TopicCreatekeywordsInput | string[]
    enabled?: boolean
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: ContentSourceUncheckedCreateNestedManyWithoutTopicInput
  }

  export type TopicCreateOrConnectWithoutChannelsInput = {
    where: TopicWhereUniqueInput
    create: XOR<TopicCreateWithoutChannelsInput, TopicUncheckedCreateWithoutChannelsInput>
  }

  export type JobRunCreateWithoutChannelInput = {
    id?: string
    type: $Enums.JobType
    status?: $Enums.JobStatus
    bullJobId?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    source?: ContentSourceCreateNestedOneWithoutJobRunsInput
    articles?: ArticleCreateNestedManyWithoutJobRunInput
  }

  export type JobRunUncheckedCreateWithoutChannelInput = {
    id?: string
    type: $Enums.JobType
    status?: $Enums.JobStatus
    bullJobId?: string | null
    sourceId?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    articles?: ArticleUncheckedCreateNestedManyWithoutJobRunInput
  }

  export type JobRunCreateOrConnectWithoutChannelInput = {
    where: JobRunWhereUniqueInput
    create: XOR<JobRunCreateWithoutChannelInput, JobRunUncheckedCreateWithoutChannelInput>
  }

  export type JobRunCreateManyChannelInputEnvelope = {
    data: JobRunCreateManyChannelInput | JobRunCreateManyChannelInput[]
    skipDuplicates?: boolean
  }

  export type TopicUpsertWithoutChannelsInput = {
    update: XOR<TopicUpdateWithoutChannelsInput, TopicUncheckedUpdateWithoutChannelsInput>
    create: XOR<TopicCreateWithoutChannelsInput, TopicUncheckedCreateWithoutChannelsInput>
    where?: TopicWhereInput
  }

  export type TopicUpdateToOneWithWhereWithoutChannelsInput = {
    where?: TopicWhereInput
    data: XOR<TopicUpdateWithoutChannelsInput, TopicUncheckedUpdateWithoutChannelsInput>
  }

  export type TopicUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: TopicUpdatekeywordsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutTopicsNestedInput
    sources?: ContentSourceUpdateManyWithoutTopicNestedInput
  }

  export type TopicUncheckedUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: TopicUpdatekeywordsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: ContentSourceUncheckedUpdateManyWithoutTopicNestedInput
  }

  export type JobRunUpsertWithWhereUniqueWithoutChannelInput = {
    where: JobRunWhereUniqueInput
    update: XOR<JobRunUpdateWithoutChannelInput, JobRunUncheckedUpdateWithoutChannelInput>
    create: XOR<JobRunCreateWithoutChannelInput, JobRunUncheckedCreateWithoutChannelInput>
  }

  export type JobRunUpdateWithWhereUniqueWithoutChannelInput = {
    where: JobRunWhereUniqueInput
    data: XOR<JobRunUpdateWithoutChannelInput, JobRunUncheckedUpdateWithoutChannelInput>
  }

  export type JobRunUpdateManyWithWhereWithoutChannelInput = {
    where: JobRunScalarWhereInput
    data: XOR<JobRunUpdateManyMutationInput, JobRunUncheckedUpdateManyWithoutChannelInput>
  }

  export type ContentSourceCreateWithoutJobRunsInput = {
    id?: string
    type: $Enums.SourceType
    name: string
    url?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: boolean
    lastFetchAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    topic?: TopicCreateNestedOneWithoutSourcesInput
  }

  export type ContentSourceUncheckedCreateWithoutJobRunsInput = {
    id?: string
    type: $Enums.SourceType
    name: string
    url?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: boolean
    topicId?: string | null
    lastFetchAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContentSourceCreateOrConnectWithoutJobRunsInput = {
    where: ContentSourceWhereUniqueInput
    create: XOR<ContentSourceCreateWithoutJobRunsInput, ContentSourceUncheckedCreateWithoutJobRunsInput>
  }

  export type YoutubeChannelCreateWithoutJobRunsInput = {
    id?: string
    channelId: string
    channelName: string
    channelUrl: string
    enabled?: boolean
    lastCheckedAt?: Date | string | null
    lastVideoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    topic?: TopicCreateNestedOneWithoutChannelsInput
  }

  export type YoutubeChannelUncheckedCreateWithoutJobRunsInput = {
    id?: string
    channelId: string
    channelName: string
    channelUrl: string
    enabled?: boolean
    topicId?: string | null
    lastCheckedAt?: Date | string | null
    lastVideoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type YoutubeChannelCreateOrConnectWithoutJobRunsInput = {
    where: YoutubeChannelWhereUniqueInput
    create: XOR<YoutubeChannelCreateWithoutJobRunsInput, YoutubeChannelUncheckedCreateWithoutJobRunsInput>
  }

  export type ArticleCreateWithoutJobRunInput = {
    id?: string
    title: string
    slug: string
    excerpt?: string | null
    content: string
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: string | null
    keywords?: ArticleCreatekeywordsInput | string[]
    status?: $Enums.ArticleStatus
    publishedAt?: Date | string | null
    featured?: boolean
    viewCount?: number
    sourceType?: $Enums.SourceType | null
    sourceUrl?: string | null
    sourceId?: string | null
    aiGenerated?: boolean
    aiModel?: string | null
    aiPromptVersion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutArticlesInput
    tags?: ArticleTagCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateWithoutJobRunInput = {
    id?: string
    title: string
    slug: string
    excerpt?: string | null
    content: string
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: string | null
    keywords?: ArticleCreatekeywordsInput | string[]
    status?: $Enums.ArticleStatus
    publishedAt?: Date | string | null
    featured?: boolean
    viewCount?: number
    sourceType?: $Enums.SourceType | null
    sourceUrl?: string | null
    sourceId?: string | null
    aiGenerated?: boolean
    aiModel?: string | null
    aiPromptVersion?: string | null
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ArticleTagUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleCreateOrConnectWithoutJobRunInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutJobRunInput, ArticleUncheckedCreateWithoutJobRunInput>
  }

  export type ArticleCreateManyJobRunInputEnvelope = {
    data: ArticleCreateManyJobRunInput | ArticleCreateManyJobRunInput[]
    skipDuplicates?: boolean
  }

  export type ContentSourceUpsertWithoutJobRunsInput = {
    update: XOR<ContentSourceUpdateWithoutJobRunsInput, ContentSourceUncheckedUpdateWithoutJobRunsInput>
    create: XOR<ContentSourceCreateWithoutJobRunsInput, ContentSourceUncheckedCreateWithoutJobRunsInput>
    where?: ContentSourceWhereInput
  }

  export type ContentSourceUpdateToOneWithWhereWithoutJobRunsInput = {
    where?: ContentSourceWhereInput
    data: XOR<ContentSourceUpdateWithoutJobRunsInput, ContentSourceUncheckedUpdateWithoutJobRunsInput>
  }

  export type ContentSourceUpdateWithoutJobRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastFetchAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    topic?: TopicUpdateOneWithoutSourcesNestedInput
  }

  export type ContentSourceUncheckedUpdateWithoutJobRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    topicId?: NullableStringFieldUpdateOperationsInput | string | null
    lastFetchAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YoutubeChannelUpsertWithoutJobRunsInput = {
    update: XOR<YoutubeChannelUpdateWithoutJobRunsInput, YoutubeChannelUncheckedUpdateWithoutJobRunsInput>
    create: XOR<YoutubeChannelCreateWithoutJobRunsInput, YoutubeChannelUncheckedCreateWithoutJobRunsInput>
    where?: YoutubeChannelWhereInput
  }

  export type YoutubeChannelUpdateToOneWithWhereWithoutJobRunsInput = {
    where?: YoutubeChannelWhereInput
    data: XOR<YoutubeChannelUpdateWithoutJobRunsInput, YoutubeChannelUncheckedUpdateWithoutJobRunsInput>
  }

  export type YoutubeChannelUpdateWithoutJobRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: StringFieldUpdateOperationsInput | string
    channelUrl?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastVideoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    topic?: TopicUpdateOneWithoutChannelsNestedInput
  }

  export type YoutubeChannelUncheckedUpdateWithoutJobRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: StringFieldUpdateOperationsInput | string
    channelUrl?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    topicId?: NullableStringFieldUpdateOperationsInput | string | null
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastVideoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUpsertWithWhereUniqueWithoutJobRunInput = {
    where: ArticleWhereUniqueInput
    update: XOR<ArticleUpdateWithoutJobRunInput, ArticleUncheckedUpdateWithoutJobRunInput>
    create: XOR<ArticleCreateWithoutJobRunInput, ArticleUncheckedCreateWithoutJobRunInput>
  }

  export type ArticleUpdateWithWhereUniqueWithoutJobRunInput = {
    where: ArticleWhereUniqueInput
    data: XOR<ArticleUpdateWithoutJobRunInput, ArticleUncheckedUpdateWithoutJobRunInput>
  }

  export type ArticleUpdateManyWithWhereWithoutJobRunInput = {
    where: ArticleScalarWhereInput
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyWithoutJobRunInput>
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCreateManyCategoryInput = {
    id?: string
    title: string
    slug: string
    excerpt?: string | null
    content: string
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: string | null
    keywords?: ArticleCreatekeywordsInput | string[]
    status?: $Enums.ArticleStatus
    publishedAt?: Date | string | null
    featured?: boolean
    viewCount?: number
    sourceType?: $Enums.SourceType | null
    sourceUrl?: string | null
    sourceId?: string | null
    aiGenerated?: boolean
    aiModel?: string | null
    aiPromptVersion?: string | null
    jobRunId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TopicCreateManyCategoryInput = {
    id?: string
    name: string
    description?: string | null
    keywords?: TopicCreatekeywordsInput | string[]
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImage?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: ArticleUpdatekeywordsInput | string[]
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    sourceType?: NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ArticleTagUpdateManyWithoutArticleNestedInput
    jobRun?: JobRunUpdateOneWithoutArticlesNestedInput
  }

  export type ArticleUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImage?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: ArticleUpdatekeywordsInput | string[]
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    sourceType?: NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptVersion?: NullableStringFieldUpdateOperationsInput | string | null
    jobRunId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ArticleTagUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImage?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: ArticleUpdatekeywordsInput | string[]
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    sourceType?: NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptVersion?: NullableStringFieldUpdateOperationsInput | string | null
    jobRunId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TopicUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: TopicUpdatekeywordsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: ContentSourceUpdateManyWithoutTopicNestedInput
    channels?: YoutubeChannelUpdateManyWithoutTopicNestedInput
  }

  export type TopicUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: TopicUpdatekeywordsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: ContentSourceUncheckedUpdateManyWithoutTopicNestedInput
    channels?: YoutubeChannelUncheckedUpdateManyWithoutTopicNestedInput
  }

  export type TopicUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: TopicUpdatekeywordsInput | string[]
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleTagCreateManyTagInput = {
    articleId: string
  }

  export type ArticleTagUpdateWithoutTagInput = {
    article?: ArticleUpdateOneRequiredWithoutTagsNestedInput
  }

  export type ArticleTagUncheckedUpdateWithoutTagInput = {
    articleId?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleTagUncheckedUpdateManyWithoutTagInput = {
    articleId?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleTagCreateManyArticleInput = {
    tagId: string
  }

  export type ArticleTagUpdateWithoutArticleInput = {
    tag?: TagUpdateOneRequiredWithoutArticlesNestedInput
  }

  export type ArticleTagUncheckedUpdateWithoutArticleInput = {
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleTagUncheckedUpdateManyWithoutArticleInput = {
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type ContentSourceCreateManyTopicInput = {
    id?: string
    type: $Enums.SourceType
    name: string
    url?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: boolean
    lastFetchAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type YoutubeChannelCreateManyTopicInput = {
    id?: string
    channelId: string
    channelName: string
    channelUrl: string
    enabled?: boolean
    lastCheckedAt?: Date | string | null
    lastVideoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContentSourceUpdateWithoutTopicInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastFetchAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobRuns?: JobRunUpdateManyWithoutSourceNestedInput
  }

  export type ContentSourceUncheckedUpdateWithoutTopicInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastFetchAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobRuns?: JobRunUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type ContentSourceUncheckedUpdateManyWithoutTopicInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastFetchAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YoutubeChannelUpdateWithoutTopicInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: StringFieldUpdateOperationsInput | string
    channelUrl?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastVideoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobRuns?: JobRunUpdateManyWithoutChannelNestedInput
  }

  export type YoutubeChannelUncheckedUpdateWithoutTopicInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: StringFieldUpdateOperationsInput | string
    channelUrl?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastVideoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobRuns?: JobRunUncheckedUpdateManyWithoutChannelNestedInput
  }

  export type YoutubeChannelUncheckedUpdateManyWithoutTopicInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: StringFieldUpdateOperationsInput | string
    channelUrl?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastVideoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobRunCreateManySourceInput = {
    id?: string
    type: $Enums.JobType
    status?: $Enums.JobStatus
    bullJobId?: string | null
    channelId?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type JobRunUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    bullJobId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channel?: YoutubeChannelUpdateOneWithoutJobRunsNestedInput
    articles?: ArticleUpdateManyWithoutJobRunNestedInput
  }

  export type JobRunUncheckedUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    bullJobId?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUncheckedUpdateManyWithoutJobRunNestedInput
  }

  export type JobRunUncheckedUpdateManyWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    bullJobId?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobRunCreateManyChannelInput = {
    id?: string
    type: $Enums.JobType
    status?: $Enums.JobStatus
    bullJobId?: string | null
    sourceId?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type JobRunUpdateWithoutChannelInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    bullJobId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: ContentSourceUpdateOneWithoutJobRunsNestedInput
    articles?: ArticleUpdateManyWithoutJobRunNestedInput
  }

  export type JobRunUncheckedUpdateWithoutChannelInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    bullJobId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUncheckedUpdateManyWithoutJobRunNestedInput
  }

  export type JobRunUncheckedUpdateManyWithoutChannelInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    bullJobId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCreateManyJobRunInput = {
    id?: string
    title: string
    slug: string
    excerpt?: string | null
    content: string
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: string | null
    keywords?: ArticleCreatekeywordsInput | string[]
    status?: $Enums.ArticleStatus
    publishedAt?: Date | string | null
    featured?: boolean
    viewCount?: number
    sourceType?: $Enums.SourceType | null
    sourceUrl?: string | null
    sourceId?: string | null
    aiGenerated?: boolean
    aiModel?: string | null
    aiPromptVersion?: string | null
    categoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUpdateWithoutJobRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImage?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: ArticleUpdatekeywordsInput | string[]
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    sourceType?: NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutArticlesNestedInput
    tags?: ArticleTagUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateWithoutJobRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImage?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: ArticleUpdatekeywordsInput | string[]
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    sourceType?: NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptVersion?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ArticleTagUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateManyWithoutJobRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImage?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: ArticleUpdatekeywordsInput | string[]
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    sourceType?: NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptVersion?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}