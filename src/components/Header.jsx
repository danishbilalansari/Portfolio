import React from 'react';

export default function Header({ activeSection, onSelectSection, frameTheme = 'yellow' }) {
  const isRed = frameTheme === 'red';
  const textColor = isRed ? '#ffffff' : '#23262f';
  const mutedColor = isRed ? 'rgba(255, 255, 255, 0.75)' : 'rgba(35, 38, 47, 0.65)';
  const borderColor = isRed ? 'rgba(255, 255, 255, 0.35)' : 'rgba(35, 38, 47, 0.3)';

  const navItems = [
    { label: 'WORK', key: 'WORK' },
    { label: 'EXPERIENCE', key: 'ABOUT' },
    { label: 'CONTACT', key: 'CONTACT' },
  ];

  return (
    <header
      className="popup-item popup-delay-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '24px 4.5vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      {/* Top Left: Agency Mark + Hamburger Icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          pointerEvents: 'auto',
        }}
      >
        <span
          className="font-heading"
          style={{
            fontSize: '22px',
            fontWeight: 900,
            color: textColor,
            letterSpacing: '-0.04em',
            userSelect: 'none',
            transition: 'color 0.4s ease',
          }}
        >
          DB
        </span>

        {/* Minimal Hamburger lines (No popup effect) */}
        <button
          onClick={() => onSelectSection && onSelectSection(activeSection ? null : 'WORK')}
          className="interactive no-popup"
          aria-label="Toggle Menu"
          style={{
            background: 'transparent',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '4px',
            padding: '6px 4px',
            cursor: 'pointer',
            opacity: 0.9,
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.9';
          }}
        >
          <span
            style={{
              width: '18px',
              height: '2px',
              backgroundColor: textColor,
              borderRadius: '2px',
              transition: 'background-color 0.4s ease',
            }}
          />
          <span
            style={{
              width: '14px',
              height: '2px',
              backgroundColor: textColor,
              borderRadius: '2px',
              transition: 'background-color 0.4s ease',
            }}
          />
        </button>
      </div>

      {/* Top Right: Nav Links + Social Icons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          pointerEvents: 'auto',
        }}
      >
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {navItems.map((item) => {
            const isActive = activeSection === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onSelectSection(isActive ? null : item.key)}
                className="interactive font-body"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isActive ? textColor : mutedColor,
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '4px 0',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformOrigin: 'center center',
                  borderBottom: isActive ? `2px solid ${textColor}` : '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = textColor;
                  e.currentTarget.style.transform = 'scale(1.14)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = mutedColor;
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Social Round Icon Buttons with Reference-Styled Tooltip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="tooltip-wrapper">
            <a
              href="https://linkedin.com/in/danish-bilal-ansari-5596a1b3"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive font-body"
              aria-label="LinkedIn"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: `1.2px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: textColor,
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: 700,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transformOrigin: 'center center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = textColor;
                e.currentTarget.style.backgroundColor = isRed
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(35, 38, 47, 0.08)';
                e.currentTarget.style.transform = 'scale(1.18)';
                e.currentTarget.style.boxShadow = isRed ? '0 8px 16px rgba(0,0,0,0.25)' : '0 6px 14px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = borderColor;
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              in
            </a>
            <span className="tooltip-box tooltip-bottom font-heading">
              LinkedIn
            </span>
          </div>

          <div className="tooltip-wrapper">
            <a
              href="https://github.com/danishbilalansari"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive"
              aria-label="GitHub"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: `1.5px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: textColor,
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: 700,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transformOrigin: 'center center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = textColor;
                e.currentTarget.style.backgroundColor = isRed
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(35, 38, 47, 0.08)';
                e.currentTarget.style.transform = 'scale(1.18)';
                e.currentTarget.style.boxShadow = isRed ? '0 8px 16px rgba(0,0,0,0.25)' : '0 6px 14px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = borderColor;
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              gh
            </a>
            <span className="tooltip-box tooltip-bottom font-heading">
              GitHub
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
