"use client";

import { useId, useState } from "react";

import { PROJECT_TYPES, type ContactPayload } from "@/data/contact";
import { trackDevisSubmitted } from "@/lib/analytics";

const EMPTY: ContactPayload = { name: "", email: "", projectType: "", message: "", website: "" };

const field =
  "w-full rounded-2xl border border-white/10 bg-castel-surface px-5 py-4 text-base text-white placeholder:text-white/30 transition-colors duration-200 hover:border-white/20 focus:border-castel-red focus:outline-none disabled:opacity-60";
const label = "mb-2.5 block text-xs font-medium uppercase tracking-[0.08em] text-white/50";

/** Formulaire de contact : panneau noir posé sur le rouge du studio. */
export function ContactForm() {
  const id = useId();
  const [form, setForm] = useState<ContactPayload>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const set = (key: keyof ContactPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Une erreur est survenue. Réessaie dans un instant.");
        return;
      }
      trackDevisSubmitted({ project_type: form.projectType || undefined });
      setForm(EMPTY);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Impossible d'envoyer le message. Réessaie dans un instant.");
    }
  }

  const panel = "rounded-[2rem] bg-castel-ink p-6 text-white shadow-[0_30px_80px_-30px_rgba(9,9,11,0.6)] sm:p-10";

  if (status === "success") {
    return (
      <div className={`${panel} flex min-h-[420px] flex-col items-start justify-center`} role="status">
        <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full bg-castel-red text-2xl text-castel-ink">
          ✓
        </span>
        <p className="mt-6 font-display text-4xl font-bold tracking-[-0.02em]">Bien reçu, merci&nbsp;!</p>
        <p className="mt-3 max-w-sm text-lg text-white/65">Je te réponds sous 48&nbsp;h ouvrées.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 font-medium text-white/50 underline underline-offset-4 transition-colors hover:text-white"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const busy = status === "loading";

  return (
    <form onSubmit={onSubmit} className={`${panel} space-y-7`}>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={label}>
            Ton nom
          </label>
          <input
            id={`${id}-name`}
            required
            autoComplete="name"
            value={form.name}
            onChange={set("name")}
            disabled={busy}
            className={field}
            placeholder="Camille Martin"
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>
            Ton email
          </label>
          <input
            id={`${id}-email`}
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={set("email")}
            disabled={busy}
            className={field}
            placeholder="camille@exemple.fr"
          />
        </div>
      </div>

      <fieldset>
        <legend className={label}>C&apos;est pour</legend>
        <div className="flex flex-wrap gap-2.5">
          {PROJECT_TYPES.map((t) => {
            const active = form.projectType === t.value;
            return (
              <label
                key={t.value}
                className={`cursor-pointer rounded-full border px-5 py-2.5 font-display text-sm font-semibold transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-castel-red ${
                  active
                    ? "border-castel-red bg-castel-red text-castel-ink"
                    : "border-white/10 bg-castel-surface text-white/75 hover:border-white/25 hover:text-white"
                }`}
              >
                <input
                  type="radio"
                  name={`${id}-type`}
                  value={t.value}
                  checked={active}
                  onChange={() => setForm((f) => ({ ...f, projectType: t.value }))}
                  disabled={busy}
                  className="sr-only"
                />
                {t.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${id}-message`} className={label}>
          Ton message
        </label>
        <textarea
          id={`${id}-message`}
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
          disabled={busy}
          className={`${field} min-h-[160px] resize-y`}
          placeholder="Ton idée, ce que tu as déjà, tes délais…"
        />
      </div>

      {/* Champ piège pour les robots, invisible pour les humains. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Site web
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-2xl border border-castel-red/40 bg-castel-red/10 px-5 py-3 text-sm font-medium text-white">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="group flex min-h-14 w-full items-center justify-between gap-4 rounded-full bg-castel-red py-2 pl-7 pr-2 font-display text-lg font-semibold text-castel-ink transition-colors duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-castel-red disabled:opacity-60"
      >
        {busy ? "Envoi…" : "Envoyer le message"}
        <span
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-castel-ink text-xl text-white transition-transform duration-200 group-hover:translate-x-0.5"
        >
          →
        </span>
      </button>
    </form>
  );
}
