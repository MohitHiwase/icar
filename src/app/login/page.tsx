"use client";

/**
 * Login Page
 *
 * Modern, clean login form using the GeoVision design system.
 * Redirects authenticated users to the dashboard.
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import AuthBrandingPanel from "@/components/AuthBrandingPanel";
import GeoVisionLogo from "@/components/GeoVisionLogo";

export default function LoginPage() {
  const { login, user, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setLocalError(err?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const displayError = localError || error;

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Don't render form if already authenticated (will redirect)
  if (user) return null;

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Left Panel — Unified Reusable Branding */}
      <AuthBrandingPanel />

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[var(--bg-app)] text-[var(--text-main)] transition-colors duration-200">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <GeoVisionLogo variant="light" size="sm" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight mb-2">Welcome back</h2>
          <p className="text-[var(--text-muted)] text-sm mb-8">
            Sign in to your GeoVision enterprise workspace
          </p>

          {displayError && (
            <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-start gap-2.5">
              <span className="material-symbols-outlined text-rose-500 text-[20px] mt-0.5">error</span>
              <p className="text-rose-500 text-sm">{displayError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[20px]">mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-surface)] text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[20px]">lock</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-12 py-2.5 border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-surface)] text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xs text-sm"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-[var(--text-muted)] mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-emerald-500 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
