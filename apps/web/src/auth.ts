import { prisma } from "@circulate/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXT_AUTH_SECRETE,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({
            token,
            user,
            trigger,
        }) => {
            if (user) {
                token.user = user;
            }
            if (trigger === "update") {
                const refreshedUser = await prisma.user.findUnique({
                    where: { id: token.sub },
                });
                if (refreshedUser) {
                    token.user = refreshedUser;
                } else {
                    return {};
                }
            }
            return token;
        },
         session: async ({ session, token }) =>{
            if (token) {
                session.user = {
                    ...session.user,
                    userId: token.sub,
                };
            }
            return session;
        },
    },
});