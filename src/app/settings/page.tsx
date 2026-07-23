'use client';

import { useState } from 'react';
import { useTheme, Theme } from '@/components/ThemeProvider';

type SettingsTab = 'general' | 'appearance' | 'map' | 'notifications' | 'account' | 'application' | 'storage';

interface TeamMember {
  id: string;
  initials: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const MOCK_TEAM: TeamMember[] = [
  { id: 'usr-1', initials: 'EV', name: 'Elena Vance', email: 'elena.v@geovision.ai', role: 'Admin', status: 'Active' },
  { id: 'usr-2', initials: 'MK', name: 'Marcus Kiley', email: 'm.kiley@geovision.ai', role: 'GIS Specialist', status: 'Active' }
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [mapBaseLayer, setMapBaseLayer] = useState('bing_satellite');
  const [mapProjection, setMapProjection] = useState('epsg_4326');
  const [autoFlyToLayer, setAutoFlyToLayer] = useState(true);

  const tabs: { id: SettingsTab; label: string; icon: string }[] = [
    { id: 'general', label: 'General', icon: 'settings' },
    { id: 'appearance', label: 'Appearance', icon: 'palette' },
    { id: 'map', label: 'Map Preferences', icon: 'map' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'account', label: 'Account & Team', icon: 'manage_accounts' },
    { id: 'application', label: 'Application & Node', icon: 'dataset' },
    { id: 'storage', label: 'Storage & Usage', icon: 'storage' }
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto text-[var(--text-main)] transition-colors duration-200">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Manage workspace themes, GIS projection defaults, notification triggers, and node storage
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navigation Sidebar Tabs */}
        <div className="lg:col-span-3">
          <div className="bg-[var(--bg-surface)] p-2 rounded-xl border border-[var(--border-subtle)] shadow-xs space-y-1 sticky top-24">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <div className="bg-[var(--bg-surface)] p-6 rounded-xl border border-[var(--border-subtle)] shadow-xs space-y-6">
              <div className="border-b border-[var(--border-subtle)] pb-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-500 text-[20px]">palette</span>
                  Appearance & Theme Settings
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Customize the interface theme of GeoVision. Preferences are persisted automatically.
                </p>
              </div>

              {/* Theme Mode Selection Cards */}
              <div>
                <label className="text-xs font-semibold text-[var(--text-main)] block mb-3">Theme Mode</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Light Card */}
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between h-32 ${
                      theme === 'light'
                        ? 'border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-medium)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-amber-500 text-[24px]">light_mode</span>
                      {theme === 'light' && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[var(--text-main)]">Light Theme</p>
                      <p className="text-[10.5px] text-[var(--text-muted)] mt-0.5">High clarity for daytime GIS analysis</p>
                    </div>
                  </button>

                  {/* Dark Card */}
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between h-32 ${
                      theme === 'dark'
                        ? 'border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-medium)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-teal-400 text-[24px]">dark_mode</span>
                      {theme === 'dark' && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[var(--text-main)]">Dark Theme (Deep Slate)</p>
                      <p className="text-[10.5px] text-[var(--text-muted)] mt-0.5">Optimized for high density imagery</p>
                    </div>
                  </button>

                  {/* System Card */}
                  <button
                    onClick={() => setTheme('system')}
                    className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between h-32 ${
                      theme === 'system'
                        ? 'border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-app)] hover:border-[var(--border-medium)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-indigo-400 text-[24px]">desktop_windows</span>
                      {theme === 'system' && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[var(--text-main)]">System Preference</p>
                      <p className="text-[10.5px] text-[var(--text-muted)] mt-0.5">Sync automatically with OS theme</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Resolved Status */}
              <div className="p-3.5 rounded-lg bg-[var(--bg-app)] border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] font-medium">Currently Active Resolved Theme:</span>
                <span className="font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                  {resolvedTheme} mode
                </span>
              </div>
            </div>
          )}

          {/* MAP PREFERENCES TAB */}
          {activeTab === 'map' && (
            <div className="bg-[var(--bg-surface)] p-6 rounded-xl border border-[var(--border-subtle)] shadow-xs space-y-6">
              <div className="border-b border-[var(--border-subtle)] pb-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-500 text-[20px]">map</span>
                  Cesium & GIS Map Preferences
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Configure default base maps, camera projections, and layer interaction defaults.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[var(--text-main)]">Default Imagery Basemap</label>
                  <select
                    value={mapBaseLayer}
                    onChange={(e) => setMapBaseLayer(e.target.value)}
                    className="w-full p-2.5 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-lg text-xs font-medium text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
                  >
                    <option value="bing_satellite">Bing Maps Aerial / Satellite</option>
                    <option value="osm_standard">OpenStreetMap Standard</option>
                    <option value="carto_dark">CartoDB Dark Matter</option>
                    <option value="esri_world">Esri World Imagery</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[var(--text-main)]">Default Spatial Datum / Projection</label>
                  <select
                    value={mapProjection}
                    onChange={(e) => setMapProjection(e.target.value)}
                    className="w-full p-2.5 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-lg text-xs font-medium text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
                  >
                    <option value="epsg_4326">WGS 84 (EPSG:4326)</option>
                    <option value="epsg_3857">Web Mercator (EPSG:3857)</option>
                    <option value="utm_34n">UTM Zone 43N (India)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[var(--bg-app)] rounded-lg border border-[var(--border-subtle)]">
                <div>
                  <p className="text-xs font-bold text-[var(--text-main)]">Auto Fly-To on Layer Load</p>
                  <p className="text-[11px] text-[var(--text-muted)]">Automatically zoom Cesium 3D camera to layer spatial bounding box on import.</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoFlyToLayer}
                  onChange={(e) => setAutoFlyToLayer(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* GENERAL TAB */}
          {activeTab === 'general' && (
            <div className="bg-[var(--bg-surface)] p-6 rounded-xl border border-[var(--border-subtle)] shadow-xs space-y-6">
              <div className="border-b border-[var(--border-subtle)] pb-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-500 text-[20px]">corporate_fare</span>
                  Organization Profile
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">General platform configuration and organization identity.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[var(--text-main)]">Organization Name</label>
                  <input
                    type="text"
                    defaultValue="GeoVision Geospatial Intelligence Platform"
                    className="w-full p-2.5 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-lg text-xs font-medium text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-[var(--text-main)]">Geospatial Sector</label>
                  <input
                    type="text"
                    defaultValue="Agricultural Intelligence & Remote Sensing"
                    className="w-full p-2.5 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-lg text-xs font-medium text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="bg-[var(--bg-surface)] p-6 rounded-xl border border-[var(--border-subtle)] shadow-xs space-y-4">
              <div className="border-b border-[var(--border-subtle)] pb-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-500 text-[20px]">notifications</span>
                  Alerts & Notifications
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">Configure telemetry triggers and automated email summaries.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 bg-[var(--bg-app)] rounded-lg border border-[var(--border-subtle)]">
                  <div>
                    <p className="font-bold text-[var(--text-main)]">GeoJSON Dataset Import Confirmation</p>
                    <p className="text-[11px] text-[var(--text-muted)]">Receive notification when dataset processing completes.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-500 rounded" />
                </div>
                <div className="flex items-center justify-between p-3 bg-[var(--bg-app)] rounded-lg border border-[var(--border-subtle)]">
                  <div>
                    <p className="font-bold text-[var(--text-main)]">Weekly Spatial Telemetry Briefing</p>
                    <p className="text-[11px] text-[var(--text-muted)]">Email PDF digest of active spatial extents every Monday.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-500 rounded" />
                </div>
              </div>
            </div>
          )}

          {/* ACCOUNT & TEAM TAB */}
          {activeTab === 'account' && (
            <div className="bg-[var(--bg-surface)] p-6 rounded-xl border border-[var(--border-subtle)] shadow-xs space-y-4">
              <div className="border-b border-[var(--border-subtle)] pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500 text-[20px]">manage_accounts</span>
                    Team & Account Management
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Manage team members and access roles.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[var(--bg-app)] text-[10.5px] uppercase font-mono font-semibold text-[var(--text-muted)] border-b border-[var(--border-subtle)]">
                      <th className="px-4 py-2.5">User</th>
                      <th className="px-4 py-2.5">Role</th>
                      <th className="px-4 py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)]">
                    {MOCK_TEAM.map((m) => (
                      <tr key={m.id} className="hover:bg-[var(--bg-app)] transition-colors">
                        <td className="px-4 py-3 font-semibold">
                          <div>
                            <p className="font-bold text-[var(--text-main)]">{m.name}</p>
                            <p className="text-[11px] text-[var(--text-muted)] font-mono">{m.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                            {m.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                          {m.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* APPLICATION & STORAGE TABS */}
          {(activeTab === 'application' || activeTab === 'storage') && (
            <div className="bg-[var(--bg-surface)] p-6 rounded-xl border border-[var(--border-subtle)] shadow-xs space-y-4">
              <div className="border-b border-[var(--border-subtle)] pb-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-500 text-[20px]">storage</span>
                  Node Storage & System Info
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">Overview of storage abstraction layer and server telemetry.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[var(--bg-app)] rounded-lg border border-[var(--border-subtle)] space-y-1">
                  <span className="text-[10.5px] font-mono text-[var(--text-muted)] uppercase">Active Storage Provider</span>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">LocalStorageProvider (/uploads)</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">Abstracted layer ready for S3 / Azure Blob / GCS</p>
                </div>

                <div className="p-4 bg-[var(--bg-app)] rounded-lg border border-[var(--border-subtle)] space-y-1">
                  <span className="text-[10.5px] font-mono text-[var(--text-muted)] uppercase">Database Engine</span>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">PostgreSQL via Prisma ORM</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">Express 5 + Zod Validation Middleware</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
