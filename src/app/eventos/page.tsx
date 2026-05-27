import Image from "next/image";
import Link from "next/link";
import { mockEvents } from "@/lib/mock-data";

const typeColors: Record<string, string> = {
  Exposición: "var(--lux-blue)",
  Taller: "var(--lux-green)",
  Subasta: "var(--lux-yellow)",
  Concurso: "var(--lux-orange)",
};

const types = ["Todos", "Exposición", "Taller", "Subasta", "Concurso"];

export default function EventosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-foreground mb-2">Eventos</h1>
        <p className="text-foreground/50">Exposiciones, talleres, subastas y activaciones artísticas</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-10">
        {types.map((t) => (
          <button
            key={t}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors border ${
              t === "Todos"
                ? "bg-[var(--lux-orange)] text-black border-transparent"
                : "border-black/10 text-foreground/50 hover:text-foreground hover:border-black/30"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {mockEvents.map((event) => {
          const date = new Date(event.date);
          const color = typeColors[event.type] || "var(--lux-cyan)";
          return (
            <Link
              key={event.id}
              href={`/eventos/${event.id}`}
              className="group flex gap-4 rounded-2xl border border-black/10 bg-white hover:shadow-md transition-shadow p-4"
            >
              <div className="relative w-32 h-28 flex-shrink-0 rounded-xl overflow-hidden">
                <Image src={event.image} alt={event.title} fill sizes="128px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${color}18`, border: `1px solid ${color}44`, color }}>
                    {event.type}
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-base leading-snug mb-1 group-hover:text-[var(--lux-cyan)] transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-foreground/40">
                  {date.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <p className="text-sm text-foreground/40">{event.location}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold" style={{ color }}>
                    {event.price === 0 ? "Entrada libre" : `$${event.price.toLocaleString("es-CO")}`}
                  </span>
                  <span className="text-xs text-foreground/30">{event.spots.toLocaleString()} cupos</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
