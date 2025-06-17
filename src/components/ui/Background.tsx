import type { CSSProperties } from "react";

type HexColor = `#${string}`;
type RGBColor = `rgb(${number}, ${number}, ${number})`;
type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;
type HSLColor = `hsl(${number}, ${number}%, ${number}%)`;
type HSLAColor = `hsla(${number}, ${number}%, ${number}%, ${number})`;

type BackgroundProps = {
  color?: HexColor | RGBColor | RGBAColor | HSLColor | HSLAColor;
  image?: string;
  opacity?: number;
  size?: "cover" | "contain" | "fill" | "none" | "scale-down";
  repeat?: "repeat" | "repeat-x" | "repeat-y" | "space" | "round" | "no-repeat";
  position?: "top" | "bottom" | "left" | "right" | "center";
  zIndex?: number;
};

function Background({
  color,
  image,
  opacity,
  zIndex = -5,
  size = "cover",
  repeat = "no-repeat",
  position = "center",
}: BackgroundProps) {
  function backgroundStyle(): CSSProperties {
    const styles: CSSProperties = {
      position: "fixed",
      width: "100%",
      height: "100%",
      inset: 0,
      zIndex: zIndex,
    };

    if (color) styles.backgroundColor = color;
    if (opacity) styles.opacity = opacity;

    if (image) {
      styles.backgroundImage = `url(${image})`;
      styles.backgroundSize = size;
      styles.backgroundRepeat = repeat;
      styles.backgroundPosition = position;
    }

    return styles;
  }

  return <div style={backgroundStyle()} />;
}

export default Background;
