import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Settings,
  ShieldCheck,
  UserRound,
  Sparkles,
  BookOpen,
} from "lucide-react";
import type { ReactNode } from "react";

import { useAuth } from "../../contexts/useAuth";

export default function UserDashboard() {
  const { user } = useAuth();

  const firstName = user?.username || "کاربر";

  return (
    <div dir="rtl" className="space-y-8">
      <section className="relative isolate overflow-hidden rounded-3xl border border-orange-400/15 bg-gradient-to-l from-orange-500/10 via-slate-900 to-slate-900 p-6 sm:p-9">
        <div className="pointer-events-none absolute -left-16 -top-24 -z-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/3 -z-10 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1.5 text-xs font-medium text-orange-300">
              <Sparkles size={14} />
              فضای کاربری مدیریت‌یار
            </div>

            <h1 className="text-2xl font-black leading-relaxed sm:text-3xl">
              خوش آمدی، <span className="text-orange-400">{firstName}</span>!
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              از اینجا می‌توانی وضعیت حساب خود را بررسی کنی، اطلاعات شخصی‌ات را
              به‌روزرسانی کنی و تنظیمات امنیتی حساب را مدیریت کنی.
            </p>
          </div>

          <div className="flex h-20 w-20 shrink-0 items-center justify-center self-start rounded-3xl border border-orange-400/20 bg-orange-500/10 text-orange-300 sm:self-center">
            <Sparkles size={35} strokeWidth={1.5} />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold">خلاصه حساب</h2>
          <p className="mt-1 text-sm text-slate-500">
            اطلاعات فعلی حساب کاربری شما
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            icon={<UserRound size={21} />}
            title="نام کاربری"
            value={user?.username ?? "—"}
            description="شناسه حساب شما"
          />

          <SummaryCard
            icon={<ShieldCheck size={21} />}
            title="وضعیت حساب"
            value="فعال"
            description="ورود شما با موفقیت انجام شده است"
          />

          <SummaryCard
            icon={<Settings size={21} />}
            title="تنظیمات حساب"
            value="مدیریت حساب"
            description="ویرایش اطلاعات و تغییر رمز عبور"
            href="/user/settings"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold">دسترسی سریع</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <QuickLink
            href="/user/settings"
            icon={<Settings size={22} />}
            title="تنظیمات حساب"
            description="به‌روزرسانی اطلاعات و مدیریت رمز عبور"
          />

          <QuickLink
            href="/blog"
            icon={<BookOpen size={22} />}
            title="مطالب آموزشی"
            description="مطالعه مقالات و مطالب منتشرشده مدیریت‌یار"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-orange-500/10 p-2.5 text-orange-300">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2 className="font-bold">حریم خصوصی حساب</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              اطلاعات حساب شما از طریق سیستم احراز هویت مدیریت‌یار دریافت
              می‌شود. دسترسی به بخش‌های مدیریتی باید در سمت سرور نیز کنترل شود.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  description: string;
  href?: string;
}

function SummaryCard({
  icon,
  title,
  value,
  description,
  href,
}: SummaryCardProps) {
  const content = (
    <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition duration-200 hover:border-orange-400/20 hover:bg-slate-900">
      <div className="rounded-xl border border-orange-400/15 bg-orange-500/10 p-3 text-orange-300">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-slate-400">{title}</p>
        <p className="mt-2 break-words font-bold text-white">{value}</p>
        <p className="mt-2 text-xs leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );

  return href ? <Link to={href}>{content}</Link> : content;
}

interface QuickLinkProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
}

function QuickLink({ href, icon, title, description }: QuickLinkProps) {
  return (
    <Link
      to={href}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-orange-400/30 hover:bg-slate-900"
    >
      <div className="rounded-xl bg-orange-500/10 p-3 text-orange-300">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-bold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>

      <ArrowLeft
        size={18}
        className="shrink-0 text-slate-600 transition group-hover:-translate-x-1 group-hover:text-orange-300"
      />
    </Link>
  );
}
