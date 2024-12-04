'use client';

import { submitVote } from '@/actions/SubmitVote';
import { useCallback } from 'react';
import { useSession } from 'next-auth/react';

type Props = {
    verseKey: string;
}

export default function VoteButtons({ verseKey }: Props) {
    const { data: session } = useSession();

    const handleUpVote = useCallback(() => {
        submitVote(true, verseKey, session?.user?.id);
    }, [session?.user?.id, verseKey]);;

    const handleDownVote = useCallback(() => {
        submitVote(false, verseKey, session?.user?.id);
    }, [session?.user?.id, verseKey]);;

    return (
        <div className="flex w-full justify-between">
            <button className="bg-slate-300 p-1 rounded-lg" onClick={handleUpVote}>
                ↑ Up Vote
            </button>
            <button className="bg-slate-300 p-1 rounded-lg" onClick={handleDownVote}>
                ↓ Down Vote
            </button>
        </div>
    )
}