// https://youtu.be/OOUsvDOKlGs?t=4186
// Components that utilize useSession need to be wrapped in a SessionProvider
'use client';

import { SessionProvider } from 'next-auth/react';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}