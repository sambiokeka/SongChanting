// Se fosse outra musica é so mudar esse aq e o lyricTimestamps
let playerState = {
    isPlaying: true, 
    currentTime: 0,
    duration: 143,
    currentLyricIndex: 0
};

// Poderia fazer isso em um arquivo separado? poderia mas deixa assim mesmo
const lyricTimestamps = [
    { time: 0, text: "Wait right here" },
    { time: 5, text: "I'll be back in the morning" },
    { time: 10, text: "I know that I'm not that important to you" },
    { time: 15, text: "But to me, girl, you're so much more than gorgeous" },
    { time: 20, text: "So much more than perfect" },
    { time: 25, text: "Right now, I know that I'm not really worth it" },
    { time: 30, text: "If you give me time, I can work on it" },
    { time: 35, text: "Give me some time while I work on it" },
    { time: 40, text: "Losing your patience, and, girl, I don't blame you" },
    { time: 45, text: "The Earth's in rotation, you're waiting for me" },
    { time: 50, text: "Look at my face when I f*** on your waist" },
    { time: 55, text: "'Cause we only have one conversation a week" },
    { time: 60, text: "That's why your friends always hating on me" },
    { time: 65, text: "F*** 'em though, I did this all by myself" },
    { time: 70, text: "Matter of fact, I ain't never ask no one for help" },
    { time: 75, text: "And that's why I don't pick up my phone when it ring" },
    { time: 80, text: "None of my exes is over Lil Peep" },
    { time: 85, text: "Nobody flexing as much as I be" },
    { time: 90, text: "That's why she text me and tell me she loves me" },
    { time: 95, text: "She knows that someday I'll be over the sea" },
    { time: 100, text: "Making my money and smoking my weed" },
    { time: 105, text: "I think it's funny, she open up to me" },
    { time: 110, text: "Get comfortable with me, once I got it coming" },
    { time: 115, text: "I love her, she loves me" },
    { time: 120, text: "I know that I'm nothing" },
    { time: 125, text: "Like someone her family want me to be" },
    { time: 130, text: "If I find a way, would you walk with me?" },
    { time: 135, text: "Look at my face while you talking to me" },
    { time: 140, text: "'Cause we only have one conversation a week" },
    { time: 145, text: "Can I get one conversation at least?" },
    { time: 150, text: "Shout out to everyone making my beats" },
    { time: 155, text: "You helping me preach" },
    { time: 160, text: "This music is the only thing keeping the peace" },
    { time: 165, text: "When I'm falling to pieces" },
    { time: 170, text: "Look at the sky tonight" },
    { time: 175, text: "All of the stars have a reason" },
    { time: 180, text: "A reason to shine, a reason like mine" },
    { time: 185, text: "And I'm falling to pieces" },
    { time: 190, text: "Look at the sky tonight" },
    { time: 195, text: "All of the stars have a reason" }
];


// Elementos q peguei dos htmls
const lyricsContainer = document.querySelector('.lyrics-container');
const lyricLines = document.querySelectorAll('.lyric-line');
const playPauseBtnDesktop = document.getElementById('play-pause-btn-desktop');
const playPauseBtnMobile = document.getElementById('play-pause-btn-mobile');
const playIconDesktop = document.getElementById('play-icon-desktop');
const pauseIconDesktop = document.getElementById('pause-icon-desktop');
const playIconMobile = document.getElementById('play-icon-mobile');
const pauseIconMobile = document.getElementById('pause-icon-mobile');
const musicBars = document.querySelector('.music-bars');
const progressBar = document.getElementById('progress-bar-fill');
const currentTimeDisplay = document.getElementById('current-time');
const totalDurationDisplay = document.getElementById('total-duration'); 

// Função pra aumentar o tempo da musica
function initPlayer() {
    setInterval(() => {
        if (playerState.isPlaying && playerState.currentTime < playerState.duration) {
            playerState.currentTime += 0.5;
            updateProgressBar();
            updateCurrentLyric();
        }
    }, 500);
}


