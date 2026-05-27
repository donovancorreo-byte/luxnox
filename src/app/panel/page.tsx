import { mockArtworks } from "@/lib/mock-data";
import { ImageIcon, Eye, ShoppingBag, Users, TrendingUp, ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const myArtworks = mockArtworks.filter((a) => a.artistId === "1");

const stats = [
  { label: "Obras publicadas", value: String(myArtworks.length), change: "+1 este mes", icon: ImageIcon, color: "var(--lux-cyan)" },
  { label: "Vistas totales", value: "3,841", change: "+18%", icon: Eye, color: "var(--lux-purple)" },
  { label: "Ventas del mes", value: "$4.5M", change: "+1 venta", icon: ShoppingBag, color: "var(--lux-green)" },
  { label: "Seguidores", value: "1,284", change: "+47 nuevos", icon: Users, color: "var(--lux-orange)" },
];

const recentActivity = [
  { text: "Pedro Salcedo adquirió Sinfonía Urbana", time: "Hace 2 días", type: "venta" },
  { text: "42 nuevas vistas en Cosmos Interior", time: "Hace 4 días", type: "vista" },
  { text: "Ana Martínez te empezó a seguir", time: "Hace 5 días", type: "seguidor" },
  { text: "Tu obra fue destacada en Explorar", time: "Hace 1 semana", type: "destacado" },
];

const activityColors: Record<string, string> = {
  venta: "var(--lux-green)",
  vista: "var(--lux-cyan)",
  seguidor: "var(--lux-purple)",
  destacado: "var(--lux-yellow)",
};

export default function PanelDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="rounded-xl p-2" style={{ background: `${s.color}15` }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-green-600">
                <TrendingUp size={11} /> {s.change}
              </span>
            </div>
            <p className="text-2xl font-black text-foreground">{s.value}</p>
            <p className="text-xs text-foreground/40 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mis obras recientes */}
        <div className="lg:col-span-2 rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
            <h2 className="font-bold text-foreground text-sm">Mis obras</h2>
            <div className="flex items-center gap-3">
              <Link href="/panel/obras" className="flex items-center gap-1 text-xs text-[var(--lux-cyan)] hover:opacity-80">
                Ver todas <ArrowUpRight size={12} />
              </Link>
              <Link
                href="/panel/obras/nueva"
                className="flex items-center gap-1.5 rounded-full bg-[var(--lux-cyan)] px-3 py-1 text-xs font-bold text-black hover:opacity-90 transition-opacity"
              >
                <Plus size={11} /> Nueva obra
              </Link>
            </div>
          </div>
          <div className="divide-y divide-black/5">
            {myArtworks.map((artwork) => (
              <div key={artwork.id} className="flex items-center gap-4 px-5 py-3 hover:bg-black/[0.02] transition-colors">
                <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-black/5 flex-shrink-0">
                  <Image src={artwork.image} alt={artwork.title} fill sizes="44px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{artwork.title}</p>
                  <p className="text-xs text-foreground/40">{artwork.technique} · {artwork.year}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-black text-[var(--lux-cyan)]">
                    ${artwork.price.toLocaleString("es-CO")}
                  </p>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      artwork.available
                        ? "text-green-600 bg-green-50 border-green-200"
                        : "text-foreground/40 bg-black/5 border-black/10"
                    }`}
                  >
                    {artwork.available ? "Disponible" : "Vendida"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-black/5">
            <h2 className="font-bold text-foreground text-sm">Actividad reciente</h2>
          </div>
          <div className="divide-y divide-black/5">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3">
                <div
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: activityColors[item.type] }}
                />
                <div>
                  <p className="text-xs text-foreground/70 leading-snug">{item.text}</p>
                  <p className="text-[10px] text-foreground/30 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
