export type ContactPayload = {
  name: string;
  email: string;
  projectType?: string;
  message: string;
  /** Champ piège invisible : seuls les robots le remplissent. */
  website?: string;
};

export const PROJECT_TYPES = [
  { value: "jeu", label: "Un jeu" },
  { value: "app", label: "Une app" },
  { value: "site", label: "Un site" },
  { value: "autre", label: "Autre chose" },
] as const;
