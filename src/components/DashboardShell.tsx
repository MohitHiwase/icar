"use client";

/**
 * Dashboard Shell
 *
 * Wraps all authenticated dashboard pages with the sidebar, top nav, and route guard.
 * Extracted from layout.tsx so that auth pages (login/register) can have a clean layout.
 */

import Sidebar from "@/components/Sidebar";
import TopNavBar from "@/components/TopNavBar";
import RouteGuard from "@/components/RouteGuard";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard>
      <div className="flex h-screen overflow-hidden bg-[var(--bg-app)] text-[var(--text-main)] font-inter transition-colors duration-200">
        {/* Fixed Left Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative ml-[240px]">
          <TopNavBar />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto relative w-full h-full">
            {children}
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
