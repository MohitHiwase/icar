"use client";

/**
 * Route Guard
 *
 * Wraps protected content. If the user is not authenticated
 * and the session check is complete, redirects to /login.
 * Shows a loading spinner while checking session.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-on-surface-variant text-sm font-medium">Loading GeoVision...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
