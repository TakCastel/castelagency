# Chapitre 4 : Prompter des agents et structurer du Markdown dans le dépôt

Vous avez déjà vu **comment** dialoguer avec un assistant dans un IDE : **périmètre**, **contexte utile**, **relecture du diff**.

Ce chapitre ajoute la couche qui manque souvent au début : **où** mettre l’information pour qu’une autre session avec un agent IA, ou un autre humain, puisse reprendre le travail sans repartir de zéro.

Autrement dit : on passe du simple **chat assisté** à une forme de **développement piloté par l’IA**.

Vous verrez parfois l’expression **AIDD** (*AI-Driven Development*, développement piloté par l’IA) : l’idée n’est pas de laisser une IA décider à votre place ; l’idée est de faire du **dépôt Git** la mémoire de travail partagée entre humains et agents, au lieu de laisser toute l’intelligence du projet se perdre dans des conversations.

**Plus loin**, un cadre plus outillé avec **BMAD-METHOD** complétera tout cela. Ici, on reste sur les **principes génériques** valables dans n’importe quel dépôt versionné.

Un bon usage des agents ne tient pas à un « super prompt » : il tient à un **objectif unique**, des **docs versionnées**, des **points d’entrée clairs** (`AGENTS.md`, règles projet, `@fichier`) et une **relecture humaine** avant le tour suivant.

---

## 1. Une session avec un agent IA bien cadrée

Une **session avec un agent IA**, c’est une **session de travail** où l’IA doit **agir** sur le projet : lire, proposer, modifier, tester, documenter. Ce n’est plus seulement une réponse explicative.

Pour qu’une session soit propre, il faut pouvoir répondre très simplement à quelques questions : **qui** agit, **sur quoi**, **à partir de quelles sources**, **dans quel périmètre**, **avec quels interdits**, et **sous quelle forme** on attend le résultat. Tant que ces points ne sont pas clairs, l’agent compense en devinant, et c’est précisément là que les écarts commencent.

Exemple de cadrage court :

> "Tu es le développeur frontend de ce projet. Mission : implémenter la FAQ de la page devis. Lis `@docs/features/devis.md` et `@docs/architecture/frontend.md`. Ne touche pas au backend. Si une route API doit changer, arrête-toi et propose la liste des fichiers concernés. Je veux un plan court, puis le diff."

Les principes des **assistants dans l’IDE** restent vrais ici, avec une exigence supplémentaire : **plus l’agent agit, plus il faut borner son axe de travail**.

---

## 1.1. Quatre réflexes transverses

**Nouvelle session** quand le sujet change ou que le fil se salit : repartir à zéro bat souvent une longue conversation à réparer.

**Objectif vérifiable** : test qui passe, lint propre, diff dans le périmètre — la réussite doit être observable, pas seulement « ça a l’air bien ».

**La première bonne sortie peut être du texte** : plan, checklist, liste de fichiers à relire — c’est souvent ce qui évite de coder dans la mauvaise direction.

**Garde-fous explicites** : lire des fichiers ou renommer une variable n’a pas le même poids que toucher à l’**auth**, aux **migrations** ou au **déploiement**. Tout ce qui bouge périmètre, données, sécurité ou prod mérite un **go** humain clair.

---

## 2. Pourquoi le Markdown sert de mémoire partagée

Les assistants lisent surtout du **texte structuré**. Le **Markdown** (`.md`) reste l’un des meilleurs formats pour cela : il est lisible par un humain, diffable dans Git, facile à relier à d’autres fichiers, et assez simple pour rester à jour.

Dans une logique **AIDD**, le Markdown sert à **déporter la mémoire du chat vers le dépôt**. Sans cette discipline, le besoin métier reste dans un vieux fil de discussion, l’agent suivant reconstruit le contexte de travers, deux personnes croient appliquer la même règle alors qu’elles n’ont pas lu la même version, et la documentation dérive peu à peu du code réel.

Avec cette discipline, au contraire, une **spec** borne une feature, une **doc d’architecture** borne les choix techniques, un **runbook** borne l’exploitation, et une **règle de dépôt** borne les conventions. La session suivante ne repart donc pas d’un souvenir imprécis, mais de **fichiers versionnés**.

