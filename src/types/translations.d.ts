export interface TranslationsResponse {
    translations: Translation[];
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
