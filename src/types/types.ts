export type Theme = 'code_vibes' | 'gaming' | 'da_projects' | 'foods';
export type Player = 'blue' | 'orange';
export type BoardSize = 16 | 24 | 36;

export interface GameSettings {
    theme: Theme;
    player: Player;
    boardSize: BoardSize;
}