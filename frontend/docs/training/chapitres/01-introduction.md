# Chapitre 1 · Introduction : contexte et cadre de travail

Les assistants fondés sur de grands modèles de langage sont **entrés dans le quotidien** des équipes : complétions dans l’éditeur, chat à côté du code, parfois réponses dans le produit livré au client. La difficulté n’est plus seulement d’y accéder, mais d’y travailler **sans perdre le fil** — qualité, sécurité, responsabilité — quand tout pousse à aller vite.

Ce guide pratique relie **usages concrets**, **méthode** et **garde-fous**. Il pose d’abord une **langue commune** (IA générative, LLM, IDE…), un **parcours lisible** et un **ordre de lecture** qui évite de brûler les étapes, puis enchaîne sur la sécurité, l’éditeur, les prompts, le cadrage, l’intégration produit et le GEO.

Le parcours s’adresse aux personnes qui développent ou travaillent à côté du code (PO, PM, support, montée en compétences), avec ou sans expérience préalable des assistants. **Aucun prérequis technique lourd** n’est exigé ici. Si un passage vous semble dense, vous pouvez le survoler et y revenir après les sections suivantes.

---

## 1. Ce que vous saurez faire après ce chapitre, objectifs clairs

À la fin de ces pages, vous devriez pouvoir :

1. **Expliquer simplement** ce qu’est une IA générative / un LLM, avec ses limites.
2. **Distinguer deux usages** : aide dans l’IDE et aide dans les produits.
3. **Repérer le piège du vibe coding** : aller vite sans relire le diff, sans tests, sans prudence sur les données.
4. **Comprendre la suite** : la section sécurité vient juste après, et doit être lue avant tout usage réel.

Les parties suivantes du parcours entrent dans la **pratique** (assistants, prompts, BMAD, intégration produit, GEO) sous la même règle : **montrer l’idée et l’exemple**, puis le jargon et les acronymes.

---

## 2. Qu’est-ce qu’on appelle "IA" ici, en version simple

Dans ce cours, quand on dit **IA générative** ou **LLM** (*Large Language Model*, grand modèle de langage), on parle d’un **programme statistique** entraîné sur d’énormes quantités de texte. Il **prédit** la suite de mots (ou de tokens) la plus **plausible** compte tenu de la consigne, du **prompt** et du contexte qu’on lui donne.

Une image utile (imparfaite mais pédagogique) : pensez à un **correcteur orthographique très amplifié**. Le correcteur ne "lit" pas votre roman avec une conscience ; il propose le mot suivant le plus probable. Un LLM fait pareil, à une **échelle** et avec une **souplesse** bien plus grandes : phrases entières, bouts de code, listes à puces, etc.

Trois conséquences pratiques pour vous, aujourd’hui :

- **Il ne "comprend" pas** comme un humain : il assemble des régularités de langage vues pendant l’entraînement. Il peut donc être **convaincant** tout en étant **à côté de la plaque**.
- **Il peut se tromper** ou broder des détails : on parle souvent d’**hallucination** ; le **glossaire** (fin du parcours) précise les nuances.
- **Il peut aller vite** pour proposer du code, des textes, des plans : d’où l’intérêt pour le développement et le produit, **à condition** de garder la main sur la qualité et la sécurité.

### 2.1. Trois micro-exemples "comme au bureau"

**Exemple A : Le mail pénible.**  
Vous devez annoncer un **léger retard** à un client, sans être flou ni agressif. Vous rédigez trois phrases à la main, puis vous demandez à un assistant de **proposer deux variantes** plus courtes. **À votre charge** : relire, enlever ce qui sonne "robot", vérifier les faits (dates, montants).

**Exemple B : La fonction mal nommée.**  
Dans un fichier, une fonction s’appelle `doStuff()`. Vous savez ce qu’elle fait ; vous voulez un nom **lisible** pour vos collègues. Vous décrivez en une phrase son rôle ; l’outil propose `calculateShippingDeadline()`. **À votre charge** : vérifier que le nom colle **vraiment** au comportement (en lisant le code ou en lançant les tests).

**Exemple C : L’erreur incompréhensible.**  
Votre terminal affiche une **stack trace** de dix lignes. Vous copiez le message **sans** mots de passe ni jetons ; vous demandez : *"En français simple : quelle est l’hypothèse la plus probable, et quelles 2 à 3 vérifications je fais en premier ?"* **À votre charge** : ne pas croire la première explication sur parole ; le **contenu** du presse-papiers compte autant que la question posée, et la suite du cours expliquera **pourquoi**, avec des exemples.

Ces trois cas sont volontairement **petits** pour fixer les idées.

Plus loin : chantiers IDE (**i18n**, **a11y**, etc.) avec la même discipline — périmètre, prompt, *diff*, tests — en itérations courtes. Les **assistants** détaillent la méthode ; la **sécurité et les données** viennent **juste après** cette intro.

L’IA reste un **outil d’aide**, pas un collègue infallible : **vous** pilotez.

---

## 3. Où intervient-elle concrètement ?

Pas seulement « un chat dans un onglet » : selon le **lieu** (IDE, produit, Git, automate, mail…), **risques** et **données** ne sont pas les mêmes — dépôt, utilisateur final ou messagerie, ce n’est pas équivalent.

Ci-dessous, des **familles** utiles pour une équipe qui livre du logiciel (sans viser tous les métiers).

### Éditeur de code et dépôt

Pour un développeur ou une développeuse, c’est souvent le premier réflexe : **complétions**, **chat** sur les fichiers du projet, **agents** sur plusieurs fichiers, parfois **terminal** ou ligne de commande tant que le fil reste **attaché au dépôt**.

