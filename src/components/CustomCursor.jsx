import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;

    let currentScale = 1;
    let targetScale = 1;
    let currentOpacity = 0.55;
    let targetOpacity = 0.55;

    let isHoveringInteractive = false;
    let isMouseDown = false;
    let hasMoved = false;
    let lastTime = performance.now();
    let rafId;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        ringX = targetX;
        ringY = targetY;
        setIsVisible(true);
      }

      // 0ms Hardware direct lock: position dot immediately on pointer event
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Event delegation on document: ONLY runs when pointer enters an interactive element
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.closest('.interactive'))
      ) {
        isHoveringInteractive = true;
      } else {
        isHoveringInteractive = false;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      isMouseDown = true;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    // RAF loop strictly animates the trailing momentum aura ring with tuned delta-time smoothing
    const animate = (now) => {
      const dt = Math.min(Math.max((now - lastTime) / 1000, 0.001), 0.1);
      lastTime = now;

      // Silky organic trailing momentum (decay = 20.0) provides effortless, liquid floating feel
      const ringFactor = 1 - Math.exp(-20.0 * dt);
      const scaleFactor = 1 - Math.exp(-16.0 * dt);

      ringX += (targetX - ringX) * ringFactor;
      ringY += (targetY - ringY) * ringFactor;

      // Smooth interactive hover scale
      if (isHoveringInteractive) {
        targetScale = isMouseDown ? 1.5 : 2.2;
        targetOpacity = 0.95;
      } else {
        targetScale = isMouseDown ? 0.75 : 1.0;
        targetOpacity = 0.55;
      }

      currentScale += (targetScale - currentScale) * scaleFactor;
      currentOpacity += (targetOpacity - currentOpacity) * scaleFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${currentScale})`;
        ringRef.current.style.opacity = currentOpacity;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'none',
      }}
    >
      {/* Central crisp dot (0ms hardware lock) */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '7px',
          height: '7px',
          backgroundColor: '#23262f',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 8px 1px rgba(35, 38, 47, 0.25)',
          willChange: 'transform',
        }}
      />
      {/* Silky trailing momentum aura ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: '1.5px solid #23262f',
          backgroundColor: 'rgba(35, 38, 47, 0.04)',
          boxShadow: '0 0 16px rgba(35, 38, 47, 0.05)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}
