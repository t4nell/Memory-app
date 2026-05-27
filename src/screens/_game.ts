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
    const gameHeader = gameScreen.querySelector('.game-header') as HTMLElement;
    const gameScore = gameScreen.querySelector('.game-score') as HTMLElement;
    const currentPlayerElem = gameScreen.querySelector('.game-current-player') as HTMLElement;
    const quitPopup = document.getElementById('quit-popup');
    const overlay = document.getElementById('popup-overlay');

    gameScreen.style.backgroundColor = themeData.backgroundColor;

    gameScreen.style.fontFamily = themeData.fontFamily;

    
    if (gameHeader) {
        gameHeader.style.backgroundColor = themeData.headerBackgroundColor;
    };

    
    if (gameScore) {
        gameScore.style.backgroundColor = themeData.gameScoreBackgroundColor;
    };
    
    
    if (currentPlayerElem) {
        currentPlayerElem.style.color = themeData.currentPlayerColor;
    };

    if (quitPopup) {
        quitPopup.style.color = themeData.popupTextColor;
        quitPopup.style.fontFamily = themeData.fontFamily;
    };

    scoreBlueIcon.src = themeData.scoreBlue;
    scoreOrangeIcon.src = themeData.scoreOrange;

    playerIcon.src = settings.player === 'blue'
        ? themeData.currentPlayerIconBlue
        : themeData.currentPlayerIconOrange;

    exitBtnImg.src = themeData.exitButtonDefault;
    exitBtn.onmouseenter = () => exitBtnImg.src = themeData.exitButtonHover;
    exitBtn.onmouseleave = () => exitBtnImg.src = themeData.exitButtonDefault;

    
    exitBtn.onclick = () => {
        if (quitPopup) {
            quitPopup.classList.remove('theme-code_vibes', 'theme-gaming', 'theme-da_projects', 'theme-foods');
            quitPopup.classList.add(`theme-${settings.theme}`);
            quitPopup.classList.add('show');
        }
        if (overlay) overlay.classList.add('show');
    };

    if (overlay) {
        overlay.addEventListener('click', () => {
            if (quitPopup) quitPopup.classList.remove('show');
            overlay.classList.remove('show');
        });
    };

    const cols = settings.boardSize === 16 ? 4 : 6;
    board.style.gridTemplateColumns = `repeat(${cols}, 120px)`;

    const cardCount = settings.boardSize / 2;
    const selectedCards = themeData.cards.slice(0, cardCount);
    const allCards = [...selectedCards, ...selectedCards];

    for (let i = allCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
    };

    board.replaceWith(board.cloneNode(true));
    const newBoard = document.getElementById('game-board')!;
    newBoard.innerHTML = '';
    const template = document.getElementById('card-template') as HTMLTemplateElement;

    function setCardImage(card: HTMLElement, selector: string, src: string, alt: string) {
        const img = card.querySelector(selector) as HTMLImageElement;
        if (img) {
            img.src = src;
            img.alt = alt;
        }
    };

    function appendCard(cardImg: string, index: number) {
        const card = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
        card.id = `card-${index}`;
        card.dataset.cardIndex = String(index);
        card.dataset.cardImg = cardImg;
        setCardImage(card, '.card-back', themeData.cardBack, 'card back');
        setCardImage(card, '.card-front', cardImg, 'card front');
        newBoard.appendChild(card);
    };

    allCards.forEach((cardImg, index) => appendCard(cardImg, index));

    function handleCardMatch(card1: HTMLElement, card2: HTMLElement) {
        addPoint(currentPlayer);
        flippedCards = [];
        checkGameOver();
    };

    function handleCardMismatch(card1: HTMLElement, card2: HTMLElement) {
        setTimeout(() => {
            card1.classList.remove('is-flipped');
            card2.classList.remove('is-flipped');
            flippedCards = [];
            currentPlayer = currentPlayer === 'blue' ? 'orange' : 'blue';
            playerIcon.src = currentPlayer === 'blue'
                ? themeData.currentPlayerIconBlue
                : themeData.currentPlayerIconOrange;
        }, 500);
    };

    function handleCardFlip(card: HTMLElement) {
        card.classList.add('is-flipped');
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;
            if (card1.dataset.cardImg === card2.dataset.cardImg) handleCardMatch(card1, card2);
            else handleCardMismatch(card1, card2);
        }
    };

    newBoard.addEventListener('click', (e) => {
        const card = (e.target as HTMLElement).closest('.card') as HTMLElement | null;
        if (!card) return;
        if (card.classList.contains('is-flipped') || flippedCards.includes(card)) return;
        handleCardFlip(card);
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
            onExit();
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
        const allCards = newBoard.querySelectorAll('.card');
        const allFlipped = Array.from(allCards).every(card => card.classList.contains('is-flipped'));
        if (allFlipped) {
            setTimeout(() => {
                showGameOver(scoreBlue, scoreOrange, themeData);
            }, 2000);
        }
    };

    function applyGameOverStyles(themeData: ThemeData) {
        const gameoverScreen = document.getElementById('gameover-screen') as HTMLElement;
        if (gameoverScreen) {
            gameoverScreen.style.backgroundColor = themeData.gameOverBackgroundColor;
            gameoverScreen.style.fontFamily = themeData.fontFamily;
        }
        const scoreBox = document.getElementById('gameover-score-box') as HTMLElement;
        if (scoreBox) scoreBox.style.backgroundColor = themeData.gameScoreBackgroundColor;
        const title = document.getElementById('gameover-title') as HTMLElement;
        if (title) title.style.color = themeData.gameOverTitleColor;
    };

    function applyWinScreenStyles(winScreen: HTMLElement, themeData: ThemeData) {
        winScreen.style.fontFamily = themeData.fontFamily;
        winScreen.style.backgroundColor = themeData.winScreenBackgroundColor;
        const subtitle = winScreen.querySelector('.win-subtitle') as HTMLElement;
        if (subtitle && themeData.winScreenSubtitleColor) subtitle.style.color = themeData.winScreenSubtitleColor;
        const topImg = document.getElementById('win-top-image') as HTMLImageElement;
        if (themeData.winScreenTopImage) { topImg.src = themeData.winScreenTopImage; topImg.style.display = 'block'; }
        else topImg.style.display = 'none';
    };

    function setWinScreenPlayer(winScreen: HTMLElement, winner: 'blue' | 'orange', themeData: ThemeData) {
        const nameElem = document.getElementById('win-player-name') as HTMLElement;
        if (nameElem) {
            nameElem.textContent = winner === 'blue' ? 'Blue Player' : 'Orange Player';
            nameElem.style.color = (winner === 'blue' ? themeData.winScreenBlueNameColor : themeData.winScreenOrangeNameColor) ?? '#000000';
        }
        const iconElem = document.getElementById('win-player-icon') as HTMLImageElement;
        if (iconElem) iconElem.src = winner === 'blue' ? themeData.winScreenPlayerIconBlue : themeData.winScreenPlayerIconOrange;
        const backBtnImg = document.getElementById('win-back-btn-img') as HTMLImageElement;
        if (backBtnImg) backBtnImg.src = themeData.winScreenBackButton;
    };

    function showWinScreen(scoreBlue: number, scoreOrange: number, themeData: ThemeData) {
        const gameoverScreen = document.getElementById('gameover-screen');
        const winScreen = document.getElementById('win-screen');
        if (gameoverScreen) gameoverScreen.classList.remove('active');
        if (!winScreen) return;
        const winner: 'blue' | 'orange' = scoreBlue >= scoreOrange ? 'blue' : 'orange';
        winScreen.classList.add('active');
        winScreen.classList.remove('slide-in');
        setTimeout(() => winScreen.classList.add('slide-in'), 10);
        applyWinScreenStyles(winScreen, themeData);
        setWinScreenPlayer(winScreen, winner, themeData);
        const backBtn = document.getElementById('win-back-btn') as HTMLButtonElement;
        if (backBtn) backBtn.onclick = () => { winScreen.classList.remove('active', 'slide-in'); onExit(); };
    };

    function showGameOver(scoreBlue: number, scoreOrange: number, themeData: ThemeData) {
        (document.getElementById('gameover-score-blue') as HTMLElement).textContent = scoreBlue.toString();
        (document.getElementById('gameover-score-orange') as HTMLElement).textContent = scoreOrange.toString();
        (document.getElementById('gameover-score-blue-icon') as HTMLImageElement).src = themeData.scoreBlue;
        (document.getElementById('gameover-score-orange-icon') as HTMLImageElement).src = themeData.scoreOrange;
        applyGameOverStyles(themeData);
        (document.getElementById('game-screen') as HTMLElement).classList.remove('active');
        (document.getElementById('gameover-screen') as HTMLElement).classList.add('active');
        setTimeout(() => showWinScreen(scoreBlue, scoreOrange, themeData), 3000);
    };
};