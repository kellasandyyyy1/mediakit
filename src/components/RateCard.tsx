import React from "react";

export default function RateCard() {
  return (
    <section className="rate-card-section" id="rate-card" style={{ borderTop: "1px solid var(--divider)", padding: "80px 0 60px" }}>
      <div className="wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid: Desktop is 2 columns, tablet and mobile are stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center" id="rate-card-container">

          {/* Left Column: Huge 2-line Stacked Headline */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full py-2" id="rate-card-left-col">
            <div className="text-center lg:text-left select-none" id="rate-card-headline-wrap">
              <h2
                id="rate-card-headline"
                className="text-[#111111] font-display font-extrabold uppercase tracking-tight leading-[0.82]"
                style={{ fontSize: "clamp(3.5rem, 12vw, 6.5rem)" }}
              >
                RATE<br />CARD
              </h2>
            </div>

            {/* Desktop "@isz.uh" credit */}
            <div
              className="hidden lg:block mt-12 text-[11px] tracking-widest text-[var(--ink-faint)] font-mono uppercase"
              id="rate-card-credit-desktop"
            >

            </div>
          </div>

          {/* Right Column: Physical Rate Card Panel */}
          <div className="lg:col-span-7 flex justify-center items-center py-10 px-4 sm:px-8 overflow-visible" id="rate-card-right-col">

            {/* Dangling Sway Wrapper holding both the Hand and the Ticket */}
            <div
              className="dangling-sway w-full relative pt-[27px] sm:pt-[40px] max-w-[300px] xs:max-w-[340px] sm:max-w-[340px] md:max-w-[350px] lg:max-w-[500px] mx-auto overflow-visible select-none"
              id="rate-card-ticket-wrapper"
              style={{ transformOrigin: "top center" }}
            >

              {/* Hand SVG illustration: flat black silhouette, fingers pinching over the top edge of the card */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-20" id="rate-card-hand">
                <svg viewBox="0 0 60 50" fill="currentColor" className="w-[42px] sm:w-[60px] h-auto text-[#111111]" aria-hidden="true">
                  <path d="M 26,0 L 34,0 C 34,8 35,12 37,15 C 40,18 44,20 46,24 C 48,28 47,33 43,36 C 40,38 36,36 34,34 C 33,33 32,34 32,36 L 33,44 C 33,46.5 31.5,48 29.5,48 C 27.5,48 26,46.5 26,44 L 26.5,35 C 26.5,33 25,31 23,31 C 21,31 19.5,32.5 19,34.5 C 18.5,36.5 19,39 16,41 C 14,42.5 11,41.5 10,39 C 9,36 11,32 14,29 C 17,26 22,21 24,15 C 25,12 26,8 26,0 Z" />
                </svg>
              </div>

              {/* The Held Ticket Card */}
              <div
                className="w-full bg-[#FAF8F4] border-2 border-black rounded-[14px] relative overflow-hidden"
                style={{ boxShadow: "0 6px 16px rgba(0,0,0,0.08)" }}
                id="rate-card-physical"
              >

                {/* Solid Black Header Band */}
                <div className="bg-[#161616] py-3.5 px-6 sm:px-9 flex justify-between items-center select-none" id="rate-card-physical-header">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#F3EFE7] uppercase">
                    SERVICES & PRICING
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#999999] uppercase">

                  </span>
                </div>

                {/* Service Rows Container */}
                <div className="p-6 sm:p-9 flex flex-col gap-0" id="rate-card-physical-body">
                  {/* Service 1: Short-Form */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 pb-6 relative z-10" id="rate-card-physical-service-1">
                    <div className="flex-1">
                      <div className="text-[14px] sm:text-[15px] font-bold tracking-widest text-[#111111] font-mono uppercase mb-1">
                        SHORT-FORM VIDEO
                      </div>
                      <div className="text-[12px] text-[#222222] font-sans font-medium leading-relaxed">
                        TikTok, Reels, Advertisement, Promotional
                      </div>
                      <div className="text-[11px] text-[#444444] font-mono font-medium tracking-wide mt-1.5">
                        Duration: 1 to 3 minutes
                      </div>
                    </div>
                    <div className="text-left sm:text-right sm:pl-4 shrink-0 flex flex-col sm:justify-center">
                      <div className="flex items-baseline flex-wrap sm:justify-end gap-1">
                        <span className="font-heavy text-[23px] sm:text-[24px] text-[#111111]">
                          ₱1,000
                        </span>
                        <span className="text-[14px] sm:text-[15px] text-[#222222] font-sans font-semibold">
                          – ₱1,500
                        </span>
                      </div>
                      <div className="text-[11px] tracking-wider text-[#555555] font-mono font-bold uppercase mt-0.5">
                        PER VIDEO
                      </div>
                    </div>
                  </div>

                  {/* Light Divider */}
                  <div
                    className="border-t border-[#dddddd] my-2"
                    id="rate-card-physical-divider"
                  />

                  {/* Service 2: Graphic Design */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 pt-6 relative z-10" id="rate-card-physical-service-2">
                    <div className="flex-1">
                      <div className="text-[14px] sm:text-[15px] font-bold tracking-widest text-[#111111] font-mono uppercase mb-1">
                        GRAPHIC DESIGN
                      </div>
                      <div className="text-[12px] text-[#222222] font-sans font-medium leading-relaxed">
                        Social Media Posts, Banners, Creative Assets
                      </div>
                      <div className="text-[11px] text-[#444444] font-mono font-medium tracking-wide mt-1.5">
                        Custom layouts & templates
                      </div>
                    </div>
                    <div className="text-left sm:text-right sm:pl-4 shrink-0 flex flex-col sm:justify-center">
                      <div className="flex items-baseline flex-wrap sm:justify-end gap-1">
                        <span className="font-heavy text-[23px] sm:text-[24px] text-[#111111]">
                          ₱300
                        </span>
                        <span className="text-[14px] sm:text-[15px] text-[#222222] font-sans font-semibold">
                          – ₱500
                        </span>
                      </div>
                      <div className="text-[11px] tracking-wider text-[#555555] font-mono font-bold uppercase mt-0.5">
                        PER POST
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Mobile bottom caption */}
          <div className="lg:hidden flex justify-center mt-4" id="rate-card-credit-mobile">
            <div className="text-[11px] tracking-widest text-[var(--ink-faint)] font-mono uppercase">

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
