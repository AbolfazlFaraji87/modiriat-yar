import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import type { BlogPost } from "../types/blog";
import { getPublicBlogPosts } from "../services/blog";
import BlogCard from "../components/BlogCard";

function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPublicBlogPosts();
        setPosts(data);
      } catch {
        setError("دریافت مقالات با مشکل مواجه شد.");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const categories = useMemo(
    () => ["همه", ...new Set(posts.map((post) => post.category))],
    [posts],
  );

  const featuredPost = posts[0];

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "همه" || post.category === selectedCategory;

      const matchesSearch =
        post.title.toLocaleLowerCase().includes(query) ||
        post.excerpt.toLocaleLowerCase().includes(query) ||
        post.category.toLocaleLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [posts, search, selectedCategory]);

  const visiblePosts = filteredPosts;

  const isFiltering = search.trim() !== "" || selectedCategory !== "همه";

  function resetFilters() {
    setSearch("");
    setSelectedCategory("همه");
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-950 px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold text-orange-400">مجله مدیریت‌یار</p>

          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-relaxed md:text-6xl">
            ایده‌هایی برای
            <span className="text-orange-400"> رشد بهتر </span>
            کسب‌وکار
          </h1>

          <p className="mt-6 max-w-2xl leading-9 text-slate-300 md:text-lg">
            مطالبی درباره مدیریت، فناوری، طراحی وب و روش‌های بهتر کار کردن؛ برای
            زمانی که می‌خواهید آگاهانه‌تر تصمیم بگیرید.
          </p>
        </div>
      </section>

      {/* Featured article */}
      {!loading && !error && featuredPost && !isFiltering && (
        <section className="px-6 pt-16 md:pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-7 w-1 rounded-full bg-orange-500" />
              <h2 className="text-2xl font-black text-slate-900">
                پیشنهاد سردبیر
              </h2>
            </div>

            <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white md:grid-cols-2">
              <div className="min-h-64 overflow-hidden bg-slate-100 md:min-h-96">
                {featuredPost.cover_image_url || featuredPost.image ? (
                  <img
                    src={featuredPost.cover_image_url || featuredPost.image}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-64 items-center justify-center text-slate-400">
                    تصویری موجود نیست
                  </div>
                )}
              </div>

              <Link
                to={`/blog/${featuredPost.id}`}
                className="flex flex-col justify-center p-7 transition hover:bg-orange-50/30 md:p-12"
              >
                <div className="flex flex-col justify-center p-7 md:p-12">
                  <span className="w-fit rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700">
                    {featuredPost.category}
                  </span>

                  <h2 className="mt-5 text-2xl font-black leading-relaxed text-slate-900 md:text-3xl">
                    {featuredPost.title}
                  </h2>

                  <p className="mt-4 leading-9 text-slate-600">
                    {featuredPost.excerpt}
                  </p>

                  <div className="mt-6 text-sm text-slate-500">
                    {new Date(
                      featuredPost.published_at || featuredPost.created_at,
                    ).toLocaleDateString("fa-IR")}
                    {" · "}
                    {featuredPost.read_time} دقیقه مطالعه
                  </div>
                </div>
              </Link>
            </article>
          </div>
        </section>
      )}

      {/* Search and category filters */}
      <section className="px-6 pb-8 pt-16 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-bold text-orange-600">مطالب و مقالات</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">
                آخرین نوشته‌ها
              </h2>
            </div>

            <p className="text-sm text-slate-500">
              {loading
                ? "در حال دریافت مقالات..."
                : error
                  ? "دریافت مقالات ناموفق بود"
                  : `${filteredPosts.length} مقاله پیدا شد`}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1fr)_240px]">
            <div className="relative">
              <label htmlFor="blog-search" className="sr-only">
                جست‌وجو در مقالات
              </label>

              <input
                id="blog-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="عنوان، موضوع یا کلمه‌ای را جست‌وجو کنید..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div>
              <label htmlFor="blog-category" className="sr-only">
                دسته‌بندی مقاله
              </label>

              <select
                id="blog-category"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div role="status" className="py-16 text-center text-slate-500">
              در حال دریافت مقالات...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
              <p role="alert" className="font-bold text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600"
              >
                تلاش مجدد
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
              <h3 className="text-xl font-extrabold text-slate-900">
                هنوز مقاله‌ای منتشر نشده است
              </h3>
              <p className="mt-3 leading-8 text-slate-500">
                پس از افزودن مقالات در پنل مدیریت، آن‌ها در این بخش نمایش داده
                می‌شوند.
              </p>
            </div>
          ) : visiblePosts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
              <h3 className="text-xl font-extrabold text-slate-900">
                مقاله‌ای پیدا نشد
              </h3>

              <p className="mt-3 leading-8 text-slate-500">
                عبارت جست‌وجو یا دسته‌بندی انتخاب‌شده را تغییر دهید.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600"
              >
                پاک کردن فیلترها
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Blog;
