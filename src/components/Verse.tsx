'use client';

import { useCallback, useState } from 'react';
import { Verse as VerseType } from '@/types/chapter';

const Verse = ({ number, text }: VerseType) => {
    const [isSelected, setIsSelected] = useState(false);

    const onClick = useCallback(() => {
        setIsSelected(!isSelected);
    }, [isSelected]);

    // Using shadow to highlight the text on hover to prevent other text from repositioning
    return (
        <span
            className={`my-1 mr-1 pl-1 cursor-pointer transition-all rounded
                ${isSelected ? 'shadow-[0_0_4px_2px_rgba(0,0,0,0.8)]' : 'hover:shadow-[0_0_1px_1px_rgba(0,0,0,0.6)]'}`
            }
            onClick={onClick}
        >
            <sup>{number}</sup> {text}
        </span>
    );
}

export default Verse;