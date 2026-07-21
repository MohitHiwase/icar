'use client';
import { useState } from 'react';
import Link from 'next/link';

interface StatNode {
  id: string;
  title: string;
  value: string;
  icon: string;
  subValue: React.ReactNode;
  subtitle: string;
  borderColorClass: string;
  iconBgClass: string;
  iconColorClass: string;
}

interface Infrastructure {
  id: string;
  name: string;
  desc: string;
  icon: string;
  iconClass: string;
  iconBgClass: string;
  status: string;
  statusClass: string;
  statusType?: string;
  headerBarClass: string;
  cardClasses: string;
  lastSync: string;
  lastSyncClass: string;
  quality: string;
  qualityPercent: number;
}

interface ConnectionLog {
  id: string;
  source: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  event: string;
  time: string;
  status: string;
  statusClass: string;
}

const MOCK_STATS: StatNode[] = [
  { id: 'stat-1', title: 'Total Nodes', value: '14', icon: 'hub', subValue: <><span className="material-symbols-outlined text-xs">arrow_upward</span> 2</>, subtitle: 'vs last 7 days', borderColorClass: 'border-primary', iconBgClass: 'bg-primary/10', iconColorClass: 'text-primary' },
  { id: 'stat-2', title: 'Bandwidth Consumption', value: '1.2 TB', icon: 'network_check', subValue: <span className="bg-secondary-container/30 text-secondary text-[10px] px-2 py-0.5 rounded font-bold mb-1">NOMINAL</span>, subtitle: 'Live traffic monitoring', borderColorClass: 'border-tertiary', iconBgClass: 'bg-tertiary/10', iconColorClass: 'text-tertiary' },
  { id: 'stat-3', title: 'Avg Latency', value: '52ms', icon: 'speed', subValue: <span className="text-primary text-[10px] font-bold mb-1">OPTIMAL</span>, subtitle: 'Real-time sync', borderColorClass: 'border-primary-fixed-dim', iconBgClass: 'bg-primary-container/10', iconColorClass: 'text-primary-container' },
  { id: 'stat-4', title: 'Critical Alerts', value: '1', icon: 'error', subValue: <><span className="material-symbols-outlined text-xs">arrow_downward</span> 1</>, subtitle: 'Requires attention', borderColorClass: 'border-error', iconBgClass: 'bg-error/10', iconColorClass: 'text-error' }
];

const MOCK_INFRASTRUCTURE: Infrastructure[] = [
  { id: 'infra-1', name: 'Sentinel-2 MSI', desc: 'Multi-spectral imaging for crop health and soil moisture mapping.', icon: 'satellite_alt', iconClass: 'text-primary', iconBgClass: 'bg-primary/10', status: 'Active', statusClass: 'text-primary bg-primary/5 border-primary/20', headerBarClass: 'bg-primary', cardClasses: 'group', lastSync: '12 mins ago', lastSyncClass: 'text-on-surface', quality: '98.4%', qualityPercent: 98 },
  { id: 'infra-2', name: 'Field Node Mesh #A4', desc: 'Real-time telemetry from 142 soil sensors across Northern Valley.', icon: 'sensors', iconClass: 'text-primary', iconBgClass: 'bg-primary/10', status: 'Active', statusClass: 'text-primary bg-primary/5 border-primary/20', headerBarClass: 'bg-primary', cardClasses: 'group', lastSync: 'Just now', lastSyncClass: 'text-on-surface', quality: '100%', qualityPercent: 100 },
  { id: 'infra-3', name: 'NOAA Weather API', desc: 'Precipitation and wind speed forecasts for automated irrigation.', icon: 'cloud_off', iconClass: 'text-error', iconBgClass: 'bg-error/10', status: 'Offline', statusClass: 'text-error bg-error/5 border-error/20', headerBarClass: 'bg-error', cardClasses: 'group border-error/30 ring-1 ring-error/5', lastSync: '4 hours ago', lastSyncClass: 'text-error', quality: '0%', qualityPercent: 0 },
  { id: 'infra-4', name: 'AgriScan Drone Fleet', desc: 'High-res photogrammetry nodes for topography analysis.', icon: 'precision_manufacturing', iconClass: 'text-primary', iconBgClass: 'bg-primary/10', status: 'Active', statusClass: 'text-primary bg-primary/5 border-primary/20', headerBarClass: 'bg-primary', cardClasses: 'group', lastSync: '2 days ago', lastSyncClass: 'text-on-surface', quality: '92.1%', qualityPercent: 92 }
];

const MOCK_LOGS: ConnectionLog[] = [
  { id: 'log-1', source: 'Sentinel-2 MSI', icon: 'satellite_alt', iconBg: 'bg-primary/5', iconColor: 'text-primary', event: 'Ingest Success: Imagery Layer #422', time: '2023-11-24 14:22:11', status: 'Success', statusClass: 'bg-primary/10 text-primary' },
  { id: 'log-2', source: 'Field Node Mesh', icon: 'sensors', iconBg: 'bg-primary/5', iconColor: 'text-primary', event: 'Batch Sync: 1,420 readings', time: '2023-11-24 14:15:00', status: 'Success', statusClass: 'bg-primary/10 text-primary' },
  { id: 'log-3', source: 'NOAA Weather API', icon: 'cloud_off', iconBg: 'bg-error/5', iconColor: 'text-error', event: 'Connection Refused (403)', time: '2023-11-24 10:45:32', status: 'Critical', statusClass: 'bg-error/10 text-error' },
  { id: 'log-4', source: 'Supply Chain Hub', icon: 'api', iconBg: 'bg-tertiary/5', iconColor: 'text-tertiary', event: 'Metadata Refresh', time: '2023-11-24 09:12:44', status: 'Warning', statusClass: 'bg-secondary-container text-secondary' }
];

