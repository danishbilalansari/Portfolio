import React, { useState, useEffect } from 'react';
import { X, Cpu, ShieldCheck, Database, Plane, Truck, Landmark, Palette, Lock, SlidersHorizontal, ArrowRight } from 'lucide-react';
import ProjectDetailModal from './ProjectDetailModal';

// Thematic architectural artwork with resilient local assets and SVG fallback for every system
const PROJECT_ARTWORK = {
  airline: {
    url: '/projects/airline.jpg',
    icon: Plane,
    accent: '#0284c7',
    fallbackBg: 'linear-gradient(135deg, #075985 0%, #0369a1 40%, #0c4a6e 100%)',
  },
  auth: {
    url: '/projects/auth.jpg',
    icon: Lock,
    accent: '#06b6d4',
    fallbackBg: 'linear-gradient(135deg, #0e7490 0%, #0891b2 40%, #155e75 100%)',
  },
  articheck: {
    url: '/projects/articheck.jpg',
    icon: Palette,
    accent: '#ec4899',
    fallbackBg: 'linear-gradient(135deg, #be185d 0%, #9d174d 40%, #831843 100%)',
  },
  logistics: {
    url: '/projects/logistics.jpg',
    icon: Truck,
    accent: '#ea580c',
    fallbackBg: 'linear-gradient(135deg, #c2410c 0%, #9a3412 40%, #7c2d12 100%)',
  },
  banking: {
    url: '/projects/banking.jpg',
    icon: Landmark,
    accent: '#10b981',
    fallbackBg: 'linear-gradient(135deg, #047857 0%, #065f46 40%, #064e3b 100%)',
  },
  autoweb: {
    url: '/projects/autoweb.jpg',
    icon: Cpu,
    accent: '#3b82f6',
    fallbackBg: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #1e40af 100%)',
  },
  compliance: {
    url: '/projects/compliance.jpg',
    icon: ShieldCheck,
    accent: '#8b5cf6',
    fallbackBg: 'linear-gradient(135deg, #6d28d9 0%, #5b21b6 40%, #4c1d95 100%)',
  },
  sanctions: {
    url: '/projects/sanctions.jpg',
    icon: Database,
    accent: '#f59e0b',
    fallbackBg: 'linear-gradient(135deg, #b45309 0%, #92400e 40%, #78350f 100%)',
  },
  autotms: {
    url: '/projects/autotms.jpg',
    icon: SlidersHorizontal,
    accent: '#64748b',
    fallbackBg: 'linear-gradient(135deg, #334155 0%, #475569 40%, #1e293b 100%)',
  },
};