Ce qui aide vraiment, ce n’est pas d’écrire longtemps : c’est d’écrire de manière **repérable**. Des titres hiérarchiques donnent un rôle clair à chaque bloc, des listes courtes servent à rendre visibles des critères, des étapes ou des risques, les tableaux simples permettent de comparer sans bavardage, et les liens relatifs relient naturellement la spec, l’ADR, l’architecture et l’exploitation.

À l’inverse, un seul pavé de texte sans structure, plusieurs fichiers qui disent presque la même chose, une maquette non commentée comme unique spec, ou un nom de fichier flou du type `notes-final-v2-ok.md` créent du bruit au lieu de créer du contexte.

---

## 2.1. Comment rédiger une doc que l’agent utilisera vraiment

Une bonne doc "pour agent" ressemble à une **consigne opérable** pour un humain pressé. Elle commence par expliquer **à quoi sert le fichier** et **quand il faut le lire**. Elle donne ensuite des sections dont le titre dit clairement leur rôle : **Objectifs**, **Interdits**, **Critères d’acceptation**, **Fichiers concernés**, **Références**.

Elle préfère des faits vérifiables à des formules vagues : des chemins, des routes, des composants, des messages attendus, des commandes utiles. Elle distingue aussi ce qui relève du **constat** et ce qui relève de la **décision**, puis elle indique si le document est encore frais ou s’il faudra le revoir si telle route, telle feature ou telle architecture change. Enfin, elle prépare le passage de relais en disant explicitement quel autre document doit être lu avant ou après.

### 2.1.1. Modèle minimal de doc exploitable

```markdown
# Feature : Checkout

## Qui lit ce fichier
À lire avant toute modification du tunnel de paiement.

## Objectifs
- ...

## Hors périmètre
- ...

## Fichiers ou zones probables
- `frontend/app/checkout/...`
- `frontend/components/checkout/...`

## Critères d’acceptation testables
- [ ] ...
- [ ] ...

## Lire ensuite
- [Architecture frontend](../architecture/frontend.md)
- [Stratégie E2E](../testing/e2e-strategy.md)

## Dernière revue
2026-04-13 - À revoir si le flux de paiement change.
```

Le point important est le suivant : une doc utile ne dit pas seulement **ce qu’est** le sujet ; elle dit aussi **comment s’en servir** dans une prochaine session.

---

## 2.2. Ce que Cursor lira vraiment

Un point pratique est souvent mal compris au début : **un fichier Markdown présent dans le dépôt n’est pas automatiquement lu avant chaque modification**.

Dans Cursor, vous avez plusieurs mécanismes complémentaires.

| Mécanisme | Usage typique | Fiabilité pour une tâche donnée |
|-----------|----------------|---------------------------------|
| **`AGENTS.md`** | Instructions simples et stables, globales ou par sous-dossier | Bonne pour les règles persistantes |
| **`.cursor/rules/`** | Règles plus fines, parfois ciblées par type de fichier ou zone du code | Très bonne si la règle est bien configurée |
| **`@fichier` dans le chat** | Forcer la lecture d’une spec, d’un runbook, d’une ADR, d’un composant | La plus fiable pour le tour courant |
| **`@Docs`** | Interroger une documentation indexée, y compris hors du dépôt | Utile quand la source n’est pas un simple fichier du repo |
| **README / index docs** | Orienter la navigation dans le dépôt | Utile, mais insuffisant seul |

### 2.2.1. AGENTS.md

`AGENTS.md` est un **Markdown simple** pour donner des instructions à l’agent. Il peut vivre à la racine du projet, mais aussi dans des sous-dossiers. En pratique, un `AGENTS.md` racine sert souvent à porter les conventions générales du dépôt, tandis qu’un `frontend/AGENTS.md` ou un `backend/AGENTS.md` sert à préciser des règles plus locales.

Son grand intérêt est sa simplicité : il est lisible par toute l’équipe, facile à maintenir, et très utile pour écrire noir sur blanc des consignes du type "si vous touchez cette zone, lisez aussi tel fichier".

Concrètement, placez-le :

- à la **racine du dépôt** pour les règles globales ;
- dans un **sous-dossier important** comme `frontend/`, `backend/` ou `app/` pour des règles locales ;
- au plus près d’une zone sensible si vous voulez que les consignes ne s’appliquent qu’à cette partie du projet.

