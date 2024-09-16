// Variable pour suivre l'audio en cours
let currentAudio = null;
let currentWord = null;

// Fonction pour réinitialiser l'animation
function resetAnimation(element) {
    element.classList.remove('highlight');
    void element.offsetWidth;
    element.classList.add('highlight');
}

// Fonction pour jouer ou arrêter le fichier audio et gérer le surlignage
function handleWordClick(wordElement, src) {
    if (currentAudio) {
        if (currentAudio.src.includes(src)) {
            if (currentAudio.paused) {
                currentAudio.currentTime = 0;
                currentAudio.play();
                resetAnimation(wordElement);
            } else {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                wordElement.classList.remove('highlight');
            }
        } else {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            if (currentWord) {
                currentWord.classList.remove('highlight');
            }
            currentAudio = new Audio(src);
            currentAudio.play();
            currentWord = wordElement;
            resetAnimation(currentWord);
        }
    } else {
        currentAudio = new Audio(src);
        currentAudio.play();
        currentWord = wordElement;
        resetAnimation(currentWord);
    }

    currentAudio.onended = function() {
        if (currentWord) {
            currentWord.classList.remove('highlight');
        }
    };
}

// Fonction pour ajouter des écouteurs d'événements aux mots
function setupWordListeners() {
    const words = document.querySelectorAll('.word');
    words.forEach(word => {
        word.addEventListener('click', function() {
            const wordId = this.id;
            const audioPath = `media/citerouge-${wordId.toUpperCase()}.mp3`;
            handleWordClick(this, audioPath);
        });
    });
}

// Fonction pour ajuster la hauteur du body sur les appareils mobiles
function adjustHeight() {
    document.body.style.minHeight = window.innerHeight + 'px';
}

// Appeler la fonction pour configurer les écouteurs d'événements après le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    setupWordListeners();
    adjustHeight();
    window.addEventListener('resize', adjustHeight);  // Ajuste la hauteur lors du redimensionnement
});
