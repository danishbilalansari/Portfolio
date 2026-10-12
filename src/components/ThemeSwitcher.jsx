import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

export default function ThemeSwitcher({ frameTheme, onSelectTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const hideTimerRef = useRef(null);
  const panelRef = useRef(null);

  const isRed = frameTheme === 'red';

  const showPanel = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setIsOpen(true);
  };

  const scheduleHide = (delay = 1400) => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, delay);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Trigger when mouse moves within 150px of the LEFT edge of viewport
      if (e.clientX <= 150) {
        showPanel();
      } else if (isOpen) {
        // If mouse moved far away from the left panel
        if (e.clientX > 340) {
          scheduleHide(1000);
        }
      }
    };

    const handleWheel = (e) => {
      // Trigger when user scrolls or uses trackpad near the left side
      if (e.clientX <= window.innerWidth * 0.45) {
        showPanel();
        scheduleHide(2400);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isOpen]);

  const themes = [
    {
      id: 'yellow',
      name: 'YELLOW',
      subtitle: 'Warm Studio Cream',
      blobImage: '/organic_blobs_yellow.png',
      bgColor: '#f8eec1',
      accentGlow: 'rgba(234, 179, 8, 0.45)',
      activeBorder: '#b59a35',
    },
    {
      id: 'red',
      name: 'RED',
      subtitle: 'Crimson Studio Red',
      blobImage: '/organic_blobs_red.png',
      bgColor: '#cd3f3c',
      accentGlow: 'rgba(205, 63, 60, 0.55)',
      activeBorder: '#ff4d4a',
    },
  ];

  return (
    <aside
      ref={panelRef}
      onMouseEnter={showPanel}
      onMouseLeave={() => scheduleHide(800)}
      style={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: `translateY(-50%) translateX(${isOpen ? '0px' : 'calc(-100% + 44px)'})`,
        zIndex: 55,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'auto',
      }}
      aria-label="Organic frame sequence theme switcher"
    >
      {/* Main Organic Switcher Panel (Left) */}
      <div
        style={{
          width: '290px',
          backgroundColor: isRed ? 'rgba(28, 10, 12, 0.92)' : 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(35px)',
          WebkitBackdropFilter: 'blur(35px)',
          border: isRed ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(35, 38, 47, 0.12)',
          borderLeft: 'none',
          borderTopRightRadius: '22px',
          borderBottomRightRadius: '22px',
          padding: '20px 18px',
          boxShadow: '18px 0 40px rgba(0, 0, 0, 0.22)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {/* Panel Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: isRed ? '#ff4d4a' : '#23262f',
                boxShadow: isRed ? '0 0 10px #ff4d4a' : 'none',
              }}
            />
            <span
              className="font-heading"
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: isRed ? 'rgba(255, 255, 255, 0.95)' : '#23262f',
              }}
            >
              SELECT COLORWAY
            </span>
          </div>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: isRed ? 'rgba(255, 255, 255, 0.55)' : '#8c877b',
              textTransform: 'uppercase',
            }}
          >
            300 FRAMES
          </span>
        </div>

        {/* Two Organic Blob Interactive Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {themes.map((t) => {
            const isSelected = frameTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  onSelectTheme(t.id);
                }}
                className="interactive"
                aria-label={`Switch to ${t.name} colorway`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '14px 10px 12px',
                  borderRadius: '16px',
                  border: isSelected
                    ? `2px solid ${isRed ? '#ffffff' : '#23262f'}`
                    : isRed
                    ? '1px solid rgba(255, 255, 255, 0.12)'
                    : '1px solid rgba(35, 38, 47, 0.1)',
                  backgroundColor: isSelected
                    ? isRed
                      ? 'rgba(255, 255, 255, 0.14)'
                      : 'rgba(35, 38, 47, 0.05)'
                    : isRed
                    ? 'rgba(255, 255, 255, 0.04)'
                    : 'rgba(0, 0, 0, 0.02)',
                  boxShadow: isSelected
                    ? `0 8px 24px ${t.accentGlow}`
                    : '0 4px 12px rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.backgroundColor = isRed
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(35, 38, 47, 0.03)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = isRed
                      ? 'rgba(255, 255, 255, 0.04)'
                      : 'rgba(0, 0, 0, 0.02)';
                  }
                }}
              >
                {/* Active Check Badge */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: isRed ? '#ffffff' : '#23262f',
                      color: isRed ? '#1e0a0a' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      zIndex: 2,
                    }}
                  >
                    <Check size={10} strokeWidth={3.5} />
                  </div>
                )}

                {/* Organic Metaballs Graphic Container */}
                <div
                  style={{
                    width: '92px',
                    height: '92px',
                    borderRadius: '14px',
                    backgroundColor: t.id === 'yellow' ? '#fdf8e6' : '#2a0e10',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    marginBottom: '10px',
                    border: isSelected
                      ? `1.5px solid ${t.activeBorder}`
                      : '1px solid rgba(0,0,0,0.06)',
                    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <img
                    src={t.blobImage}
                    alt={`${t.name} organic metaballs`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: isSelected ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.25))' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>

                {/* Color Title */}
                <div
                  className="font-heading"
                  style={{
                    fontSize: '12px',
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                    color: isRed ? '#ffffff' : '#23262f',
                    marginBottom: '2px',
                  }}
                >
                  {t.name}
                </div>

                {/* Color Subtitle */}
                <div
                  className="font-body"
                  style={{
                    fontSize: '9px',
                    fontWeight: 500,
                    color: isRed ? 'rgba(255, 255, 255, 0.6)' : '#7a766c',
                    textAlign: 'center',
                    lineHeight: 1.2,
                  }}
                >
                  {t.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Tip text */}
        <div
          style={{
            fontSize: '8.5px',
            color: isRed ? 'rgba(255, 255, 255, 0.45)' : '#9e998e',
            letterSpacing: '0.04em',
            paddingTop: '2px',
            textAlign: 'center',
          }}
        >
          Click to switch background & frames
        </div>
      </div>

      {/* Edge Handle / Peek Tab (protruding on the right of the panel, visible when collapsed on left edge) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="interactive font-heading"
        aria-label="Toggle organic colorway switcher"
        style={{
          width: '44px',
          padding: '14px 6px',
          borderTopRightRadius: '16px',
          borderBottomRightRadius: '16px',
          backgroundColor: isRed ? 'rgba(28, 10, 12, 0.85)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: isRed ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(35, 38, 47, 0.12)',
          borderLeft: 'none',
          boxShadow: '8px 0 24px rgba(0, 0, 0, 0.14)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          color: isRed ? '#ffffff' : '#23262f',
          transition: 'all 0.25s ease',
        }}
      >
        {/* Organic Mini Blob Icon in Peek Tab */}
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: frameTheme === 'yellow' ? '#fdf8e6' : '#2a0e10',
            border: `1.5px solid ${frameTheme === 'yellow' ? '#b59a35' : '#ff4d4a'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px',
            boxShadow: `0 0 10px ${frameTheme === 'yellow' ? 'rgba(234, 179, 8, 0.5)' : 'rgba(205, 63, 60, 0.6)'}`,
            transition: 'all 0.3s ease',
          }}
        >
          <img
            src={frameTheme === 'yellow' ? '/organic_blobs_yellow.png' : '/organic_blobs_red.png'}
            alt="Active blob color"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Vertical text label */}
        <span
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: '9px',
            fontWeight: 900,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0.85,
          }}
        >
          COLORWAY
        </span>
      </button>
    </aside>
  );
}
