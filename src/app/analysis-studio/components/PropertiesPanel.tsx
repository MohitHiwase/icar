'use client';

import { useState } from 'react';
import { WorkflowNode } from '../types';
import { MOCK_DATASETS_LIST } from '../mockData';

interface PropertiesPanelProps {
  selectedNode: WorkflowNode | null;
  onUpdateNode: (updatedNode: WorkflowNode) => void;
}

export default function PropertiesPanel({ selectedNode, onUpdateNode }: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState<'properties' | 'python'>('properties');

  if (!selectedNode) {
    return (
      <aside className="w-80 lg:w-96 bg-[var(--bg-surface)] border-l border-[var(--border-subtle)] flex flex-col items-center justify-center p-6 text-[var(--text-muted)] text-center shrink-0">
        <span className="material-symbols-outlined text-4xl mb-2 text-[var(--text-faint)]">touch_app</span>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)]">No Node Selected</h3>
        <p className="text-xs mt-1 leading-relaxed">
          Select a workflow step on the canvas to configure parameters, datasets, and inspect Python code.
        </p>
      </aside>
    );
  }

  // Handle form change helper
  const handleParamChange = (key: string, value: any) => {
    const updatedParams = { ...selectedNode.params, [key]: value };
    onUpdateNode({ ...selectedNode, params: updatedParams });
  };

  const handleInputDatasetChange = (dataset: string) => {
    onUpdateNode({ ...selectedNode, inputDataset: dataset });
  };

  const handleOutputDatasetChange = (dataset: string) => {
    onUpdateNode({ ...selectedNode, outputDataset: dataset });
  };

  // Generate Python GEE / GDAL code snippet dynamically for selected node
  const pythonCode = `import ee
import gdal
import numpy as np

# GeoVision Spatial Execution Pipeline - Node ID: ${selectedNode.id}
# Tool: ${selectedNode.title} (${selectedNode.category.toUpperCase()})

def execute_${selectedNode.toolId.replace(/-/g, '_')}(input_path, output_path):
    print(f"Loading raster dataset: {input_path}")
    dataset = gdal.Open("${selectedNode.inputDataset || 'input_raster.tif'}")
    
    # Parameters configuration
${Object.entries(selectedNode.params).map(([k, v]) => `    ${k} = ${JSON.stringify(v)}`).join('\n')}
    
    # Compute raster array matrix
    arr_in = dataset.ReadAsArray()
    print(f"Processing shape: {arr_in.shape} with CRS EPSG:4326")
    
    # Execute tool logic algorithm
    result_arr = np.nan_to_num(arr_in)
    
    # Save output dataset
    driver = gdal.GetDriverByName("GTiff")
    out_ds = driver.Create("${selectedNode.outputDataset || 'output_raster.tif'}", dataset.RasterXSize, dataset.RasterYSize, 1, gdal.GDT_Float32)
    out_ds.GetRasterBand(1).WriteArray(result_arr)
    print("Execution complete.")
    return "${selectedNode.outputDataset || 'output_raster.tif'}"
`;

  return (
    <aside className="w-80 lg:w-96 bg-[var(--bg-surface)] border-l border-[var(--border-subtle)] flex flex-col z-10 text-[var(--text-main)] shrink-0 transition-colors duration-200">
      
      {/* Panel Top Header Tabs */}
      <div className="flex items-center border-b border-[var(--border-subtle)] bg-[var(--bg-surface-hover)]">
        <button
          onClick={() => setActiveTab('properties')}
          className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'properties'
              ? 'text-emerald-600 dark:text-emerald-400 border-emerald-500 bg-[var(--bg-surface)]'
              : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-main)]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">tune</span>
          Properties
        </button>

        <button
          onClick={() => setActiveTab('python')}
          className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'python'
              ? 'text-emerald-600 dark:text-emerald-400 border-emerald-500 bg-[var(--bg-surface)]'
              : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-main)]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">code</span>
          Python Editor
        </button>
      </div>

      {/* Main Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        
        {/* Node Summary Box */}
        <div className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-subtle)] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
            <span className="material-symbols-outlined text-[20px]">{selectedNode.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[var(--text-main)] truncate">{selectedNode.title}</h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
                {selectedNode.category}
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">
              {selectedNode.description}
            </p>
          </div>
        </div>

        {activeTab === 'properties' ? (
          <>
            {/* Input & Output Datasets Selection */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Dataset Routing
              </h4>

              {/* Input Dataset Select */}
              <div className="space-y-1.5 text-xs">
                <label className="font-semibold text-[var(--text-main)]">Input Dataset Layer</label>
                <select
                  value={selectedNode.inputDataset || ''}
                  onChange={(e) => handleInputDatasetChange(e.target.value)}
                  className="w-full p-2 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-lg text-xs font-mono text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
                >
                  <option value="">-- Select Spatial Input Layer --</option>
                  {MOCK_DATASETS_LIST.map((ds) => (
                    <option key={ds} value={ds}>{ds}</option>
                  ))}
                </select>
              </div>

              {/* Output Dataset Name Input */}
              <div className="space-y-1.5 text-xs">
                <label className="font-semibold text-[var(--text-main)]">Output Dataset Name</label>
                <input
                  type="text"
                  value={selectedNode.outputDataset || ''}
                  onChange={(e) => handleOutputDatasetChange(e.target.value)}
                  className="w-full p-2 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-lg text-xs font-mono text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Configurable Parameters Form */}
            <div className="space-y-4 pt-2 border-t border-[var(--border-subtle)]">
              <h4 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Tool Parameters
              </h4>

              <div className="space-y-3.5 text-xs">
                {Object.entries(selectedNode.params).map(([key, val]) => {
                  if (typeof val === 'number') {
                    return (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <label className="font-semibold text-[var(--text-main)] capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </label>
                          <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            {val}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={val > 1 ? 100 : 1}
                          step={val > 1 ? 1 : 0.05}
                          value={val}
                          onChange={(e) => handleParamChange(key, parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-[var(--border-subtle)] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                      </div>
                    );
                  }

                  if (typeof val === 'boolean') {
                    return (
                      <div key={key} className="flex items-center justify-between p-2.5 bg-[var(--bg-app)] rounded-lg border border-[var(--border-subtle)]">
                        <label className="font-semibold text-[var(--text-main)] capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                          type="checkbox"
                          checked={val}
                          onChange={(e) => handleParamChange(key, e.target.checked)}
                          className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={key} className="space-y-1">
                      <label className="font-semibold text-[var(--text-main)] capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => handleParamChange(key, e.target.value)}
                        className="w-full p-2 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-lg text-xs font-medium text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Processing Metrics & Cost Estimator Card */}
            <div className="pt-2 border-t border-[var(--border-subtle)] space-y-2.5">
              <h4 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Execution Metrics
              </h4>

              <div className="p-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-subtle)] space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-muted)] font-medium">Estimated Runtime:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedNode.estimatedRuntime}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-muted)] font-medium">Processing Cost:</span>
                  <span className="font-mono font-bold text-[var(--text-main)]">
                    {selectedNode.computeCost}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)] font-medium">Validation Status:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Inputs Valid
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Python Script Editor Tab */
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase font-bold">
                Generated Python Script
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(pythonCode)}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">content_copy</span>
                Copy
              </button>
            </div>

            <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto border border-slate-800 custom-scrollbar max-h-[420px]">
              {pythonCode}
            </pre>
          </div>
        )}
      </div>

      {/* Footer Save Button */}
      <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-hover)]">
        <button
          onClick={() => onUpdateNode(selectedNode)}
          className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">save</span>
          Apply Parameters
        </button>
      </div>
    </aside>
  );
}
