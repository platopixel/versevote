export interface Chapter {
    translation: Translation
    book: Book
    chapter: BookChapter
    thisChapterLink: string
    thisChapterAudioLinks: ThisChapterAudioLinks
    nextChapterApiLink: string
    nextChapterAudioLinks: NextChapterAudioLinks
    previousChapterApiLink: string
    previousChapterAudioLinks: string
    numberOfVerses: number
}

export interface Translation {
    id: string
    name: string
    website: string
    licenseUrl: string
    shortName: string
    englishName: string
    language: string
    textDirection: string
    sha256: string
    availableFormats: string[]
    listOfBooksApiLink: string
    numberOfBooks: number
    totalNumberOfChapters: number
    totalNumberOfVerses: number
    languageName: string
    languageEnglishName: string
}

export interface Book {
    id: string
    translationId: string
    name: string
    commonName: string
    title: string
    order: number
    numberOfChapters: number
    sha256: string
    firstChapterApiLink: string
    lastChapterApiLink: string
    totalNumberOfVerses: number
}

export interface BookChapter {
    number: number
    content: Content[]
    footnotes: Footnote[]
}

export interface Content {
    type: string
    content?: string[] | { text: string, poem?: number }[]
    number?: number
}

export interface Footnote {
    noteId: number
    caller: string
    text: string
    reference: Reference
}

export interface Reference {
    chapter: number
    verse: number
}

export interface ThisChapterAudioLinks {
    gilbert: string
    hays: string
    souer: string
}

export interface NextChapterAudioLinks {
    gilbert: string
    hays: string
    souer: string
}

export interface Verse {
    number: number;
    text: string[];
}