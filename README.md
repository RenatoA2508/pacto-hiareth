# El pacto de Hiareth

Plataformas 2D con **Phaser 3.90.0 y JavaScript**, preparado con Vite. El protagonista es Aidan, un mago de fuego. La historia fuente tiene prioridad sobre cualquier propuesta de implementación.

## Ejecutar

Requiere Node.js 22.12 o posterior y npm.

```sh
npm ci
npm run dev
```

Abre la dirección local que imprime Vite (normalmente `http://127.0.0.1:5173`). Para detenerlo, usa Ctrl+C en la terminal. No abrir `index.html` directamente: se necesitan el servidor y los módulos de JavaScript.

```sh
npm test          # Guardado y recuperación de partidas
npm run build    # Genera dist/ para alojamiento estático
npm run preview  # Revisa la compilación local
```

El `base` relativo permite alojar `dist/` en un subdirectorio. No se ha configurado publicación automática.

## Versión de desarrollo 0.2

Hay un **laboratorio de movimiento independiente de la historia**. Incluye el sprite aprobado de Aidan, caminar, salto simple, gravedad y colisiones Arcade Physics, cámara lateral, checkpoint, caída, reintento, llegada, menú y pausa. La llegada solo completa la prueba técnica.

El guardado conserva checkpoint del laboratorio y silencio. Los campos `highScore` y `levelReached` están preparados, pero permanecen en cero: todavía no hay reglas aprobadas de puntuación ni niveles narrativos implementados. Si el navegador bloquea el guardado, se conserva el estado en memoria durante la sesión.

El menú también ofrece **Entrenamiento de combate**: J o Atacar ejecutan el ataque cercano real de Aidan, con tres puntos de vida. Tres objetivos geométricos caminan, persiguen, dañan por contacto y ejecutan un ataque corto. Hay anticipación, ventanas de daño, invulnerabilidad, bloqueo de ataques a través de paredes, reacción, muerte, derrota y repetición. No son slimes ni enemigos definitivos de la historia.

**Leer prólogo** presenta 28 párrafos literales de la introducción del Word, con avance, retroceso y guardado automático del punto de lectura. Flechas izquierda/derecha cambian de párrafo y Escape vuelve al menú. No se han añadido diálogos ni un final.

**No es el juego terminado.** Quedan pendientes los niveles narrativos, slimes definitivos, decisiones frente al slime, puntuación y música. Ya se reproducen cinco efectos CC0 de Kenney para interfaz, pasos, aterrizaje y golpes. OGG incluye fallback MP3; el botón de silencio está disponible en la cabecera incluso fuera del juego.

## Controles provisionales aprobados

| Acción | Teclado | Pantalla táctil |
| --- | --- | --- |
| Caminar | A/D o ←/→ | Mantener ←/→ |
| Saltar | Espacio | Botón Saltar |
| Ataque cercano en entrenamiento, desde suelo | J | Botón Atacar |
| Pausar y reanudar | Escape | Pausa / Continuar |
| Silencio | Botón del HUD | Botón del HUD |

Haz clic en el escenario si el teclado perdió el foco. Los botones de interfaz funcionan también con Tab y Enter. El salto requiere tocar el suelo; mantener Espacio no produce saltos repetidos. La prueba se pausa cuando la ventana pierde el foco o se oculta. En móvil, los botones permiten mantener caminar y pulsar salto simultáneamente; falta validar esta combinación en un teléfono físico.

En desarrollo, `/?debug` muestra FPS, posición y contacto con el suelo para ayudar a revisar las físicas. No existe ese panel en la compilación de producción.

## Organización y recorrido del código

