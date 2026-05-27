import { GameSettings, Theme } from '../types/types';

const themePreviewMap: Record<Theme, string> = {
    code_vibes: '/assets/images/themes/theme_version/codeVibes.png',
    gaming: '/assets/images/themes/theme_version/gaming.png',
    da_projects: '/assets/images/themes/theme_version/DAProjects.png',
    foods: '/assets/images/themes/theme_version/food.png',
};

function getSettings(): GameSettings | null {
    const themeInput = (document.getElementById('theme-group') as HTMLFormElement).querySelector<HTMLInputElement>('input:checked');
    const playerInput = (document.getElementById('player-group') as HTMLFormElement).querySelector<HTMLInputElement>('input:checked');
    const boardInput = (document.getElementById('boardsize-group') as HTMLFormElement).querySelector<HTMLInputElement>('input:checked');

    if (!themeInput || !playerInput || !boardInput) return null;

    return {
        theme: themeInput.value as GameSettings['theme'],
        player: playerInput.value as GameSettings['player'],
        boardSize: Number(boardInput.value) as GameSettings['boardSize'],
    };
}

export function initSettingsScreen(onStart: (settings: GameSettings) => void): void {
    const navTheme = document.getElementById('nav-theme')!;
    const navPlayer = document.getElementById('nav-player')!;
    const navBoardsize = document.getElementById('nav-boardsize')!;
    const startBtn = document.getElementById('start-btn') as HTMLButtonElement;
    const previewImg = document.getElementById('theme-preview-img') as HTMLImageElement;

    function updateNavLabel(input: HTMLInputElement | null, navEl: HTMLElement, fallback: string) {
        if (input) {
            navEl.textContent = input.closest('label')?.textContent?.trim() || fallback;
            navEl.classList.add('active');
        }
    }

    function updateStartButton(settings: GameSettings | null) {
        startBtn.disabled = !settings;
        startBtn.classList.toggle('active', !!settings);
    }

    function updateNav() {
        const settings = getSettings();
        const themeInput = (document.getElementById('theme-group') as HTMLFormElement).querySelector<HTMLInputElement>('input:checked');
        const playerInput = (document.getElementById('player-group') as HTMLFormElement).querySelector<HTMLInputElement>('input:checked');
        const boardInput = (document.getElementById('boardsize-group') as HTMLFormElement).querySelector<HTMLInputElement>('input:checked');

        updateNavLabel(themeInput, navTheme, 'Theme');
        updateNavLabel(playerInput, navPlayer, 'Player');
        updateNavLabel(boardInput, navBoardsize, 'Board size');
        updateStartButton(settings);
    }

    document.getElementById('theme-group')!.addEventListener('change', (e) => {
        const radio = e.target as HTMLInputElement;
        if (radio.checked && themePreviewMap[radio.value as Theme]) {
            previewImg.src = themePreviewMap[radio.value as Theme];
        }
        updateNav();
    });

    document.getElementById('player-group')!.addEventListener('change', updateNav);
    document.getElementById('boardsize-group')!.addEventListener('change', updateNav);

    startBtn.addEventListener('click', () => {
        const settings = getSettings();
        if (settings) onStart(settings);
    });

    updateNav();
}
