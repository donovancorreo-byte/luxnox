"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LuxNoxLogo from "@/components/ui/LuxNoxLogo";
import { useUser } from "@/lib/user-context";

const navLinks = [
  { href: "/explorar", label: "Explorar" },
  { href: "/eventos", label: "Eventos" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/panel", label: "Mi panel" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { plan, togglePlan } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <LuxNoxLogo size="sm" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={togglePlan}
              title="Demo: cambiar plan"
              className={`rounded-full px-3 py-1 text-xs font-bold border transition-colors ${
                plan === "premium"
                  ? "border-[var(--lux-yellow)]/50 text-[var(--lux-yellow)] bg-[var(--lux-yellow)]/8"
                  : "border-black/15 text-foreground/40 hover:text-foreground/60"
              }`}
            >
              {plan === "premium" ? "✦ Premium" : "Gratuito"}
            </button>
            <Link
              href="/auth/login"
              className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/auth/registro"
              className="rounded-full bg-[var(--lux-cyan)] px-4 py-1.5 text-sm font-semibold text-black hover:opacity-90 transition-opacity"
            >
              Únete
            </Link>
          </div>

          <button
            className="md:hidden text-foreground/60 hover:text-foreground"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/10 bg-background px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-foreground/60 hover:text-foreground py-1"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <hr className="border-black/10" />
            <Link href="/auth/login" className="text-sm text-foreground/60 hover:text-foreground py-1">
              Iniciar sesión
            </Link>
            <Link
              href="/auth/registro"
              className="rounded-full bg-[var(--lux-cyan)] px-4 py-2 text-sm font-semibold text-black text-center"
              onClick={() => setOpen(false)}
            >
              Únete
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
