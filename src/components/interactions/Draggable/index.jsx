import React, { useEffect, useRef } from 'react';
import interact from '@interactjs/interactjs';

const Draggable = ({ children, style = {}, className = '' }) => {
  const dragRef = useRef(null);

  useEffect(() => {
    if (!dragRef.current) return;

    interact(dragRef.current).draggable({
      listeners: {
        start (event) {
          // optional: console.log('drag start', event);
        },
        move (event) {
          const target = event.target;
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

          // Translate element
          target.style.transform = `translate(${x}px, ${y}px)`;

          // Update position attributes
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        },
        end (event) {
          // optional: console.log('drag end', event);
        }
      }
    });

    return () => {
      interact(dragRef.current).unset();
    };
  }, []);

  return (
    <div
      ref={dragRef}
      className={className}
      style={{ display: 'inline-block', touchAction: 'none', ...style }}
    >
      {children}
    </div>
  );
};

export default Draggable;