// Hero parallax scroll
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-container');
    if (!hero) return;
    const scrollPos = window.scrollY;
    const maxScroll = window.innerHeight;
    const scrollProgress = Math.min(scrollPos / maxScroll, 1);
    let newSize = 100 + (scrollProgress * 80);
    hero.style.transition = 'none';
    hero.style.backgroundSize = newSize + '%';
    hero.style.transition = 'background-size 0.1s ease-out';
});

// Footer brand scroll animation
window.addEventListener('scroll', () => {
    const brand = document.querySelector('.footer-brand h1');
    if (!brand) return;
    const triggerBottom = window.innerHeight / 5 * 4;
    const brandTop = brand.getBoundingClientRect().top;
    if (brandTop < triggerBottom) {
        brand.style.transform = "translateY(0)";
        brand.style.opacity = "1";
    }
});

// Brand cards staggered animation
window.addEventListener('scroll', () => {
    const brandSection = document.querySelector('.brand-showcase');
    const brandCards = document.querySelectorAll('.brand-card');
    if (!brandSection) return;
    const triggerBottom = window.innerHeight / 5 * 4;
    const sectionTop = brandSection.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
        brandCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, index * 150);
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
