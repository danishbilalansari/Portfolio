import React, { useState, useEffect } from 'react';
import { X, Cpu, ShieldCheck, Database, Plane, Truck, Landmark, Palette, Lock, SlidersHorizontal } from 'lucide-react';

// Thematic architectural artwork with resilient SVG fallback for every system
const PROJECT_ARTWORK = {
  airline: {
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=900&auto=format&fit=crop',
    icon: Plane,
    accent: '#0284c7',
    fallbackBg: 'linear-gradient(135deg, #075985 0%, #0369a1 40%, #0c4a6e 100%)',
  },
  auth: {
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=900&auto=format&fit=crop',
    icon: Lock,
    accent: '#06b6d4',
    fallbackBg: 'linear-gradient(135deg, #0e7490 0%, #0891b2 40%, #155e75 100%)',
  },
  articheck: {
    url: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=900&auto=format&fit=crop',
    icon: Palette,
    accent: '#ec4899',
    fallbackBg: 'linear-gradient(135deg, #be185d 0%, #9d174d 40%, #831843 100%)',
  },
  logistics: {
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=900&auto=format&fit=crop',
    icon: Truck,
    accent: '#ea580c',
    fallbackBg: 'linear-gradient(135deg, #c2410c 0%, #9a3412 40%, #7c2d12 100%)',
  },
  banking: {
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=900&auto=format&fit=crop',
    icon: Landmark,
    accent: '#10b981',
    fallbackBg: 'linear-gradient(135deg, #047857 0%, #065f46 40%, #064e3b 100%)',
  },
  autoweb: {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop',
    icon: Cpu,
    accent: '#3b82f6',
    fallbackBg: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #1e40af 100%)',
  },
  compliance: {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop',
    icon: ShieldCheck,
    accent: '#8b5cf6',
    fallbackBg: 'linear-gradient(135deg, #6d28d9 0%, #5b21b6 40%, #4c1d95 100%)',
  },
  sanctions: {
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=900&auto=format&fit=crop',
    icon: Database,
    accent: '#f59e0b',
    fallbackBg: 'linear-gradient(135deg, #b45309 0%, #92400e 40%, #78350f 100%)',
  },
  autotms: {
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=900&auto=format&fit=crop',
    icon: SlidersHorizontal,
    accent: '#64748b',
    fallbackBg: 'linear-gradient(135deg, #334155 0%, #475569 40%, #1e293b 100%)',
  },
};

