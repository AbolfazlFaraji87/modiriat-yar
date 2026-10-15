import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  ArrowRight,
} from "lucide-react";

const links = [
  {
    to: "/user",
    label: "داشبورد",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/user/settings",
    label: "تنظیمات حساب",
    icon: Settings,
  },
];

interface UserSidebarProps {
  onNavigate?: () => void;
}

export default function UserSidebar({ onNavigate }: UserSidebarProps) {
  return (
    <aside
      dir="rtl"
      className="flex h-full w-full flex-col border-l border-white/10 bg-slate-950/90 p-5 text-white"
    >
      <NavLink
        to="/"
        onClick={onNavigate}
        className="mb-10 flex items-center gap-3"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 text-xl font-black text-slate-950 shadow-lg shadow-orange-500/20">
          م
        </span>

        <span>
          <span className="block text-lg font-black">مدیریت‌یار</span>
          <span className="text-xs text-slate-500">پنل کاربری</span>
        </span>
      </NavLink>

      <p className="mb-3 px-3 text-xs font-semibold text-slate-500">
        فضای کاربری
      </p>

      <nav className="space-y-2">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200",
                isActive
                  ? "border border-orange-400/20 bg-orange-500/10 text-orange-300"
                  : "text-slate-400 hover:bg-white/5 hover:text-white",
              ].join(" ")
            }
          >
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-5">
        <NavLink
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowRight size={18} />
          بازگشت به وب‌سایت
        </NavLink>
      </div>
    </aside>
  );
}
