document.addEventListener('DOMContentLoaded', () => {
    // GSAP is available via CDN
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation Setup
    const heroImage = document.querySelector('.hero-img');
    const heroSection = document.querySelector('.hero');
    
    // Mouse Parallax for Hero
    heroSection.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(heroImage, {
            rotationY: xPos,
            rotationX: -yPos,
            x: xPos * 1.5,
            y: yPos * 1.5,
            ease: "power1.out",
            duration: 1
        });
    });

    // Reset on mouse leave
    heroSection.addEventListener('mouseleave', () => {
        gsap.to(heroImage, {
            rotationY: 0,
            rotationX: 0,
            x: 0,
            y: 0,
            ease: "power1.out",
            duration: 1
        });
    });

    // Scroll Animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.from(section.children, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    });

    // Create dynamic particles in Hero
    const heroVisual = document.querySelector('.hero-visual');
    const particleCount = 15;
    
    for(let i=0; i<particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 8 + 2;
        const x = Math.random() * 100; // %
        const y = Math.random() * 100; // %
        const blur = Math.random() * 2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(212, 175, 55, ${Math.random() * 0.6 + 0.2});
            left: ${x}%;
            top: ${y}%;
            border-radius: 50%;
            filter: blur(${blur}px);
            pointer-events: none;
            z-index: 10;
        `;
        
        heroVisual.appendChild(particle);

        // Animate individual particles
        gsap.to(particle, {
            y: `random(-50, 50)`,
            x: `random(-50, 50)`,
            opacity: `random(0.2, 1)`,
            duration: `random(3, 6)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Menu Cards Hover Effect (3D tilt simplified)
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Rotation values
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            gsap.to(card, {
                transformPerspective: 1000,
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power1.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power1.out"
            });
        });
    });

});
