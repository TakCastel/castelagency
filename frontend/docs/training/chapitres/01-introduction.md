# Chapitre 1 · Introduction : contexte et cadre de travail

Les assistants fondés sur de grands modèles de langage sont **entrés dans le quotidien** des équipes : complétions dans l’éditeur, chat à côté du code, parfois réponses directement dans le produit livré au client. La difficulté n’est plus seulement d’y accéder ; c’est d’y travailler **sans perdre le fil** (qualité, sécurité, responsabilité) quand tout incite à aller vite.

Cette formation relie **usages concrets**, **méthode** et **garde-fous**. Elle commence par ce que tout le monde peut partager au même niveau : une langue commune pour parler de l’IA dans le travail, une vue d’ensemble du parcours, et un ordre de lecture qui évite de brûler les étapes. Vous y trouverez les définitions (IA générative, LLM, IDE…), puis la suite logique du cours : sécurité, outils dans l’éditeur, prompts, cadrage, intégration produit, GEO.

Le parcours s’adresse aux personnes qui développent ou travaillent à côté du code (PO, PM, support, montée en compétences), avec ou sans expérience préalable des assistants. **Aucun prérequis technique lourd** n’est exigé ici. Si un passage vous semble dense, vous pouvez le survoler et y revenir après les sections suivantes.

---

## 1. Ce que vous saurez faire après ce chapitre, objectifs clairs

À la fin de ces pages, vous devriez pouvoir :

1. **Expliquer avec vos mots** ce qu’on entend par **IA générative** et **LLM** dans ce cours : idée générale, usage typique dans un outil, et **limites** (par exemple erreurs possibles, pas de "conscience" au sens humain).
2. **Reconnaître deux grands usages** : aide dans l’**éditeur de code** (IDE) et aide dans des **produits** (chat, doc, site).
3. **Reconnaître le piège du "vibe coding"** : aller vite en copiant-collant du code proposé par l’IA **n’est pas interdit** (brouillon, prototype, apprentissage) ; le piège, c’est d’**en rester là** sans **relecture** du diff, **tests** et prudence sur les **données** envoyées aux outils.
4. **Savoir ce qui arrive ensuite** dans le parcours : un volet **sécurité et données** viendra juste après ; il faudra l’avoir parcouru **avant** de coller du vrai code ou des informations sensibles dans un chat.

> **En bref**
>
> Ce chapitre pose les **repères** : vocabulaire partagé, cadre du cours, ordre de lecture. Les suivants entrent dans la **pratique** (assistants, prompts, BMAD, intégration produit, GEO), avec une même règle : **montrer l’idée et l’exemple**, puis seulement le jargon et les acronymes.

---

## 2. Qu’est-ce qu’on appelle "IA" ici, en version simple

Dans ce cours, quand on dit **IA générative** ou **LLM** (*Large Language Model*, grand modèle de langage), on parle d’un **programme statistique** entraîné sur d’énormes quantités de texte. Il **prédit** la suite de mots (ou de tokens) la plus **plausible** compte tenu de la consigne, du **prompt** et du contexte qu’on lui donne.

Une image utile (imparfaite mais pédagogique) : pensez à un **correcteur orthographique très amplifié**. Le correcteur ne "lit" pas votre roman avec une conscience ; il propose le mot suivant le plus probable. Un LLM fait pareil, à une **échelle** et avec une **souplesse** bien plus grandes : phrases entières, bouts de code, listes à puces, etc.

Trois conséquences pratiques pour vous, aujourd’hui :

- **Il ne "comprend" pas** comme un humain : il assemble des régularités de langage vues pendant l’entraînement. Il peut donc être **convaincant** tout en étant **à côté de la plaque**.
- **Il peut se tromper** ou broder des détails : on parle souvent d’**hallucination** (nuances et définitions : **plus loin**, le glossaire du parcours recense les termes).
- **Il peut aller vite** pour proposer du code, des textes, des plans : d’où l’intérêt pour le développement et le produit, **à condition** de garder la main sur la qualité et la sécurité.

### 2.1. Trois micro-exemples "comme au bureau"

**Exemple A : Le mail pénible.**  
Vous devez annoncer un **léger retard** à un client, sans être flou ni agressif. Vous rédigez trois phrases à la main, puis vous demandez à un assistant de **proposer deux variantes** plus courtes. **À votre charge** : relire, enlever ce qui sonne "robot", vérifier les faits (dates, montants).

