# Guion para una demo de 60 a 90 segundos

La grabación debe mostrar esta versión de desarrollo, sin presentarla como la historia completa. Usa la captura de pantalla de tu sistema para incluir canvas, HUD, menús y sonido del navegador. El modo `?debug` es para pruebas; omítelo en el video de presentación.

| Tiempo orientativo | Qué mostrar |
| --- | --- |
| 0–8 s | Menú, botones, nombre del proyecto y versión. |
| 8–18 s | Introducción narrativa, avanzar texto y usar Ir al nivel. |
| 18–38 s | Bosque: caminar, salto sobre plataformas y un ataque a un slime. Mostrar vida y contador de derrotados. |
| 38–48 s | Checkpoint, pausa, reanudar y silencio. Demostrar que el sonido se puede activar o silenciar. |
| 48–68 s | Ciudad: fondo aprobado, desplazamiento y salto sobre un hueco. |
| 68–80 s | Pantalla de portal y continuación del relato. |
| 80–90 s | Aclarar que actos posteriores, Aine visual y música siguen pendientes. |

Para grabar ambas zonas sin invertir tiempo en terminar todo el recorrido durante la grabación, prepara previamente una partida con el nivel 2 desbloqueado y usa dos tomas reales. No simules gameplay con imágenes estáticas. Guarda el video aparte; todavía no se ha generado una grabación desde este entorno.

## Comprensión que debe poder explicar el estudiante

1. Qué hace cada escena y cómo la pausa detiene física, animaciones y temporizadores.
2. Cómo se separan cuadro de sprite, hitbox corporal y hitbox de ataque.
3. Qué estados usa el enemigo y por qué respeta suelo, paredes y bordes.
4. Cómo la ventana activa y la invulnerabilidad evitan daño por cada frame o daño duplicado.
5. Qué datos guarda localStorage y qué ocurre con datos corruptos.
6. Por qué el contador de bajas no modifica puntaje ni diálogos.
7. Qué recursos son CC0, cuáles usan la política Freebie de CraftPix y qué música sigue sin permiso.

La autoevaluación final debe completarla el estudiante con sus propias explicaciones y mediciones. `PROJECT_STATUS.md` y `VALIDATION.md` proporcionan evidencia técnica, no una declaración de comprensión en su nombre.
