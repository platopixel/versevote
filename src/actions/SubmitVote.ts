'use server';

import { adminDb } from '@/lib/firebase/firebase-admin';

export const submitVote = async (isUpVote: boolean, verse: string) => {
    const verseRef = adminDb.collection('verses').doc(verse);
    const voteField = isUpVote ? 'upVotes' : 'downVotes';

    await adminDb.runTransaction(async (transaction) => {
        const verseDoc = await transaction.get(verseRef);
        if (verseDoc.exists) {
            // If the document exists, update the specific vote field
            const currentVotes = verseDoc.data()?.[voteField] || 0;
            transaction.update(verseRef, {
                [voteField]: currentVotes + 1,
            });
        } else {
            // If the document doesn't exist, create it with the vote field set to 1
            transaction.set(verseRef, {
                [voteField]: 1,
            });
        }
    });
};