**Exemple B : La fonction mal nommée.**  
Dans un fichier, une fonction s’appelle `doStuff()`. Vous savez ce qu’elle fait ; vous voulez un nom **lisible** pour vos collègues. Vous décrivez en une phrase son rôle ; l’outil propose `calculateShippingDeadline()`. **À votre charge** : vérifier que le nom colle **vraiment** au comportement (en lisant le code ou en lançant les tests).

**Exemple C : L’erreur incompréhensible.**  
Votre terminal affiche une **stack trace** de dix lignes. Vous copiez le message **sans** mots de passe ni jetons ; vous demandez : *"En français simple : quelle est l’hypothèse la plus probable, et quelles 2 à 3 vérifications je fais en premier ?"* **À votre charge** : ne pas croire la première explication sur parole ; le **contenu** du presse-papiers compte autant que la question posée, et la suite du cours expliquera **pourquoi**, avec des exemples.

Ces trois cas sont volontairement **petits** pour fixer les idées.

Plus loin dans le parcours, vous verrez comment enchaîner sur des **axes de développement entiers** avec un assistant dans l’IDE, par exemple :

- **Internationalisation (i18n)** : structure des composants, extraction ou harmonisation des chaînes, conventions de fichiers de traduction ;
- **Accessibilité (a11y)** : textes alternatifs pertinents, ordre de tabulation, focus visible, audits ciblés sur quelques écrans critiques.

L’objectif est une itération **cadrée** en **quelques minutes** (périmètre, prompt, relecture du *diff*, tests), là où le même type de chantier pouvait encore **mobiliser plusieurs jours** d’équipe il y a quelques années.

La **méthode** (ticket, prompt, relecture du *diff*, tests) est déclinée **plus loin**, quand on entrera dans l’IDE et les assistants. Le **cadre données et secrets** doit être posé **avant** de lancer de gros refactors sur un dépôt réel : on le verra juste après cette introduction.

> **En bref**
>
> L’IA ici = **outil d’aide à la rédaction et au code**, pas un collègue infallible. **Vous** restez le pilote.

---

## 3. Où intervient-elle concrètement ?

L’IA ne se résume pas à "un chat dans un onglet". Selon le **lieu** (éditeur, application cliente, plateforme Git, automate interne, mail…), ce qui est **à risque** et le **type de données** concernées **changent** : ce n’est pas la même chose de modifier du code dans le dépôt, de répondre à un utilisateur final dans le produit, ou de coller une capture dans un fil de messagerie.

Ce chapitre ne prétend **pas** recenser **tous** les usages possibles (la **data**, le **design**, la **veille**… ont les leurs aussi). Pour une **équipe qui livre du logiciel**, on retrouve surtout les **familles** ci-dessous.

### Éditeur de code et dépôt

Pour un développeur ou une développeuse, c’est souvent le premier réflexe : **complétions**, **chat** sur les fichiers du projet, **agents** sur plusieurs fichiers, parfois **terminal** ou ligne de commande tant que le fil reste **attaché au dépôt**.

Une même idée reviendra dans tout le parcours : **but clair** (ou petit ticket) → **prompt** → **relecture du diff** → **tests**. Les noms d’outils varient (**Cursor**, **GitHub Copilot**, **Claude Code**, etc.) ; la **discipline** est la même.

### Dans le produit et sur vos sites

Ici, l’IA apparaît dans **ce que vous livrez au monde** : **chat** ou assistant **dans l’application**, **FAQ** ou moteur de questions sur la **documentation**, parfois **modération** ou **résumé** côté interface.

**Attention à la confusion** : ouvrir **ChatGPT** (ou un autre service **généraliste**) dans le navigateur pour rédiger **pour soi** relève plutôt du **bureau** (section suivante). Ce n’est pas le même **objet** qu’une fonctionnalité **intégrée** à votre service, même si la **technologie** peut se ressembler.

### Hébergement Git : GitHub, GitLab, Bitbucket…

Les plateformes d’hébergement accueillent une part croissante d’**aide à la revue** : **pull requests** / **merge requests**, résumés de changements, commentaires ou suggestions **avant** fusion.

Comme dans l’éditeur, ce que vous **saisissez** ou **collez** peut être **traité hors de votre machine**. C’est le même réflexe de prudence **avant** d’y mettre des **secrets** ou des **données personnelles**.

### Automatisation et coulisses

