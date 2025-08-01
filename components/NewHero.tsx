"use client"
import React, { useEffect, useState } from 'react';
import Link from '@/components/link';
import Image from 'next/image';

interface HeroProps {
  logoAlt: string;
  tagline: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  sectionsHero: string;
  className?: string;
}

// Logo Component
const HeroLogo: React.FC<{ logoAlt: string; locale: string }> = ({ logoAlt, locale }) => {
  const getLogoPath = (isDark: boolean = false): string => {
    return isDark
      ? "/assets/dreamtoapp/dreamToApp-dark.svg"
      : "/assets/dreamtoapp/dreamToApp.svg";
  };

  return (
    <div className="flex justify-center items-center w-full mb-2 md:mb-3">
      <div className="relative group">
        <Image
          src={getLogoPath(false)}
          alt={logoAlt}
          width={200}
          height={87}
          className="w-32 h-14 md:w-40 md:h-16 lg:w-48 lg:h-20 xl:w-56 xl:h-24 block dark:hidden transition-all duration-300 group-hover:rotate-3"
          priority
        />
        <Image
          src={getLogoPath(true)}
          alt={logoAlt}
          width={200}
          height={87}
          className="w-32 h-14 md:w-40 md:h-16 lg:w-48 lg:h-20 xl:w-56 xl:h-24 hidden dark:block transition-all duration-300 group-hover:rotate-3"
          priority
        />
      </div>
    </div>
  );
};

// Tagline Component
const HeroTagline: React.FC<{ tagline: string }> = ({ tagline }) => (
  <div className="text-sm md:text-base lg:text-lg mb-1 md:mb-2 opacity-80 font-medium tracking-wide text-center">
    {tagline}
  </div>
);

// Main Tagline Component
const MainTagline: React.FC = () => (
  <div className="text-lg md:text-xl lg:text-2xl mb-2 md:mb-3 opacity-95 font-semibold tracking-wider">
    احلم. صمّم. أنجز.
  </div>
);

// Title Component
const HeroTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2 md:mb-3 leading-tight tracking-tight max-w-xs md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
    {title}
  </div>
);

// Description Component
const HeroDescription: React.FC<{ description: string }> = ({ description }) => (
  <div className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 md:mb-6 opacity-90 leading-relaxed max-w-xs md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
    {description}
  </div>
);

// CTA Buttons Component
const HeroCTA: React.FC<{ ctaPrimary: string; ctaSecondary: string; locale: string }> = ({ ctaPrimary, ctaSecondary, locale }) => (
  <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
    <Link href={`/${locale}/contactus`} className="cta-button primary">
      {ctaPrimary}
    </Link>
    <Link href={`/${locale}/services`} className="cta-button secondary">
      {ctaSecondary}
    </Link>
  </div>
);

// Wave Background Component
const WaveBackground: React.FC = () => (
  <>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
  </>
);

// Hero Content Component
const HeroContent: React.FC<HeroProps & { locale: string }> = ({ logoAlt, tagline, title, description, ctaPrimary, ctaSecondary, locale }) => (
  <div className="infotop">
    <HeroLogo logoAlt={logoAlt} locale={locale} />
    <MainTagline />
    <HeroTitle title={title} />
    <HeroTagline tagline={tagline} />
    <HeroDescription description={description} />
    <HeroCTA ctaPrimary={ctaPrimary} ctaSecondary={ctaSecondary} locale={locale} />
  </div>
);