// All 9 projects in chronological order: latest to oldest with deep architecture case study specs
const ALL_PROJECTS = [
  {
    id: 'airline',
    title: 'GNG Airline Reservation System',
    tagline: 'High-Scale Group Flight Reservation Microservices',
    highlight: 'Calrom • Production Airline System',
    category: 'Aviation',
    period: '2024 – Present',
    description:
      'High-throughput distributed flight booking infrastructure migrated from legacy monolith to modern .NET Aspire microservices. Features automated PNR processing, Hangfire background ticketing robots, and RabbitMQ/MassTransit asynchronous queue pipelines.',
    tech: ['.Net Aspire', 'RabbitMQ', 'MassTransit', 'Hangfire', 'Docker', 'Redis', 'NUnit', 'Moq'],
    stats: '10M+ Bookings',
    challenge:
      'Migrating a legacy monolithic group flight reservation platform into modern cloud-ready microservices without risking transaction failures or booking downtime during peak international travel seasons.',
    achievements: [
      'Decomposed monolithic ticketing services into autonomous .NET Aspire microservices following Clean Architecture boundaries.',
      'Designed asynchronous PNR creation and ticket issuing workflows with RabbitMQ and MassTransit publish-subscribe pipelines.',
      'Implemented Hangfire background worker robots to reliably handle automated batch ticketing, status polling, and retry queues.',
      'Integrated Redis distributed caching for live flight inventory and route pricing, slashing primary database query latency by over 60%.',
      'Wrote comprehensive unit and integration test suites using NUnit and Moq to achieve rigorous regression stability.',
    ],
    techGroups: {
      'Microservices & Core': ['.Net Aspire', '.NET 8', 'C#', 'Clean Architecture'],
      'Message Queuing': ['RabbitMQ', 'MassTransit', 'Event-Driven Sagas'],
      'Background Jobs & Cache': ['Hangfire', 'Redis Distributed Cache'],
      'Testing & DevOps': ['Docker', 'NUnit', 'Moq', 'CI/CD Pipelines'],
    },
    impactMetrics: [
      { label: 'Bookings Handled', value: '10M+ Bookings' },
      { label: 'Architecture', value: '.NET Aspire Mesh' },
      { label: 'Latency Cut', value: '60%+ via Redis' },
    ],
  },
  {
    id: 'auth',
    title: 'Groups Authentication Authority',
    tagline: 'Centralized OAuth & Identity Token Service',
    highlight: 'Calrom • Security Infrastructure',
    category: 'Aviation',
    period: '2024',
    description:
      'Secure distributed authentication and authorization microservice for airline multi-tenant operations. Orchestrated with RabbitMQ message streams, role-based access policies, and encrypted identity assertion tokens.',
    tech: ['.Net Core', 'MassTransit', 'RabbitMQ', 'OAuth / JWT', 'Redis', 'Clean Architecture'],
    stats: 'Enterprise Auth',
    challenge:
      'Establishing a centralized, zero-trust identity and token verification authority across distributed multi-tenant airline group booking services with sub-millisecond response guarantees.',
    achievements: [
      'Architected centralized OAuth 2.0 and JWT token authority service providing zero-trust identity validation across all microservices.',
      'Built granular Role-Based Access Control (RBAC) and claim-based security policies for strict multi-tenant tenant isolation.',
      'Implemented real-time token revocation pipelines using RabbitMQ broadcast streams to instantly invalidate compromised sessions.',
      'Integrated high-speed cryptographic signature verification with Redis token blacklisting for low-latency authentication.',
    ],
    techGroups: {
      'Security & Protocols': ['OAuth 2.0', 'JWT Tokens', 'RBAC', 'Zero-Trust Identity'],
      'Backend Framework': ['.Net Core', 'C#', 'Clean Architecture', 'WebAPI'],
      'Messaging & Caching': ['RabbitMQ', 'MassTransit', 'Redis Token Blacklist'],
      'Database': ['SQL Server', 'Encrypted Secrets Vault'],
    },
    impactMetrics: [
      { label: 'Security Scope', value: 'Enterprise SSO' },
      { label: 'Auth Latency', value: '< 5ms Verification' },
      { label: 'Isolation', value: 'Multi-Tenant' },
    ],
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
    challenge:
      'Creating a globally unified, museum-grade condition reporting and forensic annotation platform capable of tracking high-resolution physical condition logs of high-value artworks across auction houses and museum galleries.',
    achievements: [
      'Engineered an interactive image annotation canvas allowing conservators to mark tears, restorations, and micro-flaws directly onto high-res artwork photographs.',
      'Built an automated PDF generation engine rendering official provenance certificates and museum-grade condition reports.',
      'Developed secure cloud RESTful APIs synchronizing field inspection tablet reports with web dashboards in real-time.',
      'Engineered role-based permission tiers across conservators, couriers, auction houses, and fine-art insurance adjusters.',
    ],
    techGroups: {
      'Frontend & Canvas': ['Angular', 'HTML5 Canvas', 'Interactive Image Annotation'],
      'Backend Services': ['C#', '.Net Core', 'RESTful Cloud APIs'],
      'Document Generation': ['PDF Rendering Engine', 'High-Res Image Processing'],
      'Cloud & Storage': ['Cloud Blob Storage', 'SQL Server'],
    },
    impactMetrics: [
      { label: 'Market Standard', value: 'Global Fine Art' },
      { label: 'Reports Certified', value: '100k+ Certified' },
      { label: 'Precision', value: 'Micro-Forensics' },
    ],
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
    challenge:
      'Handling nationwide fleet telematics, dynamic multi-stop LTL (Less-Than-Truckload) load consolidation, and driver settlements across tens of thousands of active commercial freight vehicles simultaneously.',
    achievements: [
      'Designed complex consolidation algorithms to merge multi-stop LTL shipments onto single long-haul trailers, reducing empty miles.',
      'Built real-time carrier telemetry ingestion and GPS geofence triggers for automated load pickup and delivery tracking.',
      'Implemented automated document extraction pipelines for bills of lading (BOL), weight slips, and proof-of-delivery receipts.',
      'Engineered distributed SQL Server indexing and query caching to maintain instantaneous response times for nationwide dispatchers.',
    ],
    techGroups: {
      'Core Systems': ['.Net Core', 'C#', 'Distributed Architecture'],
      'Algorithms & GIS': ['LTL Route Consolidation', 'GPS Geofencing', 'Telematics'],
      'Data & Storage': ['SQL Server', 'Azure Blob Storage', 'Distributed Cache'],
      'API Integration': ['REST APIs', 'EDI Protocols', 'Carrier Portals'],
    },
    impactMetrics: [
      { label: 'Fleet Capacity', value: '15,000+ Trucks' },
      { label: 'Routing Engine', value: 'Dynamic LTL' },
      { label: 'Settlement', value: 'Automated Invoicing' },
    ],
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
    challenge:
      'Delivering an enterprise-grade mobile banking experience meeting severe banking compliance regulations, instant 1Link inter-bank funds transfers (IBFT), and bulletproof biometric security.',
    achievements: [
      'Implemented multi-factor authentication incorporating biometric fingerprint / Face ID tokens and time-based OTP challenges.',
      'Integrated 1Link IBFT inter-bank settlement protocols enabling instant 24/7 funds transfers, utility payments, and cardless withdrawals.',
      'Developed end-to-end payload encryption and certificate pinning to guard against tampering, man-in-the-middle attacks, and replay vulnerabilities.',
      'Designed fault-tolerant ledger reconciliation workflows ensuring transaction state consistency and zero duplicate ledger debits.',
    ],
    techGroups: {
      'Mobile & Services': ['Xamarin', 'C#', 'ASP.NET WebAPI'],
      'Banking Standards': ['1Link IBFT Protocol', 'Utility Aggregation APIs'],
      'Security': ['Biometric Authentication', 'AES Payload Encryption', 'Tokenization'],
      'Ledger': ['SQL Server Transaction Engine', 'Audit Trails'],
    },
    impactMetrics: [
      { label: 'Deployment', value: 'Tier-1 Commercial' },
      { label: 'Settlements', value: 'Real-Time IBFT' },
      { label: 'Security', value: 'Biometric 2FA' },
    ],
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
    challenge:
      'Empowering corporate banking clients to schedule and execute high-throughput batch payments, utility distributions, and multi-tier payroll disbursements with rigid maker-checker authorization protocols.',
    achievements: [
      'Engineered high-throughput financial transaction processing pipelines utilizing ASP.NET MVC and secure WCF / SOAP endpoints.',
      'Implemented multi-tier authorization workflows requiring maker-checker approvals before releasing high-value corporate disbursements.',
      'Built high-capacity batch reconciliation modules to ingest and parse multi-thousand-row utility, broadband, and salary payment files.',
      'Developed complete regulatory audit logging with non-repudiation guarantees for central bank compliance inspection.',
    ],
    techGroups: {
      'Architecture': ['ASP.NET MVC', 'C#', 'Enterprise Architecture'],
      'Protocols': ['WCF / SOAP', 'IBFT Protocol', 'Corporate WebAPI'],
      'Database & Security': ['SQL Server', 'Maker-Checker Workflows', 'Audit Vault'],
    },
    impactMetrics: [
      { label: 'Protocol', value: 'Multi-Bank Gateway' },
      { label: 'Governance', value: 'Maker-Checker' },
      { label: 'Disbursements', value: 'High-Volume Batch' },
    ],
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
    challenge:
      'Evaluating massive streams of daily banking transactions in real-time to detect structured deposits, smurfing, layering, and suspicious patterns mandated by Anti-Money Laundering (AML) regulatory frameworks.',
    achievements: [
      'Engineered a high-speed heuristic rule engine evaluating transaction frequency, velocity spikes, and structured threshold evasions.',
      'Automated the compilation and submission of Suspicious Transaction Reports (STR) and Currency Transaction Reports (CTR) for financial intelligence units.',
      'Optimized batch data pipelines capable of processing millions of branch transactions within compact nocturnal processing windows.',
      'Constructed dynamic risk-scoring algorithms categorizing customer profiles into low, medium, and high AML surveillance tiers.',
    ],
    techGroups: {
      'Detection Engine': ['C#', 'Heuristic Rule Engine', 'Complex Event Processing'],
      'Analytics & DB': ['High-Speed SQL Pipelines', 'Risk Matrix Scoring'],
      'Regulatory': ['AML Compliance', 'STR / CTR Reporting', 'Audit Analytics'],
    },
    impactMetrics: [
      { label: 'Rule Precision', value: '99.98% Accuracy' },
      { label: 'Reporting', value: 'Automated STR/CTR' },
      { label: 'Processing', value: 'Multi-Million Feeds' },
    ],
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
    challenge:
      'Screening counterparties and beneficiaries in real-time against frequently updated international sanctions lists (UN, OFAC SDN, EU) with tolerance for aliases, phonetic variations, and typographical errors.',
    achievements: [
      'Implemented Jaro-Winkler, Levenshtein, and phonetic fuzzy logic algorithms to identify sanctioned individuals and entities despite intentional alias obfuscation.',
      'Automated daily delta ingestion pipelines updating watchlists directly from UN, OFAC, and European Union sanctions repositories.',
      'Engineered low-latency in-memory lookup indexes allowing live transaction checks to complete in under 15 milliseconds.',
      'Built an intuitive investigation workspace enabling compliance officers to adjudicate matches and maintain transparent resolution audit trails.',
    ],
    techGroups: {
      'Algorithms': ['Jaro-Winkler', 'Levenshtein Fuzzy Logic', 'Phonetic Matching'],
      'Backend & Processing': ['.Net Core', 'ETL Pipelines', 'Delta Sync'],
      'Data Store': ['Optimized Sanctions Database', 'Indexed Watchlists'],
    },
    impactMetrics: [
      { label: 'Entity Database', value: '500k+ Watchlist' },
      { label: 'Lookup Speed', value: '< 15ms Response' },
      { label: 'Coverage', value: 'UN • OFAC • EU' },
    ],
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
    challenge:
      'Guaranteeing strict Service-Level Agreement (SLA) governance, automatic incident escalations, and rapid issue resolution for enterprise banking software rollouts across nationwide branches.',
    achievements: [
      'Constructed automated escalation matrix timers that elevate unresolved defects to engineering leads based on customer severity tiers.',
      'Integrated SOAP web services and lightweight asynchronous scripts for rapid ticket creation and live status dashboard telemetry.',
      'Built role-based assignment algorithms mapping software defects directly to specialized module development squads.',
      'Developed comprehensive SLA reporting metrics calculating Mean Time to Detect (MTTD) and Mean Time to Resolve (MTTR).',
    ],
    techGroups: {
      'Platform Core': ['.Net Framework', 'C#', 'WinForms / WebForms'],
      'Services & Scripting': ['SOAP Web Services', 'AJAX', 'XML Data Exchange'],
      'Database & Triggers': ['SQL Server', 'Escalation Triggers', 'SLA Engine'],
    },
    impactMetrics: [
      { label: 'Governance', value: 'Core SLA Engine' },
      { label: 'Escalation', value: '100% Automated' },
      { label: 'Workflow', value: 'Multi-Tenant Bank' },
    ],
  },
];