**n8n**, **Make**, **webhooks**, petits scripts ou services internes qui appellent un LLM pour **trier**, **router** ou **reformater** : tout cela est souvent **peu visible** dans l’organigramme, mais très **présent** dans les flux réels.

Les **secrets**, les **données clients** et les **logs** s’y croisent comme ailleurs : la **cartographie** (qui appelle quoi, avec quelles clés) vaut le coup dès que l’on industrialise.

### Bureautique et messagerie

**Mails**, **chats d’équipe**, **documents partagés** : brouillons, synthèses de réunion, reformulation rapide. Très utile au quotidien.

Le **cadre** (qui lit quoi, combien de temps c’est **conservé**, quel pays héberge le service) est souvent **différent** de celui de l’IDE ou du Git : notez-le **à part** si votre projet est encadré (client exigeant, secteur régulé, etc.).

### Une même semaine, plusieurs canaux

Il est courant que tout **coexiste** : du **code** assisté dans l’éditeur, des **critères** produit rédigés avec un assistant, une **FAQ** côté support, une **pull request** commentée sur GitHub ou GitLab, plus un **flux** d’automatisation qui résume des tickets.

Quand les **canaux** se multiplient, le piège est de croire qu’"une seule règle" suffit. En pratique, aidez-vous d’une **liste simple** : quel **outil**, quelles **données**, pour **quel public** (interne, client, hébergeur), y compris ce qui passe par le **mail** ou les **automatisations**. Vous gagnerez en clarté **avant** un audit ou un incident.

### Visibilité des contenus et GEO

La façon de rendre vos pages **utiles** et **citables** par les assistants ou les synthèses (souvent regroupée sous l’étiquette **GEO**) sera vue **plus loin** dans le cours, au croisement du **produit** et de la **rédaction** pour le web.

---

## 4. "Vibe coding" : qu’est-ce que c’est, et pourquoi on en parle ?

Le **vibe coding**, c’est l’idée de **coder au feeling** avec l’IA : on demande, on colle, on ajuste jusqu’à ce que "ça marche" sur sa machine. **Ce n’est pas interdit** : c’est même une façon naturelle d’apprendre quand on débute ou quand on prototype.

Le risque, c’est d’**oublier** au passage :

- la **relecture** du code (une ligne mal placée peut ouvrir une faille de sécurité ou casser un cas limite) ;
- les **tests** (ça marche sur votre PC, pas forcément en **intégration** ou en production) ;
- la **protection des données** (un copier-coller dans le chat peut **quitter** votre poste selon l’outil : **on y reviendra** tout de suite après cette introduction).

**Ce cours** vous aide à **concilier** itération rapide avec l’IA et **cadre pro** : **sécurité**, **méthode** (assistants, prompts, Markdown, cadrage), **qualité des contenus** (dont **GEO**), **intégration dans le produit** (chat, APIs, flux serveur). Chaque bloc est approfondi **plus loin**, dans l’ordre du parcours.

> **Attention**
>
> "ça compile" ou "ça répond" ne suffit pas comme **définition de fini** sur un projet pro. On vous donne des **critères** et des **habitudes** pour éviter la dette cachée.

---

## 5. Pour les PO / PM : votre rôle dans l’histoire

Vous n’avez pas besoin de savoir écrire le code à la place du développeur. En revanche, vous aidez énormément si vous :

- **formulez clairement** le besoin (qui, quoi, pourquoi, **dans quel contexte** : mobile ? hors ligne ? données personnelles ?) ;
- **acceptez ou refusez** un livrable en vous appuyant sur des **critères vérifiables** ("on peut tester que...", "la doc utilisateur mentionne...") ;
- **posez les questions de sécurité** simples mais tenaces : *"Quelles données partent vers quel outil ?"*, *"Qui a accès à quoi dans la doc interne ?"*, *"Que se passe-t-il si l’IA est indisponible ?"*.

**Exemple classique (mot de passe oublié).**  
Une phrase du type *"Rendre la connexion plus intelligente avec l’IA"* ne permet ni à l’équipe de **coder**, ni à vous de **valider** quoi que ce soit.

Une *user story* plus **classique** et **actionnable** ressemble à ceci :

- *En tant qu’**utilisateur** qui a oublié son mot de passe, je veux **demander un lien de réinitialisation** depuis l’écran de connexion, afin de **retrouver l’accès** à mon compte sans appeler le support.*

