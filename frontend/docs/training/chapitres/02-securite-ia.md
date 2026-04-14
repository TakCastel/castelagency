# Chapitre 2 · Sécurité et données avec l’IA

En introduction, on a vu une idée simple : l’IA **accélère**, mais **ne remplace** ni la **responsabilité** ni le **bon sens** dès qu’il s’agit du **confidentiel**. Ce chapitre pose les **garde-fous** avant d’aller plus loin dans l’éditeur et les prompts : **où partent les données**, **ce qu’il ne faut jamais coller dans un chat**, et **quand dire non** sans ambiguïté.

Ce chapitre ne remplace **ni** politique interne **ni** avis juridique : il vise à aligner **toute l’équipe** (dev, PO, PM, support) sur les **mêmes interdits** et les **mêmes questions** à poser avant d’utiliser un outil.

Dans une organisation structurée, ces sujets passent souvent par le **RSSI** et le **DPO**. En solo ou en petite équipe, gardez les mêmes réflexes : vérifiez la documentation du fournisseur et les règles de base (notamment CNIL pour les données personnelles).

---

## 1. Ce que vous saurez faire après ce chapitre

À la fin de ces pages, vous devriez pouvoir :

1. **Expliquer** pourquoi `.env`, clés API et mots de passe ne vont jamais dans un chat.
2. **Poser 3 questions avant usage** : où vont les données, combien de temps elles restent, qui peut les lire.
3. **Reconnaître les cas “non”** (santé, secrets prod, données sensibles) sans arbitrage métier/juridique/tech.
4. **Relire le code généré** sur les zones à risque (SQL, auth, scripts) avec une checklist courte.
5. **Comprendre les bases RGPD** (minimisation, sous-traitance) et savoir où vérifier (CNIL, docs officielles).

---

## 2. Les règles « ultra basiques », à répéter sans honte

Certaines choses sont du **niveau zéro** de la sécurité ; on les répète parce qu’elles se **violent encore tous les jours** sous la pression du délai.

Les ignorer ne « fait pas gagner du temps » : une clé ou un export mal placés peuvent être **journalisés** ou **réutilisés** hors de votre contrôle. La suite peut être une **fuite**, une **fraude**, puis des **recours** — souvent incomparablement plus coûteux que les quelques minutes qu’on croyait économiser.

### 2.1. Fichier `.env`, clés, mots de passe : zéro partage dans un chat

- Un fichier **`.env`** (ou équivalent : secrets injectés au **runtime**) contient souvent des **clés d’API**, des **secrets applicatifs**, parfois des URLs internes. **Ce n’est pas un document de travail** à envoyer dans un chat pour « déboguer plus vite ».
- Une **clé API** ou un **token** (Stripe, OpenAI, AWS, clé de signature JWT, etc.), c’est comme une **clé physique** : si quelqu’un d’autre l’a, il peut **agir en votre nom** sur le service concerné.
- **Ne jamais** coller ces valeurs dans **ChatGPT** (interface web grand public), dans un **thread Slack**, dans un **ticket public**, dans une **capture d’écran** partagée, ni dans un **mail** non chiffré, sauf cadre **explicitement** prévu et sécurisé par votre entreprise (coffre-fort de secrets, canal d’incident, etc.).

> **Attention**
>
> **« Privé » ou « conversation confidentielle » sur l’interface ne veut pas dire « invisible côté serveur ni dans les journaux ».** Lisez la **page d’aide** et le **contrat** du **produit que vous payez** (compte entreprise, options « zero retention », région d’hébergement, etc.).

### 2.2. Données sensibles, ChatGPT et autres services généralistes

Par **données sensibles**, pensez au minimum : **données clients** (e-mails, adresses, historique d’achat), **données RH** (entretiens, salaires, absences), **extraits de base de production**, **logs** contenant des jetons ou des identifiants, **pièces d’identité**, **données de santé**, **dossiers juridiques**.

**Règle simple pour les non-devs** : si vous hésiteriez à le mettre sur la **page d’accueil publique** du site, **ne le mettez pas** dans un chat généraliste. Pour du **flou**, demandez à votre **référent** (sécurité, juridique, DPO) **avant** de coller quoi que ce soit.

---

## 3. Où va ce que vous tapez ? Trois familles d’outils

La vraie question n’est pas seulement « est-ce que l’IA répond bien », mais **où part le texte** une fois envoyé. Selon l’outil, le même prompt peut être **traité**, **stocké** ou **lu** dans des conditions très différentes :

