# Chapitre 3 · Développement assisté par IA : Cursor, Copilot, Claude Code

Après avoir compris les enjeux de sécurité, on peut enfin parler **outil**. Le but de ce chapitre n’est pas de vous faire mémoriser tous les boutons d’un logiciel précis, mais de vous donner une **méthode de travail** qui reste valable si l’interface change demain.

Si vous êtes **débutant complet**, gardez cette promesse en tête : à la fin de ce chapitre, vous devez savoir **ouvrir un IDE**, **installer au moins un assistant**, **poser une première bonne question**, **relire la proposition**, et **éviter les pièges les plus fréquents**.

> **En bref**
>
> Un assistant de code n’est pas une baguette magique. C’est un **coéquipier très rapide** mais **pas fiable par défaut**. On gagne du temps quand on lui donne un **périmètre clair**, qu’on **relit** ce qu’il propose et qu’on **teste**.

---

## 1. Ce que vous saurez faire après ce chapitre

À la fin de ces pages, vous devriez pouvoir :

1. **Expliquer simplement** ce qu’est un **IDE** et la différence entre **complétion**, **chat** et **agent**.
2. **Installer** un socle minimal pour travailler avec l’IA en développement : **VS Code**, **Cursor**, **GitHub Copilot** ou **Claude Code**, selon votre contexte.
3. **Ouvrir un projet** dans un éditeur, repérer les zones principales (explorateur de fichiers, éditeur, terminal, extensions, contrôle de version) et utiliser quelques **raccourcis utiles**.
4. **Faire une première tâche assistée** sans vous perdre : demander une explication, corriger un petit bug, refactorer une fonction courte, ou créer un composant simple.
5. **Comprendre ce qui se passe en coulisses** : contexte envoyé, historique, suggestions, diff, parfois commandes terminal.
6. **Savoir quand utiliser** un **chat web** généraliste, et quand il vaut mieux un **outil de code connecté au dépôt**.

---

## 2. Avant même de parler d’IA : qu’est-ce qu’un IDE ?

Un **IDE** (*Integrated Development Environment*, environnement de développement intégré) est l’outil dans lequel on écrit, lit, lance et corrige le code. Dans la pratique, beaucoup de personnes disent simplement *mon éditeur*.

Un IDE moderne réunit souvent au même endroit un **explorateur de fichiers**, un ou plusieurs **onglets de code**, un **terminal intégré**, un panneau **Git** ou **Source Control**, un système d’**extensions**, parfois un **débogueur**, et désormais un ou plusieurs **assistants IA**. C’est précisément ce qui le rend confortable : au lieu de jongler entre dix fenêtres, vous gardez le projet, les outils et les retours d’erreur dans un même espace de travail.

### 2.1. Les 5 zones à reconnaître sans stress

Si vous n’avez jamais utilisé un IDE, repérez d’abord ces zones :

1. **La barre latérale** : elle permet d’ouvrir les fichiers, de chercher dans le projet, d’afficher Git ou les extensions.
2. **La zone centrale** : c’est là que vous lisez et modifiez les fichiers.
3. **Le terminal intégré** : c’est l’endroit où l’on lance des commandes du type `npm test`, `git status`, `python main.py`, etc.
4. **La palette de commandes** : un champ de recherche interne pour demander à l’éditeur d’exécuter une action.
5. **Le panneau IA** : selon l’outil, il prend la forme d’un chat latéral, d’une zone inline dans le code, ou d’un agent terminal.

### 2.2. Ce qu’un néophyte doit retenir tout de suite

Vous n’avez **pas besoin** de connaître tout le langage avant d’ouvrir un IDE. En revanche, vous devez apprendre très vite à **reconnaître l’interface** et à **ne pas accepter au hasard** une proposition IA que vous ne comprenez pas. L’assistant n’écrit pas dans le vide : il agit sur de **vrais fichiers**, dans un **vrai projet**, avec de vraies conséquences sur le fonctionnement de l’application.

> **Attention**
>
> Un assistant qui a l’air sûr de lui peut tout de même modifier le **mauvais fichier**, appeler une **mauvaise API** ou proposer une **commande destructrice**. L’objectif du chapitre est justement d’éviter ce faux sentiment de sécurité.

---

## 3. Les trois grandes formes d’aide IA dans le code

Avant de comparer Cursor, Copilot et Claude Code, il faut comprendre **trois modes** que vous retrouverez partout.

### 3.1. La complétion

La **complétion** est la forme la plus discrète : vous commencez à taper, et l’outil propose la suite sous forme de **texte fantôme** dans l’éditeur.

Concrètement, elle peut compléter un `if`, écrire le squelette d’une fonction, proposer un HTML ou un CSS répétitif, ou terminer un appel de fonction qui ressemble à ce qu’elle observe déjà dans le fichier.

