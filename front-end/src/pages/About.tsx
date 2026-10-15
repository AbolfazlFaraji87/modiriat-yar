import { Link } from "react-router-dom";

const timeline = [
  {
    year: "1400",
    title: "آغاز یک ایده",
    description:
      "مدیریت‌یار با ایده‌ای ساده شکل گرفت: کمک به کسب‌وکارها برای مدیریت بهتر منابع، ارتباطات و فرایندهای روزانه.",
    tag: "شروع مسیر",
  },
  {
    year: "1401",
    title: "شناخت نیازهای کسب‌وکارها",
    description:
      "با بررسی چالش‌های شرکت‌ها و راهکارهای موجود، مسیر طراحی تجربه‌ای ساده‌تر و کاربردی‌تر مشخص شد.",
    tag: "تحقیق و برنامه‌ریزی",
  },
  {
    year: "1402",
    title: "تبدیل ایده‌ها به راهکار",
    description:
      "ایده‌های اولیه به راهکارهای کاربردی تبدیل شدند و سادگی استفاده و ساختار منظم اطلاعات اهمیت بیشتری پیدا کرد.",
    tag: "توسعه راهکارها",
  },
  {
    year: "1403",
    title: "رشد و بهبود مستمر",
    description:
      "تمرکز بر یکپارچگی فرایندها، بهبود تجربه کاربران و ایجاد مسیرهای روشن‌تر برای تصمیم‌گیری افزایش یافت.",
    tag: "رشد و توسعه",
  },
  {
    year: "1404",
    title: "حرکت به سوی تحول دیجیتال",
    description:
      "با استفاده هدفمند از ابزارهای دیجیتال، تلاش شد فعالیت‌های روزانه ساده‌تر و فرایندهای کاری قابل مدیریت‌تر شوند.",
    tag: "تحول دیجیتال",
  },
  {
    year: "1405",
    title: "ارتباط میان افراد، داده‌ها و فرایندها",
    description:
      "نگاه مجموعه به طراحی راهکارهای یکپارچه، انعطاف‌پذیر و قابل توسعه برای نیازهای متنوع کسب‌وکارها گسترش یافت.",
    tag: "یکپارچگی",
  },
  {
    year: "1406",
    title: "نگاهی به آینده",
    description:
      "مسیر پیش رو بر توسعه راهکارهای قابل اعتماد، تجربه کاربری بهتر و استفاده هوشمندانه از فناوری متمرکز است.",
    tag: "افق پیش رو",
  },
];

const values = [
  {
    number: "01",
    title: "شفافیت",
    description:
      "ارتباط روشن، انتظارات مشخص و گزارش‌دهی قابل فهم، پایه‌های یک همکاری حرفه‌ای و ماندگار هستند.",
  },
  {
    number: "02",
    title: "نوآوری",
    description:
      "از فناوری زمانی استفاده می‌کنیم که بتواند مسئله‌ای واقعی را حل کند و تجربه‌ای بهتر برای کاربران بسازد.",
  },
  {
    number: "03",
    title: "تعهد",
    description:
      "به کیفیت، مسئولیت‌پذیری و توجه به جزئیات پایبندیم و تلاش می‌کنیم در تمام مراحل پروژه پاسخ‌گو باشیم.",
  },
  {
    number: "04",
    title: "همکاری",
    description:
      "بهترین راهکارها با شنیدن دیدگاه‌های مختلف شکل می‌گیرند. همکاری نزدیک به ما کمک می‌کند نیازها را بهتر درک کنیم.",
  },
  {
    number: "05",
    title: "سادگی",
    description:
      "راهکارهای پیچیده را به تجربه‌هایی قابل فهم تبدیل می‌کنیم تا کاربران بتوانند با اطمینان از آن‌ها استفاده کنند.",
  },
  {
    number: "06",
    title: "یادگیری",
    description:
      "با بررسی نتایج، دریافت بازخورد و به‌روز نگه‌داشتن دانش خود، برای بهبود مداوم آماده می‌مانیم.",
  },
];

