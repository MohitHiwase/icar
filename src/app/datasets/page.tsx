'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Dataset {
  id: string;
  name: string;
  desc: string;
  image: string;
  type: string;
  typeColorClass: string;
  typeBgClass: string;
  source: string;
  sourceIcon: string;
  timeAgo: string;
  progressPercent: number;
  format: string;
  size: string;
}

interface ImportLog {
  id: string;
  jobId: string;
  name: string;
  userInitials: string;
  userBgClass: string;
  userTextClass: string;
  userName: string;
  progress: number;
  progressColorClass: string;
  status: string;
  statusClass: string;
  animateNext: boolean;
}

const MOCK_DATASETS: Dataset[] = [
  { id: 'ds-1', name: 'NDVI Sentinel-2 Full Cycle', desc: 'Daily vegetation index captures for the Midwest corridor covering corn and soybean rotations.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXuTQTBZgdY1E1NMZVN5WJbeu8aCf_D4dtZ_uqnsuTCSrtWVtR24zgg9vfRKKuwybPEL98i5Kh_fP0nvaHHlnIg9KDYr6_J1j_ydh2IXP0ksv0IsjLaJ92txIQNs7tRMnIqgojz5g_cS2IGoM11N49x4kKpls5kMdFN-otQHxcElClEOTsht5Et47s7xX75P-GxaqBD12h1yTZYuCiLAmrr54AXVIJiWs35TGAFy71ZcKGWCJZfCzqBlOJ2Xkhjwi1ImxAlJm93Bw', type: 'Satellite', typeColorClass: 'text-primary', typeBgClass: 'bg-secondary-container', source: 'ESA Copernicus', sourceIcon: 'public', timeAgo: '2h ago', progressPercent: 75, format: 'GeoTIFF', size: '1.2 GB' },
  { id: 'ds-2', name: 'Precipitation History 2024', desc: 'Historical rainfall and moisture levels across the Great Lakes region with 5km resolution.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9_jAQdtH72Hv3pP3XjnAr_2-pBQbw8GYUCn_VZAtM5dmUh0ov7Jfkn8-j0qJt5qC6I_EbRDHCgQ8aHh56aVtkaGyYRHfJV1q9MpY9_I-Hr2naR3-ZcGv26ySFDjaD-XtjngV5D3xxzy4N01h1Og8QeE1YljsHYPsEcAIeJ6RMhg_vZmp9tcY8kASs7aPNBg4F6HROa45pYSGou0oRqWCounOphDA2PnfKmVe3XGMhIjAHkrYLfpOMpAk_xsa2yQ_B08dIMT71F_w', type: 'Climate', typeColorClass: 'text-tertiary', typeBgClass: 'bg-tertiary-container', source: 'NOAA Weather', sourceIcon: 'cloud', timeAgo: '1d ago', progressPercent: 100, format: 'CSV/JSON', size: '450 MB' },
  { id: 'ds-3', name: 'Regional Soil Ph Assay', desc: 'Multi-layered soil health data including pH, nitrogen, and phosphorus density for farm planning.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQboFEYe-z8D8lyv07Fk4EF2fHNM6SdZQFjpu1wiFg-o08wcgjtkpdpcfhS-GjLVSrjcLtzoTUIDGEGegy-WhCd0F7MFNPdbyxxldV-QOPYgmglF-Mssf03HNCqYxuqUzfG-aq8rBI1P54afWoNI_e8WOWDu3BYDBAfKwIi0wXtxcOujr9uATTtm-D23z-9_6LF1yBAl3ev8Ea-9BvikPMmG7PB5mn7gmhGSDjgpvdQhgtjP5A6LnMncDScIVKI5LYqZdXGD47xbY', type: 'Yield', typeColorClass: 'text-secondary', typeBgClass: 'bg-primary-container', source: 'USDA Labs', sourceIcon: 'science', timeAgo: '1w ago', progressPercent: 25, format: 'SHP', size: '820 MB' }
];

const MOCK_LOGS: ImportLog[] = [
  { id: 'log-1', jobId: '#TX-88219', name: 'Global Corn Moisture Index', userInitials: 'SM', userBgClass: 'bg-secondary-container', userTextClass: 'text-on-surface', userName: 'S. Miller', progress: 100, progressColorClass: 'bg-primary', status: 'Completed', statusClass: 'bg-primary/10 text-primary border-primary/20', animateNext: false },
  { id: 'log-2', jobId: '#TX-88304', name: 'Sentinel-2 Orthorectified Tiles', userInitials: 'AS', userBgClass: 'bg-tertiary-container', userTextClass: 'text-white', userName: 'Automated', progress: 42, progressColorClass: 'bg-primary animate-pulse', status: 'In Progress', statusClass: 'bg-secondary-container text-on-secondary-container border-transparent', animateNext: true },
  { id: 'log-3', jobId: '#TX-88310', name: 'MODIS Thermal Anomaly', userInitials: 'JD', userBgClass: 'bg-primary-container', userTextClass: 'text-white', userName: 'J. Doe', progress: 12, progressColorClass: 'bg-error', status: 'Interrupted', statusClass: 'bg-error-container text-on-error-container border-error/20', animateNext: false }
];

