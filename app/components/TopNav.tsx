export default function TopNav() {
  return (
    <header className="flex-shrink-0 w-full bg-surface-container-low z-30 border-b border-outline-variant/30 relative">
      <div className="flex justify-between items-center w-full max-w-[1440px] mx-auto px-6 lg:px-12 h-16">
        <div className="flex items-center flex-1">
          <div className="relative w-full max-w-sm">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input className="w-full bg-surface-variant border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/60" placeholder="Search spatial records..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold leading-none text-on-surface">Dr. Elena Rostova</p>
              <p className="text-xs text-on-surface-variant mt-1">Lead GIS Analyst</p>
            </div>
            <img alt="Dr. Elena Rostova" className="h-10 w-10 rounded-full border border-outline-variant object-cover group-hover:ring-2 group-hover:ring-primary/20 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9A9FhQk4IhzT9mizGnaBdLiHw1Vvef-i2YhDFLFfNW_-xSqUwBFLybjeqpZBrFDwoECGECmALcQB2qVmGQ6XQWBZKGvt7XZE-gIjHOQHUXXf_c5VgKqCAzN8yYp24RNJGrzFGg-UeQbzxDtiB3ARgbJf0r2Enz4jJzSOQtRTF1SMA12qQ7u1h3ROzndklSMZKO-Ikxno1MuANlhnVWKmSotrs2CVN_fziUVTR7OtkGGnZOpbhsls8oRQ3KWkzXxV0-t3mhgD8AOI" />
          </div>
        </div>
      </div>
    </header>
  );
}
