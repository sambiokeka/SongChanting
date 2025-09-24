async function loadComponent(id, file, jsFile = null) {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;

    if (jsFile) {
        const oldScript = document.querySelector(`script[src="${jsFile}"]`);
        if (oldScript) oldScript.remove();
        
        const script = document.createElement("script");
        script.src = jsFile;
        document.body.appendChild(script);
    }
}

function setupAudioControls() {
    // --- ELEMENTOS GLOBAIS DO PLAYER ---
    const audioPlayer = document.getElementById('musica-principal');
    const playBtnDesktop = document.getElementById('play-pause-btn-desktop');
    const playBtnMobile = document.getElementById('play-pause-btn-mobile');
    const playIconDesktop = document.getElementById('play-icon-desktop');
    const pauseIconDesktop = document.getElementById('pause-icon-desktop');
    const playIconMobile = document.getElementById('play-icon-mobile');
    const pauseIconMobile = document.getElementById('pause-icon-mobile');
    const musicBars = document.querySelector('.music-bars');
    const progressBar = document.getElementById('progress-bar-fill');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalDurationDisplay = document.getElementById('total-duration');
    const progressBarContainer = document.getElementById('progress-bar-container');

    if (!audioPlayer) {
        console.error("Player de áudio principal não encontrado!");
        return;
    }
    
    let isScrubbing = false;

    // --- FUNÇÕES DE CONTROLE ---
    function alternarPlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    }

    // --- FUNÇÕES DE ATUALIZAÇÃO DA INTERFACE ---
    function updatePlayPauseIcons() {
        const isPlaying = !audioPlayer.paused;
        if (isPlaying) {
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

    function updateProgress() {
        if (!isScrubbing) {
            const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            if (progressBar) progressBar.style.width = `${progressPercent || 0}%`;
        }
        if (currentTimeDisplay) currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    }
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function handleScrub(e) {

        // Pega as dimensões e a posição da barra na tela
        const barRect = progressBarContainer.getBoundingClientRect();

        // Calcula a posição do mouse relativa ao início da barra
        const offsetX = e.clientX - barRect.left;

        // Define o valor minimo e maximo da constante ( n pode ser maior ou menro q o tempo da musica )
        const clampedOffsetX = Math.max(0, Math.min(offsetX, barRect.width));
        
        const percentage = clampedOffsetX / barRect.width;
        
        // Atualiza a barra roxa
        if (progressBar) {
            progressBar.style.width = `${percentage * 100}%`;
        }

        // Atualiza o tempo atual VISUALMENTE em tempo real
        if (currentTimeDisplay) {
            currentTimeDisplay.textContent = formatTime(percentage * audioPlayer.duration);
        }

        // Se o soltou o mouse (mouseup), define o tempo do áudio
        if (!isScrubbing) {
            audioPlayer.currentTime = percentage * audioPlayer.duration;
        }
    }

    // --- EVENT LISTENERS ---
    playBtnDesktop?.addEventListener('click', alternarPlayPause);
    playBtnMobile?.addEventListener('click', alternarPlayPause);

    audioPlayer.addEventListener('play', updatePlayPauseIcons);
    audioPlayer.addEventListener('pause', updatePlayPauseIcons);
    audioPlayer.addEventListener('ended', updatePlayPauseIcons);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('loadedmetadata', () => {
        if (totalDurationDisplay) totalDurationDisplay.textContent = formatTime(audioPlayer.duration);
    });
    

    // --- EVENT LISTENERS PARA A BARRA DE PROGRESSO ---

    // Quando o usuário clica na barra, avança a música
    progressBarContainer?.addEventListener('click', (e) => {
        // Pega as dimensões e a posição da barra na tela
        const barRect = progressBarContainer.getBoundingClientRect();
        const offsetX = e.clientX - barRect.left;
        const percentage = offsetX / barRect.width;
        audioPlayer.currentTime = percentage * audioPlayer.duration;
    });
    
    // Quando o SEGURA o botão do mouse para começar a arrastar
    progressBarContainer?.addEventListener('mousedown', () => {
        isScrubbing = true;
    });
    
    // Quando o MOVE o mouse (arrastando)
    window.addEventListener('mousemove', (e) => {
        if (isScrubbing) {
            // A função handleScrub faz todo o trabalho de atualizar a UI
            handleScrub(e);
        }
    });

    // Quando o SOLTA o botão do mouse em qualquer lugar
    window.addEventListener('mouseup', (e) => {
        if (isScrubbing) {
            isScrubbing = false;
            handleScrub(e);

        }
    });

    updatePlayPauseIcons();
}

async function initializeApp() {
    await Promise.all([
        
        loadComponent("header", "src/components/header.html", "src/js/header.js"),
        loadComponent("sidebar", "src/components/sidebar.html", "src/js/sidebar.js"),
        loadComponent("footer", "src/components/footer.html")
    ]);

    setupAudioControls();
}

initializeApp();