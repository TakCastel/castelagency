# Chapitre 3 · Développement assisté par IA : Cursor, Copilot, Claude Code

Après les enjeux de sécurité, on passe aux **outils**. L’objectif n’est pas de mémoriser tous les boutons, mais d’adopter une **méthode de travail** qui reste valable si l’interface change demain.

Si vous êtes **débutant complet**, la promesse est simple : savoir **ouvrir un IDE**, **installer un assistant**, **poser une bonne première question**, **relire la proposition** et **éviter les pièges fréquents**.

Un assistant de code n’est pas une baguette magique : c’est plutôt un **coéquipier très rapide** qui **n’est pas fiable par défaut**. Le gain de temps apparaît quand vous lui donnez un **périmètre clair**, que vous **relisez** ce qu’il propose et que vous **testez** le résultat.

---

## 1. Ce que vous saurez faire après ce chapitre

À la fin de ce chapitre, vous devriez pouvoir :

1. **Expliquer** ce qu’est un IDE et la différence entre complétion, chat et agent.
2. **Mettre en place un socle minimal** (VS Code, Cursor, Copilot ou Claude Code selon le contexte).
3. **Ouvrir un projet et se repérer** (fichiers, éditeur, terminal, extensions, Git).
4. **Réaliser une première tâche assistée** sans perdre le contrôle (explication, mini-fix, petit refactor).
5. **Comprendre les coulisses** : contexte, historique, diff, parfois terminal.
6. **Choisir le bon outil** : chat web pour comprendre, outil connecté au dépôt pour coder réellement.

---

## 2. Avant même de parler d’IA : qu’est-ce qu’un IDE ?

Un **IDE** (*Integrated Development Environment*) est l’outil dans lequel on écrit, lit, lance et corrige le code. Il rassemble généralement fichiers, éditeur, terminal, Git, extensions et parfois débogueur, ce qui évite de jongler entre dix fenêtres.

### 2.1. Les 5 zones à reconnaître sans stress

Si vous n’avez jamais utilisé un IDE, repérez d’abord ces zones :

1. **La barre latérale** : elle permet d’ouvrir les fichiers, de chercher dans le projet, d’afficher Git ou les extensions.
2. **La zone centrale** : c’est là que vous lisez et modifiez les fichiers.
3. **Le terminal intégré** : c’est l’endroit où l’on lance des commandes du type `npm test`, `git status`, `python main.py`, etc.
4. **La palette de commandes** : un champ de recherche interne pour demander à l’éditeur d’exécuter une action.
5. **Le panneau IA** : selon l’outil, il prend la forme d’un chat latéral, d’une zone inline dans le code, ou d’un agent terminal.

### 2.2. Ce qu’un néophyte doit retenir tout de suite

Vous n’avez pas besoin de tout connaître avant d’ouvrir un IDE ; en revanche, vous devez vite apprendre à **reconnaître l’interface** et à **ne pas accepter au hasard** une proposition IA non comprise.

> **Attention**
>
> Un assistant qui a l’air sûr de lui peut tout de même modifier le **mauvais fichier**, appeler une **mauvaise API** ou proposer une **commande destructrice**. L’objectif du chapitre est justement d’éviter ce faux sentiment de sécurité.

---

## 3. Les trois grandes formes d’aide IA dans le code

Avant de comparer Cursor, Copilot et Claude Code, il faut comprendre **trois modes** que vous retrouverez partout.

### 3.1. La complétion

La **complétion** est la forme la plus discrète : vous commencez à taper, l’outil propose la suite sous forme de **texte fantôme**. Elle est utile pour les blocs prévisibles (squelette de fonction, HTML répétitif, handlers simples), surtout quand vous donnez une intention claire dans un commentaire.

Gardez un réflexe simple : si vous reproduisez la même logique à plusieurs endroits, il faut souvent **refactoriser** plutôt qu’accepter encore une suggestion. L’IA accélère la frappe ; elle ne remplace pas la lecture de l’architecture.

