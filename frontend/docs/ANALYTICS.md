# Analytics – Google Tag Manager & Google Analytics 4

Ce document décrit la mise en place du consentement cookies, de Google Tag Manager (GTM) et du suivi des événements sur le site Studio Castel.

## 1. Consentement cookies (RGPD)

- **Cookie** : `studio-castel-consent`
- **Valeurs** : `necessary` (refus) ou `necessary|analytics` (acceptation)
- **Durée** : 12 mois

Le bandeau s’affiche tant qu’aucun choix n’a été enregistré. GTM (et donc GA4) ne sont chargés **qu’après** acceptation.

## 2. Variables d’environnement

Dans `frontend/.env.local` (ou `.env`) :

```env
NEXT_PUBLIC_GTM_ID=GTM-NTM77CJH
```

(Conteneur GTM Studio Castel. Le script chargé est le même que celui fourni par l’interface GTM.)

## 3. Configuration Google Tag Manager

1. Le conteneur utilisé est **GTM-NTM77CJH** (défini via `NEXT_PUBLIC_GTM_ID`).
2. Dans GTM, ajoute une **balise Google Analytics: GA4 Configuration** :
   - Type : GA4 Configuration
   - ID de mesure : ton ID GA4 (format `G-XXXXXXXXXX`)
   - Déclencheur : « All Pages » (ou « Consent Initialization – analytics » si tu gères le consentement côté GTM).

Le site pousse déjà les événements dans `dataLayer`. Tu peux créer des **balises GA4 Event** dans GTM pour les récupérer.

## 4. Événements envoyés au dataLayer

| Événement            | Quand il est envoyé | Variables utiles |
|-----------------------|---------------------|------------------|
| `page_view`           | À chaque changement de page (SPA) | `page_path`, `page_title` |
| `devis_page_view`     | Visite de la page /devis | `page_path` |
| `devis_submitted`     | Formulaire devis envoyé avec succès | `devis_project_type`, `devis_budget` |
| `cta_click`           | Clic sur un CTA (Devis, etc.) | `cta_link_name`, `cta_link_url`, `cta_link_location` (navbar, footer, floating) |
| `nav_click`           | Clic sur un lien du menu | `nav_link_name`, `nav_link_url` |
| `outbound_click`      | Clic WhatsApp, réseaux sociaux | `outbound_link_name`, `outbound_link_url` |

### Exemples de configuration dans GTM

- **Balise GA4 – page_view** : Déclencheur « Custom Event » = `page_view`, variables `page_path` / `page_title` depuis le dataLayer.
- **Balise GA4 – devis_submitted** : Déclencheur « Custom Event » = `devis_submitted`, envoyer en événement GA4 avec paramètres `project_type` et `budget` si besoin.
- **Balise GA4 – cta_click** : Déclencheur « Custom Event » = `cta_click`, paramètres `link_name`, `link_url`, `link_location`.

Tu peux aussi utiliser des **Variables de couche de données** dans GTM pour lire `cta_link_name`, `devis_project_type`, etc.

## 5. Ce qui est mesuré côté site

- **Pages vues** : chaque page (y compris changement de route sans rechargement).
- **Page devis** : nombre de visites sur `/devis`.
- **Demandes de devis** : nombre de formulaires envoyés avec succès (+ type de projet et budget si tu les envoies en paramètres).
- **Clics** : boutons « Demander un devis » (navbar, footer), lien « Devis », liens du menu, liens footer, CTA WhatsApp, liens réseaux sociaux (LinkedIn, Instagram, GitHub, Twitch).

Si `NEXT_PUBLIC_GTM_ID` n’est pas défini, le bandeau cookie s’affiche toujours mais GTM n’est pas chargé (aucun script tiers).
