/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from "./components/Header";
import WhoAmI from "./components/WhoAmI";
import Stats from "./components/Stats";
import CreativePresentation from "./components/CreativePresentation";
import SoftwareMastery from "./components/SoftwareMastery";
import GraphicDesigns from "./components/GraphicDesigns";
import VideoEditingSamples from "./components/VideoEditingSamples";
import RateCard from "./components/RateCard";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen relative text-[var(--ink)] font-sans antialiased bg-[#F3EFE7]" id="app-root">
      <Header />
      <main id="main-content">
        <WhoAmI startScramble={true} />
        <Stats />
        <CreativePresentation />
        <SoftwareMastery />
        <GraphicDesigns />
        <VideoEditingSamples />
        <RateCard />
      </main>
      <Footer />
    </div>
  );
}