Exemple d’arborescence :

```bash
AGENTS.md
docs/
  README.md
  architecture/
    frontend.md
  testing/
    e2e-strategy.md
frontend/
  AGENTS.md
  app/
    AGENTS.md
  components/
    AGENTS.md
backend/
  AGENTS.md
  api/
    AGENTS.md
```

Exemple réel de `AGENTS.md` à la racine :

```markdown
# Frontend - Coding Agent Guide
> **Stack**: Next.js, TypeScript, Tailwind CSS
> **Pattern**: App Router, composants réutilisables, logique métier isolée

## Overview
Ce module porte les pages, composants et interactions du frontend.
Il consomme les données du backend, applique les conventions d’interface du projet et centralise l’expérience utilisateur côté web.

## Architecture
Les pages vivent dans `frontend/app/`.
Les composants réutilisables vivent dans `frontend/components/`.
Avant une modification importante, lire `docs/README.md`, puis `docs/architecture/frontend.md`.

## Code Standards
- Respecter les conventions de nommage déjà présentes dans le dossier touché.
- Réutiliser les composants existants avant d’en créer un nouveau.
- Garder les imports et la structure de fichier cohérents avec les exemples du projet.
- Signaler toute gestion d’erreur ou de chargement manquante sur une vue utilisateur.

## Common Patterns
Les pages composent des sections et délèguent le rendu réutilisable à des composants dédiés.
Les changements larges doivent rester bornés : si une API ou un contrat de données doit changer, arrêter la session et proposer un plan.

## Testing Requirements
- Vérifier le comportement visible pour l’utilisateur.
- Contrôler les cas de chargement, d’erreur et d’état vide si le sujet les concerne.
- Lancer les commandes frontend prévues par le projet avant de conclure.

## Security Considerations
- Ne jamais exposer de secret, token ou donnée sensible dans l’interface ou les logs.
- Valider les entrées côté serveur si une route ou une soumission est touchée.
- Signaler tout impact potentiel sur l’authentification, les permissions ou les données personnelles.
```

### 2.2.2. Cursor Rules

Les règles de projet dans `.cursor/rules/` deviennent intéressantes quand vous voulez aller plus loin que la simple consigne globale. Elles permettent d’avoir une règle toujours appliquée, une règle attachée seulement à certains fichiers, une règle activée manuellement, ou une règle que l’agent choisit de charger selon sa description.

C’est particulièrement utile pour des besoins ciblés, par exemple imposer un pattern sur `frontend/app/**`, rappeler la validation des entrées sur les routes API, ou forcer la relecture d’une stratégie de test dès que quelqu’un touche les tests E2E.

Comme pour toute bonne doc d’équipe, ces règles gagnent à rester **courtes** et **ciblées**. Mieux vaut renvoyer vers un fichier de référence ou un exemple canonique que recopier toute l’architecture ou tout le guide de style dans une seule règle.

Concrètement, ce dossier se place à la **racine du projet** :

```bash
.cursor/
  rules/
    project-standards.mdc
    frontend-patterns.mdc
    api-validation.mdc
```

Exemple simple de règle :

```markdown
---
description: "Règles frontend pour les pages et composants"
globs:
  - "frontend/app/**/*.tsx"
  - "frontend/components/**/*.tsx"
alwaysApply: false
---

- Lire `docs/architecture/frontend.md` avant toute modification importante.
- Réutiliser les composants existants avant d’en créer un nouveau.
- Si une API doit changer, s’arrêter et proposer un plan.
- Lancer les vérifications frontend prévues par le projet avant de conclure.
```

Autrement dit, `AGENTS.md` peut exister à plusieurs niveaux du dépôt, tandis que `.cursor/rules/` reste en général un **point central** de configuration à la racine.

### 2.2.3. Mention explicite de fichier dans le chat

Pour une tâche précise, **le moyen le plus fiable reste la mention explicite** du ou des fichiers importants dans le prompt.

Exemple :

> "Lis `@docs/features/checkout.md` comme source de vérité, puis `@docs/testing/e2e-strategy.md` avant de proposer les tests."

### 2.2.4. @Docs

