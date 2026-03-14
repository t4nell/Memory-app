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

    // Exit-Button Click: Popup anzeigen
    const quitPopup = document.getElementById('quit-popup');
    const overlay = document.getElementById('popup-overlay');
    exitBtn.onclick = () => {
        if (quitPopup) {
            quitPopup.classList.remove('theme-code_vibes', 'theme-gaming', 'theme-da_projects', 'theme-foods');
            quitPopup.classList.add(`theme-${settings.theme}`);
            quitPopup.classList.add('show');
        }
        if (overlay) overlay.classList.add('show');
    };

    // Popup schließen beim Klick außerhalb
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (quitPopup) quitPopup.classList.remove('show');
            overlay.classList.remove('show');
        });
    }

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
    const template = document.getElementById('card-template') as HTMLTemplateElement;
    allCards.forEach((cardImg, index) => {
        const card = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
        card.id = `card-${index}`;
        card.dataset.cardIndex = String(index);
        card.dataset.cardImg = cardImg;

        const front = card.querySelector('.card-back') as HTMLImageElement;
        if (front) {
            front.src = themeData.cardBack;
            front.alt = 'card back';
        }

        const back = card.querySelector('.card-front') as HTMLImageElement;
        if (back) {
            back.src = cardImg;
            back.alt = 'card front';
        }

        board.appendChild(card);
    });

    // Karten-Klick: Karte umdrehen
    board.addEventListener('click', (e) => {
        const card = (e.target as HTMLElement).closest('.card');
        if (card) {
            card.classList.toggle('is-flipped');
        }
    });

    const popupBackBtn = document.getElementById('popup-back-btn') as HTMLImageElement;
    const popupExitBtn = document.getElementById('popup-exit-btn') as HTMLImageElement;

    if (popupBackBtn) {
        popupBackBtn.src = themeData.popUpButtonBackDefault;
        popupBackBtn.onmouseenter = () => popupBackBtn.src = themeData.popUpButtonBackHover;
        popupBackBtn.onmouseleave = () => popupBackBtn.src = themeData.popUpButtonBackDefault;
    }
    if (popupExitBtn) {
        popupExitBtn.src = themeData.popUpButtonExitDefault;
        popupExitBtn.onmouseenter = () => popupExitBtn.src = themeData.popUpButtonExitHover;
        popupExitBtn.onmouseleave = () => popupExitBtn.src = themeData.popUpButtonExitDefault;
    }
}

