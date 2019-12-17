export interface Word {
    userId: string;
    word: string;
    translation: string[],
    pronounciation?: string;
    context?: string[];
    remembered: boolean;
    addDate: Date;
    marked?: boolean;
    notes? : string;
}

export interface WordId extends Word {
    id: string;
}
