import React, { useEffect, useRef, useState } from "react";

interface StatCardProps {
  id: string;
  icon: React.ReactNode;
  target: number;
  suffix: string;
  label: string;
  isActive?: boolean;
}

function StatCard({ id, icon, target, suffix, label, isActive = false }: StatCardProps) {
  const [currentVal, setCurrentVal] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;

            const duration = 1600;
            const start = performance.now();

            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
              const current = target * eased;
              setCurrentVal(current);

              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setCurrentVal(target);
              }
            };
            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target]);

  const decimals = target % 1 !== 0 ? 1 : 0;

  return (
    <div
      className={`relative flex flex-col items-start justify-start p-5 sm:p-8 text-left sm:items-center sm:justify-center sm:text-center rounded-none transition-all duration-300 hover:scale-[1.02] hover:shadow-sm ${isActive
          ? "bg-[#161616] text-[#F3EFE7] border-2 border-[#161616]"
          : "bg-white/55 backdrop-blur-[4px] text-[#161616] border-[1.5px] border-[#D8D2C4] hover:border-[#161616]"
        }`}
      ref={cardRef}
      id={id}
    >
      <div
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center mb-2.5 sm:mb-4 transition-colors ${isActive ? "border border-[#F3EFE7] text-[#F3EFE7]" : "border border-[#161616] text-[#161616]"
          }`}
        aria-hidden="true"
        id={`${id}-icon`}
      >
        {icon}
      </div>
      <div
        className={`font-display font-bold text-2xl sm:text-4xl tabular-nums leading-none tracking-tight mb-2 ${isActive ? "!text-white" : "!text-[#161616]"
          }`}
        id={`${id}-num`}
      >
        {currentVal.toFixed(decimals) + suffix}
      </div>
      <div
        className={`font-mono text-[10px] sm:text-[10.5px] tracking-widest uppercase ${isActive ? "text-[#F3EFE7]/80" : "text-[#555555]"
          }`}
        id={`${id}-label`}
      >
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats pb-12 sm:pb-16" id="stats-section">
      <div className="wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[300px] sm:max-w-none mr-auto" id="stats-inner-container">
          <h2 id="stats-title" className="text-2xl sm:text-2xl md:text-3xl font-heavy uppercase tracking-tighter leading-[0.95] text-[var(--ink)] mb-8 text-left">
            my impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" id="stats-grid">
            <StatCard
              id="stat-tiktok"
              target={4.3}
              suffix="M+"
              label="Total views"
              isActive={true}
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M16.5 3c.4 2.2 1.9 3.9 4.5 4.1v3.1c-1.6.1-3-.4-4.5-1.3v6.6c0 3.6-2.9 6.5-6.5 6.5S3.5 19.1 3.5 15.5 6.4 9 10 9c.4 0 .7 0 1 .1v3.2c-.3-.1-.6-.2-1-.2-1.8 0-3.3 1.5-3.3 3.4S8.2 18.9 10 18.9s3.3-1.5 3.3-3.4V3h3.2z" />
                </svg>
              }
            />
            <StatCard
              id="stat-followers"
              target={15}
              suffix="K+"
              label="Followers"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
                  <path d="M17 20v-1.6a3.6 3.6 0 0 0-3.6-3.6H8.6A3.6 3.6 0 0 0 5 18.4V20" />
                  <circle cx="11" cy="8" r="3.4" />
                  <path d="M19.5 20v-1.5a3.3 3.3 0 0 0-2.3-3.14" />
                  <path d="M15.2 4.7a3.4 3.4 0 0 1 0 6.5" />
                </svg>
              }
            />
            <StatCard
              id="stat-videos"
              target={30}
              suffix="+"
              label="Videos created"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
                  <rect x="2.5" y="6" width="19" height="12" rx="3" />
                  <path d="M10.5 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
                </svg>
              }
            />
            <StatCard
              id="stat-likes"
              target={590}
              suffix="K+"
              label="Total likes"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
