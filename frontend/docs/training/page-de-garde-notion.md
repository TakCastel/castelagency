# L’intelligence artificielle dans le développement logiciel

## Introduction au parcours

Les assistants et modèles de langage (**LLM**) sont entrés dans le quotidien des équipes produit et technique. Ce parcours vous propose une **méthode** : comprendre les limites des outils, **sécuriser** les usages, travailler avec des **assistants dans l’IDE**, structurer le **cadrage** (dont **BMAD-METHOD**), brancher l’IA dans un **produit** (APIs, coûts, données) puis traiter la **visibilité** des contenus (**GEO**). Chaque partie est rédigée pour être **lue seule** autant que possible ; les termes difficiles sont aussi rassemblés dans le [glossaire](/formation-ia/chapitre/12-glossaire).

**Durée indicative totale** : environ **11 h 20**, **TP inclus**, selon votre niveau de départ et votre rythme.

---

## À qui s’adresse ce guide pratique ?

- **Personnes qui apprennent à coder** avec l’aide de l’IA et veulent éviter les erreurs grossières (sécurité, qualité).
- **Développeurs** qui souhaitent intégrer l’IA dans un flux réel (tickets, Git, revue de code, tests).
- **Product Owners / Product Managers** qui doivent cadrer des livrables, poser les bonnes questions sur les données et le contenu, sans maîtriser chaque détail technique.
- **Stagiaires, nouvelles recrues ou autodidactes** : le parcours part d’explications accessibles ; les **prérequis** et l’ordre de lecture sont rappelés sur cette page et dès l’**[introduction](/formation-ia/chapitre/01-introduction)**.

---

## Ce que vous serez en mesure de faire

À l’issue du **noyau** du parcours (de l’introduction à la **synthèse**, et **[travaux pratiques](/formation-ia/chapitre/08-travaux-pratiques)** une fois vus **assistants de code**, **Markdown & agents**, **BMAD-METHOD**, **produit IA** et **GEO**), vous pourrez notamment :

- Expliquer ce qu’est un **LLM** et pourquoi il peut se tromper ou inventer des informations.
- Appliquer des **réflexes de sécurité** (secrets, chat, données, code généré).
- Utiliser un **assistant dans l’éditeur** selon une routine simple (cadrage → consigne → relecture des changements → tests).
- Rédiger ou relire des **user stories** et une **definition of done** avec des critères **vérifiables**.
- Exposer les idées de **moteur documentaire + LLM**, **SEO / GEO**, et le flux **interface → votre serveur → fournisseur de modèle**.

La **fin de parcours**, la **banque QCM** et le **glossaire** complètent le parcours pour l’**auto-évaluation**, le **cadre d’évaluation** et la **référence lexicale**.

---

## Prérequis

- **Côté Web (sans être développeur·se)** : vous savez ce qu’est une **page web** (un écran dans le navigateur avec du texte, des liens, parfois un formulaire) et une **URL** (l’adresse dans la barre du navigateur, du type `https://…`, qui mène à une page). Ce n’est pas un test : si vous avez déjà utilisé un site ou une appli web, vous avez en général le niveau visé.
- **Données personnelles** : ici, tout ce qui permet d’**identifier une personne** ou de la retrouver (nom, e-mail, compte client, parfois adresse IP selon le contexte). Le cours rappelle pourquoi **ne pas envoyer n’importe quoi** dans un chat IA ou un outil tiers sans réfléchir au **RGPD** et aux règles de votre organisation, sans vous demander d’être juriste.
- **Côté code** : des bases de **programmation** aident (variables, fonctions, conditions) ; le cours reste souvent au niveau du **pseudo-code** ou d’exemples lisibles sans maîtriser un langage précis.
- **Côté produit** (stories, BMAD) : savoir lire une **fonctionnalité** ou un **ticket** rédigé en français clair suffit souvent au début.

Les prérequis et le public visé sont précisés dans la section **Prérequis** ci-dessus ; l’**[introduction](/formation-ia/chapitre/01-introduction)** pose le cadre et le vocabulaire pour la suite.

---

## Comment avancer dans ce cours ?

