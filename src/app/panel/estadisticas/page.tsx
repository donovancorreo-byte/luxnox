"use client";

import { useUser } from "@/lib/user-context";
import { BarChart2, Eye, TrendingUp, Users } from "lucide-react";

const topArtworks = [
  { title: "Sinfonía Urbana", views: 1240, sales: 1 },
  { title: "Cosmos Interior", views: 890, sales: 0 },
];

export default function EstadisticasPage() {
  const { isPremium, openUpgrade } = useUser();

  if (!isPremium) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--lux-yellow)]/10 border border-[var(--lux-yellow)]/20 flex items-center justify-center mb-5">
          <BarChart2 size={28} className="text-[var(--lux-yellow)]" />
        </div>
        <h2 className="text-xl font-black text-foreground mb-2">Estadísticas detalladas</h2>
        <p className="text-sm text-foreground/50 max-w-xs leading-relaxed mb-6">
          Accede a métricas de vistas, seguidores y conversiones de todas tus obras con el plan Premium.
        </p>
        <button
          onClick={openUpgrade}
          className="rounded-full bg-[var(--lux-cyan)] px-6 py-2.5 text-sm font-bold text-black hover:opacity-90 transition-opacity"
        >
          ✦ Activar Premium
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-foreground">Estadísticas</h2>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Vistas totales", value: "3,841", icon: Eye, color: "var(--lux-cyan)" },
          { label: "Crecimiento", value: "+18%", icon: TrendingUp, color: "var(--lux-green)" },
          { label: "Seguidores", value: "1,284", icon: Users, color: "var(--lux-purple)" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <div className="rounded-xl p-2 w-fit mb-3" style={{ background: `${s.color}15` }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <p className="text-2xl font-black text-foreground">{s.value}</p>
            <p className="text-xs text-foreground/40 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-black/5">
          <h3 className="font-bold text-sm text-foreground">Obras más vistas</h3>
        </div>
        <div className="divide-y divide-black/5">
          {topArtworks.map((a) => (
            <div key={a.title} className="flex items-center justify-between px-5 py-3">
              <p className="text-sm font-semibold text-foreground">{a.title}</p>
              <div className="flex items-center gap-6">
                <span className="text-xs text-foreground/40">{a.views.toLocaleString()} vistas</span>
                <span className={`text-xs font-bold ${a.sales > 0 ? "text-[var(--lux-green)]" : "text-foreground/30"}`}>
                  {a.sales} venta{a.sales !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
