# Chapitre 11 : Banque d’évaluation QCM

## Contenu de la banque

| Bloc | Chapitre(s) | Questions | Rôle |
|------|-------------|-----------:|------|
| **Assistants, agents et Markdown** | [3 : Assistants de code](03-assistants-code-ide.md), [4 : Markdown & agents](04-prompter-agents-markdown.md) | 8 (C1 à C8) | IDE, périmètre, docs versionnées, `AGENTS.md`, `@fichier`, stop conditions. |
| **Cadrage, BMAD et synthèse** | [5 : BMAD-METHOD](05-bmad-method.md), [9 : Synthèse](09-synthese.md) | 8 (B1 à B8) | stories, critères d’acceptation, DoD, habitudes de travail, vérification. |
| **Produit IA, APIs et GEO** | [6 : Produit IA & APIs](06-produit-ia-apis.md), [7 : GEO](07-geo.md) | 8 (G1 à G8) | backend, JSON, RAG, coûts, `n8n`, SEO / GEO, sources. |
| **Fondamentaux et sécurité** | [1 : Introduction](01-introduction.md), [2 : Sécurité](02-securite-ia.md) | 8 (S1 à S8) | LLM, ordre du parcours, vibe coding, secrets, SQL, droits, historique Git. |

**Total : 32 questions**, une seule bonne réponse par question. Les **énoncés** seuls sont dans les sections **Module** ci-dessous ; les **réponses** (lettre correcte + explication) sont **à la fin** du fichier, après une ligne de séparation. Les lettres correctes sont **mélangées** avec une répartition équilibrée entre **A**, **B**, **C** et **D** sur l’ensemble de la banque.

**Hors banque actuelle** (à évaluer autrement) : les [travaux pratiques du chapitre 8](08-travaux-pratiques.md) et la mise en situation réelle sur votre dépôt ou votre produit. Le [chapitre 10](10-evaluation.md) sert surtout à l’orientation de fin de parcours, pas à un contrôle théorique supplémentaire.

**Feuille de réponses** : pour chaque question, noter la lettre **A, B, C ou D** sur une feuille à part ou dans un tableur, sans regarder les corrigés tant que l’épreuve n’est pas terminée.

**Barème suggéré** : **1 point par bonne réponse** sur les questions **retenues** par l’organisme. Pour un repère d’intégration dans une grille sur **100** points : voir la [feuille de route](/formation-ia/feuille-de-route). Si les questions de sécurité sont **notées** dans le QCM, éviter de **doubler** exactement les mêmes critères dans un autre volet d’évaluation.

**Seuils indicatifs** (à adapter) :

- **32 questions** : **23 / 32** (~72 %) ou **24 / 32** (75 %).  
- **24 questions** (si vous ne retenez qu’une partie de la banque) : **17 / 24** (~71 %) ou **18 / 24** (75 %).

---

## Module Assistants, agents et Markdown : 8 questions

### Question C1

Un assistant de code intégré à l’IDE ne "sait" pas automatiquement :

- **A)** La syntaxe du langage si le fichier lui est visible
- **B)** Ce que vous n’avez pas explicité dans le ticket, la spec ou le prompt
- **C)** Qu’un diff devra être relu humainement
- **D)** Que le projet a des conventions locales

### Question C2

Dans une **session avec un agent IA** bien cadrée, lequel de ces ensembles est le plus proche du cadre attendu ?

- **A)** Une humeur, une stack, une date de livraison, un GIF
- **B)** Un seul mot-clé, puis "débrouille-toi"
- **C)** Un historique de chat très long sans source de vérité
- **D)** Un rôle, une mission, des sources à lire, un périmètre, des interdits et une sortie attendue

### Question C3

Pourquoi le **Markdown** est-il présenté comme une bonne mémoire partagée pour les agents et l’équipe ?

- **A)** Parce qu’il est lisible, versionnable, diffable et facile à relier à d’autres fichiers
- **B)** Parce qu’il force automatiquement tous les outils à lire tous les fichiers du dépôt
- **C)** Parce qu’il remplace les tests et les revues de code
- **D)** Parce qu’il supprime le besoin de nommer les fichiers clairement

