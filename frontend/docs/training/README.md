# Guide pratique IA Polinizz : brief et table des matières

## Pour qui est écrit ce cours ?

- **Futurs "vibe codeurs"** : vous apprenez en construisant des idées avec l’IA, vous voulez aller vite **sans** vous faire piéger par les bases (sécurité, données, qualité).
- **Développeurs en formation** : vous connaissez déjà un peu la programmation ; vous voulez une méthode **claire** pour intégrer l’IA dans un vrai projet (revue, tests, cadrage).
- **PO / PM** (Product Owner / Product Manager) : vous ne codez pas toute la journée, mais vous **spécifiez**, priorisez et validez ; vous devez comprendre **ce que l’IA change** côté risques, livrables et contenu (doc interne, **GEO**).
- **Stagiaire, nouvelle recrue ou autodidacte** : même parcours Markdown ; lisez d’abord l’**[introduction](chapitres/01-introduction.md)** (prérequis et cadre) et la **[sécurité et données](chapitres/02-securite-ia.md)** **avant** d’utiliser massivement l’IA sur un dépôt ou des données réelles.

**Promesse pédagogique** : on explique les **termes au moment où ils apparaissent**, avec des **exemples** et des **cas concrets**. Les acronymes difficiles sont aussi dans le **[glossaire](chapitres/12-glossaire.md)** (fin du parcours), mais **chaque partie doit rester lisible seule** autant que possible.

**Style** : phrases courtes, encadrés *En bref* ou *Attention* surtout dans les chapitres à **risque** (sécurité, contenu trompeur), sections **Pour les PO / PM** quand le sujet est backlog ou critères d’acceptation, et des **étapes numérotées** : proche d’un cours du type OpenClassrooms / Site du Zéro (explication d’abord, jargon ensuite).

### Contenu du dossier

Un **même corpus** sert développeurs, PO / PM et personnes en **montée en compétences**. Pas de version "secrète" du cours : tout est dans ce dossier. On y trouve notamment les **[travaux pratiques](chapitres/08-travaux-pratiques.md)** (livrables + pistes), la **[fin de parcours](chapitres/10-evaluation.md)** (auto-évaluation, suites possibles), la **[banque QCM](chapitres/11-banque-qcm.md)** (32 questions, corrigés en fin de fichier) et la [page de garde / feuille de route](page-de-garde-notion.md) (vue d’ensemble du parcours). Les PO / PM peuvent s’appuyer sur les sections **Pour les PO / PM** et sur la **fin de parcours** sans parcourir tous les détails d’IDE.

---

## Où sont les fichiers ?

Tout est dans ce dossier [`docs/training/`](.) : ce **README** (vue d’ensemble) + le dossier [`chapitres/`](chapitres/) (le cours chapitre par chapitre). Pour une **page d’accueil** qui regroupe les chapitres **1 → 12** avec un court résumé par chapitre : [page-de-garde-notion.md](page-de-garde-notion.md).

Le cours est maintenu **dans le dépôt** (Cursor, revues Git). Ce n’est **pas** du code secret du produit Polinizz : c’est du **pédagogique générique**.

---

## Brief pour l’agent Cursor

