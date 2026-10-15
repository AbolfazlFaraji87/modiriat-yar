import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";

import UserSidebar from "../components/dashboard/UserSidebar";
import { useAuth } from "../contexts/useAuth";

export default function UserLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
      navigate("/", { replace: true });
    } catch {
      // AuthContext clears the local session in its finally block.
      navigate("/", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <div className="hidden w-64 shrink-0 lg:block">
          <div className="fixed inset-y-0 w-64">
            <UserSidebar />
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="بستن منو"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <div className="relative h-full w-[min(82%,320px)] animate-in slide-in-from-right duration-200">
              <button
                type="button"
                aria-label="بستن"
                onClick={() => setMobileMenuOpen(false)}
                className="absolute left-3 top-4 z-10 rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>

              <UserSidebar onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 backdrop-blur-xl sm:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="باز کردن منو"
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-xl border border-white/10 p-2 text-slate-300 hover:border-orange-400/30 hover:text-orange-300 lg:hidden"
              >
                <Menu size={21} />
              </button>

              <div>
                <p className="text-sm font-bold sm:text-base">فضای کاربری</p>
                <p className="mt-1 hidden text-xs text-slate-500 sm:block">
                  مدیریت حساب و پروژه‌های شما
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-left sm:block">
                <p className="max-w-40 truncate text-sm font-semibold">
                  {user?.username}
                </p>
                <p className="mt-1 text-xs text-slate-500">حساب کاربری</p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-400/20 bg-orange-500/10 font-bold text-orange-300">
                {user?.username?.charAt(0) ?? "ک"}
              </div>

              <button
                type="button"
                onClick={() => void handleLogout()}
                disabled={isLoggingOut}
                title="خروج از حساب"
                className="rounded-xl border border-white/10 p-2.5 text-slate-400 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300 disabled:opacity-50"
              >
                <LogOut size={18} />
              </button>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
