
import { Footnote } from "@/types/chapter";

type Props = {
    footnotes: Footnote[] | undefined;
};

const Sidebar = ({ footnotes }: Props) => {
    return (
        <div className="flex-col py-8 px-4">
            <h1 className="font-bold">Footnotes:</h1>
            {footnotes?.map((footnote) => (
                <div key={footnote.noteId}>
                    <p>{footnote.text}</p>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
