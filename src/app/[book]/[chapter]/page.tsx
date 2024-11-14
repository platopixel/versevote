// /[book]/[chapter]

import { fetchBookAndChapter } from '@/utils/bible';
import ChapterSelect from '@/components/ChapterSelect';
import NextPreviousButtons from '@/components/NextPreviousButtons';
import Verse from '@/components/Verse';

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
            <div className="border p-8 px-12 rounded-lg bg-amber-50  my-4">
                <h1 className="font-bold text-xl mb-4">{`${book.replace(/_/g, " ")} ${chapter}`}</h1>
                <p className="text-justify">
                    {verses?.map((verse) => (
                        <Verse key={verse.number} number={verse.number} text={verse.text} />
                    ))}
                </p>
            </div>
            <NextPreviousButtons next={nextBookAndChapter} previous={previousBookAndChapter} />
        </div>
    );
}

export default Book;