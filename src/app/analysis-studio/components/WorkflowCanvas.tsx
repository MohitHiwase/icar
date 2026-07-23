'use client';

import { useState } from 'react';
import { WorkflowNode, WorkflowConnection } from '../types';

interface WorkflowCanvasProps {
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onDeleteNode: (nodeId: string) => void;
  onClearCanvas: () => void;
  isExecuting: boolean;
}

export default function WorkflowCanvas({
  nodes,
  connections,
  selectedNodeId,
  onSelectNode,
  onDeleteNode,
  onClearCanvas,
  isExecuting
}: WorkflowCanvasProps) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeTool, setActiveTool] = useState<'select' | 'pan' | 'connect'>('select');

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 60));
  const handleResetZoom = () => setZoomLevel(100);

  return (
    <section className="flex-1 bg-[var(--bg-app)] relative overflow-hidden flex flex-col select-none border-r border-[var(--border-subtle)]">
      
      {/* Floating Canvas Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center bg-[var(--bg-surface)] shadow-lg border border-[var(--border-subtle)] rounded-xl px-2 py-1.5 z-20 text-[var(--text-main)] transition-colors">
        <button
          onClick={() => setActiveTool('select')}
          className={`p-1.5 rounded-lg transition-colors ${
            activeTool === 'select' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]'
          }`}
          title="Select Node Pointer"
        >
          <span className="material-symbols-outlined text-[20px]">near_me</span>
        </button>

        <button
          onClick={() => setActiveTool('connect')}
          className={`p-1.5 rounded-lg transition-colors ${
            activeTool === 'connect' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]'
          }`}
          title="Connect Workflow Nodes"
        >
          <span className="material-symbols-outlined text-[20px]">polyline</span>
        </button>

        <button
          onClick={() => setActiveTool('pan')}
          className={`p-1.5 rounded-lg transition-colors ${
            activeTool === 'pan' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]'
          }`}
          title="Pan Workspace Canvas"
        >
          <span className="material-symbols-outlined text-[20px]">pan_tool</span>
        </button>

        <div className="w-px h-5 bg-[var(--border-subtle)] mx-1.5"></div>

        <button
          onClick={handleZoomIn}
          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] rounded-lg transition-colors"
          title="Zoom In"
        >
          <span className="material-symbols-outlined text-[20px]">zoom_in</span>
        </button>

        <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] px-1">
          {zoomLevel}%
        </span>

        <button
          onClick={handleZoomOut}
          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] rounded-lg transition-colors"
          title="Zoom Out"
        >
          <span className="material-symbols-outlined text-[20px]">zoom_out</span>
        </button>

        <button
          onClick={handleResetZoom}
          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] rounded-lg transition-colors"
          title="Fit Canvas"
        >
          <span className="material-symbols-outlined text-[20px]">aspect_ratio</span>
        </button>

        <div className="w-px h-5 bg-[var(--border-subtle)] mx-1.5"></div>

        <button
          onClick={onClearCanvas}
          className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
          title="Clear Canvas"
        >
          <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
        </button>
      </div>

      {/* Main Canvas Viewport */}
      <div className="flex-1 w-full h-full relative overflow-auto custom-scrollbar p-12 bg-dot-pattern">
        
        {/* Transform Container for Zoom */}
        <div
          className="relative min-w-[1400px] min-h-[700px] transition-transform duration-150 origin-top-left"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="executingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>

            {connections.map((conn) => {
              const fromNode = nodes.find((n) => n.id === conn.fromNodeId);
              const toNode = nodes.find((n) => n.id === conn.toNodeId);
              if (!fromNode || !toNode) return null;

              // Node dimensions (approx 240px wide, 140px tall)
              const x1 = fromNode.position.x + 240;
              const y1 = fromNode.position.y + 70;
              const x2 = toNode.position.x;
              const y2 = toNode.position.y + 70;

              // Control points for smooth cubic bezier curves
              const dx = Math.abs(x2 - x1) / 2;
              const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

              return (
                <g key={conn.id}>
                  {/* Outer glow line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isExecuting ? '#10B981' : '#10B981'}
                    strokeWidth={isExecuting ? "3" : "2"}
                    strokeDasharray={isExecuting ? "6 6" : "none"}
                    className={isExecuting ? "animate-pulse" : "opacity-80"}
                  />
                  {/* Connection Endpoint Dots */}
                  <circle cx={x1} cy={y1} r="4" fill="#10B981" />
                  <circle cx={x2} cy={y2} r="4" fill="#10B981" />
                </g>
              );
            })}
          </svg>

          {/* Workflow Node Cards */}
          {nodes.map((node, index) => {
            const isSelected = selectedNodeId === node.id;
            const isInput = node.type === 'input';
            const isOutput = node.type === 'output';

            let categoryColor = 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10';
            if (node.category === 'vector') categoryColor = 'border-teal-500/30 text-teal-600 dark:text-teal-400 bg-teal-500/10';
            if (node.category === 'ai') categoryColor = 'border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10';
            if (node.category === 'utility') categoryColor = 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10';
            if (node.category === 'input') categoryColor = 'border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10';

            return (
              <div
                key={node.id}
                onClick={() => onSelectNode(node.id)}
                style={{ top: `${node.position.y}px`, left: `${node.position.x}px` }}
                className={`absolute w-[250px] bg-[var(--bg-surface)] rounded-xl border p-4 shadow-md transition-all cursor-pointer z-10 ${
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg scale-[1.02]'
                    : 'border-[var(--border-subtle)] hover:border-[var(--border-medium)]'
                }`}
              >
                {/* Node Top Header */}
                <div className="flex items-center justify-between gap-2 mb-2.5 border-b border-[var(--border-subtle)] pb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center border text-[18px] shrink-0 ${categoryColor}`}>
                      <span className="material-symbols-outlined">{node.icon}</span>
                    </span>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase font-bold text-[var(--text-muted)] block truncate">
                        Step {index + 1} • {node.type}
                      </span>
                      <h4 className="text-xs font-bold text-[var(--text-main)] truncate">
                        {node.title}
                      </h4>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNode(node.id);
                    }}
                    className="text-[var(--text-muted)] hover:text-red-500 p-1 rounded transition-colors"
                    title="Delete Node"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>

                {/* Status Indicator Bar */}
                <div className="flex items-center justify-between text-[10.5px] mb-2 font-mono">
                  <span className="text-[var(--text-muted)]">Status:</span>
                  {node.status === 'completed' && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span> Executed
                    </span>
                  )}
                  {node.status === 'running' && (
                    <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Running...
                    </span>
                  )}
                  {node.status === 'idle' && (
                    <span className="text-[var(--text-muted)] font-medium">Ready</span>
                  )}
                  {node.status === 'error' && (
                    <span className="text-red-500 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">error</span> Error
                    </span>
                  )}
                </div>

                {/* Input / Output Dataset Pills */}
                <div className="space-y-1.5 text-[11px]">
                  {node.inputDataset && (
                    <div className="p-1.5 rounded bg-[var(--bg-app)] border border-[var(--border-subtle)] text-[10.5px] truncate font-mono text-[var(--text-muted)]">
                      <span className="font-bold text-[var(--text-main)]">IN:</span> {node.inputDataset}
                    </div>
                  )}
                  {node.outputDataset && (
                    <div className="p-1.5 rounded bg-[var(--bg-app)] border border-[var(--border-subtle)] text-[10.5px] truncate font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>OUT:</span> {node.outputDataset}
                    </div>
                  )}
                </div>

                {/* Left/Right Connectors */}
                {!isInput && (
                  <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-[var(--bg-surface)] absolute -left-1.5 top-1/2 -translate-y-1/2 shadow-xs"></div>
                )}
                {!isOutput && (
                  <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-[var(--bg-surface)] absolute -right-1.5 top-1/2 -translate-y-1/2 shadow-xs"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Canvas Corner Minimap */}
      <div className="absolute bottom-4 right-4 w-44 h-28 bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] rounded-xl overflow-hidden shadow-lg p-2 flex flex-col justify-between z-10 pointer-events-none">
        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
          <span>MINIMAP</span>
          <span>{nodes.length} Nodes</span>
        </div>
        <div className="relative flex-1 bg-[var(--bg-app)] rounded border border-[var(--border-subtle)] overflow-hidden my-1">
          {nodes.map((node) => (
            <div
              key={node.id}
              style={{
                top: `${(node.position.y / 700) * 100}%`,
                left: `${(node.position.x / 1400) * 100}%`
              }}
              className={`absolute w-3 h-2 rounded-xs ${
                node.id === selectedNodeId ? 'bg-emerald-500' : 'bg-[var(--text-muted)]/50'
              }`}
            ></div>
          ))}
        </div>
        <span className="text-[9px] font-mono text-[var(--text-faint)] truncate">
          Pipeline Extent: OK
        </span>
      </div>
    </section>
  );
}