export default function Page() {
  const [datasets, setDatasets] = useState<Dataset[]>(MOCK_DATASETS);
  const [logs, setLogs] = useState<ImportLog[]>(MOCK_LOGS);

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
      
      {/*  Top Header  */}
      

      {/*  Main Content  */}
      <main className=" pt-28 px-10 pb-12 min-min-h-[calc(100vh-72px)]">
        {/*  Action Header  */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="font-headline-lg text-3xl text-on-surface font-semibold">Available Datasets</h2>
            <p className="font-body-md text-on-surface-variant mt-1">Manage and explore satellite, climate, and soil intelligence repositories.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-5 py-2.5 bg-white border border-outline-variant text-on-surface font-semibold rounded-xl hover:bg-surface-container-low transition-colors flex items-center gap-2 text-sm shadow-sm">
              <span className="material-symbols-outlined text-lg">cloud_download</span>
              Bulk Export
            </button>
            <button className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:opacity-95 shadow-md transition-all flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-lg">add</span>
              Import Dataset
            </button>
          </div>
        </div>

        {/*  Filter & Search Bar  */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-8 flex flex-col lg:flex-row lg:items-center gap-4 border border-surface-container-high">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/10 text-body-md outline-none" placeholder="Search by name, tags, or source..." type="text" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center px-4 py-3 bg-white border border-outline-variant rounded-xl text-sm font-medium text-on-surface cursor-pointer hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined mr-2 text-lg">filter_list</span>
              Type: All
            </div>
            <div className="flex items-center px-4 py-3 bg-white border border-outline-variant rounded-xl text-sm font-medium text-on-surface cursor-pointer hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined mr-2 text-lg">calendar_today</span>
              Last 30 Days
            </div>
            <div className="h-8 w-[1px] bg-outline-variant"></div>
            <div className="flex items-center bg-surface-container-high rounded-xl p-1">
              <button className="p-2 bg-white shadow-sm rounded-lg text-primary">
                <span className="material-symbols-outlined text-xl">grid_view</span>
              </button>
              <button className="p-2 text-on-surface-variant opacity-60 hover:opacity-100">
                <span className="material-symbols-outlined text-xl">reorder</span>
              </button>
            </div>
          </div>
        </div>

        {/*  Grid Datasets  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {datasets.map(dataset => (
            <div key={dataset.id} className="bg-white rounded-2xl shadow-sm border border-surface-container-high overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
              <div className={`h-36 relative ${dataset.typeBgClass}`}>
                <img className="w-full h-full object-cover opacity-60" src={dataset.image} alt={dataset.name} />
                <div className={`absolute top-4 left-4 bg-white px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 shadow-sm uppercase tracking-wider ${dataset.typeColorClass}`}>
                  <span className={`w-2 h-2 rounded-full ${dataset.typeColorClass.replace('text-', 'bg-')}`}></span>
                  {dataset.type}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-headline-md text-lg text-on-surface mb-2 font-semibold leading-snug">{dataset.name}</h3>
                <p className="text-sm text-on-surface-variant line-clamp-2 mb-6">{dataset.desc}</p>
                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between text-xs text-on-surface-variant font-semibold">
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">{dataset.sourceIcon}</span> {dataset.source}</span>
                    <span className="">{dataset.timeAgo}</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className={`h-full bg-primary rounded-full`} style={{ width: `${dataset.progressPercent}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded-lg uppercase border border-primary/10">{dataset.format}</span>
                      <span className="px-2.5 py-1 bg-surface-container text-on-surface-variant text-[10px] font-bold rounded-lg uppercase border border-outline-variant/30">{dataset.size}</span>
                    </div>
                    <button className="text-on-surface-variant hover:text-primary p-2 rounded-xl hover:bg-primary/5 transition-colors border border-outline-variant/30">
                      <span className="material-symbols-outlined text-xl">download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/*  Add New Source  */}
          <div className="bg-white rounded-2xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center p-10 text-center min-h-[380px] group cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-all mb-6">
              <span className="material-symbols-outlined text-5xl">upload_file</span>
            </div>
            <h3 className="font-headline-md text-xl text-on-surface font-semibold">Add New Source</h3>
            <p className="text-sm text-on-surface-variant max-w-[220px] mt-3">Connect S3 buckets, local files, or API endpoints.</p>
            <button className="mt-8 px-6 py-2.5 border border-outline text-on-surface font-bold rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all text-sm">
              Get Started
            </button>
          </div>
        </div>

        {/*  Recent Activity Table  */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline-md text-2xl text-on-surface font-semibold">Recent Import Logs</h3>
            <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
              View All Logs
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low text-label-caps text-on-surface-variant border-b border-outline-variant/30">
                  <th className="px-8 py-5 font-bold uppercase tracking-widest text-[11px]">Job ID</th>
                  <th className="px-8 py-5 font-bold uppercase tracking-widest text-[11px]">Dataset Name</th>
                  <th className="px-8 py-5 font-bold uppercase tracking-widest text-[11px]">Started By</th>
                  <th className="px-8 py-5 font-bold uppercase tracking-widest text-[11px]">Progress</th>
                  <th className="px-8 py-5 font-bold uppercase tracking-widest text-[11px]">Status</th>
                  <th className="px-8 py-5 font-bold uppercase tracking-widest text-[11px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {logs.map(log => (
                  <tr key={log.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-8 py-5 font-data-mono text-data-mono text-on-surface-variant">{log.jobId}</td>
                    <td className="px-8 py-5 font-body-md text-body-md text-on-surface font-semibold">{log.name}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${log.userBgClass} ${log.userTextClass} flex items-center justify-center text-[11px] font-bold`}>{log.userInitials}</div>
                        <span className="text-sm text-on-surface font-medium">{log.userName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-surface-container-high rounded-full min-w-[100px]">
                          <div className={`${log.progressColorClass} h-full rounded-full`} style={{ width: `${log.progress}%` }}></div>
                        </div>
                        <span className="text-[11px] font-bold text-on-surface-variant">{log.progress}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-4 py-1.5 text-[11px] font-bold rounded-full uppercase border ${log.statusClass}`}>{log.status}</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-high transition-colors">
                        <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
