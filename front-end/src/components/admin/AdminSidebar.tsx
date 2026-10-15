import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  BriefcaseBusiness,
  Newspaper,
  Mail,
  ArrowRight,
} from "lucide-react";

const links = [
  { to: "/admin", label: "نمای کلی", icon: LayoutDashboard, end: true },
  { to: "/admin/projects", label: "پروژه‌ها", icon: FolderKanban },
  { to: "/admin/services", label: "خدمات", icon: BriefcaseBusiness },
  { to: "/admin/blog", label: "وبلاگ", icon: Newspaper },
  { to: "/admin/messages", label: "پیام‌ها", icon: Mail },
];

export default function AdminSidebar() {
  return (
    <aside
      dir="rtl"
      className="flex h-full w-full flex-col border-l border-white/10 bg-slate-900 p-4"
    >
      <div className="mb-8 flex items-center gap-3 px-2 py-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-xl font-bold text-white">
          م
        </div>

        <div>
          <h2 className="font-bold text-white">مدیریت‌یار</h2>
          <p className="text-xs text-slate-400">پنل مدیریت</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-950/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <NavLink
        to="/"
        className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
      >
        <ArrowRight size={19} />
        بازگشت به سایت
      </NavLink>
    </aside>
  );
}
