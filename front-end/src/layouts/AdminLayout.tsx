import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import { useAuth } from "../contexts/useAuth";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    try {
      await logout();
    } finally {
      navigate("/login", { replace: true });
    }
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-950 text-white"
    >
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-0 h-screen">
            <AdminSidebar />
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <button
              type="button"
              aria-label="بستن منو"
              className="absolute inset-0 bg-black/70"
              onClick={() => setSidebarOpen(false)}
            />

            <div className="relative z-10 h-full w-72 max-w-[85vw]">
              <button
                type="button"
                aria-label="بستن"
                onClick={() => setSidebarOpen(false)}
                className="absolute left-3 top-3 z-20 rounded-lg p-2 text-slate-300 hover:bg-white/10"
              >
                <X size={20} />
              </button>
              <AdminSidebar />
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/90 px-4 backdrop-blur-xl sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="باز کردن منو"
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-slate-300 hover:bg-white/10 lg:hidden"
              >
                <Menu size={21} />
              </button>

              <div>
                <p className="font-semibold">پنل مدیریت</p>
                <p className="hidden text-xs text-slate-500 sm:block">
                  مدیریت محتوای مدیریت‌یار
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-slate-300 sm:block">
                {user?.username}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">خروج</span>
              </button>
            </div>
          </header>

          <main className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
