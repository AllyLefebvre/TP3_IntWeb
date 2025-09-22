const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -20px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.burton-card');
            
            if (cards.length > 0) {
                anime({
                    targets: cards,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 500,
                    delay: anime.stagger(100),
                    easing: 'easeOutCubic'
                });
                
                cards.forEach(card => {
                    card.addEventListener('mouseenter', () => {
                        anime({
                            targets: card,
                            scale: [1, 1.05],
                            duration: 300,
                            easing: 'easeOutCubic'
                        });
                    });
                    
                    card.addEventListener('mouseleave', () => {
                        anime({
                            targets: card,
                            scale: [1.05, 1],
                            duration: 300,
                            easing: 'easeOutCubic'
                        });
                    });
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const cards = section.querySelectorAll('.burton-card');
        if (cards.length > 0) {
            cards.forEach(card => {
                card.style.opacity = '0';
            });
            observer.observe(section);
        }
    });
});

function createMacabreConfetti() {
    const colors = ['#E67300'];
    const shapes = ['🌀','💀','🕸'];
    
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.innerHTML = shape;
        confetti.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 15 + 12}px;
            color: ${color};
            pointer-events: none;
            z-index: 9999;
            left: ${Math.random() * window.innerWidth}px;
            top: -50px;
            user-select: none;
            will-change: transform, opacity;
        `;
        
        document.body.appendChild(confetti);
        
        const fallDuration = Math.random() * 2000 + 3000;
        const swayAmount = (Math.random() - 0.5) * 200;
        const rotationAmount = Math.random() * 720 + 360;
        
        anime({
            targets: confetti,
            translateY: window.innerHeight + 100,
            translateX: [
                {value: swayAmount * 0.5, duration: fallDuration * 0.3},
                {value: -swayAmount * 0.3, duration: fallDuration * 0.4},
                {value: swayAmount * 0.2, duration: fallDuration * 0.3}
            ],
            rotate: rotationAmount,
            opacity: [1, 0.8, 0],
            scale: [1, 1.1, 0.7],
            duration: fallDuration,
            easing: 'easeInQuart',
            delay: Math.random() * 300,
            complete: () => {
                confetti.remove();
            }
        });
    }
    
    anime({
        targets: document.body,
        backgroundColor: [
            {value: '#3B1C32', duration: 200, easing: 'easeOutQuad'},
            {value: '#0B0C10', duration: 600, easing: 'easeInOutSine'}
        ]
    });
}

function createFloatingParticles() {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: ${Math.random() > 0.5 ? '#7FFF00' : '#E67300'};
            border-radius: 50%;
            opacity: 0.6;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 10}px;
        `;
        
        document.body.appendChild(particle);
        
        anime({
            targets: particle,
            translateY: -window.innerHeight - 50,
            opacity: [0.6, 0],
            duration: 3000,
            easing: 'linear',
            complete: () => {
                particle.remove();
            }
        });
    }
}