1. **Navigateur, appli grand public** (ChatGPT dans l’onglet, assistant mobile…) : vous êtes souvent sur l’**infrastructure du fournisseur**. Ce que vous saisissez peut être **journalisé**, **conservé**, **analysé** pour la facturation ou la sécurité du service, selon les **conditions** du produit.
2. **Éditeur ou extension « sur le dépôt »** (Cursor, Copilot, etc.) : en plus du chat, il peut y avoir de l’**indexation** de fichiers, des **suggestions** inline, parfois des **agents** qui lisent plusieurs chemins. Là encore : **lire** ce que dit l’éditeur sur la **télémétrie**, la **rétention**, l’**opt-out** d’entraînement.
3. **Offre « entreprise » ou hébergement dédié** : le **contrat** ou les **options d’achat** peuvent prévoir des **garanties** plus strictes que le compte perso : par exemple **données hébergées dans une région** (souvent l’UE), **durée de conservation** des conversations, **interdiction d’entraîner** le modèle sur vos contenus, **canal support** en cas d’incident. Rien n’est automatique : il faut **savoir ce qui est réellement activé** sur **votre** abonnement et **où** passent encore les données quand vous branchez l’outil au dépôt ou aux tickets.

Avant un usage sensible, gardez la même grille : **quel outil**, **quelles données**, **pour quel public** (interne, client, sous-traitant).

---

## 4. Cas pratique : déboguer en local sans vider le terminal dans le chat

Cas classique côté dev : *« ça plante, je colle tout le terminal dans l’assistant pour aller vite »*. Le risque devient réel dès qu’on y voit une **URL avec jeton**, un en-tête **`Authorization`**, une **chaîne de connexion** ou une valeur de **`.env`**.

### 4.1. Situation

Vous appelez une **API tierce** depuis une route Node (ou équivalent). En local, la réponse est **401 Unauthorized**. Le navigateur ou le client HTTP affiche parfois la **requête rejouée** avec les en-têtes ; votre script de dev peut **logger** la config ou l’URL complète. *(Même logique si vous déboguez une intégration **paiement** : le piège reste « tout coller », pas le métier précis.)*

### 4.2. Mauvais réflexe / bon réflexe

**Mauvais réflexe** : coller le bloc complet (ligne `curl` avec `?apiKey=…`, `Authorization: Bearer ...`, `DATABASE_URL=...`, ou contenu de `.env`) dans un chat web ou IDE.

**Bon réflexe** :
- Décrire la **stack** et le **flux** (qui appelle quoi).
- Partager seulement **erreur + code HTTP**.
- Garder les noms techniques, masquer les valeurs (`Authorization: <omis>`, `API_KEY=<omis>`).
- Si URL nécessaire : **hôte + chemin**, pas de query string sensible.
- Demander un **ordre de vérifications** plutôt qu’une recette basée sur vos secrets.

**Pour les développeurs**, la comparaison utile est celle d’une question sur **Stack Overflow** : on explique le bug, mais on ne colle pas un **endpoint complet** avec ses **query params** sensibles.

**Pour les PO / PM**, même logique qu’une carte bancaire : ce qui ne se partage pas en ticket ne se partage pas non plus dans un assistant.

### 4.4. Formulation type (à adapter)

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

## 5. Quand l’IA est un non, ou « stop, on cadrage d’abord »

Ce n’est pas une liste juridique exhaustive ; c’est une **culture produit** : certains sujets **ne se traitent pas** « en prompt vite fait » sans **cadre**.

**En général, en entreprise, on met en pause l’IA généraliste** (ou on passe par une **offre dédiée** / **pas d’entraînement** / **hébergement contrôlé**) quand :

- il s’agit de **données de santé** à caractère personnel (hors cadre médical ou sans outil **qualifié** / **contrat** adapté) ;
- il s’agit de **biométrie** ou de **données très sensibles** (l’énumération précise dépend du droit applicable) ;
- il s’agit de **secrets de production** (clés, certificats, chaînes de connexion complètes) ;
- il s’agit de **défense nationale**, **secret d’affaires critique**, **enquêtes couvertes par le secret** : là, la règle est souvent **« interdit par politique interne »**, point ;
- il s’agit de **mineurs** ou de **contextes scolaires** : prudence **maximale** sur ce qui est partagé et **avec quel outil** ;
- il s’agit de **décisions juridiques** ou **conformité** : l’IA peut **aider à structurer** une note, **pas** remplacer un **avis** ou une **validation** professionnels ;
- il s’agit d’**automatisations financières** ou d’**actions irréversibles** sans **garde-fou humain** (virement, suppression de masse, etc.).

