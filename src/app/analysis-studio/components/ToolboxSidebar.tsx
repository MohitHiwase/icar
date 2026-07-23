'use client';

import { useState } from 'react';
import { TOOL_CATEGORIES } from '../mockData';
import { ToolItem } from '../types';

interface ToolboxSidebarProps {
  onAddToolToCanvas: (tool: ToolItem) => void;
}

export default function ToolboxSidebar({ onAddToolToCanvas }: ToolboxSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (catId: string) => {
    setCollapsedCategories((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  const filteredCategories = TOOL_CATEGORIES.map((category) => {
    const matchingItems = category.items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...category, items: matchingItems };
  }).filter((category) => category.items.length > 0);

  return (
    <aside className="w-72 sm:w-80 bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] flex flex-col z-10 text-[var(--text-main)] shrink-0 transition-colors duration-200">
      
      {/* Sidebar Header & Search */}
      <div className="p-3.5 border-b border-[var(--border-subtle)] space-y-2 bg-[var(--bg-surface-hover)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-emerald-500">handyman</span>
            Analysis Toolbox
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
            22 Tools
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[18px] text-[var(--text-muted)] pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search raster, AI & spatial tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-lg text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-main)]"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Tool Categories List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
        {filteredCategories.length === 0 ? (
          <div className="p-6 text-center text-xs text-[var(--text-muted)]">
            <span className="material-symbols-outlined text-3xl mb-1 text-[var(--text-faint)]">search_off</span>
            <p>No analysis tools match "{searchQuery}"</p>
          </div>
        ) : (
          filteredCategories.map((category) => {
            const isCollapsed = collapsedCategories[category.id];
            return (
              <div key={category.id} className="space-y-1.5">
                
                {/* Category Accordion Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-surface-hover)] transition-colors text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[16px] text-emerald-500">{category.icon}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] group-hover:text-[var(--text-main)] truncate">
                      {category.title}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">({category.items.length})</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-[var(--text-muted)]">
                    {isCollapsed ? 'expand_more' : 'expand_less'}
                  </span>
                </button>

                {/* Items Container */}
                {!isCollapsed && (
                  <div className="space-y-2 pl-1">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onAddToolToCanvas(item)}
                        className="p-2.5 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-xl flex items-start gap-2.5 cursor-pointer hover:bg-[var(--bg-surface-hover)] hover:border-emerald-500/50 hover:shadow-xs transition-all group relative"
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-[var(--text-main)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                              {item.name}
                            </span>
                            <span className="material-symbols-outlined text-[14px] text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              add_circle
                            </span>
                          </div>
                          <p className="text-[10.5px] text-[var(--text-muted)] line-clamp-2 mt-0.5 leading-snug">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Sidebar Footer Hint */}
      <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-hover)] text-[10.5px] text-[var(--text-muted)] flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px] text-emerald-500">info</span>
        <span>Click any tool to append node onto the workflow canvas</span>
      </div>
    </aside>
  );
}
