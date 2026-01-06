/**
 * Script d'initialisation des collections Directus
 * À exécuter après la première connexion à Directus
 * 
 * Usage: node init-collections.js
 * 
 * Note: Ce script nécessite que Directus soit démarré et accessible
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@castel-web.fr';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

// Ce script est un guide - les collections doivent être créées manuellement via l'interface Directus
// ou via l'API Directus avec authentification

console.log(`
╔══════════════════════════════════════════════════════════════╗
║  Initialisation des collections Directus                     ║
╚══════════════════════════════════════════════════════════════╝

Ce script est un guide. Pour créer les collections, vous avez deux options :

1. Via l'interface Directus (recommandé pour la première fois) :
   - Connectez-vous à ${DIRECTUS_URL}
   - Allez dans Settings > Data Model
   - Créez les collections suivantes :
     * projects
     * blog_posts
     * services
     * partners
     * contacts

2. Via l'API Directus (nécessite un token d'authentification)

Collections à créer :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 projects
   - title (string, required)
   - slug (string, unique)
   - description (text)
   - content (text, rich text)
   - image (file/image)
   - gallery (files)
   - client (string)
   - tags (json/tags)
   - date_start (date)
   - date_end (date)
   - status (string: draft|published|archived)
   - sort (integer)

📝 blog_posts
   - title (string, required)
   - slug (string, unique)
   - excerpt (text)
   - content (text, rich text)
   - featured_image (file/image)
   - author (m2o -> directus_users)
   - categories (json/tags)
   - tags (json/tags)
   - date_published (timestamp)
   - status (string: draft|published|archived)
   - seo_title (string)
   - seo_description (text)

💼 services
   - title (string, required)
   - slug (string, unique)
   - description (text)
   - content (text, rich text)
   - icon (string)
   - image (file/image)
   - tags (json/tags)
   - price_starting_from (decimal)
   - featured (boolean)
   - sort (integer)
   - status (string: active|inactive)

🤝 partners
   - name (string, required)
   - logo (file/image)
   - description (text)
   - website (string)
   - role (string)
   - sort (integer)

📧 contacts
   - name (string, required)
   - email (string, required)
   - subject (string, required)
   - message (text, required)
   - status (string: new|read|replied|archived)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Consultez le fichier directus-schema.json pour plus de détails.

`);

