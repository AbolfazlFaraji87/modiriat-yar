import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  BriefcaseBusiness,
  Newspaper,
  Mail,
  ArrowLeft,
} from "lucide-react";

import { useAuth } from "../../contexts/useAuth";
import { getProjects } from "../../services/projects";
import { getServices } from "../../services/services";
import { getBlogPosts } from "../../services/blog";
import { getMessages } from "../../services/messages";

const sections = [
  {
    title: "پروژه‌ها",
    description: "مدیریت نمونه‌کارها و پروژه‌های شرکت",
    to: "/admin/projects",
    icon: FolderKanban,
    color: "text-orange-400",
  },
  {
    title: "خدمات",
    description: "مدیریت خدمات ارائه‌شده",
    to: "/admin/services",
    icon: BriefcaseBusiness,
    color: "text-sky-400",
  },
  {
    title: "وبلاگ",
    description: "مدیریت مقالات و محتوای آموزشی",
    to: "/admin/blog",
    icon: Newspaper,
    color: "text-violet-400",
  },
  {
    title: "پیام‌های تماس",
    description: "بررسی پیام‌های دریافتی کاربران",
    to: "/admin/messages",
    icon: Mail,
    color: "text-emerald-400",
  },
];

export default function AdminDashboard() {
  const { token } = useAuth();

  const [counts, setCounts] = useState({
    projects: 0,
    services: 0,
    blog: 0,
    messages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    async function loadCounts() {
      setLoading(true);
      setError("");

      try {
        const [projects, services, blog, messages] = await Promise.all([
          getProjects(),
          getServices(),
          getBlogPosts(token),
          getMessages(token),
        ]);

        if (cancelled) return;

        setCounts({
          projects: projects.length,
          services: services.length,
          blog: blog.length,
          messages: messages.length,
        });
      } catch {
        if (!cancelled) {
          setError("دریافت آمار با خطا مواجه شد.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCounts();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const stats = [
    { title: "پروژه‌ها", count: counts.projects, icon: FolderKanban },
    { title: "خدمات", count: counts.services, icon: BriefcaseBusiness },
    { title: "مقالات وبلاگ", count: counts.blog, icon: Newspaper },
    { title: "پیام‌های دریافتی", count: counts.messages, icon: Mail },
  ];

  return (
    <div dir="rtl" className="mx-auto max-w-7xl space-y-8">
      <section>
        <p className="mb-2 text-sm font-medium text-orange-400">مرکز مدیریت</p>
        <h1 className="text-2xl font-bold sm:text-3xl">نمای کلی داشبورد</h1>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          از این بخش می‌توانید محتوای سایت و اطلاعات مدیریتی را کنترل کنید.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, count, icon: Icon }) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-slate-900 p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm text-slate-400">{title}</span>
              <Icon size={21} className="text-orange-400" />
            </div>

            <p className="text-3xl font-bold text-white">
              {loading ? "..." : error ? "—" : count.toLocaleString("fa-IR")}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              {loading
                ? "در حال دریافت اطلاعات..."
                : error
                  ? "دریافت اطلاعات ناموفق بود"
                  : "تعداد ثبت‌شده در سامانه"}
            </p>
          </div>
        ))}
      </section>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold">مدیریت بخش‌های سایت</h2>
          <p className="mt-1 text-sm text-slate-400">
            برای مدیریت هر بخش، آن را انتخاب کنید.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {sections.map(({ title, description, to, icon: Icon, color }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-orange-400/40 hover:bg-slate-900/80"
            >
              <div className="rounded-xl bg-white/5 p-3">
                <Icon size={25} className={color} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {description}
                </p>
              </div>

              <ArrowLeft
                size={19}
                className="shrink-0 text-slate-500 transition group-hover:-translate-x-1 group-hover:text-orange-400"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
