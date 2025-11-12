// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/db";
import { users, sessions, verificationTokens, accounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        sessionsTable: sessions,
        accountsTable: accounts,
        verificationTokensTable: verificationTokens
    }),
    session: {
        strategy: "database", // Database sessions
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // Update session every 24 hours
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                const email = credentials.email as string;
                const password = credentials.password as string;

                // Find user by email
                const user = await db.query.users.findFirst({
                    where: eq(users.email, email),
                    with: {
                        roles: true,
                    },
                });

                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
                }

                // Check if user is verified
                if (!user.isVerified) {
                    throw new Error("Account has been disabled");
                }

                // Check password
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    throw new Error("Invalid credentials");
                }

                // Return user object (adapter will create session)
                return {
                    id: user.id,
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                    image: user.imageUrl || null,
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            // With database strategy, 'user' is passed from DB
            if (session.user) {
                session.user.id = user.id;

                // Get fresh user data with roles
                const userData = await db.query.users.findFirst({
                    where: eq(users.id, user.id),
                    with: {
                        roles: true,
                    },
                });

                if (userData) {
                    session.user.roles = userData.roles.map((r) => r.role);
                    session.user.firstName = userData.firstName;
                    session.user.lastName = userData.lastName;
                    session.user.level = userData.level;
                    session.user.isVerified = userData.isVerified;
                }
            }

            return session;
        },
    },
    events: {
        async signIn({ user }) {
            // Update last active timestamp when user signs in
            // This happens automatically via the adapter
            console.log(`User ${user.email} signed in`);
        },
        async signOut({ session, token }) {
            // Session is already deleted by the adapter
            console.log("User signed out");
        },
    },
});

// types/next-auth.d.ts - Extend NextAuth types
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            roles: string[];
            firstName: string;
            lastName: string;
            level: number;
            isVerified: boolean;
        } & DefaultSession["user"];
    }

    interface User {
        roles?: string[];
        firstName?: string;
        lastName?: string;
        level?: number;
        isVerified?: boolean;
    }
}