"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { mockArtworks, mockArtists } from "@/lib/mock-data";
import { useUser } from "@/lib/user-context";

/* ── Ícono check ──────────────────────────────────────────── */
function IconCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none">
      <path d="M2 6l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Modal de compra ──────────────────────────────────────── */
function BuyModal({ artwork, onClose }: { artwork: (typeof mockArtworks)[0]; onClose: () => void }) {
  const [step, setStep] = useState<"confirm" | "loading" | "success">("confirm");

  async function handleBuy() {
    setStep("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setStep("success");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-black/8">
          <h2 className="text-base font-bold text-foreground">
            {step === "success" ? "¡Compra realizada!" : "Confirmar compra"}
          </h2>
          <button onClick={onClose} className="text-foreground/30 hover:text-foreground/60 transition-colors">
            <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5">
          {step === "success" ? (
            /* ── Éxito ── */
            <div className="flex flex-col items-center text-center py-4 gap-4">
              <div className="w-16 h-16 rounded-full bg-[var(--lux-cyan)]/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-[var(--lux-cyan)]" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-foreground mb-1">Adquisición confirmada</p>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  Recibirás un correo con los detalles y el certificado de autenticidad de{" "}
                  <span className="font-semibold text-foreground/70">{artwork.title}</span>.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full rounded-full bg-[var(--lux-cyan)] py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity"
              >
                Cerrar
              </button>
            </div>
          ) : (
            /* ── Confirmación ── */
            <>
              {/* Resumen obra */}
              <div className="flex gap-4 mb-5">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-black/5">
                  <Image src={artwork.image} alt={artwork.title} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground text-sm leading-tight mb-0.5">{artwork.title}</p>
                  <p className="text-xs text-foreground/40 mb-1">{artwork.artist}</p>
                  <p className="text-xs text-foreground/40">{artwork.technique} · {artwork.year}</p>
                  <p className="text-lg font-black text-foreground mt-2">
                    ${artwork.price.toLocaleString("es-CO")}
                  </p>
                </div>
              </div>

              {/* Desglose */}
              <div className="rounded-xl bg-black/2 border border-black/6 p-4 space-y-2 mb-5">
                {[
                  ["Precio de obra", `$${artwork.price.toLocaleString("es-CO")}`],
                  ["Comisión plataforma (5%)", `$${(artwork.price * 0.05).toLocaleString("es-CO")}`],
                  [artwork.shipping, "Incluido"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between text-xs">
                    <span className="text-foreground/50">{label}</span>
                    <span className="font-semibold text-foreground/70">{value}</span>
                  </div>
                ))}
                <div className="border-t border-black/8 pt-2 flex items-center justify-between text-sm font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-[var(--lux-cyan)]">
                    ${(artwork.price * 1.05).toLocaleString("es-CO")}
                  </span>
                </div>
              </div>

              {/* Garantías */}
              <ul className="space-y-1.5 mb-6">
                {["Certificado de autenticidad incluido", "Devolución en 14 días", artwork.shipping].map((g) => (
                  <li key={g} className="flex items-center gap-2 text-xs text-foreground/50">
                    <IconCheck className="w-3.5 h-3.5 text-[var(--lux-cyan)]" />
                    {g}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleBuy}
                disabled={step === "loading"}
                className="w-full rounded-full bg-[var(--lux-cyan)] py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {step === "loading" ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Procesando…
                  </>
                ) : (
                  "Confirmar compra"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Página principal ─────────────────────────────────────── */
export default function ObraPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const artwork = mockArtworks.find((a) => a.id === id) ?? mockArtworks[0];
  const artist = mockArtists.find((a) => a.id === artwork.artistId) ?? mockArtists[0];
  const related = mockArtworks.filter((a) => a.id !== artwork.id && a.discipline === artwork.discipline).slice(0, 3);
  const [showModal, setShowModal] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { isPremium, openUpgrade } = useUser();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-foreground/40 mb-8">
        <button onClick={() => router.back()} className="hover:text-foreground transition-colors">← Volver</button>
        <span>/</span>
        <Link href="/explorar" className="hover:text-foreground transition-colors">Explorar</Link>
        <span>/</span>
        <span className="text-foreground/60 truncate max-w-[200px]">{artwork.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

        {/* ── Imagen ── */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/5 shadow-sm">
            <Image
              src={artwork.image}
              alt={artwork.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Badge disponibilidad */}
            <div className="absolute top-4 left-4">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  artwork.available
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-500 border border-red-200"
                }`}
              >
                {artwork.available ? "Disponible" : "Vendida"}
              </span>
            </div>
            {/* Botón wishlist */}
            <button
              onClick={() => setWishlisted((v) => !v)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
              aria-label={wishlisted ? "Quitar de favoritos" : "Añadir a favoritos"}
            >
              <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-colors ${wishlisted ? "fill-red-500 stroke-red-500" : "fill-none stroke-foreground/40"}`} strokeWidth={1.8}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {artwork.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full border border-black/8 text-foreground/40 bg-black/2">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Detalle ── */}
        <div className="flex flex-col">

          {/* Disciplina */}
          <span className="text-xs font-semibold text-[var(--lux-cyan)] uppercase tracking-widest mb-2">
            {artwork.discipline}
          </span>

          {/* Título */}
          <h1 className="text-3xl font-black text-foreground leading-tight mb-1">{artwork.title}</h1>

          {/* Artista */}
          <Link href={`/perfil/${artwork.artistId}`} className="flex items-center gap-2.5 mb-6 group w-fit">
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-black/8 group-hover:ring-[var(--lux-cyan)]/40 transition-all">
              <Image src={artist.image} alt={artist.name} fill sizes="32px" className="object-cover" />
            </div>
            <span className="text-sm text-foreground/50 group-hover:text-[var(--lux-cyan)] transition-colors font-medium">
              {artwork.artist}
            </span>
          </Link>

          {/* Ficha técnica */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: "Año", value: artwork.year },
              { label: "Técnica", value: artwork.technique },
              { label: "Dimensiones", value: artwork.dimensions },
              { label: "Edición", value: artwork.edition },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-black/2 border border-black/6 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/30 mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-foreground/70 leading-snug">{value}</p>
              </div>
            ))}
          </div>

          {/* Descripción */}
          <p className="text-sm text-foreground/55 leading-relaxed mb-6">{artwork.description}</p>

          {/* Garantías */}
          {artwork.available && (
            <ul className="space-y-2 mb-8">
              {[
                artwork.certificate && "Certificado de autenticidad",
                "Devolución garantizada 14 días",
                artwork.shipping,
              ].filter(Boolean).map((g) => (
                <li key={String(g)} className="flex items-center gap-2 text-xs text-foreground/50">
                  <IconCheck className="w-3.5 h-3.5 text-[var(--lux-cyan)]" />
                  {g}
                </li>
              ))}
            </ul>
          )}

          {/* Precio + CTA */}
          <div className="mt-auto">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-xs text-foreground/30 uppercase tracking-widest mb-0.5">Precio</p>
                <p className="text-3xl font-black text-foreground">
                  ${artwork.price.toLocaleString("es-CO")}
                </p>
                <p className="text-xs text-foreground/30 mt-0.5">COP · IVA no incluido</p>
              </div>
            </div>

            {artwork.available ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="flex-1 rounded-full bg-[var(--lux-cyan)] py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity"
                >
                  Comprar obra
                </button>
                {isPremium ? (
                  <button className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-foreground/50 hover:bg-black/5 transition-colors">
                    Contactar artista
                  </button>
                ) : (
                  <button
                    onClick={openUpgrade}
                    className="rounded-full border border-[var(--lux-yellow)]/40 px-5 py-3 text-sm font-semibold text-[var(--lux-yellow)] hover:bg-[var(--lux-yellow)]/8 transition-colors flex items-center gap-1.5"
                    title="Requiere plan Premium"
                  >
                    ✦ Contactar
                  </button>
                )}
              </div>
            ) : (
              <div className="rounded-xl bg-black/2 border border-black/8 px-5 py-4 text-center">
                <p className="text-sm font-semibold text-foreground/40">Esta obra ya fue adquirida</p>
                <p className="text-xs text-foreground/30 mt-0.5">Explora otras obras del artista</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Obras relacionadas ── */}
      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-foreground mb-5">Más obras de {artwork.discipline}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((rel) => (
              <Link key={rel.id} href={`/obras/${rel.id}`} className="group rounded-2xl overflow-hidden border border-black/10 bg-white hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={rel.image}
                    alt={rel.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="font-bold text-sm text-foreground truncate mb-0.5">{rel.title}</p>
                  <p className="text-xs text-foreground/40 mb-2">{rel.artist}</p>
                  <p className="text-sm font-black text-[var(--lux-cyan)]">
                    ${rel.price.toLocaleString("es-CO")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Modal de compra */}
      {showModal && <BuyModal artwork={artwork} onClose={() => setShowModal(false)} />}
    </div>
  );
}
