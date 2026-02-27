import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const MongoDB_URI = process.env.MongoDB_URI;
if (!MongoDB_URI) {
    throw new Error("Please define MongoDB_URI environment variable inside .env");
}

const client = new MongoClient(MongoDB_URI);
const db = client.db();

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET!,
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

export async function getSession() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
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