import React, { useEffect, useRef } from 'react';

let globalZIndex = 1;

const Stackable = ({ children, style = {}, className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Gán z-index mặc định ban đầu
    el.style.zIndex = globalZIndex++;

    const bringToFront = () => {
      el.style.zIndex = ++globalZIndex;
    };

    // Có thể dùng click hoặc mousedown
    el.addEventListener('mousedown', bringToFront);
    el.addEventListener('touchstart', bringToFront);

    return () => {
      el.removeEventListener('mousedown', bringToFront);
      el.removeEventListener('touchstart', bringToFront);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ position: 'absolute', ...style }}>
      {children}
    </div>
  );
};

export default Stackable;