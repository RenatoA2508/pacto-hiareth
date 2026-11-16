# GAME MASTER DOCUMENTATION

## Proyecto de videojuego web 2D --- *El pacto de Hiareth*

> **Actualización.** La [sección 20](#20-guion-de-continuación) contiene el guion vigente de los actos 3, 4 y final y define el duelo con el dragón. Las referencias anteriores a actos pendientes y a un jefe sin definir o bloqueado describen el estado previo del proyecto.

> **Documento de transferencia para un agente de desarrollo (Codex,
> Claude u otro).**
>
> Este archivo reúne la información narrativa, académica, visual,
> audiovisual y técnica disponible hasta el 15 de noviembre de 2026. Su
> objetivo es permitir que otro agente comprenda el proyecto,
> identifique qué está confirmado, qué está pendiente y qué tiene
> estrictamente prohibido implementar por ahora.
>
> **Prioridad máxima: preservar la historia.** La narrativa existente es
> la fuente de verdad. No reescribirla, resumirla de forma que cambie su
> sentido, completar huecos con invenciones ni alterar personajes,
> acontecimientos o diálogos sin autorización expresa del equipo.

------------------------------------------------------------------------

# 0. INSTRUCCIONES CRÍTICAS PARA EL AGENTE

## 0.1 Reglas no negociables

1.  **No modificar la historia canónica.** Los acontecimientos,
    relaciones, motivaciones, diálogos y conceptos narrativos
    registrados aquí deben conservarse.
2.  **No inventar contenido narrativo.** No crear personajes, jefes,
    escenas, diálogos, explicaciones del lore, finales, poderes o
    motivaciones para llenar vacíos.
3.  **No confundir propuestas con decisiones.** Todo elemento marcado
    `PENDIENTE`, `POR DEFINIR`, `PROPUESTA` o `NO VERIFICADO` requiere
    confirmación antes de tratarse como definitivo.
4.  **No adelantar el Boss Fight.** La batalla de jefe tendrá
    inspiración de *Touhou Project* / bullet hell, pero su
    implementación está bloqueada hasta que la historia completa esté
    escrita y aprobada. No programar esta parte, no crear patrones de
    proyectiles, fases, ataques ni comportamiento de jefe todavía.
5.  **No sustituir recursos aprobados sin permiso.** Los enlaces de
    sprites, fondos y música proporcionados por el equipo deben
    conservarse como referencias. Si un recurso no es técnicamente
    compatible, informar del problema y proponer alternativas; no
    reemplazarlo unilateralmente.
6.  **No asumir que un enlace equivale a un archivo descargado.**
    Registrar por separado el enlace, el archivo local, su licencia, su
    formato y su estado de integración.
7.  **No asumir licencias.** Verificar las condiciones de uso de cada
    asset y cada pista musical antes de distribuir el juego. Un enlace
    de YouTube es una referencia musical, no una autorización para
    extraer, reproducir o redistribuir la pista.
8.  **No inventar funcionalidades para cumplir la rúbrica.** Diseñar las
    mecánicas necesarias de forma coherente con el plataformas 2D y con
    la narrativa, pero señalar las decisiones que requieren aprobación.
9.  **El proyecto debe ser comprensible y defendible por sus
    estudiantes.** El profesor prohíbe entregar un proyecto generado
    íntegramente por IA sin comprensión técnica. El agente debe explicar
    decisiones, mantener código legible, modular y documentado, y no
    ocultar complejidad.
10. **No declarar terminado lo que solo está descrito.** Diferenciar
    claramente `IDEA`, `DISEÑO`, `IMPLEMENTADO`, `PROBADO` y `APROBADO`.

## 0.2 Protocolo de trabajo

Antes de implementar una parte importante: - Revisar este documento y
los documentos fuente. - Identificar requisitos académicos aplicables. -
Identificar qué elementos narrativos intervienen. - Enumerar decisiones
pendientes. - Si una decisión puede cambiar la historia o una mecánica
importante, preguntar al equipo. - Implementar en incrementos pequeños y
probarlos. - Actualizar este documento o un registro de decisiones
cuando el equipo apruebe cambios.

## 0.3 Etiquetas de estado

-   `CANÓNICO`: aparece en el documento narrativo entregado por el
    equipo.
-   `CONFIRMADO`: decisión comunicada explícitamente por el equipo.
-   `REQUISITO DEL PROFESOR`: obligación del documento académico.
-   `PENDIENTE`: falta información o aprobación.
-   `PROPUESTA TÉCNICA`: posible solución, no aprobada todavía.
-   `NO VERIFICADO`: existe un enlace o afirmación, pero no se ha
    comprobado el archivo, licencia o compatibilidad.
-   `BLOQUEADO`: no implementar hasta recibir autorización expresa.

------------------------------------------------------------------------

# 1. IDENTIDAD Y VISIÓN DEL PROYECTO

## 1.1 Identidad

-   **Título de trabajo:** *El pacto de Hiareth*.
-   **Asignatura:** Aplicaciones Web.
-   **Proyecto:** Proyecto final de primer bimestre --- Desarrollo de
    videojuegos con Phaser.js.
-   **Género confirmado:** plataformas 2D.
-   **Tecnología central obligatoria:** Phaser.js + JavaScript.
-   **Formato:** videojuego ejecutado como aplicación web.
-   **Protagonista:** Aidan, un mago especializado en fuego.
-   **Personaje acompañante principal:** Aine, una elfa.
-   **Tono narrativo:** fantasía, pérdida, duelo, venganza, muerte,
    naturaleza, aceptación y propósito.
-   **Estado:** narrativa parcialmente escrita; diseño jugable y
    desarrollo técnico pendientes de completar.

## 1.2 Premisa narrativa resumida

Aidan, un mago de fuego que perdió a su esposa y a sus dos hijos durante
una guerra, se integra al Pacto de Hiareth y acepta una misión que exige
atravesar tres portales y encontrar fragmentos de la piedra Lia Fáil.
Durante el primer viaje conoce a Aine, una elfa que acaba de perder a su
padre y a su hermana por un ataque relacionado con la guerra entre elfos
y slimes. Ambos comparten experiencias de pérdida, pero entienden la
muerte de maneras diferentes. Aine considera que sus seres queridos
siguen formando parte de la naturaleza; Aidan, en cambio, está atrapado
en el dolor y expresa deseos de morir.

**Esta sinopsis es orientativa y no reemplaza el texto narrativo
original.** El documento fuente `El pacto de hiraeth.docx` contiene la
versión extensa y debe considerarse la referencia primaria.

## 1.3 Objetivo del agente

Construir un plataformas 2D en Phaser.js que acompañe y respete la
historia de *El pacto de Hiareth*. El agente debe convertir la narrativa
aprobada en escenas, niveles, diálogos, interacciones y mecánicas sin
modificar el significado de la obra.

------------------------------------------------------------------------

# 2. FUENTES DEL PROYECTO

El agente debe reconocer estos dos documentos como fuentes entregadas
por el equipo:

## 2.1 Fuente narrativa

**Archivo:** `el pacto de hiraeth.docx`\
**Extensión:** 16 páginas.\
**Contenido:** personajes, trasfondo, prólogo, actos, escenas y
fragmentos de diálogo.

Es la fuente principal para: - personajes; - relaciones; - historia
familiar de Aidan; - historia de Aine; - Pacto de Hiareth; - piedra Lia
Fáil; - Guerra de la Vida; - Guerra entre elfos y slimes; - portales; -
Morrigan y Cernunnos; - diálogos y escenas narrativas.

## 2.2 Fuente académica

**Archivo:** `ProyectoPrimerBimestre-2026-A(1).docx`\
**Extensión:** 7 páginas.\
**Título:** Proyecto Final de Primer Bimestre --- Desarrollo de
Videojuegos con Phaser.js.\
**Autor indicado:** Jaime Sayago-Heredia, docente de Aplicaciones Web,
Escuela Politécnica Nacional (EPN).

Esta fuente define las obligaciones académicas, requisitos técnicos,
rúbrica, restricciones y entregables. Si una decisión de implementación
contradice el documento del profesor, debe informarse al equipo.

------------------------------------------------------------------------

# 3. HISTORIA Y LORE --- FUENTE DE VERDAD

> **Advertencia:** esta sección organiza el contenido del documento
> narrativo. No es permiso para inventar transiciones ni completar los
> actos sin escribirlos y aprobarlos con el equipo.

## 3.1 Personajes principales

### Aidan --- protagonista

-   Es un mago especializado en hechizos de fuego.
-   Antes de dedicarse plenamente a la magia y a la venganza, era
    cocinero/panadero.
-   Trabajaba para mantener a su familia.
-   Perdió a su esposa y a sus dos hijos durante la llamada **Guerra de
    la Vida**.
-   La aldea donde vivía fue devastada por magos de fuego relacionados
    con esa guerra.
-   Después de perder a su familia, buscó al responsable y planeó su
    venganza durante años.
-   Finalmente asesinó al antiguo mago de fuego que pertenecía al Pacto
    de Hiareth.
-   Posteriormente colabora con el Pacto y busca completar la misión de
    los tres portales y la piedra Lia Fáil.
-   En el texto expresa que no le importa morir y que desea terminar con
    su sufrimiento.
-   Su experiencia y su forma de entender la muerte contrastan con la
    perspectiva de Aine.

**Discrepancia que requiere confirmación:** el documento lo identifica
como `Aidan`, pero en la conversación con Aine, durante la escena de la
fogata, él dice llamarse `Airan`. No corregir automáticamente. Preguntar
al equipo cuál es la forma canónica y si "Airan" es un error tipográfico
o un alias deliberado.

### Aine --- elfa / interés romántico

-   Es una elfa.
-   El documento indica que su nombre significa "brillo" o "resplandor".
-   Está profundamente apegada a la naturaleza.
-   Considera que sus familiares, después de morir, vuelven a formar
    parte de la naturaleza: sus cuerpos se descomponen y se transforman
    en parte de ella.
-   Su padre y su hermana murieron durante el ataque a su aldea.
-   La aldea fue atacada en el contexto de la guerra entre elfos y
    slimes.
-   Aine era perfumista.
-   En el primer encuentro con Aidan está herida y sostiene los cuerpos
    calcinados de sus familiares.
-   Decide acompañar a Aidan para buscar venganza.
-   Su perspectiva de la muerte y del duelo es distinta a la de Aidan.
-   Busca ayudarlo y evitar que se destruya a sí mismo.

**Estado:** Aine está identificada en el documento narrativo como
interés romántico, pero el desarrollo completo de la relación y su
desenlace no están escritos.

## 3.2 Familia de Aidan

-   **Blair:** esposa de Aidan. El documento asocia su nombre con
    "llanura".
-   **Callum:** hijo de Aidan y Blair. El documento asocia su nombre con
    "paloma". Le gustaban los robots y soñaba con ser aviador o
    ingeniero.
-   **Ciara:** hija de Aidan y Blair. El documento asocia su nombre con
    oscuridad/negro. Padecía una enfermedad; Aidan trabajaba día y noche
    como panadero para cuidarla.

Los tres murieron durante la Guerra de la Vida. Aidan recuerda
especialmente: - su boda con Blair en un campo de trigo; - la sonrisa de
Blair antes de dormir; - la primera palabra de Callum; - el juguete
robot que regaló a Callum; - el arrepentimiento de no haber llevado a
Callum a la panadería la mañana de la tragedia; - no haber podido
proteger a sus hijos.

Estos recuerdos aparecen vinculados a escenas y diálogos concretos del
segundo acto. No reducirlos a datos genéricos ni eliminarlos.

## 3.3 Personajes y fuerzas adicionales

### Morrigan

-   Figura descrita como diosa triple.
-   Se representa mediante un cuervo y una mujer.
-   Está asociada con la muerte.

### Cernunnos

-   Dios del ciclo vital de la vida y la muerte, así como de la
    naturaleza.
-   Se representa como un ciervo con cuernos.

**PENDIENTE:** el documento los menciona como antagonistas/figuras
antagonistas, pero no desarrolla sus acciones, motivaciones, relación
entre ambos ni participación exacta en el desenlace. No asignarles
escenas o combates todavía.

## 3.4 Pacto de Hiareth

El documento lo describe como un pacto de magos que persiguen la
excelencia a través del sacrificio extremo.

-   Sus miembros son reconocidos después de superar una prueba de gran
    dificultad.
-   La prueba exige atravesar tres portales que conducen a lugares
    recónditos del planeta.
-   Deben encontrar un fragmento de la piedra Lia Fáil.
-   Cada miembro del Pacto posee una parte de la piedra.
-   Su objetivo es superar los límites conocidos, sin importar la
    moralidad, en busca de reconocimiento.
-   Para el Pacto, un mago anónimo es considerado un mago inservible.
-   Su lema/ideal citado es: **"Arriba de la tierra, el mar y el
    cielo".**
-   El líder afirma que los pactantes han tenido el corazón de un dios a
    sus pies y han logrado deshacerse del suyo.

El líder del Pacto no tiene nombre definido en el material recibido. No
inventarle uno.

## 3.5 Conflicto de los slimes y los elfos

-   La reina slime murió por culpa de un elfo.
-   Tras la muerte de la reina, el rey slime declaró la guerra a los
    elfos.
-   La aldea de Aine fue devastada.
-   Durante el ataque murieron el padre y la hermana de Aine.
-   Los comandantes y soldados slimes se vieron superados después de
    matar a la familia de Aine.
-   Para sobrevivir, obligaron a los slimes más pequeños a quedarse
    atrás como carnada.
-   El texto contempla una decisión del protagonista: disparar o no
    disparar / matar o esquivar los ataques del slime.

**PENDIENTE:** no está definido cómo se traduce esta decisión en reglas
de juego, consecuencias, ramificaciones o sistema moral. No inventar
consecuencias narrativas.

## 3.6 Otros enemigos / trasfondos

### OVNIs / extraterrestres

El documento contiene una idea incompleta: - El hijo de un alienígena
viajó al planeta. - Conoció a la raza humana. - Los humanos eran la
civilización tecnológicamente más avanzada del planeta.

**Estado:** historia por continuar. No crear una explicación adicional.

### Esqueletos

El documento los define como **"almas del limbo"**.

No se ha definido todavía su comportamiento, jerarquía, historia
individual ni relación con los dioses.

------------------------------------------------------------------------

# 4. CRONOLOGÍA NARRATIVA DISPONIBLE

## 4.1 Prólogo / Introducción --- misión del Pacto

**Fuente narrativa:** páginas 3--6.

La escena comienza con una conversación entre Aidan y el líder del Pacto
de Hiareth.

-   El líder le pregunta por tercera vez si está seguro.
-   Aidan confirma que entiende la misión: atravesar los tres portales
    en el menor tiempo posible y hallar la piedra Lia Fáil.
-   El líder cuestiona su indiferencia ante la posibilidad de morir.
-   El líder comenta que no entiende por qué Aidan quiso convertirse en
    mago de fuego del Pacto.
-   Revela que conocía al antiguo miembro que Aidan mató.
-   Reconoce que Aidan lo mató sin tener el fragmento de la piedra.
-   El líder desprecia a los magos anónimos y a profesiones como
    médicos, herreros y labradores de piedra.
-   Aidan responde con hostilidad.
-   Aidan afirma que completará la misión y luego desaparecerá.
-   El líder explica que los miembros del Pacto han tenido el corazón de
    un dios a sus pies y se han deshecho del suyo.
-   Aidan exige que abra el portal.
-   El líder dibuja un círculo con tres sigilos en la pared, mientras su
    séquito le proporciona maná.
-   El líder advierte: **"debes matarlos a todos"**.
-   Aidan atraviesa el portal.

La narración describe una sensación de compresión corporal y un viaje
extrañamente parecido a la muerte.

## 4.2 Acto 1 --- "Tierra, mar y cielo"

**Fuente narrativa:** páginas 4--10.

### Llegada al primer lugar

-   Aidan aparece en un llano de trigo.
-   Detrás de él, el portal se cierra.
-   A lo lejos ve un bosque y humo gris que se eleva desde la tierra.
-   Reconoce inmediatamente que es fuego.
-   Corre hacia el lugar.
-   Encuentra una aldea envuelta en llamas.
-   Ve el cuerpo calcinado del antiguo mago de fuego, muerto y tendido
    en el lugar.
-   Escucha el llanto de una mujer.

### Encuentro con Aine

-   Aidan encuentra a una elfa en el suelo, con quemaduras en los
    tobillos.
-   En su regazo están los cuerpos calcinados de dos familiares.
-   El rostro de Aine le recuerda a Blair, su esposa.
-   Aidan decide acercarse y tranquilizarla.
-   Aine intenta explicar que ellos mataron a sus familiares, pero rompe
    en llanto.
-   Aidan utiliza su magia para apagar el fuego que sigue quemando los
    cuerpos.
-   Pregunta quién causó aquello y hacia dónde se fueron.
-   Aine señala el bosque, en dirección al siguiente portal.
-   Aidan se dispone a marcharse.
-   Aine lo detiene y pide acompañarlo para vengarse.
-   Aidan acepta y la ayuda a caminar.
-   Aidan cura/atiende sus heridas con vendas y pociones anestésicas.
-   Encuentran un slime atrapado bajo un pequeño árbol.
-   Aine lo reconoce como uno de los responsables del incendio.
-   Aidan se interpone antes de que ella avance.

### Inicio del nivel 1

El documento indica: - **Inicio del nivel.** - Decisión de matar o
esquivar los ataques del slime.

No están definidas las reglas exactas del combate ni el resultado de la
decisión.

### Fogata y conversación

-   Antes de atravesar el portal, Aine agradece a Aidan.
-   Aidan le dice que no existe razón para agradecerle.
-   Aidan propone descansar y cocinar usando ollas materializadas
    mediante magia.
-   Aidan busca combustible y crea una fogata.
-   Se da cuenta de que no tienen agua.
-   Aine genera una esfera de agua con sus manos y la dirige a la olla.
-   Aidan cocina dos piernas de jabalí.
-   Aine pregunta su nombre. Aidan responde "Airan" en el texto
    original; esta discrepancia debe confirmarse.
-   Aidan pregunta por qué los slimes atacaron su aldea.
-   Aine explica que convivían en paz hasta que un elfo asesinó a la
    reina slime meses atrás. Ambos bandos entraron en guerra, aunque su
    aldea era ajena al conflicto.
-   Aidan pregunta por qué no apagó el fuego con su magia.
-   Aine explica que era un fuego maldito que no podía apagarse con agua
    y que ella no era tan buena como su padre y hermana.
-   Aine pregunta si Aidan es mago de fuego y qué hace allí.
-   Aidan revela que quiere formar parte del Pacto de Hiareth.
-   Aine cree que Aidan busca poder; él lo niega.
-   Aidan se molesta porque Aine parece sonreír pese a la muerte de su
    familia.
-   Después se disculpa.
-   El campo de trigo le recuerda a Aidan su boda con Blair.
-   Aidan cuenta que perdió a su esposa durante una guerra y que planeó
    durante años vengarse del mago de fuego responsable.
-   Cuenta que, pese a haberlo matado, sigue viendo a Blair por las
    noches, suplicando por su vida.
-   Aine lo abraza y reconoce que matar más slimes tampoco la llenó.
-   Aidan se despide y atraviesa el portal.

### Transición al segundo nivel

-   Aidan llega a la antigua federación humana.
-   Escucha estruendos y láseres.
-   Ve objetos circulares suspendidos en el cielo y rayos rojos que
    destruyen edificios.
-   Aine aparece detrás de él: logró atravesar el portal antes de que
    desapareciera.
-   Aine le reclama que la dejara.
-   Le dice que quiere ayudarlo.

## 4.3 Acto 2 --- "Vuela alto"

**Fuente narrativa:** páginas 11--13.

### Ruinas de la antigua federación

-   Aidan y Aine atraviesan un lugar devastado.
-   Encuentran el segundo portal.
-   Descansan en las ruinas de un edificio que parece haber sido una
    escuela.
-   Aine se sienta en un pupitre.
-   Aidan observa dibujos de pequeños robots en el pizarrón.
-   Aidan le dice que no debió seguirlo y que la misión es peligrosa.
-   Aine responde que quería ayudarlo.
-   Aidan pregunta por qué no se quedó para dar un entierro digno a sus
    familiares.
-   Aine explica la visión élfica: los muertos vuelven a formar parte de
    la naturaleza.
-   Recuerda las palabras de su padre: si moría, no debía permitir que
    la tristeza la paralizara; su cuerpo se transformaría en otra cosa y
    seguiría formando parte de la naturaleza.
-   Aine sugiere que quizá Blair también ha acompañado a Aidan todo este
    tiempo.

### Aidan expresa su deseo de morir

-   Aidan pregunta a Aine si tiene miedo de morir.
-   Aine responde que sí.
-   Aidan dice que desea morir.
-   Explica que planea morir durante la misión o hacerlo después de
    alguna manera.
-   Dice que no soporta no poder dormir, ver familias felices ni seguir
    llorando.
-   Aine intenta convencerlo de que Blair habría querido que siguiera
    vivo, igual que el padre y la hermana de Aine habrían querido que
    ella continuara.
-   Aidan cuestiona cómo puede estar segura.
-   Aine le recuerda que él mismo dice que ella se parece a Blair.
-   Aidan recuerda a su hijo Callum al observar el dibujo del robot.
-   Recuerda que Callum quería ser aviador o ingeniero y que le había
    regalado un robot de juguete.
-   Aidan expresa culpa por no haber protegido a sus hijos.
-   Pregunta si un padre que no pudo protegerlos merece otra
    oportunidad.
-   Aine responde que sí.
-   Aidan no está de acuerdo y decide continuar.

### Separación fallida

-   Aidan utiliza un hechizo para atar a Aine al pupitre.
-   También la cubre con un hechizo de protección.
-   Le dice que el siguiente portal es uno de los más difíciles y que
    ella todavía tiene una vida por vivir.
-   Aidan atraviesa el portal.
-   Aine utiliza la presión de su agua para impulsarse hacia el portal,
    todavía atada a la silla.
-   Atraviesa y derriba a Aidan.
-   Le reclama que no la dejara sola.
-   Aidan deshace el hechizo de amarre, pero mantiene la protección.
-   Aine le dice que quiere salvarlo, incluso si él no quiere salvarse.
-   Lo golpea y luego rompe en llanto y lo abraza.
-   Alguien rompe el escudo protector de Aine.
-   Aidan la abraza y descubre que están rodeados por varios esqueletos.
-   El documento indica el inicio del siguiente nivel.

## 4.4 Acto 3 --- "Limbo (Enfermedad)"

**Fuente narrativa:** página 14.

El documento contiene el título, pero no desarrolla el acto. Solo se
conoce el comienzo de la escena anterior: - Aidan y Aine llegan a un
lugar oscuro. - Hay árboles que se levantan como garras de lobo. - Se
escuchan gritos. - Aidan y Aine son rodeados por esqueletos, descritos
en el lore como almas del limbo.

**ESTADO: PENDIENTE. No completar ni inventar.**

## 4.5 Acto 4 (IF) --- "DON'T TRY..."

**Fuente narrativa:** página 15.

Solo aparece el título.

**ESTADO: PENDIENTE. No completar ni inventar.**

## 4.6 Acto final --- "HIARETH"

**Fuente narrativa:** página 16.

Solo aparece el título.

**ESTADO: PENDIENTE. No completar ni inventar.**

------------------------------------------------------------------------

# 5. ESTRUCTURA DE NIVELES Y RECURSOS VISUALES

La asignación siguiente registra la organización comunicada por el
equipo. No implica que los archivos estén descargados, integrados o
probados.

## 5.1 Nivel 1 --- naturaleza / aldea / slimes

**Contexto narrativo:** aldea de Aine devastada, bosque, encuentro con
el slime y viaje hacia el siguiente portal.

### Fondo

-   Nombre/referencia: Free Nature Backgrounds --- Pixel Art.
-   URL:
    https://craftpix.net/freebies/free-nature-backgrounds-pixel-art/
-   Uso asignado: fondo del primer nivel.
-   Estado: `ENLACE PROPORCIONADO`; descarga e integración no
    confirmadas.

### Enemigos

-   Nombre/referencia: Free Slime Mobs Pixel Art Top Down Sprite Pack.
-   URL:
    https://craftpix.net/freebies/free-slime-mobs-pixel-art-top-down-sprite-pack/
-   Uso asignado: slimes del primer nivel.
-   Estado: `ENLACE PROPORCIONADO`; compatibilidad pendiente.

**Advertencia de compatibilidad:** el nombre del paquete indica
perspectiva `Top Down`, mientras que el juego es un plataformas lateral
2D. Antes de integrarlo, inspeccionar los sprites y verificar
orientación, escala, animaciones y perspectiva. No asumir que encaja
automáticamente. Informar al equipo si requiere adaptación o
sustitución.

## 5.2 Nivel 2 --- antigua federación / ciudad en ruinas

### Fondo

-   Nombre/referencia: Free City Ruin Backgrounds --- Pixel Art.
-   URL:
    https://craftpix.net/freebies/free-city-ruin-backgrounds-pixel-art/
-   Uso asignado: fondo del segundo nivel.
-   Estado: `ENLACE PROPORCIONADO`; descarga e integración no
    confirmadas.

### Enemigos

-   El trasfondo narrativo menciona OVNIs/alienígenas y tecnología
    humana avanzada.
-   No existe todavía un paquete de sprites de enemigos confirmado para
    este nivel.
-   No inventar el diseño ni el comportamiento de los enemigos.

## 5.3 Nivel 3 --- limbo / lugares abandonados / esqueletos

### Fondo

-   Nombre/referencia: Free Pixel Art Abandoned Places Background
    Collection.
-   URL:
    https://craftpix.net/freebies/free-pixel-art-abandoned-places-background-collection/
-   Uso asignado: fondo del tercer nivel.
-   Estado: `ENLACE PROPORCIONADO`; descarga e integración no
    confirmadas.

### Enemigos

-   Nombre/referencia: Free Skeleton Pixel Art Sprite Sheets.
-   URL:
    https://craftpix.net/freebies/free-skeleton-pixel-art-sprite-sheets/
-   Uso asignado: esqueletos del tercer nivel.
-   Estado: `ENLACE PROPORCIONADO`; descarga, licencia e integración no
    confirmadas.

## 5.4 Boss Fight --- escenario lunar

### Fondo

-   Nombre/referencia: Free Moon Pixel Game Backgrounds.
-   URL: https://craftpix.net/freebies/free-moon-pixel-game-backgrounds/
-   Uso asignado: ambientación de Boss Fight.
-   Estado: `ENLACE PROPORCIONADO`; descarga e integración no
    confirmadas.

### Estilo de combate

-   Referencia de estilo: `Touhou Project` / `bullet hell`.
-   Concepto confirmado por el equipo.
-   Implementación: `BLOQUEADA`.
-   No implementar hasta que la historia esté completa y aprobada.
-   No decidir todavía quién es el jefe, sus ataques, fases, patrones,
    arena, condiciones de victoria o consecuencias narrativas.

## 5.5 Paquete adicional de enemigos

-   Nombre/referencia: 3 Enemy Character Sprite Set.
-   URL: https://craftpix.net/product/3-enemy-character-sprite-set/
-   Uso: no asignado definitivamente.
-   Estado: `PENDIENTE DE ACLARACIÓN`.
-   No asumir que pertenece a un amigo, que está comprado, descargado o
    que puede usarse libremente.
-   Confirmar autoría, disponibilidad, formato, licencia y estilo visual
    antes de integrarlo.

## 5.6 Protagonista --- Aidan

-   Nombre/referencia: Evil Wizard 2 --- LuizMelo.
-   URL: https://luizmelo.itch.io/evil-wizard-2
-   Uso: sprite del protagonista.
-   Estado: `ENLACE PROPORCIONADO`; descarga e integración no
    confirmadas.
-   Inspeccionar el paquete real para identificar animaciones,
    dimensiones, orientación, velocidad y nombres de archivos.
-   No asumir nombres de archivos ni número de frames hasta inspeccionar
    el recurso descargado.

**Pendiente:** no se ha proporcionado un sprite de Aine.

## 5.7 Reglas generales de arte

-   El juego es un plataformas 2D; priorizar coherencia de perspectiva
    lateral.
-   Mantener escala visual consistente entre Aidan, enemigos,
    plataformas y escenarios.
-   Verificar si los fondos son solo decorativos o incluyen capas
    utilizables.
-   No tratar un fondo panorámico como geometría física. Las
    plataformas, colisiones y límites del nivel deben definirse por
    separado.
-   No estirar sprites para forzar compatibilidad.
-   Mantener los archivos originales intactos y organizar copias de
    trabajo en el proyecto.
-   Registrar atribución y licencia de cada recurso.

------------------------------------------------------------------------

# 6. MÚSICA Y AUDIO

## 6.1 Referencias musicales proporcionadas

El equipo ha asignado las siguientes referencias de YouTube:

  ------------------------------------------------------------------------------------------------------------------
  Uso                                 URL
  ----------------------------------- ------------------------------------------------------------------------------
  Nivel 1                             https://www.youtube.com/watch?v=NctOi44IjcA&list=RDNctOi44IjcA&start_radio=1

  Nivel 2                             https://www.youtube.com/watch?v=QpSZL7FVod0&list=RDQpSZL7FVod0&start_radio=1

  Nivel 3                             https://www.youtube.com/watch?v=DVUh7caufKU&list=RDDVUh7caufKU&start_radio=1

  Boss Fight                          https://www.youtube.com/watch?v=AhezYnqDOdU&list=RDAhezYnqDOdU&start_radio=1
  ------------------------------------------------------------------------------------------------------------------

**Estado:** asignación de pistas por escenario confirmada por el equipo;
archivos de audio todavía no entregados.

**Importante:** - Conservar los enlaces exactamente como referencias. -
No descargar ni extraer audio de YouTube sin autorización. - Solicitar
al equipo archivos de audio autorizados o fuentes con licencia
compatible. - Verificar permiso de uso y redistribución. - Preferir
formatos adecuados para web, por ejemplo OGG y/o MP3, según
compatibilidad y tamaño. - El Boss Fight mantiene su música asignada
como referencia, pero la implementación de esa batalla continúa
bloqueada.

## 6.2 Efectos de sonido --- responsabilidad del agente

El equipo indicó que todavía no tiene efectos de sonido y solicita que
el agente los resuelva.

El agente debe buscar y seleccionar efectos adecuados, preferentemente
gratuitos y con licencias claras para uso en videojuegos. No asumir que
todo recurso de una biblioteca es libre: revisar la licencia individual
o del paquete y registrar la fuente.

Categorías mínimas a cubrir:

  Categoría        Efectos a buscar
  ---------------- -----------------------------------------------
  Movimiento       pasos, salto, aterrizaje
  Magia de Aidan   lanzamiento de hechizo, fuego, impacto mágico
  Daño             recibir golpe, muerte/derrota
  Slimes           movimiento, salto, impacto o daño
  Esqueletos       pasos, movimiento, ataque, impacto y muerte
  Interacción      portal, activación, objetos
  Interfaz         selección, confirmación, pausa, reanudación
  Ambiente         bosque, viento, ruinas y atmósfera

### Fuentes sugeridas para investigar

-   Kenney: https://kenney.nl/assets
-   OpenGameArt: https://opengameart.org/
-   Freesound: https://freesound.org/
-   Pixabay Sound Effects: https://pixabay.com/sound-effects/

Estas son fuentes de búsqueda, no una aprobación automática de todos sus
archivos o licencias.

### Entregable de audio esperado

Crear un inventario `AUDIO_ASSET_CATALOG.md` con: - nombre del efecto; -
archivo local; - categoría; - evento que lo reproduce; - fuente
original; - autor; - licencia; - atribución requerida; - formato; -
duración; - estado de integración y prueba.

No descargar una gran cantidad de sonidos sin selección. Elegir un
conjunto pequeño, coherente y reutilizable.

------------------------------------------------------------------------

# 7. DISEÑO DEL JUEGO Y MECÁNICAS

## 7.1 Confirmado

-   Género: plataformas 2D.
-   Protagonista controlable: Aidan, mago.
-   El personaje cuenta con un sprite de mago proporcionado mediante
    enlace.
-   El juego tendrá niveles relacionados con los actos narrativos.
-   En el primer nivel existe una decisión relacionada con matar o
    esquivar los ataques de un slime.
-   El Boss Fight tendrá inspiración bullet hell / Touhou, pero está
    bloqueado hasta completar la historia.

## 7.2 Todavía no definido

No tratar como decisiones aprobadas: - conjunto definitivo de
movimientos; - velocidad de desplazamiento; - altura y duración del
salto; - doble salto; - ataque básico; - proyectiles de fuego; - magia
secundaria; - consumo de maná; - vida y daño; - invulnerabilidad
temporal; - curación; - inventario; - sistema de puntuación; -
checkpoints; - sistema de decisiones y consecuencias; - comportamiento
de enemigos; - IA de enemigos; - jefes; - condiciones particulares de
victoria y derrota; - controles definitivos.

## 7.3 Inspección de sprites antes de diseñar controles

El equipo indicó que el movimiento debe revisarse a partir de los
sprites. Por tanto:

1.  Descargar/recibir el paquete de Aidan.
2.  Inspeccionar todas las animaciones incluidas.
3.  Identificar qué acciones visuales existen realmente.
4.  Determinar si el sprite permite orientar al personaje a
    izquierda/derecha o si se requiere volteo horizontal.
5.  Identificar animaciones de salto, caída, ataque, daño y muerte si
    existen.
6.  Proponer controles que correspondan a las animaciones disponibles.
7.  Preguntar al equipo antes de cerrar el esquema de combate.

No inventar una animación que no exista ni afirmar que un sprite
contiene una acción sin comprobarlo.

## 7.4 Decisiones narrativas como mecánicas

La decisión frente al slime es una oportunidad de diseño que aparece
explícitamente en la historia. Sin embargo, no se han definido
consecuencias ni sistema moral. El agente puede analizar opciones y
presentarlas al equipo, pero no implementar ramificaciones narrativas
por cuenta propia.

------------------------------------------------------------------------

# 8. BOSS FIGHT --- ESPECIFICACIÓN DE BLOQUEO

## 8.1 Concepto

El equipo confirmó que el Boss Fight será de estilo similar a *Touhou
Project*, es decir, un enfrentamiento centrado en esquivar patrones de
proyectiles (bullet hell).

## 8.2 Estado

`BLOQUEADO HASTA COMPLETAR Y APROBAR LA HISTORIA`.

## 8.3 Prohibiciones durante el bloqueo

No: - crear la escena del jefe; - implementar patrones de proyectiles; -
decidir número de fases; - diseñar ataques; - definir hitboxes del
jefe; - escoger jefe; - asignar identidad a Morrigan o Cernunnos como
jefe; - diseñar una arena definitiva; - decidir el resultado de la
batalla; - conectar el Boss Fight a una cinemática no aprobada.

Se puede conservar la referencia del fondo lunar y de la música. Se
puede preparar una nota técnica de riesgos o una propuesta futura, pero
no implementar el combate.

## 8.4 Condición para desbloquear

Solo cuando el equipo confirme que: 1. la historia está completa; 2. el
jefe y su papel narrativo están definidos; 3. la escena y sus
consecuencias están aprobadas; 4. el equipo autoriza iniciar la
implementación.

------------------------------------------------------------------------

# 9. REQUISITOS ACADÉMICOS OBLIGATORIOS

Fuente: `ProyectoPrimerBimestre-2026-A(1).docx`.

## 9.1 Objetivo del proyecto

Desarrollar un videojuego original utilizando Phaser.js y tecnologías
web modernas, inspirado en ejercicios y conceptos del curso. Debe
implementar mecánicas completas, arquitectura modular, física, manejo de
estados y experiencia de usuario profesional.

## 9.2 Competencias evaluadas

-   Desarrollo de videojuegos 2D con Phaser.js.
-   Arquitectura modular en aplicaciones web interactivas.
-   Manejo del game loop y escenas.
-   Física y colisiones.
-   Gestión de assets multimedia.
-   Diseño de interfaces HUD/UI.
-   Persistencia de datos.
-   Optimización y rendimiento.
-   Programación orientada a objetos aplicada a videojuegos.
-   Integración de controles táctiles y teclado.

## 9.3 Arquetipo seleccionado

El documento ofrece cuatro arquetipos: Arcade Shooter, Top-Down
Adventure / RTS Lite, Puzzle Physics 2D y Plataforma 2D.

**Selección del equipo:** Plataforma 2D.

Características y requisitos específicos indicados por el profesor: -
saltos; - plataformas; - colisiones; - scroll lateral; - enemigos; -
checkpoints.

## 9.4 Requisitos técnicos obligatorios

### Arquitectura Phaser

-   Escenas Phaser.
-   Loader de assets.
-   Sistema de estados.
-   Menú principal.
-   Pausa.
-   Pantalla Game Over.
-   Reinicio del juego.

### Estructura profesional sugerida

``` text
src/
├── scenes/
├── objects/
├── ui/
├── managers/
├── assets/
├── physics/
├── audio/
└── main.js
```

Esta es una estructura mínima sugerida por el profesor, no una
obligación de usar exactamente esos nombres si existe una razón técnica
documentada. Mantener separación de responsabilidades.

### Mecánicas obligatorias

-   Movimiento.
-   Colisiones.
-   Sistema de puntaje.
-   HUD.
-   Enemigos o retos.
-   Condición de victoria.
-   Condición de derrota.
-   Persistencia de progreso.

### Física y colisiones

-   Phaser Arcade Physics.
-   Detección de colisiones.
-   Triggers.
-   Overlaps.
-   Rebotes o gravedad según el tipo de juego.

### Audio

-   Música de fondo.
-   Mínimo dos efectos de sonido.
-   Botón de mute.

### Persistencia

Usar `localStorage` para guardar: - High Score. - Nivel alcanzado. -
Configuración de audio.

### Responsive design y controles

-   Debe funcionar en escritorio, tablets y resoluciones móviles.
-   Desktop: teclado y mouse opcional.
-   Mobile: controles táctiles equivalentes.

### Rendimiento

-   Mínimo 45 FPS.
-   Sin congelamientos durante la ejecución.
-   Carga eficiente de assets.

### Accesibilidad mínima

-   Contraste adecuado.
-   Instrucciones visibles.
-   Controles documentados.
-   Opción mute.

## 9.5 Requisitos académicos de código

-   Modularidad.
-   Reutilización.
-   Separación de responsabilidades.
-   Buenas prácticas.
-   Comentarios explicativos.
-   Nombres descriptivos.
-   Organización clara.
-   Uso adecuado de funciones, clases o módulos.

## 9.6 Entregables

  -----------------------------------------------------------------------
  Entregable                          Criterio indicado
  ----------------------------------- -----------------------------------
  Repositorio GitHub                  Código completo, accesible y con
                                      historial de commits

  Proyecto comprimido                 ZIP que pueda ejecutarse localmente

  Video demo                          45--90 segundos; debe mostrar
                                      gameplay, menús, audio y
                                      funcionalidades

  Capturas                            4--6 imágenes que evidencien
                                      pantallas, niveles y mecánicas

  README.md                           Ejecución, controles, estructura y
                                      créditos

  Autoevaluación                      Justificar fortalezas, limitaciones
                                      y mejoras futuras
  -----------------------------------------------------------------------

## 9.7 Tecnologías permitidas/recomendadas

Obligatorias: - Phaser.js. - JavaScript.

Recomendadas: - Vite. - Visual Studio Code. - Git.

## 9.8 Rúbrica de evaluación

  Criterio                               Porcentaje
  ------------------------------------ ------------
  Funcionalidad principal                       20%
  Mecánicas de juego                            15%
  Física y colisiones                           10%
  Arquitectura y modularidad                    15%
  Rendimiento y optimización                    10%
  UX/UI y experiencia de usuario                10%
  Audio e inmersión                              5%
  Responsividad y controles táctiles             5%
  Código limpio y documentación                  5%
  README, video y presentación                   5%

## 9.9 Bonus

El profesor contempla hasta +10% por una o más funcionalidades
avanzadas: - Multiplayer simple. - Leaderboard online. - PWA
instalable. - IA avanzada. - Generación procedural. - Shader effects. -
Minimap. - Boss final. - Sistema de inventario. - Guardado múltiple. -
Arquitectura ECS. - Integración con API externa.

**No implementar bonus antes de cumplir los requisitos obligatorios y
sin aprobación del equipo.**

## 9.10 Restricciones del profesor

-   No usar templates completos descargados.
-   No reutilizar proyectos completos de internet.
-   No entregar proyectos incompletos.
-   No usar IA para generar el proyecto completo sin comprensión
    técnica.

## 9.11 Fecha de entrega indicada en el documento

El documento fuente indica **26 de mayo de 2026**. Esta fecha parece
anterior a la fecha de este expediente (15 de noviembre de 2026);
confirmar con el equipo si el documento corresponde a una edición
anterior o si la fecha sigue siendo relevante. No cambiarla sin
confirmación.

------------------------------------------------------------------------

# 10. ARQUITECTURA TÉCNICA --- DIRECTRICES, NO IMPLEMENTACIÓN EXISTENTE

## 10.1 Tecnología confirmada

-   Phaser.js.
-   JavaScript.
-   Aplicación web.

## 10.2 Tecnología recomendada por el profesor

-   Vite.
-   Visual Studio Code.
-   Git.

No se ha proporcionado un repositorio ni código fuente en este
expediente. No afirmar que existe una arquitectura implementada.

## 10.3 Arquitectura propuesta para evaluar

La siguiente estructura es una propuesta técnica para discutir con el
equipo. No es una estructura ya existente ni una decisión definitiva:

``` text
project-root/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── assets/
│       ├── images/
│       │   ├── characters/
│       │   ├── enemies/
│       │   ├── backgrounds/
│       │   ├── tilesets/
│       │   └── ui/
│       └── audio/
│           ├── music/
│           └── sfx/
├── src/
│   ├── main.js
│   ├── config/
│   ├── scenes/
│   ├── entities/
│   ├── managers/
│   ├── systems/
│   ├── ui/
│   ├── data/
│   └── utils/
├── docs/
│   ├── GAME_MASTER_DOCUMENTATION.md
│   ├── AUDIO_ASSET_CATALOG.md
│   └── decisions/
└── README.md
```

El agente debe proponer una arquitectura simple y adecuada a la escala
del proyecto. Evitar complejidad innecesaria.

## 10.4 Escenas posibles

La lista siguiente es una propuesta, no una decisión final: -
Boot/Preload. - MainMenu. - Story/Dialogue. - Level1. - Level2. -
Level3. - Pause/UI overlay. - GameOver. - Victory/Ending.

No crear una escena de Boss Fight hasta desbloqueo explícito.

------------------------------------------------------------------------

# 11. ESTADO ACTUAL Y MATRIZ DE PENDIENTES

## 11.1 Narrativa

  Elemento                           Estado
  ---------------------------------- ----------------------------------
  Prólogo / conversación con líder   Escrito
  Acto 1 --- Tierra, mar y cielo     Escrito
  Acto 2 --- Vuela alto              Escrito
  Acto 3 --- Limbo (Enfermedad)      Solo título y transición inicial
  Acto 4 (IF) --- DON'T TRY...       Solo título
  Acto final --- HIARETH             Solo título
  Historia completa                  Pendiente
  Desenlace de Aidan y Aine          Pendiente
  Rol narrativo de Morrigan          Pendiente
  Rol narrativo de Cernunnos         Pendiente
  Historia OVNI/alienígena           Incompleta

## 11.2 Personajes y recursos

  Elemento                       Estado
  ------------------------------ ----------------------------------------------
  Aidan                          Personaje definido; sprite enlazado
  Aine                           Personaje definido; sprite no proporcionado
  Blair                          Trasfondo definido
  Callum                         Trasfondo definido
  Ciara                          Trasfondo definido
  Líder del Pacto                Aparece en diálogo; nombre pendiente
  Morrigan                       Referencia de lore; rol por definir
  Cernunnos                      Referencia de lore; rol por definir
  Slimes                         Paquete enlazado; compatibilidad por revisar
  Esqueletos                     Paquete enlazado
  Enemigos humanos/alienígenas   Sin recurso confirmado
  Jefe                           Sin identidad confirmada
  Paquete de 3 enemigos          Uso y procedencia por aclarar

## 11.3 Audio

  Elemento                         Estado
  -------------------------------- -----------------------------------------
  Música nivel 1                   Referencia YouTube asignada
  Música nivel 2                   Referencia YouTube asignada
  Música nivel 3                   Referencia YouTube asignada
  Música Boss Fight                Referencia YouTube asignada
  Archivos musicales utilizables   Pendientes
  Efectos de sonido                El agente debe investigar y seleccionar
  Licencias de audio               Pendientes de verificación
  Integración de audio             No iniciada / no confirmada

## 11.4 Gameplay y código

  -----------------------------------------------------------------------
  Elemento                            Estado
  ----------------------------------- -----------------------------------
  Plataformas 2D                      Confirmado

  Movimiento                          Pendiente de inspeccionar sprites y
                                      definir

  Salto y gravedad                    Por definir técnicamente

  Combate                             Por definir

  Decisión slime                      Está en la historia; reglas
                                      pendientes

  Enemigos e IA                       Por definir

  HUD                                 Requisito académico; diseño
                                      pendiente

  Menú y pausa                        Requisitos académicos;
                                      implementación pendiente

  Persistencia localStorage           Requisito académico; implementación
                                      pendiente

  Responsive y controles táctiles     Requisito académico; implementación
                                      pendiente

  Boss Fight Touhou                   Bloqueado

  Repositorio/código existente        No proporcionado
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 12. PREGUNTAS ABIERTAS QUE EL AGENTE DEBE RESOLVER CON EL EQUIPO

No asumir respuestas. Formular preguntas concretas cuando sean
necesarias.

## 12.1 Prioridad narrativa

1.  ¿El nombre canónico del protagonista es `Aidan` o `Airan`? El
    documento utiliza ambos.
2.  ¿El equipo quiso decir que Yiyi es un personaje confirmado, o que
    Aine está confirmada como interés romántico? En una conversación se
    mencionó "ya es confirmada yiyi", pero no quedó claro el
    significado.
3.  ¿Cómo continúa el Acto 3 --- Limbo (Enfermedad)?
4.  ¿Qué ocurre en el Acto 4 (IF) --- DON'T TRY...?
5.  ¿Cómo termina el Acto final --- HIARETH?
6.  ¿Cuál es el papel concreto de Morrigan y Cernunnos?
7.  ¿Quién o qué es el jefe del Boss Fight?
8.  ¿Qué significa exactamente la piedra Lia Fáil y cómo se relaciona
    con los dioses?
9.  ¿Los tres portales corresponden a los tres niveles principales? ¿Hay
    más áreas o escenas intermedias?
10. ¿Qué significa `IF` en el título del Acto 4?

## 12.2 Prioridad de assets

1.  ¿Se dispone ya de los paquetes descargados o solo de los enlaces?
2.  ¿Cuál es el sprite o diseño visual de Aine?
3.  ¿El paquete de tres enemigos fue creado por un amigo del equipo, es
    un recurso comprado o simplemente una referencia? Aclarar la frase
    "comida de mi amigo de la escuela".
4.  ¿Se dispone de sprites para OVNIs/alienígenas?
5.  ¿Se dispone de tilesets/plataformas o solo fondos?
6.  ¿Qué licencia tiene cada paquete y qué atribución requiere?

## 12.3 Prioridad de gameplay

1.  ¿Qué controles tendrá Aidan?
2.  ¿Qué acciones de movimiento están disponibles en el sprite real?
3.  ¿Aidan ataca con proyectiles de fuego, magia cercana o ambas?
4.  ¿Cómo se representa la vida, el daño y la derrota?
5.  ¿La decisión de matar o esquivar al slime tendrá consecuencias?
6.  ¿Habrá sistema de puntaje? Es obligatorio según la guía del
    profesor; definir cómo se calcula de manera coherente con el juego.
7.  ¿Cómo se implementarán checkpoints y progreso entre niveles?
8.  ¿Qué contenido se considera condición de victoria final?

## 12.4 Prioridad de audio

1.  Entregar archivos de música utilizables con permisos adecuados.
2.  Confirmar si las pistas asignadas son definitivas.
3.  El agente debe proponer y documentar efectos de sonido con licencias
    compatibles.

------------------------------------------------------------------------

# 13. ORDEN RECOMENDADO DE TRABAJO

Este orden evita desarrollar sistemas que luego deban rehacerse por
cambios narrativos.

## Fase 1 --- Cerrar el diseño narrativo

-   Leer el documento narrativo completo.
-   Resolver las discrepancias de nombres.
-   Completar actos pendientes con el equipo.
-   Definir el papel de los personajes divinos.
-   Definir el desenlace.
-   Aprobar la estructura narrativa y la relación entre niveles.
-   Mantener el Boss Fight bloqueado hasta esta aprobación.

**Criterio de salida:** el equipo declara la historia completa y
aprobada.

## Fase 2 --- Auditoría de assets

-   Obtener los paquetes originales.
-   Revisar licencias y atribuciones.
-   Inspeccionar sprites y animaciones.
-   Comprobar la compatibilidad de perspectiva.
-   Confirmar el sprite de Aine.
-   Localizar los recursos faltantes.
-   Crear catálogo de assets.

**Criterio de salida:** inventario con archivos, fuentes, licencias y
estado.

## Fase 3 --- Diseño de gameplay

-   Diseñar movimiento según sprites.
-   Definir controles de teclado y táctiles.
-   Definir combate.
-   Definir vida/daño.
-   Definir enemigos.
-   Diseñar interacción y diálogos.
-   Definir la decisión del slime.
-   Definir puntuación, victoria, derrota y checkpoints.

**Criterio de salida:** documento de diseño aprobado por el equipo.

## Fase 4 --- Implementación base

-   Configurar Phaser y el proyecto web.
-   Implementar preload y escenas.
-   Implementar personaje y físicas.
-   Implementar plataformas, colisiones y scroll.
-   Implementar HUD, menú, pausa y Game Over.
-   Implementar persistencia con localStorage.
-   Implementar controles responsive.
-   Probar rendimiento.

## Fase 5 --- Niveles narrativos

-   Implementar nivel 1.
-   Integrar diálogos y escenas aprobadas.
-   Implementar nivel 2.
-   Implementar nivel 3 cuando el acto correspondiente esté definido.
-   Verificar continuidad entre escenas y portales.

No rellenar niveles cuyo contenido narrativo aún no esté aprobado.

## Fase 6 --- Audio y pulido

-   Integrar música autorizada.
-   Integrar efectos seleccionados.
-   Implementar mute y configuración persistente.
-   Ajustar volumen y transiciones.
-   Optimizar carga y rendimiento.
-   Verificar legibilidad, contraste y controles.

## Fase 7 --- Boss Fight (solo después de desbloqueo)

-   Esperar autorización explícita.
-   Diseñar el combate conforme a la historia aprobada.
-   Implementar el estilo bullet hell inspirado en Touhou.
-   Probar patrones, colisiones, rendimiento y accesibilidad.
-   No asumir que el jefe es Morrigan o Cernunnos sin confirmación.

## Fase 8 --- Entrega académica

-   README.
-   Repositorio GitHub.
-   ZIP ejecutable.
-   Video demo de 45--90 segundos.
-   4--6 capturas.
-   Autoevaluación.
-   Verificación de todos los criterios de la rúbrica.

------------------------------------------------------------------------

# 14. CRITERIOS DE ACEPTACIÓN PARA EL AGENTE

El trabajo no se considera correcto solo porque el juego "se vea bien".
Debe cumplir lo siguiente:

## Narrativa

-   [ ] No se alteró la historia canónica.
-   [ ] No se inventaron actos, diálogos, personajes o finales.
-   [ ] Los vacíos están señalados como pendientes.
-   [ ] Las discrepancias se consultaron con el equipo.
-   [ ] Los diálogos aprobados se conservan literalmente.

## Assets

-   [ ] Se registró la fuente de cada asset.
-   [ ] Se verificó licencia y atribución.
-   [ ] Se comprobó la compatibilidad de perspectiva y animación.
-   [ ] No se sustituyeron recursos sin autorización.
-   [ ] Los recursos no descargados no se presentan como integrados.

## Gameplay

-   [ ] El juego corresponde a plataformas 2D.
-   [ ] Movimiento y combate se aprobaron.
-   [ ] Física y colisiones funcionan.
-   [ ] HUD e instrucciones son claros.
-   [ ] Hay condición de victoria y derrota.
-   [ ] Hay puntaje y persistencia.
-   [ ] Hay checkpoints según el arquetipo.
-   [ ] Los controles de teclado y táctiles son equivalentes.

## Boss Fight

-   [ ] Permanece sin implementar mientras esté bloqueado.
-   [ ] No se inventó jefe, patrón, fase ni desenlace.
-   [ ] Solo se inicia tras aprobación narrativa y autorización del
    equipo.

## Calidad técnica

-   [ ] Código modular y legible.
-   [ ] Escenas y responsabilidades separadas.
-   [ ] Assets cargados eficientemente.
-   [ ] Objetivo de al menos 45 FPS.
-   [ ] Audio con mute.
-   [ ] localStorage conserva los datos exigidos.
-   [ ] README explica ejecución y controles.

------------------------------------------------------------------------

# 15. MENSAJE INICIAL PARA EL AGENTE QUE RECIBA ESTE ARCHIVO

Eres el agente de desarrollo del videojuego web *El pacto de Hiareth*.
Tu primera tarea no es programar todo el juego inmediatamente. Tu
primera tarea es comprender este documento, respetar la historia y
distinguir requisitos confirmados de decisiones pendientes.

La historia es el elemento más importante del proyecto. El documento
`el pacto de hiraeth.docx` contiene la fuente narrativa extensa. No
reescribas ni completes sus vacíos por iniciativa propia. Si una
decisión afecta a personajes, diálogos, acontecimientos, motivaciones,
jefes o desenlace, pregunta al equipo.

El juego es un plataformas 2D desarrollado con Phaser.js y JavaScript.
El documento del profesor establece requisitos obligatorios de
arquitectura, física, HUD, audio, persistencia, rendimiento, controles
responsive y entregables. Debes tenerlos presentes desde el diseño.

Usa los enlaces de assets y música como referencias proporcionadas por
el equipo. Verifica archivos y licencias antes de integrarlos. El equipo
todavía no ha entregado los archivos de música y solicita que tú
investigues y selecciones efectos de sonido con licencias compatibles.

**No implementes el Boss Fight todavía.** El equipo confirmó que será
inspirado en Touhou/bullet hell, pero ordenó explícitamente esperar
hasta que la historia esté completa y aprobada.

Comienza entregando: 1. Un resumen de comprensión del proyecto. 2. Una
lista de contradicciones y preguntas pendientes, priorizando las
narrativas. 3. Un inventario de recursos y su estado de verificación. 4.
Una propuesta de plan técnico que respete las restricciones. 5. Una
lista de decisiones que necesitan aprobación humana.

No comiences a implementar contenido narrativo o sistemas bloqueados
hasta recibir aprobación.

------------------------------------------------------------------------

# 16. REGISTRO DE CAMBIOS DEL DOCUMENTO

  -----------------------------------------------------------------------
  Fecha                               Cambio
  ----------------------------------- -----------------------------------
  2026-11-15                          Primera consolidación del contexto
                                      narrativo, requisitos del profesor,
                                      enlaces de sprites/fondos y
                                      referencias musicales.

  2026-11-15                          Se registra que el Boss Fight será
                                      estilo Touhou/bullet hell y queda
                                      bloqueado hasta completar la
                                      historia.

  2026-11-15                          Se registra que el equipo aún no
                                      dispone de archivos musicales y
                                      solicita al agente resolver la
                                      selección de efectos de sonido.
  -----------------------------------------------------------------------

**Fin del documento maestro.**


## 17. ACTUALIZACIÓN — COMPORTAMIENTO GENERAL DE ENEMIGOS (2026-11-15)

El equipo confirmó el siguiente comportamiento general para los enemigos comunes:
1. Se desplazan caminando.
2. Persiguen a Aidan.
3. Atacan al jugador por contacto.
4. Cada enemigo dispone de un ataque básico.

Esta decisión complementa la sección 7 y sustituye la idea de que el comportamiento general de los enemigos está completamente por definir.

Todavía no se han definido los parámetros ni las diferencias particulares de cada enemigo: alcance, daño, cadencia, recuperación, animaciones y condiciones exactas del ataque básico. El agente debe pedir aprobación antes de fijarlos.

El Boss Fight sigue bloqueado y no queda incluido en esta regla general hasta que se diseñe y apruebe su comportamiento.


# 18. ESPECIFICACIÓN TÉCNICA AMPLIADA — IA DE ENEMIGOS

> Esta sección convierte las decisiones confirmadas por el equipo en una especificación implementable. Los comportamientos generales son obligatorios. Los valores numéricos y detalles de ataque que no fueron decididos se mantienen configurables y deben validarse durante pruebas o consultarse con el equipo.

## 18.1 Reglas generales confirmadas

Todos los enemigos comunes deben:
1. Desplazarse caminando.
2. Perseguir a Aidan cuando lo detecten.
3. Causar daño al jugador por contacto.
4. Disponer de un ataque básico adicional.

Estas reglas aplican a enemigos comunes de los niveles. **No definen el comportamiento del Boss Fight**, que continúa bloqueado.

## 18.2 Arquitectura recomendada: máquina de estados finitos (FSM)

Implementar una FSM reutilizable para enemigos comunes. Cada enemigo puede compartir la estructura y personalizar parámetros, animaciones y ataque.

Estados recomendados:

| Estado | Responsabilidad |
|---|---|
| `IDLE` | Esperar o permanecer en reposo cuando Aidan no está dentro del rango de detección. |
| `CHASE` | Caminar en dirección a Aidan, respetando gravedad, plataformas y colisiones. |
| `ATTACK` | Ejecutar el ataque básico cuando se cumplan sus condiciones. |
| `HURT` | Reaccionar al recibir daño, si el sprite tiene animación disponible. |
| `KNOCKBACK` | Aplicar retroceso cuando corresponda y si el diseño aprobado lo permite. |
| `DEATH` | Reproducir muerte, desactivar daño/colisiones ofensivas y retirar el enemigo al terminar la animación. |

`KNOCKBACK` es una opción técnica, no una mecánica narrativa confirmada. Si no se define retroceso, omitirlo.

### Transiciones

- `IDLE → CHASE`: Aidan entra en el rango de detección y puede ser perseguido.
- `CHASE → IDLE`: Aidan sale del rango de detección y el diseño de nivel permite abandonar la persecución.
- `CHASE → ATTACK`: se cumplen las condiciones del ataque básico (rango, orientación, cooldown y estado válido).
- `ATTACK → CHASE`: termina la animación/ventana de ataque y Aidan sigue siendo objetivo.
- `ATTACK → IDLE`: termina el ataque y Aidan ya no está en rango de persecución.
- `CUALQUIER ESTADO VIVO → HURT`: el enemigo recibe daño.
- `HURT → CHASE` o `IDLE`: termina la reacción al daño, según la posición de Aidan.
- `CUALQUIER ESTADO VIVO → DEATH`: la vida del enemigo llega a cero.
- `DEATH`: estado terminal; no puede perseguir, atacar ni causar daño.

No permitir que dos estados ejecuten ataques simultáneamente. Bloquear nuevas órdenes de movimiento incompatibles durante la animación de ataque, salvo que el sprite y el diseño permitan movimiento durante el ataque.

## 18.3 Detección y persecución de Aidan

La persecución debe funcionar en un plataformas lateral 2D:

1. Comprobar distancia horizontal y vertical entre enemigo y Aidan.
2. Usar un rango de detección configurable.
3. Si Aidan está dentro del rango y el enemigo está vivo, cambiar a `CHASE`.
4. Orientar el sprite hacia Aidan.
5. Caminar hacia Aidan mediante velocidad horizontal configurable.
6. Utilizar Arcade Physics para gravedad, suelo y colisiones.
7. No atravesar plataformas sólidas ni paredes.
8. Evitar que el enemigo se quede caminando contra una pared indefinidamente: detenerse, cambiar a un comportamiento de espera o usar navegación simple apropiada al nivel.
9. No implementar pathfinding complejo salvo que el diseño del nivel realmente lo requiera.

**Importante:** en plataformas 2D, perseguir no equivale a calcular una línea recta hacia el jugador. El enemigo debe respetar el eje vertical, la gravedad, los bordes y la geometría del escenario. No debe flotar para alcanzar a Aidan si su sprite y tipo de enemigo son terrestres.

### Parámetros configurables por enemigo

- `detectionRangeX`
- `detectionRangeY`
- `moveSpeed`
- `gravity`
- `maxHealth`
- `contactDamage`
- `attackDamage`
- `attackRange`
- `attackCooldown`
- `attackDuration`
- `hurtDuration`
- `contactDamageCooldown`

Los valores iniciales deben estar centralizados en configuración y no dispersos en el código. No inventar valores como canon del juego: proponer valores de prueba, probarlos y solicitar aprobación si afectan el balance.

## 18.4 Daño por contacto

El equipo confirmó que todos los enemigos hacen daño al tocar a Aidan.

Implementación esperada:
- Detectar overlap entre hitbox del jugador y hitbox de contacto del enemigo.
- Aplicar `contactDamage` cuando el jugador no esté protegido por invulnerabilidad temporal.
- Añadir un cooldown de daño al jugador para evitar que una sola superposición reste vida cada frame.
- Dar feedback visual y/o sonoro al recibir daño.
- Respetar estados de invulnerabilidad, derrota o transición.
- No permitir que un enemigo muerto cause daño.
- Separar hitbox de contacto de hitbox del ataque básico cuando sea necesario.

El equipo todavía no ha definido daño numérico, duración de invulnerabilidad ni sistema de corazones/vida. Mantenerlos configurables y pedir aprobación.

## 18.5 Ataque básico adicional

Además del daño por contacto, cada enemigo común debe disponer de un ataque básico.

El agente debe:
1. Revisar las animaciones del sprite real.
2. Determinar si el ataque disponible es cuerpo a cuerpo o a distancia.
3. Proponer al equipo el tipo de ataque si el recurso no lo deja claro.
4. Implementar una hitbox de ataque separada de la hitbox corporal.
5. Activar el daño únicamente durante los frames/ventana activa del ataque.
6. Aplicar cooldown para evitar ataques continuos.
7. Orientar el ataque hacia Aidan.
8. Evitar que el ataque se active si el enemigo está muerto o en una reacción incompatible.
9. Sincronizar animación, hitbox y sonido.

**Pendiente de aprobación:** no está especificado si el ataque básico de todos los enemigos es melee, proyectil o si varía por tipo. No decidirlo de forma irreversible sin revisar sprites y consultar al equipo.

## 18.6 Contacto y ataque básico no deben duplicar daño accidentalmente

El jugador puede estar dentro de la hitbox de contacto cuando el enemigo ejecuta su ataque básico. Para evitar daño injusto:
- Mantener cooldown independiente de contacto y ataque.
- Evitar que el mismo evento de ataque aplique dos veces el mismo daño.
- Definir si durante `ATTACK` el daño de contacto sigue activo o se suspende.
- Hacer esta regla configurable por enemigo.
- Probar la interacción con Aidan quieto, caminando y saltando.

La decisión de si contacto y ataque pueden dañar simultáneamente requiere ajuste de balance y aprobación del equipo.

## 18.7 Orientación y colisiones

- Usar `flipX` o mecanismo equivalente para orientar el sprite.
- Separar cuerpo físico, área de detección y hitbox de ataque.
- Ajustar cuerpos físicos al tamaño real del personaje; no usar necesariamente el rectángulo completo del sprite.
- Evitar que la hitbox de ataque golpee a través de paredes.
- Evitar que los enemigos se acumulen todos exactamente en el mismo punto; usar separación simple o pequeñas variaciones de aproximación si es necesario.
- No permitir que enemigos atraviesen el suelo o queden suspendidos.
- Desactivar cuerpos físicos y temporizadores al destruir la entidad.

## 18.8 Aplicación por familias de enemigos

### Slimes — Nivel 1

El equipo los asignó al primer nivel. El comportamiento general confirmado aplica: caminar, perseguir, daño por contacto y ataque básico.

Antes de implementarlos, comprobar el paquete enlazado: su nombre y presentación indican perspectiva Top-Down, que puede no encajar con un plataformas lateral. Si el paquete no ofrece animaciones laterales compatibles, informar al equipo y solicitar otro recurso o autorización para adaptar/sustituirlo.

No inventar habilidades elementales, tamaños, variantes ni ataques especiales por el solo hecho de que otros paquetes de slimes los tengan.

### Enemigos del nivel 2 — antigua federación

El trasfondo menciona OVNIs/alienígenas, pero no hay un sprite de enemigo aprobado ni comportamiento individual definido.

No asumir que el paquete de tres enemigos de CraftPix corresponde a los alienígenas. Primero confirmar su procedencia y aprobación visual.

Una vez aprobado un sprite, aplicar la FSM común y adaptar sus animaciones. Si el sprite representa un enemigo volador, consultar al equipo antes de cambiar la regla confirmada de desplazamiento caminando.

### Esqueletos — Nivel 3

El paquete proporcionado incluye tres arquetipos visuales: esqueleto con espada, arquero y lancero. El comportamiento común confirmado sigue aplicando, pero la existencia de un arquero no autoriza por sí sola a implementar proyectiles.

Antes de programar:
- inspeccionar las animaciones disponibles;
- identificar cuáles corresponden a caminar, ataque, daño y muerte;
- confirmar si el equipo desea que todos los esqueletos caminen y ataquen de forma equivalente;
- consultar antes de dar al arquero un ataque a distancia o al lancero un alcance especial.

No inventar jerarquías, lore o poderes para los esqueletos: la fuente narrativa solo los define como almas del limbo.

## 18.9 Estructura de código sugerida

Propuesta técnica; adaptar a la arquitectura real del repositorio:

```text
src/
├── entities/
│   ├── enemies/
│   │   ├── BaseEnemy.js
│   │   ├── EnemyStateMachine.js
│   │   ├── EnemyConfig.js
│   │   ├── SlimeEnemy.js
│   │   └── SkeletonEnemy.js
│   └── Player.js
├── systems/
│   ├── DamageSystem.js
│   └── CollisionSystem.js
└── managers/
    └── EnemyManager.js
```

Responsabilidades:
- `BaseEnemy`: física, vida, daño de contacto, orientación y ciclo de vida.
- `EnemyStateMachine`: transiciones y ejecución de estados.
- `EnemyConfig`: parámetros por tipo de enemigo.
- `SlimeEnemy` / `SkeletonEnemy`: diferencias específicas aprobadas.
- `DamageSystem`: aplicación de daño y cooldowns.
- `EnemyManager`: creación, seguimiento y limpieza de enemigos.

No crear una arquitectura excesivamente compleja para un proyecto pequeño. Si una clase o sistema no aporta separación útil, mantenerlo simple.

## 18.10 Pruebas mínimas de IA

- [ ] El enemigo permanece en `IDLE` si Aidan está fuera de detección.
- [ ] Detecta a Aidan dentro del rango configurado.
- [ ] Camina hacia Aidan sin flotar ni atravesar el suelo.
- [ ] Se orienta correctamente.
- [ ] No atraviesa paredes ni plataformas sólidas.
- [ ] Puede ejecutar su ataque básico según rango y cooldown.
- [ ] La hitbox de ataque coincide con la animación.
- [ ] El contacto causa daño.
- [ ] El contacto no resta vida en cada frame.
- [ ] Contacto y ataque no generan doble daño accidental.
- [ ] Al recibir daño, reproduce la reacción disponible.
- [ ] Al morir, deja de perseguir y atacar.
- [ ] No hay errores al reiniciar o cambiar de escena.
- [ ] El comportamiento se mantiene estable con varios enemigos simultáneos.

---

# 19. CATÁLOGO DE RECURSOS — ORIGEN, DESCARGA Y USO

> Los enlaces siguientes son las fuentes originales proporcionadas por el equipo. El agente debe descargar los paquetes desde esas páginas, conservar el ZIP original y verificar las condiciones de uso vigentes antes de incluirlos en la distribución final. La presencia de un enlace no significa que el recurso ya esté descargado o integrado.

## 19.1 Aidan — protagonista

**Recurso:** Evil Wizard 2 — LuizMelo  
**Fuente original:** https://luizmelo.itch.io/evil-wizard-2  
**Uso:** personaje controlable.

La página del autor indica:
- paquete gratuito / nombre-tu-precio;
- animaciones Idle, Run, Attack 1, Attack 2, Jump, Fall, Take Hit y Death;
- licencia CC0 1.0;
- uso comercial permitido;
- atribución no obligatoria, aunque el autor agradece créditos.

Descarga:
1. Abrir el enlace original.
2. Seleccionar `Download Now`.
3. Si aparece la opción de precio, se puede introducir 0 si la página lo permite.
4. Descargar `EVil Wizard 2.zip`.
5. Conservar el ZIP original y extraer una copia dentro del proyecto.
6. Inspeccionar dimensiones, frames, nombres y orientación antes de configurar Phaser.

**Compatibilidad:** side-scroller / plataformas 2D.  
**Estado:** enlace entregado; descarga e integración no confirmadas.

## 19.2 Nivel 1 — fondo de naturaleza

**Recurso:** Free Nature Backgrounds Pixel Art — CraftPix  
**Fuente original:** https://craftpix.net/freebies/free-nature-backgrounds-pixel-art/  
**Uso:** fondo del primer nivel.

La ficha consultada describe:
- 8 fondos;
- PNG y PSD;
- resoluciones indicadas de 2304×1296 y 576×324;
- fondos con efecto parallax;
- descarga gratuita con uso libre de regalías según las condiciones de CraftPix.

Pasos:
1. Abrir la página.
2. Localizar la opción de descarga gratuita.
3. Descargar el paquete desde CraftPix.
4. Guardar el archivo original.
5. Extraer PNG/PSD.
6. Seleccionar las capas necesarias y configurar parallax en Phaser si corresponde.

No confundir el fondo con las plataformas físicas del nivel.

## 19.3 Nivel 1 — slimes

**Recurso:** Free Slime Mobs Pixel Art Top-Down Sprite Pack  
**Fuente original:** https://craftpix.net/freebies/free-slime-mobs-pixel-art-top-down-sprite-pack/  
**Uso asignado:** enemigos del primer nivel.

La ficha del paquete describe 3 personajes y formatos PNG/PSD. La perspectiva es Top-Down.

Pasos:
1. Abrir el enlace original.
2. Descargar el paquete gratuito desde la página.
3. Conservar el ZIP y extraer una copia.
4. Inspeccionar sprites y animaciones.
5. Confirmar si existen vistas laterales adecuadas para plataformas.

**Advertencia crítica:** la perspectiva Top-Down no corresponde automáticamente a un plataformas lateral. No implementar estos slimes como enemigos definitivos hasta verificar compatibilidad y obtener aprobación del equipo.

## 19.4 Nivel 2 — fondo de ciudad en ruinas

**Recurso:** Free City Ruin Backgrounds Pixel Art  
**Fuente original proporcionada:** https://craftpix.net/freebies/free-city-ruin-backgrounds-pixel-art/  
**Uso:** fondo del segundo nivel, antigua federación humana.

La ficha del recurso asociado describe:
- 4 fondos;
- resolución 576×324;
- PNG y PSD.

Pasos:
1. Abrir el enlace proporcionado por el equipo.
2. Descargar el paquete desde la página original.
3. Guardar el ZIP.
4. Extraer los PNG/PSD.
5. Inspeccionar qué fondos encajan con la escena de ciudad devastada.
6. Implementar como fondo, no como colisionador.

Si la URL cambia o redirige, informar al equipo y no sustituirla silenciosamente por otro paquete.

## 19.5 Nivel 3 — lugares abandonados

**Recurso:** Free Pixel Art Abandoned Places Background Collection  
**Fuente original:** https://craftpix.net/freebies/free-pixel-art-abandoned-places-background-collection/  
**Uso:** ambientación del tercer nivel / Limbo.

La referencia describe escenarios abandonados, como bosques inquietantes, ciudades en ruinas, templos olvidados, parques abandonados y paisajes decadentes.

Pasos:
1. Abrir la página original de CraftPix.
2. Revisar la opción de descarga y las condiciones.
3. Descargar el paquete.
4. Guardar el ZIP original.
5. Extraer e inspeccionar imágenes.
6. Seleccionar el fondo de acuerdo con la historia aprobada del Acto 3.

No asumir que todos los escenarios del paquete se utilizarán.

## 19.6 Nivel 3 — esqueletos

**Recurso:** Free Skeleton Pixel Art Sprite Sheets  
**Fuente original:** https://craftpix.net/freebies/free-skeleton-pixel-art-sprite-sheets/  
**Uso:** enemigos del tercer nivel.

La ficha consultada indica:
- 3 personajes: esqueleto con espada, arquero y lancero;
- 10 sprite sheets;
- PNG y PSD;
- animaciones que pueden incluir ataque, caminar, muerte, caída, daño, idle, protección y carrera;
- uso libre de regalías según las condiciones de descarga de CraftPix.

Pasos:
1. Abrir el enlace original.
2. Seleccionar descarga gratuita.
3. Guardar el ZIP.
4. Extraer los archivos.
5. Identificar cada hoja y sus frames.
6. Mapear animaciones a los estados `IDLE`, `CHASE`, `ATTACK`, `HURT` y `DEATH`.
7. Confirmar con el equipo qué ataques corresponden a cada esqueleto.

No asumir que los tres tipos tendrán mecánicas diferentes hasta que el equipo las apruebe.

## 19.7 Boss Fight — fondo lunar

**Recurso:** Free Moon Pixel Game Backgrounds  
**Fuente original:** https://craftpix.net/freebies/free-moon-pixel-game-backgrounds/  
**Uso asignado:** ambientación de Boss Fight.

Pasos:
1. Abrir la página original.
2. Revisar disponibilidad de descarga y licencia.
3. Descargar y conservar el paquete original.
4. Extraer los fondos.
5. No integrarlos todavía en una escena de combate.

**BLOQUEO:** aunque el fondo y la música estén identificados, el Boss Fight estilo Touhou/bullet hell no debe implementarse hasta que la historia completa esté aprobada.

## 19.8 Paquete adicional — 3 Enemy Character Sprite Set

**Recurso:** 3 Enemy Character Sprite Set — CraftPix  
**Fuente:** https://craftpix.net/product/3-enemy-character-sprite-set/  
**Uso:** no asignado definitivamente.

La ficha describe:
- 3 personajes vectoriales;
- acciones walk, idle, shot/hit y dead;
- formatos AI, EPS y PNG;
- personajes con ataques diferenciados;
- la ubicación/escenario mostrado en la demostración no está incluido;
- el recurso es de un artista externo y CraftPix indica que se licencia mediante su política de licencias.

**Pendiente:** confirmar con el equipo si este recurso fue creado por un amigo, si fue adquirido o si solamente se compartió como referencia. No descargar ni integrar sin aclarar procedencia, disponibilidad y licencia.

## 19.9 Registro de descargas

Crear un directorio para originales y otro para recursos preparados:

```text
public/assets/
├── originals/
│   ├── aidan/
│   ├── level-1/
│   ├── level-2/
│   ├── level-3/
│   └── boss/
├── images/
│   ├── characters/
│   ├── enemies/
│   ├── backgrounds/
│   └── ui/
└── audio/
    ├── music/
    └── sfx/
```

Guardar un `ASSET_CREDITS.md` con:
- nombre del paquete;
- autor;
- URL;
- licencia;
- fecha de descarga;
- archivos incluidos;
- uso dentro del juego;
- atribución requerida;
- modificaciones realizadas.

No sobrescribir los ZIP originales. No incluir archivos de demostración que no formen parte de la licencia o del paquete.


# 20. Guion de continuación

El cerco que cierra el acto 2 conduce a dos rutas. Buscar refugio en el túnel expone a Aine al contagio. Abrir paso con fuego permite a ambos llegar sanos al valle. Las dos rutas pasan por el castillo y culminan en el duelo por el fragmento de Lia Fáil.

## 20.1 Acto 3 · Limbo (Enfermedad)

### El cerco

Acabas de cruzar al Limbo junto a Aine. Su escudo se rompe y, entre los árboles, los esqueletos cierran el paso. A tu izquierda ves un hoyo por el que podrían bajar de uno en uno.

Aine: Si saltamos ahí dentro, no podrán rodearnos.

Aidan: Y si el túnel no tiene salida, tampoco podremos apartarnos. Puedo usar el fuego para abrirnos paso.

Los esqueletos ya están a unos pasos. Aine te mira y espera tu señal.

### Ruta del túnel

Bajan por el hoyo y se arrastran bajo las raíces hasta ver luz. Cuando ayudas a Aine a subir, una mano de hueso la alcanza por el tobillo. Ella se zafa de una patada.

Aine: Estoy bien. Vamos, antes de que encuentren la salida.

A lo lejos se oyen patas contra la piedra. Entre los troncos, una luz se mueve como la de un portal.

### Ruta de la magia

Le pides a Aine que se agache. Una llamarada barre el suelo y los esqueletos retroceden. Corren juntos por el paso que queda abierto.

Aine: Por aquí. Veo una luz entre los árboles.

Los huesos quedan atrás. Entre ustedes y el portal se oyen patas raspando la piedra.

## 20.2 Acto 4 · DON’T TRY

### Llegada al valle

Salen del Limbo a un valle de montañas. El sol calienta la ropa húmeda y, entre las flores, el viento mueve las hierbas como movía el trigo el día de tu boda.

Un viajero descansa junto a un mojón. Lleva cosido el mismo emblema que viste en los autómatas de la antigua Federación.

Aidan: Buscamos un fragmento de Lia Fáil. ¿Has oído hablar de él?

Viajero: Dicen que lo custodian en el castillo. Sigan el camino de piedra. Por las flores no, que el terreno se abre hacia las galerías.

Te vuelves para avisarle a Aine. La ves perder pie al otro lado del sendero. El borde cede bajo sus botas y cae por la grieta. La llamas. Desde abajo solo te llega el ruido de las piedras.

Viajero: Hay una entrada a las galerías al pie de la ladera. Por ahí puedes bajar.

### Ruta del túnel · Despedida

Encuentras a Aine al final de la galería, apoyada contra la pared. La piel alrededor del tobillo se le ha oscurecido. La apartas del suelo frío y le sostienes la mano.

Aine: El esqueleto me rozó al salir. Pensé que no era nada.

Aidan: Aguanta. Voy a sacarte de aquí.

Aine: Mi padre decía que volveríamos a la tierra. Quédate conmigo un momento. Háblame del campo de trigo.

Le cuentas cómo se doblaban las espigas cuando Blair pasó entre ellas. A mitad de la historia dejas de sentir su mano apretando la tuya.

Piensas en Callum y en Ciara, y en todas las veces que has repasado lo que habrías hecho para llegar antes a casa. Dices los tres nombres en voz alta. Después, recoges el frasco de Aine y vuelves al camino de piedra.

### Ruta de la magia · Aine cautiva

Al final de la galería ves a Aine detrás de una reja. Una banda vigila el paso. Ella se agarra a los barrotes cuando te reconoce.

Aine: ¡Aidan! ¡Quiero vivir! ¡Ayúdame a salir!

Recuerdas cómo te alcanzó al otro lado del portal, aun atada a la silla. Te acercas a la reja y enciendes el fuego en tus manos.

Aidan: Apártate de la puerta. Ya estoy aquí.

### Ruta de la magia · Después del rescate

Cuando cae el último guardia, recoges la llave y abres la reja. Aine sale despacio. Se apoya en tu brazo hasta recuperar el equilibrio.

Aidan: Pensé que te había perdido.

Aine: Yo también tuve miedo. Me alegra que respondieras.

Vuelven juntos al camino de piedra. Desde la ladera distinguen la torre del castillo.

## 20.3 Acto final · HIARETH

### Llegada al castillo · Aidan

Llegas al castillo con el frasco de Aine en la mano. Te detienes ante la puerta. Podrías volver por donde viniste. Abres y entras.

Al fondo del vestíbulo ves una escalera. El aire que baja de los pisos superiores huele a ceniza.

### Llegada al castillo · Aidan y Aine

Llegan a las puertas del castillo. Aine se detiene para recuperar el aliento. Esta vez esperas con ella.

Aidan: ¿Puedes seguir?

Aine: Sí. Entremos juntos.

Empujan la puerta. Una escalera atraviesa el vestíbulo y sube hacia las habitaciones.

### El dragón · Aidan

En el último dormitorio, las cortinas de una cama enorme se mueven con cada respiración del dragón. Entre sus garras brilla el fragmento de Lia Fáil.

Dragón: Has venido solo, pero llevas un frasco que no te pertenece.

Aidan: Era de Aine. Antes perdí a mi esposa y a mis hijos. No sé qué hacer con otro nombre que solo puedo pronunciar yo.

Dragón: Di su nombre cuando necesites decirlo. Y si mañana algo te hace reír, pregúntate qué le quitaría esa risa a lo que vivieron juntos.

El dragón deja el fragmento junto a la cama y se incorpora.

Dragón: Te lo entregaré si me vences. Cuando uno de los dos ceda, termina el duelo.

### El dragón · Aidan y Aine

Abren el último dormitorio. Un dragón se incorpora junto a una cama enorme. Entre sus garras brilla el fragmento de Lia Fáil.

Dragón: Queda poca gente dispuesta a esperar a otra persona en el umbral de mi puerta.

Aidan: He perdido a mi familia. Cuando alguien me importa, ya estoy pensando en el día en que podría perderlo.

Dragón: Ese día llegará para los tres. Si hoy no tuvieras que decidir qué hacer con el resto de tu vida, ¿qué querrías hacer mañana?

Aine: Mañana me gustaría desayunar al sol.

El dragón deja el fragmento junto a la cama y se incorpora.

Dragón: Te lo entregaré si me vences. Cuando uno de los dos ceda, termina el duelo.

### Epílogo · Aidan

El dragón inclina la cabeza y te entrega el fragmento. Al salir del castillo, guardas el fragmento y llevas el frasco de Aine contigo.

Al pie de la montaña hay un campo de trigo. Te sientas a descansar. Dices el nombre de Aine y recuerdas el sonido de su voz al pedirte que le contaras de Blair.

Empieza a clarear. Ves una casa al otro lado del campo y por la chimenea sale humo. Caminas hacia ella. Te gustaría pedir un poco de pan y un lugar donde sentarte.

### Epílogo · Aidan y Aine

El dragón inclina la cabeza y te entrega el fragmento. Sales del castillo con Aine. Al pie de la montaña, las primeras luces caen sobre un campo de trigo.

Aidan: Cuando hablé con el líder del Pacto, le dije que al terminar iba a desaparecer. Hoy quiero desayunar. Luego, si te apetece, podemos seguir el camino juntos.

Aine: Primero el desayuno.

Ven una chimenea encendida al otro lado del campo y bajan hacia ella.
