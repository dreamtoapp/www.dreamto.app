"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function News() {
  return (
    <div style={{ width: "80px", height: "80px" }}>
      <DotLottieReact
        src="/assets/homepage/animateNews.lottie"
        loop
        autoplay
        style={{ width: "100%", height: "100%" }} // Ensures it scales within the container
      />
    </div>
  );
}

export default News;
