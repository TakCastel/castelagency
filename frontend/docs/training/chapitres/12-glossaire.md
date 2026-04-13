# Chapitre 12 : Glossaire et acronymes

Ce chapitre rassemble les **termes techniques ou de jargon** utilisés dans le parcours. Il s’adresse aux lecteurs qui découvrent une partie du vocabulaire (développeurs d’autres horizons, profils produit, "quidams" curieux). Les définitions sont **pédagogiques** : elles ne remplacent pas la documentation officielle d’un outil ou d’une norme.

**Comment l’utiliser** : recherche dans la page (Ctrl+F / Cmd+F) sur le mot cherché. Les entrées sont regroupées par **première lettre du titre** (en français : *ChatGPT* sous **C**, *JSON-LD* sous **J**, etc.).

---

## A

**A11y** : Abréviation courante d’**accessibilité** : pratiques qui rendent une interface utilisable au clavier, aux lecteurs d’écran, aux contrastes, etc. ; voir aussi **WCAG**.

**Acceptation (critères d’)** : Conditions qu’une fonctionnalité doit remplir pour être considérée comme terminée du point de vue métier ; de préférence **testables** ("on peut vérifier que...").

**ACL** (*Access Control List*, liste de contrôle d’accès) : Règles qui indiquent **qui peut lire ou modifier quoi** dans un wiki, une base documentaire, etc. Indispensable quand un moteur "doc + LLM" **réplique** les droits du système source : voir [chapitre 2 : Sécurité](02-securite-ia.md).

**ADR** (*Architecture Decision Record*) : Note courte qui enregistre une **décision d’architecture**, son contexte et ses conséquences pour pouvoir la relire plus tard.

**AGENTS.md** : Fichier Markdown d’instructions pour les **agents IA** et les humains, souvent placé à la racine du dépôt ou au plus près d’un sous-dossier sensible.

**AGI** (*Artificial General Intelligence*, intelligence artificielle générale) : Vision théorique d’une IA au niveau humain sur la plupart des tâches intellectuelles. **À ne pas confondre** avec les outils actuels (LLM, assistants), qui sont **spécialisés** et limités, même s’ils paraissent "intelligents".

**AIDD** (*AI-Driven Development*) : Approche où la mémoire du travail (specs, règles, docs, décisions) vit dans le **dépôt versionné**, pas seulement dans un chat.

**AI Act** : Cadre réglementaire européen sur l’**intelligence artificielle**, avec des obligations différentes selon le niveau de risque des usages.

**Anthropic** : Société éditrice des modèles **Claude** ; comparable **en rôle** à **OpenAI** pour le grand public technique (assistants, API).

**API** (*Application Programming Interface*) : Contrat informatique qui permet à deux programmes de communiquer (ex. envoyer une requête HTTP et recevoir des données structurées). Pour **brancher** un LLM depuis une app, l’appel se fait en pratique depuis le **serveur** : voir [chapitre 6 : Produit IA & APIs](06-produit-ia-apis.md).

**App Router** : Système de routage moderne de Next.js, notamment utilisé avec `app/` et les **Route Handlers** côté serveur.

**Appel d’outils** (*tool calling* / *function calling*) : Mécanisme où le modèle propose une action structurée, mais c’est **votre code** qui exécute réellement l’action et lui renvoie éventuellement le résultat.

**Artefact** : Livrable structuré produit pendant une méthode ou un workflow (spec, PRD, doc d’architecture, runbook, suivi), qui sert ensuite de point d’appui aux autres étapes.

**Assistant (conversationnel ou de code)** : Programme qui répond à des questions ou génère du texte / du code à partir d’une consigne ; s’appuie souvent sur un **LLM** et sur le **contexte** fourni (fichiers, historique de chat).

---

## B

**Backlog** : Liste priorisée de travaux à réaliser (souvent des *user stories* ou tâches) pour un produit ; base du pilotage agile.

**Backend** : Partie serveur d’une application, là où vivent les **secrets**, les appels API, la validation, les quotas et la logique métier.

