"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ImageIcon, BarChart2, Settings, ExternalLink } from "lucide-react";
import { mockArtists } from "@/lib/mock-data";
import Image from "next/image";

const panelNav = [
  { href: "/panel", label: "Inicio", icon: LayoutDashboard, exact: true },
  { href: "/panel/obras", label: "Mis obras", icon: ImageIcon },
  { href: "/panel/estadisticas", label: "Estadísticas", icon: BarChart2 },
  { href: "/panel/configuracion", label: "Configuración", icon: Settings },
];

const artist = mockArtists[0];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--lux-cyan)] font-semibold tracking-widest uppercase mb-1">Panel</p>
          <h1 className="text-2xl font-black text-foreground">Mi espacio artístico</h1>
        </div>
        <Link
          href={`/perfil/${artist.id}`}
          className="flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-foreground/50 hover:text-foreground hover:bg-black/5 transition-colors"
        >
          Ver perfil público <ExternalLink size={11} />
        </Link>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-48 flex-shrink-0">
          {/* Artist card */}
          <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-black/2 border border-black/8">
            <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
              <Image src={artist.image} alt={artist.name} fill sizes="36px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-foreground truncate">{artist.name}</p>
              <p className="text-[10px] text-foreground/40 truncate">{artist.discipline}</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {panelNav.map(({ href, label, icon: Icon, exact }) => {
              const active = exact ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[var(--lux-cyan)]/10 text-[var(--lux-cyan)]"
                      : "text-foreground/60 hover:bg-black/5 hover:text-foreground"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
