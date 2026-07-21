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
      
      {/*  Header  */}
      

      {/*  Main Content  */}
      <main className=" pt-24 px-8 pb-12 min-min-h-[calc(100vh-72px)]">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/*  Stats Row  */}
          <div className="grid grid-cols-4 gap-6">
            {stats.map(stat => (
              <div key={stat.id} className="bg-white p-6 rounded-2xl border border-white shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[22px]">{stat.icon}</span>
                    </div>
                    <span className="text-body-md font-semibold text-on-surface">{stat.title}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-lg text-[28px] font-bold text-on-surface">{stat.value}</span>
                  </div>
                  {stat.subContent}
                </div>
              </div>
            ))}
          </div>

          {/*  Main Layout Grid  */}
          <div className="grid grid-cols-12 gap-6">
            {/*  Main Content Column  */}
            <div className="col-span-9 space-y-6">
              {/*  Reports Table Section  */}
              <div className="bg-white rounded-2xl border border-white shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-surface-container flex items-center justify-between">
                  <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Recent Reports</h3>
                  <div className="flex items-center gap-4">
                    <div className="relative w-72">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
                      <input className="w-full pl-10 pr-4 py-2 rounded-xl border border-outline-variant bg-surface text-body-md focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all" placeholder="Search report name..." type="text" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant rounded-xl text-on-surface font-semibold hover:bg-surface-container-low transition-all text-body-md">
                      <span className="material-symbols-outlined text-[18px]">filter_list</span>
                      Filter
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low/30">
                        <th className="px-8 py-4 text-[11px] font-bold text-outline uppercase tracking-widest">Report Title</th>
                        <th className="px-8 py-4 text-[11px] font-bold text-outline uppercase tracking-widest">Date Generated</th>
                        <th className="px-8 py-4 text-[11px] font-bold text-outline uppercase tracking-widest">Type</th>
                        <th className="px-8 py-4 text-[11px] font-bold text-outline uppercase tracking-widest">Status</th>
                        <th className="px-8 py-4 text-[11px] font-bold text-outline uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                      {reports.map((report) => (
                        <tr key={report.id} className="hover:bg-surface-container-low/20 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-[20px]">{report.icon}</span>
                              </div>
                              <div>
                                <p className="font-bold text-on-surface text-body-md">{report.title}</p>
                                <p className="text-[12px] text-outline">{report.desc}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-body-md text-on-surface-variant font-data-mono">{report.date}</td>
                          <td className="px-8 py-5">
                            <span className={`px-2.5 py-1 text-[11px] font-bold rounded uppercase ${report.typeClass}`}>{report.type}</span>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${report.statusColorClass}`}></span>
                              <span className="text-body-md text-on-surface font-medium">{report.statusText}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {!report.isProcessing ? (
                                <>
                                  <button className="p-2 hover:bg-surface-container-high rounded-lg text-primary transition-colors" title="Export PDF">
                                    <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                                  </button>
                                  <button className="p-2 hover:bg-surface-container-high rounded-lg text-primary transition-colors" title="Export Excel">
                                    <span className="material-symbols-outlined text-[20px]">table_chart</span>
                                  </button>
                                  <button className="p-2 hover:bg-surface-container-high rounded-lg text-outline transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                  </button>
                                </>
                              ) : (
                                <button className="p-2 opacity-50 cursor-not-allowed">
                                  <span className="material-symbols-outlined text-[20px]">hourglass_top</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-8 py-5 border-t border-surface-container flex items-center justify-between">
                  <span className="text-body-md text-on-surface-variant font-medium">Showing 1-4 of 1,248 reports</span>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-surface-container-low rounded-lg border border-outline-variant disabled:opacity-30 transition-colors" disabled>
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-on-primary text-body-md font-bold shadow-sm">1</button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container-low text-body-md font-medium text-on-surface-variant transition-colors">2</button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container-low text-body-md font-medium text-on-surface-variant transition-colors">3</button>
                    <button className="p-1.5 hover:bg-surface-container-low rounded-lg border border-outline-variant transition-colors">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/*  Right Column (Featured & Sidebar Widgets)  */}
            <div className="col-span-3 space-y-6">
              {/*  Insight AI Card  */}
              <div className="bg-primary-container text-on-primary-container p-6 rounded-2xl relative overflow-hidden shadow-sm">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-[20px]">psychology</span>
                    <h4 className="font-semibold text-[18px]">Insight AI</h4>
                  </div>
                  <p className="text-body-md opacity-90 mb-6 leading-relaxed">Your next Yield Analysis is scheduled for automated generation in 48 hours.</p>
                  <button className="px-5 py-2.5 bg-white text-primary rounded-xl font-bold text-body-md hover:bg-opacity-90 transition-all shadow-sm">
                    Review Schedule
                  </button>
                </div>
                <div className="absolute -bottom-8 -right-8 opacity-10">
                  <span className="material-symbols-outlined text-[140px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
              </div>

              {/*  Active Pulses List  */}
              <div className="bg-white p-6 rounded-2xl border border-white shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-[18px] text-on-surface">Active Pulses</h4>
                  <span className="text-primary font-bold text-[13px] cursor-pointer hover:underline">View all</span>
                </div>
                <div className="space-y-4">
                  {pulses.map((pulse) => (
                    <div key={pulse.id} className="flex items-start gap-4 p-4 bg-surface-container-low/50 rounded-2xl border border-surface-container-low">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm text-primary">
                        <span className="material-symbols-outlined text-[20px]">{pulse.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-on-surface text-body-md leading-tight">{pulse.title}</p>
                        <p className="text-[12px] text-outline mt-0.5">Next: {pulse.nextRun}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer mt-1">
                        <input defaultChecked={pulse.active} className="sr-only peer" type="checkbox" />
                        <div className="w-10 h-5.5 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 border border-dashed border-outline-variant rounded-2xl text-on-surface-variant font-bold text-body-md hover:bg-surface-container-low transition-colors">
                  + Add New Pulse
                </button>
              </div>

              {/*  Data Health Widget  */}
              <div className="bg-white p-6 rounded-2xl border border-white shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-[18px] text-on-surface">Data Health</h4>
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                </div>
                <div className="relative w-40 h-40 mx-auto flex items-center justify-center mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-surface-container" cx="50%" cy="50%" fill="transparent" r="42%" stroke="currentColor" strokeWidth="10"></circle>
                    <circle className="text-primary" cx="50%" cy="50%" fill="transparent" r="42%" stroke="currentColor" strokeDasharray="264" strokeDashoffset="52.8" strokeLinecap="round" strokeWidth="10"></circle>
                  </svg>
                  <div className="absolute text-center">
                    <p className="font-headline-lg text-[32px] font-bold text-on-surface">80%</p>
                    <p className="text-[11px] text-outline uppercase font-bold tracking-widest">Accuracy</p>
                  </div>
                </div>
                <p className="text-center text-[13px] leading-relaxed text-on-surface-variant font-medium px-2">Geospatial data validation is current for the latest report batch.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
