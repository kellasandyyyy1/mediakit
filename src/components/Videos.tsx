import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export interface VideoCardProps {
  id: string;
  title: string;
  desc: string;
  image: string;
  hasScrubber?: boolean;
  videoUrl?: string;
  caption?: string;
  roundedNone?: boolean;
  key?: any;
  aspectRatio?: string;
}

export function VideoCard({ id, title, desc, image, hasScrubber = false, videoUrl = "", caption, roundedNone = false, aspectRatio = "aspect-[3/4]" }: VideoCardProps) {
  const [embeddedUrl, setEmbeddedUrl] = useState("");
  const [platform, setPlatform] = useState<"tiktok" | "instagram" | "youtube" | "vimeo" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const figureRef = useRef<HTMLElement>(null);

  const isLandscape = aspectRatio === "aspect-[16/9]";

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement && document.fullscreenElement === figureRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!figureRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => console.error("Error exiting fullscreen:", err));
    } else {
      figureRef.current.requestFullscreen().catch((err) => {
        console.error("Error entering fullscreen:", err);
      });
    }
  };

  const detectPlatform = (rawUrl: string) => {
    try {
      const u = new URL(rawUrl.trim());
      const host = u.hostname.replace(/^www\./, "");
      if (host.endsWith("tiktok.com")) return "tiktok";
      if (host.endsWith("instagram.com")) return "instagram";
      if (host.endsWith("youtube.com") || host.endsWith("youtu.be")) return "youtube";
      if (host.endsWith("vimeo.com") || host.includes("player.vimeo.com")) return "vimeo";
    } catch {
      return null;
    }
    return null;
  };

  const getEmbedUrl = (rawUrl: string, detectedPlatform: "tiktok" | "instagram" | "youtube" | "vimeo"): string | null => {
    try {
      const trimmed = rawUrl.trim();
      const u = new URL(trimmed);

      if (detectedPlatform === "vimeo") {
        if (u.hostname.includes("player.vimeo.com")) {
          const delimiter = trimmed.includes("?") ? "&" : "?";
          return `${trimmed}${delimiter}autoplay=1&title=0&byline=0&portrait=0&muted=0`;
        }
        const match = u.pathname.match(/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|showcase\/\d+\/video\/|)(\d+)(?:$|\/|\?)/);
        if (match && match[3]) {
          return `https://player.vimeo.com/video/${match[3]}?autoplay=1&title=0&byline=0&portrait=0&muted=0`;
        }
        const parts = u.pathname.split("/").filter(Boolean);
        const lastPart = parts[parts.length - 1];
        if (lastPart && /^\d+$/.test(lastPart)) {
          return `https://player.vimeo.com/video/${lastPart}?autoplay=1&title=0&byline=0&portrait=0&muted=0`;
        }
        return null;
      }

      if (detectedPlatform === "youtube") {
        if (u.hostname.includes("youtu.be")) {
          const videoId = u.pathname.substring(1);
          return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
        if (u.pathname.startsWith("/shorts/")) {
          const videoId = u.pathname.split("/")[2];
          return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
        if (u.pathname.startsWith("/embed/")) {
          return trimmed;
        }
        const videoId = u.searchParams.get("v");
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
        return null;
      }

      if (detectedPlatform === "tiktok") {
        const parts = u.pathname.split("/");
        const videoIndex = parts.indexOf("video");
        let videoId = "";
        if (videoIndex !== -1 && parts[videoIndex + 1]) {
          videoId = parts[videoIndex + 1];
        } else {
          for (const part of parts) {
            if (/^\d+$/.test(part)) {
              videoId = part;
              break;
            }
          }
        }
        if (videoId) {
          return `https://www.tiktok.com/embed/v2/${videoId}`;
        }
        return null;
      }

      if (detectedPlatform === "instagram") {
        const parts = u.pathname.split("/").filter(Boolean);
        if (parts[0] === "p" || parts[0] === "reel" || parts[0] === "reels") {
          const code = parts[1];
          if (code) {
            return `https://www.instagram.com/p/${code}/embed`;
          }
        }
        return null;
      }
    } catch {
      return null;
    }
    return null;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (isPlaying) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => console.error(err));
      }
      setIsPlaying(false);
      setEmbeddedUrl("");
      return;
    }
    if (!videoUrl) return;
    const detected = detectPlatform(videoUrl);
    if (!detected) return;

    const iframeSrc = getEmbedUrl(videoUrl, detected);
    if (!iframeSrc) return;

    setIsLoading(true);
    setPlatform(detected);
    setEmbeddedUrl(iframeSrc);
    setIsPlaying(true);
  };

  return (
    <div
      className={`bg-[#FAF8F4] border border-[rgba(26,26,26,0.06)] ${roundedNone ? "rounded-none" : "rounded-[14px]"} overflow-hidden p-3 transition-all duration-300 hover:border-[#111111]/25 hover:shadow-sm group h-full flex flex-col justify-between cursor-pointer`}
      id={id}
      onClick={handleCardClick}
    >
      <div className="flex flex-col gap-3">
        <figure
          ref={figureRef}
          className={`relative ${aspectRatio} overflow-hidden ${roundedNone ? "rounded-none" : "rounded-[10px]"} bg-black transition-all duration-300`}
          style={{ cursor: !videoUrl || isPlaying ? "default" : "pointer" }}
          id={`${id}-figure`}
          onClick={(e) => {
            if (isPlaying) {
              e.stopPropagation();
            }
          }}
        >
          {isPlaying && embeddedUrl ? (
            <div className="absolute inset-0 w-full h-full" id={`${id}-inline-wrapper`}>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black text-white/40 font-mono text-xs z-10 animate-pulse" id={`${id}-inline-loading`}>
                  <div className="flex flex-col items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </div>
                </div>
              )}
              <iframe
                src={embeddedUrl}
                title={title}
                className="w-full h-full border-0 absolute inset-0"
                id={`${id}-inline-iframe`}
                allowFullScreen
                scrolling="no"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                onLoad={() => setIsLoading(false)}
              ></iframe>

              {/* Controls bar top right overlay */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-2 z-20" id={`${id}-inline-controls`}>
                {/* Custom Fullscreen Button */}
                <button
                  className="text-white/90 hover:text-white transition-colors p-2.5 sm:p-2 bg-black/60 hover:bg-black/80 rounded-full cursor-pointer shadow-md flex items-center justify-center min-w-[36px] min-h-[36px] sm:min-w-[32px] sm:min-h-[32px]"
                  onClick={toggleFullscreen}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  aria-label="Toggle Fullscreen"
                  id={`${id}-inline-fullscreen-btn`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 sm:w-3.5 sm:h-3.5">
                    {isFullscreen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0V9m0-5h5M15 9l5-5m0 0V9m0-5h-5M9 15l-5 5m0 0v-5m0 5h5M15 15l5 5m0 0v-5m0 5h-5" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5M20 8V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M20 16v4m0 0h-4m4 0l-5-5" />
                    )}
                  </svg>
                </button>

                {/* Close/Stop Button */}
                <button
                  className="text-white/90 hover:text-white transition-colors p-2.5 sm:p-2 bg-black/60 hover:bg-black/80 rounded-full cursor-pointer shadow-md flex items-center justify-center min-w-[36px] min-h-[36px] sm:min-w-[32px] sm:min-h-[32px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (document.fullscreenElement) {
                      document.exitFullscreen().catch((err) => console.error(err));
                    }
                    setIsPlaying(false);
                    setEmbeddedUrl("");
                  }}
                  title="Stop Video"
                  aria-label="Stop video"
                  id={`${id}-inline-stop`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 sm:w-3.5 sm:h-3.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <>
              {image && !imgError ? (
                <img
                  src={image}
                  alt={title}
                  referrerPolicy="no-referrer"
                  id={`${id}-img`}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full bg-[#EDE8DF]/20 flex flex-col items-center justify-center text-center p-4">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--ink-faint)] font-mono">No Preview Image</div>
                </div>
              )}
              {videoUrl && (
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white flex items-center justify-center bg-white/10 backdrop-blur-[4px] group-hover:bg-white transition-all duration-300 z-10"
                  id={`${id}-play`}
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white group-hover:fill-[#111111] transition-colors ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
              {hasScrubber && (
                <div className="absolute left-3 right-3 bottom-3 flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-250" id={`${id}-scrubber`}>
                  <div className="flex-1 h-[2px] bg-white/30 rounded-full relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-[#111111]"></div>
                    <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-sm"></div>
                  </div>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white shrink-0">
                    <path d="M3 10v4h4l5 5V5L7 10H3z" />
                  </svg>
                </div>
              )}
            </>
          )}
        </figure>
        <div className="px-1" id={`${id}-meta`}>
          <h4 className="font-display text-[15px] sm:text-[16px] text-[#111111] uppercase tracking-wide font-bold mb-1" id={`${id}-title`}>
            {title}
          </h4>
          {desc && (
            <p className="text-[12.5px] text-[var(--ink-dim)] font-sans font-light leading-relaxed" id={`${id}-desc`}>
              {desc}
            </p>
          )}
        </div>
      </div>
      <div className="pt-3 px-1 border-t border-[rgba(26,26,26,0.03)] mt-3 flex items-center justify-between" id={`${id}-bottom`}>
        <div className="text-[10px] tracking-widest text-[var(--ink-faint)] font-mono uppercase" id={`${id}-credit`}>
          {caption || "@isz.flow"}
        </div>
        <span className={`text-[10px] tracking-widest font-mono uppercase transition-colors ${isPlaying ? "text-red-500 font-bold" : "text-[var(--ink-faint)]"}`}>
          {isPlaying ? "" : ""}
        </span>
      </div>
    </div>
  );
}

export default function Videos() {
  return (
    <section className="videos-section" id="contact" style={{ borderTop: "1px solid var(--divider)", padding: "80px 0 60px" }}>
      <div className="wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between gap-4 mb-8" id="videos-header">
          <h2 id="videos-section-title" className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-tight text-[var(--ink)]">
            Latest Social Content
          </h2>
          <div className="text-[11px] font-mono tracking-widest text-[var(--ink-faint)] uppercase">
            Socials [04]
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="videos-grid">
          <VideoCard
            id="video-push-day"
            title="lower day "
            desc="Leg routine and recovery session style."
            image="/img/b1.PNG"
            videoUrl="https://www.tiktok.com/@isz.flow/video/7662617915283295509?is_from_webapp=1&sender_device=pc&web_id=7644091396995728904"
          />
          <VideoCard
            id="video-fit-check"
            title="what i eat in a day"
            desc="Macro friendly high protein meals edit."
            image="/img/b2.PNG"
            hasScrubber={true}
            videoUrl="https://www.tiktok.com/@isz.flow/video/7655491613082307860?is_from_webapp=1&sender_device=pc&web_id=7644091396995728904"
          />
          <VideoCard
            id="workout-vlog"
            title="lil push day vlog."
            desc="Chest and shoulders heavy split edit."
            image="/img/b3.PNG"
            videoUrl="https://www.tiktok.com/@isz.flow/video/7643465826389200149?is_from_webapp=1&sender_device=pc&web_id=7644091396995728904"
          />
          <VideoCard
            id="video-eat-in-a-day"
            title="recent videos"
            desc="Content compilation highlights sequence."
            image="/img/b4.PNG"
            videoUrl="https://www.tiktok.com/@isz.flow/video/7662726329586191637?is_from_webapp=1&sender_device=pc&web_id=7644091396995728904"
          />
        </div>
      </div>
    </section>
  );
}