Une même idée reviendra dans tout le parcours : partir d’un **but clair** (ou d’un petit ticket), formuler un **prompt**, **relire le diff**, puis **tester**. Les noms d’outils changent (**Cursor**, **GitHub Copilot**, **Claude Code**, etc.) ; la **discipline** reste la même.

### Dans le produit et sur vos sites

Ici, l’IA apparaît dans **ce que vous livrez au monde** : **chat** ou assistant **dans l’application**, **FAQ** ou moteur de questions sur la **documentation**, parfois **modération** ou **résumé** côté interface.

**Attention à la confusion** : ouvrir **ChatGPT** (ou un autre service **généraliste**) dans le navigateur pour rédiger **pour soi** relève plutôt du **bureau** (section suivante). Ce n’est pas le même **objet** qu’une fonctionnalité **intégrée** à votre service, même si la **technologie** peut se ressembler.

### Hébergement Git : GitHub, GitLab, Bitbucket…

**Pull requests** / **merge requests**, résumés de changements, suggestions avant fusion : l’aide à la revue y est de plus en plus présente. Même prudence que dans l’éditeur : saisie et collage peuvent être **traités hors de votre machine** — pas de **secrets** ni de **données personnelles** sans cadre explicite.

### Automatisation et coulisses

**n8n**, **Make**, **webhooks**, petits scripts ou services internes qui appellent un LLM pour **trier**, **router** ou **reformater** : tout cela est souvent **peu visible** dans l’organigramme, mais très **présent** dans les flux réels.

Les **secrets**, les **données clients** et les **logs** s’y croisent comme ailleurs : la **cartographie** (qui appelle quoi, avec quelles clés) vaut le coup dès que l’on industrialise.

### Bureautique et messagerie

**Mails**, **chats d’équipe**, **documents partagés** : brouillons, synthèses de réunion, reformulation rapide. Très utile au quotidien.

Le **cadre** (qui lit quoi, combien de temps c’est **conservé**, quel pays héberge le service) est souvent **différent** de celui de l’IDE ou du Git : notez-le **à part** si votre projet est encadré (client exigeant, secteur régulé, etc.).

### Une même semaine, plusieurs canaux

IDE, produit, support, PR, automates : tout **coexiste**. Une seule règle globale ne suffit pas — gardez une **grille** (outil, données, public : interne / client / hébergeur) **avant** incident ou audit.

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

Vous n’avez pas besoin d’écrire le code à la place du développeur. Vous aidez surtout si vous :

- **formulez** le besoin (qui, quoi, pourquoi, **contexte** : mobile, hors ligne, données perso…) ;
- **validez ou refusez** avec des **critères vérifiables** (« on peut tester que… », « la doc dit… ») ;
- **posez** les questions sécurité courtes : *où vont les données et avec quel outil ?*, *qui lit quoi dans la doc interne ?*, *que faire si l’IA est indisponible ?*.

**Exemple (mot de passe oublié).** *« Connexion plus intelligente avec l’IA »* ne permet ni de **coder** ni de **valider**. Une story **actionnable** :

- *En tant qu’**utilisateur** ayant oublié son mot de passe, je veux **demander un lien de réinitialisation** depuis l’écran de connexion pour **retrouver l’accès** sans le support.*

**Critères** (exemples) : un e-mail invalide est refusé ; si l’adresse existe, l’utilisateur voit une confirmation et l’e-mail part en **délai raisonnable** en recette ; le lien est à **usage unique** et **expire** sous 24 h ; si l’adresse n’existe pas, l’interface affiche le **même message** qu’en cas de succès pour éviter l’énumération de comptes.

L’IA peut **brouillonner** ce texte ; **métier, légal, sécurité** : **vous** et l’équipe.

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

Ces liens **complètent** le cours sans le remplacer ; le fil conducteur reste **votre** contexte et la **suite du parcours** pour la mise en pratique.

---

## Mini-glossaire du chapitre 1

| Mot | Explication courte |
|-----|---------------------|
| **LLM** | Modèle de langage qui génère du texte ou du code à partir d’une consigne. |
| **Prompt** | La **consigne** que vous écrivez pour obtenir une réponse ("explique...", "corrige..."). |
| **IDE** | Votre **éditeur de code** (souvent avec terminal, débogueur, extensions). |
| **GEO** | Faire en sorte que vos contenus soient **utiles et citables** par les assistants ou moteurs "intelligents" ; la stratégie détaillée arrive **plus loin** dans le cours. |
| **Token** | Unité comptée par le modèle (morceau de mot, mot ou signe). Le texte et le contexte sont découpés en tokens, d’où la **fenêtre de contexte**, le **coût** et la **lenteur** si l’on envoie trop de contenu d’un coup. |
| **Diff** | (Souvent écrit *diff*.) **Vue des modifications** proposées ou réalisées dans des fichiers, **ligne par ligne** (ajouts / suppressions) : support habituel pour **relire** avant d’accepter du code, y compris généré par l’IA. |
| **Hallucination** | Réponse **plausible** mais **fausse** ou **inventée** (références bidon, API qui n’existe pas, détail précis sans source) : le modèle "complète" statistiquement ; d’où la règle de **vérifier** par tests, doc ou sources. |

---

## À retenir en une phrase

L’IA est utile quand le **périmètre** est clair et qu’on peut **prouver** que le résultat tient la route (tests, sources, critères d’acceptation) : **avec vous** aux commandes, du premier prompt jusqu’à la mise en production.