### Question C4

Pour une tâche précise, quel mécanisme est présenté comme le **plus fiable** pour forcer la lecture d’une doc importante pendant le tour courant ?

- **A)** Espérer que l’agent tombe dessus tout seul dans `docs/`
- **B)** Mettre le fichier dans un dossier caché
- **C)** Le citer explicitement avec `@fichier`
- **D)** Le renommer `notes-final-v2-ok.md`

### Question C5

Quelle affirmation sur **`AGENTS.md`** et **`.cursor/rules/`** est la plus juste dans le parcours ?

- **A)** `AGENTS.md` ne peut exister qu’à la racine, jamais dans un sous-dossier
- **B)** `AGENTS.md` peut vivre à plusieurs niveaux du dépôt, alors que `.cursor/rules/` sert plutôt de point central de règles projet
- **C)** Les deux ne servent qu’à styliser du Markdown, pas à cadrer une session
- **D)** `.cursor/rules/` remplace entièrement le besoin de `@fichier`

### Question C6

À quoi sert une **stop condition** dans un prompt d’agent ?

- **A)** À obliger l’agent à tout faire en une seule fois
- **B)** À empêcher toute relecture humaine
- **C)** À supprimer la documentation intermédiaire
- **D)** À faire arrêter l’agent si la tâche déborde sur un périmètre ou un risque qui demande validation

### Question C7

Après une implémentation qui a **réellement changé** le comportement, quelle pratique est la plus alignée avec le parcours ?

- **A)** Mettre à jour la doc concernée dans la même branche, puis relancer si besoin une session avec cette version comme contexte
- **B)** Garder l’ancienne doc pour ne pas casser l’historique
- **C)** Attendre six mois avant toute mise à jour
- **D)** Remplacer la doc par des captures d’écran uniquement

### Question C8

Parmi ces situations, laquelle illustre le mieux une **erreur fréquente** dans le travail avec des agents et de la documentation de dépôt ?

- **A)** Définir une source de vérité claire
- **B)** Prévoir des interdits explicites pour l’agent
- **C)** Mettre l’essentiel du métier dans le chat et presque rien dans le dépôt
- **D)** Relier une spec à une doc d’architecture et à une stratégie de test

---

## Module Cadrage, BMAD et synthèse : 8 questions

### Question B1

Dans ce parcours, **BMAD-METHOD** sert avant tout à :

- **A)** Interdire l’usage de l’IA dans le delivery
- **B)** Remplacer l’agilité par des agents automatiques
- **C)** Produire plus de documents sans validation
- **D)** Structurer le cadrage et le delivery pilotés par l’IA avec des artefacts et des validations humaines

### Question B2

Une **user story** bien formulée doit notamment :

- **A)** Partir du point de vue utilisateur avec une intention et une valeur claires
- **B)** Lister uniquement des détails d’implémentation
- **C)** Se réduire à une estimation en jours
- **D)** Décrire le plus possible d’écrans sans bénéfice exprimé

### Question B3

Les **critères d’acceptation** sont utiles surtout parce qu’ils doivent être :

- **A)** Verbaux et implicites
- **B)** Testables et vérifiables
- **C)** Identiques pour toutes les stories
- **D)** Réservés à la seule équipe produit

### Question B4

La **Definition of Done** (DoD) désigne :

- **A)** Le moment où l’IA propose un premier jet
- **B)** La date de fin imposée au sprint
- **C)** Les conditions à remplir pour considérer la story vraiment terminée
- **D)** Le passage automatique en production

### Question B5

Dans la synthèse du parcours, **mesurer** veut notamment dire :

- **A)** Compter seulement le nombre de prompts saisis
- **B)** Mesurer uniquement la longueur du backlog
- **C)** Éviter toute métrique tant que l’outil impressionne
- **D)** Suivre au moins un indicateur utile comme la qualité, le coût, la latence, le taux d’erreur ou le temps gagné

### Question B6

Selon la synthèse, où doivent rester les **faits réels** et la **vérité métier** ?

