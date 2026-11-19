# Vidéo de présentation Studio Castel

34 s, 1920x1080, 60 i/s, sans son. Coupes calées sur 120 BPM (un temps = 0,5 s) pour poser une musique.

1. Intro : le C sur carré rouge, « Studio Castel » (0 à 3 s)
2. Manifeste : Jeux. / Apps. / Sites., puis « faits avec le cœur. » et l'éventail de cartes (3 à 7 s)
3. Les 4 jeux, 2 s chacun, sur leur teinte (7 à 15 s)
4. Apps et sites : mur de captures, puis Polinizz, Bobithèque, 1, 2, 3 Soleil (15 à 21 s)
5. Un studio, une personne : L'idée, Le design, Le code (21 à 26 s)
6. Avignon et les services (26 à 29 s)
7. Outro : logo, « On discute ? », studio-castel.com (29 à 34 s)

## Aperçu

Ouvrir `video/index.html` dans Chrome (lecture en boucle). `index.html?t=12.5` fige l'image à 12,5 s.
Les images viennent de `frontend/public/`, les polices de Google Fonts (connexion nécessaire).

## Rendu

Prérequis : Google Chrome, ffmpeg, et `puppeteer-core` (`npm i puppeteer-core` dans un dossier quelconque, puis `NODE_PATH=<ce dossier>/node_modules`).

```bash
node video/record.mjs                 # video/out/studio-castel.mp4 (environ 2 min 30)
node video/record.mjs --stills 3,9,18 # images de contrôle dans video/out/
node video/record.mjs --fps 30
```

Ajouter une musique : `ffmpeg -i video/out/studio-castel.mp4 -i musique.mp3 -c:v copy -c:a aac -shortest video/out/studio-castel-son.mp4`
