

export interface ISale{
    owner: string;
    type?: number;
    lat: number;
    lng: number;
    distance: number;
    date?: Date;
    startDate?: string,
    time?: {start: Date, time: Date };
    icon?: string;
    title?: string;
    description?: string;
    images?: string[];
    timeDiffFromUTC ?: number;
}