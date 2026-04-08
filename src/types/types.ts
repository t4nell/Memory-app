export type Theme = 'code_vibes' | 'gaming' | 'da_projects' | 'foods';
export type Player = 'blue' | 'orange';
export type BoardSize = 16 | 24 | 36;

export interface GameSettings {
    theme: Theme;
    player: Player;
    boardSize: BoardSize;
}

export interface ThemeData {
    cardBack: string;
    cards: string[];
    exitButtonDefault: string;
    exitButtonHover: string;
    currentPlayerIconBlue: string;
    currentPlayerIconOrange: string;
    scoreBlue: string;
    scoreOrange: string;
    matchStatus: string;
    popUpButtonBackDefault: string;
    popUpButtonBackHover: string;
    popUpButtonExitDefault: string;
    popUpButtonExitHover: string;
    backgroundColor: string;
    headerBackgroundColor: string;
    gameScoreBackgroundColor: string;
    currentPlayerColor: string;
    popupTextColor: string;
    fontFamily: string;
    gameOverTitleColor: string;
    gameOverBackgroundColor: string;
    winScreenBackgroundColor: string;
    winScreenTopImage: string;           // Konfetti-Bild (leerer String wenn keins)
    winScreenPlayerIconBlue: string;     // Gewinner-Icon für Blue
    winScreenPlayerIconOrange: string;   // Gewinner-Icon für Orange
    winScreenBackButton: string;         // Back/Home Button
    winScreenSubtitleColor?: string;     // Farbe für "The winner is"
    winScreenBlueNameColor?: string;     // Farbe für "Blue Player" Text
    winScreenOrangeNameColor?: string;   // Farbe für "Orange Player" Text
}