import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X, FolderKanban } from "lucide-react";
import { useAuth } from "../../contexts/useAuth";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  type ProjectInput,
} from "../../services/projects";
import type { Project } from "../../types/project";

const emptyForm: ProjectInput = {
  title: "",
  description: "",
  category: "",
  technologies: "",
  client: "",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400";

const labelClass = "mb-2 block text-sm text-slate-300";

export default function AdminProjects() {
  const { token } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<ProjectInput>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedImage]);

  async function loadProjects() {
    setLoading(true);
    setError("");

    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "بارگذاری پروژه‌ها ناموفق بود.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  function openCreateForm() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setSelectedImage(null);
    setExistingImage("");
    setError("");
    setSuccess("");
    setFormOpen(true);
  }

  function openEditForm(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      category: project.category,
      technologies: project.technologies,
      client: project.client,
    });
    setSelectedImage(null);
    setExistingImage(project.image || "");
    setError("");
    setSuccess("");
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setSelectedImage(null);
    setExistingImage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) {
      setError("نشست کاربری شما معتبر نیست. دوباره وارد شوید.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const data: ProjectInput = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category.trim(),
        technologies: form.technologies.trim(),
        client: form.client.trim(),
        image: selectedImage,
      };

      if (editingId !== null) {
        await updateProject(token, editingId, data);
        setSuccess("پروژه با موفقیت ویرایش شد.");
      } else {
        await createProject(token, data);
        setSuccess("پروژه جدید با موفقیت ایجاد شد.");
      }

      closeForm();
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "ذخیره پروژه ناموفق بود.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(project: Project) {
    const confirmed = window.confirm(
      `آیا از حذف پروژه «${project.title}» مطمئن هستید؟`,
    );

    if (!confirmed) return;

    if (!token) {
      setError("نشست کاربری شما معتبر نیست. دوباره وارد شوید.");
      return;
    }

    setDeletingId(project.id);
    setError("");
    setSuccess("");

    try {
      await deleteProject(token, project.id);

      setProjects((current) =>
        current.filter((item) => item.id !== project.id),
      );

      setSuccess("پروژه حذف شد.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "حذف پروژه ناموفق بود.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div dir="rtl" className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">مدیریت پروژه‌ها</h1>
          <p className="mt-2 text-sm text-slate-400">
            پروژه‌های نمایش داده‌شده در نمونه‌کارهای مدیریت‌یار را مدیریت کنید.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
        >
          <Plus size={18} />
          افزودن پروژه
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-300"
        >
          {success}
        </div>
      )}

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-white/10 bg-slate-900 p-5 sm:p-7"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold">
              {editingId !== null ? "ویرایش پروژه" : "ایجاد پروژه جدید"}
            </h2>

            <button
              type="button"
              onClick={closeForm}
              aria-label="بستن فرم"
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label>
              <span className={labelClass}>عنوان پروژه *</span>
              <input
                required
                maxLength={200}
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                className={inputClass}
                placeholder="مثلاً طراحی وب‌سایت شرکتی"
              />
            </label>

            <label>
              <span className={labelClass}>دسته‌بندی *</span>
              <input
                required
                maxLength={100}
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
                className={inputClass}
                placeholder="مثلاً طراحی وب"
              />
            </label>

            <label>
              <span className={labelClass}>نام مشتری</span>
              <input
                maxLength={200}
                value={form.client}
                onChange={(event) =>
                  setForm({ ...form, client: event.target.value })
                }
                className={inputClass}
                placeholder="نام مشتری یا شرکت"
              />
            </label>

            <label>
              <span className={labelClass}>تصویر پروژه</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setSelectedImage(file);
                }}
                className={`${inputClass} file:ml-4 file:rounded-lg file:border-0 file:bg-orange-500 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white`}
              />
              <p className="mt-2 text-xs text-slate-500">
                {editingId !== null
                  ? "برای جایگزینی تصویر فعلی، تصویر جدیدی انتخاب کنید."
                  : "یک تصویر از کامپیوتر خود انتخاب کنید."}
              </p>
            </label>

            {(previewUrl || existingImage) && (
              <div className="md:col-span-2">
                <span className={labelClass}>پیش‌نمایش تصویر</span>
                <img
                  src={previewUrl || existingImage}
                  alt="پیش‌نمایش تصویر پروژه"
                  className="h-48 w-full max-w-md rounded-xl border border-white/10 object-cover"
                />
                {selectedImage && (
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="mt-2 text-sm text-red-400 hover:text-red-300"
                  >
                    لغو انتخاب تصویر جدید
                  </button>
                )}
              </div>
            )}

            <label className="md:col-span-2">
              <span className={labelClass}>توضیحات *</span>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                className={inputClass}
                placeholder="توضیحی درباره پروژه بنویسید..."
              />
            </label>

            <label className="md:col-span-2">
              <span className={labelClass}>فناوری‌ها</span>
              <input
                maxLength={300}
                value={form.technologies}
                onChange={(event) =>
                  setForm({ ...form, technologies: event.target.value })
                }
                className={inputClass}
                placeholder="React, TypeScript, Django"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "در حال ذخیره..."
                : editingId !== null
                  ? "ذخیره تغییرات"
                  : "ایجاد پروژه"}
            </button>

            <button
              type="button"
              onClick={closeForm}
              disabled={saving}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 hover:bg-white/5"
            >
              انصراف
            </button>
          </div>
        </form>
      )}

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <FolderKanban className="text-orange-400" size={22} />
            <h2 className="font-semibold">فهرست پروژه‌ها</h2>
          </div>

          <span className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-300">
            {projects.length} پروژه
          </span>
        </div>

        {loading ? (
          <p className="p-8 text-center text-sm text-slate-400">
            در حال بارگذاری پروژه‌ها...
          </p>
        ) : projects.length === 0 ? (
          <div className="p-10 text-center">
            <FolderKanban size={36} className="mx-auto mb-3 text-slate-600" />
            <p className="font-medium">هنوز پروژه‌ای ثبت نشده است.</p>
            <p className="mt-2 text-sm text-slate-400">
              با استفاده از دکمه افزودن پروژه، اولین پروژه را ثبت کنید.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-right text-sm">
              <thead className="bg-white/[0.03] text-slate-400">
                <tr>
                  <th className="px-5 py-4 font-medium">پروژه</th>
                  <th className="px-5 py-4 font-medium">دسته‌بندی</th>
                  <th className="px-5 py-4 font-medium">مشتری</th>
                  <th className="px-5 py-4 text-left font-medium">عملیات</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt=""
                            className="h-11 w-14 rounded-lg border border-white/10 object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-14 items-center justify-center rounded-lg bg-white/5">
                            <FolderKanban
                              size={19}
                              className="text-slate-500"
                            />
                          </div>
                        )}

                        <div className="max-w-xs">
                          <p className="truncate font-medium text-white">
                            {project.title}
                          </p>
                          <p className="mt-1 truncate text-xs text-slate-500">
                            {project.technologies || "بدون فناوری ثبت‌شده"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {project.category}
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {project.client || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(project)}
                          aria-label={`ویرایش ${project.title}`}
                          className="rounded-lg border border-white/10 p-2 text-slate-300 transition hover:border-orange-400/30 hover:text-orange-400"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => void handleDelete(project)}
                          disabled={deletingId === project.id}
                          aria-label={`حذف ${project.title}`}
                          className="rounded-lg border border-white/10 p-2 text-slate-300 transition hover:border-red-400/30 hover:text-red-400 disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
