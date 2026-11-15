# El pacto de Hiareth

Plataformas lateral 2D con **Phaser 3.90.0, JavaScript y Vite**. Aidan atraviesa el bosque y la ciudad en ruinas del relato. El texto original tiene prioridad y se conserva en `docs/source/`.

## Ejecutar

Requiere Node.js 22.12 o posterior, npm y Python 3 para las comprobaciones de narrativa y los ZIP.

```sh
npm ci
npm run dev
```

Abre la dirección local que imprime Vite, normalmente `http://127.0.0.1:5173`. No abrir `index.html` con file://. Ctrl+C detiene el servidor.

```sh
npm test          # Persistencia, daño, IA, recursos, audio y fidelidad narrativa
npm run build    # Compilación estática en dist/
npm run preview  # Revisar la compilación
npm run package  # Generar ZIP de web y fuente en release/
```

## Contenido de la versión 0.4

- **Nivel 1 — Tierra, mar y cielo:** fondo de naturaleza por capas, seis slimes con vistas laterales reales, plataformas, tres huecos, dos checkpoints y portal. Es posible terminar sin derrotar slimes; la ruta con cero bajas fue comprobada en navegador.
- **Nivel 2 — Vuela alto:** cinco capas del fondo de ciudad aprobado, plataformas, tres huecos, dos checkpoints y portal. Los ovnis forman parte del fondo; no se inventan enemigos interactivos para esta zona.
- **Combate cercano:** J y botón táctil, animaciones reales, tres puntos de vida, invulnerabilidad breve, anticipación del ataque enemigo, ventanas activas y bloqueo de daño a través de paredes. No hay proyectiles.
- **Contador separado:** cada slime derrotado se registra una sola vez. Las bajas no otorgan puntos ni seleccionan una rama narrativa. Al reintentar desde checkpoint se conserva el registro de bajas del viaje; Nuevo viaje o Repetir nivel limpia ese registro.
- **Narrativa:** 173 párrafos del Word: prólogo (28), introducción (34), fogata y llegada a la ciudad (57), recuerdos y transición al limbo (54). Única corrección autorizada: Airan → Aidan en el párrafo fuente 118. Guardado del punto de lectura y opción de saltar la lectura.
- **Prácticas:** laboratorio de movimiento y entrenamiento con tres objetivos geométricos independientes de la historia.
- **Audio:** cinco efectos CC0 de Kenney, OGG con fallback MP3; silencio persistente disponible en la cabecera. No hay música integrada.
- **Estados:** menú, pausa, caída, derrota por vida, reintento y llegada al portal. Primer portal → fogata → ciudad → recuerdos → Fin de esta versión. La última pantalla indica el límite del contenido disponible.

**Todavía no es la entrega académica completa.** Faltan los actos 3, 4 y final, sprite de Aine, enemigos aprobados para la ciudad, música autorizada, criterio de puntuación, video y autoevaluación del estudiante. El Boss Fight continúa bloqueado. `highScore` permanece en cero hasta aprobar el puntaje; `levelReached` registra el máximo nivel iniciado y `currentLevel` el recorrido para continuar.

## Controles

| Acción | Teclado | Táctil |
| --- | --- | --- |
| Caminar | A/D o ←/→ | Mantener ←/→ |
| Saltar | Espacio | Saltar |
| Ataque cercano desde suelo | J | Atacar |
| Pausa / reanudar | Escape | Pausa / Continuar |
| Silencio | Botón de cabecera | Botón de cabecera |
| Leer historia | ←/→, botones; Escape sale | Anterior / Siguiente |

Haz clic en el escenario si el teclado perdió el foco. Tab y Enter sirven para los botones. Mantener Espacio o J no repite automáticamente la acción. La pausa se activa también al ocultar la ventana o perder su foco. Falta validar multitouch en teléfono físico.

## Guardado