Un usage très courant au quotidien consiste à écrire d’abord un **commentaire d’intention**, ou à laisser l’outil l’autocompléter, puis à appuyer sur `Tab` pour laisser la fonction se dérouler. Par exemple, vous écrivez une ligne du type *"Calcule le total TTC à partir du prix HT et du taux de TVA"*, puis l’assistant propose directement la structure de la fonction. C’est pratique pour rédiger plus vite les fonctions simples, les handlers, les helpers et d’autres blocs de code assez prévisibles.

Mais il faut garder un réflexe de développeur : si l’outil vous fait réécrire trois fois la même logique, ce n’est pas forcément un gain. Il faut penser à la **refactorisation**, éviter les répétitions inutiles et savoir où vivent déjà les briques réutilisables du projet : helpers, utilitaires partagés, composants communs, hooks, services, mixins ou équivalents selon la stack. L’IA accélère l’écriture, mais elle ne remplace pas la compréhension de l’architecture locale.

**Très utile** pour aller vite sur du petit code.  
**Dangereux** si cela crée de la dette technique en multipliant les mêmes logiques un peu partout dans le projet.

### 3.2. Le chat

Le **chat** vous permet d’écrire une consigne en langage naturel, par exemple *"Explique-moi cette fonction."*, *"Pourquoi ce test casse ?"* ou *"Peux-tu renommer ces variables pour qu’elles soient plus lisibles ?"*. Selon l’outil, ce chat peut prendre en compte le **fichier ouvert**, le **code sélectionné**, des **fichiers ajoutés comme contexte**, et parfois un morceau de l’**historique** de la conversation.

### 3.3. L’agent

L’**agent** va plus loin : il peut lire plusieurs fichiers, proposer un plan, éditer du code à plusieurs endroits, et parfois lancer des commandes. C’est souvent là que se trouve la **véritable force de frappe** de l’IA dans un projet de développement, parce qu’on ne parle plus seulement d’aide à la saisie ou d’un chat qui explique, mais d’un outil capable d’agir sur plusieurs couches du projet presque comme un opérateur très rapide.

Justement pour cette raison, ce n’est **pas** un outil à mettre dans toutes les mains sans cadre. Un agent puissant peut modifier plusieurs fichiers, toucher à la configuration, lancer des scripts, proposer une migration ou exécuter une commande destructive si on ne vérifie pas ce qu’il fait. En clair : si vous validez aveuglément, vous lui donnez un pouvoir réel sur le projet.

Exemple :

> *"Analyse le flux d’inscription, corrige le bug de validation, mets à jour le composant et lance les tests concernés."*

Ici, l’outil n’aide plus seulement à **écrire une ligne** ; il essaie de **mener une tâche**.

Le risque devient très concret dès qu’il passe par le terminal. Un agent mal cadré ou mal relu peut lancer une commande qui supprime des données, applique une mauvaise migration, écrase des fichiers de déploiement, ou pousse une modification beaucoup trop large. Oui, ce type d’incident est déjà arrivé dans des contextes assistés ou automatisés : par exemple un agent ou un script validé trop vite qui exécute une commande de suppression sur la mauvaise base, ou qui remplace des fichiers entiers sur un serveur alors que l’utilisateur pensait ne corriger qu’un bug local.

La règle simple est donc la suivante : **plus l’agent est autonome, plus la vérification humaine doit être stricte**. On relit les fichiers touchés, on relit les commandes proposées, on distingue bien local / staging / production, et on évite de donner à un débutant un agent capable d’agir partout sans garde-fous.

> **En bref**
>
> **Complétion** = une suite probable au clavier.  
> **Chat** = une discussion ciblée sur un bout de contexte.  
> **Agent** = une boucle plus autonome, donc plus puissante mais aussi plus risquée.

---

## 4. Comment ces outils fonctionnent en pratique

Il est important de casser un mythe : l’outil ne voit pas magiquement tout votre projet comme un humain.

En pratique, il travaille avec un **contexte reconstruit** à partir de plusieurs sources : le **prompt** que vous écrivez, le **fichier actif**, une **sélection** de code, des fichiers explicitement ajoutés, parfois un **index** du dépôt, et parfois une partie de l’**historique** de la conversation.

### 4.1. Ce que cela implique

Si vous ne donnez **aucun contexte utile**, la réponse sera souvent vague. Si vous en donnez **trop**, surtout du contexte inutile, vous ajoutez du bruit, du coût et parfois de la confusion. Et si vous mélangez **plusieurs sujets** dans un même fil, l’outil peut finir par répondre au mauvais problème. Enfin, dès qu’il travaille en mode **agent**, il peut proposer un **diff** sur plusieurs fichiers : cela se relit comme une vraie revue de code, pas comme un simple brouillon.

### 4.2. Pourquoi l’outil peut halluciner

Une **hallucination**, ici, ce n’est pas forcément une réponse délirante. C’est souvent quelque chose de beaucoup plus trompeur : un **nom de fonction plausible** mais inexistant, une **option de configuration** inventée, un **chemin de fichier** presque crédible, ou une **commande terminal** qui semble standard mais ne correspond pas à votre stack.

L’hallucination naît souvent d’un **trou dans le contexte**.

