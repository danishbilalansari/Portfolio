import React, { useEffect, useRef } from 'react';
import TubesCursor from 'threejs-components/build/cursors/tubes1.min.js';

function randomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function randomColors(count) {
  return Array.from({ length: count }, () => randomHexColor());
}

export default function GlowingTubesCursor({ frameTheme = 'yellow' }) {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let app = null;

    try {
      // Palette tuned to match the tutorial & active theme
      const initialColors =
        frameTheme === 'red'
          ? ['#ff2a5f', '#ff7b00', '#ff003c']
          : ['#f967fb', '#53bc28', '#6958d5'];

      const initialLights =
        frameTheme === 'red'
          ? ['#ff0055', '#ffaa00', '#ff0033', '#ffffff']
          : ['#83f36e', '#fe8a2e', '#ff008a', '#60aed5'];

      app = TubesCursor(canvas, {
        bloom: {
          threshold: 0,
          strength: 1.6,
          radius: 0.6,
        },
        tubes: {
          count: 18,
          colors: initialColors,
          minRadius: 0.006,
          maxRadius: 0.045,
          minTubularSegments: 32,
          maxTubularSegments: 128,
          material: {
            metalness: 0.95,
            roughness: 0.2,
          },
          lights: {
            intensity: 220,
            colors: initialLights,
          },
          lerp: 0.45,
          noise: 0.04,
        },
        sleepRadiusX: 280,
        sleepRadiusY: 140,
        sleepTimeScale1: 1,
        sleepTimeScale2: 2,
      });

      appRef.current = app;
    } catch (err) {
      console.error('Failed to initialize Glowing Tubes Cursor:', err);
    }

    // Click anywhere on screen randomizes the glowing colors, exactly as in the tutorial
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
        } catch (e) {
          // ignore cleanup errors
        }
      }
      appRef.current = null;
    };
  }, []);

  // Sync colors when theme changes
  useEffect(() => {
    if (!appRef.current || !appRef.current.tubes) return;
    const themeColors =
      frameTheme === 'red'
        ? ['#ff2a5f', '#ff7b00', '#ff003c']
        : ['#f967fb', '#53bc28', '#6958d5'];

    const themeLights =
      frameTheme === 'red'
        ? ['#ff0055', '#ffaa00', '#ff0033', '#ffffff']
        : ['#83f36e', '#fe8a2e', '#ff008a', '#60aed5'];

    appRef.current.tubes.setColors(themeColors);
    appRef.current.tubes.setLightsColors(themeLights);
  }, [frameTheme]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 25,
        overflow: 'hidden',
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
        }}
      />
    </div>
  );
}