**Très utile** pour aller vite sur du petit code.  
**Dangereux** si cela crée de la dette technique en multipliant les mêmes logiques un peu partout dans le projet.

### 3.2. Le chat

Le **chat** vous permet d’écrire une consigne en langage naturel, par exemple *"Explique-moi cette fonction."*, *"Pourquoi ce test casse ?"* ou *"Peux-tu renommer ces variables pour qu’elles soient plus lisibles ?"*. Selon l’outil, ce chat peut prendre en compte le **fichier ouvert**, le **code sélectionné**, des **fichiers ajoutés comme contexte**, et parfois un morceau de l’**historique** de la conversation.

### 3.3. L’agent

L’**agent** va plus loin : il peut lire plusieurs fichiers, proposer un plan, éditer à plusieurs endroits et parfois lancer des commandes. C’est sa force, mais aussi son risque : plus il est autonome, plus votre vérification doit être stricte.

Exemple :

> *"Analyse le flux d’inscription, corrige le bug de validation, mets à jour le composant et lance les tests concernés."*

Ici, l’outil n’aide plus seulement à **écrire une ligne** ; il essaie de **mener une tâche**. Dès qu’il passe par le **terminal**, vérifiez systématiquement les fichiers touchés, les commandes proposées et l’environnement visé (local, staging, production).

En résumé : la **complétion** propose une suite probable au clavier ; le **chat** discute sur un contexte ciblé ; l’**agent** enchaîne des actions et demande donc une vigilance maximale.

---

## 4. Comment ces outils fonctionnent en pratique

L’outil ne voit pas magiquement tout votre projet comme un humain. Il travaille avec un **contexte reconstruit** : votre prompt, le fichier actif, une sélection, des fichiers ajoutés, parfois un index du dépôt et une partie de l’historique.

### 4.1. Ce que cela implique

Sans contexte utile, la réponse part dans le flou ; avec trop de bruit, elle devient moins précise et plus coûteuse. Si vous mélangez plusieurs sujets dans un même fil, l’outil vise souvent à côté.

### 4.2. Pourquoi l’outil peut halluciner

Souvent, l’hallucination n’est pas absurde : **nom d’API plausible mais faux**, option inventée, chemin crédible mais incorrect. L’outil comble les trous de contexte avec ce qui lui paraît probable.

Exemple :

> *"Ajoute l’authentification au projet."*

Cette consigne est trop large : stack, méthode d’authentification, existant et périmètre de fichiers ne sont pas précisés. L’outil va donc **deviner**.

### 4.3. Diff, aperçu, validation

Les bons outils affichent aussi un **diff** : ce qui a été ajouté, supprimé ou modifié.

Le bon réflexe :

1. lire la proposition ;
2. lire le **diff** ;
3. vérifier les points sensibles ;
4. seulement ensuite accepter ;
5. puis tester.

---

## 5. Quel outil choisir pour commencer ?

Vous n’avez pas besoin d’utiliser toutes les familles d’outils à la fois. Choisissez selon votre niveau et votre contexte, puis vérifiez toujours les tarifs et limites sur la documentation officielle.

### 5.1. Cas le plus simple : VS Code + GitHub Copilot

C’est souvent la voie la plus douce si vous découvrez les IDE, si vous voulez garder un éditeur très répandu, si votre équipe utilise déjà **GitHub** ou l’écosystème Microsoft, et si vous préférez commencer par de la **complétion** puis du **chat** sans changer trop vite vos habitudes.

En pratique, on va du **gratuit** à quelques **dizaines de dollars** par mois pour un individu, avec des offres équipe.

### 5.2. Cas très confortable pour apprendre vite : Cursor

Cursor convient si vous voulez un outil **pensé pour l’IA**, avec un **chat intégré** au dépôt et des passages rapides entre **question**, **édition** et **agent**.

