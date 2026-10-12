import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function HeroContent({ onOpenSection, frameTheme = 'yellow' }) {
  const isRed = frameTheme === 'red';
  const headingColor = isRed ? '#ffffff' : '#23262f';
  const subtextColor = isRed ? 'rgba(255, 255, 255, 0.82)' : 'rgba(35, 38, 47, 0.72)';
  const bioColor = isRed ? 'rgba(255, 255, 255, 0.88)' : 'rgba(35, 38, 47, 0.78)';
  const circleBtnBorder = isRed ? 'rgba(255, 255, 255, 0.4)' : 'rgba(35, 38, 47, 0.35)';

  return (
    <>
      {/* 1. TOP-LEFT EDITORIAL HEADLINE: Matches "SOURCE OF BOLD IDEAS/" */}
      <div
        style={{
          position: 'absolute',
          top: '90px',
          left: '4.5vw',
          zIndex: 40,
          pointerEvents: 'none',
          maxWidth: '220px',
        }}
      >
        <h2
          className="font-heading"
          style={{
            fontSize: '17px',
            lineHeight: 1.15,
            fontWeight: 900,
            color: headingColor,
            marginBottom: '10px',
            letterSpacing: '-0.02em',
            transition: 'color 0.4s ease',
          }}
        >
          SOURCE OF<br />
          ENTERPRISE<br />
          SOLUTIONS/
        </h2>
        <p
          className="font-body"
          style={{
            fontSize: '11px',
            lineHeight: 1.45,
            color: subtextColor,
            fontWeight: 400,
            transition: 'color 0.4s ease',
          }}
        >
          Where complex systems scale seamlessly and boundaries are erased
        </p>
      </div>

      {/* 2. TOP-RIGHT MASSIVE EDITORIAL HEADLINE: Matches "CREATIVE BRANDING AGENCY" */}
      <div
        style={{
          position: 'absolute',
          top: '90px',
          right: '4.5vw',
          zIndex: 40,
          pointerEvents: 'none',
          textAlign: 'left',
          maxWidth: '560px',
        }}
      >
        <h1
          className="font-heading"
          style={{
            fontSize: 'clamp(46px, 5.8vw, 78px)',
            lineHeight: 0.95,
            fontWeight: 900,
            color: headingColor,
            letterSpacing: '-0.04em',
            margin: '0 0 45px 0',
            transition: 'color 0.4s ease',
          }}
        >
          LEAD .NET<br />
          SOLUTIONS<br />
          ARCHITECT
        </h1>

        {/* Narrative bio + circular arrow button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '22px' }}>
          <p
            className="font-body"
            style={{
              maxWidth: '300px',
              fontSize: '11.5px',
              lineHeight: 1.5,
              color: bioColor,
              fontWeight: 400,
              transition: 'color 0.4s ease',
            }}
          >
            I craft <strong style={{ color: headingColor }}>distributed microservices</strong> and robust systems with .NET Core, Azure, and event-driven architectures that scale.
          </p>

          {/* Minimal round arrow button */}
          <button
            onClick={() => onOpenSection && onOpenSection('WORK')}
            className="interactive"
            aria-label="View Systems"
            style={{
              pointerEvents: 'auto',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: `1.2px solid ${circleBtnBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: headingColor,
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isRed ? '#ffffff' : '#23262f';
              e.currentTarget.style.color = isRed ? '#cd3f3c' : '#ffffff';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = headingColor;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ArrowUpRight size={18} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* 3. BOTTOM-LEFT DUAL FLOATING CARDS: Matches "85% Brands that lead forward" and "Reload your brand" */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '4.5vw',
          zIndex: 40,
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'stretch',
          gap: '12px',
        }}
      >
        {/* Card 1: Matches White "85%" card */}
        <div
          onClick={() => onOpenSection && onOpenSection('ABOUT')}
          className="interactive"
          style={{
            width: '145px',
            height: '145px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 14px 30px rgba(0, 0, 0, 0.14)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {/* 4 dots icon */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 4px)', gap: '2px', paddingTop: '2px' }}>
              <span style={{ width: '4px', height: '4px', backgroundColor: '#23262f', borderRadius: '1px' }} />
              <span style={{ width: '4px', height: '4px', backgroundColor: '#23262f', borderRadius: '1px' }} />
              <span style={{ width: '4px', height: '4px', backgroundColor: '#23262f', borderRadius: '1px' }} />
              <span style={{ width: '4px', height: '4px', backgroundColor: '#23262f', borderRadius: '1px' }} />
            </div>
            <span
              className="font-body"
              style={{
                fontSize: '9px',
                fontWeight: 600,
                color: '#575c69',
                textAlign: 'right',
                lineHeight: 1.25,
                maxWidth: '65px',
              }}
            >
              Systems that lead forward
            </span>
          </div>

          <div>
            <div
              className="font-heading"
              style={{
                fontSize: '34px',
                lineHeight: 0.9,
                fontWeight: 900,
                color: '#23262f',
                letterSpacing: '-0.04em',
                marginBottom: '8px',
              }}
            >
              10+<span style={{ fontSize: '18px' }}>Y</span>
            </div>
            <div
              className="font-body"
              style={{
                fontSize: '9px',
                color: '#575c69',
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              Industry architecture
            </div>
          </div>
        </div>

        {/* Card 2: Matches Dark "Reload your brand" card */}
        <div
          onClick={() => onOpenSection && onOpenSection('WORK')}
          className="interactive"
          style={{
            width: '145px',
            height: '145px',
            backgroundColor: '#23262f',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            border: isRed ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span
              className="font-heading"
              style={{
                fontSize: '11px',
                fontWeight: 800,
                lineHeight: 1.2,
                color: '#ffffff',
                textTransform: 'none',
              }}
            >
              Scale<br />your system
            </span>
            <span style={{ fontSize: '12px', color: '#ffffff' }}>★</span>
          </div>

          <div
            className="font-body"
            style={{
              fontSize: '9px',
              color: 'rgba(255, 255, 255, 0.65)',
              lineHeight: 1.35,
            }}
          >
            We build resilient distributed microservices built to grow and perform
          </div>
        </div>
      </div>

      {/* 4. BOTTOM-RIGHT CAPSULE PILLS */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          right: '4.5vw',
          zIndex: 40,
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Active dot pill: BRANDING style */}
          <button
            onClick={() => onOpenSection && onOpenSection('WORK')}
            className="interactive font-heading"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: isRed ? '#ffffff' : '#23262f',
              color: isRed ? '#23262f' : '#ffffff',
              border: 'none',
              padding: '7px 16px',
              borderRadius: '999px',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: isRed ? '#cd3f3c' : '#ef4444',
              }}
            />
            <span>.NET CORE 8</span>
          </button>

          {/* Pill 2: MICROSERVICES */}
          <button
            onClick={() => onOpenSection && onOpenSection('WORK')}
            className="interactive font-heading"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: isRed ? 'rgba(255, 255, 255, 0.15)' : 'rgba(35, 38, 47, 0.05)',
              color: isRed ? '#ffffff' : '#23262f',
              border: isRed ? '1.2px solid rgba(255, 255, 255, 0.35)' : '1.2px solid rgba(35, 38, 47, 0.18)',
              padding: '7px 16px',
              borderRadius: '999px',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: isRed ? 'blur(10px)' : 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isRed
                ? 'rgba(255, 255, 255, 0.25)'
                : 'rgba(35, 38, 47, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isRed
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(35, 38, 47, 0.05)';
            }}
          >
            MICROSERVICES
          </button>

          {/* Pill 3: AZURE CLOUD */}
          <button
            onClick={() => onOpenSection && onOpenSection('WORK')}
            className="interactive font-heading"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: isRed ? 'rgba(255, 255, 255, 0.15)' : 'rgba(35, 38, 47, 0.05)',
              color: isRed ? '#ffffff' : '#23262f',
              border: isRed ? '1.2px solid rgba(255, 255, 255, 0.35)' : '1.2px solid rgba(35, 38, 47, 0.18)',
              padding: '7px 16px',
              borderRadius: '999px',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: isRed ? 'blur(10px)' : 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isRed
                ? 'rgba(255, 255, 255, 0.25)'
                : 'rgba(35, 38, 47, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isRed
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(35, 38, 47, 0.05)';
            }}
          >
            AZURE CLOUD
          </button>
        </div>

        {/* Second row: SOLUTIONS STRATEGY */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => onOpenSection && onOpenSection('CONTACT')}
            className="interactive font-heading"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'transparent',
              color: isRed ? '#ffffff' : '#23262f',
              border: isRed ? '1.2px solid rgba(255, 255, 255, 0.45)' : '1.2px solid rgba(35, 38, 47, 0.28)',
              padding: '6px 20px',
              borderRadius: '999px',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isRed ? '#ffffff' : '#23262f';
              e.currentTarget.style.color = isRed ? '#cd3f3c' : '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = isRed ? '#ffffff' : '#23262f';
            }}
          >
            SOLUTIONS STRATEGY
          </button>
        </div>
      </div>
    </>
  );
}
