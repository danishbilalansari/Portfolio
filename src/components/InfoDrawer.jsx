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

export default function InfoDrawer({ activeSection, onClose }) {
  if (!activeSection) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(26, 25, 23, 0.28)',
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
          backgroundColor: 'rgba(252, 246, 226, 0.94)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '-16px 0 45px rgba(50, 40, 20, 0.15)',
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
            borderBottom: '1px solid rgba(26, 25, 23, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#8c877b',
              }}
            >
              DIRECTORY //
            </span>
            <span
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#23262f',
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
              background: 'rgba(26, 25, 23, 0.06)',
              border: 'none',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#23262f',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(26, 25, 23, 0.14)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(26, 25, 23, 0.06)';
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
          {activeSection === 'WORK' && <WorkSection />}
          {activeSection === 'ABOUT' && <AboutSection />}
          {activeSection === 'CONTACT' && <ContactSection />}
        </div>
      </aside>
    </div>
  );
}

// --- WORK SECTION (FEATURED SYSTEMS) ---
function WorkSection() {
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
            color: '#8c877b',
          }}
        >
          FLAGSHIP PROJECTS
        </span>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#23262f',
            marginTop: '4px',
          }}
        >
          Architected Systems
        </h2>
        <p style={{ fontSize: '14px', color: '#666157', marginTop: '6px' }}>
          Mission-critical distributed systems, microservices, and FinTech infrastructures built over a decade of engineering.
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
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.85)',
              boxShadow: '0 4px 18px rgba(60, 50, 20, 0.04)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(60, 50, 20, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.65)';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(60, 50, 20, 0.04)';
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
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#23262f' }}>
                {s.title}
              </h3>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#8c877b',
                  letterSpacing: '0.04em',
                }}
              >
                {s.highlight}
              </span>
            </div>

            <p style={{ fontSize: '13px', color: '#4d4a43', lineHeight: 1.5, marginBottom: '14px' }}>
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
                    backgroundColor: 'rgba(26, 25, 23, 0.06)',
                    color: '#2b2926',
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
function AboutSection() {
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
                color: '#8c877b',
              }}
            >
              PROFESSIONAL PROFILE
            </span>
            <h2
              className="font-heading"
              style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#23262f',
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
              backgroundColor: '#23262f',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>DOWNLOAD PDF</span>
            <ExternalLink size={12} />
          </a>
        </div>

        <p className="font-body" style={{ fontSize: '13.5px', color: '#575c69', marginTop: '10px', lineHeight: 1.65 }}>
          Seasoned Lead .NET Software Engineer with over a decade of industry experience architecting scalable distributed systems, microservices, and high-frequency transaction applications across <strong>Airline Ticketing</strong>, <strong>Logistics</strong>, and <strong>FinTech Core Banking</strong>.
        </p>
      </div>

      {/* Education & Credentials */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: '14px',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(35, 38, 47, 0.08)',
          boxShadow: '0 4px 16px rgba(35, 38, 47, 0.04)',
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#888f9e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
          EDUCATION
        </div>
        <div className="font-heading" style={{ fontSize: '15px', fontWeight: 800, color: '#23262f' }}>
          MS Computer Science
        </div>
        <div className="font-body" style={{ fontSize: '12.5px', color: '#575c69', marginTop: '2px' }}>
          Virtual University of Pakistan
        </div>
      </div>

      {/* Skills Matrix */}
      <div>
        <h3 className="font-heading" style={{ fontSize: '14px', fontWeight: 800, color: '#23262f', marginBottom: '12px' }}>
          Technical Stack & Arsenal
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              style={{
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.85)',
              }}
            >
              <div className="font-heading" style={{ fontSize: '11px', fontWeight: 800, color: '#23262f', marginBottom: '8px' }}>
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
                      backgroundColor: 'rgba(35, 38, 47, 0.06)',
                      color: '#23262f',
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
        <h3 className="font-heading" style={{ fontSize: '14px', fontWeight: 800, color: '#23262f', marginBottom: '14px' }}>
          Career Trajectory (2013 – Present)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px',
                borderRadius: '14px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div className="font-heading" style={{ fontSize: '13.5px', fontWeight: 800, color: '#23262f' }}>
                  {exp.role} • <span style={{ color: '#575c69' }}>{exp.company}</span>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#888f9e' }}>
                  {exp.period}
                </div>
              </div>
              <ul style={{ margin: '10px 0 0 16px', padding: 0, fontSize: '12px', color: '#575c69', lineHeight: 1.55 }}>
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
function ContactSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#8c877b',
          }}
        >
          GET IN TOUCH
        </span>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#23262f',
            marginTop: '4px',
          }}
        >
          Let's Build Together
        </h2>
        <p style={{ fontSize: '14px', color: '#666157', marginTop: '6px', lineHeight: 1.6 }}>
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
            backgroundColor: '#ffffff',
            border: '1px solid rgba(26, 25, 23, 0.08)',
            textDecoration: 'none',
            color: '#23262f',
            boxShadow: '0 4px 16px rgba(60, 50, 20, 0.06)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(60, 50, 20, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(60, 50, 20, 0.06)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(26, 25, 23, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mail size={20} color="#23262f" />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#8c877b', textTransform: 'uppercase' }}>
                Email
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>danishbilalansari@gmail.com</div>
            </div>
          </div>
          <ExternalLink size={16} color="#8c877b" />
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
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            textDecoration: 'none',
            color: '#23262f',
            boxShadow: '0 4px 16px rgba(60, 50, 20, 0.04)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            e.currentTarget.style.transform = 'translateY(0px)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(26, 25, 23, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LinkedinIcon size={20} color="#0077b5" />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#8c877b', textTransform: 'uppercase' }}>
                LinkedIn
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>danish-bilal-ansari</div>
            </div>
          </div>
          <ExternalLink size={16} color="#8c877b" />
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
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            textDecoration: 'none',
            color: '#23262f',
            boxShadow: '0 4px 16px rgba(60, 50, 20, 0.04)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            e.currentTarget.style.transform = 'translateY(0px)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(26, 25, 23, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GithubIcon size={20} color="#23262f" />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#8c877b', textTransform: 'uppercase' }}>
                GitHub
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>danishbilalansari</div>
            </div>
          </div>
          <ExternalLink size={16} color="#8c877b" />
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
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            textDecoration: 'none',
            color: '#23262f',
            boxShadow: '0 4px 16px rgba(60, 50, 20, 0.04)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            e.currentTarget.style.transform = 'translateY(0px)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(26, 25, 23, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Briefcase size={20} color="#23262f" />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#8c877b', textTransform: 'uppercase' }}>
                Phone / Mobile
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>+92 331 4313183</div>
            </div>
          </div>
          <ExternalLink size={16} color="#8c877b" />
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
            backgroundColor: '#23262f',
            textDecoration: 'none',
            color: '#ffffff',
            boxShadow: '0 6px 20px rgba(35, 38, 47, 0.15)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={20} color="#f8eec1" />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#f8eec1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Official Resume
              </div>
              <div className="font-heading" style={{ fontSize: '14px', fontWeight: 800 }}>Download PDF (Latest)</div>
            </div>
          </div>
          <ExternalLink size={16} color="#f8eec1" />
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
          backgroundColor: 'rgba(26, 25, 23, 0.04)',
          color: '#55524b',
          fontSize: '13px',
          fontWeight: 500,
        }}
      >
        <MapPin size={16} color="#8c877b" />
        <span>Based in Lahore, Pakistan • Open to Global Remote Leadership</span>
      </div>
    </div>
  );
}