`@Docs` devient utile quand votre source ne vit pas dans un simple fichier du dépôt, ou quand la documentation est trop volumineuse pour être rattachée à la main à chaque échange. C’est un bon complément si vous indexez une doc externe, une base de connaissance ou une documentation technique déjà existante.

Autrement dit, la bonne logique n’est pas "mettre des Markdown quelque part et espérer". La bonne logique est de prévoir **où** l’agent doit aller lire selon le type de source : `AGENTS.md`, règle projet, `@fichier`, `@Docs`, ou index de documentation.

Pour les docs Markdown du projet lui-même, le plus simple est souvent de réserver un dossier **`docs/`** à la racine, puis de le découper par usage : `docs/features/`, `docs/architecture/`, `docs/testing/`, `docs/runbooks/`, `docs/adr/`. Cela rend les liens plus stables, la navigation plus simple, et les prompts plus faciles à écrire.

---

## 2.3. Comment relier plusieurs fichiers Markdown entre eux

Un dépôt bien documenté ne contient pas seulement de "bons fichiers". Il contient aussi une **chaîne de lecture** claire. En pratique, une règle globale dit **comment travailler**, une doc de domaine dit **comment cette zone fonctionne**, une spec de ticket dit **ce qui change cette fois-ci**, et un runbook ou une stratégie de test dit **comment vérifier ou exploiter** ce qui a été fait.

Ce n’est pas seulement une question d’ordre ; c’est une manière de rendre visible la logique du projet.

### 2.3.1. Exemple de hiérarchie utile

```bash
project/
  AGENTS.md
  .cursor/
    rules/
      project-standards.mdc
      frontend-patterns.mdc
  docs/
    README.md
    architecture/
      frontend.md
    testing/
      e2e-strategy.md
    features/
      checkout.md
    runbooks/
      deploy-staging.md
  frontend/
    AGENTS.md
    app/
      AGENTS.md
    components/
      AGENTS.md
  backend/
    AGENTS.md
```

### 2.3.2. Ce que chaque niveau apporte

Dans cet exemple, la **racine** porte vision et interdits (`AGENTS.md`, règles `.cursor`), **`docs/README.md`** oriente la lecture, **`docs/architecture`** et **`docs/testing`** bornent la technique et la QA, **`docs/features`** fixe la vérité d’une feature, et **`frontend/AGENTS.md`** rapproche les consignes du code touché. On sépare ainsi **stratégie**, **règles** et **besoin du jour** sans tout empiler dans un seul pavé.

### 2.3.3. Comment écrire les liens entre docs

Ajoutez des sections explicites comme :

```markdown
## Lire avant modification
- [Architecture frontend](../architecture/frontend.md)
- [Stratégie E2E](../testing/e2e-strategy.md)

## Si vous modifiez cette feature, mettre aussi à jour
- [Runbook support checkout](../runbooks/checkout-support.md)
- [ADR 007 - gestion des paiements](../adr/007-paiement.md)
```

Ainsi, vous n’espérez pas que l’agent "devine" la bonne lecture préalable : vous la **rendez visible**.

---

## 2.4. AGENTS.md ou Cursor Rules ?

Dans un petit projet ou au début, vous pouvez très bien démarrer avec un **`AGENTS.md`** simple. C’est souvent le bon choix quand vous voulez des consignes globales courtes, lisibles par tous, sans configuration particulière.

À l’inverse, **`.cursor/rules/`** devient plus intéressant dès que vous voulez charger certaines règles uniquement sur certaines zones du dépôt, composer plusieurs règles courtes, ou automatiser davantage l’apparition du contexte dans Cursor. Dans la pratique, beaucoup d’équipes combinent les deux : **`AGENTS.md`** pour la vision simple et durable, **`.cursor/rules/`** pour les cas fins et fréquents, et **`@fichier`** pour la tâche du jour.

---

## 3. Quatre types de docs utiles pour piloter les agents

Les chemins ci-dessous sont des **exemples**. Le plus important n’est pas le nom exact du dossier ; c’est la clarté du rôle du fichier.

### 3.1. Conventions d’équipe, doc stable

**But** : dire comment on travaille sur ce dépôt. Ce type de document vit souvent dans `AGENTS.md`, `docs/contributing.md` ou `.cursor/rules/project-standards.mdc`.