// All 9 projects in chronological order: latest to oldest
const ALL_PROJECTS = [
  {
    id: 'airline',
    title: 'GNG Airline Reservation System',
    tagline: 'High-Scale Group Flight Reservation Microservices',
    highlight: 'Calrom • Production Airline System',
    category: 'Airline',
    period: '2024 – Present',
    description:
      'High-throughput distributed flight booking infrastructure migrated from legacy monolith to modern .NET Aspire microservices. Features automated PNR processing, Hangfire background ticketing robots, and RabbitMQ/MassTransit asynchronous queue pipelines.',
    tech: ['.Net Aspire', 'RabbitMQ', 'MassTransit', 'Hangfire', 'Docker', 'Redis', 'NUnit', 'Moq'],
    stats: '10M+ Bookings',
  },
  {
    id: 'auth',
    title: 'Groups Authentication Authority',
    tagline: 'Centralized OAuth & Identity Token Service',
    highlight: 'Calrom • Security Infrastructure',
    category: 'Airline',
    period: '2024',
    description:
      'Secure distributed authentication and authorization microservice for airline multi-tenant operations. Orchestrated with RabbitMQ message streams, role-based access policies, and encrypted identity assertion tokens.',
    tech: ['.Net Core', 'MassTransit', 'RabbitMQ', 'OAuth / JWT', 'Redis', 'Clean Architecture'],
    stats: 'Enterprise Auth',
  },
  {
    id: 'articheck',
    title: 'Articheck Condition Platform',
    tagline: 'Digital Artwork Condition & Provenance Forensics',
    highlight: 'Articheck • Global Art Market',
    category: 'Cloud Platform',
    period: '2022 – 2024',
    description:
      'Global digital condition reporting and image annotation platform for high-value artwork, museum conservation workflows, and international auction houses.',
    tech: ['C#', '.Net Core', 'Angular', 'Image Processing', 'Workflow Engine', 'Cloud APIs'],
    stats: 'Auction Standard',
  },
  {
    id: 'logistics',
    title: 'LoadStop Freight Logistics TMS',
    tagline: 'Nationwide Fleet Dispatch & LTL Trip Consolidation',
    highlight: 'TekHQS • Nationwide Fleet Logistics',
    category: 'Logistics',
    period: '2022',
    description:
      'Fully integrated transportation management system (TMS) handling nationwide carrier telemetry, dynamic multi-stop LTL freight routing, accessories document management, and automated batch settlements.',
    tech: ['.Net Core', 'SQL Server', 'LTL Algorithms', 'Distributed Cache', 'Azure Storage', 'REST APIs'],
    stats: '15,000+ Trucks',
  },
  {
    id: 'banking',
    title: 'AutoMobile Digital Banking Suite',
    tagline: 'Customer-Centric Core Banking Mobile Engine',
    highlight: 'AutoSoft Dynamics • Live Commercial Banking',
    category: 'FinTech',
    period: 'Commercial Banking',
    description:
      'Enterprise-grade mobile banking platform featuring dual-factor biometric token & fingerprint authentication, real-time IBFT inter-bank funds settlements, bill payment aggregations, and high-volume transaction security.',
    tech: ['Xamarin', 'WebAPI', 'Biometric Auth', 'IBFT Banking API', 'C#', 'SQL Server'],
    stats: 'Live Banking Grade',
  },
  {
    id: 'autoweb',
    title: 'AutoWEB Financial Transaction Portal',
    tagline: 'High-Throughput Web Financial Transaction Engine',
    highlight: 'AutoSoft Dynamics • Corporate Banking',
    category: 'FinTech',
    period: 'Corporate FinTech',
    description:
      'Mission-critical corporate banking web portal empowering customers to execute real-time utility, telecom, and broadband settlements, manage cheque books and loan workflows, and process multi-tier corporate disbursements.',
    tech: ['ASP.NET MVC', 'C#', 'WCF / SOAP', 'SQL Server', 'IBFT Protocol', 'WebAPI'],
    stats: 'Multi-Bank Protocol',
  },
  {
    id: 'compliance',
    title: 'AutoCOMPLIANCE Anti-Money Laundering Engine',
    tagline: 'Rule-Based Anti-Money Laundering Detection',
    highlight: 'AutoSoft Dynamics • Regulatory FinTech',
    category: 'FinTech',
    period: 'Regulatory Compliance',
    description:
      'Central data processing engine executing complex heuristic rule sets over live transaction streams to detect structured deposits, layering, velocity anomalies, and financial crime patterns in real-time.',
    tech: ['C#', 'Rule Engine', 'Fraud Heuristics', 'SQL Analytics', 'High-Speed Pipeline'],
    stats: '99.98% Precision',
  },
  {
    id: 'sanctions',
    title: 'BESS Global Sanction Screening',
    tagline: 'Fuzzy Logic Global Watchlist & SDN Matching',
    highlight: 'AutoSoft Dynamics • International Compliance',
    category: 'FinTech',
    period: 'Global Watchlists',
    description:
      'High-speed regulatory compliance intelligence engine utilizing Jaro-Winkler fuzzy logic algorithms to identify specially designated nationals (SDN) and sanctioned entities across UN, OFAC, and EU watchlists.',
    tech: ['Fuzzy Logic Algorithms', 'Data Mining', '.Net Core', 'Sanctions DB', 'Reporting Engine'],
    stats: '500k+ Entity Search',
  },
  {
    id: 'autotms',
    title: 'AutoTMS Service-Level Agreement Platform',
    tagline: 'Task Escalation & SLA Severity Priority Platform',
    highlight: 'AutoSoft Dynamics • FinTech Operations',
    category: 'FinTech',
    period: 'FinTech Operations',
    description:
      'Mission-critical defect tracking and SLA governance infrastructure. Integrated SOAP web services, role allocations, module mappings, and minified scripts for accelerated response times across enterprise banking rollouts.',
    tech: ['.Net Framework', 'SOAP Web Services', 'WinForms / WebForms', 'SQL Server', 'AJAX'],
    stats: 'Core SLA Engine',
  },
];

