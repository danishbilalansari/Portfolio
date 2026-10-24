import React from 'react';
import {
  X,
  ExternalLink,
  Mail,
  Briefcase,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

function GithubIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function InfoDrawer({ activeSection, onClose, frameTheme = 'yellow' }) {
  if (!activeSection) return null;

  const isRed = frameTheme === 'red';

  const overlayBg = isRed ? 'rgba(20, 5, 6, 0.45)' : 'rgba(26, 25, 23, 0.28)';
  const drawerBg = isRed ? 'rgba(182, 44, 42, 0.96)' : 'rgba(252, 246, 226, 0.94)';
  const drawerBorderLeft = isRed ? '1px solid rgba(255, 255, 255, 0.28)' : '1px solid rgba(255, 255, 255, 0.8)';
  const drawerShadow = isRed ? '-16px 0 50px rgba(0, 0, 0, 0.45)' : '-16px 0 45px rgba(50, 40, 20, 0.15)';
  const headerBorder = isRed ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(26, 25, 23, 0.08)';
  const dirColor = isRed ? 'rgba(255, 255, 255, 0.65)' : '#8c877b';
  const sectionTitleColor = isRed ? '#ffffff' : '#23262f';
  const closeBtnBg = isRed ? 'rgba(255, 255, 255, 0.14)' : 'rgba(26, 25, 23, 0.06)';
  const closeBtnHoverBg = isRed ? 'rgba(255, 255, 255, 0.25)' : 'rgba(26, 25, 23, 0.14)';
  const closeBtnColor = isRed ? '#ffffff' : '#23262f';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: overlayBg,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'opacity 0.35s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside
        style={{
          width: 'min(90vw, 560px)',
          height: '100%',
          backgroundColor: drawerBg,
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderLeft: drawerBorderLeft,
          boxShadow: drawerShadow,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: headerBorder,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: dirColor,
              }}
            >
              DIRECTORY //
            </span>
            <span
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: sectionTitleColor,
                letterSpacing: '0.08em',
              }}
            >
              [{activeSection}]
            </span>
          </div>

          <button
            onClick={onClose}
            className="interactive"
            style={{
              background: closeBtnBg,
              border: 'none',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: closeBtnColor,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = closeBtnHoverBg;
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = closeBtnBg;
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Close"
          >
            <X size={18} strokeWidth={2.4} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          {activeSection === 'WORK' && <WorkSection frameTheme={frameTheme} />}
          {activeSection === 'ABOUT' && <AboutSection frameTheme={frameTheme} />}
          {activeSection === 'CONTACT' && <ContactSection frameTheme={frameTheme} />}
        </div>
      </aside>
    </div>
  );
}

