import { useEffect } from 'react';

function useClickOutside(refs, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      const clickedOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target)
      );

      if (clickedOutside) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback]);
}

export default useClickOutside;
