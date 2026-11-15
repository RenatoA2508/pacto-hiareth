# Registro de decisiones

## 2026-11-15 — Validación de movimiento y continuación

**PROBADO por el usuario:** los controles funcionan correctamente. Autoriza continuar con lo implementable, aplazar los bloqueos y hacer commits y push por incrementos. Prioridad de trabajo: terminar hoy lo que permitan los contenidos y recursos disponibles, sin levantar el bloqueo del Boss Fight ni inventar narrativa.

## 2026-11-15 — Nombre del protagonista

**CONFIRMADO por el usuario:** Aidan es el nombre correcto; Airan es un error. La aclaración se registra aquí sin alterar los Word ni la documentación maestra original. Las futuras adaptaciones deberán usar Aidan; todavía no se implementaron diálogos.

## 2026-11-15 — Controles del primer laboratorio

**CONFIRMADO para prueba, no esquema definitivo de combate:** A/D o flechas para caminar, Espacio para salto simple y botones táctiles equivalentes. El usuario aceptó probar este esquema. Escape y botones de interfaz controlan la pausa.

## 2026-11-15 — Alcance del primer incremento

**IMPLEMENTADO como base técnica:** Phaser 3.90.0, JavaScript, Vite 6.4.6, escenas separadas, loader del sprite aprobado, movimiento, plataformas, cámara, checkpoint técnico, pausa, reintento y persistencia. El laboratorio no está conectado a actos, portales ni elecciones narrativas. Sus banderas y formas son marcadores geométricos de QA, no objetos del lore.

**PARÁMETROS DE PRUEBA:** velocidad 245 px/s, impulso vertical 470 px/s, gravedad 1000 px/s², caída máxima 750 px/s. Son ajustables en `src/config/game.js`; no se presentan como balance aprobado. No se fijaron daño, maná, invulnerabilidad ni ataques.

**DECISIONES TÉCNICAS:** Canvas para este incremento de dibujo 2D sin shaders; interfaz DOM para accesibilidad y entrada táctil; guardado versionado con estado del laboratorio separado del progreso narrativo. Los ZIP originales se conservan fuera de `public/` y de Git para no servirlos en la web.

## Restricciones vigentes

- Boss Fight bloqueado hasta aprobación completa de historia y autorización expresa.
- No inventar historia, diálogos, actos, enemigos ni consecuencias de la elección del slime.
- Enemigos comunes: caminar, perseguir, contacto y ataque básico ya están confirmados en §17–18 de la fuente. Falta inspeccionar recursos y aprobar tipos de ataque y balance antes de integrarlos.
- La música tiene referencias asignadas; faltan archivos y permisos.
- Los fondos de CraftPix y slimes siguen pendientes de descarga mediante una sesión autorizada.
