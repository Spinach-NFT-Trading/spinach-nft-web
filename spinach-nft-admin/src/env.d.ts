declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The connection string for your MongoDB database.
     * Ensure consistent encoding for special characters.
     */
    MONGODB_URI: string,

    /**
     * A secret key used by Better Auth to encrypt session cookies and tokens.
     * You can generate one using `openssl rand -base64 32` or similar tools.
     */
    BETTER_AUTH_SECRET: string,

    /**
     * The base URL of your application (server-side).
     * Used by Better Auth for constructing callback URLs and redirects.
     */
    BETTER_AUTH_URL: string,

    /**
     * The base URL of your application (client-side).
     * Should match BETTER_AUTH_URL for auth client to work correctly.
     */
    NEXT_PUBLIC_BASE_URL: string,
  }
}
