export function initHomeScreen(showScreen: (id: string) => void): void {
    document.querySelector('.play-btn')?.addEventListener('click', () => {
        showScreen('settings-screen');
    });
}

