import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import AuthLayout from "../../components/auth/AuthLayout";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ username, password });
      navigate("/user");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "ورود ناموفق بود. دوباره تلاش کنید.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="خوش برگشتید"
      subtitle="برای ادامه مسیر، وارد حساب کاربری خود شوید."
      footer={
        <p className="text-center text-sm text-slate-400">
          حساب کاربری ندارید؟{" "}
          <Link
            to="/register"
            className="font-bold text-orange-400 transition hover:text-orange-300"
          >
            ثبت‌نام کنید
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            نام کاربری
          </label>

          <input
            id="username"
            name="username"
            autoComplete="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-orange-400/70 focus:ring-4 focus:ring-orange-500/10"
            placeholder="نام کاربری خود را وارد کنید"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            رمز عبور
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-orange-400/70 focus:ring-4 focus:ring-orange-500/10"
            placeholder="رمز عبور خود را وارد کنید"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm leading-6 text-red-300"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-l from-orange-500 to-amber-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition duration-300 hover:-translate-y-0.5 hover:from-orange-400 hover:to-amber-400 hover:shadow-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          <span>{isSubmitting ? "در حال ورود..." : "ورود به حساب"}</span>
          {!isSubmitting && (
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}