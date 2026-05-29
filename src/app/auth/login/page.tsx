"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LuxNoxLogo from "@/components/ui/LuxNoxLogo";

const DEMO_USER = "admin";
const DEMO_PASS = "arte2026";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const user = (form.elements.namedItem("usuario") as HTMLInputElement).value;
    const pass = (form.elements.namedItem("password") as HTMLInputElement).value;

    if (user !== DEMO_USER || pass !== DEMO_PASS) {
      setError("Usuario o contraseña incorrectos.");
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    localStorage.setItem("lux_auth", "1");
    router.replace("/");
  }

  const inputClass =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-foreground placeholder-foreground/20 focus:border-[var(--lux-cyan)]/60 focus:ring-2 focus:ring-[var(--lux-cyan)]/10 focus:outline-none transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-background">
      <div className="w-full max-w-sm">

        <div className="flex justify-center mb-8">
          <LuxNoxLogo size="md" />
        </div>

        <div className="rounded-2xl border border-black/10 bg-white shadow-sm p-8">
          <h2 className="text-xl font-bold text-foreground mb-1">Iniciar sesión</h2>
          <p className="text-sm text-foreground/40 mb-6">Ingresa a tu cuenta LUX NOX</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Usuario</label>
              <input
                name="usuario"
                type="text"
                placeholder="usuario"
                autoComplete="username"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  name="password"
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

            {error && (
              <p className="text-xs text-[var(--lux-red)] bg-[var(--lux-red)]/5 border border-[var(--lux-red)]/15 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

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
        </div>
      </div>
    </div>
  );
}
