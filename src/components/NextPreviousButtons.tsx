import Link from 'next/link';

type BookAndChapter = {
    book: string | undefined;
    chapter: string | undefined;
};

const NextPreviousButtons = ({ next, previous }: { next: BookAndChapter | undefined; previous: BookAndChapter | undefined }) => (
    <div className="flex justify-between pt-8">
        <div>
            {previous?.book && previous?.chapter && (
                <Link className="font-bold text-sm" href={`/${previous.book}/${previous.chapter}`}>{`< ${previous.book.replace(/_/g, " ")} ${previous.chapter}`}</Link>
            )}
        </div>
        <div>
            {next?.book && next?.chapter && (
                <Link className="font-bold text-sm" href={`/${next.book}/${next.chapter}`}>{`${next.book.replace(/_/g, " ")} ${next.chapter} >`}</Link>
            )}
        </div>
    </div>
);

export default NextPreviousButtons;
