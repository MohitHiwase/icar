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
      

{/*  Main Content Shell  */}
<main className="ml-[240px] h-screen flex flex-col">
{/*  Top Navigation Bar - Matching IMAGE_12 hierarchy  */}
<header className="h-[72px] flex items-center justify-between w-full px-10 bg-white/80 backdrop-blur-md z-10 sticky top-0 border-b border-outline-variant/10">
<div className="flex items-center gap-4">
<span className="text-on-surface-variant text-sm font-medium">Portfolio / Southwest Region / <span className="text-primary font-bold">Overview</span></span>
</div>
<div className="flex items-center gap-4">
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input className="bg-[#F3F4F5] border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-1 focus:ring-primary/20 transition-all" placeholder="Search projects..." type="text" />
</div>
<button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
<span className="material-symbols-outlined text-sm">add</span>
                    New Project
                </button>
<div className="flex items-center gap-2 pl-2 cursor-pointer group">
<img className="w-8 h-8 rounded-full object-cover" data-alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANhRmfA1jRinGYfOpUHVaXitg-7JowRpIn4HU-mw2qujiskbLtMbPRm5dV5jkSajMsbUww2xCLLsyTN6Iy_OvHYvZvrUtY4SrstqHWCt0eNAtqGNzGwzWNrTZaaE6ZP6r1b5MgM09ckKj_Tklt7IBOpSqeyec6BWUQsR_b4SB_KYPW_0s36kdbzj3v7HA1-a2ddWnHZ0WJ7bawXdHwn2fljqLU_n8jN4RDfZhDFpWTE5QUACfIXD32Vam57fKSa-lLd7i5cPj7YHU" />
<span className="text-sm font-bold text-on-surface">Vitalii A.</span>
<span className="material-symbols-outlined text-on-surface-variant text-sm">expand_more</span>
</div>
</div>
</header>
{/*  Dashboard Canvas  */}
<section className="p-10 overflow-y-auto flex-1 custom-scrollbar">
{/*  Page Header  */}
<div className="mb-10 flex justify-between items-end">
<div>
<h2 className="font-headline-lg text-[32px] text-on-background mb-1">Dashboard</h2>
<p className="text-on-surface-variant font-body-md">Overview of your infrastructure intelligence platform</p>
</div>
<div className="flex gap-3">
<div className="bg-white border border-outline-variant/30 px-4 py-2 rounded-lg flex items-center gap-3 text-sm font-medium cursor-pointer">
<span className="material-symbols-outlined text-lg text-on-surface-variant">calendar_today</span>
<span className="">May 20 – May 27, 2024</span>
<span className="material-symbols-outlined text-lg text-on-surface-variant">expand_more</span>
</div>
</div>
</div>
{/*  KPI Cards Grid - Matching IMAGE_12 spacing/layout  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
{/*  Active Projects  */}
<div className="bg-white p-6 rounded-xl elevation-1 border border-outline-variant/20">
<div className="flex gap-4 items-start">
<div className="p-2.5 bg-primary/5 rounded-lg">
<span className="material-symbols-outlined text-primary text-[24px]">account_tree</span>
</div>
<div className="flex-1">
<p className="text-on-surface-variant text-sm font-medium mb-1">Active Projects</p>
<div className="flex items-end gap-2">
<h3 className="text-[28px] font-bold text-on-surface leading-none">142</h3>
<span className="text-[12px] font-bold text-primary flex items-center mb-1">
<span className="material-symbols-outlined text-sm">north</span>12%
                                </span>
