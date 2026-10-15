import { useEffect, useState, type FormEvent } from "react";
import BlogEditor from "../../components/admin/BlogEditor";
import { useAuth } from "../../contexts/useAuth";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPosts,
  updateBlogPost,
} from "../../services/blog";
import type { BlogPost, BlogPostInput, BlogStatus } from "../../types/blog";

const emptyForm: BlogPostInput = {
  title: "",
  excerpt: "",
  body: "",
  category: "",
  status: "draft",
  scheduled_for: null,
  published_at: null,
  read_time: 5,
  image: "",
  cover_image: null,
};

const inputClass =
  "w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-400/10";

const labelClass = "mb-2 block text-sm font-medium text-slate-300";

const primaryButton =
  "rounded-xl bg-orange-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-50";

const secondaryButton =
  "rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-orange-400/40 hover:text-orange-300";

function getDisplayStatus(post: BlogPost): BlogStatus {
  if (
    post.status === "scheduled" &&
    post.scheduled_for &&
    new Date(post.scheduled_for).getTime() <= Date.now()
  ) {
    return "published";
  }

  return post.status;
}

function statusLabel(status: BlogStatus) {
  switch (status) {
    case "draft":
      return "پیش‌نویس";
    case "scheduled":
      return "زمان‌بندی‌شده";
    case "published":
      return "منتشرشده";
  }
}

function statusClass(status: BlogStatus) {
  switch (status) {
    case "draft":
      return "border-slate-600 bg-slate-800 text-slate-300";
    case "scheduled":
      return "border-orange-400/30 bg-orange-400/10 text-orange-300";
    case "published":
      return "border-emerald-400/25 bg-emerald-400/10 text-emerald-300";
  }
}

