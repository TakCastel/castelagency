"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { DevisPayload } from "@/app/api/devis/route";

const inputClassName =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-paragraphe text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

const labelClassName = "text-small font-medium text-foreground";

const PROJECT_TYPES = [
  { value: "", label: "Sélectionnez un type de projet" },
  { value: "site-vitrine", label: "Site vitrine" },
  { value: "ecommerce", label: "E‑commerce" },
  { value: "application", label: "Application sur mesure" },
  { value: "ux-ui-branding", label: "UX/UI & branding" },
  { value: "seo", label: "SEO & acquisition" },
  { value: "process-ia", label: "Process IA" },
  { value: "autre", label: "Autre / plusieurs" },
];

const BUDGET_OPTIONS = [
  { value: "", label: "Non défini" },
  { value: "moins-2000", label: "Moins de 2 000 €" },
  { value: "2000-5000", label: "2 000 – 5 000 €" },
  { value: "5000-10000", label: "5 000 – 10 000 €" },
  { value: "plus-10000", label: "Plus de 10 000 €" },
];

export function DevisForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [form, setForm] = useState<DevisPayload>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Une erreur est survenue.");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", projectType: "", budget: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Impossible d’envoyer la demande. Réessayez plus tard.");
    }
  };

  if (status === "success") {
    return (
      <Card className="border-primary/20 bg-card/50">
        <CardContent className="p-8 md:p-10">
          <p className="text-titre-petit font-semibold text-foreground">
            Demande envoyée
          </p>
          <p className="mt-2 text-muted-foreground text-pretty">
            Merci pour votre message. Je vous recontacte sous 48 h ouvrées avec
            un premier retour et, si besoin, une proposition de devis.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-6"
            onClick={() => setStatus("idle")}
          >
            Envoyer une autre demande
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/80 bg-card/50">
      <CardHeader className="pb-4">
        <h2 className="text-titre-petit font-semibold tracking-tight">
          Décrivez votre projet
        </h2>
        <p className="text-small text-muted-foreground">
          Remplissez le formulaire ci-dessous. Je reviens vers vous avec un plan
          et un devis adapté.
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="devis-name" className={labelClassName}>
                Nom ou société <span className="text-destructive">*</span>
              </label>
              <input
                id="devis-name"
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jean Dupont ou Ma Société"
                className={inputClassName}
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="devis-email" className={labelClassName}>
                Email <span className="text-destructive">*</span>
              </label>
              <input
                id="devis-email"
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="vous@exemple.fr"
                className={inputClassName}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="devis-phone" className={labelClassName}>
              Téléphone
            </label>
            <input
              id="devis-phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="06 12 34 56 78"
              className={inputClassName}
              autoComplete="tel"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="devis-projectType" className={labelClassName}>
                Type de projet <span className="text-destructive">*</span>
              </label>
              <select
                id="devis-projectType"
                name="projectType"
                required
                value={form.projectType}
                onChange={handleChange}
                className={inputClassName}
              >
                {PROJECT_TYPES.map((opt) => (
                  <option key={opt.value || "empty"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="devis-budget" className={labelClassName}>
                Budget indicatif
              </label>
              <select
                id="devis-budget"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className={inputClassName}
              >
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt.value || "empty"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="devis-message" className={labelClassName}>
              Votre message <span className="text-destructive">*</span>
            </label>
            <textarea
              id="devis-message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Décrivez votre projet, vos objectifs, votre cible et toute contrainte ou idée importante…"
              className={inputClassName + " min-h-[120px] resize-y"}
            />
          </div>

          {status === "error" && (
            <p className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-small text-destructive">
              {errorMessage}
            </p>
          )}

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Envoi en cours…
                </>
              ) : (
                "Envoyer ma demande"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
