import { useEffect, useState, type FormEvent } from "react";
import { BriefcaseBusiness, Plus, Pencil, Trash2, X } from "lucide-react";
import { useAuth } from "../../contexts/useAuth";
import {
  getServices,
  createService,
  updateService,
  deleteService,
  type ServiceInput,
} from "../../services/services";
import type { Service } from "../../types/service";

const emptyForm: ServiceInput = {
  title: "",
  description: "",
  icon: "",
  features: [],
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400";

const labelClass = "mb-2 block text-sm text-slate-300";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "عملیات ناموفق بود.";
}

export default function AdminServices() {
  const { token } = useAuth();

  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<ServiceInput>(emptyForm);
  const [featuresText, setFeaturesText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadServices() {
    setLoading(true);
    setError("");

    try {
      setServices(await getServices());
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadServices();
  }, []);

  function openCreateForm() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setFeaturesText("");
    setError("");
    setSuccess("");
    setFormOpen(true);
  }

  function openEditForm(service: Service) {
    setEditingId(service.id);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features,
    });
    setFeaturesText(service.features.join("\n"));
    setError("");
    setSuccess("");
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setFeaturesText("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) {
      setError("لطفاً دوباره وارد حساب مدیریت شوید.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const data: ServiceInput = {
      title: form.title.trim(),
      description: form.description.trim(),
      icon: form.icon.trim(),
      features: featuresText
        .split("\n")
        .map((feature) => feature.trim())
        .filter(Boolean),
    };

    try {
      if (editingId !== null) {
        await updateService(token, editingId, data);
        setSuccess("خدمات با موفقیت ویرایش شد.");
      } else {
        await createService(token, data);
        setSuccess("خدمات جدید با موفقیت ثبت شد.");
      }

      closeForm();
      await loadServices();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(service: Service) {
    if (!window.confirm(`خدمات «${service.title}» حذف شود؟`)) return;

    if (!token) {
      setError("لطفاً دوباره وارد حساب مدیریت شوید.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      await deleteService(token, service.id);
      setServices((current) =>
        current.filter((item) => item.id !== service.id),
      );
      setSuccess("خدمات حذف شد.");
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  return (
    <div dir="rtl" className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">مدیریت خدمات</h1>
          <p className="mt-2 text-sm text-slate-400">
            خدمات و امکانات معرفی‌شده در وب‌سایت را مدیریت کنید.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold hover:bg-orange-400"
        >
          <Plus size={18} />
          افزودن خدمات
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl bg-red-500/10 p-4 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      {success && (
        <p
          role="status"
          className="rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-300"
        >
          {success}
        </p>
      )}

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-white/10 bg-slate-900 p-5 sm:p-7"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {editingId !== null ? "ویرایش خدمات" : "افزودن خدمات جدید"}
            </h2>
            <button type="button" onClick={closeForm} aria-label="بستن فرم">
              <X size={20} />
            </button>
          </div>

          <label className="block">
            <span className={labelClass}>عنوان *</span>
            <input
              required
              maxLength={200}
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </label>

          <label className="block">
            <span className={labelClass}>توضیحات *</span>
            <textarea
              required
              rows={4}
              className={inputClass}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>

          <label className="block">
            <span className={labelClass}>نام آیکون</span>
            <input
              maxLength={50}
              className={inputClass}
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="مثلاً Code یا Monitor"
            />
            <span className="mt-2 block text-xs text-slate-500">
              نام آیکون باید با شیوه نمایش آیکون‌ها در صفحه عمومی سایت هماهنگ
              باشد.
            </span>
          </label>

          <label className="block">
            <span className={labelClass}>ویژگی‌ها — هر ویژگی در یک خط</span>
            <textarea
              rows={5}
              className={inputClass}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder={"طراحی واکنش‌گرا\nبهینه‌سازی سرعت\nپشتیبانی فنی"}
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold disabled:opacity-50"
            >
              {saving ? "در حال ذخیره..." : "ذخیره"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              disabled={saving}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300"
            >
              انصراف
            </button>
          </div>
        </form>
      )}

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <BriefcaseBusiness className="text-orange-400" size={22} />
            <h2 className="font-semibold">فهرست خدمات</h2>
          </div>
          <span className="text-sm text-slate-400">{services.length} مورد</span>
        </div>

        {loading ? (
          <p className="p-8 text-center text-slate-400">در حال بارگذاری...</p>
        ) : services.length === 0 ? (
          <p className="p-8 text-center text-slate-400">
            هنوز خدماتی ثبت نشده است.
          </p>
        ) : (
          <div className="divide-y divide-white/5">
            {services.map((service) => (
              <article
                key={service.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-400">
                    {service.description}
                  </p>

                  {service.features.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {service.features.map((feature, index) => (
                        <li
                          key={`${feature}-${index}`}
                          className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => openEditForm(service)}
                    aria-label={`ویرایش ${service.title}`}
                    className="rounded-lg border border-white/10 p-2 text-slate-300 hover:text-orange-400"
                  >
                    <Pencil size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(service)}
                    aria-label={`حذف ${service.title}`}
                    className="rounded-lg border border-white/10 p-2 text-slate-300 hover:text-red-400"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
