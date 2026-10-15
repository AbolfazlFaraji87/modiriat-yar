import { useState } from "react";
import type { ContactForm } from "../types/contact";
import { sendContactMessage } from "../services/contact";

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  }

  async function handleSubmit(
    event: Parameters<NonNullable<React.ComponentProps<"form">["onSubmit"]>>[0],
  ) {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      await sendContactMessage(form);

      setSuccess("پیام شما با موفقیت ثبت شد. سپاسگزاریم!");
      setForm(initialForm);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
      );
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 px-6 py-20 text-white sm:py-28">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <span className="text-sm font-bold text-orange-400">
            ارتباط با ما
          </span>

          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
            بیایید درباره ایده شما صحبت کنیم.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-9 text-slate-300 sm:text-lg">
            سوالی دارید یا می‌خواهید پروژه جدیدی را شروع کنید؟ پیام خود را برای
            ما بنویسید تا بتوانیم بهتر راهنمایی‌تان کنیم.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
        {/* Contact information */}
        <aside>
          <h2 className="text-2xl font-black text-slate-900">در تماس باشیم</h2>

          <p className="mt-4 leading-8 text-slate-600">
            برای دریافت مشاوره، همکاری یا پرسیدن سوالات خود از راه‌های زیر با ما
            در ارتباط باشید.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="text-sm font-bold text-orange-600">ایمیل</span>
              <p className="mt-2 font-semibold text-slate-800">
                info@modiriyat-yar.example
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="text-sm font-bold text-orange-600">
                ساعات پاسخ‌گویی
              </span>
              <p className="mt-2 font-semibold text-slate-800">
                شنبه تا پنجشنبه، ساعت ۹ تا ۱۷
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="text-sm font-bold text-orange-600">همکاری</span>
              <p className="mt-2 leading-7 text-slate-700">
                برای بررسی پروژه‌ها و پیشنهادهای همکاری، فرم مقابل را تکمیل
                کنید.
              </p>
            </div>
          </div>
        </aside>

        {/* Contact form */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <h2 className="text-2xl font-black text-slate-900">ارسال پیام</h2>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            اطلاعات زیر را وارد کنید. تمام فیلدها الزامی هستند.
          </p>

          {success && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-7 text-green-800"
            >
              {success}
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-800"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  نام و نام خانوادگی
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={150}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="نام شما"
                  disabled={submitting}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  ایمیل
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled={submitting}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                موضوع پیام
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                required
                maxLength={200}
                value={form.subject}
                onChange={handleChange}
                placeholder="موضوع پیام شما"
                disabled={submitting}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                متن پیام
              </label>

              <textarea
                id="message"
                name="message"
                rows={5}
                required
                minLength={10}
                value={form.message}
                onChange={handleChange}
                placeholder="چطور می‌توانیم به شما کمک کنیم؟"
                disabled={submitting}
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 leading-7 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-orange-500 px-6 py-4 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? "در حال ارسال..." : "ارسال پیام"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Contact;
