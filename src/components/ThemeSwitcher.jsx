import React, { useRef } from 'react';

export default function ThemeSwitcher({ frameTheme, onSelectTheme }) {
  const containerRef = useRef(null);
  const isRed = frameTheme === 'red';

  const themes = [
    {
      id: 'yellow',
      label: 'CREAM',
      fullName: 'Studio Cream',
      bgColor: '#f8eec1',
      orbGradient: 'radial-gradient(circle at 32% 32%, #fffdf0 0%, #facc15 55%, #b45309 100%)',
      orbGlow: '0 0 12px rgba(234, 179, 8, 0.75)',
    },
    {
      id: 'red',
      label: 'CRIMSON',
      fullName: 'Crimson Red',
      bgColor: '#cd3f3c',
      orbGradient: 'radial-gradient(circle at 32% 32%, #ffe4e6 0%, #ef4444 55%, #991b1b 100%)',
      orbGlow: '0 0 12px rgba(239, 68, 68, 0.75)',
    },
  ];

  // Dynamic SVG Displacement Scale Refraction Animation on Hover
  const handleDockEnter = () => {
    const disp = document.getElementById('disp');
    if (disp) {
      disp.setAttribute('scale', '1.4');
    }
  };

  const handleDockLeave = () => {
    const disp = document.getElementById('disp');
    if (disp) {
      disp.setAttribute('scale', '0.8');
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: 'max(24px, 4.5vw)',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 55,
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'auto',
      }}
      aria-label="Theme switcher controls"
    >
      {/* PURE COMPACT VERTICAL GLASS DOCK (COLOR ORBS ONLY) */}
      <div
        id="theme-glass-dock"
        className={`${isRed ? 'glass-dock-red' : 'glass-dock'} popup-item popup-delay-switcher`}
        onMouseEnter={handleDockEnter}
        onMouseLeave={handleDockLeave}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          width: '46px',
          padding: '7px 5px',
          borderRadius: '9999px',
          backgroundColor: isRed
            ? 'rgba(255, 255, 255, 0.06)'
            : 'rgba(255, 255, 255, 0.08)',
          border: '2px solid transparent',
          boxShadow: isRed
            ? '0 0 0 2px rgba(255, 255, 255, 0.35), 0 16px 32px rgba(0, 0, 0, 0.3)'
            : '0 0 0 2px rgba(255, 255, 255, 0.6), 0 16px 32px rgba(0, 0, 0, 0.12)',
          backdropFilter: 'url(#frosted) blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'url(#frosted) blur(20px) saturate(180%)',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {themes.map((t) => {
          const isSelected = frameTheme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTheme(t.id)}
              className="interactive"
              aria-label={`Switch to ${t.fullName}`}
              title={t.fullName}
              style={{
                position: 'relative',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: isSelected
                  ? isRed
                    ? '1.5px solid rgba(255, 255, 255, 0.45)'
                    : '1.5px solid rgba(255, 255, 255, 0.95)'
                  : '1.5px solid transparent',
                backgroundColor: isSelected
                  ? isRed
                    ? 'rgba(255, 255, 255, 0.22)'
                    : 'rgba(255, 255, 255, 0.95)'
                  : 'transparent',
                boxShadow: isSelected
                  ? isRed
                    ? '0 3px 10px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
                    : '0 3px 10px rgba(35, 38, 47, 0.15), inset 0 1px 1px #ffffff'
                  : 'none',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.backgroundColor = isRed
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(35, 38, 47, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.92)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = isSelected ? 'scale(1.05)' : 'scale(1)';
              }}
            >
              {/* 3D Glowing Specular Glass Gem Orb */}
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: t.orbGradient,
                  boxShadow: t.orbGlow,
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  transition: 'transform 0.3s ease',
                  transform: isSelected ? 'scale(1.12)' : 'scale(1)',
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
