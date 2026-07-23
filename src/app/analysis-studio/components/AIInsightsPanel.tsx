'use client';

import { MOCK_AI_INSIGHTS } from '../mockData';

interface AIInsightsPanelProps {
  onClose: () => void;
}

export default function AIInsightsPanel({ onClose }: AIInsightsPanelProps) {
  return (
    <div className="w-80 lg:w-96 bg-[var(--bg-surface)] border-l border-[var(--border-subtle)] flex flex-col z-20 shadow-xl text-[var(--text-main)] transition-colors duration-200 shrink-0">
      
      {/* Panel Header */}
      <div className="p-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-hover)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          </div>
          <div>
            <h3 className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1.5">
              AI Spatial Insights
              <span className="text-[10px] font-mono font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 px-1.5 py-0.2 rounded border border-purple-500/20">
                Live
              </span>
            </h3>
            <p className="text-[10.5px] text-[var(--text-muted)]">Automated deep learning telemetry</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-1 rounded hover:bg-[var(--bg-app)] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      {/* Insights Cards List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {MOCK_AI_INSIGHTS.map((insight) => {
          let cardBg = 'bg-[var(--bg-app)] border-[var(--border-subtle)]';
          let iconColor = 'text-emerald-500 bg-emerald-500/10';

          if (insight.type === 'action') {
            cardBg = 'bg-amber-500/5 border-amber-500/30';
            iconColor = 'text-amber-600 dark:text-amber-400 bg-amber-500/10';
          } else if (insight.type === 'warning') {
            cardBg = 'bg-purple-500/5 border-purple-500/30';
            iconColor = 'text-purple-600 dark:text-purple-400 bg-purple-500/10';
          } else if (insight.type === 'info') {
            cardBg = 'bg-teal-500/5 border-teal-500/30';
            iconColor = 'text-teal-600 dark:text-teal-400 bg-teal-500/10';
          }

          return (
            <div
              key={insight.id}
              className={`p-3.5 rounded-xl border ${cardBg} space-y-2 transition-all hover:shadow-xs`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[18px] shrink-0 ${iconColor}`}>
                    <span className="material-symbols-outlined">{insight.icon}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[var(--text-main)] leading-snug">
                    {insight.title}
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0">
                  {insight.timestamp}
                </span>
              </div>

              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed pl-9">
                {insight.description}
              </p>

              {insight.metric && (
                <div className="pl-9 pt-1">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-emerald-600 dark:text-emerald-400">
                    Metric: {insight.metric}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Disclaimer */}
      <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-hover)] text-[10.5px] text-[var(--text-muted)] text-center">
        Powered by GeoVision Geospatial AI Engine (v3.2)
      </div>
    </div>
  );
}