> **Attention**
>
> Quand un agent travaille dans Cursor, **restez devant l’écran** : lisez les actions, coupez si ça dérive et évitez les diffs énormes. Garder **code, diff, terminal et chat** dans le même flux aide à ne pas valider trop vite.

### 5.3. Cas puissant mais plus technique : Claude Code

Claude Code convient si vous êtes à l’aise avec le **terminal**, et si vous acceptez une interface moins graphique qu’un IDE classique.

### 5.4. Et ChatGPT ou Codex dans tout ça ?

**ChatGPT** est très utile pour clarifier une idée, reformuler un bug ou préparer un plan, tandis que **Codex** devient plus pertinent quand il faut agir sur du code de façon structurée avec fichiers, modifications et logique de développement ; dans les deux cas, la qualité dépend surtout du cadre que vous donnez.

### 5.5. Et les outils hors IDE (Hostinger, Lovable, Bolt, AI Studio) ?

**Hostinger Horizons**, **Lovable**, **Bolt** ou **AI Studio** sont très utiles pour **prototyper vite**, tester un concept et obtenir une première version montrable sans alourdir le démarrage.

Ce sont de bons outils d’entrée, mais plus le projet grandit, plus la dépendance à la plateforme peut limiter la liberté technique et la propriété complète de la solution ; pour un produit stratégique, mieux vaut prévoir une trajectoire vers une stack pleinement maîtrisée.

---

## 6. Installation : tester, puis choisir

Vous n’êtes pas obligé de tout installer. Les écrans et commandes changent : **suivez les pages de l’éditeur**, pas un tuto copié-collé.

Le plus simple est d’en choisir **un seul** et de le tester sérieusement pendant **un mois** : si vous aimez le flux, vous gardez ; sinon, vous changez sans culpabiliser. Côté budget, privilégiez un démarrage mensuel et lisez bien les conditions avant de prendre un annuel, pour éviter de vous coincer dans un abonnement que vous regretterez.

