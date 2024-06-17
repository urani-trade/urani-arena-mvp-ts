
export interface Player {
    id: string;
    avatar?: string;
    name: string;
    batches: number;
    volume: number;
    surplus: number;
    profit: number;
    cost: number;
}

export interface TopPlayer { type: string, player: {name: string, avatar?: string, value: number, id:string} };

export type LeaderBoardColumns = 'batches' | 'volume' | 'surplus' | 'profit' | 'cost';
