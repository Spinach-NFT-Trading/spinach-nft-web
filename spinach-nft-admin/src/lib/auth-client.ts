import {createAuthClient} from "better-auth/react";
import {adminClient, usernameClient} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Ensure this matches your BETTER_AUTH_URL
  plugins: [usernameClient(), adminClient()],
});
