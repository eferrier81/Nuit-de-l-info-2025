(function () {
    const audioEl = document.getElementById('audio-element');
    const fileInput = document.getElementById('audio-file-input');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeRange = document.getElementById('volume-range');
    const canvas = document.getElementById('visualizer-canvas');
    const messageEl = document.getElementById('visualizer-message');

    if (!window.AudioContext && !window.webkitAudioContext) {
        messageEl.innerHTML = '<p class="visualizer-message__text">Ton navigateur ne supporte pas la Web Audio API. Essaie une version plus récente de Firefox ou Chrome.</p>';
        return;
    }

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const source = audioContext.createMediaElementSource(audioEl);
    const gainNode = audioContext.createGain();
    source.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(audioContext.destination);

    let isPlaying = false;

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const { clientWidth, clientHeight } = canvas;
        canvas.width = clientWidth * dpr;
        canvas.height = clientHeight * dpr;
        const ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const ctx = canvas.getContext('2d');

    function draw() {
        requestAnimationFrame(draw);
        if (!isPlaying) {
            // dessine un léger halo même à l'arrêt
            ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            return;
        }

        analyser.getByteFrequencyData(dataArray);

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.fillRect(0, 0, width, height);

        const barCount = Math.floor(width / 8);
        const step = Math.floor(bufferLength / barCount) || 1;
        const barWidth = (width / barCount) * 0.8;

        const centerY = height / 2;

        for (let i = 0; i < barCount; i++) {
            const dataIndex = i * step;
            const value = dataArray[dataIndex] / 255; // 0..1
            const barHeight = value * (height * 0.45);

            const x = (i * width) / barCount;

            const hue = 130 + value * 160; // vert -> rose
            const glow = 0.2 + value * 0.6;

            const gradient = ctx.createLinearGradient(x, centerY - barHeight, x, centerY + barHeight);
            gradient.addColorStop(0, `rgba(176, 245, 201, ${glow})`);
            gradient.addColorStop(0.5, `hsl(${hue}, 80%, 60%)`);
            gradient.addColorStop(1, `rgba(50, 201, 107, ${glow})`);

            ctx.fillStyle = gradient;
            ctx.fillRect(x, centerY - barHeight, barWidth, barHeight * 2);
        }

        // Lignes de scan rétro
        ctx.strokeStyle = 'rgba(50, 201, 107, 0.25)';
        ctx.lineWidth = 1;
        const lineCount = 18;
        for (let j = 0; j < lineCount; j++) {
            const y = (j * height) / lineCount;
            ctx.beginPath();
            ctx.moveTo(0, y + 0.5);
            ctx.lineTo(width, y + 0.5);
            ctx.stroke();
        }
    }

    draw();

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        // n'activer le bouton que si le fichier est un MP3 (ou a un type audio/mpeg)
        const isMp3 = (file.type === 'audio/mpeg') || file.name.toLowerCase().endsWith('.mp3');

        const fileURL = URL.createObjectURL(file);
        audioEl.src = fileURL;
        audioEl.load();
        messageEl.style.display = 'none';
        if (isMp3) {
            playPauseBtn.disabled = false;
            playPauseBtn.removeAttribute('aria-disabled');
            playPauseBtn.textContent = '▶︎ Lecture';
        } else {
            // garde le bouton désactivé et informe l'utilisateur
            playPauseBtn.disabled = true;
            playPauseBtn.setAttribute('aria-disabled', 'true');
            playPauseBtn.textContent = '▶︎ Lecture';
            // affiche une information accessible
            messageEl.style.display = '';
            messageEl.querySelector('.visualizer-message__title').textContent = 'Format non pris en charge — sélectionne un MP3';
            messageEl.querySelector('.visualizer-message__text').textContent = 'Le visualiseur fonctionne au mieux avec des fichiers MP3. Choisis un fichier avec l’extension .mp3.';
        }
        isPlaying = false;
    });

    playPauseBtn.addEventListener('click', async () => {
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        if (audioEl.paused) {
            audioEl.play();
        } else {
            audioEl.pause();
        }
    });

    audioEl.addEventListener('play', () => {
        isPlaying = true;
        playPauseBtn.textContent = '⏸ Pause';
    });

    audioEl.addEventListener('pause', () => {
        isPlaying = false;
        playPauseBtn.textContent = '▶︎ Lecture';
    });

    audioEl.addEventListener('ended', () => {
        isPlaying = false;
        playPauseBtn.textContent = '▶︎ Lecture';
    });

    volumeRange.addEventListener('input', (event) => {
        const value = parseFloat(event.target.value) || 0;
        gainNode.gain.value = value;
    });

    gainNode.gain.value = parseFloat(volumeRange.value) || 0.8;
})();