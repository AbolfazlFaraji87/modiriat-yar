import { useAuth } from "../../contexts/useAuth";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";
import AuthLayout from "../../components/auth/AuthLayout";

export default function Register() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await registerUser({
        username,
        email,
        password,
      });

      await login({
        username,
        password,
      });

      navigate("/user", { replace: true });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "ثبت‌نام انجام نشد. لطفاً دوباره تلاش کنید.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <AuthLayout
      title="به مدیریت‌یار بپیوندید"
      subtitle="حساب خود را بسازید و مدیریت کسب‌وکار را ساده‌تر کنید."
      footer={
        <p className="text-center text-sm text-slate-400">
          قبلاً حساب ساخته‌اید؟{" "}
          <Link
            to="/login"
            className="font-bold text-orange-400 transition hover:text-orange-300"
          >
            وارد شوید
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="یک نام کاربری انتخاب کنید"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            ایمیل
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-orange-400/70 focus:ring-4 focus:ring-orange-500/10"
            placeholder="name@example.com"
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
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-orange-400/70 focus:ring-4 focus:ring-orange-500/10"
            placeholder="حداقل ۸ کاراکتر"
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
          <span>
            {isSubmitting ? "در حال ثبت‌نام..." : "ایجاد حساب کاربری"}
          </span>
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
