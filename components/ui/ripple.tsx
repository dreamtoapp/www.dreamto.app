"use client";

import React, { useRef, useEffect } from 'react';

interface RippleProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  duration?: number;
}

const Ripple: React.FC<RippleProps> = ({
  children,
  className = "",
  color = "rgba(255, 255, 255, 0.3)",
  duration = 800
}) => {
  const rippleRef = useRef<HTMLDivElement>(null);

  const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    const ripple = rippleRef.current;
    if (!ripple) return;

    const rect = ripple.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 4; // Make ripple much larger
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const rippleElement = document.createElement('span');
    rippleElement.style.width = rippleElement.style.height = `${size}px`;
    rippleElement.style.left = `${x}px`;
    rippleElement.style.top = `${y}px`;
    rippleElement.style.backgroundColor = color;
    rippleElement.style.animationDuration = `${duration}ms`;
    rippleElement.style.borderRadius = '50%';
    rippleElement.style.transform = 'scale(0)';
    rippleElement.style.opacity = '0.9';
    rippleElement.className = 'absolute animate-ripple pointer-events-none';

    ripple.appendChild(rippleElement);

    // Start the animation
    requestAnimationFrame(() => {
      rippleElement.style.transform = 'scale(1)';
      rippleElement.style.opacity = '0';
    });

    setTimeout(() => {
      if (ripple.contains(rippleElement)) {
        ripple.removeChild(rippleElement);
      }
    }, duration);
  };

  return (
    <div
      ref={rippleRef}
      className={`relative overflow-hidden ${className}`}
      onMouseDown={createRipple}
    >
      {children}
    </div>
  );
};

export default Ripple; 