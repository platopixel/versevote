// /[book]/[chapter]

import 'server-only';
import { fetchBookAndChapter } from '@/utils/bible';
import ChapterSelect from '@/components/ChapterSelect';
import NextPreviousButtons from '@/components/NextPreviousButtons';
import Verse from '@/components/Verse';
import Sidebar from '@/components/Sidebar';

const Book = async function ({ params, searchParams }: {
    params: Promise<{ book: string, chapter: string }>;
    searchParams: Promise<{ verse: string }>;
}) {
    const { verse: queryVerse } = await searchParams;
    const selectedVerse = queryVerse ? parseInt(queryVerse) : undefined;

    // TODO: Handle error when book or chapter is not found
    const { book, chapter } = (await params);
    const { verses, nextBookAndChapter, previousBookAndChapter, footnotes } = await fetchBookAndChapter(book, chapter);
    const selectedFootnotes = footnotes?.filter((footnote) => footnote.reference.chapter === parseInt(chapter) && footnote.reference.verse === selectedVerse);

    return (
        <div className="mr-auto ml-auto w-full">
            <div className="flex justify-center">
                <ChapterSelect book={book} chapter={chapter} />
            </div>
            <div className="flex border border-[#857F74] rounded-lg bg-amber-50 my-4">
                <div
                    className="max-w-72 w-72 rounded-l-lg shadow-[2px_0_6px_0_rgba(0,0,0,0.3)]"
                    style={{ clipPath: `inset(0 -10px 0 0)`, backgroundColor: '#f5f0e0' }}
                >
                    <Sidebar footnotes={selectedFootnotes} book={book} chapter={chapter} verse={selectedVerse} />
                </div>
                <div className="flex flex-col p-8 py-4 flex-1 min-w-80 max-h-[1024px] overflow-x-hidden overflow-y-auto">
                    <h1 className="font-bold text-xl mb-4">{`${book.replace(/_/g, " ")} ${chapter}`}</h1>
                    <p className="text-justify">
                        {verses?.map((verse) => (
                            <Verse
                                key={verse.number}
                                number={verse.number}
                                text={verse.text}
                                book={book}
                                chapter={chapter}
                                isSelected={selectedVerse === verse.number}
                            />
                        ))}
                    </p>
                    <div className="pt-4">
                        <NextPreviousButtons next={nextBookAndChapter} previous={previousBookAndChapter} />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Book;