Quand le doute apparaît, demandez-vous : **« Un outil grand public a-t-il le droit de voir ça, et notre contrat le couvre-t-il ? »** Tant que la réponse n’est pas un **oui** net, c’est **non** jusqu’à clarification.

---

## 6. Cas pratique : onboarding B2B bloqué, SQL et assistant

Les produits B2B qui gèrent des **invitations**, des **comptes** et des **organisations** déclenchent souvent, après un clic sur un lien dans un e-mail, des **lectures et écritures en base** (tables du type `invitations`, `users`, `organisations`). Quand le flux **bloque** (erreur générique, code HTTP du type **409** « conflit »), le réflexe est d’ouvrir un assistant pour « corriger le SQL » : c’est **exactement** le moment où se mélangent **données personnelles**, **jetons** encore valides et **raccourcis** de concaténation proposés par le modèle.

### 6.1. Le cas : « le client B2B ne termine pas son onboarding »

L’admin client clique son lien d’invitation, puis obtient une **erreur** ou un **409**. Causes typiques : jeton expiré, invitation déjà consommée, ligne manquante, conflit d’unicité.

Le piège est de coller dans un chat la requête SQL avec de **vrais** e-mails, un export de ligne, ou un lien avec token actif. Cela mélange données perso, session et risque de suggestions SQL fragiles.

Le bon cap : **requêtes paramétrées** ou **ORM** (requête fixe, valeurs à part), et relecture de la couche données dès qu’une requête est construite à la main.

### 6.2. Formulation sans fuite

Même situation, sans rien exporter de sensible : décrivez le schéma au niveau des noms de tables/colonnes, le comportement et le code HTTP, puis demandez une stratégie de diagnostic.

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

### 6.3. Scripts et commandes « trouvés sur le chat »

Hors SQL, le même réflexe vaut pour une ligne du type :

```bash
curl https://exemple-inconnu.fr/install.sh | bash
```

**Règle** : ne pas exécuter si vous ne connaissez **pas** l’éditeur et le **contenu** du script. Comparez l’URL à la **doc officielle** **caractère par caractère** (homoglyphes, domaines voisins).

**Pour les PO / PM** : vous pouvez exiger qu’aucun script d’installation ne vienne d’une URL **hors liste blanche** validée par l’équipe infra.

---

## 7. Documentation interne, RAG et ACL

Beaucoup d’équipes branchent un **moteur de questions** sur une **base documentaire** interne. Le principe (souvent appelé **RAG**, *retrieval-augmented generation*) est simple : au lieu de répondre “de mémoire”, l’outil va **chercher des extraits** dans des documents, puis s’en sert pour formuler sa réponse.

**Cas pratiques fréquents** :

- poser des questions sur un **wiki interne** ou un **centre d’aide** ;
- retrouver une **procédure** (onboarding client, support, déploiement, RH) ;
- interroger un lot de **PDF**, de pages **Notion / Confluence / SharePoint** ou de documents dans **Google Drive** ;
- fabriquer un petit **assistant documentaire** pour une équipe support, ops ou produit.

**Côté outils**, cela peut prendre plusieurs formes : un moteur de recherche documentaire, un plugin branché sur votre wiki, un assistant connecté à des fichiers, ou un montage plus technique avec indexation + base vectorielle + LLM. Le nom change selon les produits ; l’idée reste la même.

**Côté accès**, certaines équipes veulent aussi que l’outil respecte les **droits de lecture** déjà présents dans la source. Selon les plateformes, cela peut s’appeler **permissions**, **partage**, **droits d’accès** ou **ACL** (*Access Control List*).

En pratique, la question utile est simple : *« Si une page est réservée à un groupe, est-ce que l’assistant la cache aussi aux autres ? »* Un moteur **RAG** sur la doc interne est pratique ; il doit aller de pair avec des **sources fiables** et des **droits d’accès** alignés sur la source.