</div>
<p className="text-[11px] text-on-surface-variant/60 mt-1">vs last 7 days</p>
</div>
</div>
</div>
{/*  Budget Utilization  */}
<div className="bg-white p-6 rounded-xl elevation-1 border border-outline-variant/20">
<div className="flex gap-4 items-start">
<div className="p-2.5 bg-secondary-container/30 rounded-lg text-secondary">
<span className="material-symbols-outlined text-[24px]">payments</span>
</div>
<div className="flex-1">
<p className="text-on-surface-variant text-sm font-medium mb-1">Budget Utilization</p>
<div className="flex items-end gap-2">
<h3 className="text-[28px] font-bold text-on-surface leading-none">84.2%</h3>
</div>
<p className="text-[11px] text-on-surface-variant/60 mt-1">FY24 Period</p>
</div>
</div>
</div>
{/*  System Health  */}
<div className="bg-white p-6 rounded-xl elevation-1 border border-outline-variant/20">
<div className="flex gap-4 items-start">
<div className="p-2.5 bg-on-primary-container/20 rounded-lg text-primary-container">
<span className="material-symbols-outlined text-[24px]">analytics</span>
</div>
<div className="flex-1">
<p className="text-on-surface-variant text-sm font-medium mb-1">System Health</p>
<div className="flex items-end gap-2">
<h3 className="text-[28px] font-bold text-on-surface leading-none">99.8%</h3>
</div>
<p className="text-[11px] text-primary mt-1 font-bold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Operational
                            </p>
