"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { mockEvents } from "@/lib/mock-data";
import { MapPin, Calendar, Users, Clock } from "lucide-react";

const typeColors: Record<string, string> = {
  Exposición: "var(--lux-blue)",
  Taller: "var(--lux-green)",
  Subasta: "var(--lux-yellow)",
  Concurso: "var(--lux-orange)",
};

const includes: Record<string, string[]> = {
  Exposición: [
    "Acceso a todas las obras exhibidas",
    "Networking con artistas y coleccionistas",
    "Catálogo digital del evento",
    "Certificado de asistencia",
  ],
  Taller: [
    "Material incluido para el taller",
    "Guía experto durante toda la sesión",
    "Certificado de participación",
    "Acceso a recursos digitales",
  ],
  Subasta: [
    "Acceso a la sala de subasta",
    "Catálogo de obras en subasta",
    "Asesoría de colección en vivo",
    "Transmisión online disponible",
  ],
  Concurso: [
    "Inscripción oficial al concurso",
    "Evaluación por jurado experto",
    "Exhibición de obra participante",
    "Premio en efectivo para ganadores",
  ],
};

/* ── Modal de registro ─────────────────────────────────────── */
function RegistroModal({ event, onClose }: { event: (typeof mockEvents)[0]; onClose: () => void }) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-foreground placeholder-foreground/25 focus:border-[var(--lux-cyan)]/60 focus:ring-2 focus:ring-[var(--lux-cyan)]/10 focus:outline-none transition-all";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-black/8">
          <div>
            <h2 className="text-base font-bold text-foreground">
              {done ? "¡Registro exitoso!" : "Registrarme al evento"}
            </h2>
            <p className="text-xs text-foreground/40 mt-0.5 truncate max-w-[260px]">{event.title}</p>
          </div>
          <button onClick={onClose} className="text-foreground/30 hover:text-foreground/60 transition-colors">
            <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5">
          {done ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--lux-cyan)]/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-[var(--lux-cyan)]" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-foreground mb-1">¡Estás registrado!</p>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  Recibirás los detalles del evento en tu correo electrónico.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full rounded-full bg-[var(--lux-cyan)] py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity"
              >
                Listo
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground/50 mb-1.5">Nombre *</label>
                  <input type="text" placeholder="Tu nombre" required className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/50 mb-1.5">Apellido *</label>
                  <input type="text" placeholder="Tu apellido" required className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Correo electrónico *</label>
                <input type="email" placeholder="tu@correo.com" required className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Teléfono</label>
                <input type="tel" placeholder="+57 300 000 0000" className={inputClass} />
              </div>

              <div className="rounded-xl bg-black/2 border border-black/6 px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-foreground/60">Total a pagar</span>
                <span className="text-lg font-black text-[var(--lux-cyan)]">
                  {event.price === 0 ? "Gratis" : `$${event.price.toLocaleString("es-CO")}`}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[var(--lux-cyan)] py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Procesando…
                  </>
                ) : (
                  "Confirmar registro"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Página principal ──────────────────────────────────────── */
export default function EventoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const event = mockEvents.find((e) => e.id === id) ?? mockEvents[0];
  const [showModal, setShowModal] = useState(false);

  const date = new Date(event.date);
  const color = typeColors[event.type] || "var(--lux-cyan)";
  const checklist = includes[event.type] ?? includes["Exposición"];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/eventos" className="text-sm text-foreground/40 hover:text-foreground transition-colors mb-8 inline-block">
        ← Volver a eventos
      </Link>

      {/* Imagen */}
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 shadow-sm">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover"
          priority
        />
        <div className="absolute top-4 left-4">
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background: `${color}22`, border: `1px solid ${color}55`, color }}
          >
            {event.type}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda — info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-black text-foreground mb-4">{event.title}</h1>
            <p className="text-foreground/60 leading-relaxed">
              Una experiencia única en el corazón del ecosistema artístico LUX NOX. Este evento reúne
              a artistas, coleccionistas y amantes del arte para compartir, crear y conectar en un espacio
              diseñado para que el talento encuentre su valor real.
            </p>
          </div>

          {/* Detalles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Calendar,
                label: "Fecha",
                value: date.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" }),
              },
              { icon: MapPin, label: "Lugar", value: event.location },
              { icon: Clock, label: "Hora", value: "7:00 p.m." },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl bg-black/2 border border-black/8 px-4 py-3 flex items-start gap-3">
                <Icon size={15} className="text-foreground/30 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/30 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-foreground/80">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Qué incluye */}
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">¿Qué incluye?</h2>
            <ul className="space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground/60">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
                    <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" style={{ color }}>
                      <path d="M2 6l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Columna derecha — ticket */}
        <div className="rounded-2xl border border-black/10 bg-white shadow-sm p-6 h-fit">
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/30 mb-1">Fecha</p>
              <p className="text-sm font-semibold text-foreground">
                {date.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/30 mb-1">Lugar</p>
              <p className="text-sm font-semibold text-foreground">{event.location}</p>
            </div>
            <div className="border-t border-black/8 pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/30 mb-1">Precio</p>
              <p className="text-3xl font-black text-foreground">
                {event.price === 0 ? "Gratis" : `$${event.price.toLocaleString("es-CO")}`}
              </p>
              {event.price > 0 && <p className="text-xs text-foreground/30 mt-0.5">COP · IVA incluido</p>}
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full rounded-full py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity"
            style={{ background: color === "var(--lux-yellow)" ? color : "var(--lux-cyan)" }}
          >
            Registrarme
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-3">
            <Users size={11} className="text-foreground/30" />
            <p className="text-xs text-foreground/30">
              {event.spots.toLocaleString()} cupos disponibles
            </p>
          </div>
        </div>
      </div>

      {showModal && <RegistroModal event={event} onClose={() => setShowModal(false)} />}
    </div>
  );
}