**BMAD** : Abréviation usuelle pour le cadre **BMAD-METHOD** ; ne pas la confondre avec un acronyme "inventé" sans lien avec le [projet officiel](https://github.com/bmad-code-org/BMAD-METHOD).

**BMAD-METHOD** : Projet open source [**bmad-code-org/BMAD-METHOD**](https://github.com/bmad-code-org/BMAD-METHOD) (*Breakthrough Method for Agile AI Driven Development*) : **développement agile piloté par l’IA** avec **workflows** et **agents** par défaut (analyste, PM, architecte, **développeur**, UX, rédacteur technique ; voir [référence Agents](https://docs.bmad-method.org/reference/agents/)). La documentation sur [docs.bmad-method.org](https://docs.bmad-method.org). En **BMM** de base, la **revue de code** et la **génération de tests E2E** passent par l’**agent Developer** ; le **module TEA** (*Test Architect*) est à part. Après `npx bmad-method install` : dossiers **`_bmad/`** et **`_bmad-output/`**. **BMad** et **BMAD-METHOD** sont des marques de **BMad Code, LLC** (voir le dépôt).

**BMM** (*BMad Method*) : Nom court de la **suite** livrée avec BMAD-METHOD (agents, **workflows**, fichiers générés dans `_bmad-output/`, etc.) ; le détail des rôles est au [chapitre 5 : BMAD-METHOD](05-bmad-method.md).

**BM25** : Algorithme classique de **recherche textuelle** par pertinence (souvent utilisé dans les moteurs de recherche "classiques"). Souvent une brique de la phase de **récupération** dans un moteur **doc + LLM**.

**Brownfield** : Projet ou refonte sur un existant déjà en production, avec contraintes de compatibilité, dette technique et historique à respecter.

---

## C

**Capstone** : Projet de synthèse en fin de parcours qui mobilise plusieurs modules vus précédemment ; dans ce cours : [TP 6 du chapitre 8](08-travaux-pratiques.md).

**CDN** (*Content Delivery Network*) : Réseau de serveurs qui sert les contenus au plus près des utilisateurs ; utile pour la performance, le crawl et certains diagnostics d’accès.

**ChatGPT** : Service conversationnel d’OpenAI (exemple grand public d’interface à des **LLM**). Les notions du parcours (consigne, limites, vérification) valent **par analogie** pour tout assistant, y compris dans l’IDE.

**ChatGPT Search** : Mode de recherche de ChatGPT qui combine synthèse et sources externes ; à distinguer d’un simple chat "hors web".

**Chunk** : Morceau de texte découpé pour l’indexation (taille fixe ou par paragraphe) avant **embedding** ou recherche ; notion centrale du **RAG** : voir [chapitre 9 : Synthèse](09-synthese.md).

**CI/CD** (*Continuous Integration / Continuous Deployment*) : Pratiques et outils pour intégrer et déployer le code souvent et de façon automatisée (tests, pipelines).

**Citation engineering** : Manière de travailler la cohérence des signaux de marque, de sources et de réputation pour augmenter les chances d’être **cité** dans des réponses génératives.

**Claude** : Famille de modèles d’IA développée par **Anthropic** ; peut alimenter des assistants ou des intégrations dans des outils.

**Claude Code** : Produit / mode d’usage centré sur l’assistance au **développement** dans l’écosystème Anthropic (nom commercial évolutif : se référer à la doc officielle). Comparable **en esprit** à un assistant dans l’IDE, avec des garde-fous de cadrage identiques (revue, tests).

**Contexte (fenêtre de)** : Taille maximale **combinée** (entrées + réponse) qu’un **LLM** peut traiter en un seul appel ; liée au comptage en **tokens**. Au-delà : troncature, erreur ou second appel.

**Contexte (côté outil)** : Ensemble des informations réellement fournies à un assistant ou un agent pour travailler (fichiers, sélection, historique, docs citées, règles chargées).

**Corpus** : Ensemble de documents ou de contenus sur lesquels on s’appuie (ex. base FAQ interne pour un moteur de questions-réponses).

**CNIL** : Autorité française chargée de la protection des données personnelles ; source utile de repères sur le **RGPD** et les usages sensibles de l’IA.

**CPF** (*Compte personnel de formation*) : Dispositif français permettant de financer des actions de formation avec des crédits personnels. **Éligibilité** et mentions légales : dépend du **statut** de l’organisme, du catalogue, etc. ; voir la [feuille de route](/formation-ia/feuille-de-route).

**CVE** (*Common Vulnerabilities and Exposures*) : Identifiant public d’une vulnérabilité connue, utile dans la veille sécurité et le suivi des dépendances.

**Complétion** (*inline completion*) : Suggestion de code ou de texte directement dans l’éditeur, souvent acceptée au clavier sans passer par un chat.

**Cursor** : **IDE** (éditeur) orienté développement, intégrant un **assistant de code** (complétions, chat sur le dépôt). Ce parcours l’utilise comme **exemple** ; les idées s’appliquent à d’autres éditeurs ou assistants.

---

## D

**Definition of Done (DoD)** : Liste des conditions à remplir pour qu’une *user story* (ou un incrément) soit réellement **terminée** : ex. code revu, tests passés, documentation minimale. Évite le "presque fini".

**Dette technique** : Coût futur créé par des raccourcis actuels (code fragile, duplication, tests manquants, docs non tenues) qui ralentissent les évolutions suivantes.

**Données personnelles** : Toute information se rapportant à une personne **identifiée** ou **identifiable** (nom, e-mail, adresse IP dans certains cas, etc.). Régime **RGPD** en Union européenne ; prudence avant d’envoyer du contenu à un **LLM** tiers.

**Données structurées** : Métadonnées publiées sur une page Web pour qu’un **programme** (moteur, assistant) comprenne le type de contenu (FAQ, organisation, événement…). Souvent au format **JSON-LD** et vocabulaire **schema.org** ; voir [chapitre 7 : GEO](07-geo.md).

**Directives d’indexation** : Consignes comme `noindex`, `nofollow` ou `nosnippet` qui disent aux moteurs comment indexer une page, suivre ses liens ou afficher des extraits.

**DPA** (*Data Processing Agreement*) : Accord entre responsable de traitement et sous-traitant encadrant le traitement de **données personnelles** ; utile lorsque l’IA ou l’hébergement est fourni par un **tiers**.

**DPO** (*Data Protection Officer* / **délégué à la protection des données**) : Rôle prévu par le **RGPD** pour conseiller l’organisme sur les traitements de **données personnelles** et coopérer avec la **CNIL** si besoin ; voir [chapitre 2 : Sécurité](02-securite-ia.md).

**Diff** : Fichier ou vue qui montre **ligne par ligne** ce qui a changé dans le code ; support essentiel de la **revue** après génération par IA.

**Delivery** : Livraison continue de valeur (fonctionnalités prêtes à être mises entre les mains d’utilisateurs ou déployées selon la politique de l’équipe).

---

## E

**E2E** (*end-to-end*, de bout en bout) : Tests ou scénarios qui parcourent une **chaîne complète** (souvent de l’interface utilisateur jusqu’aux données). Dans **BMAD-METHOD**, la génération de tests E2E est évoquée côté agent Developer : voir [chapitre 5 : BMAD-METHOD](05-bmad-method.md).

**Embedding** : Représentation **vectorielle** d’un texte : permet la **recherche sémantique** ("textes proches du sens de la requête") dans un **RAG** ; voir [chapitre 9 : Synthèse](09-synthese.md).

**Entité** : Objet identifiable (marque, personne, lieu, produit, organisation) dont les relations peuvent être rendues explicites dans le contenu et le balisage Web.

**Échouer (en production / en silencieux)** : Expression imagée : un comportement incorrect qui n’est pas détecté avant les utilisateurs ou un environnement critique ; d’où l’importance des **tests** et de la **revue**.

**Epic** : Grand ensemble de travail regroupant plusieurs **user stories** vers un même objectif produit.

---

## F

**Fan-out** : Découpage d’une question en plusieurs sous-requêtes ou recherches partielles avant synthèse.

**Fallback** : Comportement de **secours** lorsque le chemin principal n’est pas satisfaisant (ex. score de confiance trop bas sur une recherche doc : renvoyer des extraits sources ou un message maîtrisé plutôt qu’une réponse générée risquée).

**Fenêtre de contexte** : Voir **Contexte (fenêtre de)** ; synonyme courant en anglais dans les documentations d’API (*context window*).

**Feature gating** : Fait de limiter une fonctionnalité selon le plan, le rôle, le quota ou l’état d’un compte.

**File humaine** : Étape où un humain tranche les cas ambigus ou sensibles au lieu de laisser le modèle ou une règle automatisée décider seul.

---

## G

**GEO** (*Generative Engine Optimization*) : Démarche visant à rendre un contenu **compris, cité ou recommandé** dans des réponses produites par des **moteurs ou assistants** (synthèses), en complément du **SEO** classique. Parcours détaillé : [chapitre 7 : GEO](07-geo.md).

**Gemini** : Famille de modèles et d’assistants de Google, citée comme exemple de système génératif avec ses propres habitudes de citation et de synthèse.

**Git** : Outil de gestion de versions : historique des modifications, branches, fusions (*merge*).

**GitHub Copilot** : Assistant de code intégré à **Visual Studio Code** (et à d’autres environnements), fourni dans l’écosystème **GitHub / Microsoft** ; les capacités exactes (chat, agent, modèles disponibles) **évoluent** selon l’offre : se référer à la documentation officielle.

---

## H

**Hallucination (du modèle)** : Génération par un **LLM** d’informations **plausibles mais fausses** ou non fondées sur les sources fournies ; d’où l’intérêt de la **revue**, des **tests**, d’un **corpus** maîtrisé et d’un **fallback** lorsque la récupération documentaire est incertaine.

---

## I

**IDE** (*Integrated Development Environment*) : Environnement de développement intégré : éditeur de code, exécution de commandes, parfois débogueur et intégrations (dont **assistants IA**).

**IA générative** : Famille d’outils capables de produire du **contenu nouveau** (texte, code, image, audio) à partir d’une consigne.

**i18n** (*internationalisation*) : Pratiques qui préparent un logiciel à gérer plusieurs langues, formats de date, monnaies et conventions locales.

**Injection SQL** : Attaque où une **entrée utilisateur** est concaténée dans une requête SQL de façon à en modifier le sens (ex. exfiltrer des données). À chercher dans le code généré par l’IA ; voir [chapitre 2 : Sécurité](02-securite-ia.md).

**Inline chat** : Petit chat directement intégré dans l’éditeur, souvent limité à une sélection ou à un fichier précis.

**Inférence auto-hébergée** : Exécution d’un modèle sur votre propre infrastructure plutôt que via un fournisseur SaaS.

**Issue / ticket** : Unité de travail décrite dans un outil de suivi (bug, tâche, story) ; sert de **cadrage** avant de demander de l’aide à un assistant.

---

## J

**JSON-LD** : Format d’annotation pour publier des **données structurées** sur le Web (souvent avec **schema.org**), afin que machines et assistants puissent interpréter clairement le contenu (FAQ, organisation, événements…).

**JSON structuré** : Sortie d’un modèle contrainte à un format JSON précis, ensuite validé par votre code avant toute action métier.

**JWT** (*JSON Web Token*) : Jeton signé souvent utilisé pour l’authentification ou les sessions ; ne doit pas être collé dans un chat ou exposé dans des logs publics.

---

## L

**Livrable** : Ce qu’une consigne (surtout un **TP** du [chapitre 8](08-travaux-pratiques.md)) demande de **rendre** : fichier, texte, capture, branche Git, etc.

**LLM** (*Large Language Model*, grand modèle de langage) : Modèle d’apprentissage profond entraîné sur du texte, capable de générer ou compléter du langage naturel (ou du code). **Ne "comprend" pas** au sens humain : il calcule des probabilités de suites de **tokens**, dans une **fenêtre de contexte** bornée.

**llms.txt** : Fichier optionnel proposé pour indiquer à certains assistants ou robots LLM comment utiliser, résumer ou prioriser un site ; pratique émergente, pas standard universel.

---

## M

**Markdown** : Syntaxe de balisage léger (titres `#`, listes, liens, blocs de code) pour rédiger de la documentation dans un dépôt ; utile pour les **prompts** réutilisables et les **agents** : voir [chapitre 4](04-prompter-agents-markdown.md).

**MCP** (*Model Context Protocol*) : Protocole destiné à connecter des modèles ou assistants à des outils et à des sources de données de façon standardisée.

**Merge** : Action de fusionner une branche de code dans une autre (souvent après **revue**).

**Mermaid** : Syntaxe textuelle pour produire des **diagrammes** (souvent rendus en image dans Markdown ou outils de doc).

**Mistral AI** : Éditeur français de **LLM** (API cloud, dont **La Plateforme**, et **modèles ouverts** selon les offres). Intégration type : [chapitre 9 : Synthèse](09-synthese.md) ; cadre général **API** : [chapitre 6](06-produit-ia-apis.md).

**MLOps** : Ensemble de pratiques pour industrialiser les modèles (déploiement, supervision, versioning, réentraînement, exploitation).

**Multimodal** : Modèle ou assistant qui accepte **plusieurs types d’entrées** (ex. image + texte) en plus du seul texte ; capacités et limites selon le fournisseur.

**MVP** (*Minimum Viable Product*) : Version minimale mais utile d’un produit, suffisante pour tester un besoin ou une valeur.

**Merge Request (MR)** : Nom souvent utilisé sur GitLab pour une demande de fusion de code ; équivalent d’une **Pull Request**.

---

## N

**n8n** : Outil d’automatisation par workflows reliant applications, APIs, bases et parfois modèles IA ; très pratique pour prototyper ou orchestrer, mais à ne pas confondre avec une couche de sécurité solide.

---

## O

**OpenAI** : Société éditrice notamment de **ChatGPT** et de modèles de la famille **GPT** (*Generative Pre-trained Transformer* : modèles génératifs pré-entraînés, détail technique secondaire pour la suite du parcours).

**Observabilité** : Capacité à comprendre l’état d’un système grâce aux logs, métriques, traces, coûts, latences et erreurs.

**Organisme (de formation)** : Entité qui **dispense** une session à des apprenants (école, entreprise, indépendant, etc.). Repères sur les attestations, le barème et le vocabulaire **RNCP / CPF** : [feuille de route](/formation-ia/feuille-de-route).

**ORM** (*Object-Relational Mapping*) : Couche logicielle qui relie objets applicatifs et tables SQL pour éviter d’écrire toutes les requêtes à la main.

**OWASP** : *Open Web Application Security Project* : communauté et guides de référence (dont **Top 10** applications web et **Top 10** risques **LLM**) utiles pour la **revue** et la culture sécurité ; liens utiles en fin du [chapitre 2 : Sécurité](02-securite-ia.md).

---

## P

**Perplexity** : Moteur ou assistant orienté recherche avec citations explicites, souvent cité dans les discussions GEO.

**pgvector** : Extension PostgreSQL qui permet de stocker et interroger des **embeddings** directement en base.

**PO / PM** : *Product Owner* / *Product Manager* : rôles produit (cadrage du **backlog**, priorités, critères d’**acceptation**). Le parcours leur donne des **repères** sur l’IA sans exiger qu’ils codent.

**Périmètre** : Limites de ce qui est demandé (fonctionnalité, fichiers concernés, critères de succès).

**Pipeline (recherche doc + LLM)** : Enchaînement typique : requête utilisateur → **récupération** de passages → éventuellement filtrage par **score** → appel **LLM** → réponse ; avec **fallback** si la confiance est insuffisante. (Souvent appelé **RAG** dans la littérature.)

**Point d’entrée** : Endroit par lequel un agent ou un humain a des chances réelles de lire une information importante (`AGENTS.md`, règle projet, `@fichier`, index docs).

**POC** (*Proof of Concept*) : Démonstration limitée qui vise à vérifier une faisabilité ou une hypothèse avant d’investir davantage.

**Prompt** : Consigne textuelle (ou multimodale) envoyée à un modèle ou un assistant pour obtenir un résultat ; qualité = clarté du **périmètre** et du **contexte**.

**PRD** (*Product Requirements Document*) : Document produit qui rassemble besoin, contexte, périmètre, contraintes et objectifs avant découpage plus fin.

**Pull Request (PR)** : Demande de fusion de code, généralement relue et discutée avant intégration dans la branche cible.

---

## Q

**QCM** : Questionnaire à choix multiples : plusieurs réponses proposées, **une seule** est correcte par question. La banque du [chapitre 11](11-banque-qcm.md) comporte **32** questions en **quatre** blocs de 8 ; les **corrigés** sont placés **après** les seuls énoncés dans ce fichier ; l’organisme peut n’en **noter** que **24** (sans le bloc Sécurité).

**Qualiopi** : Référentiel **national** de certification des actions de formation en France (marque déposée). Un organisme **certifié Qualiopi** répond à un cadre qualité ; cela **ne remplace pas** à lui seul une analyse d’**éligibilité CPF** ou d’autres dispositifs.

**Quota** : Limite d’usage d’une fonctionnalité, d’un nombre de requêtes ou d’un volume de tokens pour éviter les abus ou maîtriser les coûts.

---

## R

**RAG** (*Retrieval-Augmented Generation*, génération augmentée par la récupération) : Approche qui combine **recherche** dans un **corpus** contrôlé et **génération** par **LLM**, pour réduire l’invention (*hallucination*) et ancrer les réponses dans des sources. Un flux **proche** (sources externes ou internes, puis LLM) est décrit au [chapitre 6 : Produit IA & APIs](06-produit-ia-apis.md) ; les **risques** (droits de lecture sur la doc) sont traités au [chapitre 2 : Sécurité](02-securite-ia.md).

**Recette / production** : Environnements où le logiciel tourne pour des utilisateurs réels ; la **production** est l’environnement "live".

**Reranking** : Étape qui reclasse les résultats récupérés pour garder les plus utiles avant génération ou affichage.

**Retrieval** : Phase de récupération d’extraits, de documents ou de pages pertinents avant synthèse ou réponse.

**Requête paramétrée** : Requête SQL où les valeurs sont transmises séparément du texte SQL pour réduire le risque d’**injection SQL**.

**Robots.txt** : Fichier placé à la racine d’un site pour indiquer à certains robots quels chemins ils peuvent ou non explorer.

**Rollback** : Retour à un état précédent après un déploiement, un incident ou une modification problématique.

**Route Handler** : Fichier serveur `Next.js` (souvent dans `app/api/.../route.ts`) qui reçoit une requête HTTP, applique la logique backend et protège les secrets.

**Runbook** : Procédure opérationnelle pas à pas (déploiement, incident, intervention) avec critères de succès et parfois rollback.

**Revue (de code)** : Lecture critique des changements (souvent via **diff**) par un pair ou soi-même de façon structurée.

**RNCP** (*Répertoire national des certifications professionnelles*) : Référentiel français des certifications professionnelles. Une **formation de marque** avec certificat interne **n’y est pas** équivalente sans démarche spécifique.

**RGPD** : Règlement (UE) 2016/679 sur la protection des **données personnelles** ; impose notamment la licéité, la minimisation et la traçabilité des traitements.

**RSSI** : *Responsable de la sécurité des systèmes d’information* : rôle chargé de piloter la **politique de cybersécurité** dans une organisation (intitulés voisins selon les structures) ; voir [chapitre 2 : Sécurité](02-securite-ia.md).

---

## S

**Schema.org** : Vocabulaire commun pour décrire des entités sur le Web (événements, FAQ, organisation…) ; base des **données structurées** souvent en JSON-LD.

**Secret** : Donnée qui authentifie ou protège (clé API, mot de passe, token, certificat privé) : **ne pas** la mettre dans le **chat** d’un assistant ni dans un dépôt public ; voir [chapitre 2 : Sécurité](02-securite-ia.md).

**Secret scanning** : Détection automatisée de secrets (clés API, tokens, mots de passe) dans un dépôt ou un historique Git.

**SEO** (*Search Engine Optimization*) : Optimisation pour la **visibilité** et les **clics** dans les résultats de recherche "classiques" (pages de résultats, liens).

**SERP** : Page de résultats d’un moteur de recherche (*Search Engine Results Page*).

**Share of voice IA** : Part de présence ou de citation d’une marque dans des réponses génératives par rapport à ses concurrents.

**Source de vérité** : Document ou artefact qui fait foi pour une tâche donnée et auquel les autres fichiers ou sessions doivent se référer.

**Sous-traitance** : Situation où un prestataire traite des données pour le compte d’une autre organisation ; notion importante en **RGPD** et dans les contrats autour des outils IA.

**Stack trace** : Liste des appels successifs qui ont conduit à une erreur d’exécution ; utile pour diagnostiquer un bug sans exposer de secrets.

**Stop condition** : Règle qui oblige un agent à s’arrêter et à demander validation avant de dépasser un périmètre ou un niveau de risque donné.

**Sprint** : Période courte (souvent une à quatre semaines) où l’équipe livre un incrément du produit à partir du **backlog** ; cadre fréquent en agile (Scrum, etc.).

---

## T

**TCO** (*Total Cost of Ownership*) : Coût total d’une solution sur la durée (infrastructure, maintenance, équipe, supervision), pas seulement le prix affiché à l’appel API.

**Token** : Unité sub-linguistique manipulée par un LLM (souvent un morceau de mot) ; sert aussi à mesurer la **taille du contexte** ou le coût d’appel.

**Travail avec un agent IA** : Manière de cadrer une **session avec un agent IA** autour d’un **objectif unique**, de **sources à lire**, d’un **périmètre** et d’une **sortie attendue**. Cette logique est détaillée au [chapitre 4 : Prompter des agents et structurer du Markdown](04-prompter-agents-markdown.md).

**TP** : Travail pratique : exercice du parcours avec **énoncé**, **livrable** attendu et **pistes** d’auto-évaluation (sans corrigé séparé au chapitre 8).

---

## U

**User story** : Formulation courte d’un besoin utilisateur (souvent "En tant que ..., je veux ..., afin de ..."), assortie de **critères d’acceptation**.

**User-agent de crawl IA** : Identifiant d’un robot utilisé par un moteur ou un assistant pour explorer le Web (ex. `GPTBot`, `ClaudeBot`) ; peut être autorisé ou bloqué via `robots.txt`.

---

## V

**Variables d’environnement** : Valeurs injectées au runtime pour configurer une application (secrets, URLs, modes) sans les écrire en dur dans le code.

**VS Code** (*Visual Studio Code*) : Éditeur de code **Microsoft** très répandu ; **GitHub Copilot** s’y intègre en **extension**. Comparaison avec d’autres assistants : [chapitre 3 : Assistants de code](03-assistants-code-ide.md).

**Vibe coding** : Expression **informelle** (anglais) pour désigner du prototypage ou du code "à l’instinct" avec l’IA, sans toujours cadrer. Le parcours vise plutôt une **méthode** (ticket, **prompt**, **diff**, tests) ; le profil "vibe codeur" est évoqué au [chapitre 1 : Introduction](01-introduction.md).

---

## W

**WCAG** (*Web Content Accessibility Guidelines*) : Référentiel de critères d’accessibilité Web, souvent utilisé pour auditer navigation clavier, contrastes, labels et composants.

**Webhook** : Appel HTTP déclenché automatiquement par un service pour signaler un événement à un autre système.

**Worker** : Processus asynchrone qui traite une tâche hors du cycle immédiat d’une requête web.

**Workflow** : Suite d’**étapes** ou de **rôles** enchaînés dans un outil ou une méthode (ex. BMAD-METHOD : analyste → PM → développeur…). Ne remplace pas la **validation humaine** des sorties.

---

## X

**X-Robots-Tag** : En-tête HTTP qui donne des directives d’indexation aux robots, équivalent côté serveur de certaines balises robots HTML.

---

## Z

**Zero-click** : Situation où l’utilisateur obtient une réponse directement dans un moteur ou un assistant sans cliquer jusqu’au site source.



