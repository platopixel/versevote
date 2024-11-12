import { Book } from '@/types/book';
import { Chapter, Content } from '@/types/chapter';

export const BOOKS: Book[] = [
    // Old Testament
    { name: "Genesis", numChapters: 50 },
    { name: "Exodus", numChapters: 40 },
    { name: "Leviticus", numChapters: 27 },
    { name: "Numbers", numChapters: 36 },
    { name: "Deuteronomy", numChapters: 34 },
    { name: "Joshua", numChapters: 24 },
    { name: "Judges", numChapters: 21 },
    { name: "Ruth", numChapters: 4 },
    { name: "1 Samuel", numChapters: 31 },
    { name: "2 Samuel", numChapters: 24 },
    { name: "1 Kings", numChapters: 22 },
    { name: "2 Kings", numChapters: 25 },
    { name: "1 Chronicles", numChapters: 29 },
    { name: "2 Chronicles", numChapters: 36 },
    { name: "Ezra", numChapters: 10 },
    { name: "Nehemiah", numChapters: 13 },
    { name: "Esther", numChapters: 10 },
    { name: "Job", numChapters: 42 },
    { name: "Psalms", numChapters: 150 },
    { name: "Proverbs", numChapters: 31 },
    { name: "Ecclesiastes", numChapters: 12 },
    { name: "Song of Solomon", numChapters: 8 },
    { name: "Isaiah", numChapters: 66 },
    { name: "Jeremiah", numChapters: 52 },
    { name: "Lamentations", numChapters: 5 },
    { name: "Ezekiel", numChapters: 48 },
    { name: "Daniel", numChapters: 12 },
    { name: "Hosea", numChapters: 14 },
    { name: "Joel", numChapters: 3 },
    { name: "Amos", numChapters: 9 },
    { name: "Obadiah", numChapters: 1 },
    { name: "Jonah", numChapters: 4 },
    { name: "Micah", numChapters: 7 },
    { name: "Nahum", numChapters: 3 },
    { name: "Habakkuk", numChapters: 3 },
    { name: "Zephaniah", numChapters: 3 },
    { name: "Haggai", numChapters: 2 },
    { name: "Zechariah", numChapters: 14 },
    { name: "Malachi", numChapters: 4 },

    // New Testament
    { name: "Matthew", numChapters: 28 },
    { name: "Mark", numChapters: 16 },
    { name: "Luke", numChapters: 24 },
    { name: "John", numChapters: 21 },
    { name: "Acts", numChapters: 28 },
    { name: "Romans", numChapters: 16 },
    { name: "1 Corinthians", numChapters: 16 },
    { name: "2 Corinthians", numChapters: 13 },
    { name: "Galatians", numChapters: 6 },
    { name: "Ephesians", numChapters: 6 },
    { name: "Philippians", numChapters: 4 },
    { name: "Colossians", numChapters: 4 },
    { name: "1 Thessalonians", numChapters: 5 },
    { name: "2 Thessalonians", numChapters: 3 },
    { name: "1 Timothy", numChapters: 6 },
    { name: "2 Timothy", numChapters: 4 },
    { name: "Titus", numChapters: 3 },
    { name: "Philemon", numChapters: 1 },
    { name: "Hebrews", numChapters: 13 },
    { name: "James", numChapters: 5 },
    { name: "1 Peter", numChapters: 5 },
    { name: "2 Peter", numChapters: 3 },
    { name: "1 John", numChapters: 5 },
    { name: "2 John", numChapters: 1 },
    { name: "3 John", numChapters: 1 },
    { name: "Jude", numChapters: 1 },
    { name: "Revelation", numChapters: 22 }
];


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
    let book, chapter;

    try {
        // apiPath is in the format /api/BSB/Matthew/13.json
        const urlParts = apiPath.split('/');
        book = urlParts[3];
        chapter = urlParts[4].replace('.json', '');
    } catch (error) {
        console.log('Error parsing book and chapter from path:', error);
    }

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