On y met la stack et les outils principaux, les conventions de nommage, les règles de tests et de revue, les interdits, et surtout les chemins de docs à consulter selon la zone touchée. C’est la doc qui évite de répéter les mêmes consignes à chaque nouveau fil.

**Exemple de prompt**

> "Applique les règles de `@AGENTS.md`. Mission : corriger le bug de formulaire du frontend. Périmètre : `frontend/app/**` et `frontend/components/**`. N’ouvre pas de chantier backend."

### 3.2. Spec de feature ou module

**But** : cadrer une implémentation sans mélanger tout le produit. Ce type de fichier se trouve souvent dans `docs/features/checkout.md` ou `specs/auth-v2.md`.

Il doit poser les objectifs, le hors périmètre, le comportement attendu, les critères d’acceptation, les fichiers probables et les docs à relire avant modification. C’est lui qui permet de dire à l’agent : "travaille ici, pas ailleurs".

**Exemple de prompt**

> "Lis `@docs/features/checkout.md` comme source de vérité. Implémente uniquement le comportement décrit. Si un fichier hors périmètre doit changer, arrête-toi et propose un plan."

### 3.3. Runbook ou procédure

**But** : décrire une séquence ordonnée, vérifiable, réutilisable. On le place souvent dans `docs/runbooks/deploy-staging.md` ou `docs/incidents/cache-redis.md`.

Il doit contenir les prérequis, les étapes, les critères de succès, le rollback et les contacts utiles. Là encore, l’idée n’est pas d’écrire beaucoup, mais d’écrire assez clairement pour que l’humain comme l’agent sachent dans quel ordre agir.

**Exemple de prompt**

> "Suis `@docs/runbooks/deploy-staging.md`. Ajoute l’étape de sauvegarde base de données avant la migration. Ne modifie pas le rollback sans me signaler pourquoi."

### 3.4. Stratégie de tests ou de QA

**But** : éviter que l’agent écrive des tests au hasard. Ce document peut vivre dans `docs/testing/e2e-strategy.md` ou `docs/testing/test-pyramid.md`.

Il explique ce qui relève du test unitaire, de l’intégration et du E2E, rappelle les outils et conventions, signale les cas critiques à couvrir, précise les zones à ne pas sur-tester et indique comment nommer, organiser puis exécuter les tests. Sans ce type de doc, un agent QA a vite fait de produire une couverture spectaculaire mais peu utile.

**Exemple de prompt**

> "Lis `@docs/testing/e2e-strategy.md` puis `@docs/features/devis.md`. Ajoute les tests E2E du parcours de devis sans dupliquer les helpers existants."

---

## 4. Exemples de prompts réutilisables par rôle

But : un **axe de travail** net pour l’agent, pas un roman.

### 4.1. QA E2E

```markdown
Tu es le QA de ce projet.

Mission : mettre en place les tests E2E du parcours de devis.

Lis d’abord :
- @docs/testing/e2e-strategy.md
- @docs/features/devis.md

Source de vérité : @docs/features/devis.md

Périmètre modifiable :
- tests/e2e/**
- helpers de test existants si nécessaire

Interdits :
- ne modifie pas le code métier sans me prévenir
- ne crée pas de doublon si des tests proches existent déjà

Sortie attendue :
1. plan de test court
2. liste des fichiers à créer ou modifier
3. implémentation
4. limites de couverture
```

### 4.2. Développeur frontend

```markdown
Tu es le développeur frontend de ce projet.

Mission : implémenter la section FAQ de la page devis.

Lis d’abord :
- @docs/features/devis.md
- @docs/architecture/frontend.md

Source de vérité : @docs/features/devis.md

Périmètre modifiable :
- frontend/app/**
- frontend/components/**

Interdits :
- pas de changement backend
- pas de modification du wording métier sans le signaler

Si une route API doit changer, arrête-toi et propose un plan.
```

### 4.3. Reviewer technique

```markdown
Tu es le reviewer technique de cette branche.

Mission : vérifier que l’implémentation respecte la spec checkout.

Lis d’abord :
- @docs/features/checkout.md
- @docs/testing/e2e-strategy.md

Je veux :
- les écarts entre spec et code
- les risques de régression
- les tests manquants
- les docs qui devraient être mises à jour
```

### 4.4. Rédacteur technique après implémentation

