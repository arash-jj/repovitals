// lib/auth/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DB_URI = process.env.MongoDB_URI;
if (!DB_URI) {
    throw new Error("Please define MongoDB_URI environment variable inside .env");
}

const client = new MongoClient(DB_URI);
const db = client.db();

export const auth = betterAuth({
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET;
if (!BETTER_AUTH_SECRET) {
    throw new Error("Please define BETTER_AUTH_SECRET environment variable inside .env");
}

export const auth = betterAuth({
    secret: BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    database: mongodbAdapter(db, { client }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60
        }
    },
    emailAndPassword: {
        enabled: true,
    },
});

export async function getSession(incomingHeaders?: Headers) {
    try {
        const session = await auth.api.getSession({
            headers: incomingHeaders ?? await headers(),
        });
        return session;
    } catch (error) {
        console.error("Failed to get session:", error);
        return null;
    }
}

export async function signOut() {
    try {
        const result = await auth.api.signOut({
            headers: await headers(),
        });
        if (result.success) {
            redirect("/sign-in");
        }
    } catch (error) {
        console.error("Sign out failed:", error);
        redirect("/sign-in");
    }
}

export async function requireAuth() {
    const session = await getSession();
    if (!session) {
        redirect("/sign-in");
    }
    return session;
}