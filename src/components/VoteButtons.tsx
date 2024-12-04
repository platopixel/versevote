'use client';

import { submitVote } from '@/actions/SubmitVote';
import { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

type Props = {
    verseKey: string;
    upVotes: number | undefined;
    downVotes: number | undefined;
}

export default function VoteButtons({ verseKey, upVotes, downVotes }: Props) {
    const { data: session } = useSession();
    const pathname = usePathname(); // Current path to revalidate after submitting a vote

    const handleUpVote = useCallback(() => {
        submitVote(true, verseKey, session?.user?.id, pathname);
    }, [session?.user?.id, verseKey, pathname]);;

    const handleDownVote = useCallback(() => {
        submitVote(false, verseKey, session?.user?.id, pathname);
    }, [session?.user?.id, verseKey, pathname]);

    return (
        <div className="flex w-full justify-between">
            <button className={`bg-slate-300 p-1 rounded-lg`} onClick={handleUpVote}>
                ↑ ({upVotes || 0})
            </button>
            <button className="bg-slate-300 p-1 rounded-lg" onClick={handleDownVote}>
                ↓ ({downVotes || 0})
            </button>
        </div>
    )
}