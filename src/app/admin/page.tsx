import { Users, ImageIcon, CalendarDays, ShoppingBag, TrendingUp, ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Usuarios activos", value: "1,284", change: "+12%", icon: Users, color: "var(--lux-cyan)" },
  { label: "Obras publicadas", value: "4,830", change: "+8%", icon: ImageIcon, color: "var(--lux-purple)" },
  { label: "Eventos este mes", value: "24", change: "+3", icon: CalendarDays, color: "var(--lux-orange)" },
  { label: "Ventas del mes", value: "$8.4M", change: "+21%", icon: ShoppingBag, color: "var(--lux-green)" },
];

const recentUsers = [
  { name: "Valentina Cruz", role: "Artista", date: "Hoy", status: "activo" },
  { name: "Galería Moderna MDE", role: "Galería", date: "Ayer", status: "activo" },
  { name: "Pedro Salcedo", role: "Socio Premium", date: "Hace 2 días", status: "activo" },
  { name: "Laura Vega", role: "Artista", date: "Hace 3 días", status: "pendiente" },
  { name: "Carlos Ruiz", role: "Socio", date: "Hace 4 días", status: "activo" },
];

const recentSales = [
  { product: "Sinfonía Urbana", buyer: "Pedro Salcedo", amount: "$4.500", date: "Hoy" },
  { product: "Print firmado — Cosmos", buyer: "Ana Martínez", amount: "$320.000", date: "Ayer" },
  { product: "Camiseta LUX NOX", buyer: "Jorge Ramos", amount: "$85.000", date: "Hace 2 días" },
  { product: "Raíces de Luz", buyer: "Colección Privada", amount: "$12.000", date: "Hace 3 días" },
];

const statusColor: Record<string, string> = {
  activo: "text-green-600 bg-green-50 border-green-200",
  pendiente: "text-yellow-600 bg-yellow-50 border-yellow-200",
  suspendido: "text-red-600 bg-red-50 border-red-200",
};

export default function AdminDashboard() {
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
            <h2 className="font-bold text-foreground text-sm">Nuevos usuarios</h2>
            <a href="/admin/usuarios" className="flex items-center gap-1 text-xs text-[var(--lux-cyan)] hover:opacity-80">
              Ver todos <ArrowUpRight size={12} />
            </a>
          </div>
          <table className="w-full">
            <tbody>
              {recentUsers.map((u, i) => (
                <tr key={i} className="border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition-colors">
                  <td className="px-5 py-3">
                    <p className="text-sm font-semibold text-foreground">{u.name}</p>
                    <p className="text-xs text-foreground/40">{u.role}</p>
                  </td>
                  <td className="px-3 py-3 text-xs text-foreground/40 whitespace-nowrap">{u.date}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusColor[u.status]}`}>
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent sales */}
        <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
            <h2 className="font-bold text-foreground text-sm">Ventas recientes</h2>
            <a href="/admin/marketplace" className="flex items-center gap-1 text-xs text-[var(--lux-cyan)] hover:opacity-80">
              Ver todas <ArrowUpRight size={12} />
            </a>
          </div>
          <table className="w-full">
            <tbody>
              {recentSales.map((s, i) => (
                <tr key={i} className="border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition-colors">
                  <td className="px-5 py-3">
                    <p className="text-sm font-semibold text-foreground">{s.product}</p>
                    <p className="text-xs text-foreground/40">{s.buyer}</p>
                  </td>
                  <td className="px-3 py-3 text-xs text-foreground/40 whitespace-nowrap">{s.date}</td>
                  <td className="px-5 py-3 text-right text-sm font-bold text-[var(--lux-green)]">{s.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
