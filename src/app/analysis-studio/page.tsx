'use client';
import { useState } from 'react';
import Link from 'next/link';

// Data Interfaces
interface ModuleItem {
  id: string;
  name: string;
  icon: string;
}

interface ModuleCategory {
  id: string;
  title: string;
  colorType: 'primary' | 'secondary' | 'tertiary';
  items: ModuleItem[];
}

interface CanvasNode {
  id: string;
  title: string;
  type: 'input' | 'transform' | 'output';
  icon: string;
  position: { top: string; left: string; width: string };
  // Using any here to allow mock data flexibility for different node contents
  data: any; 
}

interface SvgPath {
  id: string;
  d: string;
  color: string;
  dashed: boolean;
}

interface NodeMetadata {
  id: string;
  label: string;
  value: string;
}

// Initial Placeholders
const MOCK_CATEGORIES: ModuleCategory[] = [
  {
    id: 'cat-1', title: 'Input Sources', colorType: 'primary',
    items: [
      { id: 'in1', name: 'Sentinel-2 Imagery', icon: 'satellite_alt' },
      { id: 'in2', name: 'Historical Weather', icon: 'thermostat' },
      { id: 'in3', name: 'Soil Grid CSV', icon: 'grid_on' },
    ]
  },
  {
    id: 'cat-2', title: 'Analysis Logic', colorType: 'secondary',
    items: [
      { id: 'al1', name: 'NDVI Calculation', icon: 'functions' },
      { id: 'al2', name: 'Random Forest', icon: 'psychology' },
      { id: 'al3', name: 'Outlier Filter', icon: 'filter_alt' },
    ]
  },
  {
    id: 'cat-3', title: 'Outputs', colorType: 'tertiary',
    items: [
      { id: 'out1', name: 'Heatmap Generator', icon: 'map' },
      { id: 'out2', name: 'Export to CSV', icon: 'table_view' },
    ]
  }
];

const MOCK_NODES: CanvasNode[] = [
  {
    id: 'node-1',
    title: 'Imagery Source',
    type: 'input',
    icon: 'satellite_alt',
    position: { top: '8rem', left: '6rem', width: '16rem' },
    data: { dataset: 'Sentinel-2_Central_EU' }
  },
  {
    id: 'node-2',
    title: 'NDVI Index',
    type: 'transform',
    icon: 'functions',
    position: { top: '16rem', left: '40%', width: '16rem' },
    data: {
      bands: [
        { label: 'Red Band (B4)', value: '0.65', percent: 65 },
        { label: 'NIR Band (B8)', value: '0.82', percent: 82 }
      ]
    }
  },
  {
    id: 'node-3',
    title: 'Analysis Output',
    type: 'output',
    icon: 'insights',
    position: { top: '12rem', left: '70%', width: '18rem' },
    data: {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjNpwltT_Srs0IPmw88EMi0pl_HvFAsAtsqzgSTMO1dwlaWRq-3jfWrJR1YtCkN56dT9ffh0fQXu5SaHVSvxtNWUEP9rz4u96cWaCl2Tj4D0kWroqvl0atKjO2sblFKoCfYGuT34AweS-siB_g0_qvC78Ktp_mtiu_mrxWg2_AsyU92IU0PtXmFtaJIBz2q82F_GuTj7iyLV1rWUbhx0qHOwrzPqGfli1J9wdgK6Wajy87mRt91HS1eJvftCXK6O_XUOvqzprRTJg',
      status: 'Streaming Live Results'
    }
  }
];

const MOCK_PATHS: SvgPath[] = [
  { id: 'path-1', d: 'M 312 178 C 380 178, 380 280, 448 280', color: '#1F6F5F', dashed: true },
  { id: 'path-2', d: 'M 312 210 C 380 210, 380 340, 448 340', color: '#1F6F5F', dashed: false },
];

const MOCK_METADATA: NodeMetadata[] = [
  { id: 'm1', label: 'COMPUTE COST', value: '$0.042 / run' },
  { id: 'm2', label: 'DEPENDENCIES', value: 'NumPy, SciPy' },
  { id: 'm3', label: 'LAST MODIFIED', value: 'Today, 14:22' },
];