1. Commencez par l’**[introduction](/formation-ia/chapitre/01-introduction)** : objectifs, cadre et fil conducteur.
2. Enchaînez dans l’ordre du **tableau ci-dessous** jusqu’à **GEO**. La **sécurité** est placée tôt **volontairement**.
3. Réalisez les **[travaux pratiques](/formation-ia/chapitre/08-travaux-pratiques)** **après** les parties **assistants de code**, **Markdown & agents**, **BMAD-METHOD**, **produit IA** et **GEO** (les TP s’appuient sur ces notions).
4. Poursuivez avec **synthèse**, **fin de parcours**, **banque QCM** (si vous contrôlez vos acquis) et **glossaire** à consulter au besoin — toujours selon l’ordre du tableau ou les boutons de navigation en bas d’écran.

De nombreuses parties se terminent par une **checklist** ou un **mini-glossaire** local ; le lexique complet figure dans le **[glossaire](/formation-ia/chapitre/12-glossaire)**.

La **table des matières** détaillée et les **durées** figurent dans le **tableau ci-dessous** et sur l’[accueil du parcours](/formation-ia).

---

## Sommaire des chapitres

| Chapitre | Durée indicative | Contenu |
|----------|------------------:|---------|
| [1 : Introduction - repères, vocabulaire et cadre](/formation-ia/chapitre/01-introduction) | ~35 min | Comprendre les bases : IA, LLM, IDE, cas d’usage, limites des outils et fil conducteur du parcours. |
| [2 : Sécurité et données avec l’IA](/formation-ia/chapitre/02-securite-ia) | ~50 min | Éviter les erreurs coûteuses : secrets, données sensibles, RGPD, règles de prudence et cas d’usage à éviter. |
| [3 : Développement assisté par IA dans l’IDE](/formation-ia/chapitre/03-assistants-code-ide) | ~1 h 10 | Travailler avec Cursor, Copilot ou Claude Code : cadrage, consigne, relecture du diff et tests. |
| [4 : Prompts, agents et Markdown](/formation-ia/chapitre/04-prompter-agents-markdown) | ~1 h 05 | Rédiger des consignes plus utiles et structurer la documentation Markdown qui aide vraiment les assistants. |
| [5 : BMAD-METHOD et cadrage agile](/formation-ia/chapitre/05-bmad-method) | ~1 h 15 | Structurer backlog, stories, critères d’acceptation et livraison avec une méthode compatible IA. |
| [6 : Produit augmenté par l’IA : chat, APIs, intégration](/formation-ia/chapitre/06-produit-ia-apis) | ~1 h 10 | Comprendre l’intégration produit : appels API, flux serveur, coûts, clés et points de vigilance techniques. |
| [7 : GEO - visibilité dans les réponses IA](/formation-ia/chapitre/07-geo) | ~1 h | Rendre vos contenus plus visibles dans les synthèses générées, en complément du SEO classique. |
| [8 : Travaux pratiques guidés](/formation-ia/chapitre/08-travaux-pratiques) | ~3 h | Appliquer le parcours sur des cas concrets avec des exercices progressifs proches de situations réelles. |
| [9 : Synthèse du parcours](/formation-ia/chapitre/09-synthese) | ~25 min | Relier les notions vues dans le parcours et retenir les idées clés avant l’auto-évaluation. |
| [10 : Auto-évaluation et suites possibles](/formation-ia/chapitre/10-evaluation) | ~15 min | Faire le point sur vos acquis, identifier les prochaines étapes et les formats d’accompagnement possibles. |
| [11 : Banque de QCM](/formation-ia/chapitre/11-banque-qcm) | ~45 min | Vérifier vos acquis avec 32 questions classées par thème, accompagnées de leurs corrigés. |
| [12 : Glossaire](/formation-ia/chapitre/12-glossaire) | (référence) | Retrouver rapidement les définitions des termes et acronymes rencontrés dans le parcours. |

---

## Accompagnement et intervention en entreprise

Ce parcours est conçu pour avancer **en autonomie**, mais un **accompagnement** sur vos enjeux réels (code, outils, sécurité, cadrage produit) peut accélérer l’appropriation et éviter les angles morts.

**Je propose aussi des formations** et des **interventions en entreprise** : j’accompagne les **développeurs** et les équipes qui intègrent l’IA dans leur flux (ateliers, sessions live, relecture de pratiques, mise en situation sur vos dépôts ou tickets). Chaque mission est **cadrée sur mesure** selon votre contexte.

Pour une **demande de devis** ou une proposition d’intervention (durée, format, public) : **[demander un devis](/devis)**. Décrivez votre besoin dans le formulaire et nous revenons vers vous avec une proposition adaptée.

---

Bon guide pratique.
