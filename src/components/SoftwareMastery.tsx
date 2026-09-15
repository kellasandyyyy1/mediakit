import React from "react";
import { ArrowUpRight } from "lucide-react";

const PremiereProLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect width="48" height="48" rx="8" fill="#161616" />
    <text x="24" y="31" fill="#FFFFFF" fontSize="18" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Pr</text>
  </svg>
);

const LightroomLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect width="48" height="48" rx="8" fill="#161616" />
    <text x="24" y="31" fill="#FFFFFF" fontSize="18" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Lr</text>
  </svg>
);

const CanvaLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <circle cx="24" cy="24" r="24" fill="url(#canva-grad)" />
    <defs>
      <linearGradient id="canva-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#161616" />
        <stop offset="100%" stopColor="#666666" />
      </linearGradient>
    </defs>
    <path d="M31 16.5C28.5 14.5 24.5 14 21 16.5C16.5 19.5 15.5 26 18.5 30.5C21.5 34.5 27.5 34.5 30.5 31.5C31.2 30.8 30.5 29.8 29.8 30.2C27.5 32 22.5 32 20 29C17.5 25.5 18 20.5 21.5 18.5C24.5 16.5 28 17.5 29.5 19C30 19.5 31 19 31 18.2V16.5Z" fill="white" />
  </svg>
);

const CapCutLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect width="48" height="48" rx="8" fill="#161616" />
    <g transform="translate(10, 10) scale(0.58)">
      <path d="M9.242 0a9.242 9.242 0 0 0-6.19 2.454L1.91 3.513c-.15.152-.162.392-.027.558l.704.86a.434.434 0 0 0 .61.055c.03-.024 1.344-1.127 1.344-1.127a6.046 6.046 0 1 1 0 8.552s-1.314-1.103-1.344-1.127a.434.434 0 0 0-.61.055l-.704.86a.394.394 0 0 0 .027.558l1.14 1.059A9.242 9.242 0 1 0 9.242 0z" fill="#666666" />
      <path d="M14.758 10.19a9.242 9.242 0 0 0-6.19 2.454l-1.14 1.059c-.15.152-.162.392-.027.558l.704.86a.434.434 0 0 0 .61.055c.03-.024 1.344-1.127 1.344-1.127a6.046 6.046 0 1 1 0 8.552s-1.314-1.103-1.344-1.127a.434.434 0 0 0-.61.055l-.704.86a.394.394 0 0 0 .027.558l1.14 1.059a9.242 9.242 0 1 0 6.19-15.344z" fill="#FFFFFF" />
    </g>
  </svg>
);

const AlightMotionLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <circle cx="24" cy="24" r="24" fill="url(#alight-grad)" />
    <defs>
      <linearGradient id="alight-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#161616" />
        <stop offset="50%" stopColor="#444444" />
        <stop offset="100%" stopColor="#888888" />
      </linearGradient>
    </defs>
    <path d="M16 28c0-3.5 2.5-6 6-6h6v-1c0-2-1.5-3.5-3.5-3.5s-3.5 1-3.5 2.5h-3c0-3 2.5-5.5 6.5-5.5s6.5 2.5 6.5 5.5v11.5h-3v-2.5c-1 1.5-2.5 3-5 3-3.5 0-6-2.5-6-6zm12-3.5v-1.5h-6c-2 0-3 1-3 3s1 3 3 3 6-1.5 6-4.5z" fill="white" />
  </svg>
);

export default function SoftwareMastery() {
  const supportingTools = [
    {
      id: "software-lightroom",
      name: "Lightroom",
      logo: <LightroomLogo />,
      desc: "Advanced Color-Grading",
    },
    {
      id: "software-canva",
      name: "Canva",
      logo: <CanvaLogo />,
      desc: "Branding & Layout Design",
    },
    {
      id: "software-capcut",
      name: "CapCut",
      logo: <CapCutLogo />,
      desc: "Viral Reels & Templates",
    },
    {
      id: "software-alight-motion",
      name: "Alight Motion",
      logo: <AlightMotionLogo />,
      desc: "VFX & Motion Graphics",
    }
  ];

  return (
    <section className="software-mastery-section" id="software-mastery" style={{ borderTop: "1px solid var(--divider)", padding: "80px 0 60px" }}>
      <div className="wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between gap-4 mb-8" id="software-mastery-header">
          <h2 id="software-mastery-title" className="text-3xl sm:text-3xl md:text-4xl lg:text-[2.2rem] font-heavy tracking-tighter leading-[0.95] text-[var(--ink)] uppercase">
            Software Mastery
          </h2>
          <div className="w-10 h-10 rounded-full border-[1.5px] border-[#161616] flex items-center justify-center text-[#161616] shrink-0">
            <span className="text-xs font-mono font-bold">5+</span>
          </div>
        </div>

        {/* 1-Large-Card + 2x2-Grid Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mt-6" id="software-mastery-bento">

          {/* Primary Featured Card (Premiere Pro) - styled same as rest of the cards */}
          <div
            id="software-premiere-pro"
            className="col-span-1 md:col-span-5 bg-white/55 backdrop-blur-[4px] border-[1.5px] border-[#D8D2C4] rounded-none p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#161616] hover:scale-[1.02] hover:shadow-sm select-none cursor-pointer group"
          >
            <div className="flex flex-col gap-5 relative z-10">
              <div className="w-14 h-14 transition-transform duration-300 group-hover:scale-105">
                <PremiereProLogo />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-[#161616] tracking-wide mb-2 uppercase">
                  Premiere Pro
                </h3>
                <p className="text-[13.5px] text-[#555555] font-sans font-medium leading-relaxed">
                  My primary engine for cinematic edits, precise speed ramping, professional multi-cam sequences, audio engineering, and industry-standard color grading.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between relative z-10 pt-4 border-t border-[#D8D2C4]">
              <span className="text-[10px] font-mono tracking-widest text-[#555555] uppercase"></span>
              <ArrowUpRight size={16} className="text-[#555555] group-hover:text-[#161616] transform translate-x-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Supporting 2x2 Grid of cards - Light Lighter-weight Cards */}
          <div className="col-span-1 md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5" id="software-secondary-grid">
            {supportingTools.map((tool) => (
              <div
                key={tool.name}
                id={tool.id}
                className="bg-white/55 backdrop-blur-[4px] border-[1.5px] border-[#D8D2C4] rounded-none p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#161616] hover:scale-[1.02] hover:shadow-sm select-none cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-105">
                    {tool.logo}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[15px] font-display font-bold text-[#161616] tracking-wide uppercase">
                      {tool.name}
                    </h4>
                    <span className="text-[12.5px] text-[#555555] font-sans font-medium mt-0.5 leading-tight">
                      {tool.desc}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end items-center text-[#555555] group-hover:text-[#161616] transition-colors">
                  <ArrowUpRight size={14} className="transform translate-x-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
