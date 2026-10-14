import React, { useEffect, useRef, useState, useCallback } from 'react';

// Circular shortest-path angle lerp
function lerpAngle(current, target, factor) {
  let diff = target - current;
  while (diff < -Math.PI) diff += Math.PI * 2;
  while (diff > Math.PI) diff -= Math.PI * 2;
  return current + diff * factor;
}

// WebGL Chroma-Key Pipeline for zero-overhead background transparency
function initWebGL(canvas) {
  const gl =
    canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    }) ||
    canvas.getContext('experimental-webgl', {
      alpha: true,
      premultipliedAlpha: false,
    });

  if (!gl) return null;

  const vsSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    uniform vec2 u_resolution;
    varying vec2 v_texCoord;
    void main() {
      vec2 zeroToOne = a_position / u_resolution;
      vec2 clipSpace = (zeroToOne * 2.0) - 1.0;
      gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;

  const fsSource = `
    precision mediump float;
    uniform sampler2D u_image;
    uniform vec3 u_bgColor;
    uniform float u_threshold;
    uniform float u_softness;
    uniform float u_isRed;
    varying vec2 v_texCoord;

    void main() {
      vec4 color = texture2D(u_image, v_texCoord);
      float dist = distance(color.rgb, u_bgColor);
      float alpha = 1.0;

      if (u_isRed > 0.5) {
        // Red Theme:
        // Background has intense saturated red dominance (R - max(G,B) >= 0.44)
        // Ear, lips, skin, and clothes have red dominance <= 0.35
        float redDom = color.r - max(color.g, color.b);
        float isBgColor = 1.0 - smoothstep(u_threshold, u_threshold + u_softness, dist);
        float isBgDom = smoothstep(0.38, 0.44, redDom);
        float bgFactor = isBgColor * isBgDom;
        alpha = 1.0 - bgFactor;
      } else {
        // Yellow Theme:
        // Background is cream/yellow: (G - B >= 0.11) and (R - G <= 0.060)
        // Forehead has G - B <= 0.08, nose highlight has R - G >= 0.065
        float g_minus_b = color.g - color.b;
        float r_minus_g = color.r - color.g;
        float isBgColor = 1.0 - smoothstep(u_threshold, u_threshold + u_softness, dist);
        float isBgChroma = smoothstep(0.08, 0.11, g_minus_b) * (1.0 - smoothstep(0.065, 0.090, r_minus_g));
        float bgFactor = isBgColor * isBgChroma;
        alpha = 1.0 - bgFactor;
      }

      gl_FragColor = vec4(color.rgb, color.a * alpha);
    }
  `;

  function createShader(type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  const vs = createShader(gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }

  const posLoc = gl.getAttribLocation(program, 'a_position');
  const texLoc = gl.getAttribLocation(program, 'a_texCoord');
  const resLoc = gl.getUniformLocation(program, 'u_resolution');
  const imgLoc = gl.getUniformLocation(program, 'u_image');
  const bgLoc = gl.getUniformLocation(program, 'u_bgColor');
  const threshLoc = gl.getUniformLocation(program, 'u_threshold');
  const softLoc = gl.getUniformLocation(program, 'u_softness');
  const isRedLoc = gl.getUniformLocation(program, 'u_isRed');

  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1,
    ]),
    gl.STATIC_DRAW
  );

  const posBuffer = gl.createBuffer();

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  return {
    gl,
    program,
    posLoc,
    texLoc,
    resLoc,
    imgLoc,
    bgLoc,
    threshLoc,
    softLoc,
    isRedLoc,
    posBuffer,
    texCoordBuffer,
    texture,
  };
}

function renderWebGLFrame(glState, bmp, layout, themeKey, canvasW, canvasH) {
  const { gl, program, posLoc, texLoc, resLoc, imgLoc, bgLoc, threshLoc, softLoc, isRedLoc, posBuffer, texCoordBuffer, texture } = glState;

  gl.viewport(0, 0, canvasW, canvasH);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bmp);
  gl.uniform1i(imgLoc, 0);

  gl.uniform2f(resLoc, canvasW, canvasH);

  const isRed = themeKey === 'red';
  if (isRed) {
    gl.uniform3f(bgLoc, 185 / 255, 58 / 255, 54 / 255);
    gl.uniform1f(threshLoc, 0.12);
    gl.uniform1f(softLoc, 0.10);
    gl.uniform1f(isRedLoc, 1.0);
  } else {
    gl.uniform3f(bgLoc, 247.7 / 255, 238.5 / 255, 196.6 / 255);
    gl.uniform1f(threshLoc, 0.075);
    gl.uniform1f(softLoc, 0.05);
    gl.uniform1f(isRedLoc, 0.0);
  }

  const { drawW, drawH, drawX, drawY } = layout;
  const x1 = drawX;
  const y1 = drawY;
  const x2 = drawX + drawW;
  const y2 = drawY + drawH;

  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2,
    ]),
    gl.DYNAMIC_DRAW
  );
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.enableVertexAttribArray(texLoc);
  gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
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
  const glRef = useRef(null);
  const frameThemeRef = useRef(frameTheme);
  frameThemeRef.current = frameTheme;

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
    if (!bmp) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (glRef.current) {
      renderWebGLFrame(
        glRef.current,
        bmp,
        layoutRef.current,
        frameThemeRef.current,
        canvas.width,
        canvas.height
      );
    } else if (ctxRef.current) {
      const { drawW, drawH, drawX, drawY } = layoutRef.current;
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      ctxRef.current.drawImage(bmp, drawX, drawY, drawW, drawH);
    }
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

    // Use WebGL chroma-key pipeline for zero-overhead background transparency
    const glState = initWebGL(canvas);
    if (glState) {
      glRef.current = glState;
    } else {
      ctxRef.current = canvas.getContext('2d', { alpha: true });
    }

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

      if (glRef.current) {
        glRef.current.gl.viewport(0, 0, canvasW, canvasH);
      }

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
      if (glRef.current) {
        const { gl, program, texture, posBuffer, texCoordBuffer } = glRef.current;
        gl.deleteTexture(texture);
        gl.deleteBuffer(posBuffer);
        gl.deleteBuffer(texCoordBuffer);
        gl.deleteProgram(program);
        glRef.current = null;
      }
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
        backgroundColor: 'transparent',
        zIndex: 2,
        pointerEvents: 'none',
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
          pointerEvents: 'none',
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
