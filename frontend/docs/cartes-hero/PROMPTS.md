# Illustrations des cartes du hero

Cinq images, une par carte de l'éventail de l'accueil.

- **Où les déposer :** `frontend/public/games/cards/<nom>.png`.
- **Noms de fichiers :** `decalco.png`, `pavat.png`, `godsing.png`, `prehistopia.png`, `bobitheque.png`.
- **Prise en compte :** dès qu'un fichier est présent, la carte l'affiche à la place de la capture d'écran. Recharger la page suffit.

## Mode d'emploi (ChatGPT)

1. **Une conversation par image.** Joins les images du dossier `references/` qui commencent par le nom du jeu, puis colle le prompt du jeu.
2. **Fond transparent :** si l'image sort avec un fond blanc, réponds « Same image, transparent background (PNG with alpha), nothing else changed ».
3. **Format :** si le cadrage ne va pas, réponds « Same image, portrait 1024x1536, subject bigger, cropped by the bottom edge ».
4. **Vérification :** ouvre le PNG dans Aperçu. Le fond doit être en damier, pas blanc.

## Contraintes communes (déjà incluses dans chaque prompt)

- **Format :** PNG portrait 1024×1536 avec fond transparent (canal alpha).
- **Cadrage :** la carte affiche l'image en bas, sur ses 72 % inférieurs. Le haut de la carte porte le titre sur un fond de couleur vive (pas d'image derrière le titre).
  - Le sujet occupe la moitié basse et les deux tiers centraux de la largeur.
  - Il est coupé net par le bord bas, comme s'il sortait de la carte.
  - Le tiers supérieur de l'image reste vide (transparent).
- **Ce qu'il ne faut pas :** ni texte, ni logo, ni cadre, ni décor de fond, ni ombre portée au sol.
- **Couleur de la carte derrière le sujet** (le sujet doit bien se détacher dessus) :

| Jeu | Couleur |
| --- | --- |
| Decalco | bleu ciel `#22B8F0` |
| Pavat | violet `#7C4DFF` |
| Godsing | vert menthe `#14C98B` |
| Préhistopia | orange `#FF8A1F` |
| Bobithèque | rose `#FF4FA3` |

---

## 1. Decalco (`decalco.png`), carte centrale bleu ciel

**Références à joindre :** `decalco-1-vache.webp`, `decalco-2-poussin.webp`, `decalco-3-jeu.png`.

```
Use the attached images as strict style references: they are the actual sticker art of my children's game "Decalco" (a decal / rub-on transfer game). Match that exact art style: soft cel-shaded cartoon illustration, clean dark-brown outlines of medium weight, rounded friendly shapes, big glossy eyes with a white highlight, warm pastel palette, subtle soft shading, no harsh 3D render, no photorealism.

Subject: the same cartoon cow as in the reference (black-and-white patches, pink muzzle, small cream horns, happy open-mouth smile), shown as a big hero character, three-quarter view, slightly leaning forward toward the viewer with a joyful expression, one front hoof raised as if waving. Next to her, small and overlapping her shoulder, the yellow chick from the reference, peeking out. The cow is being "revealed" like a decal: a thin semi-transparent sticker film is peeling off from one corner near her ear, with a soft white glow on the peeled edge. That is the core mechanic of the game, make it readable but secondary.

Composition: portrait 1024x1536. The characters sit in the lower half of the frame and are cut off by the bottom edge at mid-body, as if they rise out of a card. The upper third of the image is completely empty. Horizontally centered, occupying about two thirds of the width. They will be placed over a sky-blue (#22B8F0) background, so keep strong silhouettes and avoid blue on the characters' edges.

Output: PNG with a fully transparent background (alpha channel). No text, no logo, no frame, no scenery, no ground, no drop shadow, no white sticker border around the whole image.
```

---

## 2. Pavat (`pavat.png`), carte violette

**Références à joindre :** `pavat-1-logo.webp`, `pavat-2-affiche.jpg`, `pavat-3-decor.webp`.

```
Use the attached images as strict style references: they are the logo, poster and background of my puzzle game "Pavat", where you place colored square tiles on a grid to form lines of one color. Match that exact look: chunky, glossy, candy-like rounded square tiles with a soft bevel, a bright top highlight and a darker bottom lip (like the tiles in the poster), cheerful casual-mobile-game style, warm cream accents, thick dark-brown outlines like the logo lettering.

Subject: a playful tower of Pavat tiles bursting upward: about ten rounded square tiles in the game's exact colors (sunny yellow, lavender purple, sky teal, coral red, mint green), stacked and tumbling in a dynamic arc from bottom-left to the center, a few tiles tilted mid-air at different angles, with small four-point sparkles like in the poster. At the base, a fragment of the cream game board (rounded tray with a 3x3 slot grid) cut by the bottom edge, with tiles snapping into the slots and one row glowing to show a completed line.

Composition: portrait 1024x1536. The board and the tile stack occupy the lower half and the center, the board is cut off by the bottom edge. The highest tiles reach at most 45 percent of the image height from the bottom; the upper third stays empty. They will be placed over a vivid purple (#7C4DFF) background: avoid purple-on-purple, make the lavender tiles slightly lighter and outlined so they stay readable.

Output: PNG with a fully transparent background (alpha channel). No text, no letters, no logo, no frame, no forest, no scenery, no ground shadow.
```