// Event listener
function setupEventListeners() {
    if (playPauseBtnDesktop) playPauseBtnDesktop.addEventListener('click', togglePlayPause);
    if (playPauseBtnMobile) playPauseBtnMobile.addEventListener('click', togglePlayPause);

    lyricLines.forEach((line, index) => {
        line.addEventListener('click', () => seekToLyric(index));
    });
}

// muda o botão de pause pra play e vice versa
function updatePlayPauseIcons() {
    if (playerState.isPlaying) {
        playIconDesktop?.classList.add('hidden');
        pauseIconDesktop?.classList.remove('hidden');
        playIconMobile?.classList.add('hidden');
        pauseIconMobile?.classList.remove('hidden');
        musicBars?.classList.remove('paused');
    } else {
        pauseIconDesktop?.classList.add('hidden');
        playIconDesktop?.classList.remove('hidden');
        pauseIconMobile?.classList.add('hidden');
        playIconMobile?.classList.remove('hidden');
        musicBars?.classList.add('paused');
    }
}

// se tiver pausado ele fala q ta pausado, se n ta tocando
function togglePlayPause() {
    playerState.isPlaying = !playerState.isPlaying;
    updatePlayPauseIcons();
}

// O progresso da barra aumenta conforme o tempo passa, se tiver pausado ela para tbm
function updateProgressBar() {
    const progress = (playerState.currentTime / playerState.duration) * 100;
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    if (currentTimeDisplay) {
        currentTimeDisplay.textContent = formatTime(playerState.currentTime);
    }
}

// Transforma os minutos em segundos
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Atualiza a parte da musica em destaque baseado no tempo da musica
function updateCurrentLyric() {
    let newIndex = 0;
    for (let i = lyricTimestamps.length - 1; i >= 0; i--) {
        if (playerState.currentTime >= lyricTimestamps[i].time) {
            newIndex = i;
            break;
        }
    }
    if (newIndex !== playerState.currentLyricIndex) {
        playerState.currentLyricIndex = newIndex;
        updateLyricsDisplay();

       // ta dando problema no mobile então desativei
        if (window.innerWidth > 768) {
            scrollToActiveLyric();
        }
    }
}


// atualiza qual parte ta em destaque no css
function updateLyricsDisplay() {
    lyricLines.forEach(line => line.classList.remove('active'));
    if (lyricLines[playerState.currentLyricIndex]) {
        lyricLines[playerState.currentLyricIndex].classList.add('active');
    }
}


// Da scroll até a parte em destaque
function scrollToActiveLyric() {
    const activeLine = lyricLines[playerState.currentLyricIndex];
    if (!activeLine || !lyricsContainer) return;

    activeLine.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}


// Chama as funções de atualizar a barra de progresso a barra de lirycs e o scroll para as lirycs, mantendo tudo sincronizado
function seekToLyric(index) {
    if (!lyricTimestamps[index]) return;
    playerState.currentTime = lyricTimestamps[index].time;
    playerState.currentLyricIndex = index;
    updateProgressBar();
    updateLyricsDisplay();
    scrollToActiveLyric();
}


// Como eu to injetando o html do header e do sidebar eles acabam querendo ocupar o msm lugar, ai eu coloquei no css 40px de padding top para evitar isso, aq eu to fazendo com q o scroll automatico leve isso em consideração
function adjustLyricsPadding() {
    if (!lyricsContainer) return;
    const containerHeight = lyricsContainer.clientHeight;
    const padding = Math.max(containerHeight * 0.2, 40);
    lyricsContainer.style.paddingTop = `${padding}px`;
    lyricsContainer.style.paddingBottom = `${padding}px`;
}

window.addEventListener('resize', adjustLyricsPadding);
adjustLyricsPadding();

initPlayer();
setupEventListeners();
updateLyricsDisplay();
updatePlayPauseIcons();
