import React, { useEffect, useRef } from 'react';
import TubesCursor from 'threejs-components/build/cursors/tubes1.min.js';

function randomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function randomColors(count) {
  return Array.from({ length: count }, () => randomHexColor());
}

function getThemePalette(theme) {
  if (theme === 'red') {
    return {
      colors: ['#ff2a5f', '#ff7b00', '#ff003c'],
      lights: ['#ff0055', '#ffaa00', '#ff0033', '#ffffff'],
    };
  }
  return {
    colors: ['#ffd700', '#ff6b2b', '#6958d5'],
    lights: ['#ffe600', '#fe8a2e', '#ff008a', '#60aed5'],
  };
}

export default function GlowingTubesCursor({ frameTheme = 'yellow' }) {
  const canvasRef = useRef(null);
  const appRef = useRef(null);
  const themeRef = useRef(frameTheme);

  useEffect(() => {
    themeRef.current = frameTheme;
  }, [frameTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let app = null;

    try {
      const palette = getThemePalette(themeRef.current);

      app = TubesCursor(canvas, {
        bloom: {
          threshold: 0.05,
          strength: 1.4,
          radius: 0.5,
        },
        tubes: {
          count: 18,
          colors: palette.colors,
          minRadius: 0.006,
          maxRadius: 0.042,
          minTubularSegments: 32,
          maxTubularSegments: 128,
          material: {
            metalness: 0.95,
            roughness: 0.2,
          },
          lights: {
            intensity: 240,
            colors: palette.lights,
          },
          lerp: 0.45,
          noise: 0.04,
        },
        sleepRadiusX: 240,
        sleepRadiusY: 120,
        sleepTimeScale1: 1,
        sleepTimeScale2: 2,
      });

      // Ensure Three.js renderer clear color has 0 alpha so background is transparent
      if (app && app.three && app.three.renderer) {
        try {
          app.three.renderer.setClearColor(0x000000, 0);
        } catch {
          // ignore if not supported by node pass
        }
      }

      appRef.current = app;
    } catch (err) {
      console.error('Failed to initialize Glowing Tubes Cursor:', err);
    }

    // Click anywhere on screen randomizes the glowing colors
    const handleDocumentClick = (e) => {
      // Don't override if clicking interactive controls like drawer or switcher
      if (
        e.target &&
        (e.target.closest('button') || e.target.closest('a') || e.target.closest('.interactive'))
      ) {
        return;
      }
      if (appRef.current && appRef.current.tubes) {
        const nextColors = randomColors(3);
        const nextLights = randomColors(4);
        appRef.current.tubes.setColors(nextColors);
        appRef.current.tubes.setLightsColors(nextLights);
      }
    };

    window.addEventListener('click', handleDocumentClick);

    return () => {
      window.removeEventListener('click', handleDocumentClick);
      if (app) {
        try {
          app.dispose();
        } catch {
          // ignore cleanup errors
        }
      }
      appRef.current = null;
    };
  }, []);

  // Sync colors when theme changes
  useEffect(() => {
    if (!appRef.current || !appRef.current.tubes) return;
    const { colors, lights } = getThemePalette(frameTheme);
    appRef.current.tubes.setColors(colors);
    appRef.current.tubes.setLightsColors(lights);
  }, [frameTheme]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 15, // Sits directly on top of character canvas (zIndex: 1) and beneath UI text/buttons (zIndex: 40+)
        overflow: 'hidden',
        mixBlendMode: 'screen', // Completely knocks out black background while preserving vibrant glowing neon tubes
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}
