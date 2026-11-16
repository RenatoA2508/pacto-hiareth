# El pacto de Hiareth

Plataformas lateral 2D con **Phaser 3.90.0, JavaScript y Vite**. Aidan atraviesa los portales del Pacto en busca de un fragmento de Lia Fáil. El Word conserva el texto original. La documentación maestra reúne la continuación de los actos 3, 4 y final.

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

## Contenido de la versión 1.0

- **Tierra, mar y cielo.** Bosque con seis slimes que se pueden esquivar o combatir.
- **Vuela alto.** Ruinas de la Antigua Federación con cuatro autómatas de defensa terrestres.
- **Limbo (Enfermedad).** El jugador elige huir por un túnel o abrir paso con magia. Esa decisión determina la ruta del acto 4. Los perros esqueléticos hacen daño por contacto y al atacar.
- **Don't Try.** Valle de montaña y galerías. Aidan busca a Aine. Según la ruta hay una despedida o un combate de rescate.
- **Hiareth.** Castillo, diálogo con el dragón y combate por turnos. La victoria entrega un fragmento de Lia Fáil y da paso al epílogo correspondiente.
- **Prácticas y audio.** Laboratorio de movimiento, entrenamiento de combate y cinco efectos CC0 de Kenney. El silencio se guarda entre sesiones.

Cada checkpoint vale 100 puntos y cada acto completado en plataformas suma 500. La ruta de rescate y las bajas no conceden puntos. El récord se conserva al iniciar otro viaje.

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

La clave `pacto-hiraeth:v1` conserva silencio, nivel alcanzado, checkpoints, bajas de cada recorrido, elección del Limbo, etapa de la historia, récord y posición de lectura. Un viaje nuevo reinicia su recorrido y sus bajas; el nivel máximo alcanzado se conserva. El laboratorio tiene un checkpoint independiente. Datos corruptos o almacenamiento bloqueado no impiden jugar; en ese caso se usa memoria de la sesión.

## Código y comprensión técnica

```text
src/
  main.js                  Phaser y conexión de gestores
  config/                  Movimiento, arte, audio, combate y nivel
  data/                    Narrativa original y continuación
  entities/                Aidan, Aine y enemigos
  managers/                Entrada, audio y almacenamiento
  systems/                 Vida, ataques, IA, colisiones ofensivas y progreso
  scenes/                  Menú, lectores, niveles, prácticas, pausa, resultados y duelo
  ui/                      Interfaz HTML, lectura y dibujo de escenarios
scripts/                   Extracción literal y empaquetado
public/assets/             Solo recursos integrados y sus licencias
assets/originals/           ZIP locales ignorados por Git y fuera del build
docs/source/               Word originales y guion completo
tests/                     Pruebas con node:test
```

`BaseEnemy` comparte física, vida y estados; `SlimeEnemy` aporta el arte y configuración inspeccionados. `EnemyBrain` decide IDLE/CHASE/ATTACK/HURT/DEATH. `CombatSystem` aplica hitboxes activas y un solo golpe por víctima y ataque. `Vitals` comparte invulnerabilidad entre contacto y ataque para impedir daño duplicado. `LevelProgress` guarda bajas y calcula el puntaje a partir de checkpoints y recorridos completados.

Los cuadros de Aidan miden 250 × 250, pero su hitbox mide 30 × 65 antes de escala, con offset (111,102). La transparencia no colisiona. Los slimes usan cuadros de 64 × 64 y la cuarta fila lateral del paquete. La gravedad, velocidad y altura de salto están centralizadas. Se usa Canvas, sin shaders. El proyecto se escribió por módulos, sin plantilla de juego descargada.

En desarrollo, `/?debug` muestra FPS, posición y suelo en el laboratorio y los niveles de la historia. No aparece en producción. Las lecturas de FPS de la vista previa no sustituyen medir los dispositivos de entrega.

## Recursos y documentación

- [Estado y pendientes](docs/PROJECT_STATUS.md), [decisiones](docs/DECISIONS.md) y [pruebas](docs/VALIDATION.md).
- [Guion de demo y defensa](docs/DEMO_GUIDE.md).
- [Créditos de arte](docs/ASSET_CREDITS.md) y [catálogo de audio](docs/AUDIO_ASSET_CATALOG.md).
- [Documentación maestra y guion](docs/source/GAME_MASTER_DOCUMENTATION.md), narrativa y guía académica en `docs/source/`.

Aidan: [Evil Wizard 2 de LuizMelo](https://luizmelo.itch.io/evil-wizard-2), CC0. Audio: [Interface Sounds](https://kenney.nl/assets/interface-sounds) e [Impact Sounds](https://kenney.nl/assets/impact-sounds) de Kenney, CC0. Naturaleza, ciudad y slimes: paquetes Freebie aprobados de CraftPix, con licencia registrada en el inventario. Solo se integraron los PNG usados; los ZIP, PSD, cupones y demostraciones quedan fuera de la distribución. Las plataformas físicas se dibujan por código, separadas del fondo. No se extrajo música de YouTube.

## Paquetes

`npm run package` crea ZIP de web estática y de fuente con `dist/`, ambos con instrucciones `EJECUTAR.txt`. Se verifican los ZIP y se excluyen `.git`, credenciales, `node_modules` y originales de terceros. El código y los documentos están versionados; los paquetes locales de `release/` no se suben a Git.

Para servir el paquete web sin instalar Node: `python3 -m http.server 8080` y abrir `http://localhost:8080`. Para el paquete de fuente, también se puede servir su `dist/` con `python3 -m http.server 8080 --directory dist`.

## Dificultad global

El menú permite elegir Fácil, Media o Hard. Se guarda para todos los actos y se aplica al entrar o reintentar un nivel; cambiarla conserva checkpoints y bajas. El duelo con el dragón ajusta su balance con el mismo selector. Las prácticas conservan su balance didáctico.

| Perfil | Vida | Invulnerabilidad | Slime: velocidad / pausa entre ataques | Huecos principales | Ruinas |
| --- | --- | --- | --- | --- | --- |
| Fácil | 5 | 1200 ms | 55 px/s / 2000 ms | 120 px | Tres huecos originales |
| Media | 3 | 900 ms | 85 px/s / 1450 ms | 180 px | Tres huecos adicionales de 90 px |
| Hard | 3 | 650 ms | 110 px/s / 1150 ms | 195 px | Tres huecos adicionales de 130 px |

Media y Hard estrechan las plataformas elevadas 20 y 40 px respectivamente. Se mantiene el salto, el daño por golpe y la anticipación visible del slime; las bajas no dan puntos. Los perfiles están centralizados en src/config/difficulty.js. Las partidas anteriores usan Media por defecto.

El fondo del bosque omite las capas 8 y 10 de suelo decorativo plano y amplía uniformemente las seis capas restantes para que las bases de los árboles queden bajo el terreno físico. Los PNG originales permanecen intactos.
