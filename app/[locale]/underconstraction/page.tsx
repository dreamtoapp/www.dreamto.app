"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function Home() {
  // Refs for the logo paths
  const logoRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const locale = useLocale();

  useEffect(() => {
    // Animate the logo paths sequentially and repeat every second
    if (logoRef.current && pathRefs.current.length > 0) {
      gsap.from(pathRefs.current, {
        strokeDashoffset: (index: number, target: SVGPathElement) => {
          const length = target.getTotalLength();
          return length;
        },
        strokeDasharray: (index: number, target: SVGPathElement) => {
          const length = target.getTotalLength();
          return length;
        },
        duration: 1, // Each animation cycle lasts 1 second
        ease: "power2.inOut",
        stagger: 0.2, // Slight delay between each path animation
        repeat: -1, // Repeat infinitely
        yoyo: true, // Reverse the animation after each cycle for a smooth loop
      });
    }
  }, []);

  // Function to handle CTA button click
  const handleContactClick = () => {
    window.location.href = "mailto:info@example.com"; // Replace with your email or contact info
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 overflow-hidden">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        {/* Logo Animation */}
        <svg
          ref={logoRef}
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          width="300"
          height="300"
          viewBox="0 0 10666.66 8000"
          version="1.1"
          style={{
            shapeRendering: "geometricPrecision",
            textRendering: "geometricPrecision",
            imageRendering: "auto",
            fillRule: "evenodd",
            clipRule: "evenodd",
          }}
        >
          <defs>
            <style type="text/css">
              {`
                .str0 {stroke:#fff;stroke-width:10.41;stroke-miterlimit:2.61313}
                .fil0 {fill:none}
              `}
            </style>
          </defs>
          <g id="Layer_x0020_1">
            <g id="_1737930587280">
              {/* Path 1 */}
              <path
                ref={(el) => {
                  pathRefs.current[0] = el;
                }}
                className="fil0 str0"
                d="M5066.54 51.45c2162.72,0 3915.95,1753.23 3915.95,3915.95 0,2162.72 -1753.23,3915.95 -3915.95,3915.95 -39,0 -77.82,-0.74 -116.54,-1.87l0 -1223.61c38.66,1.65 77.48,2.67 116.54,2.67 1487.38,0 2693.13,-1205.76 2693.13,-2693.13 0,-1487.37 -1205.75,-2693.13 -2693.13,-2693.13 -39.06,0 -77.89,1.02 -116.54,2.67l0 -1223.61c38.72,-1.13 77.54,-1.87 116.54,-1.87z"
              />
              {/* Path 2 */}
              <path
                ref={(el) => {
                  pathRefs.current[1] = el;
                }}
                className="fil0 str0"
                d="M5066.54 2513.58c793.27,0 1436.33,643.07 1436.33,1436.34 0,793.27 -643.07,1436.33 -1436.33,1436.33 -39.24,0 -78.09,-1.63 -116.54,-4.72l0 -2863.23c38.45,-3.09 77.3,-4.72 116.54,-4.72z"
              />
            </g>
            {/* Path 3 */}
            <path
              ref={(el) => {
                pathRefs.current[2] = el;
              }}
              className="fil0 str0"
              d="M3880.31 63.11l-1375.25 0 0 3289.91 1375.25 0 0 -3289.91zm-1375.25 4367.17l0 3441.42 1375.25 0 0 -3441.42 -1375.25 0z"
            />
          </g>
        </svg>

        {/* Title and Subtitle */}
        <h1 className="text-6xl font-bold text-white mt-8 mb-4">
          Under Construction
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          We're working hard to bring you something amazing!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Back Button */}
          <Link
            href={"/"}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-300"
            type="button"
          >
            Go Home
          </Link>

          {/* CTA Button */}
          <Link
            href={`/${locale}/contactus `}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Contact Us for More Info
          </Link>
        </div>
      </div>
    </div>
  );
}
