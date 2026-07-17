import Link from 'next/link';
export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-on-surface font-body-md overflow-x-hidden w-full">
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
            background: #bdc9c4;
            border-radius: 10px;
        }
        .elevation-1 {
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
        }
        </style>
      ` }} />
      
{/*  Layout Container  */}
<div className="flex min-h-screen">

{/*  Main Content Area  */}
<div className="flex-1 ml-64 bg-background">
{/*  Header (Matches IMAGE_12)  */}
<header className="h-20 bg-white/80 backdrop-blur-md border-b border-outline-variant flex items-center justify-between px-10 sticky top-0 z-40">
<div>
<h2 className="font-headline-lg text-2xl font-bold text-on-surface">Data Sources</h2>
<p className="text-secondary text-sm">Manage and monitor live telemetry streams and geospatial data nodes.</p>
</div>
<div className="flex items-center gap-6">
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg cursor-pointer">
<span className="material-symbols-outlined text-sm">calendar_today</span>
<span className="text-sm font-medium">May 20 – May 27, 2024</span>
<span className="material-symbols-outlined text-sm">expand_more</span>
</div>
<button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm hover:bg-primary/90 transition-all">
<span className="material-symbols-outlined text-xl">add</span>
                    Connect New Source
                </button>
<div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
<div className="flex items-center gap-3 cursor-pointer group">
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-all">
<img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX66MIq_8_KICAP7jqoTeA7zKMyC4hIV1Z04XBmwrWz8OPR_7tT2DjbMpAf0XM8x9ruqWUm-C0fp7jiaz55UfMCSf2F2nsMes6kHIAD6x7_7VbZfjTGKwiV5Q0i5SvXf5gwp1kslORU30nlWZdEcspbNNGwGF6a4-3PwGDjGZP-_jdDmmuejf4G41vkNMaErgKxVBvN2HQYjgbdEYKrzPQVIHgmD9YtIkCXsSgQrarwZKzIuAYc8ebl1zniRXNWq_AnCd7FlStBFA" />
</div>
<div className="hidden lg:block">
<span className="block text-sm font-bold text-on-surface">Dr. Elena Rostova</span>
<span className="block text-[10px] text-secondary uppercase font-bold tracking-tighter">Admin</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
</div>
</div>
</header>
{/*  Main Workspace  */}
<main className="p-10 space-y-10 max-w-[1600px] mx-auto">
{/*  Quick Stats (4-Column Layout as requested)  */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
<div className="glass-card p-6 rounded-2xl border-l-4 border-primary">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
<span className="material-symbols-outlined">hub</span>
</div>
</div>
<p className="text-secondary font-label-caps text-[11px] uppercase tracking-wider mb-1">Total Nodes</p>
<div className="flex items-end gap-3">
<span className="text-3xl font-bold text-on-surface">14</span>
<span className="text-primary text-xs font-bold mb-1 flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs">arrow_upward</span> 2
                        </span>
</div>
<p className="text-[10px] text-on-surface-variant mt-2 font-medium">vs last 7 days</p>
</div>
<div className="glass-card p-6 rounded-2xl border-l-4 border-tertiary">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 bg-tertiary/10 rounded-xl flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined">network_check</span>
</div>
</div>
<p className="text-secondary font-label-caps text-[11px] uppercase tracking-wider mb-1">Bandwidth Consumption</p>
<div className="flex items-end gap-3">
<span className="text-3xl font-bold text-on-surface">1.2 TB</span>
<span className="bg-secondary-container/30 text-secondary text-[10px] px-2 py-0.5 rounded font-bold mb-1">NOMINAL</span>
</div>
<p className="text-[10px] text-on-surface-variant mt-2 font-medium">Live traffic monitoring</p>
</div>
<div className="glass-card p-6 rounded-2xl border-l-4 border-primary-fixed-dim">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 bg-primary-container/10 rounded-xl flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined">speed</span>
</div>
</div>
<p className="text-secondary font-label-caps text-[11px] uppercase tracking-wider mb-1">Avg Latency</p>
<div className="flex items-end gap-3">
<span className="text-3xl font-bold text-on-surface" id="latency-val">52ms</span>
<span className="text-primary text-[10px] font-bold mb-1">OPTIMAL</span>
</div>
<p className="text-[10px] text-on-surface-variant mt-2 font-medium">Real-time sync</p>
</div>
<div className="glass-card p-6 rounded-2xl border-l-4 border-error">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 bg-error/10 rounded-xl flex items-center justify-center text-error">
<span className="material-symbols-outlined">error</span>
</div>
</div>
<p className="text-secondary font-label-caps text-[11px] uppercase tracking-wider mb-1">Critical Alerts</p>
<div className="flex items-end gap-3">
<span className="text-3xl font-bold text-on-surface">1</span>
<span className="text-error text-xs font-bold mb-1 flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs">arrow_downward</span> 1
                        </span>
</div>
<p className="text-[10px] text-error font-bold mt-2">Requires attention</p>
</div>
</div>
{/*  Active Infrastructure (Cards Grid)  */}
<div className="space-y-6">
<div className="flex items-center justify-between">
<h3 className="font-headline-md text-xl text-on-surface">Active Infrastructure</h3>
<a className="text-primary text-sm font-bold flex items-center gap-1 hover:underline" href="#">View All Infrastructure <span className="material-symbols-outlined text-sm">chevron_right</span></a>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{/*  Card 1: Satellite  */}
<div className="glass-card rounded-2xl overflow-hidden group">
<div className="h-2 bg-primary"></div>
<div className="p-6">
<div className="flex items-start justify-between mb-4">
<div className="bg-primary/10 p-3 rounded-xl">
<span className="material-symbols-outlined text-primary">satellite_alt</span>
</div>
<div className="flex items-center gap-2 px-2 py-1 bg-primary/5 rounded-full border border-primary/20">
<span className="connection-indicator status-active"></span>
<span className="text-[10px] font-bold text-primary uppercase">Active</span>
</div>
</div>
<h4 className="font-bold text-on-surface text-lg">Sentinel-2 MSI</h4>
<p className="text-on-surface-variant text-sm mt-2 line-clamp-2">Multi-spectral imaging for crop health and soil moisture mapping.</p>
<div className="mt-6 space-y-3">
<div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-secondary">
<span className="">Last Sync</span>
<span className="font-data-mono text-on-surface">12 mins ago</span>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[98%]"></div>
</div>
<div className="flex justify-between text-[11px] font-bold">
<span className="text-secondary uppercase tracking-wider">Quality</span>
<span className="text-primary">98.4%</span>
</div>
</div>
</div>
</div>
{/*  Card 2: IoT Sensors  */}
<div className="glass-card rounded-2xl overflow-hidden group">
<div className="h-2 bg-primary"></div>
<div className="p-6">
<div className="flex items-start justify-between mb-4">
<div className="bg-primary/10 p-3 rounded-xl">
<span className="material-symbols-outlined text-primary">sensors</span>
</div>
<div className="flex items-center gap-2 px-2 py-1 bg-primary/5 rounded-full border border-primary/20">
<span className="connection-indicator status-active"></span>
<span className="text-[10px] font-bold text-primary uppercase">Active</span>
</div>
</div>
<h4 className="font-bold text-on-surface text-lg">Field Node Mesh #A4</h4>
<p className="text-on-surface-variant text-sm mt-2 line-clamp-2">Real-time telemetry from 142 soil sensors across Northern Valley.</p>
<div className="mt-6 space-y-3">
<div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-secondary">
<span className="">Last Sync</span>
<span className="font-data-mono text-on-surface">Just now</span>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full w-full"></div>
</div>
<div className="flex justify-between text-[11px] font-bold">
<span className="text-secondary uppercase tracking-wider">Quality</span>
<span className="text-primary">100%</span>
</div>
</div>
</div>
</div>
{/*  Card 3: Offline Alert  */}
<div className="glass-card rounded-2xl overflow-hidden group border-error/30 ring-1 ring-error/5">
<div className="h-2 bg-error"></div>
<div className="p-6">
<div className="flex items-start justify-between mb-4">
<div className="bg-error/10 p-3 rounded-xl">
<span className="material-symbols-outlined text-error">cloud_off</span>
</div>
<div className="flex items-center gap-2 px-2 py-1 bg-error/5 rounded-full border border-error/20">
<span className="connection-indicator status-offline"></span>
<span className="text-[10px] font-bold text-error uppercase">Offline</span>
</div>
</div>
<h4 className="font-bold text-on-surface text-lg">NOAA Weather API</h4>
<p className="text-on-surface-variant text-sm mt-2 line-clamp-2">Precipitation and wind speed forecasts for automated irrigation.</p>
<div className="mt-6 space-y-3">
<div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-secondary">
<span className="">Last Sync</span>
<span className="font-data-mono text-error">4 hours ago</span>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-error h-full w-0"></div>
</div>
<div className="flex justify-between text-[11px] font-bold">
<span className="text-secondary uppercase tracking-wider">Quality</span>
<span className="text-error">0%</span>
</div>
</div>
<button className="w-full mt-4 py-2 border border-error/20 text-error text-[11px] font-bold uppercase rounded-lg hover:bg-error/5 transition-colors">Reconnect Now</button>
</div>
</div>
{/*  Card 4: Drone Link  */}
<div className="glass-card rounded-2xl overflow-hidden group">
<div className="h-2 bg-primary"></div>
<div className="p-6">
<div className="flex items-start justify-between mb-4">
<div className="bg-primary/10 p-3 rounded-xl">
<span className="material-symbols-outlined text-primary">precision_manufacturing</span>
</div>
<div className="flex items-center gap-2 px-2 py-1 bg-primary/5 rounded-full border border-primary/20">
<span className="connection-indicator status-active"></span>
<span className="text-[10px] font-bold text-primary uppercase">Active</span>
</div>
</div>
<h4 className="font-bold text-on-surface text-lg">AgriScan Drone Fleet</h4>
<p className="text-on-surface-variant text-sm mt-2 line-clamp-2">High-res photogrammetry nodes for topography analysis.</p>
<div className="mt-6 space-y-3">
<div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-secondary">
<span className="">Last Sync</span>
<span className="font-data-mono text-on-surface">2 days ago</span>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[92%]"></div>
</div>
<div className="flex justify-between text-[11px] font-bold">
<span className="text-secondary uppercase tracking-wider">Quality</span>
<span className="text-primary">92.1%</span>
</div>
</div>
</div>
</div>
</div>
</div>
{/*  Connection Activity (Table Section)  */}
<div className="space-y-6 pb-20">
<div className="flex items-center justify-between">
<h3 className="font-headline-md text-xl text-on-surface">Connection Activity</h3>
<button className="text-primary text-sm font-bold flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded-lg hover:bg-primary/5 transition-colors">
                        Export CSV <span className="material-symbols-outlined text-sm">download</span>
</button>
</div>
<div className="glass-card rounded-2xl overflow-hidden">
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
<tr className="hover:bg-surface-container-low/30 transition-colors">
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-sm">satellite_alt</span>
</div>
<span className="font-bold text-on-surface">Sentinel-2 MSI</span>
</div>
</td>
<td className="px-8 py-5 text-on-surface-variant text-sm">Ingest Success: Imagery Layer #422</td>
<td className="px-8 py-5 font-data-mono text-xs text-on-surface-variant">2023-11-24 14:22:11</td>
<td className="px-8 py-5">
<span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Success</span>
</td>
<td className="px-8 py-5 text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
<tr className="hover:bg-surface-container-low/30 transition-colors">
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-sm">sensors</span>
</div>
<span className="font-bold text-on-surface">Field Node Mesh</span>
</div>
</td>
<td className="px-8 py-5 text-on-surface-variant text-sm">Batch Sync: 1,420 readings</td>
<td className="px-8 py-5 font-data-mono text-xs text-on-surface-variant">2023-11-24 14:15:00</td>
<td className="px-8 py-5">
<span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Success</span>
</td>
<td className="px-8 py-5 text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
<tr className="hover:bg-surface-container-low/30 transition-colors">
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-error/5 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-error text-sm">cloud_off</span>
</div>
<span className="font-bold text-on-surface">NOAA Weather API</span>
</div>
</td>
<td className="px-8 py-5 text-on-surface-variant text-sm">Connection Refused (403)</td>
<td className="px-8 py-5 font-data-mono text-xs text-on-surface-variant">2023-11-24 10:45:32</td>
<td className="px-8 py-5">
<span className="bg-error/10 text-error px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Critical</span>
</td>
<td className="px-8 py-5 text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
<tr className="hover:bg-surface-container-low/30 transition-colors">
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-tertiary/5 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary text-sm">api</span>
</div>
<span className="font-bold text-on-surface">Supply Chain Hub</span>
</div>
</td>
<td className="px-8 py-5 text-on-surface-variant text-sm">Metadata Refresh</td>
<td className="px-8 py-5 font-data-mono text-xs text-on-surface-variant">2023-11-24 09:12:44</td>
<td className="px-8 py-5">
<span className="bg-secondary-container text-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Warning</span>
</td>
<td className="px-8 py-5 text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
</tbody>
</table>
<div className="px-8 py-5 bg-surface-container-low/50 border-t border-outline-variant flex items-center justify-between">
<span className="text-xs text-secondary font-medium tracking-tight">Showing 4 of 28 connection logs</span>
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
