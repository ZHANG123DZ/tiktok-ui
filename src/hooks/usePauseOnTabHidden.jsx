import { useEffect } from 'react';

const usePauseOnTabHidden = (mediaRef) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (mediaRef.current && typeof mediaRef.current.pause === 'function') {
          mediaRef.current.pause();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [mediaRef]);
};

export default usePauseOnTabHidden;
