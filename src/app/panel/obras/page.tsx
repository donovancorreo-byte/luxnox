"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { mockArtworks } from "@/lib/mock-data";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { useUser } from "@/lib/user-context";

const myArtworks = mockArtworks.filter((a) => a.artistId === "1");
const FREE_OBRA_LIMIT = 5;

export default function PanelObrasPage() {
  const { isPremium, openUpgrade } = useUser();
  const [artworks, setArtworks] = useState(myArtworks);

  function toggleAvailability(id: string) {
    setArtworks((prev) =>
      prev.map((a) => (a.id === id ? { ...a, available: !a.available } : a))
    );
  }

  const canPublish = isPremium || artworks.length < FREE_OBRA_LIMIT;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Mis obras</h2>
          <p className="text-xs text-foreground/40 mt-0.5">
            {artworks.length} obra{artworks.length !== 1 ? "s" : ""} publicada{artworks.length !== 1 ? "s" : ""}
            {!isPremium && ` · límite gratuito: ${FREE_OBRA_LIMIT}`}
          </p>
        </div>
        {canPublish ? (
          <Link
            href="/panel/obras/nueva"
            className="flex items-center gap-1.5 rounded-full bg-[var(--lux-cyan)] px-4 py-2 text-xs font-bold text-black hover:opacity-90 transition-opacity"
          >
            <Plus size={13} /> Subir obra
          </Link>
        ) : (
          <button
            onClick={openUpgrade}
            className="flex items-center gap-1.5 rounded-full border border-[var(--lux-yellow)]/40 bg-[var(--lux-yellow)]/8 px-4 py-2 text-xs font-bold text-[var(--lux-yellow)] hover:bg-[var(--lux-yellow)]/15 transition-colors"
          >
            ✦ Subir obra — Premium
          </button>
        )}
      </div>

      {!isPremium && (
        <div className="rounded-xl border border-[var(--lux-yellow)]/30 bg-[var(--lux-yellow)]/5 px-4 py-3 flex items-center justify-between gap-4">
          <p className="text-xs text-foreground/60">
            Plan gratuito: hasta {FREE_OBRA_LIMIT} obras. Con Premium publicas obras ilimitadas.
          </p>
          <button onClick={openUpgrade} className="text-xs font-bold text-[var(--lux-yellow)] hover:underline whitespace-nowrap">
            ✦ Activar Premium
          </button>
        </div>
      )}

      <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/5 bg-black/[0.02]">
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-foreground/40 uppercase tracking-widest">Obra</th>
              <th className="px-3 py-3 text-left text-[10px] font-semibold text-foreground/40 uppercase tracking-widest hidden sm:table-cell">Precio</th>
              <th className="px-3 py-3 text-left text-[10px] font-semibold text-foreground/40 uppercase tracking-widest hidden md:table-cell">Disciplina</th>
              <th className="px-3 py-3 text-left text-[10px] font-semibold text-foreground/40 uppercase tracking-widest">Estado</th>
              <th className="px-5 py-3 text-right text-[10px] font-semibold text-foreground/40 uppercase tracking-widest">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((artwork) => (
              <tr key={artwork.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-black/5 flex-shrink-0">
                      <Image src={artwork.image} alt={artwork.title} fill sizes="40px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate max-w-[140px]">{artwork.title}</p>
                      <p className="text-xs text-foreground/40">{artwork.year}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 hidden sm:table-cell">
                  <span className="text-sm font-bold text-foreground">${artwork.price.toLocaleString("es-CO")}</span>
                </td>
                <td className="px-3 py-3 hidden md:table-cell">
                  <span className="text-xs text-foreground/50">{artwork.discipline}</span>
                </td>
                <td className="px-3 py-3">
                  <button
                    onClick={() => toggleAvailability(artwork.id)}
                    className={`text-[10px] font-semibold px-2 py-1 rounded-full border transition-colors ${
                      artwork.available
                        ? "text-green-600 bg-green-50 border-green-200 hover:bg-green-100"
                        : "text-foreground/40 bg-black/5 border-black/10 hover:bg-black/10"
                    }`}
                  >
                    {artwork.available ? "Disponible" : "Vendida"}
                  </button>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/obras/${artwork.id}`}
                      className="p-1.5 rounded-lg text-foreground/30 hover:text-foreground/70 hover:bg-black/5 transition-colors"
                      title="Ver obra"
                    >
                      <Eye size={14} />
                    </Link>
                    <button
                      className="p-1.5 rounded-lg text-foreground/30 hover:text-[var(--lux-cyan)] hover:bg-[var(--lux-cyan)]/8 transition-colors"
                      title="Editar"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      className="p-1.5 rounded-lg text-foreground/30 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
