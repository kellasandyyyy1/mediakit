import React from "react";
import { Palette, Film, Clock, Type, Paintbrush, Lightbulb, TrendingUp, Target, ArrowUpRight } from "lucide-react";

export default function CreativePresentation() {
  const interests = ["Fashion", "Digital Art", "Illustration", "Vlogging", "Content Creation", "Fitness"];

  const skillsData = [
    { label: "Visual design", icon: Palette },
    { label: "Short-form edits", icon: Film },
    { label: "Pacing & rhythm", icon: Clock },
    { label: "Typography", icon: Type },
    { label: "Color grading", icon: Paintbrush },
    { label: "Storytelling", icon: Lightbulb },
    { label: "Trend-aware editing", icon: TrendingUp },
    { label: "Attention to detail", icon: Target },
  ];

  return (
    <section className="creative-presentation" id="creative" style={{ padding: "80px 0 60px", borderTop: "1px solid var(--divider)" }}>
      <div className="wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header and Circular Decorative Button */}
        <div className="flex items-center justify-between gap-4 mb-10" id="creative-header-row">
          <h2 id="creative-presentation-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] font-heavy tracking-tighter leading-[0.95] text-[var(--ink)] uppercase">
            Creative Presentation
          </h2>
          <button
            className="w-10 h-10 rounded-full border-[1.5px] border-[#161616] flex items-center justify-center text-[#161616] hover:bg-[#161616] hover:text-[#F3EFE7] transition-all duration-300 shrink-0"
            aria-label="View presentation"
            id="creative-arrow-btn"
          >
            <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Responsive Grid: Stacks image on top on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center" id="creative-grid">

          {/* Image Column */}
          <div className="md:col-span-5 flex justify-center w-full animate-fade-in" id="creative-photo-placeholder">
            <figure
              className="relative overflow-hidden aspect-[0.923/1] sm:aspect-[3/3.8] w-full max-w-[280px] sm:max-w-none bg-[#111111] rounded-none border border-[rgba(26,26,26,0.12)] shadow-md"
              id="creative-single-img-container"
            >
              <img
                src="/img/cr1.PNG"
                alt="Creative Workspace"
                className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.02] saturate-[1.02]"
                style={{ imageRendering: "-webkit-optimize-contrast" }}
                referrerPolicy="no-referrer"
                id="creative-single-img"
              />
            </figure>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 flex flex-col gap-8" id="creative-info-stack">

            {/* Interests Section */}
            <div id="creative-interests">
              <h4 className="text-[11px] font-mono tracking-widest text-[var(--ink-faint)] uppercase mb-4 font-bold">
                Interests
              </h4>
              <div className="flex flex-wrap gap-2.5" id="creative-interests-list">
                {interests.map((interest, idx) => {
                  const isHighlighted = idx === 0; // Fashion as the highlighted item
                  return (
                    <span
                      key={idx}
                      className={`inline-block font-sans font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none text-[12.5px] uppercase py-1.5 px-4 rounded-none border-[1.5px] ${isHighlighted
                        ? "bg-[#161616] text-[#F3EFE7] border-[#161616] hover:bg-[#161616]/90"
                        : "bg-transparent text-[#161616] border-[#161616] hover:bg-[#161616]/5"
                        }`}
                      id={`interest-tag-${idx}`}
                    >
                      {interest}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Skills Section */}
            <div id="creative-skills">
              <h4 className="text-[11px] font-mono tracking-widest text-[var(--ink-faint)] uppercase mb-4 font-bold">
                Skills
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="creative-skills-grid">
                {skillsData.map((skill, idx) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3.5 bg-white/55 backdrop-blur-[4px] border-[1.5px] border-[#D8D2C4] hover:border-[#161616] transition-all duration-300 group cursor-pointer select-none rounded-none p-3.5"
                      id={`creative-skill-tile-${idx}`}
                    >
                      <IconComponent
                        size={16}
                        className="flex-shrink-0 text-[#161616] group-hover:scale-105 transition-transform duration-200"
                        id={`skill-icon-${idx}`}
                      />
                      <span
                        className="text-[#161616] font-sans font-medium text-[13.5px] leading-tight"
                        id={`skill-label-${idx}`}
                      >
                        {skill.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