```markdown
Tu es le rédacteur technique du projet.

Mission : mettre à jour la documentation après l’implémentation de la feature devis.

Lis d’abord :
- @docs/features/devis.md
- @docs/architecture/frontend.md
- @docs/testing/e2e-strategy.md

Objectif :
- refléter le comportement réellement livré
- signaler les écarts entre spec initiale et code final
- proposer les liens croisés manquants
```

### 4.5. Agent avec stop condition

```markdown
Tu es l’agent en charge du bug du formulaire de contact.

Lis d’abord :
- @docs/features/contact.md
- @docs/architecture/frontend.md

Mission : corriger le bug sans élargir le périmètre.

Règle :
- si la correction demande une migration, une modification backend ou un changement de contrat API, arrête-toi
- explique alors pourquoi le périmètre initial est insuffisant
- propose les fichiers supplémentaires à relire
```

Même **squelette** partout : rôle, mission, docs, vérité, périmètre, interdits, sortie — simple et **dirigeant**.

---

## 5. Créer ou retoucher les `.md` "pour la suite"

Le vrai gain n’arrive pas quand un agent produit un joli texte.

Le vrai gain arrive quand ce texte **sert réellement au tour suivant**.

Avant une modification importante, il peut aussi être utile de demander d’abord un **plan**. Dans Cursor, ce plan peut devenir un artefact de travail à part entière : vous le relisez, vous le corrigez, vous le sauvegardez, puis vous vous en servez comme base pour l’implémentation. Cela rejoint exactement l’esprit de ce chapitre : plus l’axe de travail est visible dans un fichier relisible, moins la suite dépend d’une conversation floue.

| Situation | Gestes utiles |
|-----------|---------------|
| **Démarrage** | Laisser l’agent proposer un premier jet, puis corriger à la main le métier, le vocabulaire, les chiffres, les interdits. |
| **Mise à jour** | Modifier la doc dans la même branche que le code, puis relancer un agent avec la nouvelle version comme contexte. |
| **Refonte partielle** | Préserver les sections stables du document et ne réécrire que les blocs devenus faux. |
| **Nouveau sujet** | Créer un squelette court avant de demander une grosse implémentation. |

La boucle conseillée reste toujours la même : on **écrit ou met à jour la doc**, on la **relit** avec le bon regard métier ou technique, on la **versionne**, puis on relance une nouvelle session avec cette mémoire de travail à jour. Si le code livré diverge ensuite, il faut revenir mettre à jour la doc.

En AIDD, un changement de code important sans mise à jour de la doc est un problème pour les humains **et** pour les prochains agents.

Si le comportement change, la **spec** doit suivre ; si la structure ou les décisions changent, la **doc d’architecture** doit suivre ; si la couverture attendue change, la **stratégie de test** doit suivre ; et si l’exploitation change, le **runbook** doit suivre lui aussi.

---

## 6. Lien avec le cadrage produit BMAD-METHOD

Des cadres comme **BMAD-METHOD** s’appuient précisément sur cette logique : des **agents** et des **workflows** lisent et écrivent des artefacts versionnés (`PRD.md`, stories, architecture, suivi) pour éviter de tout recommencer à chaque discussion.

Le point commun avec ce chapitre n’est pas le nom des commandes. C’est la discipline : un workflow laisse une trace dans des fichiers, le workflow suivant repart de ces fichiers, la validation reste humaine, et le dépôt devient la mémoire de projet.

Le détail des **agents**, **skills** et dossiers `_bmad/` est dans la partie **BMAD-METHOD**, **plus loin** dans le parcours.

---

## 7. Erreurs fréquentes

Les erreurs les plus courantes reviennent toujours aux mêmes réflexes. Elles ne viennent pas d’un mauvais outil, mais d’un cadrage trop vague, d’une documentation trop pauvre, ou d’une confiance excessive dans le fait que l’agent "comprendra tout seul". Voici les pièges les plus fréquents.

