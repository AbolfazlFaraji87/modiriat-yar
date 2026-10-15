import { useEffect, useMemo, useState } from "react";
import { getProjects } from "../services/projects";
import type { Project } from "../types/project";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch((error: unknown) => {
        console.error("Could not load projects:", error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => [
      "همه",
      ...new Set(
        projects.map((project) => project.category.trim()).filter(Boolean),
      ),
    ],
    [projects],
  );

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "همه" ||
        project.category.trim() === selectedCategory;

      const matchesSearch =
        !query ||
        project.title.toLocaleLowerCase().includes(query) ||
        project.description.toLocaleLowerCase().includes(query) ||
        project.technologies.toLocaleLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [projects, search, selectedCategory]);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 px-6 py-20 text-white sm:py-28">
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <span className="font-bold text-orange-400">نمونه کارهای ما</span>

          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-relaxed sm:text-5xl">
            ایده‌ها را به
            <span className="text-orange-400"> نتیجه تبدیل می‌کنیم</span>
          </h1>

          <p className="mt-5 max-w-2xl leading-9 text-slate-300">
            مجموعه‌ای از پروژه‌ها و راهکارهای اجراشده را ببینید؛ هر پروژه فرصتی
            برای حل یک مسئله و ایجاد ارزش تازه است.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-2xl font-black text-orange-400">
                {projects.length.toLocaleString("fa-IR")}
              </p>
              <p className="mt-1 text-sm text-slate-400">پروژه ثبت‌شده</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-2xl font-black text-white">
                {categories.length - 1 > 0
                  ? (categories.length - 1).toLocaleString("fa-IR")
                  : "۰"}
              </p>
              <p className="mt-1 text-sm text-slate-400">دسته‌بندی</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <label
              htmlFor="project-search"
              className="mb-3 block text-sm font-bold text-slate-800"
            >
              جست‌وجو در پروژه‌ها
            </label>

            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="relative flex-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 4 4" strokeLinecap="round" />
                </svg>

                <input
                  id="project-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="عنوان، توضیحات یا فناوری..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-12 pl-4 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="project-category"
                  className="text-sm font-bold text-slate-800"
                >
                  دسته‌بندی
                </label>

                <select
                  id="project-category"
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  className="min-w-48 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-orange-400"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <p className="text-sm text-slate-500" aria-live="polite">
                نمایش
                <span className="font-bold text-slate-900">
                  {filteredProjects.length.toLocaleString("fa-IR")}
                </span>
                از {projects.length.toLocaleString("fa-IR")} پروژه
              </p>

              {(search || selectedCategory !== "همه") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("همه");
                  }}
                  className="text-sm font-bold text-orange-600 transition hover:text-orange-700"
                >
                  پاک کردن فیلترها
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
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
          ) : error ? (
            <div className="mt-10 rounded-2xl border border-red-200 bg-white p-10 text-center">
              <h2 className="text-xl font-bold text-slate-900">
                دریافت پروژه‌ها ناموفق بود
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                اتصال به سرور را بررسی کنید و صفحه را دوباره بارگذاری کنید.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-orange-500"
              >
                تلاش دوباره
              </button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="text-4xl text-slate-300">⌕</div>
              <h2 className="mt-4 text-xl font-bold text-slate-900">
                پروژه‌ای پیدا نشد
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                عبارت جست‌وجو یا دسته‌بندی انتخاب‌شده را تغییر دهید.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("همه");
                }}
                className="mt-5 font-bold text-orange-600 hover:text-orange-700"
              >
                نمایش همه پروژه‌ها
              </button>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Projects;
