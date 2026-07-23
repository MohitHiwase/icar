"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import GeoVisionLogo from './GeoVisionLogo';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'dashboard' },
    { name: 'GIS Map', path: '/gis-map', icon: 'map' },
    { name: 'Datasets', path: '/datasets', icon: 'database' },
    { name: 'Analysis Studio', path: '/analysis-studio', icon: 'experiment' },
    { name: 'Data Sources', path: '/data-sources', icon: 'hub' },
    { name: 'Analytics', path: '/analytics', icon: 'insights' },
    { name: 'Reports', path: '/reports', icon: 'bar_chart' }
  ];

  return (
    <aside className="w-[240px] h-screen fixed left-0 top-0 border-r border-outline-variant/30 flex flex-col justify-between p-6 bg-white z-20">
      <div>
        {/* Brand Logo */}
        <GeoVisionLogo variant="light" size="md" className="mb-10" />
        
        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 transition-all ${
                  isActive
                    ? "bg-[#e6f3f0] text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Settings at Bottom */}
      <div className="pt-4">
        <Link
          href="/settings"
          className={`flex items-center gap-3 rounded-lg px-4 py-2.5 transition-colors ${
            pathname === '/settings'
              ? "bg-[#e6f3f0] text-primary"
              : "text-on-surface-variant hover:bg-surface-container-low"
          }`}
        >
          <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: pathname === '/settings' ? "'FILL' 1" : "'FILL' 0" }}>settings</span>
          <span className="text-sm">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
