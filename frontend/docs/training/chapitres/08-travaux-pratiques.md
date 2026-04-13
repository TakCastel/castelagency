# Chapitre 8 : Travaux pratiques

Ce chapitre propose des **exercices autonomes** à faire dans **votre propre dépôt** (ou celui de votre équipe / formation). Il n’y a **pas** de "bon projet imposé" : vous **choisissez** à chaque fois une zone **réelle** de votre code, de votre site ou de votre doc. Chaque TP indique **ce que vous devez produire** et des **pistes** pour vous guider ; il n’y a **pas** de corrigé séparé : vous jugez vous-même si le livrable est complet au regard des critères.

**Comment travailler** : pour chaque TP, lisez d’abord le chapitre indiqué ; rédigez votre livrable dans un fichier texte, une issue ou une branche ; gardez une trace pour votre portfolio ou une revue en équipe.

| TP | Surtout aligné sur… | Durée indicative |
|----|---------------------|------------------:|
| 1 · Sécurité "audit express" | [Chapitre 2 : Sécurité](02-securite-ia.md) | ~30 min |
| 2 · Assistant : **petite feature** dans votre projet | [Chapitre 3 : Assistants de code](03-assistants-code-ide.md) | ~25 min |
| 3 · Doc & prompts pour **votre** repo | [Chapitre 4 : Prompter agents & Markdown](04-prompter-agents-markdown.md) | ~20 min |
| 4 · User stories sur **votre** périmètre | [Chapitre 5 : BMAD-METHOD](05-bmad-method.md) | ~25 min |
| 5 · GEO sur **votre** contenu | [Chapitre 7 : GEO](07-geo.md) | ~25 min |
| 6 · Capstone (synthèse) | Parcours **3 à 7** | ~45 min |

**Total indicatif du chapitre** : ~2 h 50 si vous réalisez les six TP.

---

## TP 1 · Sécurité : mini-audit sur votre projet

**Contexte** : [Chapitre 2 : Sécurité](02-securite-ia.md).

**À faire** sur un dépôt **que vous avez le droit d’analyser** (le vôtre, un fork, un projet de cours) :

1. **Checklist "audit express"** (10 à 15 lignes) : ce que vous vérifiez **avant** de généraliser l’IA (secrets, chat IDE, doc interne, dépendances, etc.). Pour chaque ligne : *oui / non / pas applicable* et, si *non*, **une** action corrective courte.  
   *Pistes de lignes* : absence de `.env` / `.pem` versionnés sur un dépôt public ; clés d’API chargées depuis l’environnement ou un coffre ; appels LLM via votre backend plutôt que depuis le client ; doc interne indexée avec les bons droits ; suivi des dépendances (alertes CVE) ; etc.

2. **Recherche de fuites dans l’arbre actuel** : décrivez **comment** vous avez cherché (outils : `rg`, `git grep`, interface de la forge, *secret scanning* si disponible) et **ce que vous avez trouvé** (ou "rien de critique" en listant les dossiers ou motifs inspectés).  
   *Motifs souvent utiles* : `API_KEY`, `SECRET`, `password`, `token`, `sk-`, `Bearer`, `PRIVATE KEY`, fichiers `.env`, `.env.local`, dossiers `credentials`.  
   **Important** : si vous trouvez une vraie clé, **ne la recopiez pas** dans votre livrable ; notez seulement l’emplacement (fichier ou règle générique) et l’action prévue (révocation, retrait du dépôt).

3. **Historique Git** : expliquez **comment** vous vérifieriez qu’un secret n’a pas été commité **dans le passé** puis retiré du fichier visible (ex. `git log -S'motif'` ou équivalent, historique d’un fichier sur la forge). Vous n’avez pas à lancer d’opération destructive sur le dépôt. Décrivez ce que vous feriez si vous trouviez une clé dans l’historique (rotation, révocation, procédure d’équipe).  
   *À retenir* : un dépôt "propre" aujourd’hui peut encore contenir un secret dans un **ancien** commit.

**Livrable** : un document (Markdown ou texte) qui couvre les **trois** points ci-dessus.

**Durée indicative** : ~30 min. **Niveau** : intermédiaire.

---

## TP 2 · Assistant de code : ajouter une petite feature dans votre projet

**Contexte** : [Chapitre 3 : Assistants de code](03-assistants-code-ide.md).

**À faire** : Choisissez **une** fonctionnalité **limitée** (quelques fichiers, un comportement clair) dans **votre** application ou bibliothèque : pas un refactor de tout le dépôt. Exemples **larges** :

- **Backend** : endpoint REST ou RPC ; validation d’un champ ; message d’erreur plus explicite ; journalisation structurée d’un cas limite.  
- **Frontend** : bouton ou état (désactivé / chargement) ; accessibilité (libellé, focus) ; extraction d’un sous-composant.  
- **Données** : requête ou migration **non destructive** (lecture + script documenté) ; index ou contrainte documentée.  
- **Qualité** : test ciblant un bug connu ; correction d’un warning linter récurrent.  
- **Outils** : étape CI ; script de build documenté.

**Livrable** (idéalement rédigé **avant** d’ouvrir l’assistant) :

