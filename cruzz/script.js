document.addEventListener('DOMContentLoaded', () => {
  // Trigger confetti after reveal text
  setTimeout(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);
  }, 6000);

  // Add hover effect to spec items
  document.querySelectorAll('.spec-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0)';
    });
  });

  // Show scroll indicator after delay
  setTimeout(() => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator.classList.remove('initially-hidden');
    
    // Handle scroll indicator visibility
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollIndicator.classList.add('hidden');

      scrollTimeout = setTimeout(() => {
        if (window.scrollY === 0) {
          scrollIndicator.classList.remove('hidden');
        }
      }, 150);
    });
  }, 8000); // Show 2 seconds after PC section appears
});
