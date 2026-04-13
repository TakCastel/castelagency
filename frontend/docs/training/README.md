# Formation IA Polinizz : brief et table des matières

## Pour qui est écrit ce cours ?

- **Futurs "vibe codeurs"** : vous apprenez en construisant des idées avec l’IA, vous voulez aller vite **sans** vous faire piéger par les bases (sécurité, données, qualité).
- **Développeurs en formation** : vous connaissez déjà un peu la programmation ; vous voulez une méthode **claire** pour intégrer l’IA dans un vrai projet (revue, tests, cadrage).
- **PO / PM** (Product Owner / Product Manager) : vous ne codez pas toute la journée, mais vous **spécifiez**, priorisez et validez ; vous devez comprendre **ce que l’IA change** côté risques, livrables et contenu (doc interne, **GEO**).
- **Stagiaire, nouvelle recrue ou autodidacte** : même parcours Markdown ; lisez d’abord le [chapitre 1 : Introduction](chapitres/01-introduction.md) (prérequis et cadre) et le [chapitre 2 : Sécurité](chapitres/02-securite-ia.md) **avant** d’utiliser massivement l’IA sur un dépôt ou des données réelles.

**Promesse pédagogique** : on explique les **termes au moment où ils apparaissent**, avec des **exemples** et des **cas concrets**. Les acronymes difficiles sont aussi dans le [glossaire (chapitre 12)](chapitres/12-glossaire.md), mais **chaque chapitre doit rester lisible seul** autant que possible.

**Style** : phrases courtes, encadrés *En bref* ou *Attention* surtout dans les chapitres à **risque** (sécurité, contenu trompeur), sections **Pour les PO / PM** quand le sujet est backlog ou critères d’acceptation, et des **étapes numérotées** : proche d’un cours du type OpenClassrooms / Site du Zéro (explication d’abord, jargon ensuite).

### Partager la formation : équipe ou organisme

Un **même corpus** sert développeurs, PO / PM et personnes en **montée en compétences**. Pas de version "secrète" du cours : tout est dans ce dossier. **Valeur prête à réemployer** pour une structure qui forme : [chapitre 8 : TP](chapitres/08-travaux-pratiques.md) (livrables + pistes), [chapitre 10 : Fin de parcours](chapitres/10-evaluation.md) (auto-évaluation, suites possibles, orientation), [chapitre 11 : QCM](chapitres/11-banque-qcm.md) (32 questions, corrigés en fin de fichier), et la [page de garde / feuille de route](page-de-garde-notion.md) pour les repères plus "organisation", barème indicatif et prudence RNCP / CPF. Les PO / PM peuvent s’appuyer sur les sections **Pour les PO / PM** et sur le chapitre 10 sans parcourir tous les détails d’IDE.

---

## Où sont les fichiers ?

Tout est dans ce dossier [`docs/training/`](.) : ce **README** (vue d’ensemble) + le dossier [`chapitres/`](chapitres/) (le cours chapitre par chapitre). Pour une **page d’accueil** qui regroupe les chapitres **1 → 12** avec un court résumé par chapitre : [page-de-garde-notion.md](page-de-garde-notion.md).

Le cours est maintenu **dans le dépôt** (Cursor, revues Git). Ce n’est **pas** du code secret du produit Polinizz : c’est du **pédagogique générique**.

---

## Brief pour l’agent Cursor

