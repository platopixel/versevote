'use client'

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Form from 'next/form';
import { redirect } from 'next/navigation';
import { BOOKS } from '@/utils/bible';
import { Book } from '@/types/book';

async function submitForm(formData: FormData) {
    const book = formData.get('book');
    const chapter = formData.get('chapter');

    // Uncomment below line if redirection is appropriate here
    redirect(`/${book}/${chapter}`);
}

const ChapterSelect = function ({ book, chapter }: { book?: string, chapter?: string }) {
    const [currentBook, setCurrentBook] = useState<Book>(BOOKS[0]);
    const [currentChapter, setCurrentChapter] = useState<string>(chapter ?? '1');

    useEffect(() => {
        if (book) {
            const selectedBook = BOOKS.find((b) => b.name === book) ?? BOOKS[0];
            setCurrentBook(selectedBook);
        }
    }, [book]);

    const onSelectBook = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const selectedBook = BOOKS.find((b) => b.name === event.target.value) ?? BOOKS[0];
        setCurrentBook(selectedBook);
    }, []);

    const onSelectChapter = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setCurrentChapter(event.target.value);
    }, []);

    return (
        <div className="flex-col items-center justify-center px-12 py-6 border rounded border-[#857F74] bg-[#F5F0E0]">
            <Form
                action={submitForm}
                className="flex gap-4"
            >
                <div className="items-center">
                    <label htmlFor="book" className="pr-1">Book:</label>
                    <select name="book" id="book" className="p-1 px-4 border rounded shadow-md" onChange={onSelectBook} value={currentBook.name}>
                        {BOOKS.map((book) => (
                            <option key={book.name} value={book.name}>{book.name.replace(/_/g, " ")}</option>
                        ))}
                    </select>
                </div>
                <div className="items-center">
                    <label htmlFor="chapter" className="pr-1">Chapter:</label>
                    <select name="chapter" id="chapter" className="p-1 px-4 border rounded shadow-md" onChange={onSelectChapter} value={currentChapter}>
                        {Array.from({ length: currentBook.numChapters }, (_, i) => i + 1).map((chapter) => (
                            <option key={chapter} value={chapter}>{chapter}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="border border-[#857F74] px-2 rounded shadow-md bg-amber-50">Go</button>
            </Form>
        </div>
    );
}

export default ChapterSelect;