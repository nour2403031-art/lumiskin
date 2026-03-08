window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-container');
    const scrollPos = window.scrollY;
    const maxScroll = window.innerHeight;

    // Calculate scroll progress (0 to 1)
    const scrollProgress = Math.min(scrollPos / maxScroll, 1);

    // Zoom in as you scroll: starts at 100%, zooms to 180%
    let newSize = 100 + (scrollProgress * 80);
    
    hero.style.backgroundSize = newSize + '%';
    
    // Smooth transition effect
    hero.style.transition = 'none';ero.style.backgroundSize = newSize + '%';
    
    // Smooth transition effect
    hero.style.transition = 'background-size 0.1s ease-out';
 });
//lastpage 
window.addEventListener('scroll', () => {
  const brand = document.querySelector('.footer-brand h1');
  const triggerBottom = window.innerHeight / 5 * 4;
  const brandTop = brand.getBoundingClientRect().top;

  if(brandTop < triggerBottom) {
    brand.style.transform = "translateY(0)";
    brand.style.opacity = "1";
  }
});
