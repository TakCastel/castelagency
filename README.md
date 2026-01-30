# Castel Agency

Site web de l'agence Castel Agency, avec un backend Directus + un frontend Next.js.

## Structure du projet

- **`backend/`** : Configuration backend (Directus + PostgreSQL)
  - `uploads/` : Fichiers uploadés par Directus
  - `extensions/` : Extensions Directus
  - `init-collections.js` : Script d'initialisation des collections
  
- **`frontend/`** : Code source du frontend Next.js
  - App Router (`app/`)
  - Ce dossier est monté en volume dans le conteneur Docker pour le watch

- **`docker-compose.yml`** : Orchestration de tous les services (à la racine)

## Démarrage rapide

Tous les services sont dockerisés et peuvent être lancés d'un coup depuis la racine :

```bash
# Depuis la racine du projet
npm run dev
# ou
docker-compose up --build
```

### Variables d’environnement

Crée un fichier `.env` à la racine (utilisé par Docker Compose) :

```bash
cp .env.example .env
npm run dev
```

Les services seront accessibles sur :
- **Frontend Next.js** : http://localhost:3000 (avec watch activé)
- **Directus Admin** : http://localhost:8055

**Note** : Le frontend watch automatiquement les modifications dans `frontend/` grâce au volume monté.

## Collections Directus recommandées

Après la première connexion à Directus, créez les collections suivantes :

- **services** : Services proposés par l'agence
- **projects** : Projets réalisés
- **partners** : Partenaires
- **contacts** : Messages de contact
- **pages** : Contenu des pages (agence, méthodologie, etc.)

## Technologies utilisées

- **Next.js** : Framework React pour le frontend
- **shadcn/ui + Tailwind CSS** : Composants UI et styles
- **Directus** : CMS headless pour la gestion de contenu
- **TypeScript** : Typage statique
- **Docker** : Containerisation de tous les services

## Développement

### Tous les services avec Docker (recommandé)

Depuis la racine du projet :

```bash
npm run dev              # Démarrer tous les services avec watch
npm run down             # Arrêter tous les services
npm run logs             # Voir tous les logs
npm run logs:frontend     # Logs du frontend uniquement
npm run logs:backend     # Logs de Directus uniquement
npm run restart:frontend # Redémarrer uniquement le frontend
```

Ou avec docker-compose directement :

```bash
docker-compose up --build    # Démarrer avec rebuild
docker-compose down          # Arrêter
docker-compose logs -f       # Voir les logs
```

### Frontend en local (sans Docker)

Si vous préférez développer le frontend en local :

```bash
cd frontend
npm install
npm run dev
```

**Note** : Assurez-vous que le backend (Directus) tourne pour que le frontend puisse s'y connecter.

## Notes

- Assurez-vous que les variables d'environnement sont correctement configurées
- Pour la production, configurez les URLs et les secrets dans les fichiers `.env`
- Le watch du frontend fonctionne grâce au volume monté dans Docker
