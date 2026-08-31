const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// The custom cursor hides the native one, so it only runs where a real pointer exists.
if (hasFinePointer && !prefersReducedMotion) {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  document.body.classList.add('custom-cursor');

  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let ringX = pointerX;
  let ringY = pointerY;

  document.addEventListener('mousemove', event => {
    pointerX = event.clientX;
    pointerY = event.clientY;
  });

  // The ring eases toward the pointer on a single rAF loop rather than one timer per event.
  const followPointer = () => {
    ringX += (pointerX - ringX) * 0.18;
    ringY += (pointerY - ringY) * 0.18;
    cursor.style.transform = `translate(${pointerX}px, ${pointerY}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    window.requestAnimationFrame(followPointer);
  };
  window.requestAnimationFrame(followPointer);
}

const revealTargets = document.querySelectorAll('.word-item, .marker, .list-item, .timeline-item');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach(element => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const index = [...element.parentElement.children].indexOf(element);
      window.setTimeout(() => element.classList.add('visible'), index * 100);
      self.unobserve(element);
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(element => observer.observe(element));
}
