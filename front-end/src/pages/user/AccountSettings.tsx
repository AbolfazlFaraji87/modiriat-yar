import { useEffect, useState, type FormEvent } from "react";
import { KeyRound, Save, UserRound } from "lucide-react";

import { useAuth } from "../../contexts/useAuth";
import { changePassword, updateProfile } from "../../services/account";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20";

const labelClass = "mb-2 block text-sm text-slate-300";

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "خطایی رخ داد. دوباره تلاش کنید.";
}

export default function AccountSettings() {
  const { user, token, refreshUser } = useAuth();

  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    setUsername(user?.username ?? "");
    setEmail(user?.email ?? "");
  }, [user?.username, user?.email]);

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) return;

    setProfileLoading(true);
    setProfileMessage("");
    setProfileError(false);

    try {
      await updateProfile(token, {
        username: username.trim(),
        email: email.trim(),
      });
      await refreshUser();
      setProfileMessage("اطلاعات حساب با موفقیت به‌روزرسانی شد.");
    } catch (error) {
      setProfileError(true);
      setProfileMessage(getErrorMessage(error));
    } finally {
      setProfileLoading(false);
    }
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) return;

    setPasswordLoading(true);
    setPasswordMessage("");
    setPasswordError(false);

    try {
      const result = await changePassword(token, {
        current_password: currentPassword,
        new_password: newPassword,
      });

      setPasswordMessage(result.detail);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      setPasswordError(true);
      setPasswordMessage(getErrorMessage(error));
    } finally {
      setPasswordLoading(false);
    }
  }

  if (!user) {
    return (
      <div dir="rtl" className="p-6 text-slate-300">
        اطلاعات حساب در دسترس نیست.
      </div>
    );
  }

  return (
    <div dir="rtl" className="mx-auto max-w-4xl space-y-8 p-4 sm:p-6 lg:p-8">
      <header>
        <p className="mb-2 text-sm font-medium text-orange-400">مدیریت حساب</p>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          تنظیمات حساب کاربری
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          اطلاعات شخصی و امنیت حساب خود را از این قسمت مدیریت کنید.
        </p>
      </header>

      <section className="rounded-2xl border border-white/10 bg-slate-800/60 p-5 shadow-xl sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-orange-400/10 p-3 text-orange-400">
            <UserRound size={22} />
          </div>
          <div>
            <h2 className="font-bold text-white">اطلاعات شخصی</h2>
            <p className="mt-1 text-sm text-slate-400">
              نام کاربری و ایمیل خود را ویرایش کنید.
            </p>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className={labelClass}>
              نام کاربری
            </label>
            <input
              id="username"
              name="username"
              autoComplete="username"
              required
              maxLength={150}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              آدرس ایمیل
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
            />
          </div>

          {profileMessage && (
            <p
              role="status"
              className={`text-sm ${
                profileError ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {profileMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={profileLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />
            {profileLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-800/60 p-5 shadow-xl sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-orange-400/10 p-3 text-orange-400">
            <KeyRound size={22} />
          </div>
          <div>
            <h2 className="font-bold text-white">تغییر رمز عبور</h2>
            <p className="mt-1 text-sm text-slate-400">
              برای امنیت بیشتر از رمز عبور قوی استفاده کنید.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-5">
          <div>
            <label htmlFor="currentPassword" className={labelClass}>
              رمز عبور فعلی
            </label>
            <input
              id="currentPassword"
              name="current_password"
              type="password"
              autoComplete="current-password"
              required
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="newPassword" className={labelClass}>
              رمز عبور جدید
            </label>
            <input
              id="newPassword"
              name="new_password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className={inputClass}
            />
          </div>

          {passwordMessage && (
            <p
              role="status"
              className={`text-sm ${
                passwordError ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {passwordMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={passwordLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <KeyRound size={18} />
            {passwordLoading ? "در حال تغییر..." : "تغییر رمز عبور"}
          </button>
        </form>
      </section>
    </div>
  );
}
