export interface Word {
    userId: string;
    word: string;
    translations: string[],
    pronounciation?: string;
    contexts?: string[];
    remembered: boolean;
    addDate: Date;
    marked?: boolean;
    notes? : string;
}

export interface WordId extends Word {
    id: string;
}
