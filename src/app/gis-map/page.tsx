'use client';
import { useState } from 'react';
import Link from 'next/link';

interface MapLayer {
  id: string;
  name: string;
  desc: string;
  icon: string;
  colorClass: string;
  active: boolean;
}

const MOCK_LAYERS: MapLayer[] = [
  { id: 'lay-1', name: 'Soil Quality', desc: 'pH & Nitrogen Density', icon: 'texture', colorClass: 'text-primary', active: true },
  { id: 'lay-2', name: 'Moisture Levels', desc: 'Real-time Saturation', icon: 'water_drop', colorClass: 'text-secondary', active: true },
  { id: 'lay-3', name: 'Crop Health (NDVI)', desc: 'Satellite Biomass Index', icon: 'eco', colorClass: 'text-tertiary', active: true }
];

export default function Page() {
  const [layers, setLayers] = useState<MapLayer[]>(MOCK_LAYERS);

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
      
      {/*  SideNavBar Placeholder  */}
      
      {/*  Main Content Area  */}
      <main className=" w-full min-h-[calc(100vh-72px)] relative flex flex-col">
        {/*  TopNavBar  */}
        

        {/*  GIS Map Canvas  */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-surface-dim overflow-hidden">
            {/*  Map Background Placeholder  */}
            <div className="w-full h-full relative" data-location="Iowa River Valley">
              <img className="w-full h-full object-cover" data-alt="Satellite view of Iowa farmland" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMxBpcuTMlbv7xu0YACes1U0r2F6T6W5z4YUQ8IzSsbTxvFKh6zvtNE6k_HQ0m9e7g-Dr8x6bhQPJ7Vo3r3467kiSPJS2TUTTDJ2JMqEZT37_mXUSTIm8COzEkwX-b7OGvqwbUtfp6IZy0zezg42mAYNi1aKnW7Dx5Plh80p0tOLBhGnf5XoA3T4Zrf0tB_Hpan-cMKwYv3kCEN3L39_WybMVm0_vBOVJq_qLTTSkE0PUGobJluB0JPRkFfurNyyYCg5NXXJP-19o" />
              <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
            </div>
          </div>

          {/*  Floating Control Panel (Left)  */}
          <div className="absolute left-10 top-10 w-80 z-20 space-y-4">
            {/*  Search & Discovery  */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-4 border border-white/60">
              <div className="relative">
                <input className="w-full bg-surface-container-lowest/80 border border-outline-variant/30 rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline/60" placeholder="Search Parcel ID or Coords..." type="text" />
                <span className="material-symbols-outlined absolute left-4 top-3 text-outline text-xl">search</span>
              </div>
            </div>

            {/*  Layer Management  */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-5 border border-white/60">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-headline-md text-sm font-semibold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">layers</span>
                  Intelligence Layers
                </h2>
                <span className="text-[10px] font-bold text-outline bg-surface-container-high px-2 py-1 rounded-full uppercase tracking-wider">
                  {layers.filter(l => l.active).length} Active
                </span>
              </div>
              <div className="space-y-3">
                {layers.map(layer => (
                  <div key={layer.id} className={`flex items-center justify-between p-3 rounded-xl transition-colors ${layer.active ? 'bg-primary/10 border border-primary/20 shadow-sm' : 'hover:bg-white/50'}`}>
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-xl ${layer.colorClass}`} style={{ fontVariationSettings: layer.active ? "'FILL' 1" : "" }}>{layer.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{layer.name}</span>
                        <span className="text-[10px] text-outline">{layer.desc}</span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked={layer.active} className="sr-only peer" type="checkbox" />
                      <div className="w-9 h-5 bg-outline/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/*  Live Legend Card  */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-4 border border-white/60">
              <h3 className="text-[11px] font-semibold text-outline uppercase tracking-wider mb-3">Intensity Scale</h3>
              <div className="h-2.5 w-full bg-gradient-to-r from-red-400 via-yellow-300 to-primary rounded-full mb-2.5"></div>
              <div className="flex justify-between text-[10px] font-bold text-on-surface-variant px-1">
                <span className="">Low Yield</span>
                <span className="">Optimal</span>
                <span className="">High Surplus</span>
              </div>
            </div>
          </div>

          {/*  Right-side Analysis Panel (Data Density)  */}
          <div className="absolute right-10 top-10 w-96 z-20 space-y-4">
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl border border-white/60 overflow-hidden">
              <div className="bg-primary/95 px-5 py-4 flex justify-between items-center">
                <span className="text-white font-headline-md text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">info</span>
                  Parcel Detail: #AR-9022
                </span>
                <span className="material-symbols-outlined text-white text-lg cursor-pointer">expand_more</span>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 p-4 rounded-xl border border-white/80 shadow-sm">
                    <p className="text-[10px] text-outline uppercase font-bold mb-1">Area Size</p>
                    <p className="text-xl font-headline-md text-primary font-bold">1,240 <span className="text-xs font-medium text-outline">Acres</span></p>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl border border-white/80 shadow-sm">
                    <p className="text-[10px] text-outline uppercase font-bold mb-1">Soil Carbon</p>
                    <p className="text-xl font-headline-md text-primary font-bold">4.2% <span className="text-xs font-medium text-outline">Avg.</span></p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-xs font-bold text-on-surface">Irrigation Efficiency</span>
                    <span className="text-xs font-data-mono text-primary font-bold">88%</span>
                  </div>
                  <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary shadow-sm" style={{ width: `88%` }}></div>
                  </div>
                </div>
                <div className="pt-2">
                  <h4 className="text-[11px] font-semibold text-outline uppercase tracking-wider mb-4">Health Trending (6mo)</h4>
                  <div className="h-28 w-full flex items-end justify-between gap-1.5">
                    <div className="w-full bg-primary/20 rounded-t-lg h-[40%]"></div>
                    <div className="w-full bg-primary/25 rounded-t-lg h-[55%]"></div>
                    <div className="w-full bg-primary/30 rounded-t-lg h-[45%]"></div>
                    <div className="w-full bg-primary/40 rounded-t-lg h-[70%]"></div>
                    <div className="w-full bg-primary/60 rounded-t-lg h-[85%]"></div>
                    <div className="w-full bg-primary rounded-t-lg h-[100%] shadow-lg shadow-primary/20"></div>
                  </div>
                </div>
                <button className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm shadow-xl shadow-primary/30">
                  <span className="material-symbols-outlined text-xl">file_download</span>
                  Export GIS Report
                </button>
              </div>
            </div>

            {/*  Floating Toolset  */}
            <div className="flex justify-center gap-3">
              <button className="bg-white/80 backdrop-blur w-12 h-12 flex items-center justify-center rounded-full shadow-lg border border-white/60 hover:bg-primary hover:text-white transition-all active:scale-90 group">
                <span className="material-symbols-outlined">zoom_in</span>
              </button>
              <button className="bg-white/80 backdrop-blur w-12 h-12 flex items-center justify-center rounded-full shadow-lg border border-white/60 hover:bg-primary hover:text-white transition-all active:scale-90 group">
                <span className="material-symbols-outlined">zoom_out</span>
              </button>
              <button className="bg-white/80 backdrop-blur w-12 h-12 flex items-center justify-center rounded-full shadow-lg border border-white/60 hover:bg-primary hover:text-white transition-all active:scale-90 group">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>my_location</span>
              </button>
              <button className="bg-white/80 backdrop-blur w-12 h-12 flex items-center justify-center rounded-full shadow-lg border border-white/60 hover:bg-primary hover:text-white transition-all active:scale-90 group">
                <span className="material-symbols-outlined">square_foot</span>
              </button>
            </div>
          </div>

          {/*  Bottom Data Ticker  */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[65%] z-20">
            <div className="bg-white/80 backdrop-blur px-8 py-3.5 rounded-2xl shadow-2xl border border-white/60 flex items-center justify-between gap-10">
              <div className="flex items-center gap-4 border-r border-outline-variant/30 pr-10">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-outline">Current Zoom</span>
                  <span className="text-sm font-data-mono text-on-surface font-bold">Lvl 14 (1:25k)</span>
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center gap-12 overflow-hidden">
                <div className="flex items-center gap-2.5 whitespace-nowrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse shadow-sm shadow-error/50"></span>
                  <span className="text-xs text-on-surface-variant font-bold">Alert: Low Moisture in Parcel #90A</span>
                </div>
                <div className="flex items-center gap-2.5 whitespace-nowrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm shadow-primary/50"></span>
                  <span className="text-xs text-on-surface-variant font-bold">Optimal Conditions: South Valley</span>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l border-outline-variant/30 pl-10">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase font-bold text-outline">Coordinates</span>
                  <span className="text-sm font-data-mono text-on-surface font-bold">41.67° N, 91.53° W</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
