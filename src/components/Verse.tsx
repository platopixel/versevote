import Link from 'next/link'

interface VerseProps {
    number: number;
    text: string[];
    book: string;
    chapter: string;
    isSelected: boolean;
}

const Verse = ({ number, text, book, chapter, isSelected }: VerseProps) => {
    // Using shadow to highlight the text on hover to prevent other text from repositioning
    return (
        <Link
            className={`my-1 mr-1 pl-1 cursor-pointer transition-all rounded hover:no-underline
                ${isSelected ? 'shadow-[0_0_4px_2px_rgba(0,0,0,0.8)]' : 'hover:shadow-[0_0_1px_1px_rgba(0,0,0,0.6)]'}`
            }
            href={{
                pathname: `/${book}/${chapter}`,
                query: isSelected ? {} : { verse: number }
            }}
            scroll={false}
        >
            <sup>{number}</sup> {text}
        </Link>
    );
}

export default Verse;