function toLocalDateTime(value: string | null) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export default function AdminBlog() {
  const { token } = useAuth();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogPostInput>({ ...emptyForm });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  async function loadPosts() {
    if (!token) {
      setError("برای مدیریت مقالات باید وارد حساب کاربری شوید.");
      setLoading(false);
      return;
    }

    try {
      setError("");
      setPosts(await getBlogPosts(token));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "دریافت مقالات ناموفق بود.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadPosts();
  }, [token]);

  function updateField<K extends keyof BlogPostInput>(
    key: K,
    value: BlogPostInput[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm({ ...emptyForm });
    setEditingId(null);
    setScheduleDate("");
    setCoverPreview("");
    setError("");
    setSuccess("");
  }

  function startEditing(post: BlogPost) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      body: post.body || "",
      category: post.category,
      status: getDisplayStatus(post),
      scheduled_for: post.scheduled_for,
      published_at: post.published_at,
      read_time: post.read_time,
      image: post.image || "",
      cover_image: null,
    });
    setScheduleDate(toLocalDateTime(post.scheduled_for));
    setCoverPreview(post.cover_image_url || post.image || "");
    setError("");
    setSuccess("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) {
      setError("نشست کاربری معتبر نیست. دوباره وارد شوید.");
      return;
    }

    if (form.status === "scheduled" && !scheduleDate) {
      setError("برای انتشار زمان‌بندی‌شده، تاریخ و ساعت را انتخاب کنید.");
      return;
    }

    const scheduledTime =
      form.status === "scheduled" ? new Date(scheduleDate) : null;

    if (
      scheduledTime &&
      (!Number.isFinite(scheduledTime.getTime()) ||
        scheduledTime.getTime() <= Date.now())
    ) {
      setError("زمان انتشار باید در آینده باشد.");
      return;
    }

    const payload: BlogPostInput = {
      ...form,
      scheduled_for: scheduledTime ? scheduledTime.toISOString() : null,
      published_at:
        form.status === "published" ? new Date().toISOString() : null,
    };

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (editingId !== null) {
        await updateBlogPost(token, editingId, payload);
      } else {
        await createBlogPost(token, payload);
      }

      const message =
        editingId !== null
          ? "مقاله با موفقیت به‌روزرسانی شد."
          : "مقاله با موفقیت ایجاد شد.";

      resetForm();
      setSuccess(message);
      await loadPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "ذخیره مقاله ناموفق بود.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(post: BlogPost) {
    if (!token) return;

    if (!window.confirm(`آیا از حذف مقاله «${post.title}» مطمئن هستید؟`)) {
      return;
    }

    try {
      setError("");
      setSuccess("");
      await deleteBlogPost(token, post.id);
      setPosts((current) => current.filter((item) => item.id !== post.id));

      if (editingId === post.id) {
        resetForm();
      }

      setSuccess("مقاله با موفقیت حذف شد.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "حذف مقاله ناموفق بود.");
    }
  }

  function handleCoverChange(file?: File) {
    if (!file) return;

    if (
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
        file.type,
      )
    ) {
      setError("فرمت تصویر باید JPEG، PNG، WebP یا GIF باشد.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("حجم تصویر نباید بیشتر از ۵ مگابایت باشد.");
      return;
    }

    setError("");
    updateField("cover_image", file);
    setCoverPreview(URL.createObjectURL(file));
  }

  return (
    <div
      dir="rtl"
      className="min-h-full space-y-8 bg-slate-950 p-4 text-slate-100 sm:p-6 lg:p-8"
    >
      <header className="flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-widest text-orange-400">
            CONTENT MANAGEMENT
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            مدیریت مقالات
          </h1>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            مقالات مدیریت‌یار را بنویسید، ویرایش کنید و برای انتشار آماده کنید.
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-400/10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-7 w-7 text-orange-400"
            aria-hidden="true"
          >
            <path
              d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </header>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm leading-7 text-red-300"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="rounded-xl border border-orange-400/20 bg-orange-400/10 px-4 py-3 text-sm leading-7 text-orange-200"
        >
          {success}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl shadow-black/10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-5 py-5 sm:px-7">
          <div>
            <h2 className="text-lg font-bold text-white">
              {editingId !== null ? "ویرایش مقاله" : "نوشتن مقاله جدید"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              مشخصات، محتوای مقاله و زمان انتشار را تنظیم کنید.
            </p>
          </div>

          {editingId !== null && (
            <button
              type="button"
              onClick={resetForm}
              className={secondaryButton}
            >
              لغو ویرایش
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-7">
          <div className="grid gap-5 md:grid-cols-2">
            <label>
              <span className={labelClass}>عنوان مقاله</span>
              <input
                required
                maxLength={250}
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                className={inputClass}
                placeholder="عنوان مقاله را وارد کنید"
              />
            </label>

            <label>
              <span className={labelClass}>دسته‌بندی</span>
              <input
                required
                maxLength={100}
                value={form.category}
                onChange={(event) =>
                  updateField("category", event.target.value)
                }
                className={inputClass}
                placeholder="مدیریت، فناوری، آموزش..."
              />
            </label>
          </div>

          <label className="block">
            <span className={labelClass}>خلاصه مقاله</span>
            <textarea
              required
              rows={3}
              value={form.excerpt}
              onChange={(event) => updateField("excerpt", event.target.value)}
              className={`${inputClass} resize-y`}
              placeholder="خلاصه‌ای کوتاه برای نمایش در فهرست مقالات"
            />
          </label>

          <div>
            <label className={labelClass}>تصویر کاور</label>
            <label className="flex cursor-pointer flex-wrap items-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/70 p-4 transition hover:border-orange-400/50">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-400/10 text-orange-400">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              </span>
              <span>
                <span className="block text-sm font-medium text-slate-200">
                  انتخاب تصویر کاور
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  JPEG، PNG، WebP یا GIF · حداکثر ۵ مگابایت
                </span>
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={(event) => handleCoverChange(event.target.files?.[0])}
              />
            </label>

            {coverPreview && (
              <img
                src={coverPreview}
                alt="پیش‌نمایش کاور مقاله"
                className="mt-4 max-h-64 w-full rounded-xl border border-slate-800 object-cover sm:w-auto"
              />
            )}
          </div>

          <div>
            <span className={labelClass}>محتوای مقاله</span>
            <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
              <BlogEditor
                token={token || ""}
                content={form.body}
                onChange={(html) => updateField("body", html)}
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label>
              <span className={labelClass}>زمان تقریبی مطالعه (دقیقه)</span>
              <input
                type="number"
                min={1}
                max={240}
                required
                value={form.read_time}
                onChange={(event) =>
                  updateField("read_time", Number(event.target.value))
                }
                className={inputClass}
              />
            </label>

            <label>
              <span className={labelClass}>وضعیت انتشار</span>
              <select
                value={form.status}
                onChange={(event) => {
                  const status = event.target.value as BlogStatus;
                  updateField("status", status);

                  if (status !== "scheduled") setScheduleDate("");
                }}
                className={inputClass}
              >
                <option value="draft">پیش‌نویس</option>
                <option value="published">انتشار فوری</option>
                <option value="scheduled">زمان‌بندی انتشار</option>
              </select>
            </label>
          </div>

          {form.status === "scheduled" && (
            <label className="block max-w-md">
              <span className={labelClass}>تاریخ و ساعت انتشار</span>
              <input
                type="datetime-local"
                required
                value={scheduleDate}
                onChange={(event) => setScheduleDate(event.target.value)}
                className={inputClass}
              />
              <span className="mt-2 block text-xs leading-6 text-slate-500">
                زمان بر اساس منطقه زمانی مرورگر شما ثبت می‌شود.
              </span>
            </label>
          )}

          <div className="flex flex-wrap gap-3 border-t border-slate-800 pt-6">
            <button type="submit" disabled={saving} className={primaryButton}>
              {saving
                ? "در حال ذخیره..."
                : editingId !== null
                  ? "ذخیره تغییرات"
                  : "ذخیره مقاله"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className={secondaryButton}
            >
              پاک کردن فرم
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">مقالات ثبت‌شده</h2>
            <p className="mt-1 text-sm text-slate-400">
              مدیریت پیش‌نویس‌ها و مقالات منتشرشده
            </p>
          </div>
          <span className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300">
            تعداد مقالات: {posts.length}
          </span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-10 text-center text-slate-400">
            در حال دریافت مقالات...
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center">
            <p className="font-medium text-slate-200">
              هنوز مقاله‌ای ثبت نشده است.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              از فرم بالا برای ایجاد اولین مقاله استفاده کنید.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {posts.map((post) => {
              const status = getDisplayStatus(post);

              return (
                <article
                  key={post.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-orange-400/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="mb-2 text-xs font-medium text-orange-400">
                        {post.category}
                      </p>
                      <h3 className="break-words text-base font-bold leading-7 text-white">
                        {post.title}
                      </h3>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 text-xs ${statusClass(status)}`}
                    >
                      {statusLabel(status)}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span>{post.read_time} دقیقه مطالعه</span>
                    {status === "scheduled" && post.scheduled_for && (
                      <span className="text-orange-300">
                        انتشار:{" "}
                        {new Date(post.scheduled_for).toLocaleString("fa-IR")}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex gap-3 border-t border-slate-800 pt-4">
                    <button
                      type="button"
                      onClick={() => startEditing(post)}
                      className={secondaryButton}
                    >
                      ویرایش
                    </button>

                    <button
                      type="button"
                      onClick={() => void handleDelete(post)}
                      className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-400/10"
                    >
                      حذف مقاله
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
