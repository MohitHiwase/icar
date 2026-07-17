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
      

{/*  Header  */}
<header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-20 bg-[#f8f9fa] flex justify-between items-center px-8 z-40">
<div>
<h2 className="font-headline-md text-[24px] font-bold text-on-surface">Reports Management</h2>
<p className="text-body-md text-on-surface-variant">Access, export, and automate your geospatial agricultural intelligence.</p>
</div>
<div className="flex items-center gap-6"><button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 transition-all shadow-sm" onclick="toggleModal('schedule-modal')">
<span className="material-symbols-outlined text-[20px]">add</span>
                Schedule Automated Report
            </button>
<div className="flex items-center gap-3 pl-6 border-l border-outline-variant">
<div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border-2 border-white shadow-sm">
<img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm9VJ2hH66j4Iai6OXez_rrEYtviCN2mI2v-TL-mPr1bHVuagr93psN_aLEal6pYkBiTvWw1oB7Gprga0wau2Qvo2DR8kbV1irSsC3QaSeH14xav97u4_nh_jSiAVvqKtpZqaflolpEllTllCA1SK2peYAj3PQKZ_gBA6QAaVNazBnktb9EjkZx5mzasu9e-Wm3t0cV8yXb8-D3ZgTFjmXDxfC7vDS4ssL49Q6dqJj_Mv-P59gLayu-iufpH_0LWn-49DevzXpjTE" />
</div>
<div className="flex items-center gap-1 cursor-pointer">
<p className="font-semibold text-on-surface text-body-md">Dr. Elena Fisher</p>
<span className="material-symbols-outlined text-on-surface-variant text-[18px]">expand_more</span>
</div>
</div></div>
</header>
{/*  Main Content  */}
<main className="ml-64 pt-24 px-8 pb-12 min-h-screen">
<div className="max-w-[1600px] mx-auto space-y-6">
{/*  Stats Row  */}
<div className="grid grid-cols-4 gap-6">
<div className="bg-white p-6 rounded-2xl border border-white shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[22px]">description</span>
</div>
<span className="text-body-md font-semibold text-on-surface">Total Generated</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-[28px] font-bold text-on-surface">1,248</span>
<span className="text-primary text-[13px] font-bold flex items-center">
<span className="material-symbols-outlined text-[16px] mr-0.5">trending_up</span> 12%
                            </span>
</div>
<p className="text-[12px] text-outline mt-1 font-medium">vs last 30 days</p>
</div>
</div>
<div className="bg-white p-6 rounded-2xl border border-white shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[22px]">storage</span>
</div>
<span className="text-body-md font-semibold text-on-surface">Storage Used</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-[28px] font-bold text-on-surface">14.2 GB</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: `65%` }}></div>
</div>
</div>
</div>
<div className="bg-white p-6 rounded-2xl border border-white shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[22px]">hourglass_empty</span>
</div>
<span className="text-body-md font-semibold text-on-surface">Pending Tasks</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-[28px] font-bold text-on-surface">3</span>
</div>
<p className="text-[12px] text-outline mt-1 font-medium italic">Processing geospatial layers</p>
</div>
</div>
<div className="bg-white p-6 rounded-2xl border border-white shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[22px]">update</span>
</div>
<span className="text-body-md font-semibold text-on-surface">Automated Schedules</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-[28px] font-bold text-on-surface">8</span>
</div>
<p className="text-[12px] text-outline mt-1 font-medium italic">Active daily/weekly pulses</p>
</div>
</div>
</div>
{/*  Main Layout Grid  */}
<div className="grid grid-cols-12 gap-6">
{/*  Main Content Column  */}
<div className="col-span-9 space-y-6">
{/*  Reports Table Section  */}
<div className="bg-white rounded-2xl border border-white shadow-sm overflow-hidden">
<div className="px-8 py-6 border-b border-surface-container flex items-center justify-between">
<h3 className="font-headline-md text-[20px] font-bold text-on-surface">Recent Reports</h3>
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
{/*  Row 1  */}
<tr className="hover:bg-surface-container-low/20 transition-colors group">
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">map</span>
</div>
<div>
<p className="font-bold text-on-surface text-body-md">Quarterly Yield Analysis - Zone 4</p>
<p className="text-[12px] text-outline">GIS Intelligence Matrix • 4.2 MB</p>
</div>
</div>
</td>
<td className="px-8 py-5 text-body-md text-on-surface-variant font-data-mono">Oct 24, 2023 14:15</td>
<td className="px-8 py-5">
<span className="px-2.5 py-1 bg-secondary-container text-on-secondary-container text-[11px] font-bold rounded uppercase">Yield Matrix</span>
</td>
<td className="px-8 py-5">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
<span className="text-body-md text-on-surface font-medium">Complete</span>
</div>
</td>
<td className="px-8 py-5 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-2 hover:bg-surface-container-high rounded-lg text-primary transition-colors" title="Export PDF">
<span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-primary transition-colors" title="Export Excel">
<span className="material-symbols-outlined text-[20px]">table_chart</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-outline transition-colors">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</div>
</td>
</tr>
{/*  Row 2  */}
<tr className="hover:bg-surface-container-low/20 transition-colors group">
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">water_drop</span>
</div>
<div>
<p className="font-bold text-on-surface text-body-md">Irrigation Efficiency Audit</p>
<p className="text-[12px] text-outline">Sensory Data Export • 1.8 MB</p>
</div>
</div>
</td>
<td className="px-8 py-5 text-body-md text-on-surface-variant font-data-mono">Oct 22, 2023 09:30</td>
<td className="px-8 py-5">
<span className="px-2.5 py-1 bg-surface-container-high text-on-surface-variant text-[11px] font-bold rounded uppercase">Hydrology</span>
</td>
<td className="px-8 py-5">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
<span className="text-body-md text-on-surface font-medium">Complete</span>
</div>
</td>
<td className="px-8 py-5 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-2 hover:bg-surface-container-high rounded-lg text-primary transition-colors">
<span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-primary transition-colors">
<span className="material-symbols-outlined text-[20px]">table_chart</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-outline transition-colors">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</div>
</td>
</tr>
{/*  Row 3  */}
<tr className="hover:bg-surface-container-low/20 transition-colors group">
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">forest</span>
</div>
<div>
<p className="font-bold text-on-surface text-body-md">Soil Carbon Sequestration Report</p>
<p className="text-[12px] text-outline">Compliance Document • 12.1 MB</p>
</div>
</div>
</td>
<td className="px-8 py-5 text-body-md text-on-surface-variant font-data-mono">Oct 20, 2023 16:45</td>
<td className="px-8 py-5">
<span className="px-2.5 py-1 bg-secondary-container text-on-secondary-container text-[11px] font-bold rounded uppercase">Ecology</span>
</td>
<td className="px-8 py-5">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
<span className="text-body-md text-on-surface font-medium">Processing</span>
</div>
</td>
<td className="px-8 py-5 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-2 opacity-50 cursor-not-allowed">
<span className="material-symbols-outlined text-[20px]">hourglass_top</span>
</button>
</div>
</td>
</tr>
{/*  Row 4  */}
<tr className="hover:bg-surface-container-low/20 transition-colors group">
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">satellite_alt</span>
</div>
<div>
<p className="font-bold text-on-surface text-body-md">NDVI Vegetation Index - North Sector</p>
<p className="text-[12px] text-outline">Satellite Imagery Digest • 34.5 MB</p>
</div>
</div>
</td>
<td className="px-8 py-5 text-body-md text-on-surface-variant font-data-mono">Oct 19, 2023 11:20</td>
<td className="px-8 py-5">
<span className="px-2.5 py-1 bg-surface-container-high text-on-surface-variant text-[11px] font-bold rounded uppercase">Satellite</span>
</td>
<td className="px-8 py-5">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
<span className="text-body-md text-on-surface font-medium">Complete</span>
</div>
</td>
<td className="px-8 py-5 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-2 hover:bg-surface-container-high rounded-lg text-primary transition-colors">
<span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-primary transition-colors">
<span className="material-symbols-outlined text-[20px]">table_chart</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-outline transition-colors">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<div className="px-8 py-5 border-t border-surface-container flex items-center justify-between">
<span className="text-body-md text-on-surface-variant font-medium">Showing 1-4 of 1,248 reports</span>
<div className="flex items-center gap-2">
<button className="p-1.5 hover:bg-surface-container-low rounded-lg border border-outline-variant disabled:opacity-30 transition-colors" disabled="">
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
<h4 className="font-bold text-[18px]">Insight AI</h4>
</div>
<p className="text-body-md opacity-90 mb-6 leading-relaxed">Your next Yield Analysis is scheduled for automated generation in 48 hours.</p>
<button className="px-5 py-2.5 bg-white text-primary rounded-xl font-bold text-body-md hover:bg-opacity-90 transition-all shadow-sm">
                                Review Schedule
                            </button>
</div>
<div className="absolute -bottom-8 -right-8 opacity-10">
<span className="material-symbols-outlined text-[140px]" data-weight="fill">psychology</span>
</div>
</div>
{/*  Active Pulses List  */}
<div className="bg-white p-6 rounded-2xl border border-white shadow-sm">
<div className="flex items-center justify-between mb-6">
<h4 className="font-bold text-[18px] text-on-surface">Active Pulses</h4>
<span className="text-primary font-bold text-[13px] cursor-pointer hover:underline">View all</span>
</div>
<div className="space-y-4">
<div className="flex items-start gap-4 p-4 bg-surface-container-low/50 rounded-2xl border border-surface-container-low">
<div className="p-2.5 bg-white rounded-xl shadow-sm text-primary">
<span className="material-symbols-outlined text-[20px]">calendar_month</span>
</div>
<div className="flex-1">
<p className="font-bold text-on-surface text-body-md leading-tight">Weekly Soil Report</p>
<p className="text-[12px] text-outline mt-0.5">Next: Monday, 06:00</p>
</div>
<label className="relative inline-flex items-center cursor-pointer mt-1">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-10 h-5.5 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="flex items-start gap-4 p-4 bg-surface-container-low/50 rounded-2xl border border-surface-container-low">
<div className="p-2.5 bg-white rounded-xl shadow-sm text-primary">
<span className="material-symbols-outlined text-[20px]">wb_sunny</span>
</div>
<div className="flex-1">
<p className="font-bold text-on-surface text-body-md leading-tight">Daily Weather Impact</p>
<p className="text-[12px] text-outline mt-0.5">Next: Today, 20:00</p>
</div>
<label className="relative inline-flex items-center cursor-pointer mt-1">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-10 h-5.5 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
<button className="w-full mt-6 py-3 border border-dashed border-outline-variant rounded-2xl text-on-surface-variant font-bold text-body-md hover:bg-surface-container-low transition-colors">
                            + Add New Pulse
                        </button>
</div>
{/*  Data Health Widget  */}
<div className="bg-white p-6 rounded-2xl border border-white shadow-sm">
<div className="flex items-center justify-between mb-6">
<h4 className="font-bold text-[18px] text-on-surface">Data Health</h4>
<span className="material-symbols-outlined text-primary">check_circle</span>
</div>
<div className="relative w-40 h-40 mx-auto flex items-center justify-center mb-6">
<svg className="w-full h-full transform -rotate-90">
<circle className="text-surface-container" cx="50%" cy="50%" fill="transparent" r="42%" stroke="currentColor" strokeWidth="10"></circle>
<circle className="text-primary" cx="50%" cy="50%" fill="transparent" r="42%" stroke="currentColor" stroke-dasharray="264" stroke-dashoffset="52.8" strokeLinecap="round" strokeWidth="10"></circle>
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
{/*  Schedule Modal  */}
<div className="fixed inset-0 z-[100] hidden items-center justify-center px-4 bg-on-surface/30 backdrop-blur-sm transition-opacity duration-300" id="schedule-modal">
<div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden transform transition-transform duration-300 scale-95 opacity-0 modal-container">
<div className="px-10 py-8 border-b border-surface-container flex items-center justify-between">
<h3 className="font-headline-lg text-[24px] font-bold text-on-surface">Schedule Pulse</h3>
<button className="p-2 hover:bg-surface-container-low rounded-full transition-colors" onclick="toggleModal('schedule-modal')">
<span className="material-symbols-outlined">close</span>
</button>
</div>
<div className="p-10 space-y-8">
<div>
<label className="block text-body-md font-bold text-on-surface mb-3">Report Template</label>
<select className="w-full px-5 py-4 rounded-2xl border border-outline-variant bg-surface outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-body-md font-medium">
<option>Yield Analysis Matrix</option>
<option>Hydrology &amp; Soil Moisture</option>
<option>Satellite Vegetation Digest</option>
<option>Carbon Sequestration Compliance</option>
</select>
</div>
<div className="grid grid-cols-2 gap-6">
<div>
<label className="block text-body-md font-bold text-on-surface mb-3">Frequency</label>
<select className="w-full px-5 py-4 rounded-2xl border border-outline-variant bg-surface outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-body-md font-medium">
<option>Daily</option>
<option>Weekly</option>
<option>Monthly</option>
</select>
</div>
<div>
<label className="block text-body-md font-bold text-on-surface mb-3">Delivery Format</label>
<select className="w-full px-5 py-4 rounded-2xl border border-outline-variant bg-surface outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-body-md font-medium">
<option>PDF (Document)</option>
<option>CSV (Raw Data)</option>
<option>JSON (API Feed)</option>
</select>
</div>
</div>
<div>
<label className="block text-body-md font-bold text-on-surface mb-3">Destination Emails</label>
<input className="w-full px-5 py-4 rounded-2xl border border-outline-variant bg-surface outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-body-md font-medium" placeholder="e.g. analytics@agridata.com" type="text" />
<p className="text-[12px] text-outline mt-2.5 font-medium italic">Separate multiple addresses with commas.</p>
</div>
<div className="flex items-center gap-4 pt-4">
<button className="flex-1 py-4 border border-outline-variant text-on-surface font-bold rounded-2xl hover:bg-surface-container-low transition-all text-body-md" onclick="toggleModal('schedule-modal')">
                        Cancel
                    </button>
<button className="flex-1 py-4 bg-primary text-on-primary font-bold rounded-2xl shadow-lg hover:opacity-95 transition-all text-body-md">
                        Create Schedule
                    </button>
</div>
</div>
</div>
</div>

    </div>
  );
}
