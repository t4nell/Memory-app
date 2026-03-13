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

    function updateNav() {
        const settings = getSettings();

        const themeInput = (document.getElementById('theme-group') as HTMLFormElement).querySelector<HTMLInputElement>('input:checked');
        const playerInput = (document.getElementById('player-group') as HTMLFormElement).querySelector<HTMLInputElement>('input:checked');
        const boardInput = (document.getElementById('boardsize-group') as HTMLFormElement).querySelector<HTMLInputElement>('input:checked');

        if (themeInput) {
            navTheme.textContent = themeInput.closest('label')?.textContent?.trim() || 'Theme';
            navTheme.classList.add('active');
        }
        if (playerInput) {
            navPlayer.textContent = playerInput.closest('label')?.textContent?.trim() || 'Player';
            navPlayer.classList.add('active');
        }
        if (boardInput) {
            navBoardsize.textContent = boardInput.closest('label')?.textContent?.trim() || 'Board size';
            navBoardsize.classList.add('active');
        }

        if (settings) {
            startBtn.disabled = false;
            startBtn.classList.add('active');
        } else {
            startBtn.disabled = true;
            startBtn.classList.remove('active');
        }
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
