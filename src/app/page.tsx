import { redirect } from 'next/navigation';
import ChapterSelect from '@/components/ChapterSelect';

export default function Home() {
    redirect('/Genesis/1');
    return (
        <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main>
                <div className="flex gap-1 items-center flex-col">
                    <ChapterSelect />
                </div>
            </main>
        </div >
    );
}
