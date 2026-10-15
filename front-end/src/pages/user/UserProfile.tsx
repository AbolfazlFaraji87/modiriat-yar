import { Link } from "react-router-dom";
import { ArrowRight, Mail, UserRound } from "lucide-react";
import { useAuth } from "../../contexts/useAuth";

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to="/user"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-orange-300"
      >
        <ArrowRight size={17} />
        بازگشت به داشبورد
      </Link>

      <div>
        <h1 className="text-2xl font-black">پروفایل من</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          اطلاعات حساب ثبت‌شده شما در مدیریت‌یار
        </p>
      </div>

      <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60">
        <div className="flex items-center gap-4 border-b border-white/10 p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300">
            <UserRound size={27} />
          </div>

          <div className="min-w-0">
            <h2 className="break-words text-lg font-bold">{user?.username}</h2>
            <p className="mt-1 text-sm text-slate-500">
              حساب کاربری مدیریت‌یار
            </p>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <ProfileField
            label="نام کاربری"
            value={user?.username ?? "—"}
            icon={<UserRound size={18} />}
          />

          <ProfileField
            label="ایمیل"
            value={user?.email || "ایمیلی ثبت نشده است"}
            icon={<Mail size={18} />}
          />

          <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
            <p className="text-xs text-slate-500">نوع دسترسی</p>
            <p className="mt-2 text-sm font-semibold text-orange-300">
              {user?.is_staff ? "مدیر سامانه" : "کاربر عادی"}
            </p>
          </div>

          <p className="text-xs leading-6 text-slate-500">
            در حال حاضر این صفحه اطلاعات حساب را نمایش می‌دهد. قابلیت ویرایش
            پروفایل را پس از آماده‌سازی API مربوطه اضافه می‌کنیم.
          </p>
        </div>
      </section>
    </div>
  );
}

function ProfileField({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs text-slate-500">{label}</p>
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/50 p-4">
        <span className="text-slate-500">{icon}</span>
        <span className="break-all text-sm text-slate-200">{value}</span>
      </div>
    </div>
  );
}
