// Los textos extensos se conservan en las fuentes. Estas escenas enlazan los tramos jugables.
export const OPENING_SCENES = {
  prologue: ['Líder del Pacto: Tres portales. Tráeme un fragmento de Lia Fáil y el trato estará cumplido.', 'Aidan: Cumpliré la misión. Después desapareceré.'],
  intro: ['En una aldea incendiada encuentras a una elfa herida junto a dos cuerpos. Los slimes huyeron hacia el bosque.', 'Aine: Quiero ir contigo. Sé por dónde se fueron.'],
  camp: ['Aine: La guerra empezó cuando mataron a la reina slime. Mi padre y mi hermana ni siquiera peleaban en ella.', 'Aidan: Yo también busqué venganza cuando perdí a Blair. No me devolvió nada.', 'Aidan cruza hacia las ruinas de la Antigua Federación. Aine alcanza el portal antes de que se cierre.'],
  act2: ['En la escuela en ruinas, un robot dibujado te recuerda a Callum y Ciara, tus hijos. Le confiesas a Aine que esperabas morir en la misión.', 'Aine: Puedes echarlos de menos y seguir aquí, Aidan.', 'Cubres a Aine con un escudo y cruzas solo. Ella se impulsa con agua para seguirte. En el Limbo, los rodean los esqueletos.'],
};

export const ENDING_SCENES = {
  limboIntro: ['El escudo de Aine se rompe. A la izquierda hay un túnel. Los esqueletos cierran el paso.'],
  limboTunnel: ['Aine: Solo fue un roce. ¡Corre, antes de que salgan!'],
  limboMagic: ['Aidan: ¡Ahora, Aine! ¡Por el paso que dejó el fuego!'],
  valleyIntro: ['Aidan: Buscamos un fragmento de Lia Fáil.', 'Viajero: Lo custodian en el castillo. ¡Cuidado con las flores, hay galerías debajo!'],
  valleyLoss: ['Aine: El esqueleto… fue aquel roce. ¿Me cuentas otra vez lo del campo de trigo?', 'Le hablas de Blair. Aine deja de apretarte la mano. Guardas su frasco y vuelves al sendero.'],
  valleyCaptive: ['Aine: ¡Aidan, quiero vivir! ¡Ayúdame a salir!'],
  valleyRescue: ['Aine: Tuve miedo de pedir ayuda. Me alegra que llegaras.', 'Aidan: Esta vez seguimos juntos.'],
  castleAlone: ['El frasco de Aine pesa poco. Lo llevas contigo al entrar al castillo.'],
  castleTogether: ['Aidan: ¿Puedes seguir?\nAine: Sí. Entremos juntos.'],
};

export const WALK_DIALOGUE = {
  1: [
    { x: 390, speaker: 'Aine', text: '¡Ahí! Es uno de los slimes del incendio.' },
    { x: 1750, speaker: 'Aidan', text: 'Mi aldea también ardió. A veces vuelvo a oler el humo.' },
    { x: 3120, speaker: 'Aine', text: 'Mi magia de agua no apagó aquel fuego. Todavía oigo a mi hermana.' },
  ],
  2: [
    { x: 280, speaker: 'Aine', text: 'Esos autómatas llevan el sello de la Federación. Aquí todo sigue defendiendo una ciudad vacía.' },
    { x: 1510, speaker: 'Aidan', text: 'Callum habría querido ver cómo funcionaban.' },
    { x: 2720, speaker: 'Aine', text: 'Hay una escuela más adelante. Descansemos allí.' },
  ],
  3: [
    { x: 350, speaker: 'Aine', text: 'Los huesos de esos sabuesos suenan antes de que se acerquen.' },
    { x: 1110, speaker: 'Aidan', text: 'Si seguimos la luz entre los árboles, saldremos de aquí.' },
    { x: 2440, speaker: 'Aine', text: 'Al otro lado hay luz de día. Ya casi llegamos.' },
  ],
  4: [
    { x: 325, speaker: 'Aidan', text: '¡Aine! Si puedes oírme, sigue hablando.' },
    { x: 920, speaker: 'Aidan', text: 'Aquí se oyen ecos. La entrada de las galerías debe estar cerca.' },
  ],
  5: [
    { x: 300, speaker: 'Aidan', text: 'El castillo sigue en pie. Sus guardianes todavía vigilan el dormitorio.' },
    { x: 2210, speaker: 'Aidan', text: 'Ya noto el calor. Sea lo que sea, está detrás de esa puerta.' },
  ],
  6: [{ x: 255, speaker: 'Aine', text: '¡Cuidado! Los captores tienen la llave.' }],
};