</div>
</div>
</div>
{/*  Risk Assessment  */}
<div className="bg-white p-6 rounded-xl elevation-1 border border-outline-variant/20">
<div className="flex gap-4 items-start">
<div className="p-2.5 bg-error/10 rounded-lg text-error">
<span className="material-symbols-outlined text-[24px]">warning</span>
</div>
<div className="flex-1">
<p className="text-on-surface-variant text-sm font-medium mb-1">Risk Exposure</p>
<div className="flex items-end gap-2">
<h3 className="text-[28px] font-bold text-on-surface leading-none">Low</h3>
</div>
<p className="text-[11px] text-on-surface-variant/60 mt-1">requires attention</p>
</div>
</div>
</div>
</div>
{/*  Central Content Section  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
{/*  Map Widget  */}
<div className="lg:col-span-8 bg-white rounded-xl elevation-1 border border-outline-variant/20 overflow-hidden flex flex-col min-h-[540px]">
<div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
<div>
<h4 className="font-bold text-lg text-on-surface">AgriData Infrastructure Map</h4>
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
<div className="w-full h-full bg-cover bg-center absolute inset-0 opacity-90 group-hover:scale-105 transition-transform duration-[15s]" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDPI-dsqb4Rw8exs7AQgXZaCvvYIf4okvNZavyTHJK_fAT4sdd1P7XA8ESOs5EjAH1mCDrgomXrQcW23KzaW58_nhM9HXiVf6QKnPpwopp4dnpisXx49X5EfKTmifNVph35RnXF3LOud_tSr4f0-UOIz0MSmcXbbb4x6dfzKsUPJhyq1SV9b4Voh6I8rjP_k0H_83fn4BJUy0JbDu_lrK5Di1vZX_qIFOAfwPufMl2xVpjoXP_TxA-8QBimFXARFztrpNiUM7QAmho')` }}></div>
{/*  Overlay Legend  */}
<div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-lg border border-outline-variant/20 elevation-1">
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
<h4 className="font-bold text-lg text-on-surface">Recent Activity</h4>
<span className="text-sm font-bold text-primary cursor-pointer hover:underline">View all</span>
</div>
<div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
{/*  Activity Item  */}
<div className="flex gap-4">
<div className="w-10 h-10 rounded-lg bg-[#F1F8F6] flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px] text-primary">cloud_upload</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-start">
<p className="text-sm font-bold text-on-surface truncate">Site Comparison Exported</p>
<span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></span>
</div>
<p className="text-[13px] text-on-surface-variant mt-0.5">Portfolio / Southwest Region</p>
<p className="text-[11px] text-on-surface-variant/60 mt-1.5">24 mins ago</p>
</div>
</div>
{/*  Activity Item  */}
<div className="flex gap-4">
<div className="w-10 h-10 rounded-lg bg-error-container/40 flex items-center justify-center shrink-0 text-error">
<span className="material-symbols-outlined text-[20px]">priority_high</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-start">
<p className="text-sm font-bold text-on-surface truncate">Risk threshold exceeded</p>
<span className="w-2 h-2 rounded-full bg-error mt-1.5 shrink-0"></span>
</div>
<p className="text-[13px] text-on-surface-variant mt-0.5">Grid maintenance at Copper Basin.</p>
<p className="text-[11px] text-on-surface-variant/60 mt-1.5">1 hour ago</p>
</div>
</div>
{/*  Activity Item  */}
<div className="flex gap-4">
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant">person</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-start">
<p className="text-sm font-bold text-on-surface truncate">New Stakeholder Added</p>
<span className="w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0"></span>
</div>
<p className="text-[13px] text-on-surface-variant mt-0.5">Elena Rossi added to project.</p>
<p className="text-[11px] text-on-surface-variant/60 mt-1.5">4 hours ago</p>
</div>
</div>
</div>
{/*  System Status Micro-widget - Matching bottom right of IMAGE_12 content block  */}
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
<h4 className="font-bold text-lg text-on-surface">AgriData Priority Opportunities</h4>
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
<tr className="hover:bg-surface-variant/10 transition-colors group">
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded bg-[#F1F8F6] flex items-center justify-center">
<span className="material-symbols-outlined text-primary">home_pin</span>
</div>
<div>
<p className="text-sm font-bold text-on-surface">Mesa Ridge</p>
<p className="text-[11px] text-on-surface-variant">AZ-042 • 146 acres</p>
</div>
</div>
</td>
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-24 bg-surface-container-high rounded-full h-1.5">
<div className="bg-primary h-full rounded-full" style={{ width: `89%` }}></div>
</div>
<span className="text-[13px] font-mono font-bold">89</span>
</div>
</td>
<td className="px-8 py-5 text-sm font-bold text-on-surface">$42.8M</td>
<td className="px-8 py-5">
<span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[11px] font-bold">HIGH</span>
</td>
<td className="px-8 py-5">
<div className="flex items-center gap-2">
<img className="w-6 h-6 rounded-full" data-alt="A small profile thumbnail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4FDRXENHk1G4LbkWahtz90oT96h9pbO2ziFr6RV8DbQc7NBF9rx_H0oiWQutDBDLNM8TqwrkCpgDXJiIAPwXaiZ0O-nhq6f1sylo8IrK8vjtzOERhEG-kIVQ6fQuqDv01AGGjt6VDAdMCFfayAS114TVr5Zn5b_HVmzEXn96bQ_Eepr_NdakIBPtiwlmxG-p7xyhev51rrMq2R4XmIUxNyEMXtmARsHVcIvJxpVX6o9VBS66PyB0OrfKqeH1v35dRn3D6kxSRuBU" />
<span className="text-[13px] font-medium">John D.</span>
</div>
</td>
<td className="px-8 py-5 text-right">
<button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-variant/10 transition-colors group">
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded bg-[#F1F8F6] flex items-center justify-center">
<span className="material-symbols-outlined text-primary">home_pin</span>
</div>
<div>
<p className="text-sm font-bold text-on-surface">Copper Basin</p>
<p className="text-[11px] text-on-surface-variant">AZ-087 • 210 acres</p>
</div>
</div>
</td>
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-24 bg-surface-container-high rounded-full h-1.5">
<div className="bg-primary h-full rounded-full" style={{ width: `72%` }}></div>
</div>
<span className="text-[13px] font-mono font-bold">72</span>
</div>
</td>
<td className="px-8 py-5 text-sm font-bold text-on-surface">$39.6M</td>
<td className="px-8 py-5">
<span className="px-2.5 py-1 rounded-lg bg-secondary-container/40 text-secondary text-[11px] font-bold">MED</span>
</td>
<td className="px-8 py-5">
<div className="flex items-center gap-2">
<img className="w-6 h-6 rounded-full" data-alt="A small profile thumbnail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDth7VH0Y1HCD0ojzB6uITqaZmPF0AiQPEhnIF-pu3ql35JAHT9O6HSbjEzOYNPas0PRPEVTinUYRsGzkK7iwzpvc5X7QaYLPN0ikJ0jsaEbF0wJ3VNrlBBiFfmlMJjzLzHfuW-cLws2gXv1awK4K_0mFvGzlDZSzbMMQXeMG-Rl62SkFjCt9VL3u_4e0oinoyeP8kmPz9ZQF3PZ37_bT9_kDFVaTJavnndkH1o81XDTDeSFeVzcmjggE3IGUvPvuWt2bRdFazfv_k" />
<span className="text-[13px] font-medium">Sarah K.</span>
</div>
</td>
<td className="px-8 py-5 text-right">
<button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>
</main>

    </div>
  );
}
