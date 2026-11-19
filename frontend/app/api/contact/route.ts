import { NextResponse } from "next/server";
import { Resend } from "resend";

import { PROJECT_TYPES, type ContactPayload } from "@/data/contact";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO = process.env.CONTACT_EMAIL ?? process.env.DEVIS_EMAIL;
const CONTACT_FROM = process.env.CONTACT_FROM ?? process.env.DEVIS_FROM ?? "Studio Castel <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Champ piège rempli : c'est un robot, on fait comme si tout s'était bien passé.
  if (body.website?.trim()) return NextResponse.json({ success: true });

  const name = body.name?.trim().slice(0, 200) ?? "";
  const email = body.email?.trim().slice(0, 200) ?? "";
  const message = body.message?.trim().slice(0, 5000) ?? "";
  const projectType = body.projectType?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Nom, email et message sont requis." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Cette adresse email ne semble pas valide." }, { status: 400 });
  }

  if (!RESEND_API_KEY || !CONTACT_TO?.trim()) {
    console.error("[Contact] RESEND_API_KEY ou CONTACT_EMAIL/DEVIS_EMAIL manquant");
    return NextResponse.json(
      { error: "L'envoi n'est pas disponible pour le moment. Réessaie un peu plus tard." },
      { status: 503 }
    );
  }

  const projectLabel = PROJECT_TYPES.find((t) => t.value === projectType)?.label ?? "Non précisé";
  const html = `
    <h2>Nouveau message depuis studio-castel.com</h2>
    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
    <p><strong>Email :</strong> ${escapeHtml(email)}</p>
    <p><strong>Projet :</strong> ${escapeHtml(projectLabel)}</p>
    <p><strong>Message :</strong></p>
    <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message)}</pre>
  `;

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: [CONTACT_TO.trim()],
      replyTo: email,
      subject: `[Studio Castel] ${projectLabel} · ${name}`,
      html,
    });
    if (error) {
      console.error("[Contact] Resend error:", error);
      return NextResponse.json(
        { error: "Le message n'a pas pu partir. Réessaie un peu plus tard." },
        { status: 502 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[Contact]", e);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}