1. **Source de vérité** : `chapitres/*.md` dans l’ordre des fichiers (01 → 12). **Parcours lecteur** : aligner les formulations avec le [chapitre 1](chapitres/01-introduction.md) et le [chapitre 10](chapitres/10-evaluation.md) quand on parle de "fin de parcours" (noyau 1 à 9 + TP après 3 à 7 ; 10 à 12 selon besoin). **Convention de nommage** : `NN-sujet-kebab.md` : le préfixe `NN` est le numéro du chapitre ; le slug est un **thème court** (pas de préfixe "module", pas de titre de section recopié tel quel). Exemples : `03-assistants-code-ide.md`, `05-bmad-method.md`, `06-produit-ia-apis.md`.
2. Quand vous modifiez le cours : **garder le ton didactique** (définir avant d’abréger ; pas de liste de buzzwords sans phrase d’explication).
3. **Renvois entre chapitres** : dans le corps d’un chapitre *N*, éviter d’y résumer ou d’y "spoiler" les chapitres suivants. **Ne pas** ajouter en fin de fichier une ligne du type "chapitre précédent / suivant" : le parcours web fournit déjà ces liens (boutons). Exception : renvoi **en arrière** dans le corps (ex. sécurité) quand le lecteur a déjà vu le chapitre cité.
4. Mettre à jour cette table des matières si les titres ou durées changent. Chaque chapitre **1 → 9** et **12** se termine par un **mini-glossaire** local (quelques termes du chapitre). Le lexique complet est le [chapitre 12](chapitres/12-glossaire.md) : le citer dans le corps si utile, **sans** répéter après le mini-glossaire une file de liens vers ce chapitre (menu latéral + navigation). **Exceptions** : le [chapitre 10](chapitres/10-evaluation.md) (sortie de parcours, sans mini-glossaire) et le [chapitre 11](chapitres/11-banque-qcm.md) (banque QCM, pas de mini-glossaire).
5. **QCM** : [chapitres/11-banque-qcm.md](chapitres/11-banque-qcm.md) (**32** questions, dont **8** sécurité : possibilité de n’en noter **24**) ; repères d’organisation, de barème et prudence RNCP / CPF : [page-de-garde-notion.md](page-de-garde-notion.md). Le [chapitre 10](chapitres/10-evaluation.md) sert surtout de **sortie de parcours** côté apprenant.

---

## Table des matières

| Chapitre | Fichier | Durée indicative |
|----------|---------|------------------:|
| 1 : Introduction | [chapitres/01-introduction.md](chapitres/01-introduction.md) | ~30 min |
| 2 : Sécurité et données avec l’IA | [chapitres/02-securite-ia.md](chapitres/02-securite-ia.md) | ~1 h 10 |
| 3 : Développement assisté par IA (Cursor, Copilot, Claude Code) | [chapitres/03-assistants-code-ide.md](chapitres/03-assistants-code-ide.md) | ~1 h 35 |
| 4 : Prompter des agents et structurer du Markdown dans le dépôt | [chapitres/04-prompter-agents-markdown.md](chapitres/04-prompter-agents-markdown.md) | ~1 h |
| 5 : BMAD-METHOD (cadrage agile IA) | [chapitres/05-bmad-method.md](chapitres/05-bmad-method.md) | ~1 h 20 |
| 6 : Produit augmenté par l’IA (chat, APIs, intégration) | [chapitres/06-produit-ia-apis.md](chapitres/06-produit-ia-apis.md) | ~1 h 20 |
| 7 : Stratégie de visibilité (GEO) | [chapitres/07-geo.md](chapitres/07-geo.md) | ~1 h |
| 8 : Travaux pratiques (autonomes) | [chapitres/08-travaux-pratiques.md](chapitres/08-travaux-pratiques.md) | ~2 h 50 |
| 9 : Synthèse du parcours | [chapitres/09-synthese.md](chapitres/09-synthese.md) | ~25 min |
| 10 : Fin de parcours, auto-évaluation et suites possibles | [chapitres/10-evaluation.md](chapitres/10-evaluation.md) | ~15 min |
| 11 : Banque QCM (32 questions) | [chapitres/11-banque-qcm.md](chapitres/11-banque-qcm.md) | ~35 min |
| 12 : Glossaire (termes et acronymes) | [chapitres/12-glossaire.md](chapitres/12-glossaire.md) | (référence) |

**Durée totale indicative** : ~12 h au total, **TP inclus** (selon votre rythme et votre niveau de départ).

**Export PDF (plus tard)** : assembler les chapitres dans l’ordre ; mettre le **chapitre 12** en fin de volume ou en annexe "lexique".
