import Image from "next/image";
import { Plus, Search, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";

const products = [
  { id: 1, title: "Sinfonía Urbana", artist: "Valentina Cruz", category: "Arte", price: 4500, sold: 2, status: "publicado", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=80&q=80" },
  { id: 2, title: "Camiseta LUX NOX Limited", artist: "LUX NOX", category: "Merch", price: 85000, sold: 34, status: "publicado", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&q=80" },
  { id: 3, title: "Colección NFT — Cosmos Interior", artist: "Laura Vega", category: "Digital", price: 750000, sold: 1, status: "pendiente", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=80&q=80" },
  { id: 4, title: "Print Firmado — Sinfonía Urbana", artist: "Valentina Cruz", category: "Arte", price: 320000, sold: 8, status: "publicado", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=80&q=80" },
  { id: 5, title: "Tote Bag Artística", artist: "LUX NOX", category: "Merch", price: 45000, sold: 56, status: "publicado", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&q=80" },
  { id: 6, title: "Raíces de Luz", artist: "Marcos Ibáñez", category: "Arte", price: 12000, sold: 0, status: "pendiente", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=80&q=80" },
];

const categoryColors: Record<string, string> = {
  Arte: "#4B2EA6",
  Merch: "#1E5FCC",
  Digital: "#0EA5E9",
};

const statusStyles: Record<string, string> = {
  publicado: "text-green-600 bg-green-50 border-green-200",
  pendiente: "text-yellow-600 bg-yellow-50 border-yellow-200",
  rechazado: "text-red-600 bg-red-50 border-red-200",
};

export default function AdminMarketplace() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" />
          <input
            type="text"
            placeholder="Buscar producto..."
            className="w-full rounded-xl border border-black/10 bg-white pl-9 pr-4 py-2 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-[var(--lux-cyan)]/40"
          />
        </div>
        <div className="flex items-center gap-2">
          <select className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-foreground/60 focus:outline-none">
            <option>Todos</option>
            <option>Arte</option>
            <option>Merch</option>
            <option>Digital</option>
          </select>
          <button className="flex items-center gap-2 rounded-full bg-[var(--lux-cyan)] px-4 py-2 text-xs font-bold text-black hover:opacity-90 transition-opacity">
            <Plus size={14} /> Nuevo producto
          </button>
        </div>
      </div>

      {/* Pending approval */}
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-xs font-semibold text-yellow-700 mb-1">⏳ Pendientes de aprobación</p>
        <p className="text-xs text-yellow-600">2 productos requieren revisión antes de publicarse.</p>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-black/[0.02]">
                <th className="px-5 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Producto</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Categoría</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Precio</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Vendidos</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const color = categoryColors[p.category] || "var(--lux-cyan)";
                return (
                  <tr key={p.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.015] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={p.image} alt={p.title} fill sizes="40px" className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-xs leading-snug">{p.title}</p>
                          <p className="text-xs text-foreground/40">{p.artist}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs font-bold text-foreground">
                      ${p.price.toLocaleString("es-CO")}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-foreground/60">{p.sold}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusStyles[p.status]}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        {p.status === "pendiente" && (
                          <>
                            <button className="text-green-500 hover:text-green-700 transition-colors" title="Aprobar">
                              <CheckCircle size={16} />
                            </button>
                            <button className="text-red-400 hover:text-red-600 transition-colors" title="Rechazar">
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                        <button className="text-foreground/30 hover:text-foreground transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-black/5 flex items-center justify-between">
          <p className="text-xs text-foreground/40">6 productos</p>
          <div className="flex gap-1">
            <button className="rounded-lg border border-black/10 px-3 py-1 text-xs text-foreground/40">Anterior</button>
            <button className="rounded-lg border border-[var(--lux-cyan)] bg-[var(--lux-cyan)]/5 px-3 py-1 text-xs text-[var(--lux-cyan)] font-semibold">1</button>
            <button className="rounded-lg border border-black/10 px-3 py-1 text-xs text-foreground/40">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}
