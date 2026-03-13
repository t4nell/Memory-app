import './styles/styles.scss'
import { initHomeScreen } from './screens/_home'
import { initSettingsScreen } from './screens/_settings'
import { GameSettings } from './types/types'

function showScreen(screenId: string) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId)?.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    showScreen('home-screen');
    initHomeScreen(showScreen);

    initSettingsScreen((settings: GameSettings) => {
        console.log('Game startet mit:', settings);
        showScreen('game-screen');
    });
});