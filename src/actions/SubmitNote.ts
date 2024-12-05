'use server';

import { revalidatePath } from 'next/cache';
import { adminDb } from '@/lib/firebase/firebase-admin';
import admin from 'firebase-admin';

export const submitNote = async (noteText: string, verseId: string, userId: string | undefined, currentPath: string) => {
    if (!userId) {
        console.log('No user ID provided for note');
        return;
    }

    const userRef = adminDb.collection('users').doc(userId);

    await adminDb.runTransaction(async (transaction) => {
        // create a new document for each note
        const noteDoc = await adminDb.collection('notes').add({
            verseId,
            userId,
            text: noteText,
        });

        // Update the user doc with the verse they made a note for
        transaction.update(userRef, {
            notes: admin.firestore.FieldValue.arrayUnion(noteDoc.id),
        });
    });

    revalidatePath(currentPath);
};