const principles = [
  {
    number: "01",
    title: "شناخت مسئله",
    description:
      "پیش از انتخاب ابزار یا نوشتن کد، نیازها، محدودیت‌ها و اهداف پروژه را بررسی می‌کنیم.",
  },
  {
    number: "02",
    title: "طراحی راهکار",
    description:
      "ساختار، تجربه کاربری و مسیر اجرا را متناسب با مسئله تعریف می‌کنیم تا تصمیم‌ها هدفمند باشند.",
  },
  {
    number: "03",
    title: "ساخت و ارزیابی",
    description:
      "راهکار را مرحله‌به‌مرحله توسعه می‌دهیم، بخش‌های اصلی را آزمایش می‌کنیم و بازخورد می‌گیریم.",
  },
  {
    number: "04",
    title: "بهبود و رشد",
    description:
      "پس از اجرا نیز فرصت‌های بهبود را بررسی می‌کنیم تا محصول بتواند همراه با نیازهای کسب‌وکار رشد کند.",
  },
];

function About() {
  return (
    <div className="overflow-hidden bg-white">
      {/* Hero */}
      <section className="relative isolate bg-slate-950 px-6 py-24 text-white md:py-36">
        <div className="absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 -z-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-bold text-orange-400">
            <span className="h-px w-8 bg-orange-400" />
            درباره مدیریت‌یار
          </p>

          <h1 className="max-w-4xl text-4xl font-black leading-[1.5] md:text-6xl md:leading-[1.4]">
            مسیر رشد کسب‌وکارها را
            <span className="text-orange-400"> هوشمندانه </span>
            می‌سازیم.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-9 text-slate-300 md:text-lg">
            ما به آینده‌ای فکر می‌کنیم که در آن مدیریت کسب‌وکارها ساده‌تر،
            تصمیم‌گیری‌ها آگاهانه‌تر و همکاری میان افراد مؤثرتر باشد. مدیریت‌یار
            برای تبدیل این نگاه به راهکارهای عملی تلاش می‌کند.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="rounded-xl bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-400"
            >
              شروع همکاری
            </Link>
            <a
              href="#our-story"
              className="rounded-xl border border-white/20 px-7 py-4 font-bold text-white transition hover:border-orange-400 hover:text-orange-400"
            >
              داستان ما
            </a>
          </div>

          <div className="mt-16 grid max-w-3xl grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-black text-orange-400">2020</p>
              <p className="mt-2 text-sm text-slate-400">
                آغاز داستان در این نمونه
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-orange-400">2026</p>
              <p className="mt-2 text-sm text-slate-400">نگاه به مسیر پیش رو</p>
            </div>
            <div>
              <p className="text-3xl font-black text-orange-400">6+</p>
              <p className="mt-2 text-sm text-slate-400">
                ارزش بنیادین در رویکرد ما
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Our story */}
      <section
        id="our-story"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28"
      >
        <div>
          <p className="font-bold text-orange-600">داستان ما</p>
          <h2 className="mt-4 text-3xl font-black leading-relaxed text-slate-900 md:text-4xl">
            فناوری باید کارها را ساده‌تر کند، نه پیچیده‌تر.
          </h2>

          <p className="mt-6 leading-9 text-slate-600">
            هر کسب‌وکار داستان، اهداف و چالش‌های خاص خودش را دارد. گاهی
            فرایندهای پراکنده، اطلاعات نامنظم یا ابزارهای نامتناسب، مسیر پیشرفت
            را دشوار می‌کنند. ما معتقدیم طراحی درست می‌تواند این موانع را به
            فرصت‌هایی برای بهتر کار کردن تبدیل کند.
          </p>

          <p className="mt-4 leading-9 text-slate-600">
            رویکرد ما از شناخت دقیق مسئله شروع می‌شود. به جای انتخاب راهکارهای
            آماده بدون بررسی نیازها، تلاش می‌کنیم میان اهداف کسب‌وکار، تجربه
            کاربران و توانایی‌های فناوری تعادل ایجاد کنیم.
          </p>

          <p className="mt-4 leading-9 text-slate-600">
            برای ما، موفقیت فقط به معنای تحویل یک محصول نیست؛ بلکه به معنای
            ایجاد راهکاری است که استفاده از آن قابل فهم باشد، نگهداری آن منطقی
            باشد و امکان توسعه در آینده را داشته باشد.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -left-4 -top-4 h-32 w-32 rounded-3xl bg-orange-100" />
          <div className="relative rounded-3xl bg-slate-950 p-8 text-white shadow-2xl md:p-10">
            <span className="text-sm font-bold text-orange-400">باور ما</span>
            <blockquote className="mt-5 text-2xl font-extrabold leading-relaxed md:text-3xl">
              «راهکار خوب، فقط مسئله امروز را حل نمی‌کند؛ برای فردا هم جا باز
              می‌کند.»
            </blockquote>
            <div className="mt-8 h-1 w-16 rounded-full bg-orange-500" />
            <p className="mt-6 leading-8 text-slate-400">
              ما به ساختن تجربه‌هایی فکر می‌کنیم که برای افراد مفید، برای
              کسب‌وکارها قابل استفاده و برای آینده قابل توسعه باشند.
            </p>
          </div>
        </div>
      </section>
      {/* Mission and vision */}
      <section className="bg-slate-50 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-bold text-orange-600">هدف و چشم‌انداز</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              امروز چه می‌کنیم و به کجا می‌رویم؟
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              داشتن هدف روشن کمک می‌کند تصمیم‌های کوچک روزانه در مسیر درست قرار
              بگیرند و منابع به مهم‌ترین اولویت‌ها اختصاص یابند.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-orange-600">
                ◎
              </div>
              <h3 className="mt-6 text-2xl font-black text-slate-900">
                مأموریت ما
              </h3>
              <p className="mt-4 leading-9 text-slate-600">
                کمک به کسب‌وکارها برای حل مسائل واقعی از طریق راهکارهای دیجیتال
                کاربردی، طراحی قابل فهم و فرایندهای هدفمند. تلاش می‌کنیم فناوری
                را به ابزاری در خدمت افراد تبدیل کنیم، نه مانعی تازه در مسیر کار
                آن‌ها.
              </p>
            </article>

            <article className="rounded-3xl bg-slate-950 p-8 text-white md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/15 text-2xl text-orange-400">
                ↗
              </div>
              <h3 className="mt-6 text-2xl font-black">چشم‌انداز ما</h3>
              <p className="mt-4 leading-9 text-slate-300">
                ساختن تجربه‌ای که در آن کسب‌وکارها بتوانند با اطلاعات بهتر،
                ابزارهای مناسب‌تر و همکاری مؤثرتر رشد کنند. می‌خواهیم راهکارهایی
                ایجاد کنیم که به اندازه کافی ساده برای استفاده روزمره و به
                اندازه کافی منعطف برای نیازهای آینده باشند.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        id="our-story"
        className="overflow-hidden bg-slate-50 px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              مسیر پیشرفت
            </span>

            <h2 className="mt-6 text-3xl font-black leading-relaxed text-slate-900 md:text-5xl">
              داستان رشد مدیریت‌یار
            </h2>

            <p className="mt-5 text-sm leading-8 text-slate-500 md:text-base">
              از نخستین ایده تا چشم‌انداز آینده؛ هر مرحله قدمی برای ساختن
              راهکارهایی بهتر و کاربردی‌تر است.
            </p>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            {/* Main timeline line */}
            <div
              aria-hidden="true"
              className="absolute bottom-6 right-[19px] top-6 w-0.5 bg-slate-200 md:right-1/2 md:translate-x-1/2"
            />

            <div className="space-y-8 md:space-y-0">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <article
                    key={item.year}
                    className="relative grid grid-cols-[40px_minmax(0,1fr)] items-start gap-x-4 md:min-h-64 md:grid-cols-[1fr_64px_1fr] md:gap-x-0"
                  >
                    {/* Timeline node */}
                    <div className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2 md:row-start-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-slate-50 bg-orange-500 text-[10px] font-black text-white shadow-[0_0_0_4px_rgba(249,115,22,0.12)] transition duration-300 hover:scale-110">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Timeline card */}
                    <div
                      className={`col-start-2 row-start-1 pb-2 md:col-span-1 md:row-start-1 md:pb-12 ${
                        isLeft
                          ? "md:col-start-1 md:pr-8 md:text-right"
                          : "md:col-start-3 md:pl-8 md:text-right"
                      }`}
                    >
                      <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg md:p-7">
                        {/* Connector to the timeline */}
                        <div
                          aria-hidden="true"
                          className={`absolute right-[-21px] top-5 h-px w-5 bg-slate-200 md:right-auto md:w-8 ${
                            isLeft
                              ? "md:left-auto md:right-[-32px]"
                              : "md:right-auto md:left-[-32px]"
                          }`}
                        />

                        <div
                          className={`flex flex-wrap items-center justify-between gap-3 ${
                            isLeft ? "md:flex-row-reverse" : ""
                          }`}
                        >
                          <span className="text-3xl font-black tracking-tight text-orange-500">
                            {item.year}
                          </span>

                          <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700">
                            {item.tag}
                          </span>
                        </div>

                        <h3 className="mt-4 text-lg font-extrabold leading-8 text-slate-900 transition-colors group-hover:text-orange-600 md:text-xl">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm leading-8 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-500">
              i
            </span>
            <p className="text-xs leading-7 text-slate-500">
              این جدول زمانی نمونه‌ای نمایشی از مسیر رشد مدیریت‌یار است و
              رویدادهای آن لزوماً بیانگر تاریخچه واقعی یک شرکت نیستند.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-bold text-orange-600">ارزش‌های ما</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              اصولی که مسیر ما را مشخص می‌کنند
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              این ارزش‌ها فقط کلمات زیبا نیستند؛ قرار است بر نحوه برنامه‌ریزی،
              طراحی، توسعه و همکاری ما اثر بگذارند.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.number}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
              >
                <span className="text-sm font-black text-orange-500">
                  {value.number}
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-slate-900 transition group-hover:text-orange-600">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-8 text-slate-600">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* How we work */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-bold text-orange-600">روش کار ما</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              از شناخت نیاز تا راهکار نهایی
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              یک فرایند روشن کمک می‌کند پروژه‌ها قابل پیگیری بمانند، تصمیم‌ها
              هدفمند باشند و مشکلات زودتر شناسایی شوند.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <article
                key={principle.number}
                className="relative border-t-2 border-orange-400 pt-6"
              >
                <span className="text-4xl font-black text-slate-200">
                  {principle.number}
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-8 text-slate-600">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* Closing CTA */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 px-7 py-14 text-white md:px-14 md:py-20">
          <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="font-bold text-orange-400">قدم بعدی شما</p>
              <h2 className="mt-4 text-3xl font-black leading-relaxed md:text-4xl">
                بیایید ایده‌های خوب را به راهکارهای واقعی تبدیل کنیم.
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                اگر برای بهبود یک فرایند، توسعه یک محصول یا شروع یک پروژه جدید
                برنامه دارید، گفت‌وگو می‌تواند نقطه شروع خوبی باشد.
              </p>
            </div>

            <Link
              to="/contact"
              className="shrink-0 rounded-xl bg-orange-500 px-7 py-4 text-center font-bold text-white transition hover:bg-orange-400"
            >
              با ما در ارتباط باشید
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
