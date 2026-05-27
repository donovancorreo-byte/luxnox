import Image from "next/image";
import Link from "next/link";
import { mockEvents } from "@/lib/mock-data";

export default function EventoDetailPage({ params }: { params: { id: string } }) {
  const event = mockEvents.find((e) => e.id === params.id) ?? mockEvents[0];
  const date = new Date(event.date);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/eventos" className="text-sm text-white/40 hover:text-white transition-colors mb-8 inline-block">
        ← Volver a eventos
      </Link>

      <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
        <Image src={event.image} alt={event.title} fill sizes="(max-width: 1024px) 100vw, 896px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-black text-white mb-4">{event.title}</h1>
          <p className="text-white/60 leading-relaxed mb-6">
            Una experiencia única en el corazón del ecosistema artístico LUX NOX. Este evento reúne
            a artistas, coleccionistas y amantes del arte para compartir, crear y conectar en un espacio
            diseñado para que el talento encuentre su valor real.
          </p>
          <h2 className="text-lg font-bold text-white mb-3">¿Qué incluye?</h2>
          <ul className="space-y-2 text-white/60 text-sm">
            <li className="flex items-center gap-2"><span className="text-[var(--lux-cyan)]">✓</span> Acceso a todas las actividades del evento</li>
            <li className="flex items-center gap-2"><span className="text-[var(--lux-cyan)]">✓</span> Networking con artistas y coleccionistas</li>
            <li className="flex items-center gap-2"><span className="text-[var(--lux-cyan)]">✓</span> Kit de bienvenida LUX NOX</li>
            <li className="flex items-center gap-2"><span className="text-[var(--lux-cyan)]">✓</span> Certificado de participación digital</li>
          </ul>
        </div>

        {/* Ticket box */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 h-fit">
          <div className="mb-4">
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Fecha</p>
            <p className="text-white font-semibold">
              {date.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Lugar</p>
            <p className="text-white font-semibold">{event.location}</p>
          </div>
          <div className="mb-6">
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Precio</p>
            <p className="text-2xl font-black text-[var(--lux-cyan)]">
              {event.price === 0 ? "Gratis" : `$${event.price.toLocaleString("es-CO")}`}
            </p>
          </div>
          <button className="w-full rounded-full bg-[var(--lux-cyan)] py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity">
            Registrarme
          </button>
          <p className="text-center text-xs text-white/30 mt-3">
            {event.spots.toLocaleString()} cupos disponibles
          </p>
        </div>
      </div>
    </div>
  );
}
