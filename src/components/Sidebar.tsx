
import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated';
import { Footnote } from "@/types/chapter";
import VoteButtons from './VoteButtons';
import AddComment from './AddNote';
import { adminDb } from '@/lib/firebase/firebase-admin';

type Props = {
    footnotes: Footnote[] | undefined;
    book: string | undefined;
    chapter: string | undefined;
    verse: number | undefined;
};

const Sidebar = async ({ footnotes, book, chapter, verse }: Props) => {
    const isAuthenticated = await checkIsAuthenticated();
    const hasSelectedVerse = !!book && !!chapter && !!verse;
    const verseKey = `${book}_${chapter}_${verse}`;
    // get the verse doc from firebase using the verseKey
    const verseDoc = await adminDb.collection('verses').doc(verseKey).get();
    const verseData = verseDoc.data();
    const readableBook = book?.replace(/_/g, " ");

    return (
        <div className="flex flex-col py-8 px-4">
            {hasSelectedVerse && (
                <h1 className="font-bold">{readableBook} {chapter}:{verse}</h1>
            )}
            {isAuthenticated && hasSelectedVerse && (
                <div className="flex flex-col gap-4 my-4">
                    <VoteButtons verseKey={verseKey} upVotes={verseData?.upVotes} downVotes={verseData?.downVotes} />
                    <AddComment verseKey={verseKey} />
                </div>
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
