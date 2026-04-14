# Chapitre 8 : Travaux pratiques

Ce chapitre propose des **exercices autonomes** dans **votre dépôt** (ou celui de l’équipe / du guide pratique). Pas de projet imposé : vous **choisissez** une zone **réelle** du code, du site ou de la doc. Chaque TP dit **quoi livrer** et donne des **pistes** ; pas de corrigé séparé — vous validez le livrable contre les critères.

**Méthode** : suivre le cours dans l’ordre de la navigation ; rédiger chaque livrable (fichier, issue ou branche) ; garder une trace pour portfolio ou revue.

| TP | Notions principales | Durée indicative |
|----|---------------------|------------------:|
| 1 · Sécurité "audit express" | Secrets, dépôt, audit rapide | ~30 min |
| 2 · Assistant : **petite feature** dans votre projet | IDE, prompt, diff, tests | ~30 min |
| 3 · Doc & prompts pour **votre** repo | Markdown, agents, docs versionnées | ~25 min |
| 4 · User stories sur **votre** périmètre | Stories, cadrage type BMAD | ~30 min |
| 5 · GEO sur **votre** contenu | Contenu public, visibilité générative | ~25 min |
| 6 · Capstone (synthèse) | Mise en commun de ce que vous venez de pratiquer | ~40 min |

**Total indicatif du chapitre** : ~3 h si vous réalisez les six TP.

---

## TP 1 · Sécurité : mini-audit sur votre projet

**À faire** sur un dépôt **que vous avez le droit d’analyser** (le vôtre, un fork, un projet de cours) :

1. **Checklist audit express** (10–15 points) : vérifiez les bases avant généralisation IA (secrets, chat IDE, doc interne, dépendances). Pour chaque ligne : *oui/non/N.A.* + une action si non.

2. **Recherche de fuites** : décrivez votre méthode (`rg`, `git grep`, scanning…) et le résultat. Motifs typiques : `API_KEY`, `SECRET`, `token`, `Bearer`, `.env`. Si vous trouvez une clé réelle, ne l’exposez pas dans le livrable : indiquez l’emplacement et l’action (révocation/retrait).

3. **Historique Git** : expliquez comment vérifier qu’un secret n’a pas existé dans d’anciens commits (ex. `git log -S`). Si vous en trouvez un : rotation, révocation et procédure d’équipe.

**Livrable** : un document (Markdown ou texte) qui couvre les **trois** points ci-dessus.

**Durée indicative** : ~30 min. **Niveau** : intermédiaire.

---

## TP 2 · Assistant de code : ajouter une petite feature dans votre projet

**À faire** : Choisissez **une** fonctionnalité **limitée** (quelques fichiers, un comportement clair) dans **votre** application ou bibliothèque : pas un refactor de tout le dépôt. Exemples **larges** :

- **Backend** : endpoint REST ou RPC ; validation d’un champ ; message d’erreur plus explicite ; journalisation structurée d’un cas limite.  
- **Frontend** : bouton ou état (désactivé / chargement) ; accessibilité (libellé, focus) ; extraction d’un sous-composant.  
- **Données** : requête ou migration **non destructive** (lecture + script documenté) ; index ou contrainte documentée.  
- **Qualité** : test ciblant un bug connu ; correction d’un warning linter récurrent.  
- **Outils** : étape CI ; script de build documenté.

**Livrable** (idéalement rédigé **avant** d’ouvrir l’assistant) :

1. **Périmètre** : une phrase « fini quand… » + fichiers/dossiers probables.
2. **Prompt** : court, dans votre langage, avec une séquence simple (explorer, plan, changement).
3. **Relecture** : au moins 5 points de contrôle du diff (sécurité, cas limites, nommage, tests, perf).
4. *(Optionnel)* Lien vers branche/diff + une phrase de retour sur votre prompt.

**Durée indicative** : ~30 min. **Niveau** : variable (restez **petit**).

---

## TP 3 · Markdown & agent : un fichier utile pour votre dépôt

