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
      
{/*  Updated SideNavBar Shell to match IMAGE_12 Layout  */}

{/*  Main Content Canvas  */}
<main className="ml-[260px] h-screen flex flex-col relative overflow-hidden bg-[#f8f9fa]">
{/*  Updated Header Shell to match IMAGE_12 Layout  */}
<header className="h-[72px] flex items-center justify-between px-gutter bg-white/80 backdrop-blur-md z-40 border-b border-outline-variant">
<div className="flex items-center gap-4">
<h2 className="font-headline-lg text-[24px] text-on-surface font-bold">Yield Prediction Model v2</h2>
<div className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container rounded-md text-[10px] font-bold tracking-wider uppercase">DRAFT</div>
</div>
<div className="flex items-center gap-gutter">
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-[18px]">cloud_done</span>
<span className="text-xs font-medium">Autosaved 2m ago</span>
</div>
<div className="flex items-center gap-3">
<button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-low transition-all text-sm">
<span className="material-symbols-outlined text-[20px]">play_arrow</span>
                        Run Simulation
                    </button>
<button className="flex items-center gap-2 px-4 py-2 bg-[#006554] text-white rounded-lg font-bold hover:brightness-110 transition-all shadow-sm text-sm">
<span className="material-symbols-outlined text-[20px]">publish</span>
                        Deploy Model
                    </button>