```text
src/
  main.js                  Crea Phaser, configura escenas y conecta gestores
  config/game.js           Resolución, física, movimiento y hojas de Aidan
  data/playground.js       Geometría del laboratorio; no es un nivel narrativo
  entities/Player.js       Cuerpo físico, orientación y animaciones
  managers/
    InputController.js     Teclado y botones con una misma salida
    StorageManager.js      Guardado versionado, validación y recuperación
  scenes/
    BootScene.js           Loader y animaciones; informa errores de carga
    MenuScene.js           Inicio o continuación del laboratorio
    PlaygroundScene.js     Plataformas, cámara, checkpoint y llegada
    PauseScene.js          Suspende y reanuda la escena de juego
    ResultScene.js         Resultado del intento y reintento
  ui/
    GameUI.js              Botones HTML, foco y anuncios accesibles
    drawLaboratory.js      Geometría decorativa de prueba
public/assets/             Solo recursos usados por el juego
assets/originals/          Archivos descargados locales, ignorados por Git
docs/source/              Copias sin modificaciones de las tres fuentes
tests/                    Casos de persistencia con node:test
```

`Boot → Menu → Playground → Result` es el flujo principal. `Pause` se ejecuta por encima de `Playground`, que permanece suspendida. Las escenas retiran sus listeners al cerrarse. La interfaz HTML facilita lectura, navegación por teclado y botones táctiles sin depender del texto dibujado en el canvas.

El cuerpo físico del jugador mide 30 × 65 antes de escala; su desplazamiento en la hoja es (111, 102). Los cuadros completos miden 250 × 250 y contienen transparencia. Colisionar con todo el cuadro produciría choques lejos del dibujo. Las plataformas físicas se definen por separado del fondo decorativo.

Velocidad, gravedad y salto están centralizados para ajustar la sensación de movimiento con el equipo. El renderizador de este incremento es Canvas; no usa shaders. No se empleó una plantilla de juego descargada.

## Fuentes y decisiones

- [Documentación maestra original](docs/source/GAME_MASTER_DOCUMENTATION.md).
- [Narrativa original](docs/source/el%20pacto%20de%20hiraeth%20%281%29.docx).
- [Guía académica original](docs/source/ProyectoPrimerBimestre-2026-A.docx).
- [Comprensión, pendientes y plan](docs/PROJECT_STATUS.md).
- [Decisiones confirmadas](docs/DECISIONS.md).
- [Créditos e inventario de recursos](docs/ASSET_CREDITS.md).
- [Catálogo de audio](docs/AUDIO_ASSET_CATALOG.md).
- [Verificación de este incremento](docs/VALIDATION.md).

Las fuentes originales conservan errores y decisiones antiguas; `docs/DECISIONS.md` registra aclaraciones posteriores. El usuario confirmó **Aidan** y que «Airan» es un error; ningún diálogo original se modificó. Se conserva el título de trabajo «El pacto de Hiareth» del documento maestro, aunque la carpeta del repositorio se llama `pacto-hiraeth`.

El Boss Fight permanece bloqueado hasta que el equipo complete y apruebe la historia y autorice su implementación. No hay escena, patrones ni ataques de jefe.

## Créditos

Aidan utiliza [Evil Wizard 2 de LuizMelo](https://luizmelo.itch.io/evil-wizard-2), con licencia CC0 verificada en la página y en `License.txt` del paquete. Se usan únicamente Idle, Run, Jump y Fall sin modificar los PNG. La geometría del laboratorio es código de prueba, no arte definitivo. No se incluyen recursos de CraftPix ni audio extraído de YouTube.

El entrenamiento añade Attack1, Take hit y Death del mismo paquete sin modificar. Audio: Kenney, Interface Sounds e Impact Sounds, CC0. Consulta el catálogo de audio para los cinco archivos usados y sus licencias. Los ZIP recibidos de CraftPix están en auditoría; no se incluyen sus paquetes fuente en Git.

## Paquetes locales

`npm run package` compila y crea dos ZIP verificados en `release/`: web estática y código fuente con `dist/` incluido. El paquete incluye `EJECUTAR.txt`. No contiene `node_modules`, `.git`, credenciales ni originales descargados. Son paquetes de desarrollo, no una entrega académica completa. Se necesita Python 3 para extracción/verificación del prólogo y para empaquetar.