export default function WorkModal({ isOpen, onClose, frameTheme = 'yellow' }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [imagesLoaded, setImagesLoaded] = useState({});

  const isRed = frameTheme === 'red';

  // Keyboard shortcut: close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filterCategories = ['All', 'Airline', 'FinTech', 'Logistics'];

  const filteredProjects =
    selectedFilter === 'All'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => {
          if (selectedFilter === 'Airline') {
            return p.id === 'airline' || p.id === 'auth';
          }
          if (selectedFilter === 'FinTech') {
            return p.category === 'FinTech' || p.id === 'autotms';
          }
          return p.category.toLowerCase() === selectedFilter.toLowerCase();
        });

  // Theme-aware palette
  const overlayBg = isRed
    ? 'rgba(26, 6, 8, 0.72)'
    : 'rgba(248, 238, 193, 0.65)';

  const headerTitleColor = isRed ? '#ffffff' : '#23262f';
  const subtitleColor = isRed ? 'rgba(255, 255, 255, 0.82)' : '#575246';
  const tagColor = isRed ? '#fde047' : '#92400e';

  const cardBg = isRed
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(255, 255, 255, 0.68)';

  const cardBorder = isRed
    ? '1px solid rgba(255, 255, 255, 0.22)'
    : '1px solid rgba(255, 255, 255, 0.85)';

  const cardShadow = isRed
    ? '0 18px 45px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)'
    : '0 18px 45px rgba(70, 60, 30, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.95)';

  const cardTitleColor = isRed ? '#ffffff' : '#23262f';
  const cardDescColor = isRed ? 'rgba(255, 255, 255, 0.82)' : '#4a463f';
  const cardHighlightColor = isRed ? '#fde047' : '#92400e';

  const pillBg = isRed
    ? 'rgba(255, 255, 255, 0.18)'
    : 'rgba(26, 25, 23, 0.05)';

  const pillColor = isRed ? '#ffffff' : '#23262f';
  const pillBorder = isRed ? '1px solid rgba(255, 255, 255, 0.28)' : '1px solid rgba(26, 25, 23, 0.1)';

  const closeBtnBg = isRed
    ? 'rgba(255, 255, 255, 0.16)'
    : 'rgba(255, 255, 255, 0.88)';

  const closeBtnColor = isRed ? '#ffffff' : '#23262f';

  const handleImageLoad = (id) => {
    setImagesLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div
      className="work-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 85,
        backgroundColor: overlayBg,
        backdropFilter: 'blur(32px) saturate(190%)',
        WebkitBackdropFilter: 'blur(32px) saturate(190%)',
        overflowY: 'auto',
        overflowX: 'hidden',
        animation: 'workOverlayFadeIn 0.35s ease-out forwards',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Background Ambient Radial Highlights for Liquid Glass Depth */}
      <div
        style={{
          position: 'fixed',
          top: '12%',
          left: '12%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: isRed
            ? 'radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(250, 204, 21, 0.35) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '8%',
          right: '10%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: isRed
            ? 'radial-gradient(circle, rgba(255, 120, 50, 0.22) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(217, 119, 6, 0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Floating Top-Right Cross Button (Fixed in Corner, Hover Animation) */}
      <button
        onClick={onClose}
        className="interactive work-close-button"
        aria-label="Close"
        style={{
          position: 'fixed',
          top: '28px',
          right: 'max(20px, 3.2vw)',
          zIndex: 95,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: closeBtnBg,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: isRed ? '1px solid rgba(255, 255, 255, 0.35)' : '1px solid rgba(255, 255, 255, 0.95)',
          boxShadow: isRed
            ? '0 8px 24px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.5)'
            : '0 8px 24px rgba(0, 0, 0, 0.1), inset 0 1px 1px #ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: closeBtnColor,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease',
        }}
      >
        <X size={20} strokeWidth={2.4} />
      </button>

      {/* Main Content Area */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1800px',
          width: '100%',
          margin: '0 auto',
          padding: '48px max(24px, 3.2vw) 100px max(24px, 3.2vw)',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            marginBottom: '38px',
            animation: 'workHeaderDrop 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span
              className="font-heading"
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.14em',
                color: tagColor,
                textTransform: 'none',
              }}
            >
              Enterprise Engineering
            </span>
            <span
              style={{
                fontSize: '10.5px',
                fontWeight: 700,
                padding: '2px 9px',
                borderRadius: '999px',
                backgroundColor: pillBg,
                color: pillColor,
                border: pillBorder,
                letterSpacing: '0.04em',
              }}
            >
              9 Flagship Systems
            </span>
          </div>

          <div
            className="work-modal-header-row"
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '24px',
              width: '100%',
            }}
          >
            <div style={{ flex: '1 1 auto', maxWidth: '720px' }}>
              <h1
                className="font-heading"
                style={{
                  fontSize: 'clamp(28px, 3.4vw, 46px)',
                  fontWeight: 900,
                  lineHeight: 1.08,
                  letterSpacing: '-0.03em',
                  color: headerTitleColor,
                  margin: 0,
                  textTransform: 'none',
                }}
              >
                Architected Systems & Platforms
              </h1>
              <p
                className="font-body"
                style={{
                  fontSize: '14px',
                  color: subtitleColor,
                  marginTop: '8px',
                  maxWidth: '620px',
                  lineHeight: 1.5,
                }}
              >
                Production microservices, high-scale logistics architectures, and FinTech core systems built for extreme reliability and enterprise throughput.
              </p>
            </div>

            {/* Filter Pills - Positioned firmly on the right side */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                padding: '4px',
                borderRadius: '999px',
                backgroundColor: isRed ? 'rgba(255, 255, 255, 0.08)' : 'rgba(26, 25, 23, 0.04)',
                border: isRed ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(26, 25, 23, 0.08)',
                backdropFilter: 'blur(16px)',
                flexShrink: 0,
                alignSelf: 'flex-end',
              }}
            >
              {filterCategories.map((cat) => {
                const isActive = selectedFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    className="interactive font-heading"
                    style={{
                      padding: '7px 16px',
                      borderRadius: '999px',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      border: 'none',
                      backgroundColor: isActive
                        ? isRed
                          ? '#ffffff'
                          : '#23262f'
                        : 'transparent',
                      color: isActive
                        ? isRed
                          ? '#cd3f3c'
                          : '#ffffff'
                        : isRed
                          ? 'rgba(255, 255, 255, 0.75)'
                          : 'rgba(35, 38, 47, 0.7)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? '0 4px 14px rgba(0,0,0,0.15)' : 'none',
                      textTransform: 'none',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3 Projects per Row on Desktop with Trampoline Bottom-to-Top Bouncing */}
        <div className="work-projects-grid">
          {filteredProjects.map((p, idx) => {
            const artwork = PROJECT_ARTWORK[p.id] || PROJECT_ARTWORK.airline;
            const IconComponent = artwork.icon || Cpu;
            const isLoaded = imagesLoaded[p.id];

            return (
              <div
                key={`${selectedFilter}-${p.id}`}
                className="interactive work-project-card"
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  backgroundColor: cardBg,
                  border: cardBorder,
                  boxShadow: cardShadow,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'default',
                  // Bottom to Top Trampoline Bouncing Launch on Load
                  animation: `workCardBounceUp 2.2s cubic-bezier(0.22, 0.85, 0.32, 1) both`,
                  animationDelay: `${0.12 + idx * 0.12}s`,
                  transformOrigin: 'center center',
                }}
              >
                {/* 1. TOP HEADER: High-Impact Visual Banner (NO ARROWS) */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '210px',
                    overflow: 'hidden',
                    backgroundColor: isRed ? '#1a0507' : '#e6dcab',
                  }}
                >
                  {/* Fallback Graphic (Always renders underneath so no empty space) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: artwork.fallbackBg,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      opacity: isLoaded ? 0 : 1,
                      transition: 'opacity 0.4s ease',
                    }}
                  >
                    <IconComponent size={40} strokeWidth={1.5} color="#ffffff" style={{ opacity: 0.8 }} />
                    <span style={{ fontSize: '10.5px', color: '#ffffff', letterSpacing: '0.12em', fontWeight: 600 }}>
                      System Telemetry
                    </span>
                  </div>

                  {/* Primary High-Resolution Architecture Artwork */}
                  <img
                    src={artwork.url}
                    alt={p.title}
                    loading="lazy"
                    onLoad={() => handleImageLoad(p.id)}
                    className="work-card-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      opacity: isLoaded ? 1 : 0,
                      transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />

                  {/* Specular Liquid Glass Overlay & Gradient Fade to Card Body */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isRed
                        ? 'linear-gradient(180deg, rgba(20, 5, 8, 0.25) 0%, rgba(20, 5, 8, 0.85) 100%)'
                        : 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.7) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top-Left Client / System Highlight Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '13px',
                      left: '15px',
                      zIndex: 2,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 11px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(0, 0, 0, 0.45)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#ffffff',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: artwork.accent || '#facc15',
                      }}
                    />
                    <span>{p.highlight}</span>
                  </div>

                  {/* Top-Right Live Stats / Scale Badge (Consistent high-contrast styling across all themes) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '13px',
                      right: '15px',
                      zIndex: 2,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      color: '#23262f',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      fontSize: '9.5px',
                      fontWeight: 800,
                      letterSpacing: '0.02em',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    {p.stats}
                  </div>

                  {/* Long-Duration Subtle Specular Glare */}
                  <div
                    className="card-shimmer-sweep"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      pointerEvents: 'none',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.28) 50%, transparent 100%)',
                      animationDelay: `${idx * 0.9}s`,
                    }}
                  />
                </div>

                {/* 2. BOTTOM BODY: Title, Tagline, Description & Stack */}
                <div
                  style={{
                    padding: '22px 22px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Tagline in Pascal Case */}
                    <span
                      className="font-heading"
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 800,
                        letterSpacing: '0.05em',
                        color: cardHighlightColor,
                        display: 'block',
                        marginBottom: '6px',
                        textTransform: 'none',
                      }}
                    >
                      {p.tagline}
                    </span>

                    {/* Title in Pascal Case (NO ARROW) */}
                    <h2
                      className="font-heading"
                      style={{
                        fontSize: '18px',
                        fontWeight: 800,
                        lineHeight: 1.25,
                        letterSpacing: '-0.02em',
                        color: cardTitleColor,
                        margin: '0 0 10px 0',
                        textTransform: 'none',
                      }}
                    >
                      {p.title}
                    </h2>

                    {/* Description */}
                    <p
                      className="font-body"
                      style={{
                        fontSize: '12.5px',
                        lineHeight: 1.55,
                        color: cardDescColor,
                        margin: '0 0 18px 0',
                      }}
                    >
                      {p.description}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                      }}
                    >
                      {p.tech.map((t, tidx) => (
                        <span
                          key={tidx}
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '3px 9px',
                            borderRadius: '999px',
                            backgroundColor: pillBg,
                            color: pillColor,
                            border: pillBorder,
                            letterSpacing: '0.02em',
                            textTransform: 'none',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
