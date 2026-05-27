import { Search, UserPlus, MoreHorizontal } from "lucide-react";

const users = [
  { id: 1, name: "Valentina Cruz", email: "val@arte.co", role: "Artista", plan: "Gratuito", works: 24, joined: "12 Ene 2026", status: "activo" },
  { id: 2, name: "Galería Moderna MDE", email: "galeria@mde.co", role: "Galería", plan: "Pro", works: 87, joined: "3 Feb 2026", status: "activo" },
  { id: 3, name: "Pedro Salcedo", email: "pedro@gmail.com", role: "Socio", plan: "Premium", works: 0, joined: "20 Feb 2026", status: "activo" },
  { id: 4, name: "Laura Vega", email: "laura@vega.art", role: "Artista", plan: "Gratuito", works: 41, joined: "1 Mar 2026", status: "pendiente" },
  { id: 5, name: "Carlos Ruiz", email: "carlos@mail.com", role: "Socio", plan: "Gratuito", works: 0, joined: "5 Mar 2026", status: "activo" },
  { id: 6, name: "Andrés Molina", email: "andres@foto.co", role: "Artista", plan: "Gratuito", works: 67, joined: "10 Mar 2026", status: "activo" },
  { id: 7, name: "Marcos Ibáñez", email: "marcos@escultura.co", role: "Artista", plan: "Gratuito", works: 18, joined: "15 Mar 2026", status: "suspendido" },
];

const roleColors: Record<string, string> = {
  Artista: "text-[#0EA5E9] bg-[#0EA5E9]/10 border-[#0EA5E9]/20",
  Galería: "text-[#4B2EA6] bg-[#4B2EA6]/10 border-[#4B2EA6]/20",
  Socio: "text-[#1E5FCC] bg-[#1E5FCC]/10 border-[#1E5FCC]/20",
};

const statusColor: Record<string, string> = {
  activo: "text-green-600 bg-green-50 border-green-200",
  pendiente: "text-yellow-600 bg-yellow-50 border-yellow-200",
  suspendido: "text-red-600 bg-red-50 border-red-200",
};

export default function AdminUsuarios() {
  return (
    <div className="space-y-5">
      {/* Header actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" />
          <input
            type="text"
            placeholder="Buscar usuario..."
            className="w-full rounded-xl border border-black/10 bg-white pl-9 pr-4 py-2 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-[var(--lux-cyan)]/40"
          />
        </div>
        <div className="flex items-center gap-2">
          <select className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-foreground/60 focus:outline-none">
            <option>Todos los roles</option>
            <option>Artista</option>
            <option>Galería</option>
            <option>Socio</option>
          </select>
          <button className="flex items-center gap-2 rounded-full bg-[var(--lux-cyan)] px-4 py-2 text-xs font-bold text-black hover:opacity-90 transition-opacity">
            <UserPlus size={14} /> Nuevo usuario
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-black/[0.02]">
                <th className="px-5 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Usuario</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Rol</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Plan</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Obras</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Registro</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/40 uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.015] transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-foreground">{u.name}</p>
                    <p className="text-xs text-foreground/40">{u.email}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${roleColors[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-foreground/60">{u.plan}</td>
                  <td className="px-4 py-3.5 text-xs text-foreground/60">{u.works}</td>
                  <td className="px-4 py-3.5 text-xs text-foreground/40 whitespace-nowrap">{u.joined}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusColor[u.status]}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button className="text-foreground/30 hover:text-foreground transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-black/5 flex items-center justify-between">
          <p className="text-xs text-foreground/40">7 usuarios</p>
          <div className="flex gap-1">
            <button className="rounded-lg border border-black/10 px-3 py-1 text-xs text-foreground/40 hover:text-foreground transition-colors">Anterior</button>
            <button className="rounded-lg border border-[var(--lux-cyan)] bg-[var(--lux-cyan)]/5 px-3 py-1 text-xs text-[var(--lux-cyan)] font-semibold">1</button>
            <button className="rounded-lg border border-black/10 px-3 py-1 text-xs text-foreground/40 hover:text-foreground transition-colors">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}
