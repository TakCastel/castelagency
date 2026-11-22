# Direction artistique Studio Castel

> **Mises à jour de novembre 2026 (elles priment sur le reste du document).**
> - Positionnement : studio indépendant qui fait des jeux, des apps et des sites. Les jeux restent en avant, mais le site présente aussi les projets (`/projets`) et, discrètement, les écrits et dessins (`/creations`, lien en pied de page seulement). Aucun projet n'est qualifié de « phare » dans les textes.
> - Hero : fond sombre `#09090B` avec une pièce en 3D (murs quadrillés en perspective, quelques cases contenant des captures de jeux). Le quadrillage en lignes est autorisé ici ; la grille de points reste interdite.
> - Éventail de 5 cartes portrait (Bobithèque, Pavat, Decalco au centre, Godsing, Préhistopia), chacune d'une couleur vive propre : rose `#FF4FA3`, violet `#7C4DFF`, bleu ciel `#22B8F0`, vert menthe `#14C98B`, orange `#FF8A1F`. Ces couleurs servent aussi de teinte aux pages des jeux. Le rouge Castel reste la couleur de marque (logo, boutons, pastilles).
> - Les cartes portent des illustrations détourées générées (`public/games/cards/`, prompts dans `docs/cartes-hero/PROMPTS.md`), avec une épaisseur 3D, des rayures fines et un passage au premier plan au survol.
> - Header : liens Jeux et Projets à gauche, le C au centre, Contact et « Jouer » à droite.

Brief à donner à Claude Code pour refaire studio-castel.com (dépôt `castelagency`, dossier `frontend`, Next.js + Tailwind).

## L'idée en une phrase

Studio Castel est un studio de jeux vidéo indépendant. Le site doit ressembler à la devanture d'un studio de jeux, pas à un site d'agence ni à un portfolio de développeur : un rouge franc, un logo blanc, de grosses cartes de jeux, très peu de texte.

## Ce que le site doit faire

Le site a un seul rôle : montrer les jeux et permettre d'y jouer ou de les télécharger. Tout le contenu d'agence, de freelance et de prestations sort de la navigation principale.

## Couleurs

| Rôle | Nom | Valeur | Usage |
| --- | --- | --- | --- |
| Marque | Rouge Castel | `#FF2B2B` | Fond du hero, aplats, boutons principaux, logo |
| Marque foncée | Rouge profond | `#D61F1F` | Survol des boutons rouges, liens rouges sur fond clair |
| Encre | Noir | `#09090B` | Fond des sections sombres, texte sur fond clair |
| Surface sombre | Anthracite | `#16161A` | Cartes sur fond noir |
| Papier | Blanc | `#FFFFFF` | Texte sur rouge et sur noir, logo |
| Papier chaud | Blanc cassé | `#F6F4F0` | Fond des sections claires |
| Texte secondaire | Gris | `#A1A1AA` sur noir, `#52525B` sur clair | Légendes, mentions |

Le rouge est la seule couleur de marque. Pas de deuxième couleur d'accent, pas de dégradé de marque. La couleur vient des visuels des jeux eux-mêmes : chaque carte de jeu peut reprendre la teinte dominante de son jeu.

### Règles de contraste

- Blanc sur Rouge Castel fait environ 3,7:1. Autorisé uniquement pour les gros titres (24 px et plus, ou 19 px en gras) et le logo.
- Pour du petit texte sur fond rouge, utiliser le Noir `#09090B` (environ 5,3:1).
- Pour du texte ou un lien rouge sur fond blanc, utiliser le Rouge profond `#D61F1F` (environ 5,1:1), jamais le Rouge Castel.
- Tout le reste du texte doit tenir 4,5:1 au minimum.

## Typographie

- Titres : Poppins, graisses 600 et 700, interlettrage légèrement serré (`-0.02em`), interlignage 1.05 à 1.1.
- Texte courant : Inter, graisses 400 et 500, interlignage 1.5.
- Titres de section très gros (56 à 88 px sur desktop, 36 à 44 px sur mobile), courts, deux à cinq mots.
- Pas de texte tout en capitales, sauf les petites étiquettes (12 à 13 px, interlettrage `0.08em`).

## Formes

- Angles très arrondis : 28 à 32 px sur les cartes, 16 px sur les petits éléments, boutons en pilule.
- Formes pleines et épaisses, à l'image du logo. Pas de traits fins, pas de contours décoratifs.
- Ombres portées franches sous les cartes (`0 30px 60px rgba(0,0,0,0.45)`) sur fond sombre, aucune sur fond rouge.
- Les cartes de jeux peuvent être légèrement décalées en hauteur les unes par rapport aux autres, ou inclinées de quelques degrés. C'est le seul effet "joueur" autorisé.

## Logo

Le logo est un C blanc épais, sans cadre.

Fichiers fournis (à copier dans `frontend/public/brand/`) :

