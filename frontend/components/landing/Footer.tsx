import Link from "next/link";

import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="container pb-10">
      <Separator className="mb-8" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-small text-muted-foreground">
          © {new Date().getFullYear()} Studio Castel (Avignon). Tous droits réservés.
        </div>
        <div className="flex flex-wrap gap-4 text-small">
          <Link className="text-muted-foreground hover:text-foreground" href="#features">
            Services
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" href="#process">
            Process
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" href="#faq">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
}

