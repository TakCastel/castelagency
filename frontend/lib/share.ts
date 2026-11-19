/**
 * Partage natif sur mobile (feuille de partage du téléphone), sinon copie du lien.
 * Renvoie "copied" quand le lien est dans le presse-papiers, pour afficher « Lien copié ».
 */
export async function shareLink(
  url: string,
  title: string,
): Promise<"shared" | "copied" | "prompt"> {
  const nav = navigator as Navigator & {
    share?: (d: ShareData) => Promise<void>;
  };
  if (nav.share && window.matchMedia("(pointer: coarse)").matches) {
    try {
      await nav.share({ title, url });
      return "shared";
    } catch {
      // partage annulé : on retombe sur la copie
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    return "copied";
  } catch {
    window.prompt("Lien à copier :", url);
    return "prompt";
  }
}
