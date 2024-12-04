
import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated';
import { Footnote } from "@/types/chapter";
import VoteButtons from './VoteButtons';

type Props = {
    footnotes: Footnote[] | undefined;
    book: string | undefined;
    chapter: string | undefined;
    verse: number | undefined;
};

const Sidebar = async ({ footnotes, book, chapter, verse }: Props) => {
    const isAuthenticated = await checkIsAuthenticated();
    const hasSelectedVerse = !!book && !!chapter && !!verse;
    const readableBook = book?.replace(/_/g, " ");

    return (
        <div className="flex-col py-8 px-4">
            {hasSelectedVerse && (
                <h1 className="font-bold">{readableBook} {chapter}:{verse}</h1>
            )}
            {isAuthenticated && hasSelectedVerse && (
                <VoteButtons book={book} chapter={chapter} verse={verse} />
            )}
            {!!footnotes && footnotes.length > 0 && (
                <>
                    <h1>Footnotes:</h1>
                    {footnotes?.map((footnote) => (
                        <div key={footnote.noteId}>
                            <p>{footnote.text}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default Sidebar;
