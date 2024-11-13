import { Verse as VerseType } from '@/types/chapter';

const Verse = ({ number, text }: VerseType) => {
    // Using shadow to highlight the text on hover to prevent other text from repositioning
    return (
        <span className="my-1 mr-1 pl-1 hover:shadow-[0_0_1px_1px_rgba(0,0,0,0.6)]">
            <sup>{number}</sup> {text}
        </span>
    );
}

export default Verse;