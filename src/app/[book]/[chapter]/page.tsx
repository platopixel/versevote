// /[book]/[chapter]

import { fetchBookAndChapter } from '@/utils/bible';
import ChapterSelect from '@/components/ChapterSelect';
import NextPreviousButtons from '@/components/NextPreviousButtons';

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
            <NextPreviousButtons next={nextBookAndChapter} previous={previousBookAndChapter} />
            <div className="border p-8 rounded-lg bg-amber-50  my-4">
                <h1 className="font-bold">{`${book.replace(/_/g, " ")} ${chapter}`}</h1>
                <p>
                    {verses?.map((verse) => {
                        return `${verse} `;
                    })}
                </p>
            </div>
            <NextPreviousButtons next={nextBookAndChapter} previous={previousBookAndChapter} />
        </div>
    );
}

export default Book;