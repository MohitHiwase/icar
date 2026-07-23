'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Stat {
  id: string;
  title: string;
  value: string;
  icon: string;
  subContent: React.ReactNode;
}

interface Report {
  id: string;
  title: string;
  desc: string;
  icon: string;
  date: string;
  type: string;
  typeClass: string;
  statusColorClass: string;
  statusText: string;
  isProcessing: boolean;
}

interface Pulse {
  id: string;
  title: string;
  icon: string;
  nextRun: string;
  active: boolean;
}

const MOCK_STATS: Stat[] = [
  { id: 'st-1', title: 'Total Generated', value: '1,248', icon: 'description', subContent: <><span className="text-primary text-[13px] font-bold flex items-center"><span className="material-symbols-outlined text-[16px] mr-0.5">trending_up</span> 12%</span><p className="text-[12px] text-outline mt-1 font-medium">vs last 30 days</p></> },
  { id: 'st-2', title: 'Storage Used', value: '14.2 GB', icon: 'storage', subContent: <div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden"><div className="bg-primary h-full rounded-full" style={{ width: `65%` }}></div></div> },
  { id: 'st-3', title: 'Pending Tasks', value: '3', icon: 'hourglass_empty', subContent: <p className="text-[12px] text-outline mt-1 font-medium italic">Processing geospatial layers</p> },
  { id: 'st-4', title: 'Automated Schedules', value: '8', icon: 'update', subContent: <p className="text-[12px] text-outline mt-1 font-medium italic">Active daily/weekly pulses</p> }
];

const MOCK_REPORTS: Report[] = [
  { id: 'rp-1', title: 'Quarterly Yield Analysis - Zone 4', desc: 'GIS Intelligence Matrix • 4.2 MB', icon: 'map', date: 'Oct 24, 2023 14:15', type: 'Yield Matrix', typeClass: 'bg-secondary-container text-on-secondary-container', statusColorClass: 'bg-[#22C55E]', statusText: 'Complete', isProcessing: false },
  { id: 'rp-2', title: 'Irrigation Efficiency Audit', desc: 'Sensory Data Export • 1.8 MB', icon: 'water_drop', date: 'Oct 22, 2023 09:30', type: 'Hydrology', typeClass: 'bg-surface-container-high text-on-surface-variant', statusColorClass: 'bg-[#22C55E]', statusText: 'Complete', isProcessing: false },
  { id: 'rp-3', title: 'Soil Carbon Sequestration Report', desc: 'Compliance Document • 12.1 MB', icon: 'forest', date: 'Oct 20, 2023 16:45', type: 'Ecology', typeClass: 'bg-secondary-container text-on-secondary-container', statusColorClass: 'bg-error animate-pulse', statusText: 'Processing', isProcessing: true },
  { id: 'rp-4', title: 'NDVI Vegetation Index - North Sector', desc: 'Satellite Imagery Digest • 34.5 MB', icon: 'satellite_alt', date: 'Oct 19, 2023 11:20', type: 'Satellite', typeClass: 'bg-surface-container-high text-on-surface-variant', statusColorClass: 'bg-[#22C55E]', statusText: 'Complete', isProcessing: false }
];

const MOCK_PULSES: Pulse[] = [
  { id: 'pu-1', title: 'Weekly Soil Report', icon: 'calendar_month', nextRun: 'Monday, 06:00', active: true },
  { id: 'pu-2', title: 'Daily Weather Impact', icon: 'wb_sunny', nextRun: 'Today, 20:00', active: true }
];

export default function Page() {
  const [stats, setStats] = useState<Stat[]>(MOCK_STATS);
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [pulses, setPulses] = useState<Pulse[]>(MOCK_PULSES);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[var(--bg-app)] text-[var(--text-main)] font-body-md overflow-x-hidden w-full transition-colors duration-200">
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
            background: var(--border-subtle);
            border-radius: 10px;
        }
        .elevation-1 {
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
        }
        </style>
      ` }} />

      {/*  Main Content  */}
      <main className="py-8 px-8 min-h-[calc(100vh-72px)]">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/*  Stats Row  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(stat => (
              <div key={stat.id} className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-subtle)] shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                      <span className="material-symbols-outlined text-[22px]">{stat.icon}</span>
                    </div>
                    <span className="text-body-md font-semibold text-[var(--text-main)]">{stat.title}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[28px] font-bold text-[var(--text-main)]">{stat.value}</span>
                  </div>
                  <div className="mt-2 text-xs text-[var(--text-muted)]">
                    {stat.subContent}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*  Main Layout Grid  */}
          <div className="grid grid-cols-12 gap-6">
            {/*  Main Content Column  */}
            <div className="col-span-12 lg:col-span-9 space-y-6">
              {/*  Reports Table Section  */}
              <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] shadow-xs overflow-hidden">
                <div className="px-6 py-5 border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-xl font-bold tracking-tight text-[var(--text-main)]">Recent Reports</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative w-64">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[20px]">search</span>
                      <input className="w-full pl-9 pr-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-app)] text-[var(--text-main)] text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" placeholder="Search report name..." type="text" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-main)] font-semibold hover:bg-[var(--bg-surface-hover)] transition-all text-sm">
                      <span className="material-symbols-outlined text-[18px]">filter_list</span>
                      Filter
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[var(--bg-app)] border-b border-[var(--border-subtle)]">
                        <th className="px-6 py-3.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">Report Title</th>
                        <th className="px-6 py-3.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">Date Generated</th>
                        <th className="px-6 py-3.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-subtle)]">
                      {reports.map((report) => (
                        <tr key={report.id} className="hover:bg-[var(--bg-surface-hover)] transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <span className="material-symbols-outlined text-[20px]">{report.icon}</span>
                              </div>
                              <div>
                                <p className="font-bold text-[var(--text-main)] text-sm">{report.title}</p>
                                <p className="text-xs text-[var(--text-muted)]">{report.desc}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs font-mono text-[var(--text-muted)]">{report.date}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 text-[10px] font-bold rounded uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">{report.type}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${report.isProcessing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                              <span className="text-xs text-[var(--text-main)] font-medium">{report.statusText}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {!report.isProcessing ? (
                                <>
                                  <button className="p-1.5 hover:bg-[var(--bg-app)] rounded-lg text-emerald-500 transition-colors" title="Export PDF">
                                    <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                                  </button>
                                  <button className="p-1.5 hover:bg-[var(--bg-app)] rounded-lg text-emerald-500 transition-colors" title="Export Excel">
                                    <span className="material-symbols-outlined text-[18px]">table_chart</span>
                                  </button>
                                  <button className="p-1.5 hover:bg-[var(--bg-app)] rounded-lg text-[var(--text-muted)] transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                                  </button>
                                </>
                              ) : (
                                <button className="p-1.5 opacity-50 cursor-not-allowed text-[var(--text-muted)]">
                                  <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)] font-medium">Showing 1-4 of 1,248 reports</span>
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 hover:bg-[var(--bg-surface-hover)] rounded-lg border border-[var(--border-subtle)] disabled:opacity-30 transition-colors text-[var(--text-muted)]" disabled>
                      <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-600 text-white font-bold shadow-xs text-xs">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--bg-surface-hover)] text-xs font-medium text-[var(--text-muted)] transition-colors">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--bg-surface-hover)] text-xs font-medium text-[var(--text-muted)] transition-colors">3</button>
                    <button className="p-1.5 hover:bg-[var(--bg-surface-hover)] rounded-lg border border-[var(--border-subtle)] transition-colors text-[var(--text-muted)]">
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/*  Right Column  */}
            <div className="col-span-12 lg:col-span-3 space-y-6">
              {/*  Insight AI Card  */}
              <div className="bg-emerald-600 text-white p-6 rounded-2xl relative overflow-hidden shadow-xs">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-[20px]">psychology</span>
                    <h4 className="font-bold text-[18px]">Insight AI</h4>
                  </div>
                  <p className="text-xs opacity-90 mb-6 leading-relaxed">Your next Yield Analysis is scheduled for automated generation in 48 hours.</p>
                  <button className="px-4 py-2 bg-white text-emerald-700 rounded-xl font-bold text-xs hover:bg-opacity-90 transition-all shadow-xs">
                    Review Schedule
                  </button>
                </div>
                <div className="absolute -bottom-8 -right-8 opacity-10">
                  <span className="material-symbols-outlined text-[140px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
              </div>

              {/*  Active Pulses List  */}
              <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-subtle)] shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-base text-[var(--text-main)]">Active Pulses</h4>
                  <span className="text-emerald-500 font-bold text-xs cursor-pointer hover:underline">View all</span>
                </div>
                <div className="space-y-3">
                  {pulses.map((pulse) => (
                    <div key={pulse.id} className="flex items-start gap-3 p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-subtle)]">
                      <div className="p-2 bg-[var(--bg-surface)] rounded-lg shadow-xs text-emerald-500 border border-[var(--border-subtle)]">
                        <span className="material-symbols-outlined text-[18px]">{pulse.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[var(--text-main)] text-xs leading-tight">{pulse.title}</p>
                        <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Next: {pulse.nextRun}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2.5 border border-dashed border-[var(--border-subtle)] rounded-xl text-[var(--text-muted)] font-semibold text-xs hover:bg-[var(--bg-surface-hover)] transition-colors">
                  + Add New Pulse
                </button>
              </div>

              {/*  Data Health Widget  */}
              <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-subtle)] shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-base text-[var(--text-main)]">Data Health</h4>
                  <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                </div>
                <div className="relative w-36 h-36 mx-auto flex items-center justify-center mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-[var(--border-subtle)]" cx="50%" cy="50%" fill="transparent" r="42%" stroke="currentColor" strokeWidth="8"></circle>
                    <circle className="text-emerald-500" cx="50%" cy="50%" fill="transparent" r="42%" stroke="currentColor" strokeDasharray="264" strokeDashoffset="52.8" strokeLinecap="round" strokeWidth="8"></circle>
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-2xl font-bold text-[var(--text-main)]">80%</p>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase font-semibold tracking-wider">Accuracy</p>
                  </div>
                </div>
                <p className="text-center text-xs leading-relaxed text-[var(--text-muted)] px-2">Geospatial data validation is current for the latest report batch.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