export default function Page() {
  const [categories, setCategories] = useState<ModuleCategory[]>(MOCK_CATEGORIES);
  const [nodes, setNodes] = useState<CanvasNode[]>(MOCK_NODES);
  const [connections, setConnections] = useState<SvgPath[]>(MOCK_PATHS);
  const [metadata, setMetadata] = useState<NodeMetadata[]>(MOCK_METADATA);

  // Selected node config (mocked state)
  const [selectedNodeName, setSelectedNodeName] = useState('NDVI Calculation');
  const [executionMode, setExecutionMode] = useState('Standard (Synchronous)');
  const [smoothingAlpha, setSmoothingAlpha] = useState(45);
  const [autoThreshold, setAutoThreshold] = useState(true);
  const [kernelSize, setKernelSize] = useState('5x5');

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
      
      {/*  Main Content Canvas  */}
      <main className=" min-h-[calc(100vh-72px)] flex flex-col relative overflow-hidden bg-[#F8FAFC]">
        {/*  Header  */}
        

        <div className="flex-1 flex overflow-hidden">
          {/*  Left Side Panel: Modules  */}
          <aside className="w-72 bg-white border-r border-outline-variant flex flex-col z-10 shadow-sm">
            <div className="p-6 border-b border-outline-variant bg-surface-container-low/50">
              <div className="relative"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDhmX6Q4yPqOYXvwas8DAiRoL8BVlrt4HxFjLSgYh2WNfRA3SDII2Qe9NTmsDYZad9X8UILVNvyE_FZ7ggjCB6t-fKANbHb3Ndw660l1sD10EH_aoRdYlydCuQwESALoO8_5Tgo4zBXgNndaTJZrc6_N8wFQrmxOoHCKXJuvdT0EnXP5lDpap5l9oM67ArifCq0svtX9jdJmh6Znx62AOa9uJQ7Rg2GEqKHnrtYYY-Xiwrsa7n4AdIWepAnYhk-gwjBG3w7de2lO4" alt="GeoVision Logo" className="w-full h-full object-cover rounded-lg" /></div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {categories.map((category) => (
                <div key={category.id}>
                  <h3 className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-[0.1em] mb-4">{category.title}</h3>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div key={item.id} className={`p-3 bg-white border border-outline-variant rounded-xl flex items-center gap-3 cursor-grab hover:border-${category.colorType} hover:shadow-md transition-all group`}>
                        <div className={`w-8 h-8 rounded-lg bg-${category.colorType}/5 flex items-center justify-center`}>
                          <span className={`material-symbols-outlined text-${category.colorType} text-[20px]`}>{item.icon}</span>
                        </div>
                        <span className="text-sm font-semibold text-on-surface">{item.name}</span>
                        <span className="material-symbols-outlined ml-auto text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
            </div>
          </aside>

          {/*  Workflow Builder Canvas  */}
          <section className="flex-1 bg-surface-container-low relative overflow-hidden canvas-grid">
            {/*  Floating Toolbar  */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center bg-white shadow-xl border border-outline-variant rounded-2xl px-3 py-2 z-20">
              <button className="p-2 hover:bg-surface-container-high rounded-xl transition-colors text-primary" title="Select Tool">
                <span className="material-symbols-outlined text-[22px]">near_me</span>
              </button>
              <div className="w-px h-6 bg-outline-variant mx-2"></div>
              <button className="p-2 hover:bg-surface-container-high rounded-xl transition-colors text-on-surface-variant" title="Add Connection">
                <span className="material-symbols-outlined text-[22px]">polyline</span>
              </button>
              <button className="p-2 hover:bg-surface-container-high rounded-xl transition-colors text-on-surface-variant" title="Hand Tool">
                <span className="material-symbols-outlined text-[22px]">pan_tool</span>
              </button>
              <div className="w-px h-6 bg-outline-variant mx-2"></div>
              <button className="p-2 hover:bg-surface-container-high rounded-xl transition-colors text-on-surface-variant" title="Zoom In">
                <span className="material-symbols-outlined text-[22px]">zoom_in</span>
              </button>
              <button className="p-2 hover:bg-surface-container-high rounded-xl transition-colors text-on-surface-variant" title="Zoom Out">
                <span className="material-symbols-outlined text-[22px]">zoom_out</span>
              </button>
            </div>

            {/*  Workflow Nodes rendering from state  */}
            <div className="w-full h-full relative">
              {/*  SVG Connections  */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {connections.map(conn => (
                  <path key={conn.id} d={conn.d} fill="none" stroke={conn.color} strokeDasharray={conn.dashed ? "4" : ""} strokeWidth="2"></path>
                ))}
              </svg>

              {nodes.map(node => {
                const isInput = node.type === 'input';
                const isTransform = node.type === 'transform';
                const isOutput = node.type === 'output';

                return (
                  <div key={node.id} className="absolute bg-white rounded-2xl shadow-lg border border-outline-variant p-5 node-active" 
                       style={{ top: node.position.top, left: node.position.left, width: node.position.width }}>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-2xl ${isInput ? 'text-primary' : isTransform ? 'text-secondary' : 'text-tertiary'}`}>
                          {node.icon}
                        </span>
                        <h4 className="font-semibold text-[15px] text-on-surface">{node.title}</h4>
                      </div>
                      <span className="material-symbols-outlined text-outline-variant text-xl cursor-pointer hover:text-on-surface transition-colors">more_vert</span>
                    </div>

                    {/* Node contents based on type */}
                    {isInput && (
                       <div className="space-y-4">
                        <div className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">Dataset</div>
                        <div className="p-2.5 bg-surface-container-lowest rounded-lg border border-outline-variant text-xs flex items-center justify-between font-medium cursor-pointer hover:border-primary transition-all">
                          <span className="">{node.data.dataset}</span>
                          <span className="material-symbols-outlined text-sm">expand_more</span>
                        </div>
                      </div>
                    )}
                    
                    {isTransform && (
                      <div className="space-y-4">
                        {node.data.bands.map((band: any, i: number) => (
                           <div key={i}>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-on-surface-variant">{band.label}</span>
                              <span className="text-xs font-mono font-bold text-primary">{band.value}</span>
                            </div>
                            <div className="w-full bg-surface-container rounded-full h-2 mt-1">
                              <div className="bg-primary h-2 rounded-full" style={{ width: `${band.percent}%` }}></div>
                            </div>
                           </div>
                        ))}
                      </div>
                    )}

                    {isOutput && (
                      <>
                        <div className="rounded-xl overflow-hidden h-36 mb-4 shadow-inner ring-1 ring-outline-variant">
                          <img className="w-full h-full object-cover" data-alt={node.title} src={node.data.image} />
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-surface-container-low rounded-lg">
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">{node.data.status}</span>
                        </div>
                      </>
                    )}

                    {/* Connectors */}
                    <div className={`mt-5 flex ${isTransform ? 'justify-between' : isInput ? 'justify-end' : 'justify-start'}`}>
                       {(isTransform || isOutput) && <div className="w-4 h-4 bg-outline-variant rounded-full border-2 border-white -ml-7 shadow-sm"></div>}
                       {(isInput || isTransform) && <div className="w-4 h-4 bg-primary rounded-full border-2 border-white -mr-7 relative z-10 shadow-sm cursor-crosshair"></div>}
                    </div>
                  </div>
                )
              })}
            </div>

            {/*  Minimap  */}
            <div className="absolute bottom-6 right-6 w-48 h-36 bg-white/90 backdrop-blur-sm border border-outline-variant rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-full opacity-30 canvas-grid scale-[0.4] origin-top-left"></div>
              <div className="absolute top-10 left-8 w-10 h-6 bg-primary/20 border border-primary/50 rounded-md"></div>
              <div className="absolute top-20 left-16 w-10 h-8 bg-secondary/20 border border-secondary/50 rounded-md"></div>
              <div className="absolute inset-4 border-2 border-primary/40 rounded-lg pointer-events-none"></div>
            </div>
          </section>

          {/*  Right Side Panel: Parameters / Code  */}
          <aside className="w-[340px] bg-white border-l border-outline-variant flex flex-col z-10">
            <div className="flex items-center border-b border-outline-variant px-2">
              <button className="flex-1 py-5 text-sm font-bold text-primary border-b-[3px] border-primary">Properties</button>
              <button className="flex-1 py-5 text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all">Python Editor</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-10">
              <div>
                <h3 className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-[0.12em] mb-5">General Settings</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant mb-2">NODE NAME</label>
                    <input 
                      className="w-full px-3 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                      type="text" 
                      value={selectedNodeName}
                      onChange={(e) => setSelectedNodeName(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant mb-2">EXECUTION MODE</label>
                    <div className="relative">
                      <select 
                        className="w-full pl-3 pr-10 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-sm font-medium appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={executionMode}
                        onChange={(e) => setExecutionMode(e.target.value)}
                      >
                        <option>Standard (Synchronous)</option>
                        <option>Parallel GPU</option>
                        <option>Batch Process</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-[0.12em] mb-5">Module Parameters</h3>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="text-[11px] font-bold text-on-surface-variant">SMOOTHING ALPHA</label>
                      <span className="text-[11px] font-mono font-bold text-primary px-1.5 py-0.5 bg-primary/10 rounded">{(smoothingAlpha / 100).toFixed(2)}</span>
                    </div>
                    <input 
                      className="w-full h-1.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" 
                      type="range" 
                      value={smoothingAlpha}
                      onChange={(e) => setSmoothingAlpha(parseInt(e.target.value))} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-on-surface-variant">AUTO-THRESHOLD</label>
                    <div 
                      className={`w-11 h-6 ${autoThreshold ? 'bg-primary' : 'bg-outline-variant'} rounded-full relative cursor-pointer shadow-inner transition-colors`}
                      onClick={() => setAutoThreshold(!autoThreshold)}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${autoThreshold ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant mb-3">KERNEL SIZE</label>
                    <div className="grid grid-cols-3 gap-2">
                       {['3x3', '5x5', '7x7'].map(size => (
                         <button 
                           key={size}
                           onClick={() => setKernelSize(size)}
                           className={`py-2 rounded-lg text-xs font-semibold transition-all ${kernelSize === size ? 'border-2 border-primary bg-primary text-white shadow-sm' : 'border border-outline-variant hover:border-primary hover:bg-primary/5'}`}
                         >
                           {size}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-[0.12em] mb-5">Metadata</h3>
                <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant space-y-3">
                  {metadata.map(item => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <span className="text-on-surface-variant font-medium">{item.label}</span>
                      <span className="text-on-surface font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-white border-t border-outline-variant">
              <button className="w-full py-3.5 bg-primary text-white rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">save</span>
                Save Module Configuration
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
