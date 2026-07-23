'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardMapWrapper from '@/components/DashboardMapWrapper';

interface KPIData {
  id: string;
  title: string;
  value: string;
  subValue?: string;
  subText: string;
  icon: string;
  trend: 'up' | 'neutral' | 'pulse';
}

interface Activity {
  id: string;
  title: string;
  subtitle: string;
  timeAgo: string;
  icon: string;
  statusColor: string;
}

interface SpatialOpportunity {
  id: string;
  siteName: string;
  details: string;
  suitability: number;
  value: string;
  readiness: string;
  readinessBadge: string;
  ownerName: string;
}

const MOCK_KPIS: KPIData[] = [
  { id: 'kpi-1', title: 'Active Datasets', value: '28', subValue: '+4', subText: 'added this week', icon: 'dataset', trend: 'up' },
  { id: 'kpi-2', title: 'Spatial Extent Coverage', value: '1.42M ha', subValue: '99.4%', subText: 'telemetry confidence', icon: 'map', trend: 'up' },
  { id: 'kpi-3', title: 'GIS Engine Health', value: '99.9%', subText: 'CesiumJS 3D Active', icon: 'speed', trend: 'pulse' },
  { id: 'kpi-4', title: 'Connected Sources', value: '5 Live', subText: 'Sentinel-2, Bhuvan, IMD', icon: 'hub', trend: 'neutral' }
];

const MOCK_ACTIVITIES: Activity[] = [
  { id: 'act-1', title: 'GeoJSON Dataset Ingested', subtitle: 'Iowa River Farm • 1,240 acres', timeAgo: '12 mins ago', icon: 'upload_file', statusColor: 'bg-emerald-500' },
  { id: 'act-2', title: 'Sentinel-2 Tile Refreshed', subtitle: 'Sector IN-MH-402 • 10m Multispectral', timeAgo: '45 mins ago', icon: 'satellite_alt', statusColor: 'bg-teal-500' },
  { id: 'act-3', title: 'Feature Inspection Completed', subtitle: 'Parcel #AR-9022 • Soil Nitrogen Vector', timeAgo: '2 hours ago', icon: 'pin_drop', statusColor: 'bg-emerald-500' }
];

const MOCK_OPPORTUNITIES: SpatialOpportunity[] = [
  { id: 'opp-1', siteName: 'Karnal Wheat Research Plot', details: 'HR-012 • 450 acres', suitability: 94, value: 'High Yield Potential', readiness: 'ACTIVE', readinessBadge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20', ownerName: 'Dr. V. Sharma (GeoVision)' },
  { id: 'opp-2', siteName: 'Mesa Delta Irrigation Basin', details: 'AZ-087 • 1,120 acres', suitability: 82, value: 'NDVI Stress Detected', readiness: 'MONITORING', readinessBadge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', ownerName: 'S. Kulkarni (GeoVision Node)' }
];

export default function Page() {
  const [kpis] = useState<KPIData[]>(MOCK_KPIS);
  const [activities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [opportunities] = useState<SpatialOpportunity[]>(MOCK_OPPORTUNITIES);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto text-[var(--text-main)] transition-colors duration-200">
      
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--bg-surface)] p-5 rounded-xl border border-[var(--border-subtle)] shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">GeoVision Command Center</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase">
              Production Node
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Unified geospatial integration workspace • GeoVision telemetry node active
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/gis-map"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            Open GIS Workspace
          </Link>
          <Link
            href="/datasets"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] hover:bg-[var(--border-subtle)] text-[var(--text-main)] rounded-lg text-xs font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            Import Dataset
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-[var(--bg-surface)] p-4 rounded-xl border border-[var(--border-subtle)] shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-[var(--text-muted)]">{kpi.title}</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">{kpi.icon}</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight font-mono">{kpi.value}</span>
                {kpi.subValue && (
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
                    {kpi.subValue}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[var(--text-muted)] mt-1 flex items-center gap-1">
                {kpi.trend === 'pulse' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                )}
                {kpi.subText}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Cesium Viewer Preview + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Cesium Map Widget */}
        <div className="lg:col-span-8 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] shadow-xs overflow-hidden flex flex-col min-h-[480px]">
          <div className="px-5 py-3.5 border-b border-[var(--border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="text-sm font-semibold">Live GIS Map Preview</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[var(--text-muted)]">Cesium 3D Engine</span>
              <Link
                href="/gis-map"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
              >
                Expand Workspace
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative bg-[var(--bg-app)] min-h-[380px]">
            <DashboardMapWrapper />
          </div>
        </div>

        {/* Recent Telemetry & Activity Stream */}
        <div className="lg:col-span-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] shadow-xs flex flex-col">
          <div className="px-5 py-3.5 border-b border-[var(--border-subtle)] flex items-center justify-between">
            <h3 className="text-sm font-semibold">System Stream & Activity</h3>
            <span className="text-[10.5px] font-mono uppercase bg-[var(--bg-surface-hover)] px-2 py-0.5 rounded text-[var(--text-muted)] border border-[var(--border-subtle)]">
              Real-time
            </span>
          </div>
          <div className="p-4 space-y-4 flex-1">
            {activities.map((act) => (
              <div
                key={act.id}
                className="flex items-start gap-3 p-2.5 rounded-lg bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] transition-all"
              >
                <div className="w-8 h-8 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">{act.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold truncate">{act.title}</p>
                    <span className="text-[10px] text-[var(--text-faint)] shrink-0 font-mono">{act.timeAgo}</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">{act.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Infrastructure Health Subcard */}
          <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-hover)] space-y-2 rounded-b-xl">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-emerald-500">check_circle</span>
                Spatial API Gateway
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">100% Operational</span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-emerald-500">check_circle</span>
                Database Node
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">Connected (PostgreSQL)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spatial Targets & Research Parcels Table */}
      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-emerald-600 dark:text-emerald-400">pin_drop</span>
            <h3 className="text-sm font-semibold">Priority Agricultural Parcels & Research Extents</h3>
          </div>
          <Link
            href="/datasets"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            View Data Catalog
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-surface-hover)] text-[10.5px] uppercase tracking-wider font-mono font-semibold text-[var(--text-muted)] border-b border-[var(--border-subtle)]">
                <th className="px-5 py-2.5">Site Extent</th>
                <th className="px-5 py-2.5">Confidence</th>
                <th className="px-5 py-2.5">GIS Status</th>
                <th className="px-5 py-2.5">Readiness</th>
                <th className="px-5 py-2.5">Node Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
              {opportunities.map((opp) => (
                <tr key={opp.id} className="hover:bg-[var(--bg-surface-hover)] transition-colors">
                  <td className="px-5 py-3 font-semibold">
                    <div>
                      <p className="text-xs text-[var(--text-main)] font-semibold">{opp.siteName}</p>
                      <p className="text-[10.5px] text-[var(--text-muted)] font-mono">{opp.details}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-[var(--border-subtle)] rounded-full h-1.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${opp.suitability}%` }}></div>
                      </div>
                      <span className="font-mono font-bold text-[11px]">{opp.suitability}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[11.5px] font-medium text-[var(--text-muted)]">{opp.value}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${opp.readinessBadge}`}>
                      {opp.readiness}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[11.5px] font-medium text-[var(--text-muted)]">{opp.ownerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
