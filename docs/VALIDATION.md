# Verificación del primer incremento

Fecha: 15 de noviembre de 2026. Se distingue implementación de prueba y de aprobación del diseño.

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
