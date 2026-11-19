"use client";

import { useId, useState } from "react";

import { CONTACT_EMAIL } from "@/data/games";
import { PROJECT_TYPES, type ContactPayload } from "@/data/contact";
import { trackDevisSubmitted } from "@/lib/analytics";

const EMPTY: ContactPayload = { name: "", email: "", projectType: "", message: "", website: "" };

const field =
  "w-full rounded-2xl border-2 border-castel-ink bg-white px-4 py-3 text-base text-castel-ink placeholder:text-[#71717A] focus:outline-none focus-visible:ring-4 focus-visible:ring-castel-ink/30 disabled:opacity-60";
const label = "mb-2 block font-display text-sm font-semibold";

/** Formulaire de contact, pensé pour être posé sur le fond rouge du studio. */
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
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      trackDevisSubmitted({ project_type: form.projectType || undefined });
      setForm(EMPTY);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Impossible d'envoyer le message. Réessaie plus tard.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-castel-ink p-8 text-white sm:p-10" role="status">
        <p className="font-display text-3xl font-bold">Message envoyé, merci !</p>
        <p className="mt-3 max-w-md text-white/80">Je te réponds sous 48 h ouvrées, sur l&apos;adresse que tu m&apos;as laissée.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-semibold text-castel-red underline underline-offset-4 hover:no-underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const busy = status === "loading";

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-castel-ink" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
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
        <legend className={label}>C&apos;est pour…</legend>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t) => {
            const active = form.projectType === t.value;
            return (
              <label
                key={t.value}
                className={`cursor-pointer rounded-full border-2 border-castel-ink px-5 py-2 font-display text-sm font-semibold transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-castel-ink/30 ${
                  active ? "bg-castel-ink text-white" : "bg-transparent hover:bg-castel-ink/10"
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
          className={`${field} min-h-[140px] resize-y`}
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
        <p role="alert" className="rounded-2xl bg-castel-ink px-4 py-3 text-sm font-medium text-white">
          {error}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-castel-ink px-8 py-3 font-display text-base font-semibold text-white transition-colors duration-200 hover:bg-castel-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-castel-ink disabled:opacity-60"
        >
          {busy ? "Envoi…" : "Envoyer"}
        </button>
        <p className="text-sm font-medium">
          ou directement à{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="break-all underline underline-offset-4 hover:no-underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </form>
  );
}