</div>
<div className="h-8 w-px bg-outline-variant mx-1"></div>
<div className="flex items-center gap-3 cursor-pointer group">
<div className="w-9 h-9 rounded-full bg-surface-container-highest border-2 border-white shadow-sm overflow-hidden ring-1 ring-outline-variant">
<img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV7MFdze3PUbUH9od4IsSnmrNelWwwcu9OY_U5MK2UiNiUrvmaJwUyLwB9vACYZx1bFxcrrkSAsi_6_tS7C8HZGPkQdjHx1EKv5jKykbGzUSjP91fQfhpRJrYqTFA-rpNfMTEweCtTopRqGauiJTcz9F_WJv96WVaJLWIHol-RtDEnGfwF-jZLnz8umdxUdn0yBZz-zqJa9Q17CsiOrfkwdbc1cSlXU5xXZ9PvArgwZtFAfptu00gBAimL722vEx8b7rc6fz3T-cI" />
</div>
<div className="hidden xl:block">
<p className="text-sm font-bold text-on-surface leading-none">Dr. Elena Vance</p>
<span className="material-symbols-outlined text-[16px] text-on-surface-variant align-middle">expand_more</span>
</div>
</div>
</div>
</header>
<div className="flex-1 flex overflow-hidden">
{/*  Left Side Panel: Modules  */}
<aside className="w-72 bg-white border-r border-outline-variant flex flex-col z-10 shadow-sm">
<div className="p-gutter border-b border-outline-variant bg-surface-container-low/50">
<div className="relative"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDhmX6Q4yPqOYXvwas8DAiRoL8BVlrt4HxFjLSgYh2WNfRA3SDII2Qe9NTmsDYZad9X8UILVNvyE_FZ7ggjCB6t-fKANbHb3Ndw660l1sD10EH_aoRdYlydCuQwESALoO8_5Tgo4zBXgNndaTJZrc6_N8wFQrmxOoHCKXJuvdT0EnXP5lDpap5l9oM67ArifCq0svtX9jdJmh6Znx62AOa9uJQ7Rg2GEqKHnrtYYY-Xiwrsa7n4AdIWepAnYhk-gwjBG3w7de2lO4" alt="AgriData Logo" className="w-full h-full object-cover rounded-lg" /></div>
</div>
<div className="flex-1 overflow-y-auto p-gutter space-y-8">
<div>
<h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.1em] mb-4">Input Sources</h3>
<div className="space-y-3">
<div className="p-3 bg-white border border-outline-variant rounded-xl flex items-center gap-3 cursor-grab hover:border-primary hover:shadow-md transition-all group">
<div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-[20px]">satellite_alt</span>
</div>
<span className="text-sm font-semibold text-on-surface">Sentinel-2 Imagery</span>
<span className="material-symbols-outlined ml-auto text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity">drag_indicator</span>
</div>
<div className="p-3 bg-white border border-outline-variant rounded-xl flex items-center gap-3 cursor-grab hover:border-primary hover:shadow-md transition-all group">
<div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-[20px]">thermostat</span>
</div>
<span className="text-sm font-semibold text-on-surface">Historical Weather</span>
<span className="material-symbols-outlined ml-auto text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity">drag_indicator</span>
</div>
<div className="p-3 bg-white border border-outline-variant rounded-xl flex items-center gap-3 cursor-grab hover:border-primary hover:shadow-md transition-all group">
<div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-[20px]">grid_on</span>
</div>
<span className="text-sm font-semibold text-on-surface">Soil Grid CSV</span>
<span className="material-symbols-outlined ml-auto text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity">drag_indicator</span>
</div>
</div>
</div>
<div>
<h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.1em] mb-4">Analysis Logic</h3>
<div className="space-y-3">
<div className="p-3 bg-white border border-outline-variant rounded-xl flex items-center gap-3 cursor-grab hover:border-secondary hover:shadow-md transition-all group">
<div className="w-8 h-8 rounded-lg bg-secondary/5 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-[20px]">functions</span>
</div>
<span className="text-sm font-semibold text-on-surface">NDVI Calculation</span>
<span className="material-symbols-outlined ml-auto text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity">drag_indicator</span>
</div>
<div className="p-3 bg-white border border-outline-variant rounded-xl flex items-center gap-3 cursor-grab hover:border-secondary hover:shadow-md transition-all group">
<div className="w-8 h-8 rounded-lg bg-secondary/5 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-[20px]">psychology</span>
</div>
<span className="text-sm font-semibold text-on-surface">Random Forest</span>
<span className="material-symbols-outlined ml-auto text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity">drag_indicator</span>
</div>
<div className="p-3 bg-white border border-outline-variant rounded-xl flex items-center gap-3 cursor-grab hover:border-secondary hover:shadow-md transition-all group">
<div className="w-8 h-8 rounded-lg bg-secondary/5 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-[20px]">filter_alt</span>
</div>
<span className="text-sm font-semibold text-on-surface">Outlier Filter</span>
<span className="material-symbols-outlined ml-auto text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity">drag_indicator</span>
</div>
</div>
</div>
<div>
<h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.1em] mb-4">Outputs</h3>
<div className="space-y-3">
<div className="p-3 bg-white border border-outline-variant rounded-xl flex items-center gap-3 cursor-grab hover:border-tertiary hover:shadow-md transition-all group">
<div className="w-8 h-8 rounded-lg bg-tertiary/5 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary text-[20px]">map</span>
</div>
<span className="text-sm font-semibold text-on-surface">Heatmap Generator</span>
<span className="material-symbols-outlined ml-auto text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity">drag_indicator</span>
</div>
<div className="p-3 bg-white border border-outline-variant rounded-xl flex items-center gap-3 cursor-grab hover:border-tertiary hover:shadow-md transition-all group">
<div className="w-8 h-8 rounded-lg bg-tertiary/5 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary text-[20px]">table_view</span>
</div>
<span className="text-sm font-semibold text-on-surface">Export to CSV</span>
<span className="material-symbols-outlined ml-auto text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity">drag_indicator</span>
</div>
</div>
</div>
</div>
</aside>
{/*  Workflow Builder Canvas  */}
<section className="flex-1 bg-surface-container-low relative overflow-hidden canvas-grid">
{/*  Floating Toolbar  */}
<div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center bg-white shadow-xl border border-outline-variant rounded-2xl px-3 py-2 z-20">
<button className="p-2 hover:bg-surface-container-high rounded-xl transition-colors text-primary" title="Select Tool">
<span className="material-symbols-outlined text-[22px]">near_me</span>
</button>
<div className="w-px h-6 bg-outline-variant mx-2"></div>
<button className="p-2 hover:bg-surface-container-high rounded-xl transition-colors text-on-surface-variant" title="Add Connection">
<span className="material-symbols-outlined text-[22px]">polyline</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-xl transition-colors text-on-surface-variant" title="Hand Tool">
<span className="material-symbols-outlined text-[22px]">pan_tool</span>
</button>
<div className="w-px h-6 bg-outline-variant mx-2"></div>
<button className="p-2 hover:bg-surface-container-high rounded-xl transition-colors text-on-surface-variant" title="Zoom In">
<span className="material-symbols-outlined text-[22px]">zoom_in</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-xl transition-colors text-on-surface-variant" title="Zoom Out">
<span className="material-symbols-outlined text-[22px]">zoom_out</span>
</button>
</div>
{/*  Workflow Nodes  */}
<div className="w-full h-full relative">
{/*  Node 1: Input  */}
<div className="absolute top-32 left-24 w-64 bg-white rounded-2xl shadow-lg border border-outline-variant p-5 node-active">
<div className="flex items-center justify-between mb-5">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-2xl">satellite_alt</span>
<h4 className="font-bold text-[15px] text-on-surface">Imagery Source</h4>
</div>
<span className="material-symbols-outlined text-outline-variant text-xl cursor-pointer hover:text-on-surface transition-colors">more_vert</span>
</div>
<div className="space-y-4">
<div className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">Dataset</div>
<div className="p-2.5 bg-surface-container-lowest rounded-lg border border-outline-variant text-xs flex items-center justify-between font-medium cursor-pointer hover:border-primary transition-all">
<span className="">Sentinel-2_Central_EU</span>
<span className="material-symbols-outlined text-sm">expand_more</span>
</div>
</div>
<div className="mt-5 flex justify-end">
<div className="w-4 h-4 bg-primary rounded-full border-2 border-white -mr-7 relative z-10 shadow-sm cursor-crosshair"></div>
</div>
</div>
{/*  SVG Connections  */}
<svg className="absolute inset-0 w-full h-full pointer-events-none">
<path d="M 312 178 C 380 178, 380 280, 448 280" fill="none" stroke="#006554" stroke-dasharray="4" strokeWidth="2"></path>
<path d="M 312 210 C 380 210, 380 340, 448 340" fill="none" stroke="#006554" strokeWidth="2"></path>
</svg>
{/*  Node 2: Transform  */}
<div className="absolute top-64 left-[40%] w-64 bg-white rounded-2xl shadow-lg border border-outline-variant p-5">
<div className="flex items-center justify-between mb-5">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-2xl">functions</span>
<h4 className="font-bold text-[15px] text-on-surface">NDVI Index</h4>
</div>
<span className="material-symbols-outlined text-outline-variant text-xl cursor-pointer hover:text-on-surface">more_vert</span>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between">
<span className="text-xs font-semibold text-on-surface-variant">Red Band (B4)</span>
<span className="text-xs font-mono font-bold text-primary">0.65</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-primary h-2 rounded-full" style={{ width: `65%` }}></div>
</div>
<div className="flex items-center justify-between">
<span className="text-xs font-semibold text-on-surface-variant">NIR Band (B8)</span>
<span className="text-xs font-mono font-bold text-primary">0.82</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-primary h-2 rounded-full" style={{ width: `82%` }}></div>
</div>
</div>
<div className="mt-5 flex justify-between">
<div className="w-4 h-4 bg-outline-variant rounded-full border-2 border-white -ml-7 shadow-sm"></div>
<div className="w-4 h-4 bg-primary rounded-full border-2 border-white -mr-7 shadow-sm cursor-crosshair"></div>
</div>
</div>
{/*  Node 3: Result  */}
<div className="absolute top-48 left-[70%] w-72 bg-white rounded-2xl shadow-xl border border-outline-variant p-5">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-tertiary text-2xl">insights</span>
<h4 className="font-bold text-[15px] text-on-surface">Analysis Output</h4>
</div>
<span className="material-symbols-outlined text-outline-variant text-xl cursor-pointer hover:text-on-surface">more_vert</span>
</div>
<div className="rounded-xl overflow-hidden h-36 mb-4 shadow-inner ring-1 ring-outline-variant">
<img className="w-full h-full object-cover" data-alt="Crop health visualization" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjNpwltT_Srs0IPmw88EMi0pl_HvFAsAtsqzgSTMO1dwlaWRq-3jfWrJR1YtCkN56dT9ffh0fQXu5SaHVSvxtNWUEP9rz4u96cWaCl2Tj4D0kWroqvl0atKjO2sblFKoCfYGuT34AweS-siB_g0_qvC78Ktp_mtiu_mrxWg2_AsyU92IU0PtXmFtaJIBz2q82F_GuTj7iyLV1rWUbhx0qHOwrzPqGfli1J9wdgK6Wajy87mRt91HS1eJvftCXK6O_XUOvqzprRTJg" />
</div>
<div className="flex items-center gap-3 p-2 bg-surface-container-low rounded-lg">
<div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
<span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">Streaming Live Results</span>
</div>
</div>
</div>
{/*  Minimap  */}
<div className="absolute bottom-6 right-6 w-48 h-36 bg-white/90 backdrop-blur-sm border border-outline-variant rounded-2xl overflow-hidden shadow-2xl">
<div className="w-full h-full opacity-30 canvas-grid scale-[0.4] origin-top-left"></div>
<div className="absolute top-10 left-8 w-10 h-6 bg-primary/20 border border-primary/50 rounded-md"></div>
<div className="absolute top-20 left-16 w-10 h-8 bg-secondary/20 border border-secondary/50 rounded-md"></div>
<div className="absolute inset-4 border-2 border-primary/40 rounded-lg pointer-events-none"></div>
</div>
</section>
{/*  Right Side Panel: Parameters / Code  */}
<aside className="w-[340px] bg-white border-l border-outline-variant flex flex-col z-10">
<div className="flex items-center border-b border-outline-variant px-2">
<button className="flex-1 py-5 text-sm font-bold text-primary border-b-[3px] border-primary">Properties</button>
<button className="flex-1 py-5 text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all">Python Editor</button>
</div>
<div className="flex-1 overflow-y-auto p-gutter space-y-10">
<div>
<h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.12em] mb-5">General Settings</h3>
<div className="space-y-5">
<div>
<label className="block text-[11px] font-bold text-on-surface-variant mb-2">NODE NAME</label>
<input className="w-full px-3 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" type="text" value="NDVI Calculation" />
</div>
<div>
<label className="block text-[11px] font-bold text-on-surface-variant mb-2">EXECUTION MODE</label>
<div className="relative">
<select className="w-full pl-3 pr-10 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-sm font-medium appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
<option>Standard (Synchronous)</option>
<option>Parallel GPU</option>
<option>Batch Process</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
</div>
</div>
</div>
</div>
<div>
<h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.12em] mb-5">Module Parameters</h3>
<div className="space-y-8">
<div>
<div className="flex justify-between mb-3">
<label className="text-[11px] font-bold text-on-surface-variant">SMOOTHING ALPHA</label>
<span className="text-[11px] font-mono font-bold text-primary px-1.5 py-0.5 bg-primary/10 rounded">0.45</span>
</div>
<input className="w-full h-1.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" type="range" value="45" />
</div>
<div className="flex items-center justify-between">
<label className="text-[11px] font-bold text-on-surface-variant">AUTO-THRESHOLD</label>
<div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
<div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"></div>
</div>
</div>
<div>
<label className="block text-[11px] font-bold text-on-surface-variant mb-3">KERNEL SIZE</label>
<div className="grid grid-cols-3 gap-2">
<button className="py-2 border border-outline-variant rounded-lg text-xs font-semibold hover:border-primary hover:bg-primary/5 transition-all">3x3</button>
<button className="py-2 border-2 border-primary bg-primary text-white rounded-lg text-xs font-bold shadow-sm">5x5</button>
<button className="py-2 border border-outline-variant rounded-lg text-xs font-semibold hover:border-primary hover:bg-primary/5 transition-all">7x7</button>
</div>
</div>
</div>
</div>
<div>
<h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.12em] mb-5">Metadata</h3>
<div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant space-y-3">
<div className="flex justify-between text-xs">
<span className="text-on-surface-variant font-medium">COMPUTE COST</span>
<span className="text-on-surface font-bold">$0.042 / run</span>
</div>
<div className="flex justify-between text-xs">
<span className="text-on-surface-variant font-medium">DEPENDENCIES</span>
<span className="text-on-surface font-bold">NumPy, SciPy</span>
</div>
<div className="flex justify-between text-xs">
<span className="text-on-surface-variant font-medium">LAST MODIFIED</span>
<span className="text-on-surface font-bold">Today, 14:22</span>
</div>
</div>
</div>
</div>
<div className="p-gutter bg-white border-t border-outline-variant">
<button className="w-full py-3.5 bg-primary text-white rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-sm">
<span className="material-symbols-outlined text-[20px]">save</span>
                        Save Module Configuration
                    </button>
</div>
</aside>
</div>
{/*  Notification Toast  */}
<div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-on-surface text-white py-3.5 px-6 rounded-2xl shadow-2xl opacity-0 translate-y-10 transition-all duration-500 z-[100]" id="toast">
<span className="material-symbols-outlined text-green-400">check_circle</span>
<p className="text-sm font-semibold tracking-wide">Calculation complete. View results in the Output node.</p>
</div>
</main>

    </div>
  );
}
