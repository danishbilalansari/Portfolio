import React, { useState } from 'react';
import CharacterCanvas from './components/CharacterCanvas';
import Header from './components/Header';
import HeroContent from './components/HeroContent';
import CustomCursor from './components/CustomCursor';
import InfoDrawer from './components/InfoDrawer';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [frameTheme, setFrameTheme] = useState('yellow');

  const isRed = frameTheme === 'red';
  const mainBg = isRed ? '#cd3f3c' : '#f8eec1';
  const trackBg = isRed ? 'rgba(255, 255, 255, 0.18)' : 'rgba(35, 38, 47, 0.08)';
  const progressFill = isRed ? '#ffffff' : '#ef4444';

  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: mainBg,
        transition: 'background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Zero-Ghosting 60FPS Character Animation Canvas */}
      <CharacterCanvas frameTheme={frameTheme} />

      {/* Floating Frosted Glass Header */}
      <Header
        activeSection={activeSection}
        onSelectSection={(sec) => setActiveSection(sec)}
        frameTheme={frameTheme}
      />

      {/* Hero Typography & Pill Buttons */}
      <HeroContent
        onOpenSection={(sec) => setActiveSection(sec)}
        frameTheme={frameTheme}
      />

      {/* Hover / Scroll Right-Side Frame Theme Switcher */}
      <ThemeSwitcher
        frameTheme={frameTheme}
        onSelectTheme={(theme) => setFrameTheme(theme)}
      />

      {/* Slide-over Luxury Drawer */}
      <InfoDrawer
        activeSection={activeSection}
        onClose={() => setActiveSection(null)}
        frameTheme={frameTheme}
      />

      {/* Bottom Progress/Baseline Line Accent */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: trackBg,
          transition: 'background-color 0.5s ease',
          zIndex: 40,
        }}
      >
        <div
          style={{
            width: '28%',
            height: '100%',
            backgroundColor: progressFill,
            transition: 'background-color 0.5s ease',
          }}
        />
      </div>
    </main>
  );
}

export default App;
