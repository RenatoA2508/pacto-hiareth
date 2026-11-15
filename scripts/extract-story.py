"""Extrae el prólogo literal del Word canónico, sin reescribir ni completar texto."""
from pathlib import Path
from zipfile import ZipFile
from xml.etree import ElementTree as ET
import json
import hashlib
import sys

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'docs/source/el pacto de hiraeth (1).docx'
TARGET = ROOT / 'src/data/prologue.json'

with ZipFile(SOURCE) as archive:
    tree = ET.fromstring(archive.read('word/document.xml'))
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
paragraphs = [''.join(t.text or '' for t in p.findall('.//w:t', ns))
              for p in tree.findall('.//w:p', ns)]
assert paragraphs[32] == 'INTRODUCCIÓN'
assert paragraphs[60].startswith('Tras escuchar una carcajada muda')
data = {
    'title': paragraphs[32],
    'source': SOURCE.name,
    'sourceSha256': hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
    'paragraphs': [{'sourceIndex': i, 'text': paragraphs[i]} for i in range(33, 61)],
}
content = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
if '--check' in sys.argv:
    assert TARGET.read_text() == content, 'El prólogo difiere del Word fuente'
    print('Prólogo verificado: 28 párrafos literales, en el orden original.')
else:
    TARGET.write_text(content)
    print('Prólogo extraído sin cambios en la fuente.')

intro = { 'title': 'ACTO 1 · TIERRA, MAR Y CIELO', 'source': SOURCE.name,
          'sourceSha256': data['sourceSha256'],
          'paragraphs': [{'sourceIndex': i, 'text': paragraphs[i]} for i in range(64, 98)] }
intro_target = ROOT / 'src/data/level1-intro.json'
intro_content = json.dumps(intro, ensure_ascii=False, indent=2) + '\n'
if '--check' in sys.argv:
    assert intro_target.read_text() == intro_content, 'La introducción del nivel difiere del Word'
    print('Introducción nivel 1 verificada: 34 párrafos literales.')
else:
    intro_target.write_text(intro_content)
    print('Introducción nivel 1 extraída sin cambios en la fuente.')

assert paragraphs[118] == 'Aidan: Airan… ¿Y tú?'
for filename, title, indexes in [
    ('camp.json', 'TIERRA, MAR Y CIELO', range(104, 161)),
    ('act2.json', 'ACTO 2 · VUELA ALTO', range(170, 224)),
]:
    entries = []
    for index in indexes:
        text = paragraphs[index]
        if not text.strip():
            continue
        # Única corrección expresamente autorizada por el usuario; el Word no cambia.
        if index == 118:
            text = 'Aidan: Aidan… ¿Y tú?'
        entries.append({'sourceIndex': index, 'text': text})
    chapter = {'title': title, 'source': SOURCE.name, 'sourceSha256': data['sourceSha256'], 'paragraphs': entries}
    if filename == 'camp.json':
        chapter['authorizedCorrections'] = [{'sourceIndex': 118, 'from': paragraphs[118], 'to': 'Aidan: Aidan… ¿Y tú?'}]
    target = ROOT / 'src/data' / filename
    content = json.dumps(chapter, ensure_ascii=False, indent=2) + '\n'
    if '--check' in sys.argv:
        assert target.read_text() == content, f'{filename} difiere del texto autorizado'
        note = 'corrección autorizada solo en p118' if filename == 'camp.json' else 'sin cambios en el texto'
        print(f'{filename} verificado: {len(entries)} párrafos, {note}.')
    else:
        target.write_text(content)
