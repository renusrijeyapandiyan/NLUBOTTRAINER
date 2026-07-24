"use client"
import { createAuthClient } from "better-auth/react"
 
export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL,
  basePath: "/api/auth",
});
 
// Use better-auth's own session hook directly. It handles cookies,
// reactivity, and refetch correctly out of the box — no need for a
// custom implementation.
export const useSession = authClient.useSession;
 