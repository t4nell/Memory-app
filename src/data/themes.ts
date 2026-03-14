import { Theme, ThemeData } from '../types/types';

function createThemeData(folder: string): ThemeData {
    const base = `/assets/images/themes/${folder}`;
    return {
        cardBack: `${base}/cardBack.png`,
        cards: Array.from({ length: 18 }, (_, i) => `${base}/card_${i + 1}.png`),
        exitButtonDefault: `${base}/exitButtonDefault.png`,
        exitButtonHover: `${base}/exitButtonHover.png`,
        currentPlayerIconBlue: `${base}/currentPlayerIconBlue.png`,
        currentPlayerIconOrange: `${base}/currentPlayerIconOrange.png`,
        scoreBlue: `${base}/gamePointCounterBlue.png`,
        scoreOrange: `${base}/gamePointCounterOrange.png`,
        matchStatus: `${base}/matchStatus.png`,
        popUpButtonBackDefault: `${base}/popUpButtonBackDefault.png`,
        popUpButtonBackHover: `${base}/popUpButtonBackHover.png`,
        popUpButtonExitDefault: `${base}/popUpButtonExitDefault.png`,
        popUpButtonExitHover: `${base}/popUpButtonExitHover.png`,
    };
}

export const themes: Record<Theme, ThemeData> = {
    code_vibes: createThemeData('code_vibes_theme'),
    gaming: createThemeData('game_theme'),
    da_projects: createThemeData('DA_projects_theme'),
    foods: createThemeData('food_theme'),
};