| Outil | Par où commencer |
|-------|------------------|
| **VS Code** | [Téléchargement](https://code.visualstudio.com/download) · [Documentation](https://code.visualstudio.com/docs), puis **File → Open Folder**, terminal intégré, panneau **Extensions**. |
| **GitHub Copilot** (dans VS Code) | [Doc Copilot](https://docs.github.com/copilot) · [Démarrage dans VS Code](https://code.visualstudio.com/docs/copilot/getting-started) |
| **Cursor** | [Téléchargements](https://cursor.com/downloads) · [Documentation](https://cursor.com/docs) · [Raccourcis](https://cursor.com/docs/reference/keyboard-shortcuts), logique proche de VS Code : installer, ouvrir le **dossier du projet**. |
| **Claude Code** | [Vue d’ensemble](https://docs.anthropic.com/en/docs/claude-code/overview) · [Quickstart](https://docs.anthropic.com/en/quickstart) · [Extension VS Code](https://docs.anthropic.com/en/vs-code), en résumé : terminal **dans le projet**, commande `claude` une fois l’install faite selon la doc. |
| **Codex** | [Codex (OpenAI)](https://developers.openai.com/codex) · [Quickstart](https://developers.openai.com/codex/quickstart) |

> **Attention** : pas de `curl … | bash` (ou équivalent) recopié depuis un blog. **Domaine officiel**, caractère par caractère ; la partie **sécurité** (y compris la section **scripts**) le rappelle.

---

## 7. Les raccourcis utiles pour ne pas subir l’outil

Les raccourcis changent selon le système et la version, mais certains valent la peine d’être appris tôt.

### 7.1. Les raccourcis socle de VS Code et des éditeurs proches

Les éditeurs de type VS Code, dont Cursor, partagent beaucoup d’habitudes.

| Action | macOS | Windows / Linux |
|--------|-------|------------------|
| Ouvrir la palette de commandes | `Cmd + Shift + P` | `Ctrl + Shift + P` |
| Ouvrir les extensions | `Cmd + Shift + X` | `Ctrl + Shift + X` |
| Ouvrir l’explorateur | `Cmd + Shift + E` | `Ctrl + Shift + E` |
| Ouvrir la recherche projet | `Cmd + Shift + F` | `Ctrl + Shift + F` |
| Ouvrir Git / Source Control | `Ctrl + Shift + G` | `Ctrl + Shift + G` |
| Ouvrir le terminal intégré | `Ctrl + \`` | `Ctrl + \`` |
| Enregistrer | `Cmd + S` | `Ctrl + S` |

Ces raccourcis suffisent pour démarrer sans friction.

### 7.2. Raccourcis Cursor à connaître

D’après la documentation Cursor, les raccourcis IA clés sont notamment :

| Action | Mac | Windows / Linux |
|--------|-----|------------------|
| Ouvrir le panneau IA | `Cmd + I` ou `Cmd + L` | `Ctrl + I` ou `Ctrl + L` |
| Édition inline | `Cmd + K` | `Ctrl + K` |
| Menu des modes | `Cmd + .` | `Ctrl + .` |
| Changer de modèle | `Cmd + /` | `Ctrl + /` |
| Accepter une suggestion | `Tab` | `Tab` |

En pratique, **`Cmd/Ctrl + L`** ou **`I`** ouvre le chat, **`Cmd/Ctrl + K`** sert souvent à modifier une sélection, et **`Tab`** accepte une suggestion ; pas besoin de viser l’exhaustivité le premier jour.

Pour Copilot comme pour Claude Code, gardez le même réflexe : utilisez la doc officielle pour les combinaisons exactes et démarrez toujours depuis le bon dossier projet.

---

## 8. Premier parcours guidé : ouvrir un IDE et se faire assister sans se perdre

Prenons le cas d’une personne qui débute vraiment.

### 8.1. Étape 1 : ouvrir un projet

1. Lancez votre éditeur.
2. Cliquez sur **Open Folder** ou **Ouvrir un dossier**.
3. Choisissez le dossier du projet.
4. Attendez que l’arborescence apparaisse.
5. Ouvrez un fichier simple, par exemple un composant ou une page.

### 8.2. Étape 2 : ne pas commencer par tout déléguer

Le premier bon usage n’est pas :

> *"Refais le site complet."*

Le premier bon usage ressemble plutôt à :

> *"Explique-moi ce fichier en français simple : à quoi sert-il, quels sont les points d’entrée, et quels éléments je peux modifier sans risque si je veux juste changer le texte du bouton ?"*

Objectif : **apprendre**, vérifier le **contexte**, rester **pilote** plutôt que copieur-colleur.

### 8.3. Étape 3 : faire une petite demande concrète

Exemple raisonnable :

> *"Dans ce fichier uniquement, renomme la fonction `doStuff` avec un nom plus clair et ajoute un commentaire très court au-dessus si le traitement n’est pas évident. Ne change pas le comportement."*

Ici, vous donnez le **périmètre**, l’**objectif** et la **contrainte** sans ambiguïté.

### 8.4. Étape 4 : relire avant d’accepter

Nom, lignes touchées, imports, effets de bord : un **coup d’œil** suffit souvent pour vérifier que le changement reste propre et proportionné.

### 8.5. Étape 5 : tester

Même sur une petite demande, faites au moins une vérification concrète : compilation, affichage et test ciblé.

Le cycle minimal du débutant : **ouvrir**, **comprendre**, **modifier**, **relire**, **tester**.

---

## 9. Trois scénarios concrets, outil par outil

> **Prérequis léger**
>
> À partir d’ici, il est préférable de savoir déjà coder un minimum dans un composant custom (props simples, structure JSX/HTML, petites modifications de logique), afin de relire correctement les propositions de l’assistant et garder la main sur le résultat.

Dans cette partie, nous allons voir comment avancer sans partir d’un gros dépôt en production. Pour cela, vous partez d’un **starter** (petit projet vide ou généré avec le CLI officiel), puis vous utilisez l’assistant pour poser un **squelette lisible** que vous **relisez** et **lancez** en local.

### 9.1. Scénario débutant dans Cursor : une landing Next.js minimale

**Contexte** : dossier de travail ouvert dans Cursor ; petit starter Next prêt à l’emploi.

**Bon départ** (enchaînement possible) :

1. Mode **question** d’abord si vous voulez seulement un plan sans toucher aux fichiers : *« Propose l’arborescence de composants pour une seule page : Header, Hero, section Avis (3 cartes factices), Footer. Pas de backend, pas de CMS. »*
2. Puis passage à l’édition **ciblée** : *« Crée ou complète uniquement `app/page.tsx` (ou l’équivalent) pour assembler ces blocs avec des données en dur. Style simple (Tailwind ou CSS modules selon ce que le starter a déjà). Ne rajoute pas de pages ni d’API. »*
3. **Relire** le diff, lancer `npm run dev` (ou la commande du projet), vérifier que la page s’affiche.

Le but est d’avoir une **structure claire** et un **périmètre** limité à une page, pour répéter une boucle simple sans créer un projet que vous ne maîtrisez pas.

### 9.2. Scénario débutant dans VS Code + Copilot : même starter, autre geste

**Contexte** : petit projet Next (ou Vite + React) ouvert dans VS Code, extension Copilot activée.

**Utilisation progressive** :

1. Dans un fichier **vide** ou presque (ex. `components/Hero.tsx`), laissez la **complétion** proposer un premier jet ; si c’est trop ambitieux, n’acceptez pas tout, tapez plutôt le début vous-même pour **orienter** la suggestion.
2. Sélectionnez un bloc (ex. liste des trois avis) et ouvrez l’**inline chat** : *« Trois cartes avec nom, citation courte, note sur 5 ; données en dur dans le composant. »*
3. Relisez les props et le JSX, corrigez les détails, relancez le serveur de dev.

Copilot brille sur des **morceaux** de fichier ; le starter vous évite de perdre du temps sur la structure initiale.

### 9.3. Scénario débutant avec Claude Code : squelette Nuxt « e-commerce » factice

**Contexte** : terminal **dans** le dossier du projet ; starter Nuxt.

**Bon départ** :

> *« Le projet est un starter Nuxt vide ou presque. Propose un squelette e-commerce **démo** : page d’accueil, liste produits factice, fiche produit avec id en route, panier en mémoire (pas de paiement, pas de vraie base). Liste les fichiers à créer, puis applique les changements étape par étape. Ne configure pas de secrets ni de clés API. »*

Vous restez sur un **périmètre** démo : d’abord la liste des fichiers, puis les actions. Ensuite, relisez routes et stores, lancez le serveur et validez le parcours principal.

---

## 10. Installer l’habitude qui change tout : explorer avant d’éditer

Le vrai saut de qualité vient souvent d’une habitude simple :

1. **comprendre** ;
2. **délimiter** ;
3. **modifier** ;
4. **vérifier**.

### 10.1 à 10.4. Formulations utiles par phase

En **exploration** : *« Où est gérée cette logique ? »*, *« Quels fichiers sont concernés ? »*, *« Existe-t-il déjà un helper proche ? »*.

Pour le **plan** : *« Propose un plan en quatre étapes max »*, *« Liste les fichiers à toucher et pourquoi »*, *« Qu’est-ce qui risque de casser ? »*.

Pour l’**édition** : *« Dans ce fichier uniquement… »*, *« Sans changer le comportement… »*, *« Diff minimal et relisible »*.

Pour la **vérification** : *« Quelle vérif manuelle ensuite ? »*, *« Quels tests ciblent ce changement ? »*, *« Quels cas limites restent ouverts ? »*.

---

## 11. Prompts faibles, prompts utiles, prompts très utiles

| Situation | Prompt faible | Prompt utile | Prompt très utile |
|-----------|---------------|--------------|-------------------|
| Comprendre un fichier | `Explique ce code` | `Explique ce fichier en français simple.` | `Explique ce fichier en français simple : rôle global, fonctions principales, dépendances importantes, et ce que je peux modifier sans risque si je veux seulement changer le texte affiché.` |
| Corriger un bug | `Corrige le bug` | `Corrige l’erreur 500 sur la page contact.` | `La page contact renvoie 500 après soumission. Contexte : stack Next.js, route serveur déjà existante. Commence par localiser le fichier concerné, explique l’hypothèse la plus probable, puis propose un correctif minimal. Ne modifie pas la structure du formulaire côté front.` |
| Refactor | `Améliore ce code` | `Refactorise cette fonction.` | `Dans cette fonction uniquement, extrais la validation e-mail dans un helper nommé validateEmail. Ne change pas le comportement, ne modifie pas l’API publique, et montre le diff.` |
| Première feature | `Ajoute une recherche` | `Ajoute une barre de recherche sur cette page.` | `Sur cette page uniquement, ajoute une recherche locale côté client sur la liste déjà affichée. Pas d’appel réseau supplémentaire. Critère fini : l’utilisateur peut filtrer les titres en tapant dans un champ.` |

Un bon prompt dit **où** agir, **quoi** faire, **ce qu’il ne faut pas toucher**, et **comment vérifier** le résultat.

---

## 12. Coût, tokens, contexte : ce qu’il faut comprendre sans devenir expert

Un **token** est une unité de texte découpée par le modèle. Ce n’est pas exactement un mot, mais l’idée pratique est simple : plus vous envoyez de texte, plus la requête est lourde, plus l’historique s’allonge, plus le contexte peut gonfler, et plus la réponse est longue, plus elle peut consommer de ressources ou de quota.

### 12.1. Le problème des longs fils

Beaucoup de débutants mélangent bugs, feature, refactor et terminal dans un seul fil : l’outil perd en précision et vous consommez du quota pour du bruit.

### 12.2. Le bon réflexe

Le bon réflexe : un **sujet** = un **fil** ; un gros changement commence par un **plan** ; un nouveau problème mérite souvent un **nouveau chat**.

---

## 13. Ce qu’il faut absolument éviter

Erreurs fréquentes au début avec l’IA dans le code.

### 13.1. Demander trop grand trop tôt

Un débutant ne peut pas relire sereinement un gros diff : commencez par des tâches **petites**, **visibles**, **testables**.

### 13.2. Confondre vitesse et compréhension

Ce n’est pas parce que l’outil vous donne un correctif en 8 secondes que vous avez compris ce qui s’est passé. Or si vous ne comprenez rien, vous serez bloqué à la prochaine erreur.

### 13.3. Copier-coller des erreurs sans filtrer

Reprenez le réflexe vu **en sécurité** : pas de `.env`, pas de clé API, pas de token, pas de dump de base, et pas de lien signé ou d’URL contenant un secret.

### 13.4. Exécuter une commande non comprise

C’est particulièrement important avec les agents terminal.

Mauvais réflexe :

> *"Il me dit de lancer ça, donc je lance."*

Bon réflexe :

> *"Qu’est-ce que cette commande fait exactement ? Quels fichiers touche-t-elle ? Est-ce réversible ?"*

### 13.5. Accepter une suggestion parce qu’elle a l’air propre

Une suggestion peut être bien écrite et pourtant incorrecte sur le fond. Avant d’accepter, vérifiez rapidement les **noms**, les **imports**, les **conditions métier** et la **compatibilité avec votre stack**.

> **Attention**
>
> Le risque principal est d’introduire un bug, une régression ou une faille de sécurité avec un code qui semble correct au premier regard.

---

## 14. Petites astuces qui font gagner du temps

### 14.1. Demander d’abord une explication niveau débutant

> *"Explique-moi ce fichier comme à quelqu’un qui découvre React."*

Souvent, c’est plus formateur qu’une réécriture immédiate.

### 14.2. Forcer le périmètre

Ajoutez des formulations comme *"dans ce fichier uniquement"*, *"ne change pas le comportement"* ou *"propose d’abord un plan"*. Ces petites phrases changent souvent la qualité du résultat.

### 14.3. Demander une revue du diff

Après une modification, vous pouvez demander :

> *"Relis ce diff comme un reviewer senior : bugs possibles, cas limites, oublis de tests."*

La **review** peut être assistée par l’IA ; la **décision** reste humaine.

### 14.4. Utiliser l’IA pour apprendre les outils, pas seulement écrire du code

*`package.json`*, *`git status`*, *serveur vs client* : ces questions sont souvent plus rentables qu’un code copié sans compréhension.

---

## 15. Pour les PO / PM et les profils moins techniques

Même si vous ne codez pas toute la journée, ce chapitre vous concerne.

Vous aidez surtout l’équipe en demandant un **périmètre clair**, les **fichiers touchés**, une **définition de fini** et une **vérification concrète**. L’IA peut aussi absorber des **micro-tickets** utiles (texte UI, doc, brouillon de ticket, FAQ, message d’erreur).

Évitez les grosses PR générées d’un coup : préférez **petits tickets, petit périmètre, petite revue**. Dès qu’on touche architecture, sécurité, migrations ou fichiers sensibles, le développeur reste au centre.

Image utile : l’architecte ne pose pas forcément le carrelage, mais il voit si une rangée part de travers. De même, un PO / PM repère une demande mal découpée, une PR disproportionnée ou un critère d’acceptation flou, sans avoir à tout coder.

Exemple de demande utile côté produit :

> *"Avant de coder, donne-moi les fichiers que tu comptes toucher, le risque principal, et comment on vérifiera que le formulaire de devis fonctionne toujours."*

---


## 16. Checklist de fin de chapitre

- [ ] Je peux expliquer la différence entre **complétion**, **chat** et **agent**.
- [ ] Je sais ouvrir un projet dans un IDE et repérer **explorateur**, **éditeur** et **terminal**.
- [ ] Je connais au moins **3 raccourcis** utiles dans mon outil principal.
- [ ] Je sais formuler une demande **petite**, **bornée** et **vérifiable**.
- [ ] Je relis un **diff** avant d’accepter une modification IA.
- [ ] Je ne colle pas de **secrets** ni de **données sensibles** dans l’outil.

---

## Mini-glossaire du chapitre 3

| Terme | Sens ici |
|-------|----------|
| **IDE** | Éditeur de code enrichi avec fichiers, terminal, Git, extensions et parfois débogueur. |
| **Complétion** | Suggestion inline pendant que vous tapez, souvent acceptée avec `Tab`. |
| **Chat** | Espace de discussion avec l’assistant à partir d’un prompt et d’un contexte choisi. |
| **Agent** | Mode plus autonome capable de lire plusieurs fichiers, proposer des modifications et parfois lancer des commandes. |
| **Contexte** | Ce que l’outil reçoit pour travailler : prompt, sélection, fichier actif, historique, index, fichiers ajoutés. |
| **Diff** | Vue ligne par ligne des modifications proposées ou réalisées dans les fichiers. |
| **Hallucination** | Réponse plausible mais fausse : API inventée, commande inadaptée, fichier imaginaire, règle métier devinée. |
| **Palette de commandes** | Barre de recherche interne de l’éditeur pour exécuter une action sans chercher dans les menus. |
| **Inline chat** | Petite zone de demande IA directement dans l’éditeur, souvent limitée à une sélection ou à un fichier précis. |
| **Codex** | Surface ou agent de développement orienté code dans l’écosystème OpenAI, plus adapté qu’un simple chat généraliste quand il faut agir sur un projet. |

---

## À retenir en une phrase

Un bon début avec l’IA dans le code, ce n’est pas **tout déléguer** ; c’est savoir **ouvrir le bon outil**, **poser une petite demande claire**, **relire le diff** et **tester** avant de faire confiance.

