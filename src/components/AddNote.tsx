'use client';

import Form from 'next/form';
import { submitNote } from '@/actions/SubmitNote';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function AddNote({ verseKey }: { verseKey: string }) {
    const { data: session } = useSession();
    const pathname = usePathname(); // Current path to revalidate after submitting a vote

    const submitForm = async (formData: FormData) => {
        const noteText = formData.get('noteText') as string;
        return await submitNote(noteText, verseKey, session?.user?.id, pathname);
    };

    return (
        <Form action={submitForm} id="noteForm" className="w-full flex flex-col">
            <h1>Note:</h1>
            <textarea form="noteForm" name="noteText" id="noteText" wrap="soft" className="p-2 w-full rounded" />
            <button type="submit" className="bg-slate-300 px-2 p-1 rounded self-end my-2">Add Note</button>
        </Form>
    );
}
