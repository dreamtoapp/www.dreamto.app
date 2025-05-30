import React from "react";

type LogoSVGProps = {
  width?: string;
  height?: string;
  color?: string;
};

const LogoSVG: React.FC<LogoSVGProps> = ({
  width = "100%",
  height = "100%",
  color = "black",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={width}
      height={height}
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
            .str0 {stroke:${color};stroke-width:10.41;stroke-miterlimit:2.61313}
            .fil0 {fill:${color}}
          `}
        </style>
      </defs>
      <g id="Layer_x0020_1">
        <g id="_1737930587280">
          <path
            className="fil0 str0"
            d="M5066.54 51.45c2162.72,0 3915.95,1753.23 3915.95,3915.95 0,2162.72 -1753.23,3915.95 -3915.95,3915.95 -39,0 -77.82,-0.74 -116.54,-1.87l0 -1223.61c38.66,1.65 77.48,2.67 116.54,2.67 1487.38,0 2693.13,-1205.76 2693.13,-2693.13 0,-1487.37 -1205.75,-2693.13 -2693.13,-2693.13 -39.06,0 -77.89,1.02 -116.54,2.67l0 -1223.61c38.72,-1.13 77.54,-1.87 116.54,-1.87z"
          />
          <path
            className="fil0 str0"
            d="M5066.54 2513.58c793.27,0 1436.33,643.07 1436.33,1436.34 0,793.27 -643.07,1436.33 -1436.33,1436.33 -39.24,0 -78.09,-1.63 -116.54,-4.72l0 -2863.23c38.45,-3.09 77.3,-4.72 116.54,-4.72z"
          />
        </g>
        <path
          className="fil0 str0"
          d="M3880.31 63.11l-1375.25 0 0 3289.91 1375.25 0 0 -3289.91zm-1375.25 4367.17l0 3441.42 1375.25 0 0 -3441.42 -1375.25 0z"
        />
      </g>
    </svg>
  );
};

export default LogoSVG;
