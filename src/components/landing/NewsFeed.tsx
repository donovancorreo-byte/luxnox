import Link from "next/link";
import Image from "next/image";
import { mockNews } from "@/lib/mock-data";

export default function NewsFeed() {
  const [featured, ...rest] = mockNews;

  return (
    <section className="py-20 border-t border-black/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs text-[var(--lux-purple)] font-semibold tracking-widest uppercase mb-2">Noticias</p>
          <h2 className="text-3xl font-black text-foreground">Últimas noticias</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 group">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/5 mb-4">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-semibold text-[var(--lux-cyan)] bg-[var(--lux-cyan)]/10 border border-[var(--lux-cyan)]/20 px-2 py-0.5 rounded-full">
                  {featured.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 leading-snug">{featured.title}</h3>
                <p className="text-sm text-white/60 mt-1">{featured.excerpt}</p>
              </div>
            </div>
            <p className="text-xs text-foreground/30">
              {new Date(featured.date).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {rest.map((item) => (
              <div key={item.id} className="group flex gap-4">
                <div className="relative w-24 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-black/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-[var(--lux-cyan)]/70">{item.category}</span>
                  <h3 className="text-sm font-bold text-foreground leading-snug mt-0.5 line-clamp-2 group-hover:text-[var(--lux-cyan)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-foreground/30 mt-1">
                    {new Date(item.date).toLocaleDateString("es-CO", { day: "numeric", month: "short" })}
                  </p>
                </div>
              </div>
            ))}
            <Link
              href="/explorar"
              className="mt-2 text-sm text-center text-foreground/40 hover:text-foreground border border-black/10 rounded-full py-2 transition-colors"
            >
              Ver más noticias →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
