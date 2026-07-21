"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
        <div className="flex items-center gap-3 mb-10">
          <img alt="GeoVision Logo" className="w-10 h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbcIvN2CcJL5gIj_v-RdvWXAjO4OAoZ90SkijhUTHfQN5miv1Y-T1IHSQY3mPgy_cuG13gl-rYpa3xQ1W0Iv4spVT-dlmVgnwNvrpc-mlo8QG7ezmZHVCdpoaOx9fCq18lYwkSR2FJwxebFh3Tm1WegM9kZuEeiUqIDPQ4Uig9O4k66g9wLtvb6HaG-_42lihUIFgr_ckAI2g-72slPyCApNjoLKPb2nMAsMRURVaF30UcJkaOu6Y9J3dWIXfD4YKn5pte-1rloTo" />
          <div>
            <h1 className="font-headline-md text-xl font-bold text-on-surface leading-tight">GeoVision</h1>
            <p className="text-[10px] text-on-surface-variant font-medium">GIS Intelligence</p>
          </div>
        </div>
        
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
