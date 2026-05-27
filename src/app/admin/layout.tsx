import Link from "next/link";
import { LayoutDashboard, Users, CalendarDays, ShoppingBag } from "lucide-react";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/usuarios", label: "Usuarios", icon: Users },
  { href: "/admin/eventos", label: "Eventos", icon: CalendarDays },
  { href: "/admin/marketplace", label: "Marketplace", icon: ShoppingBag },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--lux-cyan)] font-semibold tracking-widest uppercase mb-1">Panel</p>
          <h1 className="text-2xl font-black text-foreground">Administración</h1>
        </div>
        <span className="rounded-full bg-[var(--lux-cyan)]/10 border border-[var(--lux-cyan)]/20 px-3 py-1 text-xs font-semibold text-[var(--lux-cyan)]">
          Admin
        </span>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-48 flex-shrink-0">
          <nav className="flex flex-col gap-1">
            {adminNav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/60 hover:bg-black/5 hover:text-foreground transition-colors"
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
