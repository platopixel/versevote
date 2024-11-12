// /[book]/[chapter]

import Link from 'next/link';
import { fetchBookAndChapter } from '@/utils/bible';
import ChapterSelect from '@/components/ChapterSelect';

const Book = async function ({ params }: {
    params: Promise<{ book: string, chapter: string }>
}) {
    // TODO: Handle error when book or chapter is not found
    const { book, chapter } = (await params);
    const { verses, nextBookAndChapter, previousBookAndChapter } = await fetchBookAndChapter(book, chapter);

    return (
        <div className="p-8">
            <div className="flex justify-center">
                <ChapterSelect />
            </div>
            <div>
                <h1>{`${book} ${chapter}`}</h1>
                <p>
                    {verses?.map((verse) => {
                        return `${verse} `;
                    })}
                </p>
            </div>
            <div className="flex justify-between pt-8">
                <div>
                    {previousBookAndChapter?.book && previousBookAndChapter?.chapter && (
                        <Link href={`/${previousBookAndChapter.book}/${previousBookAndChapter.chapter}`}>{`< ${previousBookAndChapter.book} ${previousBookAndChapter.chapter}`}</Link>
                    )}
                </div>
                <div>
                    {nextBookAndChapter?.book && nextBookAndChapter?.chapter && (
                        <Link href={`/${nextBookAndChapter.book}/${nextBookAndChapter.chapter}`}>{`${nextBookAndChapter.book} ${nextBookAndChapter.chapter} >`}</Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Book;