import React, { useState, useEffect, useRef } from "react";

interface WhoAmIProps {
  startScramble?: boolean;
}

const STAGES = [
  { pixelSize: 64, filter: "grayscale(1) invert(1) contrast(2.5)" },
  { pixelSize: 48, filter: "grayscale(1) invert(0.85) contrast(2.2)" },
  { pixelSize: 32, filter: "grayscale(1) invert(0.7) contrast(1.9)" },
  { pixelSize: 20, filter: "grayscale(1) invert(0.5) contrast(1.6)" },
  { pixelSize: 12, filter: "grayscale(0.7) invert(0.3) contrast(1.4)" },
  { pixelSize: 8, filter: "grayscale(0.4) invert(0.15) contrast(1.25)" },
  { pixelSize: 4, filter: "grayscale(0.15) invert(0.05) contrast(1.15)" },
  { pixelSize: 2, filter: "grayscale(0) invert(0) contrast(1.05)" },
];

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  offsetX = 0.5,
  offsetY = 0.75
) {
  const iw = img.width;
  const ih = img.height;
  const r = Math.min(w / iw, h / ih);
  let nw = iw * r;
  let nh = ih * r;

  if (nw < w) {
    const scale = w / nw;
    nw = w;
    nh = nh * scale;
  }
  if (nh < h) {
    const scale = h / nh;
    nh = h;
    nw = nw * scale;
  }

  const sWidth = iw * (w / nw);
  const sHeight = ih * (h / nh);
  const sX = (iw - sWidth) * offsetX;
  const sY = (ih - sHeight) * offsetY;

  ctx.drawImage(img, sX, sY, sWidth, sHeight, x, y, w, h);
}