---

## 3. Godsing (`godsing.png`), carte vert menthe

**Références à joindre :** `godsing-1-chien.png`, `godsing-2-feu.png`, `godsing-3-pierre.png`.

```
Use the attached images as strict style references: they are the official illustrations of my game "Godsing", a simulation where a prehistoric tribe evolves on a procedurally generated planet. Match that exact style: realistic naturalist encyclopedia illustration, hand-painted gouache and watercolor look, fine visible brush texture, natural earthy colors, soft daylight, museum / scientific plate quality, no cartoon, no 3D render, no anime.

Subject: the moment a wolf becomes the tribe's first dog. A grey-brown prehistoric wolf, sitting calmly in three-quarter view, head turned toward a human hand that enters from the bottom-right edge (forearm wrapped in fur, like in the references) offering a piece of meat. The wolf leans in, curious and trusting. Behind the wolf, small and partly hidden, a smoldering campfire of a few logs with a thin curl of smoke rising, and a bundle of dry grass at its base.

Composition: portrait 1024x1536. The wolf occupies the lower half, its body cut off by the bottom edge at chest height; the human hand comes in from the bottom-right corner. The wisp of smoke may rise a bit higher, but the upper third of the image stays empty. It will be placed over a mint-green (#14C98B) background: keep natural greys, browns and fire oranges, no green tones on the edges.

Output: PNG with a fully transparent background (alpha channel), clean cutout edges with no white halo. No text, no labels, no annotation lines, no frame, no landscape, no ground plane.
```

---

## 4. Préhistopia (`prehistopia.png`), carte orange

**Références à joindre :** `prehistopia-1-personnage.png`, `prehistopia-2-feu.png`, `prehistopia-3-hutte.png`, `prehistopia-4-logo.png`.

```
Use the attached images as strict style references: they are the in-game sprites and logo of my isometric neolithic city builder "Préhistopia". Match that exact art style: cute cartoon game sprite style, bold dark-brown outlines, simple cel shading with two tones, warm earthy palette (ochre, terracotta, leather brown, flame orange and yellow), friendly chunky proportions, slightly pixel-crisp edges like the character sprite but rendered at high resolution.

Subject: the tribe's chief, the same caveman as the reference character (messy dark-brown hair, big friendly eyes, leopard-spotted fur tunic, bare feet), shown large, waist-up, three-quarter view, proudly holding up a lit torch in one raised hand, smiling with confidence. Behind his shoulder, smaller, the round thatched hut from the reference and, in front of him at the bottom, the campfire from the reference with logs and a lively flame. Isometric feel: a slight top-down three-quarter angle, consistent with the game's sprites.

Composition: portrait 1024x1536. The chief and the campfire occupy the lower half and are cut off by the bottom edge at the waist; the torch flame can reach about 55 percent of the height from the bottom; the upper third stays empty. It will be placed over a vivid orange (#FF8A1F) background: give the flames a bright yellow core and a dark outline so they do not disappear into the orange.

Output: PNG with a fully transparent background (alpha channel). No text, no logo, no frame, no grass tiles, no isometric ground diamond, no scenery.
```

---

## 5. Bobithèque (`bobitheque.png`), carte rose (au fond de l'éventail)

**Références à joindre :** `bobitheque-1-logo.png`, `bobitheque-2-boutons.png`.

```
Use the attached images as strict references: they are the logo and the swipe buttons of my movie app "La Bobithèque", which suggests random films and lets you swipe them away, add them to a watch list or star them. Match its identity: cinema red (#E53935-ish) on deep black, a stylized film-reel icon (a red disc with round holes, like in the logo), bold and simple shapes, modern glossy 3D icon style (soft studio lighting, subtle reflections, rounded edges), clean and graphic, not cartoon characters, not photorealistic.

Subject: a big glossy red film reel exactly shaped like the logo icon (red disc with round holes), standing upright and slightly tilted, with a long strip of black 35mm film unrolling from it in an elegant S-curve toward the viewer. The film frames are blank warm-white light (no images, no posters). Around the reel, three small floating round buttons matching the app's swipe buttons: a red circle with a white cross, a purple circle with a white eye, a green circle with a white star, plus a few popcorn kernels flying for fun.

Composition: portrait 1024x1536. The reel sits in the lower half and is cut off by the bottom edge at about a third of its diameter; the film strip and the small buttons can rise to about 50 percent of the height; the upper third stays empty. It will be placed over a vivid pink (#FF4FA3) background: keep the red of the reel deep and outlined in dark so it contrasts with the pink.

Output: PNG with a fully transparent background (alpha channel). No text, no letters, no logo wordmark, no movie posters or real film images, no frame, no background, no ground shadow.
```
