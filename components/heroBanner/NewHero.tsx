"use client"
import React, { useEffect, useState, useMemo } from 'react';
import HeroContent from './HeroContent';
import WaveBackground from './WaveBackground';
import HeroStyles from './HeroStyles';

interface HeroProps {
  logoAlt: string;
  tagline: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  slogan: string;
  sectionsHero: string;
  className?: string;
}



const HeroSection: React.FC<HeroProps & { locale: string }> = ({
  logoAlt,
  tagline,
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  slogan,
  sectionsHero,
  className = "",
  locale
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add playing class after component mounts to start animations
    // Use a timeout to ensure this runs after hydration
    const timer = setTimeout(() => {
      const card = document.querySelector('.e-card');
      if (card) {
        card.classList.add('playing');
      }
      setIsLoaded(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Ensure consistent rendering between server and client
  const heroContent = useMemo(() => (
    <HeroContent
      logoAlt={logoAlt}
      tagline={tagline}
      title={title}
      description={description}
      ctaPrimary={ctaPrimary}
      ctaSecondary={ctaSecondary}
      slogan={slogan}
      locale={locale}
    />
  ), [logoAlt, locale, title, tagline, description, ctaPrimary, ctaSecondary, slogan]);

  return (
    <div className={`w-full min-h-screen bg-gradient-to-br from-blue-950 via-amber-900 to-cyan-900 ${className}`}>
      <HeroStyles />

      <div className="e-card">
        <div className="image"></div>
        <WaveBackground />
        <div className="hero-content">
          {heroContent}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;