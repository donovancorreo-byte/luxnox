"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const roleHints = [
  { id: "artista",      icon: "🎨", label: "Artista",       color: "var(--lux-cyan)" },
  { id: "galerista",    icon: "🏛️", label: "Galerista",     color: "var(--lux-purple)" },
  { id: "coleccionista",icon: "💎", label: "Coleccionista", color: "var(--lux-blue)" },
  { id: "publico",      icon: "👥", label: "Público",       color: "#6b7280" },
];

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    router.push("/");
  }

  const inputClass =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-foreground placeholder-foreground/20 focus:border-[var(--lux-cyan)]/60 focus:ring-2 focus:ring-[var(--lux-cyan)]/10 focus:outline-none transition-all";

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-foreground">
            LUX <span className="text-[var(--lux-cyan)]">NOX</span>
          </h1>
          <p className="text-sm text-foreground/40 mt-1">La raíz del arte</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white shadow-sm p-8">
          <h2 className="text-xl font-bold text-foreground mb-1">Bienvenido de vuelta</h2>
          <p className="text-sm text-foreground/40 mb-6">Ingresa a tu cuenta LUX NOX</p>

          {/* Roles como referencia visual */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {roleHints.map((r) => (
              <span
                key={r.id}
                className="flex items-center gap-1 rounded-full border border-black/8 bg-black/2 px-2.5 py-1 text-xs text-foreground/40"
              >
                <span className="text-sm leading-none">{r.icon}</span>
                {r.label}
              </span>
            ))}
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-black/10 bg-white py-2.5 text-sm font-medium text-foreground/70 hover:bg-black/2 hover:border-black/15 transition-all mb-4"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continuar con Google
          </button>

          {/* Divisor */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/8" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-foreground/25">o con tu correo</span>
            </div>
          </div>

          {/* Formulario */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Correo electrónico</label>
              <input
                type="email"
                placeholder="tu@correo.com"
                autoComplete="email"
                required
                className={inputClass}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-foreground/50">Contraseña</label>
                <button
                  type="button"
                  className="text-xs text-[var(--lux-cyan)]/70 hover:text-[var(--lux-cyan)] transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/25 hover:text-foreground/50 transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" strokeLinecap="round" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" strokeLinecap="round" />
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" strokeLinecap="round" />
                      <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Recordarme */}
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" className="accent-[var(--lux-cyan)]" />
              <span className="text-xs text-foreground/40">Recordar sesión en este dispositivo</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[var(--lux-cyan)] py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity mt-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Entrando…
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          {/* Registro */}
          <p className="text-center text-sm text-foreground/40 mt-6">
            ¿No tienes cuenta?{" "}
            <Link href="/auth/registro" className="text-[var(--lux-cyan)] font-semibold hover:opacity-80">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
