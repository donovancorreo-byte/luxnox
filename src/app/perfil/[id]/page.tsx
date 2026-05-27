"use client";

import Image from "next/image";
import Link from "next/link";
import { mockArtists, mockArtworks } from "@/lib/mock-data";
import { useUser } from "@/lib/user-context";

export default function PerfilPage({ params }: { params: { id: string } }) {
  const artist = mockArtists.find((a) => a.id === params.id) ?? mockArtists[0];
  const artworks = mockArtworks.slice(0, 4);
  const { isPremium, openUpgrade } = useUser();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/explorar" className="text-sm text-foreground/40 hover:text-foreground transition-colors mb-8 inline-block">
        ← Explorar
      </Link>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">
        <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-[var(--lux-cyan)]/30 flex-shrink-0">
          <Image src={artist.image} alt={artist.name} fill sizes="112px" className="object-cover" />
        </div>
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-3xl font-black text-foreground mb-1">{artist.name}</h1>
          <p className="text-[var(--lux-cyan)] font-semibold mb-2">{artist.discipline}</p>
          <p className="text-foreground/50 text-sm mb-4">{artist.city} · {artist.works} obras publicadas</p>
          <p className="text-foreground/60 text-sm leading-relaxed max-w-xl">
            Artista visual con más de 10 años de trayectoria, explorando la intersección entre
            la tradición pictórica y los medios contemporáneos. Su obra ha sido exhibida en
            galerías de Colombia, México y España.
          </p>
          <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start">
            <button className="rounded-full bg-[var(--lux-cyan)] px-5 py-2 text-sm font-bold text-black hover:opacity-90 transition-opacity">
              Seguir
            </button>
            {isPremium ? (
              <button className="rounded-full border border-black/20 px-5 py-2 text-sm font-semibold text-foreground/60 hover:bg-black/5 transition-colors">
                Contactar
              </button>
            ) : (
              <button
                onClick={openUpgrade}
                className="rounded-full border border-[var(--lux-yellow)]/40 px-5 py-2 text-sm font-semibold text-[var(--lux-yellow)] hover:bg-[var(--lux-yellow)]/8 transition-colors"
                title="Requiere plan Premium"
              >
                ✦ Contactar
              </button>
            )}
          </div>
        </div>
        <div className="flex sm:flex-col gap-6 sm:gap-4 text-center">
          {[{ value: artist.works, label: "Obras" }, { value: "1.2K", label: "Seguidores" }, { value: "34", label: "Ventas" }].map((s) => (
            <div key={s.label}>
              <p className="text-xl font-black text-foreground">{s.value}</p>
              <p className="text-xs text-foreground/40 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Redes sociales */}
      <div className="flex gap-4 mb-8 justify-center sm:justify-start">
        {[
          {
            label: "Instagram",
            href: "https://instagram.com",
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            ),
          },
          {
            label: "X / Twitter",
            href: "https://twitter.com",
            icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            ),
          },
          {
            label: "Facebook",
            href: "https://facebook.com",
            icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
            ),
          },
          {
            label: "Sitio web",
            href: "https://example.com",
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            ),
          },
        ].map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-black/10 text-foreground/40 hover:text-[var(--lux-cyan)] hover:border-[var(--lux-cyan)]/40 transition-colors"
          >
            {icon}
          </a>
        ))}
      </div>

      <div className="flex gap-6 border-b border-black/10 mb-8">
        {["Galería", "Sobre mí", "Eventos"].map((tab, i) => (
          <button
            key={tab}
            className={`pb-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              i === 0 ? "border-[var(--lux-cyan)] text-[var(--lux-cyan)]" : "border-transparent text-foreground/40 hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {artworks.map((artwork) => (
          <Link key={artwork.id} href={`/obras/${artwork.id}`} className="group">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-black/5 mb-2">
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  Ver obra
                </span>
              </div>
            </div>
            <p className="text-xs font-semibold text-foreground truncate">{artwork.title}</p>
            <p className="text-xs text-[var(--lux-cyan)]">${artwork.price.toLocaleString("es-CO")}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
