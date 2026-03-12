import './styles/styles.scss'

function showScreen(screenId: string) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId)?.classList.add('active');
}


showScreen('home-screen');