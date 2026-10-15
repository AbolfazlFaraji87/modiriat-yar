import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Clock3, CalendarDays, BookOpen } from "lucide-react";

import type { BlogPost } from "../types/blog";
import { getPublicBlogPost } from "../services/blog";
import { sanitizeHtml } from "../utils/sanitizeHtml";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPost() {
      setLoading(true);
      setError(false);
      setPost(null);

      if (!id || !/^\d+$/.test(id)) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const data = await getPublicBlogPost(Number(id));

        if (!cancelled) {
          setPost(data);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPost();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const coverImage = post?.cover_image_url || post?.image;

  return (
    <main dir="rtl" className="min-h-screen bg-white">
      <section className="bg-slate-950 px-6 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-orange-400"
          >
            <ArrowRight size={18} />
            بازگشت به مجله
          </Link>

          {loading ? (
            <div role="status" className="py-16 text-slate-300">
              در حال دریافت مقاله...
            </div>
          ) : error || !post ? (
            <div className="py-16">
              <h1 className="text-3xl font-black">مقاله پیدا نشد</h1>
              <p className="mt-4 leading-8 text-slate-300">
                ممکن است مقاله وجود نداشته باشد یا هنوز برای عموم منتشر نشده
                باشد.
              </p>
              <Link
                to="/blog"
                className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600"
              >
                مشاهده مقالات
              </Link>
            </div>
          ) : (
            <>
              <span className="mt-10 inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1.5 text-sm font-bold text-orange-300">
                {post.category}
              </span>

              <h1 className="mt-5 text-3xl font-black leading-relaxed sm:text-4xl md:text-5xl">
                {post.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-9 text-slate-300 sm:text-lg">
                {post.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={17} />
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("fa-IR")
                    : "مقاله مدیریت‌یار"}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Clock3 size={17} />
                  {post.read_time} دقیقه مطالعه
                </span>
              </div>
            </>
          )}
        </div>
      </section>

      {!loading && !error && post && (
        <article className="px-5 py-10 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-4xl">
            {coverImage && (
              <img
                src={coverImage}
                alt={post.title}
                className="mb-10 max-h-[520px] w-full rounded-3xl border border-slate-200 object-cover"
              />
            )}

            {post.body.trim() ? (
              <div
                className="blog-article-content"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(post.body),
                }}
              />
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                <BookOpen className="mx-auto mb-3" size={30} />
                متن کامل این مقاله هنوز اضافه نشده است.
              </div>
            )}

            <div className="mt-12 border-t border-slate-200 pt-7">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600"
              >
                <ArrowRight size={18} />
                بازگشت به همه مقالات
              </Link>
            </div>
          </div>
        </article>
      )}
    </main>
  );
}
