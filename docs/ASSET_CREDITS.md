# Inventario y créditos — 0.4.0

Fecha de integración y auditoría: 15 de noviembre de 2026. Solo los archivos usados y sus licencias se distribuyen con el juego. Los ZIP originales están archivados localmente en assets/originals/, ignorados por Git y excluidos del build y los paquetes de entrega.

## Aidan — Evil Wizard 2

Autor: LuizMelo. [Página original](https://luizmelo.itch.io/evil-wizard-2). Licencia **CC0**, indicada en la página y en License.txt del ZIP. Descarga gratuita ofrecida por el autor sin cuenta ni pago. SHA-256 del ZIP: `438ee456bf4f6fde3cff1bd80a0356174756c46788911703f4ad7096c120029a`.

Los PNG de public/assets/images/characters/aidan/ no tienen modificaciones de píxeles. Escala uniforme 0.9 en juego, 2 en menú; volteo horizontal por código. Cada cuadro mide 250×250; cuerpo físico 30×65 con offset (111,102), separado de la transparencia. El origen vertical visible es 167/250.

| Archivo integrado | Cuadros | Uso |
| --- | --- | --- |
| Idle.png | 8 | Reposo |
| Run.png | 8 | Carrera |
| Jump.png | 2 | Ascenso |
| Fall.png | 2 | Descenso |
| Attack1.png | 8 | Ataque cercano aprobado |
| Take hit.png | 3 | Daño |
| Death.png | 7 | Muerte |

Attack2 no se utiliza. El License.txt original acompaña los PNG.

## CraftPix — naturaleza, slimes y ciudad

[Política oficial de licencias](https://craftpix.net/file-licenses/), referenciada también por los archivos originales. Recursos Freebie usados dentro del juego; no se distribuyen como paquetes de arte independientes. Registro local de procedencia en public/assets/licenses/craftpix/License.txt. No se atribuye CC0 a estos recursos.

| Recurso | Fuente aprobada | Procedencia de la descarga |
| --- | --- | --- |
| Naturaleza | [Free Nature Backgrounds Pixel Art](https://craftpix.net/freebies/free-nature-backgrounds-pixel-art/) | ZIP oficial entregado por el usuario: craftpix-net-823949-free-nature-backgrounds-pixel-art.zip |
| Slimes | [Free Slime Mobs Pixel Art Top Down Sprite Pack](https://craftpix.net/freebies/free-slime-mobs-pixel-art-top-down-sprite-pack/) | ZIP oficial entregado por el usuario: craftpix-net-788364-free-slime-mobs-pixel-art-top-down-sprite-pack.zip |
| Ciudad | [Free City Ruin Backgrounds Pixel Art](https://craftpix.net/freebies/free-city-ruin-backgrounds-pixel-art/) | Mismo paquete descargado desde el [canal del editor en itch.io](https://free-game-assets.itch.io/free-city-ruin-backgrounds-pixel-art), sin cuenta ni pago. license.txt remite a CraftPix. |

- Naturaleza: nature_1/{1,2,3,5,6,7,8,10}.png, ocho capas 576×324 copiadas intactas a public/assets/images/backgrounds/nature/. Escala uniforme y parallax por código.
- Slime1: Idle, Walk, Attack, Hurt y Death, cuadros 64×64, cuatro filas direccionales. Se usa la cuarta fila lateral, con volteo horizontal hacia la izquierda. Recuentos por fila 6/8/10/5/10. PNG intactos, renombrados por acción en public/assets/images/enemies/slime/. Escala uniforme 2, cuerpo 18×18 y origen visible y=40/64. Ataque cercano aprobado; no se añaden proyectiles ni variantes elementales.
- Ciudad: background 3/{1,2,3,4,5}.png, cinco capas 576×324 copiadas intactas a public/assets/images/backgrounds/city/. La imagen con ovnis corresponde al lugar descrito en el texto; los ovnis permanecen decorativos. No se usan los otros tres fondos, PSD, cupones ni demos.

## Kenney — efectos

**CC0**, licencias originales en public/assets/audio/licenses/. [Interface Sounds](https://kenney.nl/assets/interface-sounds) e [Impact Sounds](https://kenney.nl/assets/impact-sounds). Cinco efectos integrados: click_001, confirmation_001, back_001, footstep_concrete_000 e impactSoft_medium_000. Los OGG se conservan intactos; sus fallback MP3 se codificaron con ffmpeg. Ver AUDIO_ASSET_CATALOG.md para funciones y duraciones. No hay música integrada ni audio extraído de YouTube.

## Geometría propia y recursos pendientes

Plataformas, portales, marcadores de checkpoint, retículas del laboratorio y objetivos de entrenamiento se dibujan con Phaser Graphics y CSS. Son elementos propios del proyecto, separados del fondo y de su colisión. No representan nuevos personajes ni sustituyen el sprite de Aine.

Aine, enemigos de ciudad y recursos de actos posteriores siguen pendientes. Los enlaces a esqueletos, lugares abandonados y fondo de luna se conservan en la fuente maestra; no se integraron sin el contenido narrativo correspondiente. El Boss Fight continúa bloqueado.
