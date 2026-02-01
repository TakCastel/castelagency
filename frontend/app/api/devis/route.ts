import { NextResponse } from "next/server";

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

    if (DIRECTUS_URL) {
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
          name: name.trim(),
          email: email.trim(),
          phone: phone?.trim() || null,
          project_type: projectType || null,
          budget: budget || null,
          message: message.trim(),
          status: "new",
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("[Devis] Directus error:", res.status, err);
        return NextResponse.json(
          { error: "Impossible d’enregistrer la demande." },
          { status: 500 }
        );
      }
    } else {
      console.info("[Devis]", {
        name,
        email,
        phone,
        projectType,
        budget,
        message,
      });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[Devis]", e);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
