import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-black text-white">
            مدیریت<span className="text-orange-500">‌یار</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-8 text-slate-400">
            راهکارهای هوشمند برای مدیریت بهتر کسب‌وکار، توسعه پروژه‌ها و ساختن
            آینده‌ای حرفه‌ای‌تر.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-white">دسترسی سریع</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/about" className="hover:text-orange-400">
              درباره ما
            </Link>
            <Link to="/services" className="hover:text-orange-400">
              خدمات
            </Link>
            <Link to="/projects" className="hover:text-orange-400">
              پروژه‌ها
            </Link>
            <Link to="/blog" className="hover:text-orange-400">
              وبلاگ
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white">با ما در ارتباط باشید</h3>
          <p className="mt-4 text-sm leading-8 text-slate-400">
            برای آشنایی با خدمات و دریافت مشاوره، با تیم ما تماس بگیرید.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-block font-bold text-orange-400 hover:text-orange-300"
          >
            ارتباط با ما ←
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-800 px-6 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} مدیریت‌یار — تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}

export default Footer;
