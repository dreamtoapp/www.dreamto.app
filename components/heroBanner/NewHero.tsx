"use client"
import React, { useEffect, useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import HeroContent from './HeroContent';
import WaveBackground from './WaveBackground';
import HeroStyles from './HeroStyles';

interface HeroProps {
  className?: string;
}

const HeroSection: React.FC<HeroProps> = ({
  className = ""
}) => {
  const locale = useLocale();
  const t = useTranslations('homepage');

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
      logoAlt={t('logo.alt')}
      tagline={t('tagline')}
      title={t('title')}
      description={t('description')}
      ctaPrimary={t('cta.primary')}
      ctaSecondary={t('cta.secondary')}
      slogan={t('slogon')}
      locale={locale}
    />
  ), [t, locale]);

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