import React, { useState } from 'react';
import CharacterCanvas from './components/CharacterCanvas';
import NetworkMesh from './components/NetworkMesh';
import Header from './components/Header';
import HeroContent from './components/HeroContent';
import CustomCursor from './components/CustomCursor';
// import GlowingTubesCursor from './components/GlowingTubesCursor';
import WorkModal from './components/WorkModal';
import InfoDrawer from './components/InfoDrawer';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [frameTheme, setFrameTheme] = useState('yellow');
  const [isReady, setIsReady] = useState(false);
  const [showNetworkMesh, setShowNetworkMesh] = useState(false);

  const isRed = frameTheme === 'red';
  const mainBg = isRed ? '#cd3f3c' : '#f8eec1';

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
      {/* Dense Moving Line Mesh Background Effect - Behind profile image & all elements */}
      <NetworkMesh frameTheme={frameTheme} isVisible={showNetworkMesh} isPaused={activeSection === 'WORK'} />

      {/* Zero-Ghosting 60FPS Character Animation Canvas & Dedicated Preloader */}
      <CharacterCanvas frameTheme={frameTheme} onReadyChange={setIsReady} isPaused={activeSection === 'WORK'} />

      {/* Main UI Elements - Animated with individual popup entrances once ready */}
      <div
        className={isReady ? 'site-ready' : 'site-loading'}
        style={{
          pointerEvents: isReady ? 'auto' : 'none',
        }}
      >
        {/* 3D Glowing Tubes Cursor Trail Effect (commented out) */}
        {/* <GlowingTubesCursor frameTheme={frameTheme} /> */}

        {/* Custom Magnetic Cursor */}
        <CustomCursor frameTheme={frameTheme} />

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

        {/* Left-Side Pure Liquid Glass Theme Switcher */}
        <ThemeSwitcher
          frameTheme={frameTheme}
          onSelectTheme={(theme) => setFrameTheme(theme)}
          showNetworkMesh={showNetworkMesh}
          onToggleNetworkMesh={() => setShowNetworkMesh((prev) => !prev)}
        />

        {/* Glossy Pop-up Work Projects Modal */}
        <WorkModal
          isOpen={activeSection === 'WORK'}
          onClose={() => setActiveSection(null)}
          frameTheme={frameTheme}
        />

        {/* Slide-over Luxury Drawer for EXPERIENCE and CONTACT */}
        <InfoDrawer
          activeSection={activeSection === 'WORK' ? null : activeSection}
          onClose={() => setActiveSection(null)}
          frameTheme={frameTheme}
        />
      </div>
    </main>
  );
}

export default App;
