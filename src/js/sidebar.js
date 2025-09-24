(function setupLyrics() {

    // --- ELEMENTOS DO DOM ---
    const audioPlayer = document.getElementById('musica-principal');
    const lyricsContainer = document.querySelector('.lyrics-container');
    const lyricLines = document.querySelectorAll('.lyric-line');

    if (!audioPlayer || !lyricsContainer || lyricLines.length === 0) {
        console.warn("Elementos necessários para a sincronização da letra não foram encontrados.");
        return;
    }

    // --- LETRAS DA MÚSICA (com marcação de tempo em segundos) ---
    const lyricTimestamps = [
        { time: 0, text: "( Musica )" },
        { time: 21, text: "Wait right here" },
        { time: 22.5, text: "I'll be back in the morning" },
        { time: 26, text: "I know that I'm not that important to you" },
        { time: 28, text: "But to me, girl, you're so much more than gorgeous" },
        { time: 32, text: "So much more than perfect" },
        { time: 34.5, text: "Right now, I know that I'm not really worth it" },
        { time: 37, text: "If you give me time, I can work on it" },
        { time: 40, text: "Give me some time while I work on it" },
        { time: 42, text: "Losing your patience, and, girl, I don't blame you" },
        { time: 44, text: "The Earth's in rotation, you're waiting for me" },
        { time: 47, text: "Look at my face when I f*** on your waist" },
        { time: 49, text: "'Cause we only have one conversation a week" },
        { time: 52, text: "That's why your friends always hating on me" },
        { time: 54, text: "F*** 'em though, I did this all by myself" },
        { time: 57, text: "Matter of fact, I ain't never ask no one for help" },
        { time: 59, text: "And that's why I don't pick up my phone when it ring" },
        { time: 62, text: "None of my exes is over Lil Peep" },
        { time: 65, text: "Nobody flexing as much as I be" },
        { time: 68, text: "That's why she text me and tell me she loves me" },
        { time: 70, text: "She knows that someday I'll be over the sea" },
        { time: 73, text: "Making my money and smoking my weed" },
        { time: 75, text: "I think it's funny, she open up to me" },
        { time: 77, text: "Get comfortable with me, once I got it coming" },
        { time: 80, text: "I love her, she loves me" },
        { time: 81.5, text: "I know that I'm nothing" },
        { time: 83, text: "Like someone her family want me to be" },
        { time: 85, text: "If I find a way, would you walk with me?" },
        { time: 88, text: "Look at my face while you talking to me" },
        { time: 90, text: "'Cause we only have one conversation a week" },
        { time: 93.8, text: "Can I get one conversation at least?" },
        { time: 96, text: "Shout out to everyone making my beats" },
        { time: 98, text: "You helping me preach" },
        { time: 99, text: "This music is the only thing keeping the peace" },
        { time: 103, text: "When I'm falling to pieces" },
        { time: 105, text: "Look at the sky tonight" },
        { time: 107, text: "All of the stars have a reason" },
        { time: 110, text: "A reason to shine, a reason like mine" },
        { time: 112, text: "And I'm falling to pieces" },
        { time: 115, text: "Look at the sky tonight" },
        { time: 118, text: "All of the stars have a reason" },
        { time: 119.5, text: "( Musica )" },
    ];

    let currentLyricIndex = -1;

    // --- ATUALIZA A LETRA ATUAL COM BASE NO TEMPO DO ÁUDIO ---
    function updateCurrentLyric() {
        let newIndex = -1;
        for (let i = lyricTimestamps.length - 1; i >= 0; i--) {
            if (audioPlayer.currentTime >= lyricTimestamps[i].time) {
                newIndex = i;
                break;
            }
        }
        if (newIndex !== currentLyricIndex) {
            currentLyricIndex = newIndex;
            updateLyricsDisplay();
        }
    }

    // --- DESTACA A LETRA ATUAL E CENTRALIZA NO CONTAINER ---
    function updateLyricsDisplay() {
        lyricLines.forEach((line, index) => {
            if (index === currentLyricIndex) {
                line.classList.add('active');

                // Garante que o scroll é feito apenas no container de letras
                const activeLine = lyricLines[currentLyricIndex];
                if (activeLine) {
                    const windowScrollY = window.scrollY;

                    activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Evita mexer no scroll da página inteira
                    window.scrollTo(0, windowScrollY);
                }
            } else {
                line.classList.remove('active');
            }
        });
    }

    // --- PERMITE PULAR PARA UM TRECHO DA MÚSICA AO CLICAR NA LETRA ---
    function seekToLyric(index) {
        if (lyricTimestamps[index]) {
            audioPlayer.currentTime = lyricTimestamps[index].time;
        }
    }
    
    // --- AJUSTA O PADDING PARA MANTER A LETRA ATIVA NO CENTRO ---
    function adjustLyricsPadding() {
        const containerHeight = lyricsContainer.clientHeight;
        const padding = (containerHeight / 2) - 30;
        lyricsContainer.style.paddingTop = `${padding}px`;
        lyricsContainer.style.paddingBottom = `${padding}px`;
    }

    // --- EVENTOS ---
    audioPlayer.addEventListener('timeupdate', updateCurrentLyric); // Atualiza letra conforme o tempo
    lyricLines.forEach((line, index) => {
        line.addEventListener('click', () => seekToLyric(index)); // Clica na letra = pula na música
    });
    window.addEventListener('resize', adjustLyricsPadding); // Recalcula padding se a tela mudar de tamanho

    // --- INICIALIZAÇÃO ---
    adjustLyricsPadding();
    updateCurrentLyric();

})();
