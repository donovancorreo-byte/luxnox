import Link from "next/link";
import Image from "next/image";
import { mockEvents } from "@/lib/mock-data";

const typeColors: Record<string, string> = {
  Exposición: "var(--lux-blue)",
  Taller: "var(--lux-green)",
  Subasta: "var(--lux-yellow)",
  Concurso: "var(--lux-orange)",
};

export default function UpcomingEvents() {
  return (
    <section className="py-20 border-t border-black/10 bg-black/[0.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs text-[var(--lux-orange)] font-semibold tracking-widest uppercase mb-2">Agenda</p>
            <h2 className="text-3xl font-black text-foreground">Próximos eventos</h2>
          </div>
          <Link href="/eventos" className="text-sm text-foreground/40 hover:text-foreground transition-colors hidden sm:block">
            Ver agenda →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockEvents.map((event) => {
            const date = new Date(event.date);
            const day = date.toLocaleDateString("es-CO", { day: "2-digit" });
            const month = date.toLocaleDateString("es-CO", { month: "short" });

            return (
              <Link key={event.id} href={`/eventos/${event.id}`} className="group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/5 mb-3">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-xl p-2 text-center min-w-[44px]">
                    <p className="text-xl font-black text-white leading-none">{day}</p>
                    <p className="text-[10px] text-white/60 uppercase">{month}</p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${typeColors[event.type]}22`,
                        border: `1px solid ${typeColors[event.type]}44`,
                        color: typeColors[event.type],
                      }}
                    >
                      {event.type}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-sm font-bold text-white leading-snug">{event.title}</p>
                    <p className="text-xs text-white/50 mt-0.5">{event.location}</p>
                  </div>
                </div>
                <p className="text-xs text-foreground/40">
                  {event.price === 0 ? "Entrada libre" : `$${event.price.toLocaleString("es-CO")}`} · {event.spots.toLocaleString()} cupos
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
