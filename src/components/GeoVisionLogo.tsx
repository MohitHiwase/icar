"use client";

interface GeoVisionLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  className?: string;
}

export const GEOVISION_LOGO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAbcIvN2CcJL5gIj_v-RdvWXAjO4OAoZ90SkijhUTHfQN5miv1Y-T1IHSQY3mPgy_cuG13gl-rYpa3xQ1W0Iv4spVT-dlmVgnwNvrpc-mlo8QG7ezmZHVCdpoaOx9fCq18lYwkSR2FJwxebFh3Tm1WegM9kZuEeiUqIDPQ4Uig9O4k66g9wLtvb6HaG-_42lihUIFgr_ckAI2g-72slPyCApNjoLKPb2nMAsMRURVaF30UcJkaOu6Y9J3dWIXfD4YKn5pte-1rloTo";

export default function GeoVisionLogo({
  size = "md",
  variant = "light",
  className = "",
}: GeoVisionLogoProps) {
  const imgSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const titleSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  const subSizes = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-xs",
  };

  const titleColor = variant === "dark" ? "text-white" : "text-on-surface";
  const subColor = variant === "dark" ? "text-white/60" : "text-on-surface-variant";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={GEOVISION_LOGO_URL}
        alt="GeoVision Logo"
        className={`${imgSizes[size]} object-contain`}
      />
      <div>
        <h1 className={`font-bold leading-tight ${titleSizes[size]} ${titleColor}`}>
          GeoVision
        </h1>
        <p className={`font-medium tracking-wide ${subSizes[size]} ${subColor}`}>
          GIS Intelligence
        </p>
      </div>
    </div>
  );
}
