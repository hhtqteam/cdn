let confettiAmount = 60,
    confettiColors = [
        '#7d32f5',
        '#f6e434',
        '#63fdf1',
        '#e672da',
        '#295dfe',
        '#6e57ff'
    ],
    random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    createConfetti = to => {
        let elem = document.createElement('i'),
            set = Math.random() < 0.5 ? -1 : 1;
        elem.style.setProperty('--x', random(-260, 260) + 'px');
        elem.style.setProperty('--y', random(-160, 160) + 'px');
        elem.style.setProperty('--r', random(0, 360) + 'deg');
        elem.style.setProperty('--s', random(.6, 1));
        elem.style.setProperty('--b', confettiColors[random(0, 5)]);
        to.appendChild(elem);
    };

document.querySelectorAll('.paw-button').forEach(elem => {
    elem.addEventListener('click', async e => {
        e.preventDefault();

        let number = elem.children[1].textContent;
        if (!elem.classList.contains('animation')) {
            elem.classList.add('animation');
            for (let i = 0; i < confettiAmount; i++) {
                createConfetti(elem);
            }
            setTimeout(() => {
                elem.classList.add('confetti');
                setTimeout(() => {
                    elem.classList.add('liked');
                    elem.children[1].textContent = parseInt(number) + 1;
                }, 400);
                setTimeout(() => {
                    elem.querySelectorAll('i').forEach(i => i.remove());
                }, 600);
            }, 260);

            // Make API call
            try {
                let response = await fetch('https://eikibsacluga.cliphub.tv/index.php/ajax/digg.html?mid=1&id=143&type=up');
                let data = await response.json();
                console.log('API response on click:', data); // Debugging log
                if (data.code === 1) {
                    elem.children[1].textContent = data.data.up; // Update with the response data
                } else {
                    console.error('API error:', data.msg);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        } else {
            elem.classList.remove('animation', 'liked', 'confetti');
            elem.children[1].textContent = parseInt(number) - 1;
        }
    });
});

// Fetch initial like count and update the button
async function updateInitialLikeCount() {
    try {
        let response = await fetch('https://eikibsacluga.cliphub.tv/index.php/ajax/digg.html?mid=1&id=143&type=up');
        let data = await response.json();
        console.log('Initial API response:', data); // Debugging log
        if (data.code === 1) {
            document.getElementById('like-count').textContent = data.data.up; // Update initial like count
        } else {
            console.error('API error:', data.msg);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

document.addEventListener('DOMContentLoaded', updateInitialLikeCount);
