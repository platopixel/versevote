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
        <div className="p-8 mr-auto ml-auto" style={{ maxWidth: 1024 }}>
            <div className="flex justify-center">
                <ChapterSelect book={book} chapter={chapter} />
            </div>
            <div>
                <h1 className="font-bold">{`${book.replace(/_/g, " ")} ${chapter}`}</h1>
                <p>
                    {verses?.map((verse) => {
                        return `${verse} `;
                    })}
                </p>
            </div>
            <div className="flex justify-between pt-8">
                <div>
                    {previousBookAndChapter?.book && previousBookAndChapter?.chapter && (
                        <Link className="font-bold" href={`/${previousBookAndChapter.book}/${previousBookAndChapter.chapter}`}>{`< ${previousBookAndChapter.book.replace(/_/g, " ")} ${previousBookAndChapter.chapter}`}</Link>
                    )}
                </div>
                <div>
                    {nextBookAndChapter?.book && nextBookAndChapter?.chapter && (
                        <Link className="font-bold" href={`/${nextBookAndChapter.book}/${nextBookAndChapter.chapter}`}>{`${nextBookAndChapter.book.replace(/_/g, " ")} ${nextBookAndChapter.chapter} >`}</Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Book;