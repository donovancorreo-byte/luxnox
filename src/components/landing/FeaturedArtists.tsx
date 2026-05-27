import Link from "next/link";
import Image from "next/image";
import { mockArtists } from "@/lib/mock-data";

export default function FeaturedArtists() {
  return (
    <section className="py-20 border-t border-black/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs text-[var(--lux-cyan)] font-semibold tracking-widest uppercase mb-2">Comunidad</p>
            <h2 className="text-3xl font-black text-foreground">Artistas destacados</h2>
          </div>
          <Link href="/explorar" className="text-sm text-foreground/40 hover:text-foreground transition-colors hidden sm:block">
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {mockArtists.map((artist) => (
            <Link key={artist.id} href={`/perfil/${artist.id}`} className="group">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/5 mb-3">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs font-medium bg-[var(--lux-cyan)]/20 border border-[var(--lux-cyan)]/30 text-[var(--lux-cyan)] px-2 py-0.5 rounded-full">
                    {artist.discipline}
                  </span>
                </div>
              </div>
              <p className="font-bold text-foreground text-sm group-hover:text-[var(--lux-cyan)] transition-colors">
                {artist.name}
              </p>
              <p className="text-xs text-foreground/40 mt-0.5">
                {artist.city} · {artist.works} obras
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
