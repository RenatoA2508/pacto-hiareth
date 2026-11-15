# Inventario y créditos de recursos

Auditoría inicial: 15 de noviembre de 2026. Un enlace no significa que un recurso esté descargado o integrado.

## Aidan — Evil Wizard 2

- Autor: LuizMelo.
- Fuente: https://luizmelo.itch.io/evil-wizard-2
- Descarga: opción gratuita ofrecida por el autor, sin pago ni cuenta, 2026-11-15.
- Original local: `assets/originals/aidan/EVil Wizard 2.zip`, intacto y fuera del build y de Git.
- SHA-256 del ZIP: `438ee456bf4f6fde3cff1bd80a0356174756c46788911703f4ad7096c120029a`.
- Licencia: **CC0**, verificada en la página y en `License.txt` del ZIP; el autor admite uso comercial y no comercial. Atribución no obligatoria; se incluye en README y pie de la aplicación.
- Integrados: `public/assets/images/characters/aidan/{Idle,Run,Jump,Fall}.png` y `License.txt`.
- Modificaciones: ninguna en los PNG. Escala uniforme 0.9 en juego y 2 en la vista del menú; volteo horizontal por código.
- Formato: PNG RGBA, cuadros de 250 × 250, dibujo mirando a la derecha.
- Compatibilidad: lateral, permite correr y saltar. La base visible termina en y=167; el cuerpo físico evita la transparencia.

| Hoja inspeccionada en el ZIP | Dimensiones | Cuadros | Uso actual |
| --- | --- | --- | --- |
| Idle.png | 2000 × 250 | 8 | Reposo, 8 fps |
| Run.png | 2000 × 250 | 8 | Carrera, 12 fps |
| Jump.png | 500 × 250 | 2 | Ascenso, 8 fps |
| Fall.png | 500 × 250 | 2 | Descenso, 8 fps |
| Attack1.png | 2000 × 250 | 8 | No integrado; combate por definir |
| Attack2.png | 2000 × 250 | 8 | No integrado; combate por definir |
| Take hit.png | 750 × 250 | 3 | No integrado; daño por definir |
| Death.png | 1750 × 250 | 7 | No integrado; muerte por definir |

## Recursos pendientes de integración

| Uso | Fuente original | Archivo local | Licencia y verificación | Estado |
| --- | --- | --- | --- | --- |
| Fondo nivel 1 | https://craftpix.net/freebies/free-nature-backgrounds-pixel-art/ | Ninguno | Ficha y licencia Freebie consultadas; uso en juegos permitido, redistribución del paquete fuente restringida | Descarga requiere iniciar sesión en CraftPix. Capas no inspeccionadas. |
| Slimes nivel 1 | https://craftpix.net/freebies/free-slime-mobs-pixel-art-top-down-sprite-pack/ | Ninguno | Ficha consultada; política Freebie revisada, licencia del archivo aún no inspeccionada | Perspectiva Top-Down confirmada en ficha; compatibilidad lateral pendiente de inspección y aprobación. |
| Fondo nivel 2 | https://craftpix.net/freebies/free-city-ruin-backgrounds-pixel-art/ | Ninguno | Pendiente de verificación individual | Referencia conservada. |
| Fondo nivel 3 | https://craftpix.net/freebies/free-pixel-art-abandoned-places-background-collection/ | Ninguno | Pendiente de verificación individual | Referencia conservada. |
| Esqueletos nivel 3 | https://craftpix.net/freebies/free-skeleton-pixel-art-sprite-sheets/ | Ninguno | Pendiente de verificación individual | Sin animaciones inspeccionadas ni ataques asignados. |
| Fondo del jefe | https://craftpix.net/freebies/free-moon-pixel-game-backgrounds/ | Ninguno | Pendiente de verificación individual | No integrado; Boss Fight bloqueado. |
| Paquete adicional | https://craftpix.net/product/3-enemy-character-sprite-set/ | Ninguno | Autoría, adquisición y licencia por aclarar | No descargar ni integrar sin aclarar procedencia. |
| Aine | No proporcionada | Ninguno | Pendiente | Sin sustitución. |
| Tileset/plataformas finales | No proporcionada | Ninguno | Pendiente | La geometría del laboratorio solo sirve para probar colisiones. |

Licencia de CraftPix consultada: https://craftpix.net/file-licenses/ . No se ha iniciado sesión, creado cuenta ni descargado o redistribuido ningún paquete de CraftPix. Mantener los originales fuera de `public/` y revisar permiso de versionar recursos antes de integrarlos en un repositorio accesible.

## Geometría de laboratorio

Rectángulos, retícula, líneas y marcadores dibujados con Phaser Graphics y CSS dentro del proyecto. No son fondos ni sprites definitivos, no corresponden a lugares de la historia y no sustituyen los recursos aprobados.

## Actualización de integración del nivel 1

El usuario descargó los ZIP oficiales `craftpix-net-823949-free-nature-backgrounds-pixel-art.zip` y `craftpix-net-788364-free-slime-mobs-pixel-art-top-down-sprite-pack.zip`. Están intactos en `assets/originals/level-1/`, ignorados por Git. Sus `License.txt` remiten a la política Freebie de CraftPix consultada. Se usan en el juego; no se redistribuyen como paquetes de arte independientes.

- Naturaleza: capas `nature_1/{1,2,3,5,6,7,8,10}.png`, 576×324, copiadas sin modificaciones a `public/assets/images/backgrounds/nature/`. Se escalan uniformemente y desplazan con distintos factores para parallax.
- Slime1: hojas Idle, Walk, Attack, Hurt y Death, copiadas sin cambios de píxeles a `public/assets/images/enemies/slime/` y renombradas por acción. Cuadros 64×64, cuatro filas direccionales. Se usa la cuarta fila, mirando a la derecha, con flip horizontal para izquierda. Recuentos 6/8/10/5/10 cuadros por fila. Escala uniforme 2; cuerpo físico 18×18 y origen visible y=40 antes de escala.
- Ataque cercano aprobado por el usuario tras inspección. No se utilizan Slime2, Slime3, sombras, partes sueltas, PSD ni cupones. No se añaden poderes por el aspecto del paquete.
- Plataformas de tierra y hierba y portal: gráficos propios por código, sin tileset externo y con colisiones separadas del fondo.
- Las filas anteriores del inventario conservan la auditoría inicial; este registro actualiza esos dos recursos a INTEGRADOS Y PROBADOS.
