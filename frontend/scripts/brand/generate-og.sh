#!/bin/sh
# Génère public/og-logo-with-text.png (1200x630) via Chrome headless (Poppins depuis Google Fonts).
cd "$(dirname "$0")/../.." || exit 1
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=8000 \
  --screenshot="$PWD/public/og-logo-with-text.png" "file://$PWD/scripts/brand/og-with-text.html"
