import Link from "next/link";

const pillars = [
  { color: "var(--lux-cyan)", label: "Visibilidad", desc: "Presencia real en el ecosistema artístico nacional e internacional." },
  { color: "var(--lux-purple)", label: "Comunidad", desc: "Conexiones estratégicas entre artistas, galerías, coleccionistas y marcas." },
  { color: "var(--lux-orange)", label: "Comercio", desc: "Tu arte como activo económico: vende obras, merch y experiencias." },
  { color: "var(--lux-green)", label: "Eventos", desc: "Exposiciones, talleres, subastas y activaciones que generan impacto." },
];

export default function About() {
  return (
    <section className="py-24 border-t border-black/10 bg-black/[0.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs text-[var(--lux-cyan)] font-semibold tracking-widest uppercase mb-4">Quiénes somos</p>
            <h2 className="text-4xl font-black text-foreground leading-tight mb-6">
              El ecosistema artístico{" "}
              <span style={{ color: "var(--lux-cyan)" }}>integrado</span> y activo
            </h2>
            <p className="text-foreground/60 text-lg leading-relaxed mb-8">
              LUX NOX es un movimiento que conecta todas las disciplinas del arte —
              desde las Bellas Artes tradicionales hasta las nuevas expresiones digitales —
              creando un ecosistema donde la creatividad conecta, transforma y genera valor real.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth/registro"
                className="rounded-full bg-[var(--lux-cyan)] px-6 py-2.5 text-sm font-bold text-black text-center hover:opacity-90 transition-opacity"
              >
                Crear cuenta gratuita
              </Link>
              <Link
                href="/auth/registro?plan=premium"
                className="rounded-full border border-black/20 px-6 py-2.5 text-sm font-semibold text-foreground/60 text-center hover:bg-black/5 transition-colors"
              >
                Socio Premium — $500/mes
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div
                key={p.label}
                className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-8 h-8 rounded-full mb-3"
                  style={{ background: `${p.color}22`, border: `2px solid ${p.color}66` }}
                />
                <h3 className="font-bold mb-1" style={{ color: p.color }}>{p.label}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
