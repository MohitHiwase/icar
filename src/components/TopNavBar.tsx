'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export default function TopNavBar() {
  const pathname = usePathname();

  // Define defaults for Dashboard and fallback
  let title = "GeoVision Operational Dashboard";
  let subtitle = "Real-time geospatial intelligence and global telemetry streams";
  let extraLeft: React.ReactNode = null;
  let extraRight: React.ReactNode = null;

  if (pathname === '/gis-map') {
    title = "GIS Mapping Engine";
    subtitle = "";
    extraLeft = (
      <div className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-md text-[10px] font-bold uppercase tracking-wider">LIVE</div>
    );
  } else if (pathname === '/datasets') {
    title = "Data Catalog";
    subtitle = "Overview of your agriculture intelligence platform";
  } else if (pathname === '/analysis-studio') {
    title = "Yield Prediction Model v2";
    subtitle = "";
    extraLeft = (
      <div className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container rounded-md text-[10px] font-bold tracking-wider uppercase">DRAFT</div>
    );
    extraRight = (
      <>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <span className="material-symbols-outlined text-[18px]">cloud_done</span>
          <span className="text-xs font-medium">Autosaved 2m ago</span>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-low transition-all text-sm">
          <span className="material-symbols-outlined text-[20px]">play_arrow</span>
          Run Simulation
        </button>
      </>
    );
  } else if (pathname === '/data-sources') {
    title = "Data Sources";
    subtitle = "";
    extraRight = (
      <>
        <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg cursor-pointer">
          <span className="material-symbols-outlined text-sm">calendar_today</span>
          <span className="text-sm font-medium">May 20 – May 27, 2024</span>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </div>
        <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm hover:bg-primary/90 transition-all">
          <span className="material-symbols-outlined text-xl">add</span>
          Connect New Source
        </button>
      </>
    );
  } else if (pathname === '/analytics') {
    title = "Analytics Studio";
    subtitle = "Deep dive into your agricultural data performance";
    extraRight = (
      <div className="flex items-center bg-white border border-gray-100 rounded-lg px-4 py-2 text-on-surface-variant shadow-sm cursor-pointer">
        <span className="material-symbols-outlined text-xl mr-3">calendar_today</span>
        <span className="text-sm font-semibold">Q3 2024 Comparison</span>
        <span className="material-symbols-outlined text-xl ml-3">expand_more</span>
      </div>
    );
  } else if (pathname === '/reports') {
    title = "Command & Reports Center";
    subtitle = "Automated generated briefings and statistical aggregates";
    extraRight = (
      <>
        <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold bg-white px-4 py-2 rounded-lg border border-outline-variant/50 shadow-sm">
          <span className="material-symbols-outlined text-[20px]">history</span>
          Archive
        </button>
        <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold shadow-sm hover:bg-primary/90 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">add_task</span>
          Create New Export
        </button>
      </>
    );
  } else if (pathname === '/settings') {
    title = "Platform Settings";
    subtitle = "Configure your workspace, manage team access, and view your billing cycles.";
  }

  return (
    <header className="h-[72px] shrink-0 bg-white/80 backdrop-blur-md border-b border-outline-variant/30 flex items-center justify-between px-10 z-40 sticky top-0 w-full transition-all duration-300">
      
      {/* Left Area (Title, Subtitle, Ext Left) */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h2 className="font-headline-md text-2xl font-bold text-on-surface leading-tight tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs text-on-surface-variant font-medium mt-0.5">{subtitle}</p>}
        </div>
        {extraLeft}
      </div>

      {/* Right Area (Extra Right Actions + Search + Profile) */}
      <div className="flex items-center gap-5">
        
        {extraRight && <div className="flex items-center gap-4">{extraRight}</div>}
        
        {extraRight && <div className="h-8 w-[1px] bg-outline-variant/40 mx-2"></div>}

        {/* Global Search Bar */}
        <div className="relative hidden xl:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-[20px]">search</span>
          <input 
            className="w-[280px] pl-[38px] pr-4 py-2.5 bg-surface-container-low border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-on-surface placeholder:text-on-surface-variant/60 shadow-sm" 
            placeholder="Search datasets, layers..." 
            type="text"
          />
        </div>

        <div className="flex items-center gap-3 ml-2">
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors text-on-surface-variant relative">
             <span className="material-symbols-outlined">notifications</span>
             <span className="absolute top-[8px] right-[8px] w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-outline-variant/50 mx-2"></div>

          {/* Unified Profile */}
          <div className="flex items-center gap-3 cursor-pointer group select-none">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/10 group-hover:border-primary/40 transition-all shadow-sm">
              <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpxkBDkrgOgzQQE4FS8sFp6rW9qCxYUIIaxjUF9LsniNetAWtUKZRH6HFLAuv6va8fdME5VMx94Il_P9UFm0Zdn32sM7WgzAvT2tz4vEf8YAvVjRE3wYO3_9JHS5DtZF5Vlkq1yU68Q1YIDLLU-pnWhEI8qyC2oyYqaUDSP4xE8eNpZ6C4Gz8ozqUXcfkJfXtxPKXZE4gWh7igzchmuaQjb1Xpc8ABLb6XDFx9k54rvtcXa-BQ8rV0p0MWfnr767eywCrDtFmAU14" />
            </div>
            <div className="hidden lg:block text-left relative top-[1px]">
              <p className="text-[13px] font-bold text-on-surface leading-none mb-1">John Doe</p>
              <p className="text-[10.5px] text-on-surface-variant font-medium leading-none tracking-wide">Dr. Elena Rostova</p>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-surface transition-colors">expand_more</span>
          </div>
        </div>
      </div>
    </header>
  );
}
