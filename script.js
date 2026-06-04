document.addEventListener('DOMContentLoaded', () => {
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const proposalContainer = document.getElementById('proposal-container');
    const successContainer = document.getElementById('success-container');

    // Make the NO button run away
    const moveNoButton = () => {
        // Switch to absolute positioning if not already
        if (btnNo.style.position !== 'absolute') {
            btnNo.style.position = 'absolute';
        }

        // Calculate maximum allowed coordinates so it stays within the screen
        // Subtract button width/height to keep it fully visible
        const maxX = window.innerWidth - btnNo.offsetWidth - 20;
        const maxY = window.innerHeight - btnNo.offsetHeight - 20;

        // Generate random positions
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        // Apply new position
        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
    };

    // Trigger movement on mouse hover
    btnNo.addEventListener('mouseover', moveNoButton);
    // Trigger movement on touch (for mobile devices)
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent standard touch action
        moveNoButton();
    });

    // Handle YES button click
    btnYes.addEventListener('click', () => {
        // Hide proposal card
        proposalContainer.classList.add('hidden');
        // Show success card
        successContainer.classList.remove('hidden');

        // Fire confetti
        fireConfetti();

        // Start floating hearts
        setInterval(createHeart, 400);
    });

    // Handle Date Selection
    window.selectDate = function(btn) {
        document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        // Shoot a little bit of confetti on selection
        confetti({
            particleCount: 30,
            spread: 60,
            origin: { y: 0.8 }
        });
    };

    // Create a floating heart element
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        const emojis = ['💖', '💕', '🥰', '😍', '✨'];
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // 3 to 5 seconds
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    // Function to shoot confetti
    function fireConfetti() {
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { 
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 250);
    }
});
