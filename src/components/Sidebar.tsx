
import { Footnote } from "@/types/chapter";

type Props = {
    footnotes: Footnote[] | undefined;
    book: string | undefined;
    chapter: string | undefined;
    verse: number | undefined;
};

const Sidebar = ({ footnotes, book, chapter, verse }: Props) => {
    const readableBook = book?.replace(/_/g, " ");

    return (
        <div className="flex-col py-8 px-4">
            {!!book && !!chapter && !!verse && (
                <h1 className="font-bold">{readableBook} {chapter}:{verse}</h1>
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
