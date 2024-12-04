'use client';

import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/firestore';

async function syncFirebaseAuth(session: Session) {
    if (session && session.firebaseToken) {
        try {
            await signInWithCustomToken(auth, session.firebaseToken);
        } catch (error) {
            console.error('Failed to sync Firebase Auth', error);
        }
    } else {
        auth.signOut();
    }
}

function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) {
            console.log('No session');
            return;
        }

        syncFirebaseAuth(session);
    }, [session]);

    return <>{children}</>
}

export default FirebaseAuthProvider;
