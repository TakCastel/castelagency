/** Remplace les tirets cadratins à l'affichage (les données ne sont pas modifiées). */
export const clean = (s: string) => s.replace(/\s*—\s*/g, ", ");

export const KIND_LABEL = { app: "App", client: "Site", guide: "Guide" } as const;