À partir de là, on peut attacher des **critères vérifiables** (exemples) : le formulaire refuse un e-mail **mal formé** ; si l’adresse correspond à un compte, un message de confirmation s’affiche et un e-mail part dans un **délai raisonnable** sur la recette ; le lien dans l’e-mail ne marche qu’**une fois** et **expire** après 24 h ; si l’adresse n’existe pas, l’interface affiche le **même message** qu’en cas de succès (pour ne pas révéler quels comptes existent).

L’IA peut aider à **rédiger** ou à **compléter** ce genre de texte ; **arbitrer** le fond (métier, légal, sécurité) reste **à vous** et à l’équipe.

---

## 6. Erreurs fréquentes à éviter dès le début

1. **Croire que l’IA remplace la responsabilité humaine.**  
   Non : **vous** (ou l’équipe) restez responsables du résultat : **sécurité**, respect des règles métier, **dette technique** (code difficile à maintenir plus tard).

2. **Confondre "fluide" et "juste".**
   Une réponse bien tournée peut être **fausse** ou **incomplète**. Le réflexe utile : une **deuxième source** (doc officielle, test, ticket d’origine).

3. **Tout mettre dans le chat "pour gagner du temps".**
   Les secrets et les données sensibles méritent un **traitement à part** : ce n’est pas de la paranoïa, c’est du **quotidien** illustré **plus loin** avec des exemples.

---

## 7. Aller plus loin : documentation utile et reconnue

Les liens ci-dessous pointent vers des **sources officielles** ou des **cadres** souvent cités en entreprise. La langue est souvent l’anglais ; utilisez un traducteur ou l’assistant **uniquement** sur des extraits **non confidentiels** si vous testez des résumés.

| Sujet | Où creuser (externe) |
|--------|----------------------|
| **Bonnes pratiques de prompting** (généralistes) | [Guide prompt engineering : OpenAI](https://platform.openai.com/docs/guides/prompt-engineering) |
| **Documentation produit Claude (Anthropic)** | [Docs Anthropic](https://docs.anthropic.com/) |
| **GitHub Copilot** (usage dans l’écosystème GitHub / VS Code) | [GitHub Copilot : documentation](https://docs.github.com/en/copilot) |
| **Cursor** (éditeur / assistant sur le dépôt) | [Cursor : Documentation](https://cursor.com/docs) |
| **Risques applicatifs autour des LLM** (vue OWASP, utile en équipe) | [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| **Cadre européen** (obligations, acteurs, chronologie : à lire avec calme) | [Commission européenne : IA Act / AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) |

> **En bref**
>
> Ces pages **complètent** le cours ; elles ne le **remplacent** pas. Notre fil conducteur reste **votre** contexte (petit site, startup, grande org) et la **suite du parcours** pour la mise en pratique progressive.

---

## Mini-glossaire du chapitre 1

| Mot | Explication courte |
|-----|---------------------|
| **LLM** | Modèle de langage qui génère du texte ou du code à partir d’une consigne. |
| **Prompt** | La **consigne** que vous écrivez pour obtenir une réponse ("explique...", "corrige..."). |
| **IDE** | Votre **éditeur de code** (souvent avec terminal, débogueur, extensions). |
| **GEO** | Faire en sorte que vos contenus soient **utiles et citables** par les assistants ou moteurs "intelligents" ; la stratégie détaillée arrive **plus loin** dans le cours. |
| **Token** | **Unité** comptée par le modèle (bout de mot, mot entier ou signe) : le texte et le contexte sont découpés en tokens ; cela explique les **limites de taille** ("fenêtre de contexte") et le coût ou la lenteur quand on envoie trop de contenu d’un coup. |
| **Diff** | (Souvent écrit *diff*.) **Vue des modifications** proposées ou réalisées dans des fichiers, **ligne par ligne** (ajouts / suppressions) : support habituel pour **relire** avant d’accepter du code, y compris généré par l’IA. |
| **Hallucination** | Réponse **plausible** mais **fausse** ou **inventée** (références bidon, API qui n’existe pas, détail précis sans source) : le modèle "complète" statistiquement ; d’où la règle de **vérifier** par tests, doc ou sources. |

---

## À retenir en une phrase

L’IA est utile quand le **périmètre** est clair et qu’on peut **prouver** que le résultat tient la route (tests, sources, critères d’acceptation) : **avec vous** aux commandes, du premier prompt jusqu’à la mise en production.
