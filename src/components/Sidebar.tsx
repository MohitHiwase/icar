"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GeoVisionLogo from './GeoVisionLogo';
import { useTheme } from './ThemeProvider';

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'space_dashboard' },
    { name: 'GIS Map', path: '/gis-map', icon: 'map', badge: 'Cesium' },
    { name: 'Datasets', path: '/datasets', icon: 'dataset' },
    { name: 'Data Sources', path: '/data-sources', icon: 'hub' },
    { name: 'Analysis Studio', path: '/analysis-studio', icon: 'science' },
    { name: 'Analytics', path: '/analytics', icon: 'analytics' },
    { name: 'Reports', path: '/reports', icon: 'assessment' }
  ];

  return (
    <aside className="w-[240px] h-screen fixed left-0 top-0 border-r border-[var(--border-subtle)] flex flex-col justify-between p-4 bg-[var(--bg-surface)] text-[var(--text-main)] z-30 transition-colors duration-200">
      <div>
        {/* Brand Logo & Node Identifier */}
        <div className="mb-6 px-2 pt-2">
          <GeoVisionLogo size="md" />
          <div className="mt-3 flex items-center justify-between px-2 py-1.5 rounded-md bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-[11px] font-medium text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              GeoVision Processing Node
            </span>
            <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-semibold">
              v1.4
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div className="px-3 mb-2 text-[10.5px] font-semibold uppercase tracking-wider text-[var(--text-faint)]">
          Core Workspaces
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 group ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold"
                    : "text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[20px] transition-colors ${
                      isActive ? "text-emerald-600 dark:text-emerald-400 fill" : "text-[var(--text-muted)] group-hover:text-[var(--text-main)]"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Quick Tools & Settings */}
      <div className="space-y-1 pt-4 border-t border-[var(--border-subtle)]">
        {/* Theme Quick Toggle */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
          <span className="font-medium text-[11.5px]">Theme</span>
          <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-0.5 rounded-md border border-[var(--border-subtle)]">
            <button
              onClick={() => setTheme("light")}
              title="Light Mode"
              className={`p-1 rounded text-[16px] transition-all ${
                theme === "light" ? "bg-emerald-500 text-white shadow-xs" : "hover:text-[var(--text-main)]"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">light_mode</span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              title="Dark Mode"
              className={`p-1 rounded text-[16px] transition-all ${
                theme === "dark" ? "bg-emerald-500 text-white shadow-xs" : "hover:text-[var(--text-main)]"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">dark_mode</span>
            </button>
            <button
              onClick={() => setTheme("system")}
              title="System Theme"
              className={`p-1 rounded text-[16px] transition-all ${
                theme === "system" ? "bg-emerald-500 text-white shadow-xs" : "hover:text-[var(--text-main)]"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">desktop_windows</span>
            </button>
          </div>
        </div>

        {/* Settings Link */}
        <Link
          href="/settings"
          className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            pathname === '/settings'
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold"
              : "text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)]"
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              pathname === '/settings' ? "text-emerald-600 dark:text-emerald-400 fill" : ""
            }`}
          >
            settings
          </span>
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
