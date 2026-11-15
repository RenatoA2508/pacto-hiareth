# Comprensión y estado del proyecto

## Qué se está construyendo

Un plataformas lateral 2D de fantasía con Phaser.js y JavaScript para Aplicaciones Web. Aidan atraviesa los lugares descritos en la historia del Pacto de Hiareth y conoce a Aine. La narrativa es la fuente de verdad y no se completan sus vacíos con contenido inventado. La prueba actual es infraestructura para desarrollar el juego por incrementos que los estudiantes puedan comprender y defender.

## Fuentes conservadas

Se leyeron el documento maestro, la narrativa y la guía del profesor. Las copias de `docs/source/` conservan el contenido original. Los archivos físicos tienen nombres diferentes de algunas referencias del maestro:

| Referencia abreviada del maestro | Archivo recibido |
| --- | --- |
| El pacto de hiraeth.docx | el pacto de hiraeth (1).docx |
| ProyectoPrimerBimestre-2026-A(1).docx | ProyectoPrimerBimestre-2026-A.docx |

El Word narrativo incluye una nota sobre la intención del antagonista de mostrar otra perspectiva de la muerte. Esto no define de forma suficiente su identidad ni autoriza elegir un jefe o un desenlace.

## Pendientes prioritarios

| Prioridad | Tema | Estado o decisión necesaria |
| --- | --- | --- |
| 1 | Actos 3, 4 y final | Faltan desarrollo, desenlace y aprobación del equipo. |
| 1 | Morrigan y Cernunnos | Falta concretar su papel y vínculo con la misión y la piedra. No asignar combates. |
| 1 | Elección del slime | Definir cómo se mata o esquiva y si hay consecuencias, sin inventar ramificaciones. La fogata escrita dice que Aine mató más slimes: revisar continuidad si se permite evitarlos. |
| 2 | Aine | Falta sprite; no se sustituye por una figura inventada. |
| 2 | Slimes | Paquete Top-Down; falta descargar e inspeccionar antes de confirmar uso lateral. |
| 2 | Enemigos del nivel 2 | Faltan recursos aprobados; no asociar automáticamente el paquete adicional con alienígenas. |
| 2 | Ataque del jugador | Elegir magia cercana, proyectil o ambas tras inspección de Attack1/Attack2. Tener animaciones no aprueba una mecánica de combate. |
| 2 | Enemigos comunes | Comportamiento común confirmado; tipos de ataque, daño, cadencia, ventanas activas y relación entre contacto/ataque por aprobar. |
| 2 | Vida, puntaje, checkpoints de niveles y victoria | Definir reglas coherentes con historia y rúbrica. La prueba solo guarda un checkpoint de laboratorio. |
| 3 | Música y efectos | Entregar música autorizada; investigar efectos con licencias verificables. |
| 3 | Fecha académica | La guía indica 26 de mayo de 2026, anterior a este trabajo. Confirmar fecha vigente; no corregir la fuente. |
| 3 | «Yiyi» e «IF» | El maestro conserva menciones ambiguas; aclarar antes de utilizarlas. |

Resueltos en esta sesión: nombre **Aidan** y esquema provisional de caminar/saltar. El título Hiareth/hiraeth tiene grafías distintas entre fuentes y repositorio; se mantiene el título de trabajo del maestro mientras el equipo decide una unificación editorial.

## Plan por incrementos

1. **Base técnica actual:** instalar Phaser/Vite, conservar fuentes, auditar sprite de Aidan y preparar laboratorio de movimiento con menú, pausa y guardado. Revisión de sensaciones de movimiento con el equipo.
2. **Recursos y combate:** obtener paquetes autorizados, inspeccionar slimes y esqueletos; definir combate, vida y daño. Implementar FSM de enemigos comunes y probar contacto/ataque sin daño duplicado una vez aprobados sus detalles.
3. **Primer nivel:** definir tiles/plataformas y recorrido, integrar fondos, Aine, diálogo literal y elección del slime; acordar checkpoint, puntaje y fin del nivel.
4. **Segundo nivel:** integrar únicamente recursos y contenido aprobados. No inventar enemigos alienígenas.
5. **Tercer nivel y cierre:** esperar escritura y aprobación. El jefe requiere desbloqueo explícito adicional.
6. **Audio y entrega:** música autorizada, al menos dos efectos con licencias, pruebas en móvil y escritorio con objetivo de 45 FPS, capturas, video, ZIP y autoevaluación.

## Matriz académica actual

| Requisito | Estado |
| --- | --- |
| Phaser, JS, escenas, loader, módulos y OOP | IMPLEMENTADO en la base. |
| Movimiento, salto, colisiones y scroll | IMPLEMENTADO en laboratorio; no equivale a nivel final aprobado. |
| Menú, pausa, derrota y reinicio | IMPLEMENTADO para la prueba técnica. |
| Checkpoints | IMPLEMENTADO un checkpoint del laboratorio. |
| HUD y controles de teclado/táctiles | IMPLEMENTADO; falta validación en dispositivos físicos. |
| Persistencia | IMPLEMENTADO checkpoint y silencio; highScore y levelReached preparados sin reglas finales. |
| Enemigos, combate y puntaje | PENDIENTE. |
| Victoria narrativa y juego completo | PENDIENTE. La llegada del laboratorio no cuenta como final del juego. |
| Música y dos efectos | PENDIENTE. Solo preferencia de silencio preparada. |
| Mínimo 45 FPS | PENDIENTE de medición representativa. |
| Documentación y fuentes | IMPLEMENTADO para este incremento; entrega académica aún pendiente. |
| Boss Fight | BLOQUEADO. |
