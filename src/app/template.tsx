"use client";

/**
 * App Template
 *
 * Next.js template.tsx runs for every route change.
 * Auth pages (login/register) render without the dashboard shell.
 * All other pages render inside the protected DashboardShell.
 */

import { usePathname } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";

const AUTH_ROUTES = ["/login", "/register"];

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return <DashboardShell>{children}</DashboardShell>;
}
