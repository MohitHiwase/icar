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

      {/*  Main Content Canvas  */}
      <main className="py-8 px-8 min-h-[calc(100vh-72px)]">
        {/*  Action Toolbar  */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 p-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl shadow-xs">
            <button className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm flex items-center gap-2 shadow-xs">
              <span className="material-symbols-outlined text-lg">trending_up</span>
              Forecast
            </button>
            <button className="px-5 py-2 text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)] rounded-lg font-medium text-sm flex items-center gap-2 transition-colors">
              <span className="material-symbols-outlined text-lg">history</span>
              Historical
            </button>
            <button className="px-5 py-2 text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)] rounded-lg font-medium text-sm flex items-center gap-2 transition-colors">
              <span className="material-symbols-outlined text-lg">compare_arrows</span>
              Benchmark
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl px-4 py-2 shadow-xs min-w-[200px]">
              <span className="material-symbols-outlined text-[var(--text-muted)] mr-3 text-xl">filter_alt</span>
              <select className="bg-transparent border-none focus:ring-0 text-sm font-semibold text-[var(--text-main)] w-full pr-8 outline-none">
                <option value="Central Valley Region" className="bg-[var(--bg-surface)] text-[var(--text-main)]">Central Valley Region</option>
                <option value="North Plateau" className="bg-[var(--bg-surface)] text-[var(--text-main)]">North Plateau</option>
                <option value="Southern Basin" className="bg-[var(--bg-surface)] text-[var(--text-main)]">Southern Basin</option>
              </select>
            </div>
            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-5 py-2 font-semibold text-sm transition-all shadow-xs">
              <span className="material-symbols-outlined text-lg">download</span>
              Export Data
            </button>
          </div>
        </div>

        {/*  Master Layout Grid  */}
        <div className="grid grid-cols-12 gap-8">
          {/*  Main Forecast Chart  */}
          <div className="col-span-12 lg:col-span-8 bg-[var(--bg-surface)] rounded-2xl p-6 border border-[var(--border-subtle)] shadow-xs flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[var(--text-main)]">Yield Forecasting Model</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">Predictive analysis based on satellite NDVI and meteorological inputs</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-semibold text-[var(--text-muted)]">Projected Yield</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-xs font-semibold text-[var(--text-muted)]">Confidence Interval</span>
                </div>
              </div>
            </div>
            <div className="relative flex-1 min-h-[340px] w-full">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 350">
                <line className="stroke-[var(--border-subtle)]" strokeWidth={1} x1="50" x2="750" y1="50" y2="50"></line>
                <line className="stroke-[var(--border-subtle)]" strokeWidth={1} x1="50" x2="750" y1="125" y2="125"></line>
                <line className="stroke-[var(--border-subtle)]" strokeWidth={1} x1="50" x2="750" y1="200" y2="200"></line>
                <line className="stroke-[var(--border-subtle)]" strokeWidth={1} x1="50" x2="750" y1="275" y2="275"></line>
                <path d="M 50 250 L 150 220 L 250 240 L 350 180 L 450 140 L 550 100 L 650 120 L 750 80 L 750 200 L 650 240 L 550 220 L 450 260 L 350 300 L 250 320 L 150 300 L 50 320 Z" fill="#10B981" fillOpacity="0.1"></path>
                <path d="M 50 280 Q 150 250 250 270 T 450 180 T 650 160 T 750 120" fill="none" stroke="#10B981" strokeLinecap="round" strokeWidth="3"></path>
                <circle cx="50" cy="280" fill="#10B981" r="4"></circle>
                <circle cx="250" cy="270" fill="#10B981" r="4"></circle>
                <circle cx="450" cy="180" fill="#10B981" r="4"></circle>
                <circle cx="650" cy="160" fill="#10B981" r="4"></circle>
                <circle className="animate-pulse" cx="750" cy="120" fill="#10B981" r="6"></circle>
                <text className="text-[11px] fill-[var(--text-muted)] font-semibold" x="50" y="330">Apr</text>
                <text className="text-[11px] fill-[var(--text-muted)] font-semibold" x="190" y="330">May</text>
                <text className="text-[11px] fill-[var(--text-muted)] font-semibold" x="330" y="330">Jun</text>
                <text className="text-[11px] fill-[var(--text-muted)] font-semibold" x="470" y="330">Jul</text>
                <text className="text-[11px] fill-[var(--text-muted)] font-semibold" x="610" y="330">Aug</text>
                <text className="text-[11px] fill-[var(--text-muted)] font-semibold" x="750" y="330">Sep</text>
              </svg>
            </div>
          </div>

          {/*  Resource Efficiency  */}
          <div className="col-span-12 lg:col-span-4 bg-[var(--bg-surface)] rounded-2xl p-6 border border-[var(--border-subtle)] shadow-xs flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold tracking-tight text-[var(--text-main)]">Resource Efficiency</h3>
              <div className="w-9 h-9 bg-emerald-500/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-emerald-500 text-xl">eco</span>
              </div>
            </div>
            <div className="space-y-6 flex-1">
              {efficiencies.map((metric) => (
                <div key={metric.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{metric.name}</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">{metric.comparison}</span>
                  </div>
                  <div className="w-full bg-[var(--border-subtle)] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${metric.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-[var(--bg-app)] rounded-xl border border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Environmental sustainability score is <span className="font-extrabold text-emerald-500">88/100</span>. Your current irrigation pattern is saving approximately 14,000 m³ of water monthly.
              </p>
            </div>
          </div>

          {/*  Investment ROI Analysis  */}
          <div className="col-span-12 lg:col-span-6 bg-[var(--bg-surface)] rounded-2xl p-6 border border-[var(--border-subtle)] shadow-xs flex flex-col">
            <h3 className="text-xl font-bold tracking-tight text-[var(--text-main)] mb-6">Investment ROI Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
              {rois.map((roi) => (
                <div key={roi.id} className="p-5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-subtle)]">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">{roi.name}</p>
                  <p className="text-2xl font-bold text-[var(--text-main)]">{roi.value}</p>
                  <div className="mt-3 flex items-center text-xs font-semibold text-emerald-500">
                    <span className="material-symbols-outlined text-lg mr-1">{roi.icon}</span>
                    <span>{roi.trend}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-end gap-3 h-40">
              <div className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all rounded-xl h-[55%] flex flex-col justify-end items-center pb-3 cursor-pointer border border-emerald-500/20">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">FY21</span>
              </div>
              <div className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all rounded-xl h-[70%] flex flex-col justify-end items-center pb-3 cursor-pointer border border-emerald-500/20">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">FY22</span>
              </div>
              <div className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all rounded-xl h-[65%] flex flex-col justify-end items-center pb-3 cursor-pointer border border-emerald-500/20">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">FY23</span>
              </div>
              <div className="flex-1 bg-emerald-600 hover:bg-emerald-700 transition-all rounded-xl h-[95%] flex flex-col justify-end items-center pb-3 cursor-pointer shadow-md">
                <span className="text-[10px] font-bold text-white">FY24</span>
              </div>
            </div>
          </div>

          {/*  Satellite Analysis Visualization  */}
          <div className="col-span-12 lg:col-span-6 bg-[var(--bg-surface)] rounded-2xl p-6 border border-[var(--border-subtle)] shadow-xs relative overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[var(--text-main)]">Biomass Intensity</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">Live NDVI Satellite Integration</p>
              </div>
              <button className="w-9 h-9 rounded-xl bg-[var(--bg-app)] border border-[var(--border-subtle)] flex items-center justify-center hover:bg-[var(--bg-surface-hover)] transition-colors text-[var(--text-main)]">
                <span className="material-symbols-outlined text-lg">fullscreen</span>
              </button>
            </div>
            <div className="flex-1 min-h-[260px] w-full rounded-2xl overflow-hidden border border-[var(--border-subtle)] group relative">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-105" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvBXEfYh5au2uj4WGB7C9DhhujQSdfOqjjt4Og_BZDPgrwcdFwtZ2rJ2-iRUOkWfLM2gkd2-239tdEAf44OPWYbhkhPYmtIgQZCf9TaV8q1ImQVdFOtfAcaF6DK4MxxxOBBmiOt0ahio8Llrw3Rf45dhfnC7e3DQYqiSWIrJ7q6fdQNwRF-6LZaC3doXqGGAru6to2vUSLLVpVVXzrD4uMyzsqr16jg1VUDVSvmD5qyzVHlP4jwtMKN1aL0CGSlxf8VGddFQK5_fs')` }}></div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-5 left-5 p-3.5 bg-black/40 backdrop-blur-md rounded-xl border border-white/20 flex items-center gap-5 shadow-xl text-white">
                <div className="text-center">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest mb-0.5 text-white/70">Index</p>
                  <p className="text-sm font-mono font-bold text-white">0.82</p>
                </div>
                <div className="w-px h-7 bg-white/20"></div>
                <div className="text-center">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest mb-0.5 text-white/70">Density</p>
                  <p className="text-sm font-bold text-white">High</p>
                </div>
              </div>
            </div>
          </div>

          {/*  Comparative Yield Matrix  */}
          <div className="col-span-12 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-surface)]">
              <h3 className="text-xl font-bold tracking-tight text-[var(--text-main)]">Comparative Yield Matrix</h3>
              <div className="flex gap-2">
                <button className="px-3.5 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)] transition-colors">Past 12 Months</button>
                <button className="px-3.5 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)] transition-colors">Regional Benchmark</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--bg-app)] border-b border-[var(--border-subtle)] text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                    <th className="px-6 py-4">Field ID</th>
                    <th className="px-6 py-4">Crop Hybrid</th>
                    <th className="px-6 py-4">Est. Yield (mt)</th>
                    <th className="px-6 py-4">Actual (mt)</th>
                    <th className="px-6 py-4">Variance</th>
                    <th className="px-6 py-4">Efficiency</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {yieldData.map((row) => (
                    <tr key={row.id} className="hover:bg-[var(--bg-surface-hover)] transition-colors cursor-pointer text-sm">
                      <td className="px-6 py-4 font-mono font-semibold text-[var(--text-main)]">{row.fieldId}</td>
                      <td className="px-6 py-4 font-semibold text-[var(--text-main)]">{row.crop}</td>
                      <td className="px-6 py-4 text-[var(--text-muted)]">{row.estYield}</td>
                      <td className="px-6 py-4 text-[var(--text-main)] font-bold">{row.actual}</td>
                      <td className="px-6 py-4 font-bold text-emerald-500">{row.variance}</td>
                      <td className="px-6 py-4">
                        <div className="w-28 h-2 bg-[var(--border-subtle)] rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${row.efficiency}%` }}></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
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
    </div>
  );
}
