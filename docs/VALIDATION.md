# Verificación por incrementos

Fecha: 15 de noviembre de 2026. Los apartados se registran cronológicamente; cada incremento posterior actualiza el anterior. Se distingue implementación, prueba y aprobación del diseño.

## Comprobaciones realizadas

- `npm test`: ejecución correcta del archivo de persistencia.
- `node tests/storage.test.js`: cuatro casos aprobados, visibles individualmente: recuperación del checkpoint y silencio; JSON corrupto; valores inválidos/versiones desconocidas; almacenamiento ausente, bloqueado o lleno.
- `npm run build`: compilación de producción correcta con Phaser separado en su chunk.
- `git diff --check`: sin problemas de espacios.
- Servidor local Vite: HTTP 200.
- Copias de las tres fuentes: comparadas por SHA-256 con los archivos recibidos.
- Hoja Idle inspeccionada visualmente; dimensiones de las ocho hojas inspeccionadas en el ZIP. Los cuatro PNG de movimiento conservan los bytes originales.

## Prueba de navegador

| Comprobación | Resultado observado |
| --- | --- |
| Loader y menú | Cargan sin errores de consola en las observaciones realizadas. Sprite animado y texto visibles. |
| Inicio | Cambia a laboratorio, muestra HUD y botones de movimiento, enfoca el escenario. |
| Movimiento con D y flecha derecha | Posición observada pasando de x=130 a x=502 y luego a x=616. |
| Suelo y colisión | Cuerpo apoyado en y=470 con contacto de suelo activo. |
| Salto sobre primer hueco | Desde x≈616, D+Espacio llevó al personaje a x≈832 y aterrizó en la segunda superficie. |
| Cámara | Sigue el desplazamiento y muestra la siguiente sección. |
| Pausa | Abre diálogo de pausa y oculta controles; volver al menú funciona. |
| Vista de 390 × 844 | Inspección DOM: ancho del documento y scrollWidth iguales a 390, sin desbordamiento horizontal; botón inicial de 165 × 36 dentro de la escena. La captura con viewport forzado falló, por lo que la revisión visual móvil queda pendiente. |
| Captura escritorio | Guardada localmente en `docs/qa/menu.jpg`; no es una captura de entrega académica. |

## Rendimiento y límites de verificación

WebGL mostró tasas muy bajas en la vista previa automatizada. Con Canvas se observaron lecturas iniciales entre 56 y 76 FPS durante movimiento y salto, pero también caídas posteriores a 1–13 FPS entre interacciones de la vista previa. Estas lecturas no son un benchmark estable ni acreditan el mínimo académico de 45 FPS. El renderizador del incremento quedó en Canvas porque no necesita shaders; medir de nuevo en los dispositivos de entrega.

El modo `/?debug` solo está disponible en desarrollo y actualiza su medidor una vez por segundo, sin anuncios accesibles continuos. Permite inspeccionar FPS, posición y suelo sin abrir variables internas de Phaser.

**Pendiente de prueba manual completa:** recorrido hasta checkpoint y llegada, caída y reintento repetidos, persistencia integrada tras recargar el navegador, Escape para reanudar, botón de silencio tras recarga y multitouch real de caminar más saltar. La persistencia sí tiene pruebas automatizadas aisladas; eso no sustituye verificar todo el flujo del juego en un navegador.

No se probaron sistemas que todavía no existen: combate, IA integrada, música, puntuación o niveles narrativos. El Boss Fight continúa bloqueado.

## Segundo incremento — entrenamiento, lectura y audio

Comprobado en navegador: prólogo avanza a 5/28 y vuelve a ese mismo párrafo tras recargar; menú de lectura y retorno funcionan. Entrenamiento: derrota por vida a cero, reintento con 3/3, eliminación del primer y segundo objetivo con vida 3/3, salto del obstáculo y pantalla de entrenamiento completado al eliminar el tercero. Pausa/reanudación no reinicia la prueba. No se observaron errores de consola en ese recorrido.

Se añaden ocho casos automatizados de combate (ventanas, cooldown, interrupción, invulnerabilidad compartida, muerte terminal, detección, orientación y paredes), tres de recursos (hojas, formatos de sonido, origen del prólogo), un quinto caso de persistencia de lectura y tres de audio (mute, autoplay y limpieza). `scripts/extract-story.py --check` comprueba los 28 párrafos completos contra el Word, sin reescribirlo. La evaluación auditiva, multitouch físico y mediciones sostenidas de FPS siguen pendientes.

## Tercer incremento — primer nivel real

Verificado en navegador: introducción de 34 párrafos fuente, entrada al bosque con sprites reales, ruta completa sin atacar, checkpoint 1/2 y 2/2 con vida 3/3 y contador cero, recuperación del segundo checkpoint tras recarga, salto final con daño y llegada al portal con cero bajas. Un intento fallido al final permitió verificar caída y reintento desde el checkpoint.

Ruta de combate: repetir nivel limpia el contador; ataque cercano derrota el primer slime y registra una sola baja con vida 3/3. Recargar conserva esa baja y el silencio activado, sin reaparecer el enemigo ya derrotado. No se observaron errores de consola en las comprobaciones.

Se corrigieron dos plataformas que excedían la altura máxima del salto aprobado y se añadió una prueba de geometría. Cuatro pruebas nuevas verifican progreso sin bajas, IDs de bajas únicos, reinicio y checkpoints válidos; otra verifica las dimensiones reales de las hojas de slime y capas de naturaleza. La extracción del texto compara los 34 párrafos adicionales con el Word. Durante tramos medidos se observaron 58–59 FPS en la vista previa; todavía no se certifican 45 FPS sostenidos en equipos físicos.

## Cuarto incremento — ciudad y continuidad completa disponible

Verificado en navegador: primer portal → lectura de fogata (incluido el nombre corregido en 15/57) → ciudad, recorrido completo del nivel 2, ambos checkpoints con vida 3/3, pausa/reanudación y portal. La continuación muestra los 54 párrafos de recuerdos y transición al limbo; avanzar al último y continuar muestra «Fin de esta versión». No se inventó contenido de los actos sin escribir. No se observaron errores de consola en este recorrido.

La extracción contrasta 173 párrafos con el Word: 28+34+57+54. La única diferencia autorizada es Airan → Aidan en el párrafo fuente 118; se verifica en los metadatos y se conserva la fuente intacta. Las pruebas adicionales cubren progreso independiente de cada nivel, geometría del salto en ciudad, ausencia de enemigos inventados, dimensiones de las cinco capas y validación de los nuevos campos de guardado.

Estado automatizado final comprobado: 28 casos en cinco archivos (recursos 5, audio 3, combate 8, progreso 6 y persistencia 6), más la comparación completa de narrativa. npm test y la ejecución directa de los cinco archivos terminaron sin fallos. Las lecturas de vista previa de 59–74 FPS no certifican rendimiento físico sostenido.

### Revisión final y capturas

Se guardaron cuatro capturas reales de la versión 0.4, sin diagnóstico superpuesto: menú, introducción, bosque y ciudad. HUD legible sobre ambos fondos; pausa y retorno al menú comprobados. La consola no registró errores ni advertencias en esa revisión. El intento de forzar el viewport móvil en esta sesión no cambió las dimensiones efectivas de la página, por lo que no constituye una nueva validación móvil. Se mantiene pendiente la prueba física.

Compilación de producción y ZIP web/fuente 0.4.0 verificados, incluida integridad ZIP y exclusión de credenciales, Git, node_modules y ZIP originales. Las capturas se entregan por separado; el video no se ha grabado.
