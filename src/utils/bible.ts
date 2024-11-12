import { Chapter, Content } from '@/types/chapter';

export const getVersesFromChapterContent = (chapterContent: Content[]) => {
    // return just the verse text in an array
    return chapterContent.reduce((verses, currentVerse) => {
        if (currentVerse.type === 'verse') {
            currentVerse.content?.forEach((verseContent) => {
                if (typeof verseContent === 'string') {
                    verses.push(verseContent);
                }
            });
        }
        return verses;
    }, [] as string[]);
}

// Returns the book and chapter from the api path
export const parseBookAndChapterFomPath = (apiPath: string) => {
    // apiPath is in the format /api/BSB/Matthew/13.json
    const urlParts = apiPath.split('/');
    const book = urlParts[3];
    const chapter = urlParts[4].replace('.json', '');
    return { book, chapter };
}

export const fetchBookAndChapter = async (book: string | undefined, chapter: string | undefined) => {
    let verses;
    let nextBookAndChapter;
    let previousBookAndChapter;

    try {
        const response = await fetch(`https://bible.helloao.org/api/BSB/${book}/${chapter}.json`);
        const data: Chapter = await response.json();
        console.log(data);
        verses = getVersesFromChapterContent(data.chapter.content);
        nextBookAndChapter = parseBookAndChapterFomPath(data.nextChapterApiLink);
        previousBookAndChapter = parseBookAndChapterFomPath(data.previousChapterApiLink);
    } catch (error) {
        console.log(error);
    }

    return {
        verses,
        nextBookAndChapter,
        previousBookAndChapter,
    };
}
