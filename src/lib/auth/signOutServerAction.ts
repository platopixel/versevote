import { signOut } from "@/lib/auth/authConfig";

export const handleLogout = async () => {
    'use server';

    try {
        await signOut();
    } catch (error) {
        throw error;
    }
};