- **A)** Dans vos bases, vos APIs, vos docs et vos règles métier, pas dans la "mémoire" supposée du modèle
- **B)** Dans le dernier prompt envoyé au LLM
- **C)** Dans les captures d’écran partagées sur le chat
- **D)** Dans la sortie texte la plus convaincante

### Question B7

Laquelle de ces situations résume le mieux une **mauvaise habitude** que le parcours cherche à éviter ?

- **A)** Clarifier le périmètre avant de lancer l’outil
- **B)** Relire un diff avec des critères de validation
- **C)** Demander trop large à l’IA, puis valider trop vite par fatigue
- **D)** Documenter ce qui devra être repris plus tard

### Question B8

Parmi ces séquences, laquelle ressemble le plus à la **méthode minimale à réutiliser** dans la synthèse ?

- **A)** Prompter, publier, documenter plus tard si nécessaire
- **B)** Formuler le besoin, définir périmètre et données, produire, relire, tester ou mesurer, puis documenter
- **C)** Écrire uniquement la DoD, puis laisser l’agent dérouler
- **D)** Partir du code, puis inventer les critères d’acceptation après coup

---

## Module Produit IA, APIs et GEO : 8 questions

### Question G1

Dans une feature IA sérieuse, le flux minimal recommandé est surtout :

- **A)** Navigateur -> votre backend -> modèle -> validation / logique métier
- **B)** Navigateur -> modèle directement -> base de données
- **C)** Frontend -> clé API publique -> fournisseur -> production
- **D)** Interface -> script shell externe -> navigateur

### Question G2

Dans le pattern **langage naturel vers JSON / actions**, le rôle principal du modèle est :

- **A)** De devenir la source de vérité métier
- **B)** De remplacer toutes les APIs internes
- **C)** De transformer une intention floue en structure exploitable, pendant que la vérité métier reste dans votre code et vos données
- **D)** De publier directement une décision irréversible

### Question G3

Dans un **RAG** sur documents sensibles, où les **ACL** doivent-elles être appliquées en priorité ?

- **A)** Après la génération, en supprimant les phrases gênantes
- **B)** Dans le CSS de l’interface
- **C)** Dans un second prompt "sois sage"
- **D)** Avant le prompt, au niveau de la récupération et du filtrage des sources accessibles

### Question G4

Quel est le bon positionnement de **`n8n`** dans un produit qui intègre de l’IA ?

- **A)** C’est un coffre-fort de sécurité par défaut pour toute logique sensible
- **B)** C’est pratique pour des workflows bornés, mais il ne faut pas en faire la couche principale de sécurité et d’autorisation du produit
- **C)** C’est inutile dès qu’un backend existe
- **D)** C’est le meilleur endroit pour stocker toutes les clés en clair

### Question G5

Pourquoi un **chatbot** coûte-t-il souvent plus cher qu’il n’en a l’air ?

- **A)** Parce que l’historique, le prompt système et les documents injectés font vite monter les tokens envoyés
- **B)** Parce que chaque réponse oblige à changer de modèle
- **C)** Parce que le HTML du site est toujours gratuit à traiter
- **D)** Parce que le streaming double forcément la facture

### Question G6

Parmi les actifs utiles pour le **GEO**, lequel est explicitement cohérent avec le cours ?

- **A)** Une page très courte sans sources, pour aller plus vite
- **B)** Une FAQ ou un guide qui répond clairement à des questions concrètes, avec une structure lisible
- **C)** Un texte gonflé au volume sans source
- **D)** Une galerie d’images sans texte ni titres

### Question G7

Le cours recommande-t-il de promettre une **"garantie de position IA"** ?

- **A)** Oui, si le site a des données structurées
- **B)** Oui, si la page est très longue
- **C)** Oui, pour rassurer commercialement
- **D)** Non : il faut éviter les promesses absolues sur des systèmes qui évoluent

### Question G8

Comment le parcours relie-t-il **SEO** et **GEO** ?

- **A)** Le GEO remplace complètement le SEO
- **B)** Le GEO complète le SEO en améliorant la qualité, la structure et la citabilité des contenus pour les systèmes de synthèse
- **C)** Le SEO interdit les pages FAQ
- **D)** Les deux notions sont strictement identiques

---

## Module Fondamentaux et sécurité : 8 questions

