"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ── Roles ────────────────────────────────────────────────── */
const roles = [
  {
    id: "artista",
    label: "Artista",
    icon: "🎨",
    color: "var(--lux-cyan)",
    tagline: "Crea y vende tu obra",
    desc: "Publica tus obras, gestiona tu galería virtual y vende directamente a coleccionistas.",
    permisos: ["Subir obras y colecciones", "Galería pública propia", "Vender en el marketplace", "Gestionar eventos propios"],
  },
  {
    id: "galerista",
    label: "Galerista",
    icon: "🏛️",
    color: "var(--lux-purple)",
    tagline: "Representa y exhibe",
    desc: "Representa artistas, exhibe colecciones y organiza eventos desde un panel dedicado.",
    permisos: ["Subir obras de artistas", "Crear y gestionar eventos", "Panel de galería", "Estadísticas de ventas"],
  },
  {
    id: "coleccionista",
    label: "Coleccionista",
    icon: "💎",
    color: "var(--lux-blue)",
    tagline: "Descubre y colecciona",
    desc: "Compra obras originales, sigue a tus artistas favoritos y asiste a eventos exclusivos.",
    permisos: ["Comprar obras originales", "Comprar boletos a eventos", "Lista de deseos privada", "Historial de colección"],
  },
  {
    id: "publico",
    label: "Público",
    icon: "👥",
    color: "#6b7280",
    tagline: "Explora el arte",
    desc: "Accede a la plataforma, descubre arte colombiano y asiste a eventos culturales.",
    permisos: ["Explorar obras y artistas", "Comprar boletos a eventos", "Seguir artistas", "Noticias y novedades"],
  },
];

/* ── Campos por rol ───────────────────────────────────────── */
type Field = { name: string; label: string; type: string; placeholder: string; required?: boolean; options?: string[] };

const extraFields: Record<string, Field[]> = {
  artista: [
    { name: "disciplina", label: "Disciplina artística", type: "select", placeholder: "", required: true,
      options: ["Pintura", "Escultura", "Fotografía", "Arte Digital", "Instalación", "Grabado", "Ilustración", "Otra"] },
    { name: "ciudad", label: "Ciudad", type: "text", placeholder: "Tu ciudad", required: true },
    { name: "web", label: "Sitio web / portafolio", type: "url", placeholder: "https://tuportafolio.com" },
  ],
  galerista: [
    { name: "galeria", label: "Nombre de la galería", type: "text", placeholder: "Galería XYZ", required: true },
    { name: "ciudad", label: "Ciudad", type: "text", placeholder: "Tu ciudad", required: true },
    { name: "web", label: "Sitio web de la galería", type: "url", placeholder: "https://migaleria.com" },
  ],
  coleccionista: [
    { name: "ciudad", label: "Ciudad", type: "text", placeholder: "Tu ciudad" },
    { name: "intereses", label: "Intereses artísticos", type: "select", placeholder: "",
      options: ["Pintura", "Escultura", "Fotografía", "Arte Digital", "Arte contemporáneo", "Arte latinoamericano", "Varios"] },
  ],
  publico: [
    { name: "ciudad", label: "Ciudad (opcional)", type: "text", placeholder: "Tu ciudad" },
  ],
};

