#!/usr/bin/env python3
"""
Aligne le HTML du récit sur la structure des paragraphes du Syaria Recap.docx :
à chaque nouveau paragraphe du docx, on insère <br><br> dans le HTML (au sein d'un même <p>).
"""
import zipfile
import re
import sys
from xml.etree import ElementTree
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
DOCX_PATH = BASE / "public/realisations/Syaria Recap.docx"
HTML_PATH = BASE / "content/ecritures/l-homme-au-masque-de-verre.html"


def norm(s):
    """Normalise pour la comparaison (apostrophes, Keymlos->Kheym, espaces)."""
    if not s:
        return ""
    s = str(s).replace("\xa0", " ").replace("&#39;", "'")
    s = s.replace("'", "'").replace("'", "'")
    s = re.sub(r"\s+", " ", s)
    s = s.replace("Keymlos", "Kheym")
    return s.strip()


def strip_html_to_plain(html_fragment):
    """Retourne le texte seul (sans balises) du fragment HTML."""
    text = re.sub(r"<[^>]+>", " ", html_fragment)
    text = text.replace("&#39;", "'").replace("&nbsp;", " ")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def plain_to_html_offset(html_fragment, target_plain_offset):
    """Retourne l'index dans html_fragment correspondant au caractère target_plain_offset du texte brut."""
    plain_i = 0
    i = 0
    in_tag = False
    while i < len(html_fragment):
        if plain_i >= target_plain_offset:
            return i
        if html_fragment[i] == "<":
            in_tag = True
            i += 1
            continue
        if html_fragment[i] == ">":
            in_tag = False
            i += 1
            continue
        if in_tag:
            i += 1
            continue
        if html_fragment[i : i + 5] == "&#39;":
            i += 5
        else:
            i += 1
        plain_i += 1
    return i


def extract_docx_paragraphs(path):
    ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    with zipfile.ZipFile(path) as z:
        root = ElementTree.fromstring(z.read("word/document.xml"))

    def text_of(el):
        out = []
        for t in el.iter():
            if t.text:
                out.append(t.text)
            if t.tail:
                out.append(t.tail)
        return "".join(out)

    paras = root.findall(".//w:p", ns)
    return [text_of(p).strip() for p in paras]


def main():
    docx_paras = extract_docx_paragraphs(DOCX_PATH)
    docx_nonempty = [p for p in docx_paras if p]
    docx_norm = [norm(p) for p in docx_nonempty]
    docx_index = [0]  # mutable pour être mis à jour dans process_p

    html = HTML_PATH.read_text(encoding="utf-8")

    def process_p(match):
        full_p = match.group(0)
        inner = match.group(1)
        plain = strip_html_to_plain(inner)
        plain_norm = norm(plain)
        if not plain_norm or docx_index[0] >= len(docx_norm):
            return full_p

        start = docx_index[0]
        # Avancer jusqu'à trouver un paragraphe docx qui matche le début de ce <p> HTML
        while start < len(docx_norm) and docx_norm[start]:
            first_50 = docx_norm[start][:50].strip()
            plain_50 = plain_norm[:60].strip()
            if first_50 in plain_norm or plain_norm.startswith(first_50[:30]) or (len(first_50) > 20 and first_50[:20] in plain_50):
                break
            start += 1
        if start >= len(docx_norm):
            return full_p

        built = ""
        end = start - 1
        for i in range(start, min(start + 25, len(docx_norm))):
            seg = docx_norm[i]
            if not seg:
                continue
            built = (built + " " + seg) if built else seg
            built_norm = norm(built)
            if len(built_norm) > len(plain_norm) * 1.2:
                break
            if plain_norm.startswith(built_norm[: min(80, len(built_norm))]) or built_norm[:50] in plain_norm:
                end = i
            if len(built_norm) >= len(plain_norm) * 0.9:
                break
        if end < start:
            return full_p

        segments = docx_norm[start : end + 1]
        docx_index[0] = end + 1

        # Trouver les frontières en cherchant le début de chaque segment suivant dans le texte brut
        boundaries = []
        search_start = 0
        for i in range(len(segments) - 1):
            next_seg = segments[i + 1]
            needle = next_seg[: min(40, len(next_seg))].strip()
            if not needle:
                continue
            pos = plain_norm.find(needle, search_start)
            if pos < 0:
                pos = plain_norm.find(needle[:20], search_start)
            if pos > search_start and pos < len(plain_norm):
                boundaries.append(pos)
            search_start = pos + len(needle) if pos >= 0 else search_start + len(segments[i])

        if not boundaries:
            return full_p

        # Calculer toutes les positions HTML avant toute insertion (pour insérer de la fin vers le début)
        html_positions = [plain_to_html_offset(inner, b) for b in boundaries]
        for pos in reversed(html_positions):
            inner = inner[:pos] + "<br><br>" + inner[pos:]

        return "<p>" + inner + "</p>"

    p_pattern = re.compile(r"<p>([\s\S]*?)</p>", re.MULTILINE)
    new_html = p_pattern.sub(process_p, html)

    # Ne garder qu'un seul passage à la ligne (br><br>) : remplacer 4+ br par br><br>
    new_html = re.sub(r"(<br>\s*){4,}", "<br><br>", new_html)
    new_html = re.sub(r"(<br>\s*){3}", "<br><br>", new_html)

    HTML_PATH.write_text(new_html, encoding="utf-8")
    print("HTML mis à jour selon la structure du docx.", file=sys.stderr)


if __name__ == "__main__":
    main()