1. **Source de vérité** : `chapitres/*.md` dans l’ordre des fichiers (01 → 12). **Parcours lecteur** : aligner les formulations avec l’**[introduction](chapitres/01-introduction.md)** et la **[fin de parcours](chapitres/10-evaluation.md)** quand on parle de sortie du parcours (noyau jusqu’à la synthèse + TP après assistants, Markdown, BMAD, produit, GEO ; fin de parcours, QCM et glossaire selon besoin). **Convention de nommage** : `NN-sujet-kebab.md` : le préfixe `NN` est l’ordre du fichier ; le slug est un **thème court** (pas de préfixe "module", pas de titre de section recopié tel quel). Exemples : `03-assistants-code-ide.md`, `05-bmad-method.md`, `06-produit-ia-apis.md`.
2. Quand vous modifiez le cours : **garder le ton didactique** (phrases complètes ; définir avant d’abréger ; pas de liste de buzzwords sans explication). Éviter la **triple répétition** de la même idée en **objectifs**, **intro de section** et encadré *En bref* : fusionner, ou renvoyer à l’**introduction** / **[glossaire](chapitres/12-glossaire.md)** au lieu de redire.
3. **Renvois dans le corps (lecteur site)** : éviter les formulations du type « voir chapitre 7 » et les **liens Markdown** vers un autre fichier `NN-….md` dans le texte pédagogique ; préférer « vu précédemment », « plus loin », « partie GEO », etc. La navigation entre pages est assurée par l’UI (boutons). **Exception** : table des matières, README, page de garde. Dans le **[glossaire](chapitres/12-glossaire.md)**, pointer vers une **partie thématique** du parcours sans lien fichier. **Ne pas** ajouter en fin de chapitre une ligne « précédent / suivant ».
4. Mettre à jour cette table des matières si les titres ou durées changent. Chaque fichier **01 → 09** et **12** se termine par un **mini-glossaire** local. Le lexique complet est le **[glossaire](chapitres/12-glossaire.md)** : le mentionner dans le corps si utile en texte seul, **sans** répéter après le mini-glossaire une file de liens. **Exceptions** : **[fin de parcours](chapitres/10-evaluation.md)** (sans mini-glossaire) et **[banque QCM](chapitres/11-banque-qcm.md)** (pas de mini-glossaire).
5. **QCM** : [chapitres/11-banque-qcm.md](chapitres/11-banque-qcm.md) (**32** questions, dont **8** sécurité : possibilité de n’en noter **24**). La **[fin de parcours](chapitres/10-evaluation.md)** sert surtout de **sortie** côté apprenant.

---

## Table des matières

| Chapitre | Fichier | Durée indicative |
|----------|---------|------------------:|
| 1 : Introduction | [chapitres/01-introduction.md](chapitres/01-introduction.md) | ~35 min |
| 2 : Sécurité et données avec l’IA | [chapitres/02-securite-ia.md](chapitres/02-securite-ia.md) | ~50 min |
| 3 : Développement assisté par IA (Cursor, Copilot, Claude Code) | [chapitres/03-assistants-code-ide.md](chapitres/03-assistants-code-ide.md) | ~1 h 10 |
| 4 : Prompter des agents et structurer du Markdown dans le dépôt | [chapitres/04-prompter-agents-markdown.md](chapitres/04-prompter-agents-markdown.md) | ~1 h 05 |
| 5 : BMAD-METHOD (cadrage agile IA) | [chapitres/05-bmad-method.md](chapitres/05-bmad-method.md) | ~1 h 15 |
| 6 : Produit augmenté par l’IA (chat, APIs, intégration) | [chapitres/06-produit-ia-apis.md](chapitres/06-produit-ia-apis.md) | ~1 h 10 |
| 7 : Stratégie de visibilité (GEO) | [chapitres/07-geo.md](chapitres/07-geo.md) | ~1 h |
| 8 : Travaux pratiques (autonomes) | [chapitres/08-travaux-pratiques.md](chapitres/08-travaux-pratiques.md) | ~3 h |
| 9 : Synthèse du parcours | [chapitres/09-synthese.md](chapitres/09-synthese.md) | ~25 min |
| 10 : Fin de parcours, auto-évaluation et suites possibles | [chapitres/10-evaluation.md](chapitres/10-evaluation.md) | ~15 min |
| 11 : Banque QCM (32 questions) | [chapitres/11-banque-qcm.md](chapitres/11-banque-qcm.md) | ~45 min |
| 12 : Glossaire (termes et acronymes) | [chapitres/12-glossaire.md](chapitres/12-glossaire.md) | (référence) |

**Durée totale indicative** : ~11 h 20 au total, **TP inclus** (selon votre rythme et votre niveau de départ).

**Export PDF (plus tard)** : assembler les fichiers dans l’ordre ; mettre le **glossaire** en fin de volume ou en annexe "lexique".