1. **Périmètre** : une phrase **"fini quand..."** + liste des **fichiers ou dossiers** probables (même approximative).  
2. **Prompt** (ou séquence **explorer → plan → changement**) dans **votre** langage et **votre** stack.  
3. **Relecture** : liste de **au moins cinq** points que vous vérifierez dans le diff (sécurité, cas limites, nommage, tests, perf, etc.).  
4. *(Optionnel)* Si vous avez implémenté : lien vers la branche ou le diff, et **une** phrase sur ce que vous auriez fait différemment au prompt.

**Durée indicative** : ~25 min. **Niveau** : variable (restez **petit**).

---

## TP 3 · Markdown & agent : un fichier utile pour votre dépôt

**Contexte** : [Chapitre 4 : Prompter agents & Markdown](04-prompter-agents-markdown.md).

**À faire** : Créez ou complétez **un** fichier Markdown **dans votre projet** (ou sur une branche dédiée), **un seul** type parmi :

- Règle courte pour l’équipe (contributing, conventions, interdits).  
- **Spec** d’une feature à venir : objectifs, hors périmètre, critères d’acceptation testables (5 à 10 lignes au total pour ces blocs).  
- **Runbook** interne (5 à 8 étapes numérotées : déploiement, rollback, qui appeler).

Le fichier doit contenir au moins **deux titres** `##` et une structure lisible par un humain **et** par un assistant.

Puis rédigez **une** phrase de prompt qu’un collègue pourrait coller dans un assistant, du type : *"Utilise le fichier `@chemin/vers/fichier.md` comme référence pour ..."* (remplacez par votre chemin réel).

**Livrable** : le fichier Markdown (chemin dans le repo) + la phrase de prompt.

**Durée indicative** : ~20 min. **Niveau** : facile à intermédiaire.

---

## TP 4 · BMAD / produit : trois user stories sur votre sujet

**Contexte** : [Chapitre 5 : BMAD-METHOD](05-bmad-method.md).

**À faire** : Sans installer obligatoirement BMAD, rédigez **trois** user stories au format *En tant que / je veux / afin de* pour **une** brique produit **de votre choix** dans un logiciel que vous connaissez (perso, pro, cours). Exemples **larges** de briques : compte utilisateur, facturation, recherche, tableau de bord, admin, import, notifications, etc.

Pour **chaque** story : au moins **un** critère d’acceptation **testable** (observable ou vérifiable par un test).  
Terminez par **4 à 6** tâches techniques possibles pour une itération (sans ordre imposé).

**Livrable** : le texte des trois stories + critères + liste de tâches.

**Durée indicative** : ~25 min. **Niveau** : intermédiaire.

---

## TP 5 · GEO : une page ou doc à vous

**Contexte** : [Chapitre 7 : GEO](07-geo.md).

**À faire** : Choisissez **une** URL ou **un** document public **de votre** site, **de** votre doc utilisateur ou **d**’un projet fictif **détaillé** (sans y coller de secrets). Proposez :

1. Un **titre** et un **plan** (H2 / H3) orienté **questions utilisateur** concrètes.  
2. **Deux** sources ou "preuves" que vous consulteriez **avant** publication (indiquez seulement le **titre ou le thème** + le **type** de source : doc officielle, étude, blog fournisseur, etc. : pas besoin de copier le contenu).  
3. *(Optionnel)* Un type de donnée structurée `schema.org` pertinent (`FAQPage`, `HowTo`, `Article`…) et **en une phrase** pourquoi il correspond à votre plan.

**Livrable** : titre + plan + deux sources (format libre) + optionnel schema.

**Durée indicative** : ~25 min. **Niveau** : intermédiaire.

---

## TP 6 · Capstone : votre produit et l’IA

**Contexte** : Synthèse des chapitres **3 à 7**.

**À faire** : Rédigez **une page de synthèse** (format libre) sur un produit **réel ou fictif crédible**.

Vous pouvez suivre ce plan simple :

1. **Présentez le produit** en quelques lignes : pour **qui**, pour **quel problème**, et avec **3 à 5 fonctionnalités** principales.  
2. **Choisissez deux fonctionnalités** parmi ces 3 à 5, puis indiquez pour chacune :  
   - où l’**IA** pourrait aider (assistant, modération, NL→JSON, recherche documentaire, etc.) ;  
   - **un risque principal** à anticiper (coût en tokens, données sensibles, qualité de sortie, conformité, etc.).  
3. **Ajoutez une idée de communication** : par quel **canal** vous parleriez de ce produit, et avec quel **message général**.

**Livrable** : une page de synthèse qui regroupe ces trois blocs.

**Durée indicative** : ~45 min. **Niveau** : avancé.

---

## Mini-glossaire du chapitre 8

| Terme | Sens ici |
|-------|----------|
| **Livrable** | Ce que vous produisez pour clore le TP (fichier, texte, branche selon l’énoncé). |
| **Capstone** | TP final qui recolle produit, IA et communication sur **votre** cas. |
| **Périmètre** | Limite claire de ce que vous demandez à l’assistant ou du travail à faire (évite le refactor infini). |

