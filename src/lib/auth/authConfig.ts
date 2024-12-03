import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { cert } from "firebase-admin/app"
import { adminAuth } from '../firebase/firebase-admin';

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: FirestoreAdapter({
        credential: cert({
            projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
            clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY,
        }),
    }),
    providers: [Google],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        // https://youtu.be/OOUsvDOKlGs?t=8290
        jwt: async ({ token, user }) => {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session?.user) {
                if (token.sub) {
                    const firebaseToken = await adminAuth.createCustomToken(token.sub);
                    session.firebaseToken = firebaseToken;
                    session.user.id = token.sub;
                }
            }

            return session;
        },
    },
})