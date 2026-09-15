import React from "react";

export default function Footer() {
  const socials = [
    { 
      label: "Facebook", 
      url: "https://www.facebook.com/iss.nacionales",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    },
    { 
      label: "Instagram", 
      url: "https://www.instagram.com/isz.uh/",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.3" cy="6.7" r="1" />
        </svg>
      )
    },
    { 
      label: "TikTok", 
      url: "https://www.tiktok.com/@isz.flow",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M16.5 3c.4 2.2 1.9 3.9 4.5 4.1v3.1c-1.6.1-3-.4-4.5-1.3v6.6c0 3.6-2.9 6.5-6.5 6.5S3.5 19.1 3.5 15.5 6.4 9 10 9c.4 0 .7 0 1 .1v3.2c-.3-.1-.6-.2-1-.2-1.8 0-3.3 1.5-3.3 3.4S8.2 18.9 10 18.9s3.3-1.5 3.3-3.4V3h3.2z" />
        </svg>
      )
    },
    { 
      label: "Email", 
      url: "mailto:servanoissah@gmail.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      )
    },
  ];

  return (
    <footer id="contact" className="py-12 border-t border-[var(--divider)]">
      <div className="wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10" id="footer-container">
        
        {/* Left Branding */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-1" id="footer-branding">
          <span className="logo font-display font-extrabold uppercase text-[#111111] text-[18px] tracking-tight" id="footer-logo">
            ISSAH
          </span>
          <span className="text-[11px] font-mono tracking-widest text-[var(--ink-faint)] uppercase whitespace-normal md:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap" id="footer-tagline">
            Content Creator · Graphic Designer · Video Editor
          </span>
        </div>

        {/* Center Socials with matching icons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6" id="footer-socials">
          {socials.map((s) => (
            <a 
              key={s.label}
              href={s.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-2 text-xs font-sans font-light uppercase tracking-widest text-[var(--ink-dim)] hover:text-[#111111] transition-all duration-200"
              id={`footer-social-${s.label.toLowerCase()}`}
            >
              <span className="text-[var(--ink-faint)] group-hover:text-[#111111] group-hover:scale-110 transition-all duration-200 flex items-center justify-center">
                {s.icon}
              </span>
              <span>{s.label}</span>
              <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[10px] text-[var(--ink-faint)] group-hover:text-[#111111]">↗</span>
            </a>
          ))}
        </div>

        {/* Right Copyright */}
        <div className="footer-copy text-[11px] font-mono uppercase tracking-widest text-[var(--ink-faint)] text-center lg:text-right whitespace-nowrap" id="footer-copyright">
          © 2026 Issah. Media kit reserved.
        </div>

      </div>
    </footer>
  );
}