export default function WhoAmI({ startScramble = true }: WhoAmIProps) {
  const [displayText, setDisplayText] = useState("WHO AM I?");
  const targetText = "WHO AM I?";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ?!@#$%&*[]+=_";

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [portraitImg, setPortraitImg] = useState<HTMLImageElement | null>(null);
  const [stage, setStage] = useState(-1);
  const [animationFinished, setAnimationFinished] = useState(false);

  // 1. Preload Portrait Image
  useEffect(() => {
    const img = new Image();
    img.src = "/img/s9.jpg";
    img.onload = () => {
      setPortraitImg(img);
    };
  }, []);

  // 2. Intersection Observer to Trigger Animation on Scroll
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  // 3. Coordinate Title Scramble and Image Stop-Motion sequence once In View
  useEffect(() => {
    if (!isInView) return;

    // Start Title Scramble
    let frame = 0;
    const totalFrames = 25;
    const intervalTime = 35;

    const scrambleTimer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      const currentScramble = targetText
        .split("")
        .map((char, index) => {
          if (char === " " || char === "?") return char;
          const revealThreshold = index / targetText.length;
          if (progress > revealThreshold) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(currentScramble);

      if (frame >= totalFrames) {
        setDisplayText(targetText);
        clearInterval(scrambleTimer);
      }
    }, intervalTime);

    // Start Image Stop-Motion sequence if image is ready and hasn't played yet
    if (portraitImg && !hasPlayed && stage === -1) {
      setStage(0);
      let currentStage = 0;

      const sequenceTimer = setInterval(() => {
        currentStage++;
        if (currentStage < STAGES.length) {
          setStage(currentStage);
        } else {
          setStage(STAGES.length); // Final resolved state (STAGES.length = 8)
          setHasPlayed(true);
          clearInterval(sequenceTimer);

          // Gracefully unmount canvas after native image opacity transition
          setTimeout(() => {
            setAnimationFinished(true);
          }, 500);
        }
      }, 275); // 275ms per step (Total ~2.2s reveal)

      return () => {
        clearInterval(scrambleTimer);
        clearInterval(sequenceTimer);
      };
    }

    return () => clearInterval(scrambleTimer);
  }, [isInView, portraitImg, hasPlayed]);

  // 4. Draw the Pixelated Image onto the Canvas per active stage
  useEffect(() => {
    if (!isInView || !portraitImg || stage < 0 || stage >= STAGES.length) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 280;
    const h = rect.height || 390;
    canvas.width = w;
    canvas.height = h;

    const activeStage = STAGES[stage];
    const pixelSize = activeStage.pixelSize;

    const offscreen = document.createElement("canvas");
    const smallW = Math.max(1, Math.round(w / pixelSize));
    const smallH = Math.max(1, Math.round(h / pixelSize));
    offscreen.width = smallW;
    offscreen.height = smallH;
    const offCtx = offscreen.getContext("2d");

    if (offCtx) {
      drawCoverImage(offCtx, portraitImg, 0, 0, smallW, smallH, 0.5, 0.75);
    }

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(offscreen, 0, 0, smallW, smallH, 0, 0, w, h);
  }, [isInView, portraitImg, stage]);

  return (
    <section className="bio animate-fade-in" id="home" style={{ padding: "50px 0 60px" }} ref={containerRef}>
      <div className="wrap">
        <div
          className="who-am-i-container py-4 sm:py-8"
          id="who-am-i-container"
        >
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-10 items-center" id="who-am-i-layout">

            {/* Left side: Image Frame */}
            <div className="sm:col-span-5 flex justify-center" id="who-am-i-left">
              <figure
                className="relative overflow-hidden aspect-[4/3] sm:aspect-[3/4.2] w-full max-w-[320px] sm:max-w-[280px] bg-[#0c0c0c]"
                style={{ borderRadius: "0px", border: "1px solid var(--glass-border)" }}
                id="who-am-i-figure"
              >
                {/* Sharp high-contrast original image */}
                <img
                  src="/img/s9.jpg"
                  alt="Issah portrait"
                  className={`w-full h-full object-cover object-[center_75%] filter contrast-[1.05] brightness-[0.9] saturate-[0.95] transition-opacity duration-500 ease-in-out ${stage === STAGES.length ? "opacity-100" : "opacity-0"
                    }`}
                  style={{ borderRadius: "0px" }}
                  referrerPolicy="no-referrer"
                  id="who-am-i-img"
                />

                {/* Stop-motion canvas overlay */}
                {isInView && portraitImg && !animationFinished && stage < STAGES.length && (
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-300 ease-in-out"
                    style={{
                      filter: STAGES[stage]?.filter || "none",
                    }}
                    id="who-am-i-canvas"
                  />
                )}
              </figure>
            </div>

            {/* Right side: Scrambled Title & Elegant Sequential Bio Fade */}
            <div className="sm:col-span-7 relative" id="who-am-i-right">
              <h3
                id="who-am-i-title"
                className="text-[var(--ink)] text-[36px] xs:text-[44px] sm:text-[48px] md:text-[52px] lg:text-[3rem] font-heavy tracking-tighter leading-[0.95] relative z-10 select-none mb-4 min-h-[1.1em] font-mono"
              >
                {displayText}
              </h3>

              <div
                id="who-am-i-bio-content"
                className=""
              >
                <p
                  id="who-am-i-p1"
                  className="font-mono text-[11px] sm:text-[12.5px] tracking-normal leading-[1.5] text-[var(--ink-dim)]"
                  style={{
                    marginBottom: "1rem"
                  }}
                >
                  Hi! I'm Issah, a Video Editor and Graphic Designer specializing in advertisements, promotional content, and short-form social media videos. I've been editing since I was 14, developing a strong eye for pacing, visuals, and storytelling. I help brands turn raw footage into clean, engaging, and scroll-stopping content that matches their style, goals, and audience.
                </p>

                <p
                  id="who-am-i-p2"
                  className="bio-location font-mono text-[10px] sm:text-[11px] text-[var(--ink-dim)] flex items-center gap-1.5"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "1.2rem"
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="location-icon text-[var(--ink)] w-4 h-4" id="who-am-i-location-icon">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  Based in Manila.
                </p>

                <div className="cta-row flex flex-wrap items-center gap-6" id="who-am-i-cta" style={{ marginBottom: "1.2rem", marginTop: "1rem" }}>
                  <a href="mailto:servanoissah@gmail.com" className="px-6 py-3 border-2 border-[#161616] bg-[#161616] !text-[#F3EFE7] hover:bg-transparent hover:!text-[#161616] transition-all duration-200 text-xs tracking-wider uppercase font-medium select-none cursor-pointer min-h-[44px] flex items-center justify-center" id="who-am-i-work-btn">Work with me</a>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-5" id="who-am-i-socials">
                    {[
                      { label: "Facebook", url: "https://www.facebook.com/iss.nacionales" },
                      { label: "Instagram", url: "https://www.instagram.com/isz.uh/" },
                      { label: "TikTok", url: "https://www.tiktok.com/@isz.flow" },
                      { label: "Email", url: "mailto:servanoissah@gmail.com" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-0.5 text-xs font-sans font-semibold uppercase tracking-wider text-[#161616] hover:text-[#161616]/80 transition-colors underline underline-offset-[3px] decoration-[#161616]/40 hover:decoration-[#161616]"
                        id={`hero-social-${s.label.toLowerCase()}`}
                      >
                        <span>{s.label}</span>
                        <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[10px] text-[#161616]/70">↗</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] tracking-widest text-[var(--ink-faint)] font-mono uppercase" id="who-am-i-handle">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