const HeroSection: React.FC<HeroProps & { locale: string }> = ({
  logoAlt,
  tagline,
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  sectionsHero,
  className = "",
  locale
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add playing class after component mounts to start animations
    const card = document.querySelector('.e-card');
    if (card) {
      card.classList.add('playing');
    }
    setIsLoaded(true);
  }, []);

  return (
    <div className={`w-full min-h-screen bg-gradient-to-br from-blue-950 via-amber-900 to-cyan-900 ${className}`}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .hero-content {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 90dvh;
            padding: 2rem;
          }
          
          .e-card {
            margin: 0;
            background: transparent;
            box-shadow: 0px 16px 48px -12px rgba(13,58,215,0.4), 0px 4px 16px -4px rgba(215,165,13,0.3), 0px 8px 32px -8px rgba(153,228,255,0.2);
            position: relative;
            width: 100%;
            min-height: 100vh;
            border-radius: 0;
            overflow: hidden;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(153,228,255,0.3);
          }
          
          .wave {
            position: absolute;
            width: 150%;
            height: 150vh;
            opacity: 0.8;
            left: 0;
            top: 0;
            margin-left: -25%;
            margin-top: -25%;
            background: linear-gradient(744deg, #d7a50d, #0d3ad7 60%, #99e4ff);
            border-radius: 45%;
            animation: wave 120s infinite linear;
          }
          
          .wave:nth-child(2),
          .wave:nth-child(3) {
            top: 60%;
          }
          
          .wave:nth-child(2) {
            background: linear-gradient(744deg, #99e4ff, #d7a50d 40%, #0d3ad7 80%);
            opacity: 0.7;
            animation-duration: 100s;
            filter: blur(3px);
          }
          
          .wave:nth-child(3) {
            background: linear-gradient(744deg, #0d3ad7, #99e4ff 30%, #d7a50d 70%);
            opacity: 0.6;
            animation-duration: 90s;
            filter: blur(4px);
          }
          
          .wave:nth-child(4) {
            background: radial-gradient(circle at 30% 70%, #d7a50d 0%, #0d3ad7 50%, #99e4ff 100%);
            opacity: 0.5;
            animation-duration: 80s;
            filter: blur(5px);
            top: 30%;
          }
          
          .hero-logo {
            width: clamp(180px, 25vw, 320px);
            height: clamp(60px, 8vw, 100px);
            object-fit: contain;
            filter: drop-shadow(0 12px 60px rgba(215,165,13,1)) drop-shadow(0 0 80px rgba(153,228,255,1)) drop-shadow(0 0 50px rgba(13,58,215,0.9));
            animation: brandPulse 2s ease-in-out infinite;
          }
          

          
          .infotop {
            text-align: center;
            font-size: clamp(28px, 5vw, 56px);
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            transform: translateY(-50%);
            color: rgb(255, 255, 255);
            font-weight: 700;
            text-shadow: 0 4px 20px rgba(13,58,215,0.8), 0 0 40px rgba(215,165,13,0.4), 0 2px 8px rgba(153,228,255,0.6);
            backdrop-filter: blur(15px);
            background: linear-gradient(135deg, rgba(215,165,13,0.2), rgba(13,58,215,0.15), rgba(153,228,255,0.1));
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 0;
            padding: 2rem;
            margin: 0 2rem;
            animation: float 3s ease-in-out infinite;
            opacity: 1 !important;
            visibility: visible !important;
          }
          
          .cta-button {
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            font-size: clamp(16px, 2vw, 20px);
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(153,228,255,0.4);
            color: white;
            min-height: 56px;
            min-width: 200px;
          }
          
          @media (max-width: 768px) {
            .cta-button {
              padding: 1.25rem 2.5rem;
              font-size: 18px;
              min-height: 64px;
              min-width: 240px;
            }
          }
          
          .cta-button.primary {
            background: linear-gradient(135deg, #d7a50d, #f4c430);
            box-shadow: 0 8px 32px rgba(215,165,13,0.4), 0 4px 16px rgba(215,165,13,0.2);
            border: 2px solid rgba(215,165,13,0.3);
          }
          
          .cta-button.secondary {
            background: linear-gradient(135deg, rgba(13,58,215,0.1), rgba(153,228,255,0.1));
            border: 2px solid rgba(153,228,255,0.6);
            color: rgba(153,228,255,0.9);
            box-shadow: 0 8px 32px rgba(153,228,255,0.2);
          }
          
          .cta-button:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 12px 48px rgba(215,165,13,0.5), 0 0 30px rgba(153,228,255,0.4);
            border-color: rgba(153,228,255,0.8);
          }
          
          .cta-button.primary:hover {
            background: linear-gradient(135deg, #f4c430, #d7a50d);
            box-shadow: 0 16px 64px rgba(215,165,13,0.6), 0 8px 32px rgba(215,165,13,0.3);
          }
          
          .cta-button.secondary:hover {
            background: linear-gradient(135deg, rgba(13,58,215,0.2), rgba(153,228,255,0.2));
            color: white;
            border-color: rgba(153,228,255,0.9);
          }
          
          .playing .wave {
            border-radius: 40%;
            animation: wave 8000ms infinite linear;
          }
          
          .playing .wave:nth-child(2) {
            animation-duration: 10000ms;
          }
          
          .playing .wave:nth-child(3) {
            animation-duration: 12000ms;
          }
          
          .playing .wave:nth-child(4) {
            animation-duration: 14000ms;
          }
          
          @keyframes wave {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(-50%) translateX(0px);
            }
            50% {
              transform: translateY(-50%) translateX(10px);
            }
          }
          
          @keyframes brandPulse {
            0%, 100% {
              transform: scale(1);
              filter: drop-shadow(0 4px 20px rgba(215,165,13,0.8)) drop-shadow(0 0 30px rgba(153,228,255,0.6));
            }
            50% {
              transform: scale(1.05);
              filter: drop-shadow(0 6px 30px rgba(215,165,13,1)) drop-shadow(0 0 40px rgba(153,228,255,0.8)) drop-shadow(0 0 20px rgba(13,58,215,0.7));
            }
          }
        `
      }} />

      <div className="e-card">
        <div className="image"></div>
        <WaveBackground />
        <div className="hero-content">
          <HeroContent
            tagline={tagline}
            logoAlt={logoAlt}
            title={title}
            description={description}
            ctaPrimary={ctaPrimary}
            ctaSecondary={ctaSecondary}
            sectionsHero={sectionsHero}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;