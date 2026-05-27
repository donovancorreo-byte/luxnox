"use client";

import { useState } from "react";
import { mockArtists } from "@/lib/mock-data";

const artist = mockArtists[0];

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-foreground placeholder-foreground/20 focus:border-[var(--lux-cyan)]/60 focus:ring-2 focus:ring-[var(--lux-cyan)]/10 focus:outline-none transition-all";

export default function ConfiguracionPage() {
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 800));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6 max-w-xl">
      <h2 className="text-lg font-bold text-foreground">Configuración del perfil</h2>

      <form onSubmit={handleSave} className="rounded-2xl border border-black/10 bg-white shadow-sm p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-foreground/50 mb-1.5">Nombre</label>
            <input type="text" defaultValue={artist.name.split(" ")[0]} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground/50 mb-1.5">Apellido</label>
            <input type="text" defaultValue={artist.name.split(" ")[1]} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground/50 mb-1.5">Correo electrónico</label>
          <input type="email" defaultValue="valentina@example.com" className={inputClass} />
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground/50 mb-1.5">Disciplina artística</label>
          <select defaultValue={artist.discipline} className={inputClass}>
            {["Pintura", "Escultura", "Fotografía", "Arte Digital", "Instalación", "Grabado", "Ilustración", "Otra"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground/50 mb-1.5">Ciudad</label>
          <input type="text" defaultValue={artist.city} className={inputClass} />
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground/50 mb-1.5">Biografía</label>
          <textarea
            rows={4}
            defaultValue="Artista visual con más de 10 años de trayectoria, explorando la intersección entre la tradición pictórica y los medios contemporáneos."
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground/50 mb-1.5">Sitio web / portafolio</label>
          <input type="url" placeholder="https://tuportafolio.com" className={inputClass} />
        </div>

        <button
          type="submit"
          className={`w-full rounded-full py-3 text-sm font-bold transition-all ${
            saved
              ? "bg-[var(--lux-green)] text-white"
              : "bg-[var(--lux-cyan)] text-black hover:opacity-90"
          }`}
        >
          {saved ? "✓ Cambios guardados" : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
