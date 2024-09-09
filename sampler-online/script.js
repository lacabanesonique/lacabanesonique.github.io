document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.container');
    const lastInteractionTimes = {};  // Stocke le temps de la dernière interaction pour chaque image

    function playAudioAndAnimate(image, audio) {
        audio.currentTime = 0;
        audio.play();

        image.classList.remove('animate');
        void image.offsetWidth;
        image.classList.add('animate');

        audio.addEventListener('ended', function() {
            image.classList.remove('animate');
        });
    }

    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }

    containers.forEach(function(container) {
        const image = container.querySelector('img');
        const audioId = image.id.replace('image-', 'audio-');
        
        function handleInteraction(event) {
            const now = Date.now();
            const lastInteractionTime = lastInteractionTimes[image.id] || 0;

            // Vérifier si l'interaction précédente a eu lieu il y a moins de 300 ms
            if (now - lastInteractionTime < 100) {
                return;
            }

            lastInteractionTimes[image.id] = now;

            const audio = document.getElementById(audioId);
            if (audio) {
                playAudioAndAnimate(image, audio);
            }
        }

        if (isTouchDevice()) {
            image.addEventListener('touchstart', handleInteraction);
        } else {
            image.addEventListener('mousedown', handleInteraction);
        }
    });
});
