import Image from "next/image";
import React from "react";

function Crombo() {
  return (
    <Image
      src={"/assets/crombo.png"}
      alt="crombo"
      width={32} // Specify the width
      height={32} // Specify the height
      loading="eager"
      priority
      // className="object-contain" // Prevents stretching
      sizes="(max-width: 400px) 100vw, 400px"
    />
  );
}

export default Crombo;
