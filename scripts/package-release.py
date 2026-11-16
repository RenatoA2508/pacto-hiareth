"""Empaqueta código y web compilada mediante una lista explícita de rutas públicas."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json

ROOT = Path(__file__).resolve().parent.parent
VERSION = json.loads((ROOT / 'package.json').read_text())['version']
OUT = ROOT / 'release'
OUT.mkdir(exist_ok=True)
assert (ROOT / 'dist/index.html').is_file(), 'Ejecutar npm run build primero'
instructions = '''El pacto de Hiareth

Cinco actos, dos desenlaces y un duelo por turnos. Se incluyen prólogo,
laboratorio de movimiento y entrenamiento de combate.

Web compilada: desde esta carpeta ejecutar python3 -m http.server 8080
y abrir http://localhost:8080 . No abrir index.html con file://.

Código fuente: npm ci, npm test y npm run dev.
Para servir el dist incluido: python3 -m http.server 8080 --directory dist

Controles: A/D o flechas, Espacio para saltar, J para ataque cercano,
Escape para pausa y botones táctiles equivalentes. Silencio en la cabecera.
'''

web = OUT / f'pacto-hiraeth-web-{VERSION}.zip'
with ZipFile(web, 'w', ZIP_DEFLATED) as archive:
    for path in sorted((ROOT / 'dist').rglob('*')):
        if path.is_file(): archive.write(path, path.relative_to(ROOT / 'dist'))
    archive.writestr('EJECUTAR.txt', instructions)

source = OUT / f'pacto-hiraeth-source-{VERSION}.zip'
directories = ['src', 'public', 'tests', 'scripts', 'docs/source', 'dist']
files = ['index.html', 'package.json', 'package-lock.json', 'vite.config.js',
         'README.md', '.gitignore', '.gitattributes']
files.extend(str(p.relative_to(ROOT)) for p in (ROOT / 'docs').glob('*.md'))
with ZipFile(source, 'w', ZIP_DEFLATED) as archive:
    for name in files:
        archive.write(ROOT / name, Path('pacto-hiraeth') / name)
    for directory in directories:
        for path in sorted((ROOT / directory).rglob('*')):
            if path.is_file() and '__pycache__' not in path.parts:
                archive.write(path, Path('pacto-hiraeth') / path.relative_to(ROOT))
    archive.writestr('pacto-hiraeth/EJECUTAR.txt', instructions)

for path in (web, source):
    with ZipFile(path) as archive:
        assert archive.testzip() is None
        assert not any('/node_modules/' in n or '/.git/' in n or '/.env' in n or '/originals/' in n for n in archive.namelist())
    print(f'{path.relative_to(ROOT)} — {path.stat().st_size:,} bytes — ZIP verificado')
