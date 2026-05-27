"use client";

import { useUser } from "@/lib/user-context";

const premiumFeatures = [
  "Obras ilimitadas para artistas",
  "Contactar artistas directamente",
  "Comprar en el marketplace sin restricciones",
  "Acceso anticipado a eventos exclusivos",
  "Favoritos ilimitados y colecciones privadas",
  "Badge verificado en tu perfil",
];

function IconCheck() {
  return (
    <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 flex-shrink-0" fill="none">
      <path d="M2 6l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function UpgradeModal() {
  const { closeUpgrade, togglePlan, isPremium } = useUser();

  function handleUpgrade() {
    if (!isPremium) togglePlan();
    closeUpgrade();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && closeUpgrade()}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative px-6 pt-8 pb-6 text-center bg-gradient-to-b from-black to-neutral-900">
          <button
            onClick={closeUpgrade}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          >
            <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" />
            </svg>
          </button>
          <div className="inline-flex items-center gap-1.5 bg-[var(--lux-yellow)]/15 border border-[var(--lux-yellow)]/30 rounded-full px-3 py-1 mb-4">
            <span className="text-[var(--lux-yellow)] text-xs font-bold tracking-widest uppercase">Premium</span>
          </div>
          <h2 className="text-2xl font-black text-white mb-1">Acceso completo</h2>
          <p className="text-white/50 text-sm">Desbloquea todo el ecosistema LUX NOX</p>
        </div>

        {/* Features */}
        <div className="px-6 py-5">
          <ul className="space-y-3 mb-6">
            {premiumFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-foreground/70">
                <span className="text-[var(--lux-cyan)]">
                  <IconCheck />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="rounded-xl bg-black/3 border border-black/8 px-4 py-3 flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-foreground/40 uppercase tracking-widest mb-0.5">Precio</p>
              <p className="text-2xl font-black text-foreground">$500.000</p>
            </div>
            <p className="text-xs text-foreground/40">COP / mes</p>
          </div>

          <button
            onClick={handleUpgrade}
            className="w-full rounded-full bg-[var(--lux-cyan)] py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity mb-3"
          >
            Activar Premium
          </button>
          <button
            onClick={closeUpgrade}
            className="w-full text-sm text-foreground/40 hover:text-foreground/60 transition-colors py-1"
          >
            Ahora no
          </button>
        </div>
      </div>
    </div>
  );
}
