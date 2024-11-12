'use client'

import Form from 'next/form';
import { redirect } from 'next/navigation';

async function submitForm(formData: FormData) {
    const book = formData.get('book');
    const chapter = formData.get('chapter');
    console.log(book, chapter);

    // Uncomment below line if redirection is appropriate here
    redirect(`/${book}/${chapter}`);
}

const ChapterSelect = function () {
    return (
        <div className="flex-col items-center justify-center p-12 border">
            <h1>Chapter Select</h1>
            <Form
                action={submitForm}
                className="flex gap-4"
            >
                <div className="items-center">
                    <label htmlFor="book" className="pr-1">Book:</label>
                    <select name="book" className="p-2 border">
                        <option value="Genesis">Genesis</option>
                    </select>
                </div>
                <div className="items-center">
                    <label htmlFor="chapter" className="pr-1">Chapter:</label>
                    <select name="chapter" className="p-2 border">
                        <option value="1">Chapter 1</option>
                    </select>
                </div>
                <button type="submit">Go</button>
            </Form>
        </div>
    );
}

export default ChapterSelect;