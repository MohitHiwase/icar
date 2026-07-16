export default function SideNav() {
  return (
    <aside className="w-64 flex-shrink-0 h-full flex flex-col z-40 bg-surface border-r border-outline-variant/30">
      <div className="h-16 px-gutter flex items-center gap-sm">
        <span className="font-headline-sm text-primary tracking-tight font-bold text-xl px-4 py-4">AgriData</span>
      </div>
      <nav className="flex-1 px-md py-sm space-y-1 overflow-y-auto custom-scrollbar">
        <a className="flex items-center gap-md bg-primary text-on-primary rounded-xl px-md py-3 shadow-sm transition-all duration-150" href="/">
           <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span>
           <span className="font-label-md">Dashboard</span>
        </a>
        <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant/50 rounded-xl px-md py-3 transition-all" href="/map">
           <span className="material-symbols-outlined">map</span>
           <span className="font-label-md">GIS Map</span>
        </a>
        <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant/50 rounded-xl px-md py-3 transition-all" href="#">
           <span className="material-symbols-outlined">database</span>
           <span className="font-label-md">Datasets</span>
        </a>
        <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant/50 rounded-xl px-md py-3 transition-all" href="#">
           <span className="material-symbols-outlined">science</span>
           <span className="font-label-md">Analysis Studio</span>
        </a>
        <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant/50 rounded-xl px-md py-3 transition-all" href="#">
           <span className="material-symbols-outlined">source</span>
           <span className="font-label-md">Data Sources</span>
        </a>
        <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant/50 rounded-xl px-md py-3 transition-all" href="#">
           <span className="material-symbols-outlined">analytics</span>
           <span className="font-label-md">Analytics</span>
        </a>
        <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant/50 rounded-xl px-md py-3 transition-all" href="#">
           <span className="material-symbols-outlined">description</span>
           <span className="font-label-md">Reports</span>
        </a>
      </nav>
      <div className="mt-auto px-md py-md">
        <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant/50 rounded-xl px-md py-3 transition-all" href="#">
           <span className="material-symbols-outlined">settings</span>
           <span className="font-label-md">Settings</span>
        </a>
      </div>
    </aside>
  );
}
