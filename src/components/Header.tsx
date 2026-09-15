import { useState, useEffect } from "react";
import { Sparkles, Palette, Video } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  // Automatically update active tab on scroll
  useEffect(() => {
    const sections = [
      "home",
      "creative",
      "software-mastery",
      "graphic-designs",
      "video-samples",
      "rate-card",
      "contact"
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section is in the active reading area
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header>
      <nav className="wrap" id="main-nav">
        <div className="logo-container" id="header-logo-container">
          <div className="logo flex items-center" id="header-logo" style={{ height: "24px", marginBottom: "4px" }}>
            <img
              src="/img/mn.PNG"
              alt="Issah Logo"
              className="h-full aspect-square object-cover"
              style={{ borderRadius: "0px", height: "46px", width: "46px", display: "block" }}
              id="header-logo-img"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="logo-subtitle flex items-center" id="header-logo-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>

          </div>
        </div>
        <div className="nav-links" id="desktop-nav-links">
          <a
            href="#home"
            id="nav-link-home"
            className={activeTab === "home" ? "active" : ""}
            onClick={() => handleNavClick("home")}
          >
            Home
          </a>
          <a
            href="#creative"
            id="nav-link-about"
            className={activeTab === "creative" ? "active" : ""}
            onClick={() => handleNavClick("creative")}
          >
            About
          </a>
          <a
            href="#software-mastery"
            id="nav-link-mastery"
            className={activeTab === "software-mastery" ? "active" : ""}
            onClick={() => handleNavClick("software-mastery")}
          >
            Mastery
          </a>
          <a
            href="#graphic-designs"
            id="nav-link-graphics"
            className={activeTab === "graphic-designs" ? "active" : ""}
            onClick={() => handleNavClick("graphic-designs")}
          >
            Graphics
          </a>
          <a
            href="#video-samples"
            id="nav-link-videos"
            className={activeTab === "video-samples" ? "active" : ""}
            onClick={() => handleNavClick("video-samples")}
          >
            Videos
          </a>
          <a
            href="#rate-card"
            id="nav-link-pricing"
            className={activeTab === "rate-card" ? "active" : ""}
            onClick={() => handleNavClick("rate-card")}
          >
            Pricing
          </a>
          <a
            href="#contact"
            id="nav-link-contact"
            className={activeTab === "contact" ? "active" : ""}
            onClick={() => handleNavClick("contact")}
          >
            Contact
          </a>
        </div>
        <div className="nav-socials" id="desktop-nav-socials">
          <a href="https://www.facebook.com/iss.nacionales" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook" id="nav-social-facebook">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" id="svg-facebook">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/isz.uh/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram" id="nav-social-instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" id="svg-instagram">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.3" cy="6.7" r="1" />
            </svg>
          </a>
          <a href="https://www.tiktok.com/@isz.flow" target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="TikTok" id="nav-social-tiktok">
            <svg viewBox="0 0 24 24" fill="currentColor" id="svg-tiktok">
              <path d="M16.5 3c.4 2.2 1.9 3.9 4.5 4.1v3.1c-1.6.1-3-.4-4.5-1.3v6.6c0 3.6-2.9 6.5-6.5 6.5S3.5 19.1 3.5 15.5 6.4 9 10 9c.4 0 .7 0 1 .1v3.2c-.3-.1-.6-.2-1-.2-1.8 0-3.3 1.5-3.3 3.4S8.2 18.9 10 18.9s3.3-1.5 3.3-3.4V3h3.2z" />
            </svg>
          </a>
          <a href="mailto:servanoissah@gmail.com" aria-label="Gmail" title="Gmail" id="nav-social-gmail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" id="svg-gmail">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>
        <button
          className="burger"
          id="burger"
          aria-label="Menu"
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      <div
        className="mobile-menu"
        id="mobileMenu"
        style={{ display: mobileMenuOpen ? "flex" : "none" }}
      >
        <a
          href="#home"
          id="mobile-link-home"
          className={activeTab === "home" ? "active" : ""}
          onClick={() => handleNavClick("home")}
        >
          Home
        </a>
        <a
          href="#creative"
          id="mobile-link-about"
          className={activeTab === "creative" ? "active" : ""}
          onClick={() => handleNavClick("creative")}
        >
          About
        </a>
        <a
          href="#software-mastery"
          id="mobile-link-mastery"
          className={activeTab === "software-mastery" ? "active" : ""}
          onClick={() => handleNavClick("software-mastery")}
        >
          Mastery
        </a>
        <a
          href="#graphic-designs"
          id="mobile-link-graphics"
          className={activeTab === "graphic-designs" ? "active" : ""}
          onClick={() => handleNavClick("graphic-designs")}
        >
          Graphics
        </a>
        <a
          href="#video-samples"
          id="mobile-link-videos"
          className={activeTab === "video-samples" ? "active" : ""}
          onClick={() => handleNavClick("video-samples")}
        >
          Videos
        </a>
        <a
          href="#rate-card"
          id="mobile-link-pricing"
          className={activeTab === "rate-card" ? "active" : ""}
          onClick={() => handleNavClick("rate-card")}
        >
          Pricing
        </a>
        <a
          href="#contact"
          id="mobile-link-contact"
          className={activeTab === "contact" ? "active" : ""}
          onClick={() => handleNavClick("contact")}
        >
          Contact
        </a>
        <div className="nav-socials" style={{ display: "flex" }} id="mobile-nav-socials">
          <a href="https://www.facebook.com/iss.nacionales" target="_blank" rel="noopener noreferrer" aria-label="Facebook" id="mobile-social-facebook">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/isz.uh/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" id="mobile-social-instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.3" cy="6.7" r="1" />
            </svg>
          </a>
          <a href="https://www.tiktok.com/@isz.flow" target="_blank" rel="noopener noreferrer" aria-label="TikTok" id="mobile-social-tiktok">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 3c.4 2.2 1.9 3.9 4.5 4.1v3.1c-1.6.1-3-.4-4.5-1.3v6.6c0 3.6-2.9 6.5-6.5 6.5S3.5 19.1 3.5 15.5 6.4 9 10 9c.4 0 .7 0 1 .1v3.2c-.3-.1-.6-.2-1-.2-1.8 0-3.3 1.5-3.3 3.4S8.2 18.9 10 18.9s3.3-1.5 3.3-3.4V3h3.2z" />
            </svg>
          </a>
          <a href="mailto:servanoissah@gmail.com" aria-label="Gmail" id="mobile-social-gmail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
