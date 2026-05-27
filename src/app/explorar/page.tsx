"use client";

import Image from "next/image";
import Link from "next/link";
import { mockArtworks, mockArtists } from "@/lib/mock-data";
import { useUser } from "@/lib/user-context";

const FREE_ARTWORK_LIMIT = 3;

const disciplines = ["Todos", "Pintura", "Escultura", "Fotografía", "Arte Digital", "Instalación"];

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function ExplorarPage() {
  const { isPremium, openUpgrade } = useUser();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-foreground mb-2">Explorar</h1>
        <p className="text-foreground/50">Descubre obras y artistas del ecosistema LUX NOX</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-10">
        {disciplines.map((d) => (
          <button
            key={d}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors border ${
              d === "Todos"
                ? "bg-[var(--lux-cyan)] text-black border-transparent"
                : "border-black/10 text-foreground/50 hover:text-foreground hover:border-black/30"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Obras</h2>
          {!isPremium && (
            <p className="text-xs text-foreground/40">
              Mostrando {FREE_ARTWORK_LIMIT} de {mockArtworks.length} obras ·{" "}
              <button onClick={openUpgrade} className="text-[var(--lux-cyan)] hover:underline font-semibold">
                Ver todas con Premium
              </button>
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockArtworks.map((artwork, i) => {
            const locked = !isPremium && i >= FREE_ARTWORK_LIMIT;
            return (
              <div key={artwork.id} className="relative group rounded-2xl overflow-hidden bg-white border border-black/10 hover:shadow-lg transition-shadow">
                <Link href={locked ? "#" : `/obras/${artwork.id}`} onClick={locked ? (e) => { e.preventDefault(); openUpgrade(); } : undefined} className="block relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover group-hover:scale-105 transition-transform duration-300 ${locked ? "blur-sm" : ""}`}
                  />
                </Link>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-bold text-foreground text-sm leading-snug ${locked ? "blur-sm select-none" : ""}`}>{artwork.title}</h3>
                    <span className={`text-xs text-[var(--lux-cyan)] font-semibold whitespace-nowrap ${locked ? "blur-sm select-none" : ""}`}>
                      ${artwork.price.toLocaleString("es-CO")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs text-foreground/40 ${locked ? "blur-sm select-none" : ""}`}>
                      {artwork.artist}
                    </span>
                    <span className="text-[10px] border border-black/10 text-foreground/30 px-2 py-0.5 rounded-full">
                      {artwork.discipline}
                    </span>
                  </div>
                  {locked ? (
                    <button
                      onClick={openUpgrade}
                      className="block text-center w-full rounded-full border border-[var(--lux-yellow)]/40 text-[var(--lux-yellow)] text-xs font-semibold py-1.5 hover:bg-[var(--lux-yellow)]/8 transition-colors"
                    >
                      ✦ Solo Premium
                    </button>
                  ) : (
                    <Link
                      href={`/obras/${artwork.id}`}
                      className="block text-center w-full rounded-full border border-[var(--lux-cyan)]/40 text-[var(--lux-cyan)] text-xs font-semibold py-1.5 hover:bg-[var(--lux-cyan)]/10 transition-colors"
                    >
                      Ver obra
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-foreground mb-6">Artistas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {mockArtists.map((artist) => (
            <Link key={artist.id} href={`/perfil/${artist.id}`} className="group text-center">
              <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 ring-2 ring-black/10 group-hover:ring-[var(--lux-cyan)]/50 transition-all">
                <Image src={artist.image} alt={artist.name} fill sizes="80px" className="object-cover" />
              </div>
              <p className="text-sm font-bold text-foreground group-hover:text-[var(--lux-cyan)] transition-colors">
                {artist.name}
              </p>
              <p className="text-xs text-foreground/40 mt-0.5">{artist.discipline}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
