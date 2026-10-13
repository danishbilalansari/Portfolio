import React, { useEffect, useRef, useState, useCallback } from 'react';

// Circular shortest-path angle lerp
function lerpAngle(current, target, factor) {
  let diff = target - current;
  while (diff < -Math.PI) diff += Math.PI * 2;
  while (diff > Math.PI) diff -= Math.PI * 2;
  return current + diff * factor;
}

export default function CharacterCanvas({ frameTheme = 'yellow', onReadyChange }) {
  const canvasRef = useRef(null);
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  // Smooth preloader unmount after fade-out transition
  useEffect(() => {
    if (!isReady) return;
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 750);
    return () => clearTimeout(timer);
  }, [isReady]);

  // References
  const bitmapsRef = useRef([]);
  const centerBitmapRef = useRef(null);
  const smoothedAngleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const currentRenderKeyRef = useRef('center');
  const lastTimeRef = useRef(0);
  const ctxRef = useRef(null);

  // Dual-Theme Cache
  const themeCacheRef = useRef({
    yellow: { bitmaps: null, centerBitmap: null, isReady: false },
    red: { bitmaps: null, centerBitmap: null, isReady: false },
  });

  // Cached screen and face center dimensions to avoid layout queries during mousemove
  const layoutRef = useRef({
    faceCenterX: window.innerWidth * 0.5,
    faceCenterY: window.innerHeight * 0.36,
    enterThreshold: Math.min(window.innerWidth, window.innerHeight) * 0.11,
    exitThreshold: Math.min(window.innerWidth, window.innerHeight) * 0.14,
    drawW: 0,
    drawH: 0,
    drawX: 0,
    drawY: 0,
  });

  // Deadzone hysteresis: start locked in deadzone so direct center eye-contact frame is shown on initial load
  const inDeadzoneRef = useRef(true);
  const eyeContactWeightRef = useRef(1.0);
  const hasUserMovedMouseRef = useRef(false);

  // Helper to draw a specific frame immediately
  const drawFrame = useCallback((bmp) => {
    const ctx = ctxRef.current;
    if (!bmp || !ctx) return;
    const { drawW, drawH, drawX, drawY } = layoutRef.current;
    ctx.drawImage(bmp, drawX, drawY, drawW, drawH);
  }, []);

  // Generic theme frame loader
  const loadTheme = useCallback(async (themeKey, onProgress) => {
    // Return from cache if already loaded
    if (themeCacheRef.current[themeKey]?.isReady) {
      return themeCacheRef.current[themeKey];
    }

    const folder = themeKey === 'red' ? 'frames_red' : 'frames_yellow';

    try {
      const manifestResp = await fetch(`/${folder}/manifest.json`);
      const manifest = await manifestResp.json();
      const frameList = manifest.rotationFrames || [];
      const total = frameList.length;

      // Center frame
      const centerFilename = manifest.center || (themeKey === 'red' ? 'center.png' : 'center.webp');
      const centerResp = await fetch(`/${folder}/${centerFilename}`);
      const centerBlob = await centerResp.blob();
      const centerBmp = await createImageBitmap(centerBlob);

      // Concurrently fetch and decode all rotation frames in batches
      const loadedBitmaps = new Array(total);
      let loadedCount = 0;
      const batchSize = 24;

      for (let b = 0; b < total; b += batchSize) {
        const slice = frameList.slice(b, b + batchSize);
        await Promise.all(
          slice.map(async (filename, idx) => {
            const globalIdx = b + idx;
            try {
              const resp = await fetch(`/${folder}/${filename}`);
              const blob = await resp.blob();
              const bmp = await createImageBitmap(blob);
              loadedBitmaps[globalIdx] = bmp;
              loadedCount++;
              if (onProgress) {
                onProgress(Math.min(100, Math.round((loadedCount / total) * 100)));
              }
            } catch (e) {
              console.error(`Failed to load ${folder}/${filename}`, e);
            }
          })
        );
      }

      // Fill any rare missing bitmap with neighboring bitmap to preserve exact index mapping
      for (let i = 0; i < total; i++) {
        if (!loadedBitmaps[i]) {
          loadedBitmaps[i] = loadedBitmaps[i - 1] || centerBmp;
        }
      }

      const themeData = {
        bitmaps: loadedBitmaps,
        centerBitmap: centerBmp,
        isReady: true,
      };

      themeCacheRef.current[themeKey] = themeData;
      return themeData;
    } catch (err) {
      console.error(`Failed to load theme ${themeKey}`, err);
      return null;
    }
  }, []);

  // Load and switch active theme
  useEffect(() => {
    let active = true;

    async function applyTheme() {
      // Check cache first
      if (themeCacheRef.current[frameTheme]?.isReady) {
        const cached = themeCacheRef.current[frameTheme];
        bitmapsRef.current = cached.bitmaps;
        centerBitmapRef.current = cached.centerBitmap;
        currentRenderKeyRef.current = 'center';
        if (ctxRef.current) {
          drawFrame(cached.centerBitmap);
        }
        setIsReady(true);
        if (onReadyChange) onReadyChange(true);
        return;
      }

      // Not cached: enter full loading state
      setShowPreloader(true);
      setIsReady(false);
      if (onReadyChange) onReadyChange(false);

      const data = await loadTheme(frameTheme, (pct) => {
        if (active) setLoadedPercent(pct);
      });

      if (!active || !data) return;

      bitmapsRef.current = data.bitmaps;
      centerBitmapRef.current = data.centerBitmap;
      currentRenderKeyRef.current = 'center';
      if (ctxRef.current) {
        drawFrame(data.centerBitmap);
      }
      setIsReady(true);
      if (onReadyChange) onReadyChange(true);

      // Background pre-load alternate theme for instant future switching
      const altTheme = frameTheme === 'yellow' ? 'red' : 'yellow';
      if (!themeCacheRef.current[altTheme]?.isReady) {
        setTimeout(() => {
          if (active) {
            loadTheme(altTheme, null);
          }
        }, 1200);
      }
    }

    applyTheme();

    return () => {
      active = false;
    };
  }, [frameTheme, loadTheme, onReadyChange, drawFrame]);

  // Setup Canvas and Render Loop
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    ctxRef.current = ctx;

    let rafId;

    // Handle high-DPI resize & precalculate layout metrics
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;
      const canvasW = Math.round(width * dpr);
      const canvasH = Math.round(height * dpr);

      canvas.width = canvasW;
      canvas.height = canvasH;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Precalculate cover geometry once on resize
      const imgW = 1920;
      const imgH = 1080;
      const imgAspect = imgW / imgH;
      const canvasAspect = canvasW / canvasH;

      let drawW, drawH, drawX, drawY;
      if (canvasAspect > imgAspect) {
        drawW = canvasW;
        drawH = canvasW / imgAspect;
        drawX = 0;
        drawY = (canvasH - drawH) / 2;
      } else {
        drawH = canvasH;
        drawW = canvasH * imgAspect;
        drawY = 0;
        drawX = (canvasW - drawW) / 2;
      }

      const screenDim = Math.min(width, height);
      const cssDrawX = drawX / dpr;
      const cssDrawY = drawY / dpr;
      const cssDrawW = drawW / dpr;
      const cssDrawH = drawH / dpr;

      layoutRef.current = {
        faceCenterX: cssDrawX + cssDrawW * 0.5,
        faceCenterY: cssDrawY + cssDrawH * 0.35,
        enterThreshold: screenDim * 0.11,
        exitThreshold: screenDim * 0.14,
        drawW,
        drawH,
        drawX,
        drawY,
      };

      currentRenderKeyRef.current = null;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Guarantee the initial rendered frame is the center frame
    if (centerBitmapRef.current) {
      currentRenderKeyRef.current = 'center';
      drawFrame(centerBitmapRef.current);
    }

    // Fast pointer calculation
    const handlePointerMove = (clientX, clientY) => {
      hasUserMovedMouseRef.current = true;
      const { faceCenterX, faceCenterY, enterThreshold, exitThreshold } = layoutRef.current;
      const dx = clientX - faceCenterX;
      const dy = clientY - faceCenterY;
      const distance = Math.hypot(dx, dy);

      if (!inDeadzoneRef.current && distance < enterThreshold) {
        inDeadzoneRef.current = true;
      } else if (inDeadzoneRef.current && distance > exitThreshold) {
        inDeadzoneRef.current = false;
      }

      targetAngleRef.current = Math.atan2(dy, dx);
    };

    const onMouseMove = (e) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('pointermove', onMouseMove, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    lastTimeRef.current = performance.now();

    // 60-144 FPS Hardware-synced render loop with continuous smooth tracking
    const render = (now) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = now;
      const dt = Math.min(Math.max((now - lastTimeRef.current) / 1000, 0.001), 0.1);
      lastTimeRef.current = now;

      // Pure butter smoothing (decay = 24.0) provides silky, seamless head tracking
      const angleFactor = 1 - Math.exp(-24.0 * dt);
      const weightFactor = 1 - Math.exp(-18.0 * dt);

      smoothedAngleRef.current = lerpAngle(
        smoothedAngleRef.current,
        targetAngleRef.current,
        angleFactor
      );

      // Smooth eye contact transition
      // Maintain 100% direct center eye contact until user moves mouse
      const targetWeight = (!hasUserMovedMouseRef.current || inDeadzoneRef.current) ? 1.0 : 0.0;
      eyeContactWeightRef.current += (targetWeight - eyeContactWeightRef.current) * weightFactor;

      let selectedBmp = null;
      let renderKey = '';

      if (eyeContactWeightRef.current > 0.55 && centerBitmapRef.current) {
        selectedBmp = centerBitmapRef.current;
        renderKey = 'center';
      } else if (bitmapsRef.current && bitmapsRef.current.length > 0) {
        const total = bitmapsRef.current.length;
        let angleFromUp = smoothedAngleRef.current + Math.PI / 2;
        while (angleFromUp < 0) angleFromUp += Math.PI * 2;
        while (angleFromUp >= Math.PI * 2) angleFromUp -= Math.PI * 2;

        const fraction = angleFromUp / (Math.PI * 2);
        const frameIndex = Math.round(fraction * total) % total;

        selectedBmp = bitmapsRef.current[frameIndex] || centerBitmapRef.current;
        renderKey = `frame_${frameIndex}`;
      }

      // Draw immediately whenever the selected frame changes
      if (selectedBmp && renderKey !== currentRenderKeyRef.current) {
        currentRenderKeyRef.current = renderKey;
        drawFrame(selectedBmp);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [isReady, drawFrame]);

  const isRed = frameTheme === 'red';
  const themeBg = isRed ? '#cd3f3c' : '#f8eec1';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: themeBg,
        transition: 'background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 1,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isReady ? 1 : 0,
          transform: isReady ? 'scale(1)' : 'scale(1.03)',
          transition:
            'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'opacity, transform',
        }}
      />

      {/* Initial Minimal Preloader - Dissolves smoothly when canvas is ready */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: themeBg,
          zIndex: 100,
          opacity: isReady ? 0 : 1,
          pointerEvents: isReady ? 'none' : 'auto',
          visibility: showPreloader ? 'visible' : 'hidden',
          transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.7s',
        }}
      >
        <div
          style={{
            width: '180px',
            height: '2px',
            backgroundColor: isRed ? 'rgba(255, 255, 255, 0.2)' : 'rgba(26, 25, 23, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginBottom: '14px',
          }}
        >
          <div
            style={{
              width: `${loadedPercent}%`,
              height: '100%',
              backgroundColor: isRed ? '#ffffff' : '#1a1917',
              transition: 'width 0.15s ease-out',
            }}
          />
        </div>
        <span
          style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: isRed ? 'rgba(255, 255, 255, 0.75)' : '#8c877b',
            fontWeight: 500,
          }}
        >
          INITIALIZING • {loadedPercent}%
        </span>
      </div>
    </div>
  );
}
