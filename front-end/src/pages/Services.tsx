import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Service } from "../types/service";
import ServiceCard from "../components/ServiceCard";
import { getServices } from "../services/services";

function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();
        setServices(data);
      } catch {
        setError("دریافت خدمات با مشکل مواجه شد.");
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold text-orange-400">خدمات ما</p>

          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-relaxed md:text-6xl">
            ابزارهای مناسب برای
            <span className="text-orange-400"> رشد هوشمندانه </span>
            کسب‌وکار شما
          </h1>

          <p className="mt-6 max-w-2xl leading-9 text-slate-300 md:text-lg">
            از طراحی وب‌سایت تا توسعه سیستم‌های مدیریتی، تلاش می‌کنیم راهکارهایی
            متناسب با نیازهای واقعی هر کسب‌وکار ارائه دهیم.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-xl bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-400"
          >
            درباره نیازتان صحبت کنیم
          </Link>
        </div>
      </section>

      {/* Service cards */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-bold text-orange-600">حوزه‌های تخصصی</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              چگونه می‌توانیم کمک کنیم؟
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              هر کسب‌وکار شرایط متفاوتی دارد. این خدمات، نقطه شروعی برای انتخاب
              راهکاری متناسب با اهداف و اولویت‌های شما هستند.
            </p>
          </div>

          {loading ? (
            <p className="py-12 text-center text-slate-500">
              در حال دریافت خدمات...
            </p>
          ) : error ? (
            <p role="alert" className="py-12 text-center text-red-600">
              {error}
            </p>
          ) : services.length === 0 ? (
            <p className="py-12 text-center text-slate-500">
              هنوز خدمتی ثبت نشده است.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-50 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-bold text-orange-600">مراحل همکاری</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              از ایده تا اجرا، قدم‌به‌قدم
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="border-r-2 border-orange-400 pr-5">
              <span className="text-sm font-black text-orange-600">
                مرحله ۰۱
              </span>
              <h3 className="mt-3 text-xl font-extrabold text-slate-900">
                شناخت نیازها
              </h3>
              <p className="mt-3 leading-8 text-slate-600">
                اهداف، مخاطبان و محدودیت‌های پروژه را بررسی می‌کنیم تا مسئله
                اصلی به‌درستی مشخص شود.
              </p>
            </div>

            <div className="border-r-2 border-orange-400 pr-5">
              <span className="text-sm font-black text-orange-600">
                مرحله ۰۲
              </span>
              <h3 className="mt-3 text-xl font-extrabold text-slate-900">
                طراحی راهکار
              </h3>
              <p className="mt-3 leading-8 text-slate-600">
                ساختار و مسیر اجرا را مشخص می‌کنیم و درباره اولویت‌ها و نتیجه
                مورد انتظار به توافق می‌رسیم.
              </p>
            </div>

            <div className="border-r-2 border-orange-400 pr-5">
              <span className="text-sm font-black text-orange-600">
                مرحله ۰۳
              </span>
              <h3 className="mt-3 text-xl font-extrabold text-slate-900">
                توسعه و بهبود
              </h3>
              <p className="mt-3 leading-8 text-slate-600">
                راهکار را پیاده‌سازی می‌کنیم، بخش‌های مهم را آزمایش می‌کنیم و بر
                اساس بازخورد، بهبودهای لازم را انجام می‌دهیم.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl bg-slate-950 p-8 text-white md:flex-row md:items-center md:justify-between md:p-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black leading-relaxed md:text-4xl">
              برای پروژه بعدی خود آماده‌اید؟
            </h2>
            <p className="mt-4 leading-8 text-slate-300">
              درباره اهداف و نیازهای خود با ما صحبت کنید تا بتوانیم مسیر مناسب
              را بررسی کنیم.
            </p>
          </div>

          <Link
            to="/contact"
            className="shrink-0 rounded-xl bg-orange-500 px-7 py-4 text-center font-bold transition hover:bg-orange-400"
          >
            تماس با ما
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Services;
