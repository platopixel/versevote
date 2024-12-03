import { auth } from "@/lib/auth/authConfig";

export const checkIsAuthenticated = async () => {
    const session = await auth();
    if (session) {
        console.log(session);
        return true;
    }
    return false;
};