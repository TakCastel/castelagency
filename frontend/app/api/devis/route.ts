import { NextResponse } from "next/server";
import { Resend } from "resend";

export type DevisPayload = {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget?: string;
  message: string;
};

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DEVIS_EMAIL = process.env.DEVIS_EMAIL;
const DEVIS_FROM = process.env.DEVIS_FROM ?? "Studio Castel <onboarding@resend.dev>";

const PROJECT_TYPE_LABELS: Record<string, string> = {
  "site-vitrine": "Site vitrine",
  ecommerce: "E‑commerce",
  application: "Application sur mesure",
  "ux-ui-branding": "UX/UI & branding",
  seo: "SEO & acquisition",
  "process-ia": "Process IA",
  autre: "Autre / plusieurs",
};

const BUDGET_LABELS: Record<string, string> = {
  "moins-2000": "Moins de 2 000 €",
  "2000-5000": "2 000 – 5 000 €",
  "5000-10000": "5 000 – 10 000 €",
  "plus-10000": "Plus de 10 000 €",
};

async function saveToDirectus(payload: {
  name: string;
  email: string;
  phone: string | null;
  projectType: string;
  budget: string | null;
  message: string;
}): Promise<boolean> {
  if (!DIRECTUS_URL) return false;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (DIRECTUS_TOKEN) {
    headers.Authorization = `Bearer ${DIRECTUS_TOKEN}`;
  }
  const res = await fetch(`${DIRECTUS_URL.replace(/\/$/, "")}/items/devis`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: payload.phone || null,
      project_type: payload.projectType || null,
      budget: payload.budget || null,
      message: payload.message.trim(),
      status: "new",
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("[Devis] Directus error:", res.status, err);
    return false;
  }
  return true;
}

async function sendEmail(payload: {
  name: string;
  email: string;
  phone: string | null;
  projectType: string;
  budget: string | null;
  message: string;
}): Promise<boolean> {
  if (!RESEND_API_KEY || !DEVIS_EMAIL?.trim()) return false;
  const projectLabel = (PROJECT_TYPE_LABELS[payload.projectType] ?? payload.projectType) || "—";
  const budgetLabel = payload.budget ? (BUDGET_LABELS[payload.budget] ?? payload.budget) : "—";
  const html = `
    <h2>Nouvelle demande de devis</h2>
    <p><strong>Nom / société :</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email :</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Téléphone :</strong> ${payload.phone ? escapeHtml(payload.phone) : "—"}</p>
    <p><strong>Type de projet :</strong> ${escapeHtml(projectLabel)}</p>
    <p><strong>Budget indicatif :</strong> ${escapeHtml(budgetLabel)}</p>
    <p><strong>Message :</strong></p>
    <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(payload.message)}</pre>
  `;
  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: DEVIS_FROM,
    to: [DEVIS_EMAIL.trim()],
    subject: `[Studio Castel] Demande de devis – ${escapeHtml(payload.name)}`,
    html,
  });
  if (error) {
    console.error("[Devis] Resend error:", error);
    return false;
  }
  return true;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DevisPayload;
    const { name, email, phone, projectType, budget, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis." },
        { status: 400 }
      );
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      projectType: projectType?.trim() || "",
      budget: budget?.trim() || null,
      message: message.trim(),
    };

    const directusOk = await saveToDirectus(payload);
    const emailOk = await sendEmail(payload);

    if (directusOk || emailOk) {
      return NextResponse.json({ success: true });
    }

    const hasConfig = Boolean(DIRECTUS_URL || (RESEND_API_KEY && DEVIS_EMAIL?.trim()));
    if (!hasConfig) {
      return NextResponse.json(
        {
          error:
            "L’envoi des demandes de devis n’est pas configuré. Merci de nous contacter par un autre moyen (e-mail, téléphone).",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error:
          "Impossible d’enregistrer votre demande pour le moment. Réessayez plus tard ou contactez-nous par un autre moyen.",
      },
      { status: 500 }
    );
  } catch (e) {
    console.error("[Devis]", e);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
