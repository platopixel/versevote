import { signIn } from "@/lib/auth/authConfig";

export const handleGoogleSignIn = async () => {
    'use server';

    try {
        await signIn("google", { redirectTo: "/Genesis/1" });
    } catch (error) {
        throw error;
    }
};