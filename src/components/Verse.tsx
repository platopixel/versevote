import { Verse as VerseType } from '@/types/chapter';

const Verse = ({ number, text }: VerseType) => {
    return (
        <span className="my-1 hover:shadow-[0_0_1px_1px_rgba(0,0,0,0.6)]">
            <sup>{number}</sup> {text}
        </span>
    );
}

export default Verse;