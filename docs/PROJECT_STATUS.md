# Estado del proyecto — 1.0.0

La campaña incluye los cinco actos, la elección del Limbo, el rescate o la despedida de Aine, el castillo, el duelo por turnos y dos epílogos. El guion de la continuación figura en la [documentación maestra](source/GAME_MASTER_DOCUMENTATION.md). Los autómatas son defensas de la Antigua Federación. El puntaje recompensa el avance y el récord permanece entre viajes.

Para la entrega académica quedan pendientes el video, la autoevaluación, las pruebas en dispositivos físicos y la música autorizada.

## Registro histórico de la versión 0.4.0

Fecha: 15 de noviembre de 2026. Dos niveles recorribles y todo el texto disponible de los actos 1 y 2 integrados. Esta versión todavía no completa el juego ni todos los entregables académicos.

## Implementado

| Requisito | Estado actual |
| --- | --- |
| Phaser, JavaScript, escenas, loader, módulos y OOP | Phaser 3.90.0 y Vite 6.4.6; entidades, sistemas y gestores separados. |
| Movimiento, salto, colisiones y cámara | Teclado y botones táctiles; controles verificados por el usuario. |
| Menú, pausa, derrota, reintento y portal | Funcionan en ambos niveles; pausa al ocultar o desenfocar la ventana. |
| Nivel 1 | Bosque con ocho capas, seis slimes reales y dos checkpoints. Ruta sin bajas y ruta con combate comprobadas. |
| Nivel 2 | Ciudad con cinco capas, retos de plataformas, dos checkpoints y portal. Recorrido completo comprobado. |
| Combate e IA común | Ataque cercano, 3 HP, invulnerabilidad compartida, estados, detección y bloqueo de golpes por paredes. |
| Contador | Bajas únicas del primer nivel, independiente del puntaje y de la narrativa. |
| Persistencia | Checkpoints, bajas, nivel actual/máximo, resultados, silencio y lectura. Recuperación ante datos corruptos. |
| Narrativa | 173 párrafos contrastados con el Word; solo corrección Airan → Aidan autorizada. |
| Audio | Cinco efectos CC0 de Kenney en OGG/MP3; silencio persistente. |
| Entrega técnica | Build, ZIP de web y fuente, documentación, guion de demo y capturas reales locales. |

El flujo es introducción → bosque → fogata y llegada a la ciudad → ciudad → recuerdos y transición escrita al limbo → Fin de esta versión. Esta última pantalla indica un límite de desarrollo, sin inventar un desenlace. La lectura es tipográfica porque todavía no hay sprite de Aine. Los ovnis del fondo de ciudad son decoración del paquete aprobado.

## Pendientes que requieren contenido o decisiones

| Prioridad | Tema | Falta |
| --- | --- | --- |
| 1 | Actos 3, 4 y final | Texto completo y aprobación del equipo. No completar los huecos con narrativa inventada. |
| 1 | Boss Fight | Sigue bloqueado hasta historia completa y autorización expresa. No se eligió identidad, patrón ni combate. |
| 1 | Aine | Sprite aprobado con licencia. |
| 1 | Enemigos de ciudad | Recursos y comportamiento aprobados. No convertir los ovnis decorativos en enemigos. |
| 2 | Música | Archivos autorizados/licencia de las pistas referenciadas. No se extrajo audio de YouTube. |
| 2 | Puntaje académico | Regla por acordar. Las bajas se cuentan sin puntos; highScore permanece en cero. |
| 2 | Continuidad del relato | La fogata dice literalmente que Aine mató más slimes. El contador de Aidan no modifica el diálogo. Cualquier cambio del texto requiere aprobación. |
| 2 | Pruebas físicas | Multitouch, escucha de audio y FPS sostenidos en los equipos de entrega. La vista previa no certifica rendimiento físico. |
| 2 | Video y autoevaluación | Grabar gameplay real y redactar la comprensión del estudiante; ver DEMO_GUIDE.md. |
| 3 | Edición | Unificar Hiareth/hiraeth y aclarar «Yiyi», «IF» y las funciones de Morrigan/Cernunnos antes de usarlas. |
| 3 | Fecha académica | La guía conserva 26 de mayo de 2026, anterior al trabajo; confirmar la fecha vigente. |

## Fuentes y decisiones

Las tres fuentes de docs/source/ están intactas. El Word narrativo recibido es «el pacto de hiraeth (1).docx» y la guía «ProyectoPrimerBimestre-2026-A.docx». Las grafías originales se conservan; las correcciones autorizadas solo se aplican a la adaptación generada y quedan registradas en sus metadatos.

El usuario aprobó controles, ataque cercano, 3 HP, invulnerabilidad breve y ataque cercano del slime. Pidió contador de enemigos derrotados independiente de puntos y autorizó commits/push. DECISIONS.md registra las decisiones por incremento y VALIDATION.md las observaciones y sus límites.

## Actualización 0.5.0

Selector global Fácil/Media/Hard persistente, aplicado a los dos actos disponibles y reutilizable por los siguientes. Combate y geometría ajustados sin modificar el relato ni las bajas. Ver tabla de balance en README.md. El bosque ahora dibuja seis capas: se omiten las capas planas 8 y 10 que producían la franja verde y se amplía el paisaje uniformemente por código, sin modificar PNG.
