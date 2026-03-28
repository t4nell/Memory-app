import { Theme, ThemeData } from '../types/types';


function createThemeData(folder: string, backgroundColor: string, headerBackgroundColor: string, gameScoreBackgroundColor: string, currentPlayerColor: string, popupTextColor: string, fontFamily: string, gameOverTitleColor: string, gameOverBackgroundColor: string, winScreenBackgroundColor: string): ThemeData {
    const base = `/assets/images/themes/${folder}`;
    return {
        cardBack: `${base}/cardBack.png`,
        cards: Array.from({ length: 18 }, (_, i) => `${base}/card_${i + 1}.png`),
        exitButtonDefault: `${base}/exitButtonDefault.png`,
        exitButtonHover: `${base}/exitButtonHover.png`,
        currentPlayerIconBlue: `${base}/currentPlayerIconBlue.png`,
        currentPlayerIconOrange: `${base}/currentPlayerIconOrange.png`,
        scoreBlue: `${base}/gamePointCounterBlue.png`,
        scoreOrange: `${base}/gamePointCounterOrange.png` ,
        matchStatus: `${base}/matchStatus.png`,
        popUpButtonBackDefault: `${base}/popUpButtonBackDefault.png`,
        popUpButtonBackHover: `${base}/popUpButtonBackHover.png`,
        popUpButtonExitDefault: `${base}/popUpButtonExitDefault.png`,
        popUpButtonExitHover: `${base}/popUpButtonExitHover.png`,
        backgroundColor,
        headerBackgroundColor,
        gameScoreBackgroundColor,
        currentPlayerColor,
        popupTextColor,
        fontFamily,
        gameOverTitleColor,
        gameOverBackgroundColor,
        winScreenBackgroundColor,
    };
}
export const themes: Record<Theme, ThemeData> = {
    code_vibes: createThemeData('code_vibes_theme', '#303131', '#303131', '#86E9D633', '#ffffff', '#303131', 'Red Rose, Arial, sans-serif', '#2ee9e9', '#303131', '#303131'),
    gaming: createThemeData('game_theme', '#294f60', 'rgba(253, 150, 201, 0.2)', '#ffffff', '#ffffff', '#294f60', 'Orbitron, Arial, sans-serif', '#ed1b76', '#294f60', '#294f60'),
    da_projects: createThemeData('DA_projects_theme', '#ffffff', '#f0f3f4', '#ffffff', '#1E7594', '#294f60', 'Figtree, Arial, sans-serif', '#fd5b4f', '#1e5974', '#1e5974'),
    foods: createThemeData('food_theme', '#ffffff', '#f0e5d9', '#ffffff', '#a45212', '#a45212', 'Klee One, Arial, sans-serif', '#ffffff', '#f3832d', '#ffffff'),
};