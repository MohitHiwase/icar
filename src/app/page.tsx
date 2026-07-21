'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardMapWrapper from '@/components/DashboardMapWrapper';

// Data Interfaces
interface KPIData {
  id: string;
  title: string;
  value: string;
  subValue?: string;
  subText: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  hasPulse?: boolean;
}

interface Activity {
  id: string;
  title: string;
  subtitle: string;
  timeAgo: string;
  icon: string;
  iconColorClass: string;
  bgClass: string;
  statusDotClass: string;
}

interface Opportunity {
  id: string;
  siteName: string;
  details: string;
  suitability: number;
  value: string;
  readiness: string;
  readinessClass: string;
  ownerName: string;
  ownerAvatar: string;
}

// Initial Placeholders for API Data
const MOCK_KPIS: KPIData[] = [
  { id: 'kpi-1', title: 'Active Projects', value: '142', subValue: '12%', subText: 'vs last 7 days', icon: 'account_tree', colorClass: 'text-primary', bgClass: 'bg-primary/5' },
  { id: 'kpi-2', title: 'Budget Utilization', value: '84.2%', subText: 'FY24 Period', icon: 'payments', colorClass: 'text-secondary', bgClass: 'bg-secondary-container/30' },
  { id: 'kpi-3', title: 'System Health', value: '99.8%', subText: 'Operational', icon: 'analytics', colorClass: 'text-primary-container', bgClass: 'bg-on-primary-container/20', hasPulse: true },
  { id: 'kpi-4', title: 'Risk Exposure', value: 'Low', subText: 'requires attention', icon: 'warning', colorClass: 'text-error', bgClass: 'bg-error/10' }
];

const MOCK_ACTIVITIES: Activity[] = [
  { id: 'act-1', title: 'Site Comparison Exported', subtitle: 'Portfolio / Southwest Region', timeAgo: '24 mins ago', icon: 'cloud_upload', iconColorClass: 'text-primary', bgClass: 'bg-[#e6f3f0]', statusDotClass: 'bg-primary' },
  { id: 'act-2', title: 'Risk threshold exceeded', subtitle: 'Grid maintenance at Copper Basin.', timeAgo: '1 hour ago', icon: 'priority_high', iconColorClass: 'text-error', bgClass: 'bg-error-container/40', statusDotClass: 'bg-error' },
  { id: 'act-3', title: 'New Stakeholder Added', subtitle: 'Elena Rossi added to project.', timeAgo: '4 hours ago', icon: 'person', iconColorClass: 'text-on-surface-variant', bgClass: 'bg-surface-container-high', statusDotClass: 'bg-secondary' }
];

