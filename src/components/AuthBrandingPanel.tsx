"use client";

import GeoVisionLogo from "./GeoVisionLogo";

/**
 * Reusable Auth Branding Panel
 *
 * Provides a unified left-side branding section for authentication pages
 * (Login, Register). Displays the official GeoVision logo, platform summary,
 * and key feature highlights.
 */
export default function AuthBrandingPanel() {
  const features = [
    { icon: "database", label: "Multi-source Data" },
    { icon: "insights", label: "AI Analytics" },
    { icon: "map", label: "3D Visualization" },
    { icon: "experiment", label: "Analysis Studio" },
  ];

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1F6F5F] to-[#155349] relative overflow-hidden">
      {/* Background Decorative Blur Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#3FA796] rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center px-16">
        {/* Official Brand Logo */}
        <GeoVisionLogo variant="dark" size="lg" className="mb-8" />

        {/* Platform Overview */}
        <p className="text-white/80 text-lg leading-relaxed max-w-md">
          Unified Geospatial Data Integration and AI Analytics Platform.
          Connect, analyze, and visualize geospatial data at scale.
        </p>

        {/* Key Features Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 max-w-md">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2 text-white/70 text-sm"
            >
              <span className="material-symbols-outlined text-[18px] text-[#3FA796]">
                {f.icon}
              </span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
