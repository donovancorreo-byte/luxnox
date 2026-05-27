"use client";

import Image from "next/image";
import { mockProducts } from "@/lib/mock-data";
import { useUser } from "@/lib/user-context";

const categories = ["Todos", "Arte", "Merch", "Digital"];

const categoryColors: Record<string, string> = {
  Arte: "var(--lux-purple)",
  Merch: "var(--lux-blue)",
  Digital: "var(--lux-cyan)",
};

const PREMIUM_CATEGORIES = new Set(["Arte", "Digital"]);

export default function MarketplacePage() {
  const { isPremium, openUpgrade } = useUser();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-foreground mb-2">Marketplace</h1>
        <p className="text-foreground/50">Obras originales, prints, merch y arte digital</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-10">
        {categories.map((c) => (
          <button
            key={c}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors border ${
              c === "Todos"
                ? "bg-[var(--lux-purple)] text-white border-transparent"
                : "border-black/10 text-foreground/50 hover:text-foreground hover:border-black/30"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {!isPremium && (
        <div className="mb-8 rounded-2xl border border-[var(--lux-yellow)]/30 bg-[var(--lux-yellow)]/5 px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-foreground/80">Compra Arte y Digital con Premium</p>
            <p className="text-xs text-foreground/50 mt-0.5">El Merch está disponible para todos. Arte original y colecciones digitales requieren plan Premium.</p>
          </div>
          <button
            onClick={openUpgrade}
            className="flex-shrink-0 rounded-full bg-[var(--lux-yellow)]/15 border border-[var(--lux-yellow)]/40 text-[var(--lux-yellow)] text-xs font-bold px-4 py-2 hover:bg-[var(--lux-yellow)]/25 transition-colors whitespace-nowrap"
          >
            ✦ Ver Premium
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => {
          const color = categoryColors[product.category] || "var(--lux-cyan)";
          const needsPremium = !isPremium && PREMIUM_CATEGORIES.has(product.category);

          return (
            <div key={product.id} className="group rounded-2xl border border-black/10 bg-white hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover group-hover:scale-105 transition-transform duration-300 ${needsPremium ? "blur-sm" : ""}`}
                />
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${color}18`, border: `1px solid ${color}44`, color }}>
                    {product.category}
                  </span>
                </div>
                {needsPremium && (
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--lux-yellow)]/15 border border-[var(--lux-yellow)]/40 text-[var(--lux-yellow)]">
                      ✦ Premium
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground text-sm leading-snug mb-1">{product.title}</h3>
                {"artist" in product && product.artist && (
                  <p className="text-xs text-foreground/40 mb-2">{product.artist}</p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-black text-foreground">
                    ${product.price.toLocaleString("es-CO")}
                  </span>
                  {needsPremium ? (
                    <button
                      onClick={openUpgrade}
                      className="rounded-full px-4 py-1.5 text-xs font-bold transition-colors"
                      style={{ background: "var(--lux-yellow)10", border: "1px solid var(--lux-yellow)44", color: "var(--lux-yellow)" }}
                    >
                      ✦ Premium
                    </button>
                  ) : (
                    <button
                      className="rounded-full px-4 py-1.5 text-xs font-bold transition-colors"
                      style={{ background: `${color}15`, border: `1px solid ${color}44`, color }}
                    >
                      Comprar
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
