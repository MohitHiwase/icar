'use client';
import { useState } from 'react';
import Link from 'next/link';

interface EfficiencyMetric {
  id: string;
  name: string;
  comparison: string;
  comparisonClass: string;
  value: number;
  barColor: string;
}

interface ROI {
  id: string;
  name: string;
  value: string;
  trend: string;
  icon: string;
}

interface YieldData {
  id: string;
  fieldId: string;
  crop: string;
  estYield: string;
  actual: string;
  variance: string;
  varianceClass: string;
  efficiency: number;
  efficiencyBarClass: string;
  status: string;
  statusClass: string;
}

const MOCK_EFFICIENCY: EfficiencyMetric[] = [
  { id: 'eff-1', name: 'Water Consumption', comparison: '-12.4% vs LY', comparisonClass: 'text-primary bg-[#e6f3f0]', value: 68, barColor: 'bg-primary' },
  { id: 'eff-2', name: 'Nitrogen Runoff', comparison: '+2.1% vs LY', comparisonClass: 'text-error bg-error-container/20', value: 42, barColor: 'bg-error' },
  { id: 'eff-3', name: 'Soil Carbon Capture', comparison: '+8.7% vs LY', comparisonClass: 'text-primary bg-[#e6f3f0]', value: 89, barColor: 'bg-secondary-container' }
];

const MOCK_ROI: ROI[] = [
  { id: 'roi-1', name: 'Operational Cost', value: '$142,500', trend: '4% reduction in seed waste', icon: 'arrow_drop_down' },
  { id: 'roi-2', name: 'Projected Revenue', value: '$894,200', trend: '12% premium yield quality', icon: 'arrow_drop_up' }
];

const MOCK_YIELDS: YieldData[] = [
  { id: 'y1', fieldId: '#CV-2204', crop: 'Corn - Pioneer P11', estYield: '12.4', actual: '12.8', variance: '+3.2%', varianceClass: 'text-primary', efficiency: 92, efficiencyBarClass: 'bg-primary', status: 'Optimum', statusClass: 'bg-[#e6f3f0] text-primary' },
  { id: 'y2', fieldId: '#CV-2208', crop: 'Soybean - Asgrow', estYield: '4.8', actual: '4.5', variance: '-6.2%', varianceClass: 'text-error', efficiency: 65, efficiencyBarClass: 'bg-error', status: 'Stress Alert', statusClass: 'bg-error-container/20 text-error' },
  { id: 'y3', fieldId: '#CV-2212', crop: 'Wheat - KWS', estYield: '8.1', actual: '8.2', variance: '+1.2%', varianceClass: 'text-primary', efficiency: 81, efficiencyBarClass: 'bg-secondary-container', status: 'Standard', statusClass: 'bg-[#F8FAFC] text-on-surface-variant' }
];