**À faire** : Créez ou complétez **un** fichier Markdown **dans votre projet** (ou sur une branche dédiée), **un seul** type parmi :

- Règle courte pour l’équipe (contributing, conventions, interdits).  
- **Spec** d’une feature à venir : objectifs, hors périmètre, critères d’acceptation testables (5 à 10 lignes au total pour ces blocs).  
- **Runbook** interne (5 à 8 étapes numérotées : déploiement, rollback, qui appeler).

Le fichier doit contenir au moins **deux titres** `##` et une structure lisible par un humain **et** par un assistant.

Puis rédigez **une** phrase de prompt qu’un collègue pourrait coller dans un assistant, du type : *"Utilise le fichier `@chemin/vers/fichier.md` comme référence pour ..."* (remplacez par votre chemin réel).

**Livrable** : le fichier Markdown (chemin dans le repo) + la phrase de prompt.

**Durée indicative** : ~25 min. **Niveau** : facile à intermédiaire.

---

## TP 4 · BMAD / produit : trois user stories sur votre sujet

**À faire** : Sans installer obligatoirement BMAD, rédigez **trois** user stories au format *En tant que / je veux / afin de* pour **une** brique produit **de votre choix** dans un logiciel que vous connaissez (perso, pro, cours). Exemples **larges** de briques : compte utilisateur, facturation, recherche, tableau de bord, admin, import, notifications, etc.

Pour **chaque** story : au moins **un** critère d’acceptation **testable** (observable ou vérifiable par un test).  
Terminez par **4 à 6** tâches techniques possibles pour une itération (sans ordre imposé).

**Livrable** : le texte des trois stories + critères + liste de tâches.

**Durée indicative** : ~30 min. **Niveau** : intermédiaire.

---

## TP 5 · GEO : une page ou doc à vous

**À faire** : Choisissez **une** URL ou **un** document public **de votre** site, **de** votre doc utilisateur ou **d**’un projet fictif **détaillé** (sans y coller de secrets). Proposez :

1. Un **titre** et un **plan** (H2 / H3) orienté **questions utilisateur** concrètes.  
2. **Deux** sources ou "preuves" que vous consulteriez **avant** publication (indiquez seulement le **titre ou le thème** + le **type** de source : doc officielle, étude, blog fournisseur, etc. : pas besoin de copier le contenu).  
3. *(Optionnel)* Un type de donnée structurée `schema.org` pertinent (`FAQPage`, `HowTo`, `Article`…) et **en une phrase** pourquoi il correspond à votre plan.

**Livrable** : titre + plan + deux sources (format libre) + optionnel schema.

**Durée indicative** : ~25 min. **Niveau** : intermédiaire.

---

## TP 6 · Capstone : votre produit et l’IA

**À faire** : Rédigez **une page de synthèse** (format libre) sur un produit **réel ou fictif crédible**.

Vous pouvez suivre ce plan simple :

1. **Présentez le produit** en quelques lignes : pour **qui**, pour **quel problème**, et avec **3 à 5 fonctionnalités** principales.  
2. **Choisissez deux fonctionnalités** parmi ces 3 à 5, puis indiquez pour chacune :  
   - où l’**IA** pourrait aider (assistant, modération, NL→JSON, recherche documentaire, etc.) ;  
   - **un risque principal** à anticiper (coût en tokens, données sensibles, qualité de sortie, conformité, etc.).  
3. **Ajoutez une idée de communication** : par quel **canal** vous parleriez de ce produit, et avec quel **message général**.

**Livrable** : une page de synthèse qui regroupe ces trois blocs.

**Durée indicative** : ~40 min. **Niveau** : avancé.

---

## Mini-glossaire du chapitre 8

| Terme | Sens ici |
|-------|----------|
| **Livrable** | Ce que vous produisez pour clore le TP (fichier, texte, branche selon l’énoncé). |
| **Capstone** | TP final qui recolle produit, IA et communication sur **votre** cas. |
| **Périmètre** | Limite claire de ce que vous demandez à l’assistant ou du travail à faire (évite le refactor infini). |

