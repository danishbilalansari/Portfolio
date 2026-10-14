import React, { useEffect, useRef } from 'react';

/**
 * Dense Moving Line Mesh Background
 * Based on the user's reference canvas code:
 * - spacing: 23px
 * - connectionDistance: 49px
 * - speed: 0.28
 * - lineWidth: 0.45
 * - Optimized with spatial grid bucket clustering for silky 60-144 FPS
 */
export default function NetworkMesh({ frameTheme = 'yellow', isVisible = false }) {
  const canvasRef = useRef(null);
  const frameThemeRef = useRef(frameTheme);
  const isVisibleRef = useRef(isVisible);

  useEffect(() => {
    frameThemeRef.current = frameTheme;
    isVisibleRef.current = isVisible;
  }, [frameTheme, isVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let points = [];
    let rafId;

    const spacing = 23;
    const connectionDistance = 49;
    const speed = 0.28;
    const maxDistSq = connectionDistance * connectionDistance;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createPoints();
    }

    function createPoints() {
      points = [];
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      // Dense distribution with random variation matching reference code
      for (let row = -2; row <= rows + 2; row++) {
        for (let col = -2; col <= cols + 2; col++) {
          const angle = Math.random() * Math.PI * 2;
          const velocity = speed * (0.35 + Math.random() * 0.65);

          points.push({
            x: col * spacing + (Math.random() - 0.5) * spacing * 0.7,
            y: row * spacing + (Math.random() - 0.5) * spacing * 0.7,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
          });
        }
      }
    }

    // Spatial grid acceleration for ultra-smooth 60-144 FPS performance
    const cellSize = connectionDistance;
    const BUCKETS = 6;
    // Pre-allocate opacity buckets for batch stroke calls
    const bucketPaths = Array.from({ length: BUCKETS }, () => []);

    function drawLines() {
      ctx.lineWidth = 0.45;
      ctx.lineCap = 'round';

      // Clear bucket arrays
      for (let b = 0; b < BUCKETS; b++) {
        bucketPaths[b].length = 0;
      }

      // Build spatial grid
      const gridCols = Math.ceil((width + 200) / cellSize);
      const gridRows = Math.ceil((height + 200) / cellSize);
      const totalCells = gridCols * gridRows;
      const grid = new Array(totalCells);
      for (let k = 0; k < totalCells; k++) grid[k] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const gx = Math.floor((p.x + 100) / cellSize);
        const gy = Math.floor((p.y + 100) / cellSize);
        if (gx >= 0 && gx < gridCols && gy >= 0 && gy < gridRows) {
          grid[gy * gridCols + gx].push(i);
        }
      }

      // Check neighbor cells only
      for (let gy = 0; gy < gridRows; gy++) {
        for (let gx = 0; gx < gridCols; gx++) {
          const cellA = grid[gy * gridCols + gx];
          if (!cellA || cellA.length === 0) continue;

          for (let dy = 0; dy <= 1; dy++) {
            for (let dx = dy === 0 ? 0 : -1; dx <= 1; dx++) {
              const ny = gy + dy;
              const nx = gx + dx;
              if (nx >= 0 && nx < gridCols && ny >= 0 && ny < gridRows) {
                const cellB = grid[ny * gridCols + nx];
                if (!cellB || cellB.length === 0) continue;

                const isSameCell = dx === 0 && dy === 0;
                for (let i = 0; i < cellA.length; i++) {
                  const idxA = cellA[i];
                  const a = points[idxA];
                  const startJ = isSameCell ? i + 1 : 0;

                  for (let j = startJ; j < cellB.length; j++) {
                    const idxB = cellB[j];
                    const b = points[idxB];

                    const ddx = a.x - b.x;
                    const ddy = a.y - b.y;
                    const distSq = ddx * ddx + ddy * ddy;

                    if (distSq < maxDistSq) {
                      const dist = Math.sqrt(distSq);
                      const norm = 1 - dist / connectionDistance;
                      const bucketIndex = Math.min(
                        Math.floor(norm * BUCKETS),
                        BUCKETS - 1
                      );

                      bucketPaths[bucketIndex].push(a.x, a.y, b.x, b.y);
                    }
                  }
                }
              }
            }
          }
        }
      }

      // Draw lines grouped by opacity bucket in just 6 draw calls
      for (let b = 0; b < BUCKETS; b++) {
        const arr = bucketPaths[b];
        if (arr.length === 0) continue;

        const norm = (b + 0.5) / BUCKETS;
        const opacity = (0.55 * norm).toFixed(3);

        const isRed = frameThemeRef.current === 'red';
        ctx.strokeStyle = isRed
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(0, 0, 0, ${opacity})`;
        ctx.beginPath();
        for (let k = 0; k < arr.length; k += 4) {
          ctx.moveTo(arr[k], arr[k + 1]);
          ctx.lineTo(arr[k + 2], arr[k + 3]);
        }
        ctx.stroke();
      }
    }

    function animate() {
      if (!isVisibleRef.current) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Move points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -spacing * 2) p.x = width + spacing * 2;
        if (p.x > width + spacing * 2) p.x = -spacing * 2;
        if (p.y < -spacing * 2) p.y = height + spacing * 2;
        if (p.y > height + spacing * 2) p.y = -spacing * 2;
      }

      drawLines();
      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      id="network"
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    />
  );
}
