// Variáveis para controle do estado da música
let isPlaying = true;
let autoScrollEnabled = true;
let userInteracted = false;
let scrollTimeout = null;
let lyricsInterval = null;

// Elementos DOM
const lyricsContainer = document.querySelector('.lyrics-container');
const playPauseBtnDesktop = document.getElementById('play-pause-btn-desktop');
const playPauseBtnMobile = document.getElementById('play-pause-btn-mobile');
const playIconDesktop = document.getElementById('play-icon-desktop');
const pauseIconDesktop = document.getElementById('pause-icon-desktop');
const playIconMobile = document.getElementById('play-icon-mobile');
const pauseIconMobile = document.getElementById('pause-icon-mobile');
const musicBars = document.querySelector('.music-bars');
const playingText = document.querySelector('.music-bars + span');
const lyricLines = document.querySelectorAll('.lyric-line');

// Configurar scroll suave
lyricsContainer.style.scrollBehavior = 'smooth';

// Função para fazer scroll até a linha ativa
function scrollToActiveLine() {
    if (!autoScrollEnabled || !isPlaying) return;
    
    const activeLine = document.querySelector('.lyric-line.active');
    if (activeLine) {
        activeLine.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

// Função para avançar a letra
function advanceLyrics() {
    if (!isPlaying) return;
    
    const activeLine = document.querySelector('.lyric-line.active');
    if (activeLine) {
        activeLine.classList.remove('active');
        
        if (activeLine.nextElementSibling) {
            activeLine.nextElementSibling.classList.add('active');
            scrollToActiveLine();
        } else {
            document.querySelector('.lyric-line:first-child').classList.add('active');
            scrollToActiveLine();
        }
    }
}

// Função para atualizar ícones de play/pause
function updatePlayPauseIcons() {
    if (isPlaying) {
        // Tocar - esconder play, mostrar pause
        playIconDesktop.classList.add('hidden');
        pauseIconDesktop.classList.remove('hidden');
        playIconMobile.classList.add('hidden');
        pauseIconMobile.classList.remove('hidden');
        musicBars.parentElement.classList.remove('paused');
        playingText.textContent = 'Tocando...';
    } else {
        // Pausar - esconder pause, mostrar play
        playIconDesktop.classList.remove('hidden');
        pauseIconDesktop.classList.add('hidden');
        playIconMobile.classList.remove('hidden');
        pauseIconMobile.classList.add('hidden');
        musicBars.parentElement.classList.add('paused');
        playingText.textContent = 'Pausado';
    }
}

// Função para tocar/pausar
function togglePlayPause() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        // Tocar
        updatePlayPauseIcons();
        
        // Reiniciar o avanço automático das letras
        lyricsInterval = setInterval(advanceLyrics, 3000);
        autoScrollEnabled = true;
    } else {
        // Pausar
        updatePlayPauseIcons();
        
        // Parar o avanço automático das letras
        clearInterval(lyricsInterval);
        autoScrollEnabled = false;
    }
}

// Event listeners para os botões
playPauseBtnDesktop.addEventListener('click', togglePlayPause);
playPauseBtnMobile.addEventListener('click', togglePlayPause);

// Iniciar o avanço automático das letras
lyricsInterval = setInterval(advanceLyrics, 3000);

// Inicializar ícones corretamente
updatePlayPauseIcons();