Pour une vue d’ensemble assez simple, vous pouvez parcourir le [Guide de la génération augmentée par récupération (RAG) de la DGE](https://www.entreprises.gouv.fr/files/files/Publications/2024/Guides/20241127-bro-guide-ragv4-interactif.pdf).

---

## 8. Apparté RGPD Europe : ce que l’IA change, ou pas

Dès qu’un prompt, un fichier ou un log parle d’une **personne** (nom, mail, ticket, CRM, RH…), vous n’êtes plus dans le seul « bon sens sécurité » : vous êtes dans les **données personnelles** et le **RGPD**.

L’IA ne change pas le fond : résumer un échange client, c’est toujours **traiter** des données personnelles.

**Quatre réflexes** :

1. **Envoyer moins** — Souvent, un cas décrit ou anonymisé suffit ; pas besoin du dossier entier (**minimisation**).
2. **Savoir pourquoi** — Quelle **base** juridique pour envoyer ça dans tel outil ? Si personne ne sait, c’est un signal faible.
3. **Savoir à qui** — Fournisseur = lire **conditions**, **hébergement**, **DPA** ; savoir **avant** si les données sortent de votre périmètre habituel.
4. **Savoir combien de temps** — Chats et logs **se conservent** : durée, accès, réglages ; ce qui traîne trop longtemps reste un risque plus longtemps.

En résumé : *ai-je le droit, avec ce prestataire, dans ces conditions, pour quelle durée ?*

> **Attention**
>
> Ce chapitre donne des **repères généraux**. Il ne remplace pas un **avis juridique**, ni une **vérification de conformité** adaptée à votre organisation, à vos données et à l’outil choisi.

---

## 9. Contenu public, sites et landing : promesses

Évitez les formules **invérifiables** (« chiffrement militaire », « 100 % inviolable ») si vous ne pouvez pas les **soutenir** avec des éléments sérieux (audit, architecture documentée, périmètre précis). C’est un risque **juridique** et de **confiance**.

Préférez des **faits** : « HTTPS », « hébergement UE », « politique de rétention documentée », **si c’est vrai**.

---

## 10. Où lire sans se faire arnaquer, côté documentation sérieuse

Pour la **sécurité**, la **vie privée** ou les **API**, partez d’abord des sources éditeur ou autorités reconnues.

> **Prudence**
>
> Les liens ci-dessous pointent vers des **sites officiels** ou **éditeurs** souvent utilisés en entreprise ; vérifiez toujours que l’URL affichée dans le navigateur correspond bien au domaine attendu (hameçonnage par **homoglyphes**).

| Besoin | Piste sérieuse |
|--------|----------------|
| Risques **applications LLM** | [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Risques **web classiques** | [OWASP Top 10 (web)](https://owasp.org/www-project-top-ten/) |
| **Cadre** risque IA (organisation) | [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) |
| **Données perso & IA** (France) | [CNIL : intelligence artificielle](https://www.cnil.fr/fr/intelligence-artificielle) |
| **Cadre européen** sur l’IA | [Commission européenne : AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) |
| **Doc officielle éditeur** | [Cursor documentation](https://cursor.com/docs) |

Pour les cas plus spécifiques (secret scanning, politique fournisseur, conformité contractuelle), ajoutez des sources au fil du besoin.

---

## 11. Feuille d’équipe à dupliquer

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

## 12. Erreurs fréquentes

- Croire que **« privé »** veut dire **non conservé** côté fournisseur.
- Coller des **secrets** ou des **données clients** dans un assistant généraliste.
- Accepter du code généré sans relire les zones sensibles (**auth**, **SQL**, **paiement**).
- Indexer la doc interne sans aligner les droits d’accès.

---

## 13. Checklist de fin de chapitre

- [ ] Je peux expliquer **sans jargon** pourquoi le **`.env`** et les **clés** ne vont pas dans un chat générique.
- [ ] Je peux citer **deux cas** où l’IA est un **non** jusqu’à cadrage.
- [ ] Je comprends **minimisation** et **sous-traitance** en une phrase chacune.

---

## Mini-glossaire du chapitre 2

| Terme | Sens ici |
|-------|----------|
| **ACL** | *Access Control List* : **qui** a le droit de **lire quoi** ; le moteur sur la doc doit **respecter** les mêmes règles que la source. |
| **RAG** | *Retrieval-augmented generation* : l’outil récupère des extraits de documents avant de répondre. |
| **DPA** | *Data Processing Agreement* : accord de traitement des données entre votre organisation et le fournisseur. |
| **RSSI** | Référent sécurité des systèmes d’information côté organisation. |
| **DPO** | Référent protection des données personnelles (RGPD). |

---

## À retenir en une phrase

**Avant** d’optimiser vos prompts, verrouillez **ce qui ne doit jamais quitter votre périmètre** (`.env`, clés, données sensibles) et **posez les questions** (outil, conservation, droits) : le reste du parcours suppose que ce socle est **partagé** par toute l’équipe.
