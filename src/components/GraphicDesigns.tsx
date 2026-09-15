import React, { useState, useRef } from "react";

interface DesignCardProps {
  id: string;
  title: string;
  desc: string;
  image: string;
}

function DesignCard({ id, title, desc, image }: DesignCardProps) {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      className="bg-[#FAF8F4] border border-[rgba(26,26,26,0.06)] rounded-none overflow-hidden p-3 transition-all duration-300 hover:border-[#111111]/25 hover:shadow-sm h-full flex flex-col justify-between"
      id={id}
    >
      <div className="flex flex-col gap-3">
        <figure className="relative aspect-[3/4] overflow-hidden rounded-none bg-[#EDE8DF]" id={`${id}-figure`}>
          {image && !imgError ? (
            <img
              src={image}
              alt={title}
              referrerPolicy="no-referrer"
              id={`${id}-img`}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full bg-[#EDE8DF] flex items-center justify-center text-center p-4">
              <span className="text-[10px] uppercase tracking-wider text-[var(--ink-faint)] font-mono">No Image</span>
            </div>
          )}
        </figure>
        <div className="px-1" id={`${id}-meta`}>
          <h4 className="font-display text-[15px] sm:text-[16px] text-[#111111] uppercase tracking-wide font-bold mb-1" id={`${id}-title`}>
            {title}
          </h4>
          <p className="text-[12.5px] text-[var(--ink-dim)] font-sans font-light leading-relaxed" id={`${id}-desc`}>
            {desc}
          </p>
        </div>
      </div>
      <div className="pt-3 px-1 border-t border-[rgba(26,26,26,0.03)] mt-3 flex items-center justify-between" id={`${id}-bottom`}>
        <div className="text-[10px] tracking-widest text-[var(--ink-faint)] font-mono uppercase" id={`${id}-credit`}>

        </div>
        <span className="text-[10px] tracking-widest text-[var(--ink-faint)] font-mono uppercase">BY: ISZ</span>
      </div>
    </div>
  );
}

export default function GraphicDesigns() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const designs = [
    {
      id: "design-ad-creative",
      title: "Food",
      desc: "food promotional ad design",
      image: "/img/n1.jpg",
    },
    {
      id: "design-promo-post",
      title: "coffee",
      desc: "Wanna go grab macha graphic desgn",
      image: "/img/n2.jpg",
    },
    {
      id: "design-packaging",
      title: "women clothing",
      desc: "Petal and pixie product design",
      image: "/img/n4.jpg",
    },
    {
      id: "design-poster",
      title: "Modelling & Casting",
      desc: "Bold high-contrast layout for modelling casting calling.",
      image: "/img/n3.png",
    },
    {
      id: "design-identity",
      title: "bag product",
      desc: "alleviare product design",
      image: "/img/z2.jpg",
    },
    {
      id: "design-magazine",
      title: "Fashion brand identity",
      desc: "alleviare product design",
      image: "/img/z1.jpg",
    },
  ];

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const children = Array.from(container.children);
    if (children.length === 0) return;

    const containerLeft = container.getBoundingClientRect().left;

    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      const childElement = child as HTMLElement;
      const childLeft = childElement.getBoundingClientRect().left;
      const distance = Math.abs(childLeft - containerLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const children = Array.from(container.children);
    const target = children[index] as HTMLElement;
    if (target) {
      const containerLeftPadding = parseInt(window.getComputedStyle(container).paddingLeft) || 0;
      container.scrollTo({
        left: target.offsetLeft - containerLeftPadding,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="graphic-designs-section" id="graphic-designs" style={{ borderTop: "1px solid var(--divider)", padding: "80px 0 60px" }}>
      <div className="wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between gap-4 mb-8" id="graphic-designs-header">
          <h2 id="graphic-designs-title" className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-tight text-[var(--ink)]">
            Graphic Designs
          </h2>
          <div className="text-[11px] font-mono tracking-widest text-[var(--ink-faint)] uppercase">

          </div>
        </div>

        {/* Responsive Grid: 3 columns on desktop, auto-scroll on tablet/mobile with snap */}
        <div
          className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none gap-5 lg:gap-6 pb-6 lg:pb-0 px-2 sm:px-4 lg:px-0 -mx-4 sm:-mx-6 lg:mx-auto no-scrollbar"
          id="graphic-designs-grid"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {designs.map((d) => (
            <div
              key={d.id}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-auto lg:shrink lg:snap-none"
              style={{ scrollSnapAlign: "start" }}
            >
              <DesignCard
                id={d.id}
                title={d.title}
                desc={d.desc}
                image={d.image}
              />
            </div>
          ))}
        </div>

        {/* Indicator dots for Tablet & Mobile only */}
        <div className="flex justify-center gap-2 mt-4 lg:hidden" id="graphic-designs-dots">
          {designs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-[#111111] w-4" : "bg-[#111111]/20 hover:bg-[#111111]/40"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
              id={`design-dot-${idx}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
