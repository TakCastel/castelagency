import type { ReactNode } from "react";

/**
 * Remonté à chaque navigation : le contenu de la page entre en place
 * (animation `.page-enter`, active seulement après une navigation côté client).
 */
export default function SiteTemplate({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
