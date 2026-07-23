'use client';

import { WorkflowTemplate } from '../types';
import { WORKFLOW_TEMPLATES } from '../mockData';

interface TopToolbarProps {
  workflowName: string;
  setWorkflowName: (name: string) => void;
  status: 'ready' | 'running' | 'failed';
  activeTemplateId: string;
  onSelectTemplate: (template: WorkflowTemplate) => void;
  onRunAnalysis: () => void;
  onStopAnalysis: () => void;
  onNewWorkflow: () => void;
  onExportWorkflow: () => void;
  onImportWorkflow: () => void;
  onSaveWorkflow: () => void;
  showAiInsights: boolean;
  setShowAiInsights: (show: boolean) => void;
  onOpenQueue: () => void;
}

export default function TopToolbar({
  workflowName,
  setWorkflowName,
  status,
  activeTemplateId,
  onSelectTemplate,
  onRunAnalysis,
  onStopAnalysis,
  onNewWorkflow,
  onExportWorkflow,
  onImportWorkflow,
  onSaveWorkflow,
  showAiInsights,
  setShowAiInsights,
  onOpenQueue
}: TopToolbarProps) {
  return (
    <header className="h-16 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] px-4 flex items-center justify-between text-[var(--text-main)] z-20 shrink-0">
      
      {/* Left: Workflow Title & Preset Template Selector */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
          <span className="material-symbols-outlined text-[22px]">science</span>
        </div>
        <div className="min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="bg-transparent font-bold text-sm text-[var(--text-main)] focus:outline-none focus:bg-[var(--bg-app)] px-1.5 py-0.5 rounded border border-transparent hover:border-[var(--border-subtle)] focus:border-emerald-500 truncate max-w-[260px]"
            />
            {/* Status Badge */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--bg-app)] border border-[var(--border-subtle)] text-[11px] font-medium shrink-0">
              {status === 'ready' && (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">🟢 Ready</span>
                </>
              )}
              {status === 'running' && (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">🟡 Running</span>
                </>
              )}
              {status === 'failed' && (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="text-red-600 dark:text-red-400 font-semibold">🔴 Failed</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] mt-0.5">
            <span>Template:</span>
            <select
              value={activeTemplateId}
              onChange={(e) => {
                const tmpl = WORKFLOW_TEMPLATES.find(t => t.id === e.target.value);
                if (tmpl) onSelectTemplate(tmpl);
              }}
              className="bg-transparent text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 focus:outline-none cursor-pointer"
            >
              {WORKFLOW_TEMPLATES.map((tmpl) => (
                <option key={tmpl.id} value={tmpl.id} className="bg-[var(--bg-surface)] text-[var(--text-main)]">
                  {tmpl.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 overflow-x-auto py-1">
        {/* Quick Action Tools */}
        <div className="flex items-center bg-[var(--bg-app)] p-1 rounded-lg border border-[var(--border-subtle)] gap-1">
          <button
            onClick={onNewWorkflow}
            title="New Canvas"
            className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition-all flex items-center gap-1 text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">add_box</span>
            <span className="hidden sm:inline">New</span>
          </button>
          
          <button
            onClick={onSaveWorkflow}
            title="Save Pipeline"
            className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition-all flex items-center gap-1 text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            onClick={onExportWorkflow}
            title="Export JSON Pipeline"
            className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition-all flex items-center gap-1 text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span className="hidden md:inline">Export</span>
          </button>

          <button
            onClick={onImportWorkflow}
            title="Import Pipeline"
            className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition-all flex items-center gap-1 text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">file_upload</span>
            <span className="hidden md:inline">Import</span>
          </button>
        </div>

        {/* Execution Actions */}
        {status === 'running' ? (
          <button
            onClick={onStopAnalysis}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 rounded-lg text-xs font-bold transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">stop</span>
            Stop Execution
          </button>
        ) : (
          <button
            onClick={onRunAnalysis}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            Run Analysis
          </button>
        )}

        <div className="w-px h-6 bg-[var(--border-subtle)] mx-1 hidden sm:block"></div>

        {/* Processing Queue Trigger Button */}
        <button
          onClick={onOpenQueue}
          title="Open Processing Queue"
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[var(--bg-app)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] rounded-lg text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
          <span className="hidden md:inline">Queue</span>
        </button>

        {/* AI Insights Toggle Button */}
        <button
          onClick={() => setShowAiInsights(!showAiInsights)}
          title="Toggle AI Spatial Insights"
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            showAiInsights
              ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
              : 'bg-[var(--bg-app)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span className="hidden lg:inline">AI Insights</span>
        </button>

      </div>
    </header>
  );
}
