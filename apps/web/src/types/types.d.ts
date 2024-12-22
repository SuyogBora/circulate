import { Session } from "next-auth";

declare module "next/server" {
    interface NextRequest {
        auth?: Session | null; 
    }
}

declare module "next-auth" {
    interface Session {
        user: {
        } & DefaultSession["user"]
    }
}
