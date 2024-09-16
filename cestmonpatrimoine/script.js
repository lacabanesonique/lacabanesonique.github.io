// Variable pour suivre l'audio en cours
let currentAudio = null;
let currentWord = null; // Variable pour garder une trace du mot actuellement surligné

// Fonction pour réinitialiser l'animation
function resetAnimation(element) {
    element.classList.remove('highlight'); // Retirer la classe d'animation
    void element.offsetWidth; // Trigger reflow pour réinitialiser l'animation
    element.classList.add('highlight'); // Réappliquer la classe d'animation
}

// Fonction pour jouer ou arrêter le fichier audio et gérer le surlignage
function handleWordClick(wordElement, src) {
    // Si un fichier audio est déjà en cours de lecture
    if (currentAudio) {
        // Si le fichier audio actuellement lu est celui sur lequel on clique
        if (currentAudio.src.includes(src)) {
            // Si l'audio est en pause, le lire à nouveau depuis le début
            if (currentAudio.paused) {
                currentAudio.currentTime = 0;
                currentAudio.play();
                resetAnimation(wordElement); // Réinitialiser l'animation
            } else {
                // Si l'audio est en cours de lecture, l'arrêter
                currentAudio.pause();
                currentAudio.currentTime = 0;
                wordElement.classList.remove('highlight');
            }
        } else {
            // Si c'est un autre fichier audio, arrêter l'audio en cours et jouer le nouveau
            currentAudio.pause();
            currentAudio.currentTime = 0;
            if (currentWord) {
                currentWord.classList.remove('highlight'); // Retirer le surlignage de l'ancien mot
            }
            currentAudio = new Audio(src);
            currentAudio.play();
            currentWord = wordElement;
            resetAnimation(currentWord); // Réinitialiser l'animation pour le nouveau mot
        }
    } else {
        // Si aucun fichier audio n'est en cours, créer un nouvel objet Audio et jouer le fichier
        currentAudio = new Audio(src);
        currentAudio.play();
        currentWord = wordElement;
        resetAnimation(currentWord); // Réinitialiser l'animation pour le mot
    }

    // Lorsque l'audio se termine, enlever le surlignage
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

// Appeler la fonction pour configurer les écouteurs d'événements après le chargement du DOM
document.addEventListener('DOMContentLoaded', setupWordListeners);