Dans un projet front, elle peut aussi prendre une forme très concrète : l’outil décide de modifier un **layout** alors que vous vouliez seulement corriger un bouton, invente un nouveau composant alors qu’un composant équivalent existe déjà, ou recrée une logique de carte, de formulaire ou de modale qui vit pourtant déjà ailleurs dans le projet. Sur le moment, le résultat peut avoir l’air propre. Mais si l’IA ajoute, duplique et réinvente à chaque étape, le projet dérive vite vers du **code spaghetti** : plusieurs versions d’une même idée, des patterns incohérents, et une dette technique qui coûtera cher quand un développeur devra relire, refactorer et remettre de l’ordre.

Exemple :

> *"Ajoute l’authentification au projet."*

Cette consigne est trop large. L’outil ne sait pas si vous utilisez `Next.js`, `Laravel`, `Django` ou autre, si vous voulez une auth e-mail/mot de passe, OAuth ou SSO, si une auth existe déjà, ni quels fichiers ont le droit d’être modifiés. Il va donc **combler les trous** avec ce qui lui semble le plus probable.

### 4.3. Diff, aperçu, validation

Les bons outils de code ne se contentent pas de répondre en texte. Ils montrent aussi un **diff** : ce qui a été ajouté, supprimé ou modifié.

Le bon réflexe :

1. lire la proposition ;
2. lire le **diff** ;
3. vérifier les points sensibles ;
4. seulement ensuite accepter ;
5. puis tester.

---

## 5. Quel outil choisir pour commencer ?

Vous n’avez **pas besoin** d’utiliser les quatre familles d’outils à la fois. Pour démarrer, choisissez selon votre niveau et votre contexte.

### 5.1. Cas le plus simple : VS Code + GitHub Copilot

C’est souvent la voie la plus douce si vous découvrez les IDE, si vous voulez garder un éditeur très répandu, si votre équipe utilise déjà **GitHub** ou l’écosystème Microsoft, et si vous préférez commencer par de la **complétion** puis du **chat** sans changer trop vite vos habitudes.

Côté budget, on est en gros sur une fourchette allant de **gratuit** à **39 $ par mois** pour un usage individuel, puis autour de **19 à 39 $ par siège et par mois** pour les offres équipe et entreprise.

### 5.2. Cas très confortable pour apprendre vite : Cursor

Cursor convient bien si vous voulez un outil pensé directement pour le travail avec IA, si vous aimez l’idée d’un **chat très intégré** au dépôt, et si vous voulez passer plus vite du mode **question** au mode **édition** puis **agent** dans la même interface.

En pratique, les tarifs vont d’une formule **gratuite** à environ **200 $ par mois** pour les gros utilisateurs individuels, avec une offre équipe autour de **40 $ par utilisateur et par mois**.

> **Attention**
>
> Quand vous laissez un assistant ou un agent travailler dans Cursor, **ne partez pas faire autre chose**. Restez devant l’écran pour lire ce qu’il fait, vérifier qu’il ne part pas dans une mauvaise direction, et l’arrêter vite si le contexte ou les actions proposées deviennent inutiles, afin d’éviter un mauvais diff et des tokens gaspillés.

### 5.3. Cas puissant mais plus technique : Claude Code

Claude Code convient bien si vous êtes à l’aise avec le **terminal**, si vous voulez un agent qui travaille sur un vrai dépôt avec lecture, édition et commandes, et si vous acceptez une approche moins visuelle qu’un IDE classique.

Pour le prix, on démarre généralement autour de **20 $ par mois** côté individuel, puis on monte vite vers **100 $ et plus** pour les usages intensifs ; côté équipe, il faut compter en gros **20 à 125 $ par siège** selon le niveau d’usage, avec des logiques entreprise qui ajoutent ensuite une part de consommation.

### 5.4. Et ChatGPT ou Codex dans tout ça ?

Il faut bien distinguer deux usages.

**ChatGPT en chat web** est très utile pour demander une explication pédagogique, résumer une erreur anonymisée, préparer un plan, reformuler une doc ou apprendre un concept. C’est un très bon outil de compréhension et de préparation.

En revanche, pour **travailler réellement sur un dépôt**, **tester**, **modifier plusieurs fichiers**, **relire un diff** ou **piloter une tâche de code**, un outil conçu pour le développement est généralement **plus performant**.

Dans l’écosystème OpenAI, **Codex** est précisément positionné pour ce travail de code assisté, avec des surfaces dédiées au développement. Si vous avez accès à Codex, il est plus logique de l’utiliser pour des tâches **branchées au projet** qu’un simple chat web généraliste.

Si vous regardez le prix de **ChatGPT / Codex**, l’ordre de grandeur le plus simple à retenir est le suivant : on commence par un accès **gratuit ou limité**, on passe ensuite autour de **20 $ par mois** pour un usage individuel sérieux, puis on monte vers **100 à 200 $ par mois** pour les usages avancés, avec des offres business ou entreprise et de l’API à l’usage quand on entre dans un cadre d’équipe.

### 5.5. Que choisir en pratique ?