- `studio-castel-logo-rouge.svg` et `.png` : C blanc sur carré rouge. Pour la favicon, l'icône d'app, l'image de partage et la page LinkedIn.
- `studio-castel-c-blanc.svg` : C blanc, fond transparent. Pour le header sur fond rouge ou noir.
- `studio-castel-c-rouge.svg` : C rouge, fond transparent. Pour les fonds clairs.
- `studio-castel-c-noir.svg` : C noir, fond transparent. Pour les usages en une couleur.
- `studio-castel-logo-texte-rouge.png` / `-noir.png` / `-blanc.png` : C + "Studio Castel" sur fond transparent (C rouge et texte noir, tout noir, tout blanc).
- `studio-castel-logo-texte-fond-rouge.png` : C + "Studio Castel" en blanc sur fond rouge.

Règles : toujours laisser autour du C une marge égale à la moitié de sa largeur, ne jamais le déformer, ne jamais le poser sur une photo. À côté du C, le nom s'écrit "Studio Castel" en Saira 800 italique (ExtraBold Italic), interlettrage `-0.02em`.

Remplacer `frontend/app/icon.svg`, `favicon.ico`, `public/og-logo-only.png` et `public/og-logo-with-text.png` par des versions tirées de ces fichiers.

## Jetons Tailwind

```js
// tailwind.config.js, dans theme.extend
colors: {
  castel: {
    red: '#FF2B2B',
    'red-deep': '#D61F1F',
    ink: '#09090B',
    surface: '#16161A',
    paper: '#FFFFFF',
    'paper-warm': '#F6F4F0',
  },
},
fontFamily: {
  display: ['Poppins', 'system-ui', 'sans-serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
},
borderRadius: {
  card: '30px',
  chip: '16px',
},
boxShadow: {
  card: '0 30px 60px rgba(0,0,0,0.45)',
},
```

Charger Poppins (600, 700) et Inter (400, 500) avec `next/font/google`.

## Structure du site

Une seule page d'accueil, plus une page par jeu.

1. **Header** : C blanc à gauche avec "Studio Castel", deux liens à droite (Jeux, Contact). Fond transparent sur le hero, noir au défilement.
2. **Hero** : plein écran, fond Rouge Castel. Un titre énorme en blanc, une phrase en noir dessous, un bouton noir "Voir les jeux". Sur la droite ou en bas, les cartes des jeux qui dépassent du cadre.
3. **Jeux** : fond noir. Une grande carte par jeu, avec une capture ou une illustration du jeu, son nom, une phrase, et un ou deux boutons (Jouer, Google Play, Télécharger).
4. **Le studio** : fond blanc cassé. Trois ou quatre phrases : un studio indépendant à Avignon, des jeux faits de A à Z par une seule personne.
5. **Contact** : fond rouge, une phrase et une adresse email.
6. **Footer** : fond noir, le C, les mentions légales, les liens vers les stores et les réseaux.

## Les jeux à présenter

| Jeu | En une phrase | Lien |
| --- | --- | --- |
| Decalco | Un jeu de décalcomanies pour enfants : on pose un animal dans un paysage et on le frotte pour le faire apparaître. | decalco.app, Google Play |
| Pavat | Un jeu de réflexion où l'on place des tuiles sur une grille pour former des lignes et des groupes. | pavat-game.web.app |
| Godsing | Une planète entière générée à chaque partie, avec son écosystème et ses civilisations. | godsing.net |
| Préhistopia | À compléter par Tarik. | À compléter |

Utiliser de vraies captures des jeux pour les cartes. Si une capture manque, laisser un emplacement vide aux bonnes proportions avec le nom du jeu, ne rien inventer.

## Ton des textes

- En français, tutoiement ou formulations neutres, phrases courtes.
- Vocabulaire simple. Pas de jargon marketing, pas de superlatifs.
- Pas d'emoji, pas de tiret cadratin.
- Les boutons disent ce qu'ils font : "Jouer dans le navigateur", "Télécharger sur Google Play".

Exemples de titres : "Des jeux faits à la main.", "Nos jeux", "Un studio, une personne.", "On discute ?"

## Mouvement

- Les cartes se soulèvent légèrement au survol (translation de 6 px, 200 ms).
- Apparition des sections au défilement, sobre, une seule fois.
- Respecter `prefers-reduced-motion` : aucune animation dans ce cas.

## À ne pas faire

- Pas de dégradés violets ou bleus, pas d'effet verre dépoli, pas de grille de points en fond.
- Pas de mode clair et sombre à basculer : le site alterne lui-même sections rouges, noires et claires.
- Pas de logos de technologies ni de liste de compétences. C'est un site de studio, pas un CV.
- Ne pas reprendre le rouge ni les codes visuels de Nintendo : pas de rouge `#E60012`, pas de logo dans une pilule.

## Points à trancher avec Tarik avant de coder

- La section `/formation-ia` existe déjà dans le dépôt. Soit elle reste accessible par son adresse mais sort du menu, soit elle part sur un autre site.
- Préhistopia : description, lien et captures.
- Les captures d'écran de chaque jeu, à fournir.
- L'adresse email de contact à afficher.
