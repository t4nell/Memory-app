import { GameSettings, ThemeData } from '../types/types';
import { themes } from '../data/themes';

export function initGameScreen(settings: GameSettings, onExit: () => void): void {
    const themeData = themes[settings.theme];
    let flippedCards: HTMLElement[] = [];

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
    board.replaceWith(board.cloneNode(true)); // entfernt alle alten Event-Handler
    const newBoard = document.getElementById('game-board')!;
    newBoard.innerHTML = '';
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

        newBoard.appendChild(card);
    });

    // Karten-Klick: Karte umdrehen
    newBoard.addEventListener('click', (e) => {
        const card = (e.target as HTMLElement).closest('.card') as HTMLElement | null;
        if (!card) return;
        if (card.classList.contains('is-flipped') || flippedCards.includes(card)) return;

        card.classList.add('is-flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;
            if (card1.dataset.cardImg === card2.dataset.cardImg) {
                // Paar gefunden
                addPoint(currentPlayer);
                flippedCards = [];
                // Spieler bleibt dran
                checkGameOver();
            } else {
                // Kein Paar: nach kurzer Zeit zurückdrehen und Spieler wechseln
                setTimeout(() => {
                    card1.classList.remove('is-flipped');
                    card2.classList.remove('is-flipped');
                    flippedCards = [];
                    // Spieler wechseln
                    currentPlayer = currentPlayer === 'blue' ? 'orange' : 'blue';
                    playerIcon.src = currentPlayer === 'blue'
                        ? themeData.currentPlayerIconBlue
                        : themeData.currentPlayerIconOrange;
                }, 500); // 0.5 Sekunden warten
            }
        }
    });

    const popupBackBtn = document.getElementById('popup-back-btn') as HTMLImageElement;
    const popupExitBtn = document.getElementById('popup-exit-btn') as HTMLImageElement;

    if (popupBackBtn) {
        popupBackBtn.src = themeData.popUpButtonBackDefault;
        popupBackBtn.onmouseenter = () => popupBackBtn.src = themeData.popUpButtonBackHover;
        popupBackBtn.onmouseleave = () => popupBackBtn.src = themeData.popUpButtonBackDefault;
        popupBackBtn.onclick = () => {
            if (quitPopup) quitPopup.classList.remove('show');
            if (overlay) overlay.classList.remove('show');
        };
    };
    if (popupExitBtn) {
        popupExitBtn.src = themeData.popUpButtonExitDefault;
        popupExitBtn.onmouseenter = () => popupExitBtn.src = themeData.popUpButtonExitHover;
        popupExitBtn.onmouseleave = () => popupExitBtn.src = themeData.popUpButtonExitDefault;
        popupExitBtn.onclick = () => {
            if (quitPopup) quitPopup.classList.remove('show');
            if (overlay) overlay.classList.remove('show');
            onExit(); // Wechselt zur Settings-Seite
        };
    };

    let scoreBlue = 0;
    let scoreOrange = 0;
    updateScoreDisplay();
    let currentPlayer: 'blue' | 'orange' = settings.player;


    function updateScoreDisplay() {
        const blueElem = document.getElementById('score-blue');
        const orangeElem = document.getElementById('score-orange');
        if (blueElem) blueElem.textContent = scoreBlue.toString();
        if (orangeElem) orangeElem.textContent = scoreOrange.toString();
    };

    function addPoint(player: 'blue' | 'orange') {
        if (player === 'blue') scoreBlue++;
        else scoreOrange++;
        updateScoreDisplay();
    };

    function checkGameOver() {
        // Prüfe, ob alle Karten das Attribut 'is-flipped' haben
        const allCards = newBoard.querySelectorAll('.card');
        const allFlipped = Array.from(allCards).every(card => card.classList.contains('is-flipped'));
        if (allFlipped) {
            setTimeout(() => {
                showGameOver(scoreBlue, scoreOrange, themeData);
            }, 2000);
        }
    };

    function showGameOver(scoreBlue: number, scoreOrange: number, themeData: ThemeData) {
        // Punkte setzen
        (document.getElementById('gameover-score-blue') as HTMLElement).textContent = scoreBlue.toString();
        (document.getElementById('gameover-score-orange') as HTMLElement).textContent = scoreOrange.toString();

        // Icons anpassen
        (document.getElementById('gameover-score-blue-icon') as HTMLImageElement).src = themeData.scoreBlue;
        (document.getElementById('gameover-score-orange-icon') as HTMLImageElement).src = themeData.scoreOrange;

        // Nur Game-Over-Screen anzeigen
        (document.getElementById('game-screen') as HTMLElement).classList.remove('active');
        (document.getElementById('gameover-screen') as HTMLElement).classList.add('active');
    };
}