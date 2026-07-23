'use client';

import { MOCK_PROCESSING_JOBS } from '../mockData';

interface ProcessingQueueModalProps {
  onClose: () => void;
}

export default function ProcessingQueueModal({ onClose }: ProcessingQueueModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl w-full max-w-2xl text-[var(--text-main)] overflow-hidden flex flex-col max-h-[85vh] transition-colors duration-200">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-hover)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-emerald-500">format_list_bulleted</span>
            <h3 className="text-sm font-bold text-[var(--text-main)]">
              Processing Jobs Queue & Telemetry
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-1 rounded hover:bg-[var(--bg-app)] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Body: Jobs List */}
        <div className="p-4 overflow-y-auto space-y-3 custom-scrollbar flex-1">
          {MOCK_PROCESSING_JOBS.map((job) => {
            let statusBadge = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
            if (job.status === 'running') statusBadge = 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
            if (job.status === 'queued') statusBadge = 'bg-[var(--bg-app)] text-[var(--text-muted)] border-[var(--border-subtle)]';
            if (job.status === 'failed') statusBadge = 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';

            return (
              <div
                key={job.id}
                className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-subtle)] space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[var(--text-muted)]">{job.id}</span>
                      <h4 className="text-xs font-bold text-[var(--text-main)]">{job.name}</h4>
                    </div>
                    <p className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
                      Output: {job.outputName} • {job.nodesCount} Nodes
                    </p>
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border shrink-0 ${statusBadge}`}>
                    {job.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10.5px] font-mono text-[var(--text-muted)]">
                    <span>Started: {job.startTime}</span>
                    <span>Progress: {job.progress}%</span>
                  </div>
                  <div className="w-full bg-[var(--border-subtle)] rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        job.status === 'completed'
                          ? 'bg-emerald-500'
                          : job.status === 'running'
                          ? 'bg-amber-500'
                          : 'bg-slate-400'
                      }`}
                      style={{ width: `${job.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                  <span>Duration: {job.duration}</span>
                  {job.status === 'running' && (
                    <span className="text-amber-600 dark:text-amber-400 font-semibold animate-pulse">
                      Processing Worker 4 Active
                    </span>
                  )}
                  {job.status === 'completed' && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      ✓ Ready for Map Visualizer
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-hover)] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:bg-[var(--bg-app)] text-[var(--text-main)] rounded-lg text-xs font-bold transition-all"
          >
            Close Queue
          </button>
        </div>
      </div>
    </div>
  );
}
