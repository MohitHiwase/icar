export default function Dashboard() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 space-y-8">
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <h2 className="font-headline-sm text-primary tracking-tight text-3xl font-bold">Overview Analysis</h2>
            <p className="text-on-surface-variant mt-2">Real-time telemetry and regional vegetation metrics for Sector 7G.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl font-semibold text-sm hover:opacity-90 shadow-sm transition-opacity">
              <span className="material-symbols-outlined text-[18px]">download</span> Export Report
            </button>
            <button className="flex items-center gap-1 px-4 py-2.5 bg-white text-on-surface rounded-xl font-semibold text-sm hover:bg-surface-container transition-colors border border-outline-variant">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span> Last 30 Days
            </button>
          </div>
        </div>
        
        {/* KPI Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
           <div className="card">
             <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-primary/10 rounded-lg">
                 <span className="material-symbols-outlined text-primary">water_drop</span>
               </div>
               <span className="text-primary font-bold text-xs bg-primary/10 px-2 py-0.5 rounded-full">+2.4%</span>
             </div>
             <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Soil Moisture</p>
             <h3 className="text-3xl font-bold text-on-surface">68.4%</h3>
             <div className="mt-4 w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
               <div className="bg-primary h-full w-[68%] transition-all duration-1000"></div>
             </div>
           </div>
           
           <div className="card">
             <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-surface-container rounded-lg">
                 <span className="material-symbols-outlined text-secondary">rainy</span>
               </div>
               <span className="text-on-surface-variant font-bold text-xs bg-surface-variant px-2 py-0.5 rounded-full">Optimal</span>
             </div>
             <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Precipitation</p>
             <h3 className="text-3xl font-bold text-on-surface">124<span className="text-sm font-normal text-on-surface-variant ml-1">mm</span></h3>
             <p className="text-xs text-on-surface-variant mt-2">Sector average: 118mm</p>
           </div>
           
           <div className="card">
             <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-primary/10 rounded-lg">
                 <span className="material-symbols-outlined text-primary">nature</span>
               </div>
               <span className="text-error font-bold text-xs bg-error/10 px-2 py-0.5 rounded-full">-0.05</span>
             </div>
             <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">NDVI Index</p>
             <h3 className="text-3xl font-bold text-on-surface">0.74</h3>
             <div className="flex items-center gap-1 mt-2 text-xs text-on-surface-variant">
               <span className="w-2 h-2 rounded-full bg-primary"></span> High Vegetation
             </div>
           </div>
           
           <div className="card">
             <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-secondary/10 rounded-lg">
                 <span className="material-symbols-outlined text-secondary">thermostat</span>
               </div>
               <span className="text-secondary font-bold text-xs bg-secondary/10 px-2 py-0.5 rounded-full">Rising</span>
             </div>
             <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Surface Temp</p>
             <h3 className="text-3xl font-bold text-on-surface">24.6<span className="text-sm font-normal text-on-surface-variant ml-1">°C</span></h3>
             <p className="text-xs text-on-surface-variant mt-2">Peak: 28.1°C (14:00)</p>
           </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        <div className="lg:col-span-8 card flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-headline-sm font-bold text-xl text-on-surface">Regional Climate Trends</h4>
              <p className="text-sm text-on-surface-variant">Comparative historical analysis (2023 - 2024)</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-xs font-semibold">Satellite-A</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-outline-variant"></span>
                <span className="text-xs font-semibold text-on-surface-variant">Ground Sensors</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative mt-4">
            <svg className="w-full h-full min-h-[300px]" preserveAspectRatio="none" viewBox="0 0 800 240">
              <defs>
                <linearGradient id="gradient-primary" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <line stroke="var(--outline-variant)" strokeWidth="1" x1="0" x2="800" y1="40" y2="40"></line>
              <line stroke="var(--outline-variant)" strokeWidth="1" x1="0" x2="800" y1="100" y2="100"></line>
              <line stroke="var(--outline-variant)" strokeWidth="1" x1="0" x2="800" y1="160" y2="160"></line>
              <path d="M0,180 L100,160 L200,190 L300,120 L400,140 L500,80 L600,90 L700,40 L800,60 L800,240 L0,240 Z" fill="url(#gradient-primary)"></path>
              <path d="M0,180 L100,160 L200,190 L300,120 L400,140 L500,80 L600,90 L700,40 L800,60" fill="none" stroke="var(--primary)" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M0,210 L100,185 L200,220 L300,160 L400,180 L500,140 L600,130 L700,100 L800,120" fill="none" stroke="var(--outline)" strokeDasharray="6 4" strokeWidth="2"></path>
            </svg>
            <div className="absolute bottom-0 w-full flex justify-between px-2 text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-4">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4 space-y-8">
          <div className="card">
            <h4 className="font-headline-sm font-bold text-lg text-on-surface mb-6 flex items-center justify-between">
              System Health
              <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(37,99,235,0.3)]"></span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 hover:bg-surface-container rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-outline text-[20px]">analytics</span>
                  <span className="text-sm font-semibold">Soil Data API</span>
                </div>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wider">Online</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-surface-container rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-outline text-[20px]">cloud</span>
                  <span className="text-sm font-semibold">Weather Node</span>
                </div>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wider">Online</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-surface-container rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-outline text-[20px]">satellite_alt</span>
                  <span className="text-sm font-semibold">Sentinel Hub</span>
                </div>
                <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-full uppercase tracking-wider">Syncing</span>
              </div>
            </div>
          </div>
          
          <div className="card relative overflow-hidden group hover:shadow-md transition-shadow">
            <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Dataset Stats</h4>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div>
                <p className="text-2xl font-bold text-on-surface">14.2TB</p>
                <p className="text-[11px] text-on-surface-variant font-medium">Total Storage</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-on-surface">824</p>
                <p className="text-[11px] text-on-surface-variant font-medium">Active Layers</p>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 border border-outline-variant text-on-surface rounded-xl text-sm font-bold hover:bg-surface-container transition-colors">
              Manage Repositories
            </button>
          </div>
        </div>
      </div>
      
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 w-full">
         <div className="lg:col-span-12 card !p-0 overflow-hidden">
           <div className="p-6 flex justify-between items-center border-b border-outline-variant/30">
             <h4 className="font-headline-sm font-bold text-lg text-on-surface">Recent Activity</h4>
             <a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">View All Activities</a>
           </div>
           <div className="divide-y divide-outline-variant/30">
             <div className="p-6 flex items-center gap-6 hover:bg-surface-container-low transition-colors cursor-pointer">
               <div className="bg-primary/10 p-3 rounded-xl text-primary">
                 <span className="material-symbols-outlined">refresh</span>
               </div>
               <div className="flex-1">
                 <p className="text-sm text-on-surface font-medium">Data Refresh Complete — Sector 7G NDVI layers updated.</p>
                 <p className="text-xs text-on-surface-variant mt-1">2 minutes ago</p>
               </div>
               <div className="text-right">
                 <span className="text-[10px] font-bold bg-surface-container text-on-surface-variant px-3 py-1 rounded-full uppercase tracking-wider">System</span>
               </div>
             </div>
             
             <div className="p-6 flex items-center gap-6 hover:bg-surface-container-low transition-colors cursor-pointer">
               <img alt="Dr. Aris Thorne" className="w-12 h-12 rounded-full object-cover border border-outline-variant/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIXQw2AY-YQaxmszhqywNZYfYGljndfGMHxkGI5zJGm_ILOFcmt0MDHbkQg6IeWWTP4iy-yjCoUfZYX309Kqq0EB7QwoFs6Htzki9WKY-LYv_FIt3idhox7qsRPwNgsuOA5Zhf2OdCWJPIfm9i_DcJyJkTYa8_Xxo2AS72MjP4Y8FdsDwlmdkbEyHIqrEbzA-X9czQcJv-WS6ytHupdaRQtOQO47S2ltu9NHufQquEiw3CiQSlhzttPqkXK2ce6OPFanPdbaNrbG0" />
               <div className="flex-1">
                 <p className="text-sm text-on-surface font-medium">Dr. Aris Thorne accessed the Precipitation_Historical_V2 dataset.</p>
                 <p className="text-xs text-on-surface-variant mt-1">14 minutes ago</p>
               </div>
               <div className="text-right">
                 <span className="text-[10px] font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">User Access</span>
               </div>
             </div>
             
             <div className="p-6 flex items-center gap-6 hover:bg-surface-container-low transition-colors cursor-pointer">
               <div className="bg-error/10 p-3 rounded-xl text-error">
                 <span className="material-symbols-outlined">warning</span>
               </div>
               <div className="flex-1">
                 <p className="text-sm text-on-surface font-medium">Anomaly Detected — Surface temperature spike in Region B-12.</p>
                 <p className="text-xs text-on-surface-variant mt-1">1 hour ago</p>
               </div>
               <div className="text-right">
                 <span className="text-[10px] font-bold bg-error/10 text-error px-3 py-1 rounded-full uppercase tracking-wider">Critical Alert</span>
               </div>
             </div>
           </div>
         </div>
      </section>
    </div>
  );
}
