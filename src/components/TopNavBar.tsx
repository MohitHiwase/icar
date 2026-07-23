'use client';

import { usePathname } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';

export default function TopNavBar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Define defaults for Dashboard and fallback
  let title = "GeoVision Command Center";
  let subtitle = "Real-time geospatial data platform & spatial analytics stream";
  let extraLeft: React.ReactNode = null;
  let extraRight: React.ReactNode = null;

  if (pathname === '/gis-map') {
    title = "GIS Workspace";
    subtitle = "Cesium 3D Globe Viewer & Spatial Layer Inspector";
    extraLeft = (
      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-mono font-semibold uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
        Cesium Engine Active
      </div>
    );
  } else if (pathname === '/datasets') {
    title = "Data Catalog";
    subtitle = "Manage geospatial datasets, shapefiles, and vector layers";
  } else if (pathname === '/analysis-studio') {
    title = "Yield Prediction Model v2";
    subtitle = "AI-assisted spatial yield simulation & satellite inference";
    extraLeft = (
      <div className="px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded text-[10px] font-mono font-semibold uppercase tracking-wider">
        DRAFT MODEL
      </div>
    );
    extraRight = (
      <>
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
          <span className="material-symbols-outlined text-[16px] text-emerald-500">cloud_done</span>
          <span>Autosaved</span>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-medium shadow-sm transition-all">
          <span className="material-symbols-outlined text-[16px]">play_arrow</span>
          Run Simulation
        </button>
      </>
    );
  } else if (pathname === '/data-sources') {
    title = "Data Sources";
    subtitle = "External providers and streaming geospatial connections";
  } else if (pathname === '/analytics') {
    title = "Analytics Studio";
    subtitle = "Crop health, NDVI indices, and environmental trends";
  } else if (pathname === '/reports') {
    title = "Reports & Intelligence";
    subtitle = "Automated geospatial summary briefings and statistical exports";
  } else if (pathname === '/settings') {
    title = "Platform Settings";
    subtitle = "Configure workspace preferences, map defaults, and account details";
  }

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="h-[64px] shrink-0 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] flex items-center justify-between px-6 z-20 sticky top-0 w-full transition-colors duration-200">
      
      {/* Left Area (Title, Subtitle, Ext Left) */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[var(--text-main)] tracking-tight leading-tight">{title}</h2>
            {extraLeft}
          </div>
          {subtitle && <p className="text-[11.5px] text-[var(--text-muted)] font-medium mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {/* Right Area (Extra Right Actions + Search + Profile) */}
      <div className="flex items-center gap-4">
        
        {extraRight && <div className="flex items-center gap-3">{extraRight}</div>}

        {/* Global Search Bar */}
        <div className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[18px]">search</span>
          <input 
            className="w-[220px] lg:w-[260px] pl-[34px] pr-3 py-1.5 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-md text-xs text-[var(--text-main)] placeholder:text-[var(--text-faint)] focus:outline-none focus:border-emerald-500 transition-colors" 
            placeholder="Search spatial layers, datasets..." 
            type="text"
          />
        </div>

        {/* Notifications & User Menu */}
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-md flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)] transition-colors relative">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
          </button>
          
          <div className="h-5 w-[1px] bg-[var(--border-subtle)]"></div>

          {/* Profile + Dropdown */}
          <div className="relative" ref={menuRef}>
            <div
              className="flex items-center gap-2.5 cursor-pointer group select-none py-1"
              onClick={() => setShowMenu(!showMenu)}
            >
              <div className="w-8 h-8 rounded-md overflow-hidden border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                {userInitial}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-[var(--text-main)] leading-none">{user?.name || "User"}</p>
                <p className="text-[10px] text-[var(--text-muted)] font-mono leading-none mt-1">{user?.email || ""}</p>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">expand_more</span>
            </div>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg shadow-lg py-1 z-50">
                <div className="px-3 py-2 border-b border-[var(--border-subtle)]">
                  <p className="text-xs font-semibold text-[var(--text-main)]">{user?.name}</p>
                  <p className="text-[11px] text-[var(--text-muted)] truncate">{user?.email}</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9.5px] font-mono font-bold rounded uppercase">
                    {user?.role || "USER"}
                  </span>
                </div>
                <button
                  onClick={async () => {
                    setShowMenu(false);
                    await logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
