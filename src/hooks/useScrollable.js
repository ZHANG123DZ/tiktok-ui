// useScrollable.js
import { useRef, useState, useEffect } from 'react';

export function useScrollable({ scrollStep = 150 } = {}) {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.offsetWidth < el.scrollWidth);
    };

    checkScroll();
    const el = containerRef.current;
    el?.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      el?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollLeft = () =>
    containerRef.current?.scrollBy({ left: -scrollStep, behavior: 'smooth' });

  const scrollRight = () =>
    containerRef.current?.scrollBy({ left: scrollStep, behavior: 'smooth' });

  return {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  };
}
