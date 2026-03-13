import { GameSettings } from '../types/types';
import { themes } from '../data/themes';

export function initGameScreen(settings: GameSettings, onExit: () => void): void {
    const themeData = themes[settings.theme];

    const board = document.getElementById('game-board')!;
    const scoreBlueIcon = document.getElementById('score-blue-icon') as HTMLImageElement;
    const scoreOrangeIcon = document.getElementById('score-orange-icon') as HTMLImageElement;
    const playerIcon = document.getElementById('current-player-icon') as HTMLImageElement;
    const exitBtn = document.getElementById('exit-btn') as HTMLButtonElement;
    const exitBtnImg = document.getElementById('exit-btn-img') as HTMLImageElement;

    const gameScreen = document.getElementById('game-screen')!;
    // Alte Theme-Klassen entfernen
    gameScreen.classList.remove('theme-code_vibes', 'theme-gaming', 'theme-da_projects', 'theme-foods');
    // Neue Theme-Klasse setzen
    gameScreen.classList.add(`theme-${settings.theme}`);

    // Score-Bilder setzen
    scoreBlueIcon.src = themeData.scoreBlue;
    scoreOrangeIcon.src = themeData.scoreOrange;
    // Aktuellen Spieler-Icon setzen
    playerIcon.src = settings.player === 'blue'
        ? themeData.currentPlayerIconBlue
        : themeData.currentPlayerIconOrange;

    // Exit-Button Bild setzen
    exitBtnImg.src = themeData.exitButtonDefault;
    exitBtn.onmouseenter = () => exitBtnImg.src = themeData.exitButtonHover;
    exitBtn.onmouseleave = () => exitBtnImg.src = themeData.exitButtonDefault;

    // Exit-Button Klick
    exitBtn.onclick = onExit;

    // Board Grid setzen je nach Board-Size
    const cols = settings.boardSize === 16 ? 4 : 6;
    board.style.gridTemplateColumns = `repeat(${cols}, 120px)`;

    // Karten erstellen
    const cardCount = settings.boardSize / 2;
    const selectedCards = themeData.cards.slice(0, cardCount);
    const allCards = [...selectedCards, ...selectedCards];

    // Karten mischen
    for (let i = allCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
    }

    // Board leeren und Karten einfügen
    board.innerHTML = '';
    allCards.forEach((cardImg, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.cardIndex = String(index);
        card.dataset.cardImg = cardImg;

        const img = document.createElement('img');
        img.src = themeData.cardBack;
        img.alt = 'card';
        card.appendChild(img);

        board.appendChild(card);
    });
}
