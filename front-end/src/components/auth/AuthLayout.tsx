import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

const particles = [
  { x: 8, y: 18, delay: -2, duration: 13, size: 3 },
  { x: 17, y: 72, delay: -8, duration: 17, size: 2 },
  { x: 24, y: 38, delay: -5, duration: 15, size: 4 },
  { x: 35, y: 85, delay: -11, duration: 19, size: 2 },
  { x: 43, y: 16, delay: -4, duration: 14, size: 3 },
  { x: 58, y: 78, delay: -9, duration: 18, size: 2 },
  { x: 68, y: 27, delay: -6, duration: 16, size: 4 },
  { x: 77, y: 58, delay: -3, duration: 14, size: 2 },
  { x: 87, y: 15, delay: -12, duration: 20, size: 3 },
  { x: 94, y: 82, delay: -7, duration: 17, size: 2 },
  { x: 12, y: 47, delay: -10, duration: 18, size: 2 },
  { x: 51, y: 49, delay: -1, duration: 16, size: 3 },
  { x: 72, y: 91, delay: -5, duration: 19, size: 3 },
  { x: 91, y: 39, delay: -9, duration: 15, size: 2 },
];

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <main
      dir="rtl"
      className="auth-scene relative isolate flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-white sm:px-6 lg:py-16"
    >
      <div className="auth-glow auth-glow-orange" aria-hidden="true" />
      <div className="auth-glow auth-glow-amber" aria-hidden="true" />
      <div className="auth-glow auth-glow-slate" aria-hidden="true" />

      <div className="auth-grid" aria-hidden="true" />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="url(#network-gradient)" strokeWidth="0.8">
          <path d="M30 120L180 220L310 100L440 260L580 170" />
          <path d="M180 220L220 410L390 480L440 260" />
          <path d="M780 80L920 190L1090 110L1170 260" />
          <path d="M920 190L850 360L1050 470L1170 260" />
          <path d="M40 620L220 530L390 650L540 560" />
          <path d="M760 570L850 360L990 650L1160 590" />
        </g>

        <g fill="#fb923c">
          <circle cx="180" cy="220" r="2.5" />
          <circle cx="310" cy="100" r="2" />
          <circle cx="440" cy="260" r="3" />
          <circle cx="220" cy="410" r="2" />
          <circle cx="920" cy="190" r="3" />
          <circle cx="1090" cy="110" r="2" />
          <circle cx="850" cy="360" r="2.5" />
          <circle cx="1050" cy="470" r="2" />
          <circle cx="220" cy="530" r="2" />
          <circle cx="990" cy="650" r="2.5" />
        </g>

        <defs>
          <linearGradient
            id="network-gradient"
            x1="0"
            y1="0"
            x2="1200"
            y2="800"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f97316" stopOpacity="0.05" />
            <stop offset="0.5" stopColor="#fb923c" stopOpacity="0.6" />
            <stop offset="1" stopColor="#f97316" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((particle, index) => {
          const style: CSSProperties = {
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          };

          return <span key={index} className="auth-particle" style={style} />;
        })}
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link
          to="/"
          className="mb-8 flex items-center justify-center gap-3 transition-opacity hover:opacity-80"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-300/20 bg-gradient-to-br from-orange-400 to-orange-600 text-2xl font-black text-white shadow-lg shadow-orange-500/25">
            م
          </span>

          <span>
            <span className="block text-2xl font-black tracking-tight text-white">
              مدیریت<span className="text-orange-400">‌یار</span>
            </span>
            <span className="mt-1 block text-xs text-slate-400">
              راهکارهای هوشمند کسب‌وکار
            </span>
          </span>
        </Link>

        <section className="auth-card rounded-3xl border border-white/[0.12] bg-slate-900/75 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9">
          <div className="mb-7">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-1.5 w-7 rounded-full bg-orange-500" />
              <span className="text-xs font-semibold tracking-wide text-orange-300">
                فضای کاربری مدیریت‌یار
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              {title}
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-400">{subtitle}</p>
          </div>

          {children}

          <div className="mt-7 border-t border-white/[0.08] pt-5">{footer}</div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-500">
          مدیریت ساده‌تر، تصمیم‌گیری هوشمندانه‌تر
        </p>
      </div>
    </main>
  );
}
