import Link from "next/link";
import Image from "next/image";

const disciplines = ["Pintura", "Escultura", "Fotografía", "Arte Digital", "Música", "Danza", "Teatro", "Instalación"];

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1800&q=80"
        alt="Arte de fondo"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Color orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[var(--lux-purple)]/25 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[var(--lux-cyan)]/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/logo-negro.png"
            alt="LUX NOX — La raíz del arte"
            width={480}
            height={194}
            priority
          />
        </div>

        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-white/70 font-medium leading-relaxed mb-10">
          Un movimiento que promueve, difunde y comercializa el arte como un activo
          cultural, emocional y económico. Conectamos artistas, coleccionistas
          y amantes del arte en un solo ecosistema.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/auth/registro"
            className="rounded-full bg-[var(--lux-cyan)] px-8 py-3 text-base font-bold text-black hover:opacity-90 transition-opacity"
          >
            Únete al movimiento
          </Link>
          <Link
            href="/explorar"
            className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Explorar arte
          </Link>
        </div>

        {/* Disciplines */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {disciplines.map((d) => (
            <span
              key={d}
              className="rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white/60"
            >
              {d}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "500+", label: "Artistas" },
            { value: "12K+", label: "Obras" },
            { value: "80+", label: "Eventos" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-xs text-white/40 tracking-widest uppercase mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
