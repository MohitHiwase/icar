export default function MapPage() {
  return (
    <div className="relative z-0 text-on-surface p-0 m-0 w-full flex-1 overflow-hidden">
      {/* Map Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 w-[120%] h-[120%] -m-[10%]" 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAVVMdzpWgLRFiDp8mfHHaBMWi_FNBl26Ez12aYA5qgzT2cAAKumcZ1DHJjoYtglyO8Vs24k_Bjn2gcR8_T-oWuRsex8xy4E_lz2HbSAn3-JfDRUfJ2RKy8cLsDn-V5RBVOkGnMMUAaM_BUl8L7b6jx7L9zGPTWogGIg2hG439VBUMww5qlEMpybzrKOx1db7RhIDG7qdNEwPyTFqAC4m3Q2n3y-zwjuDjxQ4JCm4z02LxqWjId1Z8cp0P9TlW_EEIAORDibU5Grw')" }}
      ></div>
      <div className="absolute inset-0 bg-surface-container-highest/20 pointer-events-none"></div>

      {/* Active Parcel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-48 bg-primary/20 border border-primary/50 cursor-pointer group rounded-sm shadow-sm backdrop-blur-[2px]">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-surface px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 whitespace-nowrap border border-outline-variant z-10">
          <span className="font-label-md text-primary font-bold">Parcel: IA-2024</span>
        </div>
      </div>

      {/* Floating Map Controls */}
      <div className="absolute top-6 left-6 flex flex-col gap-4 z-20">
        <div className="glass-panel p-2 rounded-2xl flex flex-col gap-2">
          <button className="p-3 bg-primary text-on-primary rounded-xl flex items-center justify-center shadow-lg hover:brightness-110 transition-all" title="Satellite">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>layers</span>
          </button>
          <button className="p-3 hover:bg-surface-container-highest text-on-surface-variant rounded-xl flex items-center justify-center transition-all" title="Topography">
            <span className="material-symbols-outlined">terrain</span>
          </button>
          <button className="p-3 hover:bg-surface-container-highest text-on-surface-variant rounded-xl flex items-center justify-center transition-all" title="Soil Types">
            <span className="material-symbols-outlined">opacity</span>
          </button>
        </div>
        <div className="glass-panel p-2 rounded-2xl flex flex-col gap-2">
          <button className="p-3 hover:bg-surface-container-highest text-on-surface-variant rounded-xl flex items-center justify-center transition-all">
            <span className="material-symbols-outlined">add</span>
          </button>
          <button className="p-3 hover:bg-surface-container-highest text-on-surface-variant rounded-xl flex items-center justify-center transition-all">
            <span className="material-symbols-outlined">remove</span>
          </button>
        </div>
      </div>

      {/* Live Metrics Overlay */}
      <div className="absolute bottom-6 left-6 right-auto w-auto z-20">
        <div className="glass-panel p-4 rounded-2xl flex items-center gap-8 border-l-4 border-primary">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">water_drop</span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant uppercase font-bold tracking-tight">Soil Moisture</p>
              <p className="text-2xl font-bold font-headline-sm text-on-surface">34.2<span className="text-sm opacity-60 font-normal ml-0.5">%</span></p>
            </div>
          </div>
          <div className="h-10 w-px bg-outline-variant/30"></div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">device_thermostat</span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant uppercase font-bold tracking-tight">Temp</p>
              <p className="text-2xl font-bold font-headline-sm text-on-surface">22.8<span className="text-sm opacity-60 font-normal ml-0.5">°C</span></p>
            </div>
          </div>
          <div className="h-10 w-px bg-outline-variant/30"></div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant">air</span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant uppercase font-bold tracking-tight">Wind</p>
              <p className="text-2xl font-bold font-headline-sm text-on-surface">12.4<span className="text-sm opacity-60 font-normal ml-0.5">km/h</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Parcel Info Panel */}
      <div className="absolute top-6 right-6 w-80 z-20 space-y-4">
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="bg-primary p-4 text-on-primary">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs opacity-80 uppercase tracking-widest font-bold">Selected Area</p>
                <h3 className="font-headline-sm text-xl font-bold">Parcel IA-2024</h3>
              </div>
              <button className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b border-outline-variant/30">
                <span className="text-xs text-on-surface-variant">Coordinates</span>
                <span className="text-xs font-bold text-on-surface">41.67° N, 93.61° W</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant/30">
                <span className="text-xs text-on-surface-variant">Area Size</span>
                <span className="text-xs font-bold text-on-surface">154.2 Ha</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant/30">
                <span className="text-xs text-on-surface-variant">Crop</span>
                <span className="text-xs font-bold text-primary">Soybeans</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-xs text-on-surface-variant">Health Index</span>
                <span className="text-xs font-bold text-primary">0.82 NDVI</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className="py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:brightness-110 transition-all shadow-sm">
                Analysis
              </button>
              <button className="py-2 border border-outline text-on-surface-variant rounded-xl text-xs font-bold hover:bg-surface-container-highest transition-all">
                Drone Map
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