La clave `pacto-hiraeth:v1` conserva silencio, nivel alcanzado, checkpoints de ambos niveles, bajas únicas del primero, resultados y posición de lectura de cada capítulo. Un viaje nuevo reinicia su recorrido y sus bajas; el nivel máximo alcanzado se conserva. El laboratorio tiene un checkpoint independiente. Datos corruptos o almacenamiento bloqueado no impiden jugar; en ese caso se usa memoria de la sesión.

## Código y comprensión técnica

```text
src/
  main.js                  Phaser y conexión de gestores
  config/                  Movimiento, arte, audio, combate y nivel
  data/                    Geometría y narrativa extraída
  entities/                Player, BaseEnemy, SlimeEnemy y PracticeEnemy
  managers/                Entrada, audio y almacenamiento
  systems/                 Vida, ataques, IA, colisiones ofensivas y progreso
  scenes/                  Boot, Menu, Story, Level1, Level2, prácticas, Pause, Result y VersionEnd
  ui/                      Interfaz HTML, lectura y dibujo de escenarios
scripts/                   Extracción literal y empaquetado
public/assets/             Solo recursos integrados y sus licencias
assets/originals/           ZIP locales ignorados por Git y fuera del build
docs/source/               Las tres fuentes sin modificaciones
tests/                     Pruebas con node:test
```

`BaseEnemy` comparte física, vida y estados; `SlimeEnemy` aporta el arte y configuración inspeccionados. `EnemyBrain` decide IDLE/CHASE/ATTACK/HURT/DEATH. `CombatSystem` aplica hitboxes activas y un solo golpe por víctima y ataque. `Vitals` comparte invulnerabilidad entre contacto y ataque para impedir daño duplicado. `LevelProgress` guarda bajas y checkpoints sin acoplarlos al puntaje.

Los cuadros de Aidan miden 250 × 250, pero su hitbox mide 30 × 65 antes de escala, con offset (111,102). La transparencia no colisiona. Los slimes usan cuadros de 64 × 64 y la cuarta fila lateral del paquete. La gravedad, velocidad y altura de salto están centralizadas. Se usa Canvas, sin shaders. El proyecto se escribió por módulos, sin plantilla de juego descargada.

En desarrollo, `/?debug` muestra FPS, posición y suelo en el laboratorio y ambos niveles. No aparece en producción. Las lecturas de FPS de la vista previa no sustituyen medir los dispositivos de entrega.

## Recursos y documentación

- [Estado y pendientes](docs/PROJECT_STATUS.md), [decisiones](docs/DECISIONS.md) y [pruebas](docs/VALIDATION.md).
- [Guion de demo y defensa](docs/DEMO_GUIDE.md).
- [Créditos de arte](docs/ASSET_CREDITS.md) y [catálogo de audio](docs/AUDIO_ASSET_CATALOG.md).
- [Fuente maestra original](docs/source/GAME_MASTER_DOCUMENTATION.md), narrativa y guía académica en `docs/source/`.

Aidan: [Evil Wizard 2 de LuizMelo](https://luizmelo.itch.io/evil-wizard-2), CC0. Audio: [Interface Sounds](https://kenney.nl/assets/interface-sounds) e [Impact Sounds](https://kenney.nl/assets/impact-sounds) de Kenney, CC0. Naturaleza, ciudad y slimes: paquetes Freebie aprobados de CraftPix, con licencia registrada en el inventario. Solo se integraron los PNG usados; los ZIP, PSD, cupones y demostraciones quedan fuera de la distribución. Las plataformas físicas se dibujan por código, separadas del fondo. No se extrajo música de YouTube.

## Paquetes

`npm run package` crea ZIP de web estática y de fuente con `dist/`, ambos con instrucciones `EJECUTAR.txt`. Se verifican los ZIP y se excluyen `.git`, credenciales, `node_modules` y originales de terceros. El código y los documentos están versionados; los paquetes locales de `release/` no se suben a Git.

Para servir el paquete web sin instalar Node: `python3 -m http.server 8080` y abrir `http://localhost:8080`. Para el paquete de fuente, también se puede servir su `dist/` con `python3 -m http.server 8080 --directory dist`.
