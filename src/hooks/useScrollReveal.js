import { useEffect } from 'react';

/**
 * Custom hook to trigger scroll animations using IntersectionObserver.
 * Elements with the class 'scroll-reveal' will receive 'is-revealed' class when scrolled into view.
 */
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    // Immediate fallback check for browsers or initial render
    const elements = document.querySelectorAll('.scroll-reveal');
    if (!elements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, observerOptions);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, deps);
}