export default function Page() {
  const [stats, setStats] = useState<StatNode[]>(MOCK_STATS);
  const [infrastructures, setInfrastructures] = useState<Infrastructure[]>(MOCK_INFRASTRUCTURE);
  const [logs, setLogs] = useState<ConnectionLog[]>(MOCK_LOGS);

  return (
    <div className="min-min-h-[calc(100vh-72px)] bg-[#F8FAFC] text-on-surface font-body-md overflow-x-hidden w-full">
      <div dangerouslySetInnerHTML={{ __html: `
        <style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            vertical-align: middle;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #E5E7EB;
            border-radius: 10px;
        }
        .elevation-1 {
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
        }
        </style>
      ` }} />
      
      {/*  Layout Container  */}
      <div className="flex min-min-h-[calc(100vh-72px)]">
        {/*  Main Content Area  */}
        <div className="flex-1  bg-background">
          {/*  Header  */}
          

          {/*  Main Workspace  */}
          <main className="p-10 space-y-10 max-w-[1600px] mx-auto">
            {/*  Quick Stats  */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map(stat => (
                <div key={stat.id} className={`bg-white p-6 rounded-2xl border-l-4 ${stat.borderColorClass} elevation-1`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 ${stat.iconBgClass} rounded-xl flex items-center justify-center ${stat.iconColorClass}`}>
                      <span className="material-symbols-outlined">{stat.icon}</span>
                    </div>
                  </div>
                  <p className="text-secondary text-[11px] font-bold uppercase tracking-wider mb-1">{stat.title}</p>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-bold text-on-surface">{stat.value}</span>
                    <span className={`text-xs font-bold mb-1 flex items-center gap-0.5 ${stat.iconColorClass}`}>
                      {stat.subValue}
                    </span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-2 font-medium">{stat.subtitle}</p>
                </div>
              ))}
            </div>

            {/*  Active Infrastructure  */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-xl font-semibold text-on-surface">Active Infrastructure</h3>
                <a className="text-primary text-sm font-bold flex items-center gap-1 hover:underline" href="#">View All Infrastructure <span className="material-symbols-outlined text-sm">chevron_right</span></a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {infrastructures.map(infra => (
                  <div key={infra.id} className={`bg-white rounded-2xl overflow-hidden elevation-1 ${infra.cardClasses}`}>
                    <div className={`h-2 ${infra.headerBarClass}`}></div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`${infra.iconBgClass} p-3 rounded-xl`}>
                          <span className={`material-symbols-outlined ${infra.iconClass}`}>{infra.icon}</span>
                        </div>
                        <div className={`flex items-center gap-2 px-2 py-1 rounded-full border ${infra.statusClass}`}>
                          <span className={`w-2 h-2 rounded-full ${infra.statusType === 'active' ? 'bg-primary' : 'bg-error'}`}></span>
                          <span className="text-[10px] font-bold uppercase">{infra.status}</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-on-surface text-lg">{infra.name}</h4>
                      <p className="text-on-surface-variant text-sm mt-2 line-clamp-2">{infra.desc}</p>
                      <div className="mt-6 space-y-3">
                        <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-secondary">
                          <span className="">Last Sync</span>
                          <span className={`font-mono ${infra.lastSyncClass}`}>{infra.lastSync}</span>
                        </div>
                        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                          <div className={`${infra.headerBarClass} h-full`} style={{ width: `${infra.qualityPercent}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-secondary uppercase tracking-wider">Quality</span>
                          <span className={infra.iconClass}>{infra.quality}</span>
                        </div>
                      </div>
                      {infra.statusType === 'offline' && (
                        <button className={`w-full mt-4 py-2 border border-error/20 text-error text-[11px] font-bold uppercase rounded-lg hover:bg-error/5 transition-colors`}>Reconnect Now</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/*  Connection Activity Table  */}
            <div className="space-y-6 pb-20">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-xl font-semibold text-on-surface">Connection Activity</h3>
                <button className="text-primary text-sm font-bold flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded-lg hover:bg-primary/5 transition-colors">
                  Export CSV <span className="material-symbols-outlined text-sm">download</span>
                </button>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden elevation-1">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low border-b border-outline-variant">
                    <tr>
                      <th className="px-8 py-5 font-bold text-[11px] text-secondary uppercase tracking-widest">Source Name</th>
                      <th className="px-8 py-5 font-bold text-[11px] text-secondary uppercase tracking-widest">Event Type</th>
                      <th className="px-8 py-5 font-bold text-[11px] text-secondary uppercase tracking-widest">Timestamp</th>
                      <th className="px-8 py-5 font-bold text-[11px] text-secondary uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 font-bold text-[11px] text-secondary uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {logs.map(log => (
                      <tr key={log.id} className="hover:bg-surface-container-low/30 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 ${log.iconBg} rounded-lg flex items-center justify-center`}>
                              <span className={`material-symbols-outlined ${log.iconColor} text-sm`}>{log.icon}</span>
                            </div>
                            <span className="font-bold text-on-surface">{log.source}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-on-surface-variant text-sm">{log.event}</td>
                        <td className="px-8 py-5 font-mono text-xs text-on-surface-variant">{log.time}</td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${log.statusClass}`}>{log.status}</span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-8 py-5 bg-surface-container-low/50 border-t border-outline-variant flex items-center justify-between">
                  <span className="text-xs text-secondary font-medium tracking-tight">Showing {logs.length} combination logs</span>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors">Previous</button>
                    <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