Si votre sujet est surtout **apprendre** ou faire de petits correctifs, vous n’avez pas besoin d’acheter tout de suite l’offre la plus chère. En général, on commence avec un plan **gratuit** ou **Pro** simple, puis on monte en gamme seulement si l’équipe utilise vraiment les agents au quotidien, si les limites bloquent le travail, ou si des besoins de sécurité et d’administration apparaissent.

En résumé, il vaut mieux **commencer petit**, puis passer sur un plan **Pro** quand l’usage devient réel, et seulement ensuite réfléchir aux offres équipe. À partir du moment où plusieurs personnes interviennent, le vrai coût n’est plus seulement l’abonnement : il faut compter aussi le **temps de revue**, la **qualité des diffs**, les éventuels dépassements de quota, et surtout la **dette technique** créée par un usage trop rapide ou mal cadré. Un outil moins cher mais bien utilisé coûtera presque toujours moins qu’un plan premium qui produit des changements difficiles à relire.

> **En bref**
>
> ChatGPT = très bien pour **comprendre** ou **préparer**.  
> Cursor / Copilot / Claude Code / Codex = mieux pour **agir sur le code** avec contexte, diff et flux de travail.

---

## 6. Installation : pas à pas, sans jargon inutile

Cette section donne un chemin simple. Vous n’êtes pas obligé de tout installer.

### 6.1. Installer Visual Studio Code

