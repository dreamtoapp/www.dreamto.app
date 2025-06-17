import React, { memo } from "react"
import { Button } from "./button"
import { getTranslations } from "next-intl/server"
import Link from "../link"

// Enhanced particle configuration with varied sizes and behaviors (memoized)
const PARTICLE_CONFIG = Array.from({ length: 12 }, (_, i) => {
  const seed1 = i * 123.456
  const seed2 = i * 789.012
  const seed3 = i * 345.678
  const seed4 = i * 567.89
  return {
    id: `particle-${i}`,
    left: (Math.sin(seed1) * 0.5 + 0.5) * 100,
    top: (Math.sin(seed2) * 0.5 + 0.5) * 100,
    delay: (Math.sin(seed3) * 0.5 + 0.5) * 3,
    duration: 4 + (Math.sin(seed1 + seed2) * 0.5 + 0.5) * 4,
    size: 2 + (Math.sin(seed4) * 0.5 + 0.5) * 4,
    opacity: 0.3 + (Math.sin(seed1 + seed3) * 0.5 + 0.5) * 0.4,
  }
})

const FLOATING_SHAPES = [
  { type: "circle", size: 60, top: "20%", left: "15%", delay: "0s", duration: "8s" },
  { type: "square", size: 40, top: "70%", left: "85%", delay: "2s", duration: "10s" },
  { type: "triangle", size: 50, top: "40%", left: "90%", delay: "4s", duration: "12s" },
  { type: "circle", size: 30, top: "80%", left: "10%", delay: "1s", duration: "9s" },
  { type: "square", size: 35, top: "15%", left: "80%", delay: "3s", duration: "11s" },
]

const SPARKLES = [
  { top: "15%", left: "20%", delay: "0s", size: "w-3 h-3", color: "bg-blue-300/80" },
  { top: "30%", left: "80%", delay: "1.2s", size: "w-4 h-4", color: "bg-purple-300/80" },
  { top: "60%", left: "60%", delay: "2.1s", size: "w-2 h-2", color: "bg-cyan-300/80" },
  { top: "75%", left: "35%", delay: "0.7s", size: "w-5 h-5", color: "bg-pink-300/80" },
  { top: "50%", left: "10%", delay: "1.7s", size: "w-3 h-3", color: "bg-emerald-300/80" },
  { top: "80%", left: "80%", delay: "2.7s", size: "w-2 h-2", color: "bg-yellow-300/80" },
  { top: "25%", left: "70%", delay: "3.2s", size: "w-4 h-4", color: "bg-indigo-300/80" },
  { top: "65%", left: "25%", delay: "1.9s", size: "w-3 h-3", color: "bg-rose-300/80" },
]

// Memoized AnimatedBackground for performance
const AnimatedBackground = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {/* Enhanced gradient orbs */}
    <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full blur-3xl animate-pulse-slow" />
    <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-full blur-3xl animate-pulse-slower" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-3xl animate-pulse-medium" />
    {/* Enhanced particles */}
    {PARTICLE_CONFIG.map((particle) => (
      <div
        key={particle.id}
        className="absolute bg-white/40 rounded-full animate-float shadow-[0_0_12px_4px_rgba(255,255,255,0.2)]"
        style={{
          left: `${particle.left.toFixed(4)}%`,
          top: `${particle.top.toFixed(4)}%`,
          animationDelay: `${particle.delay}s`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          opacity: particle.opacity,
        }}
        aria-hidden="true"
      />
    ))}
    {/* Floating geometric shapes */}
    {FLOATING_SHAPES.map((shape, i) => (
      <div
        key={`shape-${i}`}
        className={`absolute animate-float-slow ${
          shape.type === "circle"
            ? "rounded-full"
            : shape.type === "square"
            ? "rounded-lg rotate-45"
            : "clip-triangle"
        } bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20`}
        style={{
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          top: shape.top,
          left: shape.left,
          animationDelay: shape.delay,
          animationDuration: shape.duration,
        }}
        aria-hidden="true"
      />
    ))}
  </div>
))
AnimatedBackground.displayName = "AnimatedBackground"

// Memoized ProgressiveBackground for performance
const ProgressiveBackground = memo(() => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10666.66 8000"
      width="100%"
      height="100%"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ zIndex: 0, opacity: 0.08 }}
      aria-hidden="true"
      focusable="false"
    >
      <g>
        <path
          fill="white"
          stroke="white"
          strokeWidth="10.41"
          strokeMiterlimit="2.61313"
          d="M5066.54 51.45c2162.72,0 3915.95,1753.23 3915.95,3915.95 0,2162.72 -1753.23,3915.95 -3915.95,3915.95 -39,0 -77.82,-0.74 -116.54,-1.87l0 -1223.61c38.66,1.65 77.48,2.67 116.54,2.67 1487.38,0 2693.13,-1205.76 2693.13,-2693.13 0,-1487.37 -1205.75,-2693.13 -2693.13,-2693.13 -39.06,0 -77.89,1.02 -116.54,2.67l0 -1223.61c38.72,-1.13 77.54,-1.87 116.54,-1.87z"
        />
        <path
          fill="white"
          stroke="white"
          strokeWidth="10.41"
          strokeMiterlimit="2.61313"
          d="M5066.54 2513.58c793.27,0 1436.33,643.07 1436.33,1436.34 0,793.27 -643.07,1436.33 -1436.33,1436.33 -39.24,0 -78.09,-1.63 -116.54,-4.72l0 -2863.23c38.45,-3.09 77.3,-4.72 116.54,-4.72z"
        />
        <path
          fill="white"
          stroke="white"
          strokeWidth="10.41"
          strokeMiterlimit="2.61313"
          d="M3880.31 63.11l-1375.25 0 0 3289.91 1375.25 0 0 -3289.91zm-1375.25 4367.17l0 3441.42 1375.25 0 0 -3441.42 -1375.25 0z"
        />
      </g>
    </svg>
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 pointer-events-none z-10" aria-hidden="true" />
  </>
))
ProgressiveBackground.displayName = "ProgressiveBackground"

