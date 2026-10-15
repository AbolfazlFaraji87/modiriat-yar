import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../services/projects";
import type { Project } from "../types/project";
import ProjectCard from "../components/ProjectCard";

const stats = [
  { value: "+۱۲۰", label: "پروژه موفق" },
  { value: "۹۸٪", label: "رضایت مشتریان" },
  { value: "+۸", label: "سال تجربه" },
  { value: "۲۴/۷", label: "پشتیبانی" },
];

const services = [
  {
    icon: "◈",
    title: "توسعه نرم‌افزار",
    description:
      "طراحی و توسعه وب‌سایت‌ها و نرم‌افزارهای اختصاصی متناسب با نیاز کسب‌وکار شما.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: "↗",
    title: "مشاوره کسب‌وکار",
    description:
      "شناسایی فرصت‌های رشد، بهینه‌سازی فرایندها و تدوین راهکارهای عملی.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: "⌘",
    title: "مدیریت پروژه",
    description:
      "برنامه‌ریزی، سازمان‌دهی و پیگیری پروژه‌ها برای دستیابی به نتایج بهتر.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: "◎",
    title: "تحلیل و گزارش‌گیری",
    description:
      "تبدیل داده‌های کسب‌وکار به اطلاعات کاربردی برای تصمیم‌گیری هوشمندانه‌تر.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState(false);

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((error: unknown) => {
        console.error("Could not load projects:", error);
        setProjectsError(true);
      })
      .finally(() => {
        setLoadingProjects(false);
      });
  }, []);
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm text-orange-300">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              همراه هوشمند رشد کسب‌وکار شما
            </span>

            <h1 className="mt-8 text-4xl font-black leading-[1.5] sm:text-5xl lg:text-6xl">
              کسب‌وکار خود را
              <span className="block text-orange-400">
                هوشمندانه مدیریت کنید
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-9 text-slate-300 sm:text-lg">
              با راهکارهای مدرن مدیریت‌یار، فرایندهای کسب‌وکار خود را ساده‌تر
              کنید، پروژه‌ها را بهتر مدیریت کنید و با اطمینان رشد کنید.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="rounded-xl bg-orange-500 px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-orange-600"
              >
                آشنایی با خدمات ←
              </Link>

              <Link
                to="/projects"
                className="rounded-xl border border-white/20 px-7 py-4 font-bold text-white transition hover:border-orange-400 hover:text-orange-300"
              >
                مشاهده پروژه‌ها
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm text-slate-400">
              <div className="flex -space-x-2 space-x-reverse">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 bg-orange-400 font-bold text-slate-950">
                  م
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 bg-sky-400 font-bold text-slate-950">
                  ع
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 bg-emerald-400 font-bold text-slate-950">
                  ر
                </span>
              </div>
              <p>در مسیر رشد، همراه کسب‌وکارهای پیشرو</p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-3xl bg-orange-500/10 blur-2xl" />

            <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-sm sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm text-slate-400">نمای کلی کسب‌وکار</p>
                  <h2 className="mt-2 text-xl font-bold">داشبورد مدیریتی</h2>
                </div>
                <span className="rounded-xl bg-orange-400/15 p-3 text-2xl">
                  ✦
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/[0.06] p-5">
                  <p className="text-sm text-slate-400">پروژه‌های فعال</p>
                  <p className="mt-3 text-3xl font-black">۱۲</p>
                  <p className="mt-2 text-xs text-emerald-400">در حال پیشرفت</p>
                </div>
                <div className="rounded-2xl bg-white/[0.06] p-5">
                  <p className="text-sm text-slate-400">عملکرد تیم</p>
                  <p className="mt-3 text-3xl font-black">۹۲٪</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[92%] rounded-full bg-orange-400" />
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white/[0.06] p-5">
                <div className="flex items-center justify-between">
                  <p className="font-bold">پیشرفت پروژه‌ها</p>
                  <span className="text-xs text-slate-400">گزارش نمونه</span>
                </div>

                <div className="mt-6 flex h-32 items-end gap-3">
                  {[40, 65, 48, 78, 58, 90, 72, 100, 82, 94, 68, 88].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-md bg-orange-400/80 transition hover:bg-orange-300"
                        style={{ height: `${height}%` }}
                      />
                    ),
                  )}
                </div>
                <div className="mt-3 flex justify-between text-xs text-slate-500">
                  <span>ابتدای دوره</span>
                  <span>پایان دوره</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                  ✓
                </span>
                <div>
                  <p className="text-sm font-bold">همه‌چیز تحت کنترل است</p>
                  <p className="mt-1 text-xs text-slate-400">
                    مدیریت ساده‌تر، تصمیم‌گیری بهتر
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-white/10 bg-slate-900 px-5 py-4 shadow-xl sm:block">
              <p className="text-xs text-slate-400">رشد هوشمندانه</p>
              <p className="mt-1 text-xl font-black text-orange-400">+۳۵٪</p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black text-slate-900 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-bold text-orange-600">خدمات ما</span>
              <h2 className="mt-4 text-3xl font-black leading-relaxed text-slate-900 sm:text-4xl">
                ابزارهای مناسب برای
                <span className="text-orange-500"> رشد پایدار</span>
              </h2>
            </div>

            <p className="max-w-lg leading-8 text-slate-500">
              از ایده‌پردازی تا اجرای راهکارهای دیجیتال، در کنار شما هستیم تا
              مسیر رشد کسب‌وکارتان روشن‌تر و ساده‌تر شود.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold ${service.color}`}
                >
                  {service.icon}
                </div>

                <h3 className="mt-6 text-lg font-extrabold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-500">
                  {service.description}
                </p>

                <Link
                  to="/services"
                  className="mt-6 inline-flex items-center gap-2 font-bold text-orange-600 transition group-hover:gap-3"
                >
                  اطلاعات بیشتر <span>←</span>
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 transition hover:border-orange-500 hover:text-orange-600"
            >
              مشاهده همه خدمات
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="font-bold text-orange-600">نمونه کارها</span>
              <h2 className="mt-4 text-3xl font-black leading-relaxed text-slate-900 sm:text-4xl">
                پروژه‌هایی که
                <span className="text-orange-500"> نتیجه می‌سازند</span>
              </h2>
            </div>

            <p className="max-w-lg leading-8 text-slate-500">
              نگاهی به پروژه‌های ثبت‌شده ما و راهکارهایی که برای نیازهای مختلف
              طراحی شده‌اند.
            </p>
          </div>

          {loadingProjects ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-2xl border border-slate-200"
                >
                  <div className="aspect-[16/10] bg-slate-200" />
                  <div className="space-y-3 p-6">
                    <div className="h-5 w-2/3 rounded bg-slate-200" />
                    <div className="h-3 rounded bg-slate-100" />
                    <div className="h-3 w-4/5 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : projectsError ? (
            <div className="mt-12 rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
              <p className="font-bold text-slate-800">
                دریافت پروژه‌ها با مشکل مواجه شد.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                لطفاً مطمئن شوید سرور بک‌اند در حال اجراست.
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <p className="font-bold text-slate-800">
                هنوز پروژه‌ای ثبت نشده است.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                می‌توانید اولین پروژه را از طریق پنل مدیریت Django اضافه کنید.
              </p>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 font-bold text-white transition hover:bg-orange-500"
            >
              مشاهده همه پروژه‌ها <span>←</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
