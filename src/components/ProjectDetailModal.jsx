import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Layers, Cpu, Database, Server, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';

export default function ProjectDetailModal({ project, isOpen, onClose, frameTheme = 'yellow', artwork }) {
  const isRed = frameTheme === 'red';

  // Keyboard shortcut: Escape closes the detail dialog
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project || typeof document === 'undefined') return null;

  // Theme-aware styles
  const accentColor = isRed ? '#D99070' : '#d97706';
  const titleColor = isRed ? '#ffffff' : '#1f2937';
  const subtitleColor = isRed ? 'rgba(255, 255, 255, 0.78)' : '#4b5563';
  const bodyTextColor = isRed ? 'rgba(255, 255, 255, 0.88)' : '#374151';
  
  const modalBg = isRed
    ? 'rgba(28, 8, 12, 0.94)'
    : 'rgba(255, 255, 255, 0.96)';

  const modalBorder = isRed
    ? '1px solid rgba(255, 255, 255, 0.2)'
    : '1px solid rgba(255, 255, 255, 0.9)';

  const cardSurface = isRed
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(249, 246, 237, 0.85)';

  const cardSurfaceBorder = isRed
    ? '1px solid rgba(255, 255, 255, 0.12)'
    : '1px solid rgba(229, 224, 209, 0.8)';

  const pillBg = isRed
    ? 'rgba(255, 255, 255, 0.12)'
    : 'rgba(35, 38, 47, 0.06)';

  const pillBorder = isRed
    ? '1px solid rgba(255, 255, 255, 0.18)'
    : '1px solid rgba(35, 38, 47, 0.1)';

  const pillText = isRed ? '#ffffff' : '#1f2937';

  // Grouped Tech Stack (falls back gracefully to flat list if groups not defined)
  const techGroups = project.techGroups || {
    'Technologies & Architecture': project.tech || [],
  };

  const impactMetrics = project.impactMetrics || [
    { label: 'Scale Metric', value: project.stats },
    { label: 'Architecture', value: project.category },
    { label: 'Timeline', value: project.period },
  ];

  return createPortal(
    <div
      className="project-detail-overlay"
      onWheel={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: isRed ? 'rgba(12, 2, 4, 0.82)' : 'rgba(20, 18, 12, 0.72)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        overflow: 'hidden',
        animation: 'workOverlayFadeIn 0.25s ease-out forwards',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="project-detail-dialog"
        onWheel={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '860px',
          maxHeight: 'min(88vh, 860px)',
          backgroundColor: modalBg,
          borderRadius: '28px',
          border: modalBorder,
          boxShadow: isRed
            ? '0 30px 80px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.15)'
            : '0 30px 80px rgba(60, 50, 20, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8)',
          overflowY: 'auto',
          overflowX: 'hidden',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          display: 'flex',
          flexDirection: 'column',
          animation: 'workHeaderDrop 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Floating Top-Right Close Button */}
        <button
          onClick={onClose}
          className="interactive work-close-button"
          aria-label="Close Case Study"
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            zIndex: 10,
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: isRed ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.88)',
            color: isRed ? '#ffffff' : '#23262f',
            border: isRed ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(0, 0, 0, 0.12)',
            backdropFilter: 'blur(12px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            transition: 'transform 0.25s ease, background-color 0.25s ease',
          }}
        >
          <X size={20} strokeWidth={2.2} />
        </button>

        {/* 1. HERO BANNER */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '260px',
            overflow: 'hidden',
            backgroundColor: isRed ? '#180407' : '#e6dcab',
            flexShrink: 0,
          }}
        >
          {artwork && (
            <img
              src={artwork.url}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          )}

          {/* Liquid gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: isRed
                ? 'linear-gradient(180deg, rgba(20, 5, 8, 0.2) 0%, rgba(28, 8, 12, 0.95) 100%)'
                : 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.95) 100%)',
            }}
          />

          {/* Banner Badges */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '26px',
              right: '26px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  backgroundColor: isRed ? 'rgba(0, 0, 0, 0.65)' : 'rgba(35, 38, 47, 0.85)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              >
                <Sparkles size={12} color={accentColor} />
                {project.category}
              </span>

              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: '999px',
                  backgroundColor: isRed ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.9)',
                  color: titleColor,
                  fontSize: '11px',
                  fontWeight: 700,
                  border: isRed ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(0, 0, 0, 0.1)',
                }}
              >
                {project.highlight}
              </span>

              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: subtitleColor,
                  marginLeft: '4px',
                }}
              >
                • {project.period}
              </span>
            </div>

            <h1
              className="font-heading"
              style={{
                fontSize: 'clamp(22px, 3vw, 32px)',
                fontWeight: 900,
                color: titleColor,
                lineHeight: 1.15,
                margin: '4px 0 0',
                letterSpacing: '-0.02em',
              }}
            >
              {project.title}
            </h1>
          </div>
        </div>

        {/* 2. MAIN DIALOG BODY */}
        <div style={{ padding: '26px 28px 34px', display: 'flex', flexDirection: 'column', gap: '26px' }}>
          
          {/* Tagline */}
          <p
            className="font-heading"
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: accentColor,
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {project.tagline}
          </p>

          {/* Impact Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
            }}
          >
            {impactMetrics.map((stat, sIdx) => (
              <div
                key={sIdx}
                style={{
                  padding: '14px 16px',
                  borderRadius: '16px',
                  backgroundColor: cardSurface,
                  border: cardSurfaceBorder,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: subtitleColor,
                  }}
                >
                  {stat.label}
                </span>
                <span
                  className="font-heading"
                  style={{
                    fontSize: '18px',
                    fontWeight: 900,
                    color: titleColor,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Section: Architectural Mission & Challenge */}
          <div
            style={{
              padding: '20px 22px',
              borderRadius: '20px',
              backgroundColor: cardSurface,
              border: cardSurfaceBorder,
            }}
          >
            <h3
              className="font-heading"
              style={{
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: accentColor,
                margin: '0 0 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Cpu size={16} color={accentColor} />
              The Architectural Challenge & Mission
            </h3>
            <p
              className="font-body"
              style={{
                fontSize: '13.5px',
                lineHeight: 1.65,
                color: bodyTextColor,
                margin: 0,
              }}
            >
              {project.challenge || project.description}
            </p>
          </div>

          {/* Section: Key Engineering Achievements & Technical Highlights */}
          {project.achievements && project.achievements.length > 0 && (
            <div>
              <h3
                className="font-heading"
                style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: accentColor,
                  margin: '0 0 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Layers size={16} color={accentColor} />
                Key Architectural Solutions & Engineering Impact
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {project.achievements.map((ach, aIdx) => (
                  <div
                    key={aIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      backgroundColor: cardSurface,
                      border: cardSurfaceBorder,
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      color={accentColor}
                      style={{ flexShrink: 0, marginTop: '2px' }}
                    />
                    <span
                      className="font-body"
                      style={{
                        fontSize: '13px',
                        lineHeight: 1.6,
                        color: bodyTextColor,
                      }}
                    >
                      {ach}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Categorized Enterprise Tech Stack */}
          <div>
            <h3
              className="font-heading"
              style={{
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: accentColor,
                margin: '0 0 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Server size={16} color={accentColor} />
              Enterprise Architecture & Technology Stack
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.entries(techGroups).map(([groupTitle, items], gIdx) => (
                <div
                  key={gIdx}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '16px',
                    backgroundColor: cardSurface,
                    border: cardSurfaceBorder,
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: subtitleColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    {groupTitle}
                  </span>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {items.map((techItem, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '4px 12px',
                          borderRadius: '999px',
                          backgroundColor: pillBg,
                          color: pillText,
                          border: pillBorder,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dialog Action Footer */}
          <div
            style={{
              paddingTop: '16px',
              borderTop: isRed ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: '11.5px', color: subtitleColor, fontWeight: 600 }}>
              Architecture Case Study • Danish Bilal Ansari
            </span>

            <button
              onClick={onClose}
              className="interactive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                borderRadius: '999px',
                backgroundColor: isRed ? '#ffffff' : '#23262f',
                color: isRed ? '#cd3f3c' : '#ffffff',
                border: 'none',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                transition: 'all 0.25s ease',
              }}
            >
              <ArrowLeft size={14} strokeWidth={2.5} />
              <span>Back to Systems</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