const MOCK_OPPORTUNITIES: Opportunity[] = [
  { id: 'opp-1', siteName: 'Mesa Ridge', details: 'AZ-042 • 146 acres', suitability: 89, value: '$42.8M', readiness: 'HIGH', readinessClass: 'bg-primary/10 text-primary', ownerName: 'John D.', ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4FDRXENHk1G4LbkWahtz90oT96h9pbO2ziFr6RV8DbQc7NBF9rx_H0oiWQutDBDLNM8TqwrkCpgDXJiIAPwXaiZ0O-nhq6f1sylo8IrK8vjtzOERhEG-kIVQ6fQuqDv01AGGjt6VDAdMCFfayAS114TVr5Zn5b_HVmzEXn96bQ_Eepr_NdakIBPtiwlmxG-p7xyhev51rrMq2R4XmIUxNyEMXtmARsHVcIvJxpVX6o9VBS66PyB0OrfKqeH1v35dRn3D6kxSRuBU' },
  { id: 'opp-2', siteName: 'Copper Basin', details: 'AZ-087 • 210 acres', suitability: 72, value: '$39.6M', readiness: 'MED', readinessClass: 'bg-secondary-container/40 text-secondary', ownerName: 'Sarah K.', ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDth7VH0Y1HCD0ojzB6uITqaZmPF0AiQPEhnIF-pu3ql35JAHT9O6HSbjEzOYNPas0PRPEVTinUYRsGzkK7iwzpvc5X7QaYLPN0ikJ0jsaEbF0wJ3VNrlBBiFfmlMJjzLzHfuW-cLws2gXv1awK4K_0mFvGzlDZSzbMMQXeMG-Rl62SkFjCt9VL3u_4e0oinoyeP8kmPz9ZQF3PZ37_bT9_kDFVaTJavnndkH1o81XDTDeSFeVzcmjggE3IGUvPvuWt2bRdFazfv_k' }
];

export default function Page() {
  const [kpis, setKpis] = useState<KPIData[]>(MOCK_KPIS);
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(MOCK_OPPORTUNITIES);

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
      
      {/*  Main Content Shell  */}
      <main className="w-full min-h-[calc(100vh-72px)] flex flex-col">
        {/*  Top Navigation Bar  */}
        
        
        {/*  Dashboard Canvas  */}
        <section className="p-10 overflow-y-auto flex-1 custom-scrollbar">
          {/*  Date Selector  */}
          <div className="mb-6 flex justify-end">
            <div className="flex gap-3">
              <div className="bg-white border border-outline-variant/30 px-4 py-2 rounded-lg flex items-center gap-3 text-sm font-medium cursor-pointer">
                <span className="material-symbols-outlined text-lg text-on-surface-variant">calendar_today</span>
                <span className="">May 20 – May 27, 2024</span>
                <span className="material-symbols-outlined text-lg text-on-surface-variant">expand_more</span>
              </div>
            </div>
          </div>
          
          {/*  KPI Cards Grid  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi) => (
              <div key={kpi.id} className="bg-white p-6 rounded-xl elevation-1 border border-outline-variant/20">
                <div className="flex gap-4 items-start">
                  <div className={`p-2.5 ${kpi.bgClass} rounded-lg ${kpi.colorClass}`}>
                    <span className="material-symbols-outlined text-[24px]">{kpi.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-on-surface-variant text-sm font-medium mb-1">{kpi.title}</p>
                    <div className="flex items-end gap-2">
                      <h3 className="text-[28px] font-semibold text-on-surface leading-none">{kpi.value}</h3>
                      {kpi.subValue && (
                        <span className="text-[12px] font-bold text-primary flex items-center mb-1">
                          <span className="material-symbols-outlined text-sm">north</span>{kpi.subValue}
                        </span>
                      )}
                    </div>
                    {kpi.hasPulse ? (
                      <p className={`text-[11px] ${kpi.colorClass} mt-1 font-bold flex items-center gap-1`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${kpi.bgClass.split('/')[0].replace('bg-', 'bg-').split('-container')[0]} bg-primary animate-pulse`}></span> {kpi.subText}
                      </p>
                    ) : (
                      <p className="text-[11px] text-on-surface-variant/60 mt-1">{kpi.subText}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/*  Central Content Section  */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/*  Map Widget  */}
            <div className="lg:col-span-8 bg-white rounded-xl elevation-1 border border-outline-variant/20 overflow-hidden flex flex-col min-h-[540px]">
              <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-lg text-on-surface">GeoVision Infrastructure Map</h4>
                  <p className="text-[13px] text-on-surface-variant">Live view of substation assets and grid connectivity.</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 border border-outline-variant/30 rounded-lg px-3 py-1.5 text-sm font-medium cursor-pointer hover:bg-surface-container-low">
                    <span className="">NDVI</span>
                    <span className="material-symbols-outlined text-lg">expand_more</span>
                  </div>
                  <button className="p-2 hover:bg-surface-container-low rounded-lg border border-outline-variant/30">
                    <span className="material-symbols-outlined text-[20px]">layers</span>
                  </button>
                  <button className="p-2 hover:bg-surface-container-low rounded-lg border border-outline-variant/30">
                    <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 relative bg-[#EDEEEF] group overflow-hidden">
                <DashboardMapWrapper />
                {/*  Overlay Legend  */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-lg border border-outline-variant/20 elevation-1 z-10">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-3.5 h-3.5 rounded-full bg-primary shadow-sm"></span>
                      <span className="font-bold text-on-surface">Primary Substation</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-3.5 h-3.5 rounded-full bg-secondary shadow-sm"></span>
                      <span className="font-bold text-on-surface">Service Hub</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/*  Recent Activity  */}
            <div className="lg:col-span-4 bg-white rounded-xl elevation-1 border border-outline-variant/20 flex flex-col h-full">
              <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
                <h4 className="font-semibold text-lg text-on-surface">Recent Activity</h4>
                <span className="text-sm font-bold text-primary cursor-pointer hover:underline">View all</span>
              </div>
              <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-lg ${activity.bgClass} flex items-center justify-center shrink-0 ${activity.iconColorClass}`}>
                      <span className="material-symbols-outlined text-[20px]">{activity.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-bold text-on-surface truncate">{activity.title}</p>
                        <span className={`w-2 h-2 rounded-full ${activity.statusDotClass} mt-1.5 shrink-0`}></span>
                      </div>
                      <p className="text-[13px] text-on-surface-variant mt-0.5">{activity.subtitle}</p>
                      <p className="text-[11px] text-on-surface-variant/60 mt-1.5">{activity.timeAgo}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/*  System Status Micro-widget  */}
              <div className="p-6 border-t border-outline-variant/10">
                <h5 className="text-[13px] font-bold text-on-surface mb-4">System Status</h5>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                      <span className="text-on-surface-variant">All Systems Operational</span>
                    </div>
                    <span className="font-medium text-on-surface-variant">99.9% uptime</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                      <span className="text-on-surface-variant">Data Processing</span>
                    </div>
                    <span className="font-medium text-on-surface-variant">Real-time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/*  Bottom Data Table Section  */}
          <div className="mt-8 bg-white rounded-xl elevation-1 border border-outline-variant/20 overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
              <h4 className="font-semibold text-lg text-on-surface">GeoVision Priority Opportunities</h4>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 border border-outline-variant/30 rounded-lg px-3 py-1 text-sm font-medium cursor-pointer">
                  <span className="">All Regions</span>
                  <span className="material-symbols-outlined text-lg">expand_more</span>
                </div>
                <button className="text-sm font-bold text-primary hover:bg-primary/5 px-4 py-1 rounded-lg transition-colors">Export CSV</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low/40 text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">
                    <th className="px-8 py-4">Site Name</th>
                    <th className="px-8 py-4">Suitability</th>
                    <th className="px-8 py-4">Est. Value</th>
                    <th className="px-8 py-4">Readiness</th>
                    <th className="px-8 py-4">Owner</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {opportunities.map((opp) => (
                    <tr key={opp.id} className="hover:bg-surface-variant/10 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded bg-[#e6f3f0] flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary">home_pin</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-on-surface">{opp.siteName}</p>
                            <p className="text-[11px] text-on-surface-variant">{opp.details}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-surface-container-high rounded-full h-1.5">
                            <div className="bg-primary h-full rounded-full" style={{ width: `${opp.suitability}%` }}></div>
                          </div>
                          <span className="text-[13px] font-mono font-bold">{opp.suitability}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-on-surface">{opp.value}</td>
                      <td className="px-8 py-5">
                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${opp.readinessClass}`}>
                          {opp.readiness}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <img className="w-6 h-6 rounded-full object-cover" alt={opp.ownerName} src={opp.ownerAvatar} />
                          <span className="text-[13px] font-medium">{opp.ownerName}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
                          <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