export default function Page() {
  const [efficiencies, setEfficiencies] = useState<EfficiencyMetric[]>(MOCK_EFFICIENCY);
  const [rois, setRois] = useState<ROI[]>(MOCK_ROI);
  const [yieldData, setYieldData] = useState<YieldData[]>(MOCK_YIELDS);

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
      
      {/*  Top Navigation Bar  */}
      

      {/*  Main Content Canvas  */}
      <main className=" pt-24 pb-12 px-10 min-min-h-[calc(100vh-72px)]">
        {/*  Action Toolbar  */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 p-1 bg-white border border-gray-100 rounded-xl shadow-sm">
            <button className="px-6 py-2.5 bg-primary text-white rounded-lg font-bold text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">trending_up</span>
              Forecast
            </button>
            <button className="px-6 py-2.5 text-on-surface-variant hover:bg-gray-50 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors">
              <span className="material-symbols-outlined text-lg">history</span>
              Historical
            </button>
            <button className="px-6 py-2.5 text-on-surface-variant hover:bg-gray-50 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors">
              <span className="material-symbols-outlined text-lg">compare_arrows</span>
              Benchmark
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm min-w-[200px]">
              <span className="material-symbols-outlined text-outline-variant mr-3 text-xl">filter_alt</span>
              <select className="bg-transparent border-none focus:ring-0 text-sm font-bold text-on-surface w-full pr-8 outline-none">
                <option>Central Valley Region</option>
                <option>North Plateau</option>
                <option>Southern Basin</option>
              </select>
            </div>
            <button className="flex items-center gap-2 bg-[#3FA796] hover:bg-primary text-white rounded-xl px-6 py-2.5 font-bold text-sm transition-all shadow-sm">
              <span className="material-symbols-outlined text-lg">download</span>
              Export Data
            </button>
          </div>
        </div>

        {/*  Master Layout Grid  */}
        <div className="grid grid-cols-12 gap-8">
          {/*  Main Forecast Chart  */}
          <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="font-headline-md text-xl font-semibold text-on-surface">Yield Forecasting Model</h3>
                <p className="text-sm font-medium text-on-surface-variant/70 mt-1">Predictive analysis based on satellite NDVI and meteorological inputs</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <span className="text-xs font-bold text-on-surface-variant">Projected Yield</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <span className="text-xs font-bold text-on-surface-variant">Confidence Interval</span>
                </div>
              </div>
            </div>
            <div className="relative flex-1 min-h-[380px] w-full">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 350">
                <line className="stroke-gray-100" strokeWidth={1} x1="50" x2="750" y1="50" y2="50"></line>
                <line className="stroke-gray-100" strokeWidth={1} x1="50" x2="750" y1="125" y2="125"></line>
                <line className="stroke-gray-100" strokeWidth={1} x1="50" x2="750" y1="200" y2="200"></line>
                <line className="stroke-gray-100" strokeWidth={1} x1="50" x2="750" y1="275" y2="275"></line>
                <path d="M 50 250 L 150 220 L 250 240 L 350 180 L 450 140 L 550 100 L 650 120 L 750 80 L 750 200 L 650 240 L 550 220 L 450 260 L 350 300 L 250 320 L 150 300 L 50 320 Z" fill="#1F6F5F" fillOpacity="0.08"></path>
                <path d="M 50 280 Q 150 250 250 270 T 450 180 T 650 160 T 750 120" fill="none" stroke="#1F6F5F" strokeLinecap="round" strokeWidth="3"></path>
                <circle cx="50" cy="280" fill="#1F6F5F" r="4"></circle>
                <circle cx="250" cy="270" fill="#1F6F5F" r="4"></circle>
                <circle cx="450" cy="180" fill="#1F6F5F" r="4"></circle>
                <circle cx="650" cy="160" fill="#1F6F5F" r="4"></circle>
                <circle className="animate-pulse" cx="750" cy="120" fill="#1F6F5F" r="6"></circle>
                <text className="text-[11px] fill-on-surface-variant font-bold" x="50" y="330">Apr</text>
                <text className="text-[11px] fill-on-surface-variant font-bold" x="190" y="330">May</text>
                <text className="text-[11px] fill-on-surface-variant font-bold" x="330" y="330">Jun</text>
                <text className="text-[11px] fill-on-surface-variant font-bold" x="470" y="330">Jul</text>
                <text className="text-[11px] fill-on-surface-variant font-bold" x="610" y="330">Aug</text>
                <text className="text-[11px] fill-on-surface-variant font-bold" x="750" y="330">Sep</text>
              </svg>
            </div>
          </div>

          {/*  Resource Efficiency  */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline-md text-xl font-semibold text-on-surface">Resource Efficiency</h3>
              <div className="w-10 h-10 bg-[#e6f3f0] rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl">eco</span>
              </div>
            </div>
            <div className="space-y-8 flex-1">
              {efficiencies.map((metric) => (
                <div key={metric.id}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant/60">{metric.name}</span>
                    <span className={`text-xs font-bold font-data-mono px-2 py-0.5 rounded ${metric.comparisonClass}`}>{metric.comparison}</span>
                  </div>
                  <div className="w-full bg-[#F8FAFC] h-3 rounded-full overflow-hidden">
                    <div className={`${metric.barColor} h-full rounded-full`} style={{ width: `${metric.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 p-5 bg-[#F8FAFC] rounded-2xl border border-gray-100">
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Environmental sustainability score is <span className="font-extrabold text-primary">88/100</span>. Your current irrigation pattern is saving approximately 14,000 m³ of water monthly.
              </p>
            </div>
          </div>

          {/*  Investment ROI Analysis  */}
          <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col">
            <h3 className="font-headline-md text-xl font-semibold text-on-surface mb-8">Investment ROI Analysis</h3>
            <div className="grid grid-cols-2 gap-6">
              {rois.map((roi) => (
                <div key={roi.id} className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-50">
                  <p className="text-xs font-extrabold text-on-surface-variant/60 uppercase tracking-widest mb-2">{roi.name}</p>
                  <p className="text-3xl font-headline-md font-extrabold text-on-surface">{roi.value}</p>
                  <div className="mt-4 flex items-center text-xs font-bold text-primary">
                    <span className="material-symbols-outlined text-lg mr-1">{roi.icon}</span>
                    <span className="">{roi.trend}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-end gap-3 h-48">
              <div className="flex-1 bg-[#e6f3f0] hover:bg-primary/20 transition-all rounded-xl h-[55%] flex flex-col justify-end items-center pb-4 cursor-pointer">
                <span className="text-[10px] font-extrabold text-primary">FY21</span>
              </div>
              <div className="flex-1 bg-[#e6f3f0] hover:bg-primary/20 transition-all rounded-xl h-[70%] flex flex-col justify-end items-center pb-4 cursor-pointer">
                <span className="text-[10px] font-extrabold text-primary">FY22</span>
              </div>
              <div className="flex-1 bg-[#e6f3f0] hover:bg-primary/20 transition-all rounded-xl h-[65%] flex flex-col justify-end items-center pb-4 cursor-pointer">
                <span className="text-[10px] font-extrabold text-primary">FY23</span>
              </div>
              <div className="flex-1 bg-primary hover:opacity-90 transition-all rounded-xl h-[95%] flex flex-col justify-end items-center pb-4 cursor-pointer shadow-lg shadow-primary/20">
                <span className="text-[10px] font-extrabold text-white">FY24</span>
              </div>
            </div>
          </div>

          {/*  Satellite Analysis Visualization  */}
          <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-headline-md text-xl font-semibold text-on-surface">Biomass Intensity</h3>
                <p className="text-sm font-medium text-on-surface-variant/70 mt-1">Live NDVI Satellite Integration</p>
              </div>
              <button className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant text-xl">fullscreen</span>
              </button>
            </div>
            <div className="flex-1 min-h-[300px] w-full rounded-2xl overflow-hidden border border-gray-100 group relative">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvBXEfYh5au2uj4WGB7C9DhhujQSdfOqjjt4Og_BZDPgrwcdFwtZ2rJ2-iRUOkWfLM2gkd2-239tdEAf44OPWYbhkhPYmtIgQZCf9TaV8q1ImQVdFOtfAcaF6DK4MxxxOBBmiOt0ahio8Llrw3Rf45dhfnC7e3DQYqiSWIrJ7q6fdQNwRF-6LZaC3doXqGGAru6to2vUSLLVpVVXzrD4uMyzsqr16jg1VUDVSvmD5qyzVHlP4jwtMKN1aL0CGSlxf8VGddFQK5_fs')` }}></div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 p-4 bg-white/20 backdrop-blur rounded-2xl border border-white/30 flex items-center gap-6 shadow-xl text-white">
                <div className="text-center">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1 text-white/80">Index</p>
                  <p className="text-base font-data-mono font-bold text-white">0.82</p>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1 text-white/80">Density</p>
                  <p className="text-base font-bold text-white">High</p>
                </div>
              </div>
            </div>
          </div>

          {/*  Comparative Yield Matrix  */}
          <div className="col-span-12 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-white">
              <h3 className="font-headline-md text-xl font-semibold text-on-surface">Comparative Yield Matrix</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg border border-gray-100 text-xs font-bold text-on-surface-variant hover:bg-[#F8FAFC] transition-colors">Past 12 Months</button>
                <button className="px-4 py-2 rounded-lg border border-gray-100 text-xs font-bold text-on-surface-variant hover:bg-[#F8FAFC] transition-colors">Regional Benchmark</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#F8FAFC] text-[11px] font-extrabold uppercase tracking-[0.1em] text-outline-variant">
                    <th className="px-8 py-5">Field ID</th>
                    <th className="px-8 py-5">Crop Hybrid</th>
                    <th className="px-8 py-5">Est. Yield (mt)</th>
                    <th className="px-8 py-5">Actual (mt)</th>
                    <th className="px-8 py-5">Variance</th>
                    <th className="px-8 py-5">Efficiency</th>
                    <th className="px-8 py-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {yieldData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                      <td className="px-8 py-5 font-data-mono text-sm text-on-surface">{row.fieldId}</td>
                      <td className="px-8 py-5 text-sm font-bold text-on-surface">{row.crop}</td>
                      <td className="px-8 py-5 text-sm text-on-surface-variant">{row.estYield}</td>
                      <td className="px-8 py-5 text-sm text-on-surface-variant font-bold">{row.actual}</td>
                      <td className={`px-8 py-5 text-sm ${row.varianceClass} font-extrabold`}>{row.variance}</td>
                      <td className="px-8 py-5">
                        <div className="w-32 h-2 bg-[#F8FAFC] rounded-full overflow-hidden">
                          <div className={`${row.efficiencyBarClass} h-full`} style={{ width: `${row.efficiency}%` }}></div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold uppercase ${row.statusClass}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/*  Floating Insight Engine FAB  */}
      <div className="fixed bottom-10 right-10 z-50 group">
        <button className="bg-[#3FA796] text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="material-symbols-outlined text-3xl">auto_awesome</span>
        </button>
        <div className="absolute bottom-24 right-0 w-80 bg-white/90 backdrop-blur rounded-3xl border border-white/40 p-6 shadow-2xl opacity-0 translate-y-6 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500 ease-out">
          <h4 className="font-extrabold text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: `'FILL' 1` }}>tips_and_updates</span>
            AI Insight Engine
          </h4>
          <p className="text-sm text-on-surface-variant/80 leading-relaxed mb-6">
            Detected nitrogen deficiency patterns in Sector <span className="font-bold text-on-surface">#CV-2208</span>. We recommend adjusting the fertigation schedule by 12% to prevent further yield degradation.
          </p>
          <button className="w-full py-3 bg-[#3FA796] hover:bg-primary text-white rounded-xl text-sm font-extrabold transition-all shadow-lg shadow-primary/10">Apply Optimization</button>
        </div>
      </div>
    </div>
  );
}