export default function WorkModal({ isOpen, onClose, frameTheme = 'yellow' }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const isRed = frameTheme === 'red';

  // Always reset filter to 'All' when modal is opened
  useEffect(() => {
    if (isOpen) {
      setSelectedFilter('All');
      setImageErrors({});
      setActiveProjectModal(null);
    }
  }, [isOpen]);

  // Keyboard shortcut: close detail modal first, then close work modal on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeProjectModal) {
          setActiveProjectModal(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeProjectModal, onClose]);

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

  const filterCategories = ['All', 'FinTech', 'Aviation', 'Logistics'];

  const filteredProjects =
    selectedFilter === 'All'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => {
          if (selectedFilter === 'Aviation') {
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
  const tagColor = isRed ? '#D99070' : '#92400e';

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
  const cardHighlightColor = isRed ? '#D99070' : '#92400e';

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

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
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
        overflowY: activeProjectModal ? 'hidden' : 'auto',
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
          filter: 'blur(40px)',
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

            return (
              <div
                key={`${selectedFilter}-${p.id}`}
                onClick={() => setActiveProjectModal(p)}
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
                  cursor: 'pointer',
                  // Crisp, Snappy Bottom-to-Top Trampoline Pop-Up Launch
                  animation: `workCardBounceUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both`,
                  animationDelay: `${0.04 + idx * 0.045}s`,
                  transformOrigin: 'center center',
                }}
              >
                {/* 1. TOP HEADER: High-Impact Visual Banner */}
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
                      opacity: imageErrors[p.id] ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <IconComponent size={40} strokeWidth={1.5} color="#ffffff" style={{ opacity: 0.8 }} />
                    <span style={{ fontSize: '10.5px', color: '#ffffff', letterSpacing: '0.12em', fontWeight: 600 }}>
                      System Telemetry
                    </span>
                  </div>

                  {/* Primary High-Resolution Architecture Artwork */}
                  {!imageErrors[p.id] && (
                    <img
                      src={artwork.url}
                      alt={p.title}
                      decoding="async"
                      onLoad={() => handleImageLoad(p.id)}
                      onError={() => handleImageError(p.id)}
                      ref={(el) => {
                        if (el && el.complete && el.naturalWidth > 0 && !imagesLoaded[p.id]) {
                          handleImageLoad(p.id);
                        }
                      }}
                      className="work-card-img"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        opacity: 1,
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  )}

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

                  {/* Tech Stack Pills & Integrated Read More Trigger */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '8px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          gap: '6px',
                          flex: 1,
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

                      {/* Integrated Read More Pill aligned to right side */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProjectModal(p);
                        }}
                        className="interactive font-heading"
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: '999px',
                          backgroundColor: isRed ? 'rgba(255, 255, 255, 0.22)' : '#23262f',
                          color: '#ffffff',
                          border: isRed ? '1px solid rgba(255, 255, 255, 0.35)' : 'none',
                          letterSpacing: '0.02em',
                          textTransform: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          cursor: 'pointer',
                          flexShrink: 0,
                          marginLeft: 'auto',
                          alignSelf: 'flex-end',
                          whiteSpace: 'nowrap',
                          fontFamily: 'inherit',
                          outline: 'none',
                        }}
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture Case Study Detail Dialog */}
      <ProjectDetailModal
        project={activeProjectModal}
        isOpen={Boolean(activeProjectModal)}
        onClose={() => setActiveProjectModal(null)}
        frameTheme={frameTheme}
        artwork={activeProjectModal ? (PROJECT_ARTWORK[activeProjectModal.id] || PROJECT_ARTWORK.airline) : null}
      />
    </div>
  );
}
