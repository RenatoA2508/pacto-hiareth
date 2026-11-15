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
- Los originales de fondos y slimes ya se recibieron; su integración depende de la auditoría y del ataque aprobado para el slime.

## 2026-11-15 — Segundo incremento

**APROBADO para probar y ajustar por el usuario:** ataque cercano de Aidan con J y botón táctil, 3 puntos de vida e invulnerabilidad breve. Balance centralizado en `src/config/combat.js`; los objetivos geométricos del entrenamiento no representan enemigos canónicos. No hay proyectiles ni jefe.

**IMPLEMENTADO:** entrenamiento con tres objetivos, detección/persecución terrestre, contacto, ataque cercano, reacción, muerte, derrota y repetición. El cooldown de daño del jugador evita duplicar daño por contacto y ataque. Las hitboxes solo dañan en su ventana activa y respetan paredes.

**IMPLEMENTADO Y VERIFICADO:** prólogo de 28 párrafos extraídos literalmente del Word, lectura anterior/siguiente y recuperación tras recargar. El hash de la fuente y la extracción se comprueban automáticamente.

**AUDIO:** cinco efectos CC0 de Kenney, originales OGG y copias MP3 para compatibilidad. Sonido de interfaz, confirmación, pausa, pasos y aterrizaje; silencio disponible también en el menú y guardado entre sesiones. La música sigue pendiente.

**PROBADO EN NAVEGADOR:** recorrido completo de entrenamiento con los tres objetivos derrotados, pausa/reanudación, derrota y repetición, y continuidad de la lectura del prólogo. No se considera validado el rendimiento en dispositivos físicos.

**RECURSOS RECIBIDOS:** los ZIP oficiales de naturaleza y slimes se encontraron en Descargas y se archivaron localmente. La inspección confirma cuatro filas direccionales, incluidas izquierda/derecha, en los slimes. Está pendiente confirmar el uso de su animación de ataque de corto alcance para el primer nivel.

## 2026-11-15 — Primer nivel y contador

**APROBADO por el usuario:** usar el ataque cercano de la animación real del slime. Se usa la cuarta fila lateral de Slime1, sin añadir proyectiles ni variantes elementales.

**PREFERENCIA DEL USUARIO:** contador de enemigos derrotados separado del puntaje, para observar si se mató o evitó al enemigo. No se conceden puntos por bajas ni se inventan consecuencias narrativas. El criterio de puntaje académico sigue pendiente.

**IMPLEMENTADO:** primer nivel de 4300 px, ocho capas originales de naturaleza, seis slimes, dos checkpoints y portal. Bajas únicas guardadas por ID del viaje, sin duplicarse al recargar; los enemigos ya derrotados no reaparecen al reintentar. Nuevo viaje limpia el contador.

**PROBADO EN NAVEGADOR:** ruta completa con cero bajas y llegada al portal, checkpoints 1/2 y 2/2, recuperación tras recargar, derrota/reintento, combate que registra una baja sin perder vida y persistencia del contador y silencio. Diagnóstico de la vista previa mostró aproximadamente 58–59 FPS durante tramos del recorrido; falta benchmark físico sostenido.