// --- WORK SECTION (FEATURED SYSTEMS) ---
function WorkSection({ frameTheme = 'yellow' }) {
  const isRed = frameTheme === 'red';
  const sublabelColor = isRed ? '#D99070' : '#8c877b';
  const headingColor = isRed ? '#ffffff' : '#23262f';
  const descColor = isRed ? 'rgba(255, 255, 255, 0.85)' : '#666157';

  const cardBg = isRed ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.65)';
  const cardHoverBg = isRed ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.95)';
  const cardBorder = isRed ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid rgba(255, 255, 255, 0.85)';
  const cardShadow = isRed ? '0 8px 24px rgba(0, 0, 0, 0.18)' : '0 4px 18px rgba(60, 50, 20, 0.04)';
  const cardHoverShadow = isRed ? '0 12px 30px rgba(0, 0, 0, 0.28)' : '0 10px 24px rgba(60, 50, 20, 0.08)';

  const cardTitleColor = isRed ? '#ffffff' : '#23262f';
  const cardHighlightColor = isRed ? '#D99070' : '#8c877b';
  const cardDescColor = isRed ? 'rgba(255, 255, 255, 0.88)' : '#4d4a43';

  const pillBg = isRed ? 'rgba(255, 255, 255, 0.18)' : 'rgba(26, 25, 23, 0.06)';
  const pillColor = isRed ? '#ffffff' : '#2b2926';
  const pillBorder = isRed ? '1px solid rgba(255, 255, 255, 0.2)' : 'none';

  const systems = [
    {
      title: 'GNG Airline Ticketing System',
      tagline: 'High-Scale Group Reservation Microservices',
      description:
        'Group airline ticket booking platform transitioned from monolithic to distributed microservices architecture, boosting transaction throughput, reliability, and automated ticket issuance.',
      tech: ['.NET Aspire', 'RabbitMQ', 'MassTransit', 'Docker', 'Redis', 'Hangfire'],
      highlight: 'Calrom • Production Airline System',
    },
    {
      title: 'LoadStop TMS Logistics',
      tagline: 'Intelligent Freight & Dispatch Management',
      description:
        'Comprehensive freight and trucking application simplifying load dispatch, multi-stop LTL trip consolidation, driver tracking, and high-volume automated batch settlements.',
      tech: ['.NET Core', 'SQL Server', 'LTL Algorithms', 'Distributed Cache'],
      highlight: 'TekHQS • Enterprise Fleet Ops',
    },
    {
      title: 'AutoMobile FinTech App',
      tagline: 'Secure Core Banking Transaction Suite',
      description:
        'Customer-facing digital banking mobile application with biometric token authentication, real-time IBFT fund transfers, bill pay aggregations, and high-frequency transaction security.',
      tech: ['Xamarin', 'WebAPI', 'Biometric Auth', 'IBFT Banking API'],
      highlight: 'AutoSoft Dynamics • Live Commercial Banking',
    },
    {
      title: 'AutoCOMPLIANCE AML Engine',
      tagline: 'Rule-Based Financial Crime Detection',
      description:
        'High-performance anti-money laundering and transaction monitoring engine running heuristics to detect suspicious fund movements and pattern anomalies in financial networks.',
      tech: ['Rule Engine', 'Fraud Detection', 'SQL Analytics', 'C#'],
      highlight: 'AutoSoft Dynamics • Regulatory FinTech',
    },
    {
      title: 'BESS Sanction Screening',
      tagline: 'Fuzzy Logic Global Entity Matching',
      description:
        'Specialized sanction screening engine employing advanced fuzzy logic algorithms to identify specially designated nationals (SDN) and sanctioned entities across global regulatory watchlists.',
      tech: ['Fuzzy Logic', 'Data Mining', '.NET Core', 'Sanctions DB'],
      highlight: 'FinTech Compliance',
    },
    {
      title: 'Articheck Cloud SaaS',
      tagline: 'Fine Art Condition & Workflow Platform',
      description:
        'Global digital condition reporting and image annotation platform for high-value artwork, condition documentation, and auction house workflow automation.',
      tech: ['Image Processing', 'Workflow Ops', 'Remote Lead', 'SaaS'],
      highlight: 'Articheck • Global Art Market',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: sublabelColor,
          }}
        >
          FLAGSHIP PROJECTS
        </span>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: headingColor,
            marginTop: '4px',
          }}
        >
          Architected Systems
        </h2>
        <p style={{ fontSize: '14px', color: descColor, marginTop: '6px' }}>
          Mission-critical distributed systems, microservices, and FinTech infrastructures built over 13+ years of engineering.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {systems.map((s, idx) => (
          <div
            key={idx}
            className="interactive"
            style={{
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: cardBg,
              border: cardBorder,
              boxShadow: cardShadow,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = cardHoverBg;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = cardHoverShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = cardBg;
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = cardShadow;
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '4px',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: cardTitleColor }}>
                {s.title}
              </h3>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: cardHighlightColor,
                  letterSpacing: '0.04em',
                }}
              >
                {s.highlight}
              </span>
            </div>

            <p style={{ fontSize: '13px', color: cardDescColor, lineHeight: 1.5, marginBottom: '14px' }}>
              {s.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {s.tech.map((t, tidx) => (
                <span
                  key={tidx}
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '999px',
                    backgroundColor: pillBg,
                    color: pillColor,
                    border: pillBorder,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- ABOUT SECTION (CAREER & EXPERTISE FROM RESUME) ---
function AboutSection({ frameTheme = 'yellow' }) {
  const isRed = frameTheme === 'red';
  const sublabelColor = isRed ? '#D99070' : '#8c877b';
  const headingColor = isRed ? '#ffffff' : '#23262f';
  const descColor = isRed ? 'rgba(255, 255, 255, 0.85)' : '#575c69';

  const downloadBtnBg = isRed ? '#ffffff' : '#23262f';
  const downloadBtnColor = isRed ? '#cd3f3c' : '#ffffff';

  const eduCardBg = isRed ? 'rgba(255, 255, 255, 0.12)' : '#ffffff';
  const eduCardBorder = isRed ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid rgba(35, 38, 47, 0.08)';
  const eduLabelColor = isRed ? '#D99070' : '#888f9e';
  const eduDegreeColor = isRed ? '#ffffff' : '#23262f';
  const eduUnivColor = isRed ? 'rgba(255, 255, 255, 0.8)' : '#575c69';

  const skillCardBg = isRed ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.6)';
  const skillCardBorder = isRed ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid rgba(255, 255, 255, 0.85)';
  const skillCardTitleColor = isRed ? '#ffffff' : '#23262f';
  const skillTagBg = isRed ? 'rgba(255, 255, 255, 0.18)' : 'rgba(35, 38, 47, 0.06)';
  const skillTagColor = isRed ? '#ffffff' : '#23262f';
  const skillTagBorder = isRed ? '1px solid rgba(255, 255, 255, 0.2)' : 'none';

  const expCardBg = isRed ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.7)';
  const expCardBorder = isRed ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid rgba(255, 255, 255, 0.9)';
  const expRoleColor = isRed ? '#ffffff' : '#23262f';
  const expCompanyColor = isRed ? 'rgba(255, 255, 255, 0.8)' : '#575c69';
  const expPeriodColor = isRed ? '#D99070' : '#888f9e';
  const expPointColor = isRed ? 'rgba(255, 255, 255, 0.85)' : '#575c69';

  const experiences = [
    {
      role: 'Lead .Net Developer',
      company: 'Calrom, Lahore',
      period: 'Mar 2024 – Present',
      points: [
        'Lead developer on GNG (Group Next Gen), an enterprise airline group ticket booking platform.',
        'Direct development and enhancement of GNG, focusing on self-service policy management.',
        'Modernized existing ticketing robot service to integrate Hangfire for efficient background job processing.',
        'Engineered messaging queues using RabbitMQ and MassTransit in Groups-Authentication and GNG projects.',
        'Built functional and unit tests with NUnit and MoQ; provided continuous mentorship to junior engineers.',
      ],
    },
    {
      role: 'Lead Developer',
      company: 'Articheck (Remote)',
      period: 'Dec 2022 – Mar 2024',
      points: [
        'Managed a team of developers to add high-performance image annotation and artwork condition reporting.',
        'Integrated with core databases for workflow simplification and process standardization.',
        'Conducted weekly sprints, documented business processes, managed ticket backlogs, and updated scope with QA.',
      ],
    },
    {
      role: 'Principal .Net Engineer',
      company: 'TekHQS, Lahore',
      period: 'Mar 2022 – Dec 2022',
      points: [
        'Engineered LoadStop, a comprehensive, fully integrated truck freight management platform.',
        'Developed simplified load dispatch, multi-stop LTL trip consolidation, and document management.',
        'Engineered automated batch settlements (company, owner, partner) and optimized database transactions.',
      ],
    },
    {
      role: 'Principal Software Engineer',
      company: 'AutoSoft Dynamics (Pvt) Ltd',
      period: 'May 2013 – Mar 2022 (9 Years)',
      points: [
        'AutoMobile: Built mobile banking app with biometric authentication (token & fingerprint), IBFT fund transfers, bill payments, and SMS/Email APIs.',
        'AutoCOMPLIANCE: Built financial crime compliance engine with rule-based transaction analysis and suspicious behavior detection.',
        'AutoWEB: Implemented electronic bill payments against Telecom/Utilities, IBFT transfers, and cheque book management.',
        'BESS: Developed sanction screening tool using fuzzy logic matching against global SDN and blocked persons lists.',
        'AutoTMS: Developed bug-tracking and SLA ticketing system with SOAP-based web services.',
      ],
    },
  ];

  const skillCategories = [
    {
      title: 'Backend & Core Frameworks',
      skills: ['.Net Core', '.Net MVC', 'ASP.NET Boilerplate', 'C#', 'EF / EF Core', 'WCF / SOAP', 'WebAPI', 'LINQ', 'AutoMapper', 'SignalR', 'gRPC', 'CQRS'],
    },
    {
      title: 'Cloud, Queues & Background Jobs',
      skills: ['Azure Functions', 'Azure Storage', 'RabbitMQ', 'MassTransit', 'Hangfire', 'Docker', 'Redis', 'NUnit', 'Moq', 'Git'],
    },
    {
      title: 'Databases & Architecture',
      skills: ['SQL Server', 'PostgreSQL', 'Microservices', 'Clean Architecture', 'SOLID Principles', 'Repository Pattern', 'FinTech Protocols'],
    },
    {
      title: 'Frontend & Mobile',
      skills: ['Angular 14/15', 'Angular Material', 'React', 'TypeScript', 'JavaScript', 'Xamarin (Cross-Platform)', 'Bootstrap', 'JQuery', 'HTML5/CSS3'],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: sublabelColor,
              }}
            >
              PROFESSIONAL PROFILE
            </span>
            <h2
              className="font-heading"
              style={{
                fontSize: '24px',
                fontWeight: 800,
                color: headingColor,
                marginTop: '4px',
              }}
            >
              Danish Bilal
            </h2>
          </div>

          <a
            href="/Danish Bilal - Resume.pdf"
            download
            className="interactive font-heading"
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              backgroundColor: downloadBtnBg,
              color: downloadBtnColor,
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: isRed ? '0 4px 14px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            <span>DOWNLOAD PDF</span>
            <ExternalLink size={12} />
          </a>
        </div>

        <p className="font-body" style={{ fontSize: '13.5px', color: descColor, marginTop: '10px', lineHeight: 1.65 }}>
          Seasoned Lead .NET Software Engineer with 13+ years of industry experience architecting scalable distributed systems, microservices, and high-frequency transaction applications across <strong style={{ color: headingColor }}>Airline Ticketing</strong>, <strong style={{ color: headingColor }}>Logistics</strong>, and <strong style={{ color: headingColor }}>FinTech Core Banking</strong>.
        </p>
      </div>

      {/* Education & Credentials */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: '14px',
          backgroundColor: eduCardBg,
          border: eduCardBorder,
          boxShadow: isRed ? '0 4px 18px rgba(0, 0, 0, 0.16)' : '0 4px 16px rgba(35, 38, 47, 0.04)',
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 700, color: eduLabelColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
          EDUCATION
        </div>
        <div className="font-heading" style={{ fontSize: '15px', fontWeight: 800, color: eduDegreeColor }}>
          MS Computer Science
        </div>
        <div className="font-body" style={{ fontSize: '12.5px', color: eduUnivColor, marginTop: '2px' }}>
          Virtual University of Pakistan
        </div>
      </div>

      {/* Skills Matrix */}
      <div>
        <h3 className="font-heading" style={{ fontSize: '14px', fontWeight: 800, color: headingColor, marginBottom: '12px' }}>
          Technical Stack & Arsenal
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              style={{
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: skillCardBg,
                border: skillCardBorder,
              }}
            >
              <div className="font-heading" style={{ fontSize: '11px', fontWeight: 800, color: skillCardTitleColor, marginBottom: '8px' }}>
                {cat.title}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {cat.skills.map((s, sidx) => (
                  <span
                    key={sidx}
                    className="font-body"
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      backgroundColor: skillTagBg,
                      color: skillTagColor,
                      border: skillTagBorder,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div>
        <h3 className="font-heading" style={{ fontSize: '14px', fontWeight: 800, color: headingColor, marginBottom: '14px' }}>
          Career Trajectory (2013 – Present)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px',
                borderRadius: '14px',
                backgroundColor: expCardBg,
                border: expCardBorder,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div className="font-heading" style={{ fontSize: '13.5px', fontWeight: 800, color: expRoleColor }}>
                  {exp.role} • <span style={{ color: expCompanyColor }}>{exp.company}</span>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: expPeriodColor }}>
                  {exp.period}
                </div>
              </div>
              <ul style={{ margin: '10px 0 0 16px', padding: 0, fontSize: '12px', color: expPointColor, lineHeight: 1.55 }}>
                {exp.points.map((pt, pidx) => (
                  <li key={pidx} style={{ marginBottom: '5px' }}>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- CONTACT SECTION ---
function ContactSection({ frameTheme = 'yellow' }) {
  const isRed = frameTheme === 'red';
  const sublabelColor = isRed ? '#D99070' : '#8c877b';
  const headingColor = isRed ? '#ffffff' : '#23262f';
  const descColor = isRed ? 'rgba(255, 255, 255, 0.85)' : '#666157';

  const cardBg = isRed ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.7)';
  const cardHoverBg = isRed ? 'rgba(255, 255, 255, 0.22)' : '#ffffff';
  const cardBorder = isRed ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid rgba(255, 255, 255, 0.9)';
  const cardShadow = isRed ? '0 8px 24px rgba(0, 0, 0, 0.18)' : '0 4px 16px rgba(60, 50, 20, 0.04)';

  const iconBoxBg = isRed ? 'rgba(255, 255, 255, 0.18)' : 'rgba(26, 25, 23, 0.05)';
  const iconColor = isRed ? '#ffffff' : '#23262f';
  const labelColor = isRed ? '#D99070' : '#8c877b';
  const valColor = isRed ? '#ffffff' : '#23262f';
  const arrowColor = isRed ? 'rgba(255, 255, 255, 0.75)' : '#8c877b';

  const resumeCardBg = isRed ? '#ffffff' : '#23262f';
  const resumeCardColor = isRed ? '#cd3f3c' : '#ffffff';
  const resumeTagColor = isRed ? '#cd3f3c' : '#f8eec1';
  const resumeIconBg = isRed ? 'rgba(205, 63, 60, 0.12)' : 'rgba(255, 255, 255, 0.12)';
  const resumeIconColor = isRed ? '#cd3f3c' : '#f8eec1';

  const locationBg = isRed ? 'rgba(255, 255, 255, 0.12)' : 'rgba(26, 25, 23, 0.04)';
  const locationColor = isRed ? 'rgba(255, 255, 255, 0.88)' : '#55524b';
  const locationIconColor = isRed ? '#D99070' : '#8c877b';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: sublabelColor,
          }}
        >
          GET IN TOUCH
        </span>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: headingColor,
            marginTop: '4px',
          }}
        >
          Let's Build Together
        </h2>
        <p style={{ fontSize: '14px', color: descColor, marginTop: '6px', lineHeight: 1.6 }}>
          Available for technical leadership, enterprise systems architecture, and consulting engagements.
        </p>
      </div>

      {/* Contact Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <a
          href="mailto:danishbilalansari@gmail.com"
          className="interactive"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 22px',
            borderRadius: '16px',
            backgroundColor: isRed ? 'rgba(255, 255, 255, 0.14)' : '#ffffff',
            border: isRed ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid rgba(26, 25, 23, 0.08)',
            textDecoration: 'none',
            color: valColor,
            boxShadow: cardShadow,
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isRed ? 'rgba(255, 255, 255, 0.22)' : '#ffffff';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = isRed ? '0 12px 30px rgba(0,0,0,0.28)' : '0 8px 24px rgba(60, 50, 20, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isRed ? 'rgba(255, 255, 255, 0.14)' : '#ffffff';
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = cardShadow;
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: iconBoxBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mail size={20} color={iconColor} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: labelColor, textTransform: 'uppercase' }}>
                Email
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>danishbilalansari@gmail.com</div>
            </div>
          </div>
          <ExternalLink size={16} color={arrowColor} />
        </a>

        <a
          href="https://linkedin.com/in/danish-bilal-ansari-5596a1b3"
          target="_blank"
          rel="noopener noreferrer"
          className="interactive"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 22px',
            borderRadius: '16px',
            backgroundColor: cardBg,
            border: cardBorder,
            textDecoration: 'none',
            color: valColor,
            boxShadow: cardShadow,
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = cardHoverBg;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = isRed ? '0 12px 30px rgba(0,0,0,0.28)' : '0 8px 24px rgba(60, 50, 20, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = cardBg;
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = cardShadow;
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: iconBoxBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LinkedinIcon size={20} color={isRed ? '#ffffff' : '#0077b5'} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: labelColor, textTransform: 'uppercase' }}>
                LinkedIn
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>danish-bilal-ansari</div>
            </div>
          </div>
          <ExternalLink size={16} color={arrowColor} />
        </a>

        <a
          href="https://github.com/danishbilalansari"
          target="_blank"
          rel="noopener noreferrer"
          className="interactive"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 22px',
            borderRadius: '16px',
            backgroundColor: cardBg,
            border: cardBorder,
            textDecoration: 'none',
            color: valColor,
            boxShadow: cardShadow,
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = cardHoverBg;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = isRed ? '0 12px 30px rgba(0,0,0,0.28)' : '0 8px 24px rgba(60, 50, 20, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = cardBg;
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = cardShadow;
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: iconBoxBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GithubIcon size={20} color={iconColor} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: labelColor, textTransform: 'uppercase' }}>
                GitHub
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>danishbilalansari</div>
            </div>
          </div>
          <ExternalLink size={16} color={arrowColor} />
        </a>

        {/* Phone Card */}
        <a
          href="tel:+923314313183"
          className="interactive"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 22px',
            borderRadius: '16px',
            backgroundColor: cardBg,
            border: cardBorder,
            textDecoration: 'none',
            color: valColor,
            boxShadow: cardShadow,
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = cardHoverBg;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = isRed ? '0 12px 30px rgba(0,0,0,0.28)' : '0 8px 24px rgba(60, 50, 20, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = cardBg;
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = cardShadow;
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: iconBoxBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Briefcase size={20} color={iconColor} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: labelColor, textTransform: 'uppercase' }}>
                Phone / Mobile
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>+92 331 4313183</div>
            </div>
          </div>
          <ExternalLink size={16} color={arrowColor} />
        </a>

        {/* Resume Download Card */}
        <a
          href="/Danish Bilal - Resume.pdf"
          download
          className="interactive"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 22px',
            borderRadius: '16px',
            backgroundColor: resumeCardBg,
            textDecoration: 'none',
            color: resumeCardColor,
            boxShadow: isRed ? '0 10px 30px rgba(0,0,0,0.35)' : '0 6px 20px rgba(35, 38, 47, 0.15)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = isRed ? '0 14px 36px rgba(0,0,0,0.45)' : '0 8px 26px rgba(35, 38, 47, 0.22)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = isRed ? '0 10px 30px rgba(0,0,0,0.35)' : '0 6px 20px rgba(35, 38, 47, 0.15)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: resumeIconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={20} color={resumeIconColor} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: resumeTagColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Official Resume
              </div>
              <div className="font-heading" style={{ fontSize: '14px', fontWeight: 800 }}>Download PDF (Latest)</div>
            </div>
          </div>
          <ExternalLink size={16} color={resumeIconColor} />
        </a>
      </div>

      {/* Location Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '14px 18px',
          borderRadius: '12px',
          backgroundColor: locationBg,
          color: locationColor,
          fontSize: '13px',
          fontWeight: 500,
        }}
      >
        <MapPin size={16} color={locationIconColor} />
        <span>Based in Lahore, Pakistan • Open to Global Remote Leadership</span>
      </div>
    </div>
  );
}