const Hero = async () => {
  const t = await getTranslations("homepage")

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 pt-24 pb-12 sm:py-20 overflow-hidden">
      {/* Enhanced animated gradient background */}
      <div
        className="absolute inset-0 w-full h-full z-0 animate-gradient-move bg-gradient-to-br from-[#0a0f1c] via-[#1e1b4b] via-[#312e81] to-[#1e40af] to-[#0369a1]"
        style={{ backgroundSize: "300% 300%" }}
      />

      {/* Progressive background */}
      <ProgressiveBackground />

      {/* Animated background elements */}
      <AnimatedBackground />

      {/* Enhanced glassy web form card with multiple layers */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] sm:h-[600px]">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" />
        {/* Main glass card with even stronger blur and more transparency */}
        <div className="relative w-full h-full rounded-3xl bg-white/2 backdrop-blur-[28px] shadow-2xl border border-white/30 overflow-hidden">
          {/* Inner gradient overlay with more transparency */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 rounded-3xl" />
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>
        {/* Logo: half outside, half inside the card */}
        <div className="absolute left-1/2 -top-20 sm:-top-20 z-20 -translate-x-1/2 flex flex-col items-center">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center rounded-full bg-gradient-to-br from-white/90 to-white/70 shadow-2xl border-4 border-white/50 animate-logo-pulse overflow-visible backdrop-blur-sm">
            {/* Glowing ring */}
            <span className="absolute inset-0 rounded-full border-4 border-blue-400/40 blur-md animate-logo-shimmer" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10666.66 8000"
              width="75%"
              height="75%"
              className="relative z-10 drop-shadow-lg"
              aria-label={t("logo.alt")}
              focusable="false"
            >
              <g>
                <path
                  fill="black"
                  stroke="black"
                  strokeWidth="10.41"
                  strokeMiterlimit="2.61313"
                  d="M5066.54 51.45c2162.72,0 3915.95,1753.23 3915.95,3915.95 0,2162.72 -1753.23,3915.95 -3915.95,3915.95 -39,0 -77.82,-0.74 -116.54,-1.87l0 -1223.61c38.66,1.65 77.48,2.67 116.54,2.67 1487.38,0 2693.13,-1205.76 2693.13,-2693.13 0,-1487.37 -1205.75,-2693.13 -2693.13,-2693.13 -39.06,0 -77.89,1.02 -116.54,2.67l0 -1223.61c38.72,-1.13 77.54,-1.87 116.54,-1.87z"
                />
                <path
                  fill="black"
                  stroke="black"
                  strokeWidth="10.41"
                  strokeMiterlimit="2.61313"
                  d="M5066.54 2513.58c793.27,0 1436.33,643.07 1436.33,1436.34 0,793.27 -643.07,1436.33 -1436.33,1436.33 -39.24,0 -78.09,-1.63 -116.54,-4.72l0 -2863.23c38.45,-3.09 77.3,-4.72 116.54,-4.72z"
                />
                <path
                  fill="black"
                  stroke="black"
                  strokeWidth="10.41"
                  strokeMiterlimit="2.61313"
                  d="M3880.31 63.11l-1375.25 0 0 3289.91 1375.25 0 0 -3289.91zm-1375.25 4367.17l0 3441.42 1375.25 0 0 -3441.42 -1375.25 0z"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Enhanced animated sparkles */}
      {SPARKLES.map((s, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute z-20 ${s.size} rounded-full ${s.color} opacity-70 animate-sparkle shadow-lg`}
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}

      <div className="relative z-30 flex flex-col items-center text-center space-y-8 sm:space-y-12 w-full max-w-4xl mx-auto mt-20 sm:mt-28">
        {/* Enhanced tagline with gradient background */}
        <div className="relative">
          <span className="inline-block mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-blue-600/90 text-white text-xs sm:text-sm font-bold tracking-widest shadow-lg uppercase font-cairo backdrop-blur-sm border border-white/20 animate-gradient-x">
            {t("tagline", { defaultValue: "DREAM. DESIGN. DELIVER." })}
          </span>
        </div>

        {/* Enhanced heading with better gradient and shadow */}
        <h1 className="font-extrabold text-4xl bg-gradient-to-r from-blue-400 via-purple-300 via-cyan-300 to-blue-400 text-transparent bg-clip-text leading-loose tracking-wide drop-shadow-2xl animate-gradient-x">
          {t("title")}
        </h1>

        {/* Enhanced description with better typography */}
        <p className="text-2xl text-gray-100 max-w-3xl mx-auto font-light leading-relaxed opacity-95 drop-shadow-lg">
          {t("description")}
        </p>

        {/* Enhanced buttons with modern styling */}
        <div className="flex flex-col sm:flex-row gap-6 mt-8 w-full justify-center">
          <Link href="/contactus" 
            className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-full text-base sm:text-lg font-bold shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px] border border-blue-500/50 backdrop-blur-sm overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">{t("cta.primary")}</span>
            
          </Link>
          <Link href="/services"   className="group relative border-2 border-blue-400/60 hover:border-blue-300 text-blue-100 hover:text-white px-10 py-4 rounded-full text-base sm:text-lg font-bold shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px] bg-white/10 backdrop-blur-sm hover:bg-white/20 overflow-hidden">
          
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">{t("cta.secondary")}</span>
          
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