- Mettre toute la logique métier dans le chat et presque rien dans le dépôt.
- Croire qu’une doc rangée dans `docs/` sera automatiquement lue par l’agent sans `AGENTS.md`, règle projet ou `@fichier`.
- Utiliser un prompt très long mais sans **source de vérité** claire.
- Écrire des règles trop longues ou trop générales au lieu de renvoyer vers des fichiers de référence.
- Demander "mets à jour la doc" sans préciser **quel fichier** ni **quelle structure**.
- Oublier les **stop conditions** : l’agent élargit alors la tâche sans garde-fou.
- Ne pas mettre à jour les docs après une implémentation qui a réellement changé le comportement.
- Lancer plusieurs objectifs dans le même fil en espérant malgré tout une sortie propre.

---

## 8. Pour les PO / PM

Les **critères d’acceptation testables** tiennent mieux dans un **fichier versionné** que dans un oral ou un chat : une spec floue pousse presque toujours l’agent à **inventer**.

Posez-vous en permanence les mêmes trois questions : **où est la source de vérité**, **où s’arrête le périmètre**, **quels documents actualiser après livraison**. À la revue, travaillez sur le **fichier** et le **diff**, pas sur une vieille conversation exportée.

Quand vous savez **qui porte quoi** (front, back, API, tests, accessibilité, ops), les demandes à l’agent deviennent précises ; vous pouvez alors cadrer une **session** par rôle et par document.

La doc est un **livrable** à part entière : propre, relue, versionnée. L’IA peut vous aider à structurer une spec, un schéma, des cas de test ou un Mermaid ; elle ne **décide** pas à votre place, elle vous aide à partager plus de **clarté**.

**Exemple accessibilité (léger)** : une spec de feature qui fait foi, plus par exemple `docs/accessibility/frontend-checklist.md` (clavier, focus, labels, contrastes, erreurs). La session consiste à lire la feature, la checklist et les composants concernés.

> "Tu es le référent accessibilité. Lis `@docs/features/devis.md`, `@docs/accessibility/frontend-checklist.md`, puis les composants de formulaire concernés. Ne change pas le wording métier. Signale les écarts WCAG probables, priorise les correctifs, mets à jour composants et tests si besoin. Si une règle produit doit être arbitrée, arrête-toi et liste les décisions à valider."

**Autres rôles** : même logique, **fichiers attachés** différents. Votre levier PO / PM : **terrain documenté** (qui relit quoi, quoi fait foi, quoi actualiser) — c’est ce qui rend l’**AIDD durable**, pas seulement rapide.

---

## 9. Checklist de fin de chapitre

- [ ] Je peux décrire une **session avec un agent IA** en six éléments : rôle, objectif, sources, périmètre, interdits, sortie  
- [ ] Je comprends qu’un fichier Markdown dans le dépôt n’est **pas** automatiquement lu juste parce qu’il existe  
- [ ] Je sais à quoi servent **`AGENTS.md`**, **`.cursor/rules/`** et **`@fichier`** dans Cursor  
- [ ] Je peux écrire une doc avec **titres stables**, **critères testables** et **liens vers les docs à relire ensuite**  
- [ ] Je sais relier une **règle globale**, une **doc de domaine** et une **spec de ticket**  
- [ ] Je peux écrire un prompt réutilisable pour un rôle comme **dev**, **QA**, **reviewer** ou **rédacteur technique**  
- [ ] Je comprends l’idée de **AIDD** : la mémoire du projet doit vivre dans le dépôt, pas seulement dans le chat  

---

## 10. Mini-glossaire du chapitre 4

| Terme | Sens ici |
|-------|----------|
| **Session avec un agent IA** | Un échange de travail cadré avec **un objectif unique**, des docs à lire, un périmètre et une sortie attendue. |
| **AIDD** | *AI-Driven Development* : développement piloté par l’IA, où les décisions et cadrages utiles vivent dans des **fichiers versionnés** relus par humains et agents. |
| **`AGENTS.md`** | Fichier Markdown d’instructions pour l’agent, global ou local à un sous-dossier. |
| **Règle projet Cursor** | Fichier dans **`.cursor/rules/`** pour donner un contexte persistant ou ciblé à l’agent. |
| **Point d’entrée** | Endroit où une doc a des chances réelles d’être lue : `AGENTS.md`, règle projet, `@fichier`, index de docs. |
| **Source de vérité** | Le fichier versionné qui fait référence pour une tâche donnée : spec, PRD, ADR, runbook, stratégie de test. |
| **Stop condition** | Condition qui oblige l’agent à s’arrêter et demander validation avant d’élargir le périmètre. |