### Question S1

Dans ce parcours, un **LLM** est présenté surtout comme :

- **A)** Un moteur de recherche qui relit Internet en direct
- **B)** Un système qui prédit des suites de texte plausibles à partir d’un contexte, sans "compréhension" humaine au sens fort
- **C)** Un compilateur spécialisé dans le code
- **D)** Un collègue autonome capable de juger seul le métier

### Question S2

Le **piège du vibe coding** est surtout :

- **A)** D’écrire en pseudo-code avant d’implémenter
- **B)** D’utiliser l’IA pour prototyper
- **C)** De demander une aide ponctuelle dans l’éditeur
- **D)** De coller du code généré puis d’en rester là sans relecture du diff, tests ni prudence sur les données envoyées

### Question S3

Quel sujet faut-il traiter **tôt**, avant de coller du vrai code ou des informations sensibles dans un chat ?

- **A)** Les réflexes de sécurité et de gestion des données
- **B)** La stratégie GEO
- **C)** La synthèse finale du parcours
- **D)** L’orientation de fin de parcours

### Question S4

Quand l’IA intervient dans **plusieurs canaux** la même semaine (IDE, Git, mail, automatisation, doc), quel réflexe est encouragé ?

- **A)** Appliquer exactement la même règle partout sans distinction
- **B)** Confier tout le tri au fournisseur LLM
- **C)** Cartographier l’outil, les données concernées et le public exposé pour chaque canal
- **D)** Ne documenter que le canal le plus visible

### Question S5

Coller une **clé API réelle** dans le chat d’un assistant IDE est risqué surtout parce que :

- **A)** Le modèle corrige automatiquement la clé
- **B)** Git refuse ensuite tout commit
- **C)** Le texte peut transiter vers des serveurs du fournisseur et être traité hors de votre machine
- **D)** Le terminal ne peut plus lire `.env`

### Question S6

Pour une application en production, une **clé secrète** utilisée au runtime doit idéalement :

- **A)** Être lue depuis des variables d’environnement ou un coffre, et ne pas figurer dans le dépôt public
- **B)** Être commitée dans `.env.example` avec sa vraie valeur
- **C)** Être copiée dans la documentation publique du projet
- **D)** Être envoyée en pièce jointe à tous les contributeurs

### Question S7

Une requête SQL construit la chaîne  
`"SELECT * FROM users WHERE email = '" + emailUtilisateur + "'"`  
sans paramètres liés. Le principal risque est :

- **A)** Une baisse du référencement
- **B)** Un conflit Git sur le fichier SQL
- **C)** Une erreur d’accent dans le champ `email`
- **D)** Une injection SQL si la saisie utilisateur contient du texte malveillant

### Question S8

Une clé secrète a été **commitée**, puis supprimée du fichier au commit suivant. Que faut-il retenir d’abord ?

- **A)** Git a déjà tout purgé automatiquement
- **B)** Il n’y a plus de risque si la branche courante est propre
- **C)** L’historique peut encore contenir la clé ; il faut révoquer / faire tourner le secret et traiter l’historique selon la politique d’équipe
- **D)** Seul le dernier auteur du commit est concerné

## Corrigés après l’épreuve

Ci-dessous : d’abord le **tableau récapitulatif** des bonnes lettres, puis les **justifications** question par question.

### Tableau récapitulatif des bonnes réponses

| Question | Réponse |
|----------|---------|
| C1 | B |
| C2 | D |
| C3 | A |
| C4 | C |
| C5 | B |
| C6 | D |
| C7 | A |
| C8 | C |
| B1 | D |
| B2 | A |
| B3 | B |
| B4 | C |
| B5 | D |
| B6 | A |
| B7 | C |
| B8 | B |
| G1 | A |
| G2 | C |
| G3 | D |
| G4 | B |
| G5 | A |
| G6 | B |
| G7 | D |
| G8 | B |
| S1 | B |
| S2 | D |
| S3 | A |
| S4 | C |
| S5 | C |
| S6 | A |
| S7 | D |
| S8 | C |

### Réponses et justifications Assistants, C1 à C8

