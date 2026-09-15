import React, { useState, useRef } from "react";
import { VideoCard } from "./Videos";

export default function VideoEditingSamples() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const samples = [
    {
      id: "sample-gym",
      title: "Ad promotion",
      desc: "",
      image: "/img/tb2.PNG",
      videoUrl: "https://vimeo.com/1211382057?fl=ip&fe=ec",
      aspectRatio: "aspect-[9/16]"
    },
    {
      id: "sample-lifestyle",
      title: "Hyrox Vlog",
      desc: ".",
      image: "/img/tb1.PNG",
      videoUrl: "https://vimeo.com/1211382056?fl=ip&fe=ec",
      aspectRatio: "aspect-[9/16]"
    },
    {
      id: "sample-promo",
      title: "Supplement promotion",
      desc: "",
      image: "",
      videoUrl: "",
      aspectRatio: "aspect-[9/16]"
    },
    {
      id: "sample-shorts",
      title: "Promtional ads video",
      desc: ".",
      image: "",
      videoUrl: "",
      aspectRatio: "aspect-[9/16]"
    },
    {
      id: "sample-commercial",
      title: "Beauty product showcase",
      desc: "",
      image: "/img/tb3.PNG",
      videoUrl: "https://vimeo.com/1211382058?fl=ip&fe=ec",
      aspectRatio: "aspect-[9/16]"
    },
    {
      id: "sample-cinematic",
      title: "Cinematic Reel",
      desc: "",
      image: "/img/b2.PNG",
      videoUrl: "https://www.tiktok.com/@isz.flow/video/7655491613082307860?is_from_webapp=1&sender_device=pc&web_id=7644091396995728904",
      aspectRatio: "aspect-[9/16]"
    },
    {
      id: "sample-landscape-vlog",
      title: "",
      desc: "",
      image: "/tb4.g",
      videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      aspectRatio: "aspect-[16/9]"
    },
    {
      id: "sample-landscape-commercial",
      title: "SPORTS ACTION EDITING",
      desc: ".",
      image: "/img/tb4.PNG",
      videoUrl: "https://vimeo.com/1211384613?fl=ip&fe=ec",
      aspectRatio: "aspect-[16/9]"
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
    <section className="video-samples-section" id="video-samples" style={{ borderTop: "1px solid var(--divider)", padding: "80px 0 60px" }}>
      <div className="wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between gap-4 mb-8" id="video-samples-header">
          <h2 id="video-samples-title" className="text-3xl sm:text-3xl md:text-4xl font-display uppercase tracking-tight text-[var(--ink)]">
            Video Editing Samples
          </h2>
          <div className="text-[11px] font-mono tracking-widest text-[var(--ink-faint)] uppercase">

          </div>
        </div>

        {/* Responsive Grid: 3 columns on desktop, horizontal scroll snap on mobile/tablet */}
        <div
          className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none gap-5 lg:gap-6 pb-6 lg:pb-0 px-2 sm:px-4 lg:px-0 -mx-4 sm:-mx-6 lg:mx-auto no-scrollbar"
          id="video-samples-grid"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {samples.map((s) => (
            <div
              key={s.id}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-auto lg:shrink lg:snap-none"
              style={{ scrollSnapAlign: "start" }}
            >
              <VideoCard
                id={s.id}
                title={s.title}
                desc={s.desc}
                image={s.image}
                videoUrl={s.videoUrl}
                caption="BY: ISZ"
                roundedNone={true}
                aspectRatio={s.aspectRatio}
              />
            </div>
          ))}
        </div>

        {/* Indicator dots for Tablet & Mobile only */}
        <div className="flex justify-center gap-2 mt-4 lg:hidden" id="video-samples-dots">
          {samples.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-[#111111] w-4" : "bg-[#111111]/20 hover:bg-[#111111]/40"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
              id={`video-dot-${idx}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
