import React, { useEffect, useRef, useState } from 'react';
import interact from '@interactjs/interactjs';

const Rotatable = ({ children, style = {}, className = '' }) => {
  const ref = useRef(null);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startAngle = 0;

    interact(el).gesturable({
      listeners: {
        start(event) {
          startAngle = angle;
        },
        move(event) {
          const newAngle = startAngle + event.rotation;
          setAngle(newAngle);
          el.style.transform = `rotate(${newAngle}deg)`;
        }
      }
    });

    return () => interact(el).unset();
  }, [angle]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ touchAction: 'none', ...style }}
    >
      {children}
    </div>
  );
};

export default Rotatable;