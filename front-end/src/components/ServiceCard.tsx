import type { Service } from "../types/service";

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  const iconSymbols: Record<string, string> = {
    chart: "📊",
    code: "💻",
    target: "🎯",
    "chart-bar": "📈",
  };

  const symbol = iconSymbols[service.icon] ?? "✨";
  
  
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
        {symbol}
      </div>

      <h2 className="mt-6 text-xl font-extrabold text-slate-900">
        {service.title}
      </h2>

      <p className="mt-3 leading-8 text-slate-600">{service.description}</p>

      <ul className="mt-5 space-y-3">
        {service.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm leading-7 text-slate-600"
          >
            <span className="mt-1 font-bold text-orange-500">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default ServiceCard;
