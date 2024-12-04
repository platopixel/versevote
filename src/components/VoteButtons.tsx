'use client';

import { submitVote } from '@/actions/SubmitVote';
import { useCallback } from 'react';

type Props = {
    book: string | undefined;
    chapter: string | undefined;
    verse: number | undefined;
}

export default function VoteButtons({ book, chapter, verse }: Props) {
    const verseKey = `${book}_${chapter}_${verse}`;

    const handleUpVote = useCallback(() => {
        submitVote(true, verseKey);
    }, [verseKey]);;

    const handleDownVote = useCallback(() => {
        submitVote(false, verseKey);
    }, [verseKey]);;

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