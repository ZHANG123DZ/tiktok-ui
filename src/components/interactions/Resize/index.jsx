import React, { useEffect, useRef, useState } from 'react';
import interact from '@interactjs/interactjs';

const Resizable = ({ children, style = {}, className = '' }) => {
  const resizableRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 200, height: 200 });

  useEffect(() => {
    if (!resizableRef.current) return;

    interact(resizableRef.current).resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        move (event) {
          let { width, height } = event.rect;

          setDimensions({ width, height });

          Object.assign(event.target.style, {
            width: `${width}px`,
            height: `${height}px`
          });
        }
      },
      modifiers: [
        interact.modifiers.restrictSize({
          min: { width: 50, height: 50 }
        })
      ],
      inertia: true
    });

    return () => {
      interact(resizableRef.current).unset();
    };
  }, []);

  return (
    <div
      ref={resizableRef}
      className={className}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        position: 'relative',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default Resizable;