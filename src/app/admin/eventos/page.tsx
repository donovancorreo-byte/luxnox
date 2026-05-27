import { Plus, Search, MoreHorizontal } from "lucide-react";

const events = [
  { id: 1, title: "Noche de Galerías", type: "Exposición", date: "14 Jun 2026", location: "Bogotá", price: 0, spots: 200, sold: 148, status: "activo" },
  { id: 2, title: "Taller de Arte Digital", type: "Taller", date: "21 Jun 2026", location: "Medellín", price: 150000, spots: 30, sold: 22, status: "activo" },
  { id: 3, title: "Subasta LUX NOX", type: "Subasta", date: "5 Jul 2026", location: "Online", price: 0, spots: 500, sold: 312, status: "activo" },
  { id: 4, title: "Concurso de Fotografía", type: "Concurso", date: "19 Jul 2026", location: "Nacional", price: 0, spots: 1000, sold: 87, status: "borrador" },
  { id: 5, title: "Exposición Colectiva 2026", type: "Exposición", date: "2 Ago 2026", location: "Cali", price: 0, spots: 300, sold: 0, status: "borrador" },
];

const typeColors: Record<string, string> = {
  Exposición: "#1E5FCC",
  Taller: "#22C55E",
  Subasta: "#EAB308",
  Concurso: "#F97316",
};

const statusColor: Record<string, string> = {
  activo: "text-green-600 bg-green-50 border-green-200",
  borrador: "text-gray-500 bg-gray-50 border-gray-200",
  cancelado: "text-red-600 bg-red-50 border-red-200",
};

export default function AdminEventos() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" />
          <input
            type="text"
            placeholder="Buscar evento..."
            className="w-full rounded-xl border border-black/10 bg-white pl-9 pr-4 py-2 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-[var(--lux-cyan)]/40"
          />
        </div>
        <button className="flex items-center gap-2 rounded-full bg-[var(--lux-cyan)] px-4 py-2 text-xs font-bold text-black hover:opacity-90 transition-opacity">
          <Plus size={14} /> Nuevo evento
        </button>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-black/[0.02]">
                <th className="px-5 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Evento</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Tipo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Lugar</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Registros</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => {
                const color = typeColors[e.type] || "var(--lux-cyan)";
                const pct = Math.round((e.sold / e.spots) * 100);
                return (
                  <tr key={e.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.015] transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-foreground">{e.title}</p>
                      <p className="text-xs text-foreground/40">
                        {e.price === 0 ? "Entrada libre" : `$${e.price.toLocaleString("es-CO")}`}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
                        {e.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-foreground/60 whitespace-nowrap">{e.date}</td>
                    <td className="px-4 py-3.5 text-xs text-foreground/60">{e.location}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-black/10">
                          <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: color }} />
                        </div>
                        <span className="text-xs text-foreground/40">{e.sold}/{e.spots}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusColor[e.status]}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button className="text-foreground/30 hover:text-foreground transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-black/5 flex items-center justify-between">
          <p className="text-xs text-foreground/40">5 eventos</p>
          <div className="flex gap-1">
            <button className="rounded-lg border border-black/10 px-3 py-1 text-xs text-foreground/40 hover:text-foreground">Anterior</button>
            <button className="rounded-lg border border-[var(--lux-cyan)] bg-[var(--lux-cyan)]/5 px-3 py-1 text-xs text-[var(--lux-cyan)] font-semibold">1</button>
            <button className="rounded-lg border border-black/10 px-3 py-1 text-xs text-foreground/40 hover:text-foreground">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}
