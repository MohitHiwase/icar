'use client';

import { useState } from 'react';
import { ConsoleLog } from '../types';

interface ConsolePanelProps {
  logs: ConsoleLog[];
  isExecuting: boolean;
  onClearLogs: () => void;
}

export default function ConsolePanel({ logs, isExecuting, onClearLogs }: ConsolePanelProps) {
  const [activeTab, setActiveTab] = useState<'logs' | 'processing' | 'results' | 'errors'>('logs');
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <footer
      className={`bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] flex flex-col z-20 text-[var(--text-main)] transition-all duration-200 shrink-0 ${
        isExpanded ? 'h-52 sm:h-60' : 'h-10'
      }`}
    >
      {/* Console Header Bar */}
      <div className="h-10 px-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-hover)] flex items-center justify-between shrink-0">
        
        {/* Tabs */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setIsExpanded(true);
              setActiveTab('logs');
            }}
            className={`px-3 py-1 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'logs' && isExpanded
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">terminal</span>
            Logs
            <span className="text-[10px] font-mono font-bold bg-[var(--bg-app)] px-1 rounded">
              {logs.length}
            </span>
          </button>

          <button
            onClick={() => {
              setIsExpanded(true);
              setActiveTab('processing');
            }}
            className={`px-3 py-1 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'processing' && isExpanded
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">memory</span>
            Processing
            {isExecuting && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => {
              setIsExpanded(true);
              setActiveTab('results');
            }}
            className={`px-3 py-1 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'results' && isExpanded
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">folder_zip</span>
            Results
          </button>

          <button
            onClick={() => {
              setIsExpanded(true);
              setActiveTab('errors');
            }}
            className={`px-3 py-1 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'errors' && isExpanded
                ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">bug_report</span>
            Errors (0)
          </button>
        </div>

        {/* Console Controls */}
        <div className="flex items-center gap-2">
          {activeTab === 'logs' && isExpanded && (
            <button
              onClick={onClearLogs}
              className="text-[11px] font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] px-2 py-0.5 rounded hover:bg-[var(--bg-app)] transition-colors"
            >
              Clear Logs
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-[var(--text-muted)] hover:text-[var(--text-main)] rounded transition-colors"
            title={isExpanded ? "Collapse Console" : "Expand Console"}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
            </span>
          </button>
        </div>
      </div>

      {/* Tab Content Body */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-3 font-mono text-xs custom-scrollbar bg-[var(--bg-app)]">
          
          {/* Logs Tab */}
          {activeTab === 'logs' && (
            <div className="space-y-1.5">
              {logs.map((log) => {
                let badgeColor = 'text-emerald-600 dark:text-emerald-400';
                if (log.type === 'error') badgeColor = 'text-red-500 font-bold';
                if (log.type === 'warning') badgeColor = 'text-amber-500 font-bold';

                return (
                  <div key={log.id} className="flex items-start gap-2.5 text-[11px] leading-relaxed">
                    <span className="text-[var(--text-faint)] shrink-0 font-bold">[{log.timestamp}]</span>
                    <span className={`shrink-0 ${badgeColor}`}>{log.message}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Processing Telemetry Tab */}
          {activeTab === 'processing' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 text-xs">
              <div className="p-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] space-y-2">
                <span className="text-[10.5px] font-bold text-[var(--text-muted)] uppercase">CPU Cluster Load</span>
                <div className="flex justify-between font-bold">
                  <span>8 Compute Workers</span>
                  <span className="text-emerald-600 dark:text-emerald-400">42% Load</span>
                </div>
                <div className="w-full bg-[var(--border-subtle)] rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-[42%]"></div>
                </div>
              </div>

              <div className="p-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] space-y-2">
                <span className="text-[10.5px] font-bold text-[var(--text-muted)] uppercase">GPU VRAM Engine</span>
                <div className="flex justify-between font-bold">
                  <span>NVIDIA A10G (24GB)</span>
                  <span className="text-teal-600 dark:text-teal-400">78% VRAM</span>
                </div>
                <div className="w-full bg-[var(--border-subtle)] rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full w-[78%]"></div>
                </div>
              </div>

              <div className="p-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] space-y-2">
                <span className="text-[10.5px] font-bold text-[var(--text-muted)] uppercase">Raster Memory I/O</span>
                <div className="flex justify-between font-bold">
                  <span>3.2 GB / 16 GB Allocated</span>
                  <span className="text-purple-600 dark:text-purple-400">Normal</span>
                </div>
                <div className="w-full bg-[var(--border-subtle)] rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full w-[20%]"></div>
                </div>
              </div>
            </div>
          )}

          {/* Results Artifacts Tab */}
          {activeTab === 'results' && (
            <div className="space-y-2 font-sans">
              <div className="p-2.5 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-500 text-[20px]">dataset</span>
                  <div>
                    <p className="font-bold text-[var(--text-main)]">NDVI_Raster_Karnal_2026.tif</p>
                    <p className="text-[10.5px] text-[var(--text-muted)] font-mono">GeoTIFF • 14.2 MB • EPSG:4326</p>
                  </div>
                </div>
                <button className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold hover:bg-emerald-700 transition-all flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">download</span>
                  Download File
                </button>
              </div>

              <div className="p-2.5 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-purple-500 text-[20px]">map</span>
                  <div>
                    <p className="font-bold text-[var(--text-main)]">Classified_Crops_Karnal.geojson</p>
                    <p className="text-[10.5px] text-[var(--text-muted)] font-mono">GeoJSON Vector • 4.8 MB • 1,240 features</p>
                  </div>
                </div>
                <button className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold hover:bg-emerald-700 transition-all flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">download</span>
                  Download File
                </button>
              </div>
            </div>
          )}

          {/* Errors Tab */}
          {activeTab === 'errors' && (
            <div className="p-4 text-center text-xs text-[var(--text-muted)] font-sans">
              <span className="material-symbols-outlined text-2xl text-emerald-500 mb-1">check_circle</span>
              <p className="font-bold text-[var(--text-main)]">No Spatial Pipeline Errors Detected</p>
              <p className="text-[11px] mt-0.5">All node inputs passed schema validation.</p>
            </div>
          )}

        </div>
      )}
    </footer>
  );
}
