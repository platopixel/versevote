'use server';

import { adminDb } from '@/lib/firebase/firebase-admin';
import admin from 'firebase-admin';

export const submitVote = async (isUpVote: boolean, verseId: string, userId: string | undefined) => {
    if (!userId) {
        console.log('No user ID provided for vote');
        return;
    }

    const verseRef = adminDb.collection('verses').doc(verseId);
    const userRef = adminDb.collection('users').doc(userId);
    const voteField = isUpVote ? 'upVotes' : 'downVotes';

    await adminDb.runTransaction(async (transaction) => {
        const verseDoc = await transaction.get(verseRef);
        const userDoc = await transaction.get(userRef);

        // Update the verse doc with the updated vote count
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

        // Update the user doc with the verse they voted on
        const currentVotes = userDoc.data()?.[voteField] || [];
        if (currentVotes.includes(verseId)) {
            // Remove the vote if it already exists in the array
            transaction.update(userRef, {
                [voteField]: admin.firestore.FieldValue.arrayRemove(verseId),
            });
        } else {
            // Add the vote to the array
            transaction.update(userRef, {
                [voteField]: admin.firestore.FieldValue.arrayUnion(verseId),
                // Optional: Ensure the verse isn't in the opposite vote array
                [isUpVote ? 'downVotes' : 'upVotes']: admin.firestore.FieldValue.arrayRemove(verseId),
            });
        }
    });
};