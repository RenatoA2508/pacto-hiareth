# Catálogo de audio

## Estado actual

Se integraron cinco efectos CC0 de Kenney. No hay música integrada; no se extrajo audio de YouTube ni se sustituyeron las referencias del equipo. El silencio afecta a Phaser y se conserva entre sesiones.

## Efectos integrados

Descargados el 15 de noviembre de 2026 desde las páginas oficiales. Licencia CC0 verificada en las páginas y en los `License.txt` de ambos ZIP. Autor: Kenney. Atribución no obligatoria; se incluye en la aplicación. Originales ZIP fuera del build y de Git, en `assets/originals/audio/`. Archivos usados en `public/assets/audio/sfx/`; OGG sin modificar y fallback MP3 convertido con ffmpeg.

| Archivo OGG (también existe .mp3) | Evento | Duración original | Paquete |
| --- | --- | --- | --- |
| click_001.ogg | Selección de menú, cambio de párrafo | 0.100 s | Interface Sounds |
| confirmation_001.ogg | Activar checkpoint | 0.290 s | Interface Sounds |
| back_001.ogg | Pausar | 0.064 s | Interface Sounds |
| footstep_concrete_000.ogg | Pasos del laboratorio/entrenamiento | 0.106 s | Impact Sounds |
| impactSoft_medium_000.ogg | Aterrizaje y golpes de entrenamiento | 0.118 s | Impact Sounds |

Fuentes: https://kenney.nl/assets/interface-sounds y https://kenney.nl/assets/impact-sounds . Licencias conservadas en `public/assets/audio/licenses/{interface,impact}/License.txt`. Carga y eventos comprobados sin errores de consola; la valoración auditiva y el volumen en dispositivos físicos quedan para la revisión del equipo. El loader admite OGG o MP3 y permite continuar si falla únicamente el audio.

## Referencias conservadas

| Uso | Referencia original | Archivo local | Licencia | Estado |
| --- | --- | --- | --- | --- |
| Nivel 1 | https://www.youtube.com/watch?v=NctOi44IjcA&list=RDNctOi44IjcA&start_radio=1 | Ninguno | Sin permiso verificado | Referencia asignada; integración pendiente |
| Nivel 2 | https://www.youtube.com/watch?v=QpSZL7FVod0&list=RDQpSZL7FVod0&start_radio=1 | Ninguno | Sin permiso verificado | Referencia asignada; integración pendiente |
| Nivel 3 | https://www.youtube.com/watch?v=DVUh7caufKU&list=RDDVUh7caufKU&start_radio=1 | Ninguno | Sin permiso verificado | Referencia asignada; integración pendiente |
| Jefe | https://www.youtube.com/watch?v=AhezYnqDOdU&list=RDAhezYnqDOdU&start_radio=1 | Ninguno | Sin permiso verificado | Referencia conservada; combate bloqueado |

## Efectos adicionales por seleccionar

Buscar un conjunto pequeño y coherente en fuentes como Kenney u OpenGameArt y verificar cada licencia antes de integrar. No se marcan como seleccionados sonidos que solo están propuestos.

| Categoría | Eventos | Archivo, fuente, autor y licencia | Formato y duración | Integración y prueba |
| --- | --- | --- | --- | --- |
| Movimiento | Salto, aterrizaje y pasos | Pendientes | Pendientes | No iniciada |
| Interfaz | Confirmar, pausa y reanudar | Pendientes | Pendientes | No iniciada |
| Magia y daño | Lanzar, impactar, recibir daño y derrota | Pendientes; dependen del combate aprobado | Pendientes | No iniciada |
| Enemigos | Desplazamiento, ataque, daño y muerte | Pendientes; dependen de sprites y ataques aprobados | Pendientes | No iniciada |
| Ambiente e interacción | Bosque, ruinas, viento, portales y objetos | Pendientes; dependen de niveles aprobados | Pendientes | No iniciada |

Al seleccionar cada sonido registrar nombre, ruta local, evento, URL original, autor, licencia, atribución requerida, formato, duración y resultado de prueba. La música necesita archivos con autorización de uso y redistribución.
