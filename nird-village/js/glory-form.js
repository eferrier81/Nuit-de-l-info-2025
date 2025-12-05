(function () {
    const form = document.getElementById('glory-form');
    const overlay = document.getElementById('glory-overlay');
    const popupClose = document.getElementById('glory-popup-close');
    const confettiContainer = document.getElementById('glory-confetti');
    const popupMessage = document.getElementById('glory-popup-message');
    const subjectInput = document.getElementById('glory-subject');
    const nameInput = document.getElementById('glory-name');
    const emailInput = document.getElementById('glory-email');
    const messageInput = document.getElementById('glory-message');
    const secretClick = document.getElementById('glory-secret-click');
    const body = document.body;

    function setError(input, message) {
        const errorEl = document.querySelector('[data-error-for="' + input.id + '"]');
        if (!errorEl) return;
        if (message) {
            input.classList.add('glory-error');
            errorEl.textContent = message;
        } else {
            input.classList.remove('glory-error');
            errorEl.textContent = '';
        }
    }

    function validateEmail(value) {
        return /.+@.+\..+/.test(value);
    }

    function validateForm() {
        let valid = true;

        if (!nameInput.value.trim()) {
            setError(nameInput, 'Nous avons besoin de votre nom pour graver le trophée.');
            valid = false;
        } else {
            setError(nameInput);
        }

        const emailValue = emailInput.value.trim();
        if (!emailValue) {
            setError(emailInput, 'Une adresse est nécessaire pour envoyer la gloire (même fictive).');
            valid = false;
        } else if (!validateEmail(emailValue)) {
            setError(emailInput, "Ce format d'email semble peu compatible avec les projecteurs.");
            valid = false;
        } else {
            setError(emailInput);
        }

        if (!subjectInput.value.trim()) {
            setError(subjectInput, 'Donnez un titre héroïque à votre exploit.');
            valid = false;
        } else {
            setError(subjectInput);
        }

        const msgValue = messageInput.value.trim();
        if (!msgValue) {
            setError(messageInput, 'La gloire a besoin de récit : quelques lignes au moins.');
            valid = false;
        } else if (msgValue.length < 30) {
            setError(messageInput, 'Minimum 30 caractères pour une légende digne de ce nom.');
            valid = false;
        } else {
            setError(messageInput);
        }

        return valid;
    }

    function openOverlay(customText) {
        if (customText) {
            popupMessage.textContent = customText;
        }
        overlay.classList.add('is-visible');
        overlay.setAttribute('aria-hidden', 'false');
        popupClose.focus();
        launchConfetti();
    }

    function closeOverlay() {
        overlay.classList.remove('is-visible');
        overlay.setAttribute('aria-hidden', 'true');
        confettiContainer.innerHTML = '';
    }

    function launchConfetti() {
        confettiContainer.innerHTML = '';
        const pieces = 80;
        const colors = ['#ffd86b', '#ff6bb5', '#6bacff', '#ffffff'];
        for (let i = 0; i < pieces; i++) {
            const piece = document.createElement('div');
            piece.className = 'glory-confetti-piece';
            const left = Math.random() * 100;
            const delay = Math.random() * 0.6;
            const duration = 2.2 + Math.random() * 0.8;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const drift = (Math.random() - 0.5) * 120;
            piece.style.left = left + '%';
            piece.style.backgroundColor = color;
            piece.style.animationDuration = duration + 's';
            piece.style.animationDelay = delay + 's';
            piece.style.setProperty('--confetti-drift', drift + 'px');
            confettiContainer.appendChild(piece);
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim(),
        };

        let customText =
            'Votre histoire rejoint désormais la grande légende des établissements qui osent un numérique plus libre, plus responsable et plus fun. Merci pour votre participation héroïque à cette Nuit de l\'Info.';

        const subjectLower = formData.subject.toLowerCase();
        const messageLower = formData.message.toLowerCase();

        if (subjectLower.includes('linux') || messageLower.includes('linux')) {
            customText =
                "Mention spéciale du jury : votre utilisation de Linux vous fait gagner un doublon d'or open source imaginaire. Félicitations, vous avez gagné !";
        } else if (subjectLower.includes('nird') || messageLower.includes('nird')) {
            customText =
                "Le comité NIRD vous décerne la médaille du Village Numérique Résistant. Félicitations, vous avez gagné ! votre démarche sera citée dans toutes les tavernes pédagogiques.";
        }

        setTimeout(function () {
            openOverlay(customText);
            form.reset();
        }, 400);
    });

    popupClose.addEventListener('click', closeOverlay);

    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            closeOverlay();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && overlay.classList.contains('is-visible')) {
            closeOverlay();
        }
    });

    // Easter egg 1 : Konami code -> change le thème de la cérémonie
    // (Haut, Haut, Bas, Bas, Gauche, Droite, Gauche, Droite, B, A)
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiBuffer = [];

    document.addEventListener('keydown', function (event) {
        konamiBuffer.push(event.key);
        if (konamiBuffer.length > konamiSequence.length) {
            konamiBuffer.shift();
        }
        if (konamiSequence.every((key, index) => key === konamiBuffer[index])) {
            body.classList.toggle('glory-alt-theme');
        }
    });

    // Easter egg 2 : clic sur la petite ligne "Ne cliquez surtout pas ici"
    // -> mini animation + texte alternatif dans la popup
    secretClick.addEventListener('click', function () {
        secretClick.textContent = 'Trop tard, la légende retiendra ce clic.';
        secretClick.style.color = '#ffdfef';
        secretClick.style.textShadow = '0 0 10px rgba(255, 216, 235, 0.9)';
    });

    // Easter egg 3 : sujet exactement "Nuit de l'Info" -> message personnalisé
    subjectInput.addEventListener('input', function () {
        const value = subjectInput.value.trim().toLowerCase();
        if (value === "nuit de l'info" || value === 'nuit de l info') {
            popupMessage.dataset.special =
                "Le Jury OFF de la Nuit de l'Info confirme : votre formulaire entre dans le panthéon des soumissions légendaires. Félicitations, vous avez gagné, et en plus avec le bon sujet.";
        } else {
            delete popupMessage.dataset.special;
        }
    });

    // Au moment d'ouvrir, si un message spécial est prêt, on l'utilise
    const originalOpenOverlay = openOverlay;
    openOverlay = function (text) {
        const special = popupMessage.dataset.special;
        if (special) {
            originalOpenOverlay(special);
        } else {
            originalOpenOverlay(text);
        }
    };
})();