/* ── Componente principal ─────────────────────────────────── */
export default function RegistroPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const role = roles.find((r) => r.id === selectedRole);
  const fields = selectedRole ? extraFields[selectedRole] : [];

  function handleRoleSelect(id: string) {
    setSelectedRole(id);
  }

  function handleNext() {
    if (selectedRole) setStep(2);
  }

  function handleChange(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simula llamada al servidor
    await new Promise((res) => setTimeout(res, 1400));
    setLoading(false);
    setDone(true);
    // Redirige al inicio tras 2 segundos
    setTimeout(() => router.push("/"), 2000);
  }

  const inputClass =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-foreground placeholder-foreground/20 focus:border-[var(--lux-cyan)]/60 focus:ring-2 focus:ring-[var(--lux-cyan)]/10 focus:outline-none transition-all";

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-foreground">
            LUX <span className="text-[var(--lux-cyan)]">NOX</span>
          </h1>
          <p className="text-sm text-foreground/40 mt-1">La raíz del arte</p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white shadow-sm p-8">

          {/* Indicador de pasos */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= n
                      ? "bg-[var(--lux-cyan)] text-black"
                      : "bg-black/5 text-foreground/30"
                  }`}
                >
                  {n}
                </div>
                <span className={`text-xs font-medium ${step >= n ? "text-foreground/70" : "text-foreground/30"}`}>
                  {n === 1 ? "Elige tu rol" : "Tus datos"}
                </span>
                {n < 2 && <div className="w-8 h-px bg-black/10 mx-1" />}
              </div>
            ))}
          </div>

          {/* ── PASO 1: Selección de rol ── */}
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-1">Crear cuenta</h2>
              <p className="text-sm text-foreground/40 mb-6">¿Cómo quieres participar en LUX NOX?</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {roles.map((r) => {
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => handleRoleSelect(r.id)}
                      className={`group rounded-xl border-2 p-4 text-left transition-all ${
                        isSelected
                          ? "border-[var(--lux-cyan)] bg-[var(--lux-cyan)]/5 shadow-sm"
                          : "border-black/10 bg-white hover:border-black/20 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl leading-none mt-0.5">{r.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <p className="font-bold text-sm" style={{ color: isSelected ? r.color : undefined }}>
                              {r.label}
                            </p>
                            {isSelected && (
                              <div className="w-4 h-4 rounded-full bg-[var(--lux-cyan)] flex items-center justify-center flex-shrink-0">
                                <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none">
                                  <path d="M2 5l2 2 4-4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-foreground/50 font-medium mb-1">{r.tagline}</p>
                          <p className="text-xs text-foreground/40 leading-relaxed">{r.desc}</p>
                        </div>
                      </div>

                      {/* Permisos */}
                      {isSelected && (
                        <ul className="mt-3 pt-3 border-t border-black/5 space-y-1">
                          {r.permisos.map((p) => (
                            <li key={p} className="flex items-center gap-2 text-xs text-foreground/50">
                              <svg viewBox="0 0 12 12" className="w-3 h-3 text-[var(--lux-cyan)] flex-shrink-0" fill="none">
                                <path d="M2 6l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              {p}
                            </li>
                          ))}
                        </ul>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Premium banner */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-6 flex items-start gap-3">
                <span className="text-lg mt-0.5">⭐</span>
                <div>
                  <p className="text-sm font-bold text-amber-600">Socio Premium — $500/mes</p>
                  <p className="text-xs text-amber-600/70 mt-0.5">
                    Disponible para todos los roles. Accede a beneficios exclusivos, descuentos y prioridad en eventos.
                  </p>
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={!selectedRole}
                className="w-full rounded-full bg-[var(--lux-cyan)] py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </>
          )}

          {/* ── ÉXITO ── */}
          {done && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--lux-cyan)]/10 flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-[var(--lux-cyan)]" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">¡Cuenta creada!</h3>
              <p className="text-sm text-foreground/40">
                Bienvenido a LUX NOX, {form.nombre}. Redirigiendo…
              </p>
            </div>
          )}

          {/* ── PASO 2: Datos del usuario ── */}
          {step === 2 && role && !done && (
            <>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground mb-6 transition-colors"
              >
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none">
                  <path d="M10 13L5 8l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Volver
              </button>

              {/* Rol seleccionado */}
              <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-[var(--lux-cyan)]/5 border border-[var(--lux-cyan)]/20">
                <span className="text-xl">{role.icon}</span>
                <div>
                  <p className="text-xs text-foreground/40">Registrándote como</p>
                  <p className="text-sm font-bold" style={{ color: role.color }}>{role.label}</p>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Nombre + Apellido */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground/50 mb-1.5">Nombre *</label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      required
                      className={inputClass}
                      value={form.nombre ?? ""}
                      onChange={(e) => handleChange("nombre", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/50 mb-1.5">Apellido *</label>
                    <input
                      type="text"
                      placeholder="Tu apellido"
                      required
                      className={inputClass}
                      value={form.apellido ?? ""}
                      onChange={(e) => handleChange("apellido", e.target.value)}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-foreground/50 mb-1.5">Correo electrónico *</label>
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    required
                    className={inputClass}
                    value={form.email ?? ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>

                {/* Contraseña */}
                <div>
                  <label className="block text-xs font-medium text-foreground/50 mb-1.5">Contraseña *</label>
                  <input
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    required
                    minLength={8}
                    className={inputClass}
                    value={form.password ?? ""}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                </div>

                {/* Campos específicos del rol */}
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-medium text-foreground/50 mb-1.5">
                      {field.label}{field.required && " *"}
                    </label>
                    {field.type === "select" ? (
                      <select
                        required={field.required}
                        className={inputClass}
                        value={form[field.name] ?? ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                      >
                        <option value="">Selecciona una opción</option>
                        {field.options?.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        className={inputClass}
                        value={form[field.name] ?? ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                      />
                    )}
                  </div>
                ))}

                {/* Términos */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 accent-[var(--lux-cyan)]" />
                  <span className="text-xs text-foreground/40 leading-relaxed">
                    Acepto los{" "}
                    <a href="#" className="text-[var(--lux-cyan)] hover:opacity-80">Términos de uso</a>{" "}
                    y la{" "}
                    <a href="#" className="text-[var(--lux-cyan)] hover:opacity-80">Política de privacidad</a>
                    {" "}de LUX NOX.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[var(--lux-cyan)] py-3 text-sm font-bold text-black hover:opacity-90 transition-opacity mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Creando cuenta…
                    </>
                  ) : (
                    "Crear cuenta"
                  )}
                </button>
              </form>
            </>
          )}

          {/* Footer link */}
          <p className="text-center text-sm text-foreground/40 mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link href="/auth/login" className="text-[var(--lux-cyan)] font-semibold hover:opacity-80">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
