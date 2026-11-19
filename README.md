# Studio Castel

Site du Studio Castel, studio de jeux vidéo indépendant basé à Avignon. Une page d'accueil qui présente les jeux, une page par jeu, les pages légales, et le parcours `/formation-ia` (accessible par son adresse, hors menu).

Direction artistique : `frontend/docs/DA-studio-castel.md`.

## Démarrage

```bash
cd frontend
npm install
npm run dev
```

Le site est servi sur http://localhost:3000. Déploiement : Netlify (`netlify.toml`, base `frontend`).

## Structure de `frontend/`

- `app/` : routes (App Router). `(site)/` contient l'accueil, `jeux/[slug]`, `mentions-legales` et `politique-de-confidentialite`. `formation-ia/` est isolée (layout, thème et CSS propres).
- `components/site/` : composants du site. `components/training/` et `components/ui/` : formation IA.
- `data/` : contenus en TypeScript. `games.ts` pilote l'accueil et les pages jeux, `showcase.ts` (sur la base de `projects.ts`) les projets. `books.ts`, `drawings.ts` et `content/` servent à `/creations`.
- `lib/` : utilitaires, analytics et consentement, formation (`lib/training/`).
- `public/` : images (`games/`, `brand/`, `assets/`).

Les anciennes URLs de l'agence web (services, projets, blog, contact, devis...) redirigent vers `/` (voir `frontend/next.config.js`).

## Production

- Domaine : https://studio-castel.com (Netlify). `www` redirige vers le domaine nu.
- En-têtes de sécurité : `headers()` dans `frontend/next.config.js`.
- Données structurées (JSON-LD) : `frontend/lib/jsonld.tsx` (Organization, VideoGame, SoftwareApplication / CreativeWork).
- Variables d'environnement : `frontend/.env.example` (analytics uniquement), à recopier dans Netlify.
