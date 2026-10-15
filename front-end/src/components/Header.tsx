import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const links = [
  { to: "/", label: "خانه", end: true },
  { to: "/about", label: "درباره ما" },
  { to: "/services", label: "خدمات" },
  { to: "/projects", label: "پروژه‌ها" },
  { to: "/blog", label: "وبلاگ" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-sm font-semibold transition-colors duration-200 ${
      isActive ? "text-orange-600" : "text-slate-600 hover:text-orange-600"
    }`;

  async function handleLogout() {
    setMenuOpen(false);

    try {
      await logout();
    } finally {
      navigate("/");
    }
  }

  const accountLinks = (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      {isAuthenticated ? (
        <>
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-center text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-600"
          >
            {user && (
              <Link to={user.is_staff ? "/admin" : "/user"} className="...">
                {user.is_staff ? "پنل مدیریت" : "حساب کاربری"}
              </Link>
            )}
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
          >
            خروج
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="rounded-xl px-4 py-2.5 text-center text-sm font-bold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
          >
            ورود
          </Link>

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-slate-800"
          >
            ثبت‌نام
          </Link>
        </>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="group flex shrink-0 items-center gap-3"
          aria-label="مدیریت‌یار، صفحه اصلی"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-xl font-black text-orange-400 shadow-lg shadow-slate-900/10 transition duration-300 group-hover:-rotate-3 group-hover:bg-orange-500 group-hover:text-white">
            م
          </span>

          <span className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-950">
              مدیریت<span className="text-orange-500">‌یار</span>
            </span>
            <span className="mt-0.5 text-[10px] font-medium tracking-wide text-slate-400">
              راهکارهای هوشمند کسب‌وکار
            </span>
          </span>
        </Link>

        <nav
          aria-label="ناوبری اصلی"
          className="hidden items-center gap-7 lg:flex"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={linkClass}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-[10px] h-0.5 origin-center rounded-full bg-orange-500 transition-transform duration-200 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {accountLinks}

          <Link
            to="/contact"
            className="hidden items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/25 xl:inline-flex"
          >
            <span>شروع همکاری</span>
            <span aria-hidden="true">←</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-800 transition hover:border-orange-300 hover:bg-orange-50 lg:hidden"
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${
          menuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <nav className="border-t border-slate-100 bg-white px-5 pb-5 pt-3 sm:px-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-orange-600"
                  }`
                }
              >
                {link.label}
                <span aria-hidden="true">←</span>
              </NavLink>
            ))}

            <div className="mt-4 border-t border-slate-100 pt-4">
              {accountLinks}
            </div>

            <Link
              to="/contact"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              شروع همکاری <span aria-hidden="true">←</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