**Source officielle** : [VS Code download](https://code.visualstudio.com/download) et [documentation](https://code.visualstudio.com/docs)

### Sur macOS

1. Téléchargez l’archive ou le `.dmg` depuis le site officiel.
2. Ouvrez le fichier téléchargé.
3. Glissez l’application dans le dossier **`/Applications`**.
4. Lancez **Visual Studio Code** depuis **Applications** ou Spotlight.

### Sur Windows

Le site propose plusieurs formats, notamment le **User Installer** pour votre compte utilisateur, le **System Installer** pour une installation plus large sur la machine, et une version **`.zip`** si vous savez pourquoi vous en avez besoin. Pour un débutant, le **User Installer** suffit souvent.

### Sur Linux

Le site propose généralement un paquet **`.deb`** pour Debian / Ubuntu, un **`.rpm`** pour Fedora / Red Hat / SUSE, et parfois d’autres méthodes selon la distribution.

### Ce que vous faites au premier lancement

1. Ouvrir un dossier de projet via **File > Open Folder**.
2. Vérifier que vous voyez bien les fichiers dans la barre latérale.
3. Ouvrir le terminal intégré.
4. Repérer le panneau **Extensions**.

### 6.2. Installer GitHub Copilot dans VS Code

**Sources officielles** : [GitHub Copilot documentation](https://docs.github.com/copilot), [Get started with GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/getting-started) et [Quickstart GitHub Copilot](https://docs.github.com/en/copilot/get-started/quickstart).

### Étapes simples

1. Ouvrez **VS Code**.
2. Ouvrez le panneau **Extensions**.
3. Cherchez `GitHub Copilot`.
4. Installez l’extension officielle.
5. Connectez-vous à votre compte **GitHub** si l’outil le demande.
6. Vérifiez que les suggestions ou le chat apparaissent bien.

### 6.3. Installer Cursor

**Sources officielles** : [Cursor downloads](https://cursor.com/downloads), [Cursor docs](https://cursor.com/docs) et [Raccourcis Cursor](https://cursor.com/docs/reference/keyboard-shortcuts).

### Sur macOS

1. Téléchargez Cursor depuis la page officielle.
2. Ouvrez l’image disque ou l’archive.
3. Placez l’application dans **`/Applications`**.
4. Lancez Cursor.

### Sur Windows et Linux

Téléchargez l’installateur ou le paquet proposé sur la page officielle en fonction de votre système.

### Au premier démarrage

Cursor peut vous proposer d’importer vos réglages, vos extensions, et parfois vos habitudes venant de VS Code. C’est souvent pratique si vous venez déjà de VS Code, puisque Cursor en reprend une grande partie de la logique.

### 6.4. Installer Claude Code

**Sources officielles** : [Claude Code overview](https://docs.anthropic.com/en/docs/claude-code/overview), [Quickstart Claude Code](https://docs.anthropic.com/en/quickstart) et [Claude Code dans VS Code](https://docs.anthropic.com/en/vs-code).

### Si vous êtes sur macOS, Linux ou WSL

La documentation officielle indique notamment une installation native :

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Si vous êtes sur Windows PowerShell

```powershell
irm https://claude.ai/install.ps1 | iex
```

### Si vous préférez Homebrew sur macOS

```bash
brew install --cask claude-code
```

### Puis

1. Ouvrez un terminal.
2. Placez-vous dans votre projet avec `cd`.
3. Lancez `claude`.
4. Connectez-vous si demandé.

Anthropic propose aussi une extension pour certaines surfaces comme **VS Code** et **Cursor**. Mais pour un grand débutant, le plus simple à comprendre reste souvent : **ouvrir un terminal dans le projet, puis lancer `claude`**.

> **Attention**
>
> Le chapitre 2 l’a déjà dit, mais cela vaut encore ici : **ne copiez pas au hasard** une commande d’installation trouvée sur un blog ou un post réseau social. Vérifiez toujours le **domaine officiel** caractère par caractère.

### 6.5. Et Codex ?

**Sources officielles** : [Codex sur OpenAI Developers](https://developers.openai.com/codex) et [Quickstart Codex](https://developers.openai.com/codex/quickstart).

Si vous utilisez déjà l’écosystème OpenAI pour le code, consultez directement ces pages officielles plutôt qu’un comparatif SEO quelconque. Les surfaces disponibles peuvent évoluer : web, CLI, extension IDE, intégrations.

---

## 7. Les raccourcis utiles pour ne pas subir l’outil

Les raccourcis changent parfois selon le système, la version et vos personnalisations. Mais certains sont tellement utiles qu’il vaut la peine de les apprendre tôt.

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

Ces quelques raccourcis suffisent déjà à **ouvrir un projet**, **installer une extension**, **chercher un fichier** et **lancer des commandes**.

### 7.2. Raccourcis Cursor à connaître

D’après la documentation Cursor, les raccourcis IA clés sont notamment :

| Action | Mac | Windows / Linux |
|--------|-----|------------------|
| Ouvrir le panneau IA | `Cmd + I` ou `Cmd + L` | `Ctrl + I` ou `Ctrl + L` |
| Édition inline | `Cmd + K` | `Ctrl + K` |
| Menu des modes | `Cmd + .` | `Ctrl + .` |
| Changer de modèle | `Cmd + /` | `Ctrl + /` |
| Accepter une suggestion | `Tab` | `Tab` |

Ce qu’il faut surtout retenir, c’est que **`Cmd/Ctrl + L`** ou **`Cmd/Ctrl + I`** servent à ouvrir ou basculer vers le chat, que **`Cmd/Ctrl + K`** permet souvent une modification ciblée sur une sélection, et que **`Tab`** sert très souvent à accepter une suggestion.

### 7.3. Raccourcis utiles avec Copilot dans VS Code

La documentation VS Code met notamment en avant l’ouverture du **chat** avec `Ctrl + Cmd + I` sur Mac ou `Ctrl + Alt + I` sur Windows/Linux, l’**inline chat** avec `Cmd + I` sur Mac ou `Ctrl + I` sur Windows/Linux, et l’acceptation d’une **suggestion inline** avec `Tab`. Le plus important n’est pas de tout retenir, mais de savoir où chercher : dans la **palette de commandes**, dans les **raccourcis clavier**, et dans la documentation officielle de l’outil.

### 7.4. Pour Claude Code : les raccourcis sont surtout des habitudes terminal

Avec un agent terminal, vous avez moins de raccourcis graphiques à mémoriser. En revanche, vous devez savoir faire trois choses : ouvrir un terminal, vous déplacer dans un dossier avec `cd`, puis lancer l’outil dans le **bon projet**. Pour un néophyte, les commandes mentales utiles sont `pwd` pour savoir où vous êtes, `ls` pour voir ce qu’il y a dans le dossier courant, `cd nom-du-dossier` pour entrer dans un dossier, `git status` pour voir l’état du projet, et `claude` pour démarrer une session Claude Code.

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

Cette façon de faire est bonne parce qu’elle vous aide à **apprendre le code**, à vérifier que l’assistant lit bien le bon contexte, à réduire le risque de casser quelque chose, et surtout à rester dans une posture de **pilote** plutôt que de simple copieur-colleur.

### 8.3. Étape 3 : faire une petite demande concrète

Exemple raisonnable :

> *"Dans ce fichier uniquement, renomme la fonction `doStuff` avec un nom plus clair et ajoute un commentaire très court au-dessus si le traitement n’est pas évident. Ne change pas le comportement."*

Ici, vous donnez exactement ce qu’il faut : le **périmètre** avec *ce fichier uniquement*, l’**objectif** avec *améliorer la lisibilité*, et la **contrainte** avec *ne pas changer le comportement*.

### 8.4. Étape 4 : relire avant d’accepter

Regardez le nom proposé, les lignes modifiées, les effets secondaires éventuels, les imports ajoutés ou supprimés, ainsi que les commentaires inutiles. L’idée n’est pas de soupçonner l’outil sur tout, mais d’apprendre à voir très vite si la modification reste propre et proportionnée.

### 8.5. Étape 5 : tester

Même sur une petite demande, faites au moins une vérification concrète : est-ce que le projet compile, est-ce que le bouton s’affiche toujours, est-ce que la page charge encore correctement, ou est-ce que le test concerné passe bien.

> **En bref**
>
> Le cycle minimal du débutant est : **ouvrir** → **demander une explication** → **faire une petite modification** → **relire** → **tester**.

---

## 9. Trois scénarios concrets, outil par outil

### 9.1. Scénario débutant dans Cursor

Imaginez que vous avez un composant de formulaire trop long.

Au début de ce scénario, l’idée est de rester en mode **Ask** ou dans le mode de question équivalent, justement pour éviter que l’outil commence à toucher aux fichiers trop tôt. On s’en sert pour **comprendre**, **repérer** et **préparer**, pas encore pour réécrire.

### Le mauvais départ

> *"Refactorise tout le formulaire et améliore l’UX."*

Cette demande est trop vague.

### Le bon départ

1. Ouvrir le chat.
2. Demander :

> *"Peux-tu m’expliquer la structure de ce composant de formulaire ? Je veux savoir quelles parties gèrent l’état, quelles parties affichent les erreurs, et quelles petites extractions seraient sans risque. Ne modifie rien pour l’instant."*

3. Lire la réponse.
4. Puis seulement demander :

> *"Dans ce fichier uniquement, extrais l’affichage du message d’erreur dans un petit sous-composant local. Ne change pas le comportement. Montre-moi le diff."*

C’est une bonne séquence parce qu’on **explore** d’abord, qu’on **cadre** ensuite, puis qu’on demande un changement **petit et observable** au lieu d’une refonte mal maîtrisée.

### 9.2. Scénario débutant dans VS Code + Copilot

Vous êtes face à une fonction JavaScript qui ajoute un item vide dans une liste.

### Utilisation progressive

1. Laissez Copilot proposer une **complétion** pour voir ce qu’il suggère.
2. Si la suggestion est trop large, ne l’acceptez pas.
3. Sélectionnez la fonction.
4. Ouvrez l’**inline chat**.
5. Demandez :

> *"Ajoute une validation pour empêcher l’ajout d’une tâche vide et supprime les espaces inutiles en début et fin de chaîne. Garde la logique existante."*

Ensuite, relisez la fonction, vérifiez que la validation n’empêche pas un cas légitime, puis testez le formulaire. Le bon usage de Copilot n’est pas de tout accepter, mais de vous faire gagner du temps sur une amélioration que vous êtes encore capable d’examiner vous-même.

### 9.3. Scénario débutant avec Claude Code

Vous avez un petit bug et un terminal ouvert dans le projet.

Vous pouvez formuler quelque chose comme :

> *"Lis le projet et aide-moi à comprendre pourquoi la route de contact renvoie une erreur 500. Commence par chercher où est définie cette route, explique-moi l’ordre des vérifications à faire, puis propose un correctif minimal si tu trouves la cause. Ne touche pas aux autres parties du site."*

Cette formulation est meilleure que *"corrige le bug."* parce qu’elle demande d’abord **de localiser** le problème, impose un **ordre**, limite le **périmètre** et autorise un correctif **minimal** plutôt qu’une réécriture gratuite.

---

## 10. Installer l’habitude qui change tout : explorer avant d’éditer

Le vrai saut de qualité ne vient pas d’un modèle plus intelligent. Il vient souvent d’une habitude très simple :

1. **comprendre** ;
2. **délimiter** ;
3. **modifier** ;
4. **vérifier**.

Dans la pratique, cela donne une séquence très simple à répéter.

### 10.1. Étape exploration

Les questions utiles ressemblent à ceci : *"Où est gérée cette logique ?"*, *"Quels fichiers sont concernés ?"*, *"Quelle fonction est appelée après ce clic ?"* ou encore *"Est-ce qu’il existe déjà un composant ou un helper similaire ?"*.

### 10.2. Étape plan

Les questions utiles ressemblent à ceci : *"Propose-moi un plan en 4 étapes maximum avant toute modification."*, *"Dis-moi quels fichiers tu comptes toucher et pourquoi."* et *"Qu’est-ce qui risque de casser si on fait ce changement ?"*.

### 10.3. Étape édition

Les demandes utiles ressemblent à ceci : *"Dans ce fichier uniquement..."*, *"Sans changer le comportement..."*, *"En gardant l’API publique actuelle..."* ou *"Avec un diff relisible et minimal..."*.

### 10.4. Étape vérification

Les demandes utiles ressemblent à ceci : *"Quelle vérification manuelle je dois faire ensuite ?"*, *"Quels tests sont les plus pertinents pour ce changement ?"* et *"Quels cas limites ce correctif ne couvre pas encore ?"*.

---

## 11. Prompts faibles, prompts utiles, prompts très utiles

| Situation | Prompt faible | Prompt utile | Prompt très utile |
|-----------|---------------|--------------|-------------------|
| Comprendre un fichier | `Explique ce code` | `Explique ce fichier en français simple.` | `Explique ce fichier en français simple : rôle global, fonctions principales, dépendances importantes, et ce que je peux modifier sans risque si je veux seulement changer le texte affiché.` |
| Corriger un bug | `Corrige le bug` | `Corrige l’erreur 500 sur la page contact.` | `La page contact renvoie 500 après soumission. Contexte : stack Next.js, route serveur déjà existante. Commence par localiser le fichier concerné, explique l’hypothèse la plus probable, puis propose un correctif minimal. Ne modifie pas la structure du formulaire côté front.` |
| Refactor | `Améliore ce code` | `Refactorise cette fonction.` | `Dans cette fonction uniquement, extrais la validation e-mail dans un helper nommé validateEmail. Ne change pas le comportement, ne modifie pas l’API publique, et montre le diff.` |
| Première feature | `Ajoute une recherche` | `Ajoute une barre de recherche sur cette page.` | `Sur cette page uniquement, ajoute une recherche locale côté client sur la liste déjà affichée. Pas d’appel réseau supplémentaire. Critère fini : l’utilisateur peut filtrer les titres en tapant dans un champ.` |

Un bon prompt dit **où** l’on agit, **quoi** faire, **ce qu’il ne faut pas toucher**, et **comment vérifier** le résultat. Plus ce cadre est clair, moins l’assistant a besoin d’inventer le reste.

---

## 12. Coût, tokens, contexte : ce qu’il faut comprendre sans devenir expert

Un **token** est une unité de texte découpée par le modèle. Ce n’est pas exactement un mot, mais l’idée pratique est simple : plus vous envoyez de texte, plus la requête est lourde, plus l’historique s’allonge, plus le contexte peut gonfler, et plus la réponse est longue, plus elle peut consommer de ressources ou de quota.

### 12.1. Le problème des longs fils

Beaucoup de débutants font ceci :

1. ils ouvrent un chat ;
2. ils parlent de trois bugs ;
3. puis d’une feature ;
4. puis d’un refactor ;
5. puis d’une erreur terminal.

Résultat : l’outil répond parfois au **mauvais sujet**, il traîne de vieux morceaux de contexte, il devient moins précis, et vous consommez du budget ou du quota pour du **bruit**.

### 12.2. Le bon réflexe

Le bon réflexe est simple : un **sujet** correspond à un **fil**, un **gros changement** commence par un **plan** puis se déroule en plusieurs petites étapes, et un **nouveau problème** mérite souvent un **nouveau chat**.

---

## 13. Ce qu’il faut absolument éviter

Voici les erreurs les plus fréquentes quand on débute avec l’IA dans le code.

### 13.1. Demander trop grand trop tôt

Exemple typique :

> *"Reprends toute l’architecture."*

Un débutant n’a pas encore les moyens de relire un gros diff. Il faut commencer par des tâches **petites**, **visibles**, **testables**.

### 13.2. Confondre vitesse et compréhension

Ce n’est pas parce que l’outil vous donne un correctif en 8 secondes que vous avez compris ce qui s’est passé. Or si vous ne comprenez rien, vous serez bloqué à la prochaine erreur.

### 13.3. Copier-coller des erreurs sans filtrer

Reprenez le réflexe du chapitre 2 : pas de `.env`, pas de clé API, pas de token, pas de dump de base, et pas de lien signé ou d’URL contenant un secret.

### 13.4. Exécuter une commande non comprise

C’est particulièrement important avec les agents terminal.

Mauvais réflexe :

> *"Il me dit de lancer ça, donc je lance."*

Bon réflexe :

> *"Qu’est-ce que cette commande fait exactement ? Quels fichiers touche-t-elle ? Est-ce réversible ?"*

### 13.5. Accepter une suggestion parce qu’elle a l’air propre

Le style peut être bon et la logique mauvaise. Il faut donc vérifier les noms, les imports, les conditions, les cas limites, et la compatibilité avec la stack du projet.

> **Attention**
>
> Le vrai danger n’est pas la réponse absurde. C’est la réponse **presque crédible** qui passe en revue trop vite.

---

## 14. Petites astuces qui font gagner du temps

### 14.1. Demander d’abord une explication niveau débutant

Exemple :

> *"Explique-moi ce fichier comme à quelqu’un qui découvre React."*

Vous obtenez souvent un meilleur apprentissage qu’en demandant directement une réécriture.

### 14.2. Forcer le périmètre

Ajoutez des formulations comme *"dans ce fichier uniquement"*, *"ne change pas le comportement"*, *"ne modifie pas la couche API"* ou *"propose d’abord un plan"*. Ce sont de petites phrases, mais elles changent souvent beaucoup la qualité du résultat.

### 14.3. Demander une revue du diff

Après une modification, vous pouvez demander :

> *"Relis ce diff comme un reviewer senior : bugs possibles, cas limites, oublis de tests."*

Autrement dit, la **code review** peut aussi être **assistée par l’IA**. C’est souvent utile pour faire remonter rapidement des oublis, des cas limites ou des incohérences de style. Mais là encore, l’outil prépare ou enrichit la revue ; il ne remplace pas la **décision finale** de la personne responsable du code.

### 14.4. Demander les cas limites

Très bonne habitude :

> *"Quels cas limites pourrais-je oublier ici ?"*

### 14.5. Utiliser l’IA pour apprendre les outils, pas seulement écrire du code

Pensez aussi à poser des questions comme *"À quoi sert ce fichier `package.json` ?"*, *"Que fait `git status` ?"* ou *"Quelle différence entre composant serveur et composant client ici ?"*. L’IA est souvent plus rentable quand elle vous aide à **monter en compétence** que quand elle vous fait simplement copier du code que vous ne comprenez pas.

---

## 15. Pour les PO / PM et les profils moins techniques

Même si vous ne codez pas toute la journée, ce chapitre vous concerne.

Vous aidez beaucoup l’équipe si vous savez demander **le périmètre exact** du changement, **les fichiers ou zones impactés**, **la définition de fini** et **la vérification concrète** après changement. Vous pouvez aussi, avec l’IA, prendre en charge certains **micro-tickets** qui allègent vraiment la charge des développeurs : reformuler un texte d’interface, corriger une faute dans une doc, préparer un brouillon de ticket mieux cadré, proposer une FAQ, clarifier un message d’erreur ou vérifier qu’un critère d’acceptation est testable.

En revanche, il y a une limite importante : un PO ou un PM ne rend pas service à l’équipe s’il arrive avec une **énorme pull request générée à l’IA** que personne n’a demandée et que les développeurs doivent relire pendant une heure. Même si l’intention est bonne, cela crée vite des frictions entre métiers, parce que la charge est simplement déplacée au lieu d’être réduite.

La bonne logique est donc la suivante : **petits tickets, petit périmètre, petite revue**. Si une modification touche à l’architecture, à la dette technique, à la sécurité, aux migrations, aux tests profonds ou à plusieurs fichiers sensibles, le développeur reste central. L’IA peut aider, le PO / PM peut préparer et clarifier, mais la responsabilité de construction reste côté développement.

Une image simple aide à garder la bonne posture : l’architecte d’une maison ne va pas poser lui-même le carrelage, mais il sait voir si une rangée part de travers, si les joints sont irréguliers ou si le rendu final ne respecte plus le plan. Pour un produit numérique, c’est pareil : un PO / PM n’a pas besoin d’écrire tout le code, mais il gagne énormément à repérer qu’une demande est mal découpée, qu’une PR est disproportionnée, qu’un comportement utilisateur ne colle pas au besoin, ou qu’un livrable est difficile à valider proprement.

Exemple de demande utile côté produit :

> *"Avant de coder, donne-moi les fichiers que tu comptes toucher, le risque principal, et comment on vérifiera que le formulaire de devis fonctionne toujours."*

Cette posture réduit les allers-retours et limite les diffs magiques difficiles à relire. Elle aide aussi à garder une bonne relation de travail entre produit et développement : l’IA sert alors à mieux préparer, mieux cadrer et mieux vérifier, pas à contourner le métier des devs.

---

## 16. Documentation officielle à garder sous la main

Les liens changent moins vite que les vidéos top 10 outils IA du mois. Gardez les sources officielles.

| Sujet | Source officielle |
|-------|-------------------|
| Télécharger **VS Code** | [https://code.visualstudio.com/download](https://code.visualstudio.com/download) |
| Documentation **VS Code** | [https://code.visualstudio.com/docs](https://code.visualstudio.com/docs) |
| Premiers pas **Copilot dans VS Code** | [https://code.visualstudio.com/docs/copilot/getting-started](https://code.visualstudio.com/docs/copilot/getting-started) |
| Documentation **GitHub Copilot** | [https://docs.github.com/copilot](https://docs.github.com/copilot) |
| Télécharger **Cursor** | [https://cursor.com/downloads](https://cursor.com/downloads) |
| Documentation **Cursor** | [https://cursor.com/docs](https://cursor.com/docs) |
| Raccourcis **Cursor** | [https://cursor.com/docs/reference/keyboard-shortcuts](https://cursor.com/docs/reference/keyboard-shortcuts) |
| Vue d’ensemble **Claude Code** | [https://docs.anthropic.com/en/docs/claude-code/overview](https://docs.anthropic.com/en/docs/claude-code/overview) |
| Démarrer avec **Claude Code** | [https://docs.anthropic.com/en/quickstart](https://docs.anthropic.com/en/quickstart) |
| **Codex** chez OpenAI | [https://developers.openai.com/codex](https://developers.openai.com/codex) |
| Guide de prompting **Codex** | [https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide) |

> **Prudence**
>
> Si un tutoriel YouTube, un thread LinkedIn ou un blog vous dit de cliquer quelque part mais que la doc officielle dit autre chose, **croyez d’abord l’éditeur du produit**.

---

## 17. Checklist de fin de chapitre

- [ ] Je peux expliquer la différence entre **complétion**, **chat** et **agent**.
- [ ] Je sais ouvrir un projet dans un IDE et repérer **explorateur**, **éditeur**, **terminal**, **extensions**.
- [ ] Je connais au moins **3 raccourcis** utiles dans mon outil principal.
- [ ] Je sais installer **au moins un** assistant parmi **Copilot**, **Cursor** ou **Claude Code**.
- [ ] Je sais formuler une première demande **petite**, **bornée** et **vérifiable**.
- [ ] Je sais qu’un **chat web généraliste** n’est pas toujours le meilleur choix pour travailler sur un vrai dépôt.
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

