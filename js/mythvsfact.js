 const myths = [
      {
        icon: '☀️',
        myth: 'You only need SPF on sunny days.',
        truthHeading: 'UV rays reach you every single day.',
        truth: 'UVA rays penetrate clouds and glass year-round — they\'re the main driver of premature aging. SPF 50 every morning, rain or shine, is the single most powerful anti-aging step you can take.',
      },
      {
        icon: '🫧',
        myth: 'Your skin should feel squeaky clean after washing.',
        truthHeading: 'That "squeaky" feeling = damaged barrier.',
        truth: 'If your face feels tight after cleansing, you\'ve stripped your natural oils. A good cleanser leaves your skin feeling comfortable and balanced — not parched.',
      },
      {
        icon: '💧',
        myth: 'Drinking 8 glasses of water will clear your skin.',
        truthHeading: 'Hydration helps, but it\'s not the cure.',
        truth: 'Staying hydrated supports overall health, but acne and skin texture are driven by genetics, hormones, and your topical routine — not your water intake alone.',
      },
      {
        icon: '🌿',
        myth: '"Natural" ingredients are always safe for skin.',
        truthHeading: 'Natural ≠ gentle or effective.',
        truth: 'Poison ivy is natural. So is lemon juice — which can cause chemical burns and hyperpigmentation on skin. Always check the science, not just the label.',
      },
      {
        icon: '👁️',
        myth: 'Pores open and close with hot and cold water.',
        truthHeading: 'Pores don\'t have muscles — they can\'t move.',
        truth: 'Steam can loosen debris in pores, making extractions easier. But pores don\'t literally "open." Cold water also won\'t "close" them. Consistent cleansing and retinoids can minimize their appearance over time.',
      },
      {
        icon: '💸',
        myth: 'The more expensive the product, the better it works.',
        truthHeading: 'Price tag ≠ performance.',
        truth: 'Some of the most clinically proven ingredients — niacinamide, retinol, azelaic acid — are available in affordable formulas. You\'re often paying for packaging, branding, and fragrance, not better actives.',
      },
      {
        icon: '🧴',
        myth: 'Oily skin doesn\'t need moisturizer.',
        truthHeading: 'Skipping moisturizer makes oil WORSE.',
        truth: 'When skin is dehydrated, it overproduces sebum to compensate. A lightweight, oil-free gel moisturizer actually signals your skin to calm down — and it protects your barrier from actives like acids and retinol.',
      },
      {
        icon: '🔴',
        myth: 'Popping a pimple makes it go away faster.',
        truthHeading: 'Popping pushes bacteria deeper.',
        truth: 'Squeezing a spot forces bacteria and inflammation into surrounding tissue, making it larger, more painful, and more likely to leave a dark mark. A targeted spot treatment with salicylic acid or benzoyl peroxide works faster — and won\'t leave a scar.',
      },
      {
        icon: '✨',
        myth: 'You have to feel a tingle for a product to be working.',
        truthHeading: 'Tingling = irritation, not efficacy.',
        truth: 'That burning sensation means your skin barrier is being compromised. Effective skincare should feel comfortable. If it stings, it\'s likely damaging your skin\'s protective layer over time.',
      },
    ];
 
    let flippedCount = 0;
    const flipped = new Set();
 
    const grid = document.getElementById('mythsGrid');
 
    myths.forEach((m, i) => {
      const card = document.createElement('div');
      card.className = 'myth-card';
      card.innerHTML = `
        <div class="myth-card-inner">
          <div class="myth-front">
            <span class="myth-badge myth"><i class="fas fa-times"></i> MYTH</span>
            <div class="myth-icon">${m.icon}</div>
            <p class="myth-text">${m.myth}</p>
            <span class="myth-tap-hint"><i class="fas fa-sync-alt"></i> Tap to reveal truth</span>
          </div>
          <div class="myth-back">
            <span class="myth-badge truth"><i class="fas fa-check"></i> TRUTH</span>
            <p class="truth-heading">${m.truthHeading}</p>
            <p class="truth-body">${m.truth}</p>
            <div class="truth-check">✅</div>
          </div>
        </div>
      `;
 
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped') && !flipped.has(i)) {
          flipped.add(i);
          flippedCount++;
          document.getElementById('scoreCount').textContent = flippedCount;
          const total = myths.length;
          const pct = Math.round((flippedCount / total) * 100);
          document.getElementById('progressText').textContent =
            flippedCount === total
              ? `🎉 You've busted all ${total} myths! You're basically a skincare scientist now.`
              : `${flippedCount} of ${total} myths revealed (${pct}%) — keep going!`;
        }
      });
 
      grid.appendChild(card);
    });
 
    /* Scroll reveal */
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), 80 * [...grid.children].indexOf(entry.target));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
 
    document.querySelectorAll('.myth-card').forEach(c => observer.observe(c));
 
    /* Footer brand reveal */
    window.addEventListener('scroll', () => {
      const brand = document.querySelector('.footer-brand h1');
      if (!brand) return;
      if (brand.getBoundingClientRect().top < window.innerHeight * 0.85) {
        brand.style.transform = 'translateY(0)';
        brand.style.opacity = '1';
      }
    });