- **C1 : B** : L’assistant ne devine pas le métier, le périmètre ou les contraintes absentes du contexte fourni.
- **C2 : D** : Le bon cadrage repose sur des éléments explicites : rôle, mission, sources, périmètre, interdits, sortie attendue.
- **C3 : A** : Le Markdown est utile parce qu’il est lisible par l’équipe, versionné dans Git et relisible par une session suivante.
- **C4 : C** : Pour un tour précis, la mention explicite `@fichier` reste le moyen le plus fiable.
- **C5 : B** : `AGENTS.md` peut être global ou local à un sous-dossier ; `.cursor/rules/` sert plutôt de couche centrale de règles projet.
- **C6 : D** : Une stop condition évite qu’un agent élargisse seul la tâche vers un changement plus risqué.
- **C7 : A** : Si le comportement change vraiment, la doc doit suivre dans la même branche pour servir correctement au tour suivant.
- **C8 : C** : Le parcours déconseille de garder le métier seulement dans le chat sans le relier au dépôt et aux docs versionnées.

### Réponses et justifications BMAD et synthèse, B1 à B8

- **B1 : D** : BMAD-METHOD structure artefacts, rôles et workflows ; il n’enlève pas la validation humaine.
- **B2 : A** : Une story sert d’abord à exprimer un besoin utilisateur compréhensible et actionnable.
- **B3 : B** : Des critères testables rendent la validation concrète au lieu de rester implicite.
- **B4 : C** : La DoD fixe ce qui doit être vrai pour considérer la story terminée, pas juste "codée".
- **B5 : D** : La synthèse rappelle qu’il faut mesurer qualité, coût, latence, erreurs ou temps gagné selon le cas.
- **B6 : A** : Le modèle aide à produire ; les faits et règles réelles doivent rester dans vos sources de vérité.
- **B7 : C** : Demander trop large puis valider trop vite est l’un des échecs les plus récurrents du parcours.
- **B8 : B** : La séquence minimale retenue est bien : besoin -> périmètre -> production -> relecture -> test / mesure -> documentation.

### Réponses et justifications Produit IA et GEO, G1 à G8

- **G1 : A** : Le backend reste le point de contrôle : secrets, quotas, validation et logique métier.
- **G2 : C** : Dans ce pattern, le LLM aide à structurer l’intention ; ce n’est pas lui qui remplace les règles métier.
- **G3 : D** : Les ACL doivent être appliquées avant le prompt, au moment où l’on choisit quelles sources peuvent remonter.
- **G4 : B** : `n8n` peut être très utile, mais il ne doit pas devenir le cerveau sécurité d’un produit sensible.
- **G5 : A** : Historique, prompt système et contexte documentaire font vite grimper les tokens et donc le coût.
- **G6 : B** : Le GEO valorise des pages utiles, structurées et concrètes, comme des FAQ ou des guides bien rédigés.
- **G7 : D** : Le cours déconseille les promesses absolues du type "garantie de position IA".
- **G8 : B** : Le GEO ne remplace pas le SEO ; il le complète pour les usages de synthèse et de recommandation.

### Réponses et justifications Fondamentaux et sécurité, S1 à S8

- **S1 : B** : Le cours présente le LLM comme un système probabiliste capable d’être convaincant sans être réellement "conscient".
- **S2 : D** : Le problème n’est pas de prototyper vite ; le problème est de s’arrêter avant relecture, tests et prudence sur les données.
- **S3 : A** : Les réflexes de sécurité et de gestion des données doivent arriver tôt pour cadrer les usages avant de manipuler du vrai code ou des données sensibles.
- **S4 : C** : Quand les canaux se multiplient, il faut distinguer outil, données et public exposé au lieu d’appliquer une règle floue partout.
- **S5 : C** : Un chat d’assistant n’est pas un coffre ; le contenu peut quitter votre poste selon le service utilisé.
- **S6 : A** : Les secrets doivent rester côté runtime contrôlé, pas dans le dépôt public.
- **S7 : D** : Construire une requête SQL par concaténation ouvre la porte à l’injection.
- **S8 : C** : Supprimer la ligne ne suffit pas : il faut traiter le secret comme compromis et agir sur l’historique selon la politique d’équipe.

