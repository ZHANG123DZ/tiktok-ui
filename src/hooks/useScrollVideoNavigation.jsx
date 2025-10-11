import { useEffect, useRef } from 'react';

function useScrollVideoNavigation(changeVideo, currentIndex, postsLength) {
  const isScrollingRef = useRef(false);
  const currentIndexRef = useRef(currentIndex);
  const postsLengthRef = useRef(postsLength);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    postsLengthRef.current = postsLength;
  }, [currentIndex, postsLength]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrollingRef.current) return;
      if (Math.abs(e.deltaY) < 50) return;

      const cur = currentIndexRef.current;
      const len = postsLengthRef.current;

      if (e.deltaY > 0 && cur < len - 1) {
        changeVideo('next');
      } else if (e.deltaY < 0 && cur > 0) {
        changeVideo('prev');
      }

      isScrollingRef.current = true;
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [changeVideo]);
}

export default useScrollVideoNavigation;
