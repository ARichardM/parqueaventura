/* Mundo Curioso - Juegos educativos. 100% locales: no fetch, cookies ni almacenamiento. */
(() => {
  'use strict';
  const subject = document.body.dataset.subject;
  if (!['matematicas', 'lenguaje', 'ciencias'].includes(subject)) return;
  const TOTAL = 8;
  const $ = id => document.getElementById(id);
  const ui = {
    stage: $('play-area'), results: $('results'), tag: $('question-tag'), number: $('question-number'),
    symbol: $('question-symbol'), question: $('question-title'), hint: $('question-hint'),
    answers: $('answer-options'), feedback: $('feedback'), next: $('next-btn'),
    score: $('score'), progressText: $('progress-text'), progress: $('progress-bar'),
    restart: $('restart-btn'), finalScore: $('final-score'), resultTitle: $('result-title'),
    resultMessage: $('result-message'), again: $('play-again')
  };
  let mode = document.querySelector('.mode-button').dataset.mode;
  let level = 1, questions = [], index = 0, score = 0, answered = false;
  const shuffle = arr => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const choice = arr => arr[Math.floor(Math.random() * arr.length)];
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const question = (tag, symbol, prompt, hint, options, answer, explain) => ({tag, symbol, prompt, hint, options:shuffle(options), answer:String(answer), explain});
  const numerics = (correct, min = 0) => {
    const set = new Set([correct]);
    let step = 0;
    while (set.size < 4 && step < 80) {
      const delta = choice([-12,-10,-8,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,8,10,12]);
      const v = correct + delta + (step > 35 ? random(-3,3) : 0);
      if (v >= min) set.add(v);
      step++;
    }
    for (let v = min; set.size < 4; v++) set.add(v);
    return [...set].map(String);
  };
  function mathOperations() {
    let a, b, result, op, detail;
    if (level === 1) {
      op = choice(['+','+','−']);
      if (op === '+') {a = random(2,25); b = random(1,20); result = a + b; detail = `${a} + ${b} = ${result}.`;
      } else {a = random(10,40); b = random(1,a); result = a - b; detail = `${a} − ${b} = ${result}.`;}
    } else {
      op = choice(['+','−','×','×']);
      if (op === '+') {a = random(20,90); b = random(10,90); result = a + b; detail = `${a} + ${b} = ${result}.`;
      } else if (op === '−') {a = random(40,130); b = random(10,a); result = a - b; detail = `${a} − ${b} = ${result}.`;
      } else {a = random(2,10); b = random(2,10); result = a * b; detail = `${a} × ${b} = ${result}.`;}
    }
    return question('Cuenta y descubre', '🧮', `¿Cuánto es ${a} ${op} ${b}?`, 'Elige el resultado correcto.', numerics(result), result, `El resultado es ${detail}`);
  }
  function mathPatterns() {
    const step = level === 1 ? choice([2,3,5,10]) : choice([4,6,7,8,9,12]);
    const start = level === 1 ? random(1,20) : random(4,38);
    const backwards = level === 2 && Math.random() < .38;
    const s = backwards ? -step : step;
    const base = backwards ? start + 4*step : start;
    const list = Array.from({length:4}, (_,i)=>base+i*s);
    const result = base+4*s;
    return question('Encuentra el patrón', '🔎', `${list.join('  ·  ')}  ·  ¿?`, `¿Qué número sigue? ${backwards ? 'La secuencia baja.' : 'La secuencia sube.'}`, numerics(result), result, `Cada número ${backwards?'disminuye':'aumenta'} ${step}. Sigue el ${result}.`);
  }
  const wordData = [
    ['s_l','o','sol','La estrella que ilumina nuestro día.','🌞',1],
    ['gat_','o','gato','Un animal que dice miau.','🐈',1],
    ['li_ro','b','libro','Tiene páginas para leer.','📖',1],
    ['ca_a','s','casa','Un lugar donde vivimos.','🏠',1],
    ['fl_r','o','flor','Tiene pétalos y puede oler rico.','🌸',1],
    ['esc_ela','u','escuela','Aquí aprendemos muchas cosas.','🏫',1],
    ['ven_ana','t','ventana','Por ella podemos mirar afuera.','🪟',1],
    ['láp_z','i','lápiz','Sirve para escribir o dibujar.','✏️',1],
    ['pla_eta','n','planeta','La Tierra es uno de ellos.','🪐',2],
    ['maripo_a','s','mariposa','Un insecto con alas de colores.','🦋',2],
    ['jir_fa','a','jirafa','Un animal con cuello muy largo.','🦒',2],
    ['elef_nte','a','elefante','Un animal grande con trompa.','🐘',2],
    ['bicicle_a','t','bicicleta','Un vehículo de dos ruedas.','🚲',2],
    ['biblio_eca','t','biblioteca','Un lugar con muchos libros.','📚',2],
    ['uni_erso','v','universo','Incluye las estrellas y galaxias.','🌌',2],
    ['natu_aleza','r','naturaleza','Conjunto de seres vivos y su entorno.','🌿',2]
  ];
  const synonyms = [
    ['feliz','contento',['triste','lejano','oscuro'], 'Feliz y contento expresan alegría.',1,'😊'],
    ['grande','enorme',['pequeño','lento','débil'],'Grande y enorme expresan un tamaño considerable.',1,'🐘'],
    ['bonito','hermoso',['áspero','vacío','ruidoso'],'Bonito y hermoso significan casi lo mismo.',1,'🌺'],
    ['rápido','veloz',['pesado','lento','quieto'],'Rápido y veloz significan que se mueve con rapidez.',1,'⚡'],
    ['empezar','comenzar',['terminar','olvidar','romper'],'Empezar es lo mismo que comenzar.',1,'🚀'],
    ['alegre','animado',['apagado','furioso','mojado'],'Una persona alegre puede estar animada.',1,'🎈'],
    ['silencioso','callado',['ruidoso','gigante','azul'],'Callado y silencioso se parecen en significado.',1,'🤫'],
    ['pequeño','diminuto',['inmenso','pesado','veloz'],'Diminuto significa muy pequeño.',1,'🐜'],
    ['valiente','audaz',['temeroso','cansado','frío'],'Valiente y audaz describen a quien actúa con coraje.',2,'🦁'],
    ['conversar','dialogar',['escapar','dibujar','saltar'],'Conversar y dialogar significan hablar con otras personas.',2,'💬'],
    ['observar','mirar',['esconder','cantar','correr'],'Observar es mirar con atención.',2,'🔭'],
    ['colaborar','ayudar',['estorbar','empujar','esconder'],'Colaborar es ayudar en una tarea.',2,'🤝'],
    ['escoger','elegir',['repetir','perder','borrar'],'Escoger y elegir indican seleccionar una opción.',2,'🎯'],
    ['proteger','cuidar',['dañar','abandonar','confundir'],'Proteger es cuidar para evitar un daño.',2,'🛡️'],
    ['curioso','inquisitivo',['indiferente','dormido','apagado'],'Una persona curiosa quiere conocer y preguntar.',2,'🧐'],
    ['tranquilo','sereno',['nervioso','acelerado','furioso'],'Tranquilo y sereno describen la calma.',2,'🌅']
  ];
  const scienceQuestions = [
    ['¿Qué necesitan las plantas para crecer?',['Luz, agua y aire','Solo juguetes','Solo oscuridad','Solo arena'],'Luz, agua y aire','Las plantas necesitan agua, luz y aire; también nutrientes del suelo.','🌱',1],
    ['¿Qué astro nos da luz durante el día?',['La Luna','El Sol','Marte','Un cometa'],'El Sol','El Sol es la estrella que nos da luz y calor.','☀️',1],
    ['¿Cuál de estos animales es un mamífero?',['Mariposa','Delfín','Hormiga','Pez payaso'],'Delfín','El delfín es un mamífero y respira aire.','🐬',1],
    ['¿En qué estado está el agua de un cubito de hielo?',['Gaseoso','Líquido','Sólido','Ninguno'],'Sólido','El hielo es agua en estado sólido.','🧊',1],
    ['¿Qué parte del cuerpo nos permite escuchar?',['Las orejas','Los pies','Los dientes','Las rodillas'],'Las orejas','Las orejas y el sistema auditivo nos permiten oír.','👂',1],
    ['¿Dónde viven normalmente los peces?',['En el agua','En las nubes','En el desierto','En una montaña seca'],'En el agua','Los peces viven en ambientes acuáticos.','🐟',1],
    ['¿Qué planeta es nuestro hogar?',['Venus','Saturno','Tierra','Neptuno'],'Tierra','Vivimos en el planeta Tierra.','🌍',1],
    ['¿Cuál de estos objetos puede ser atraído por un imán?',['Un clavo de hierro','Una hoja de papel','Una manzana','Un vaso de vidrio'],'Un clavo de hierro','Los imanes atraen materiales como el hierro.','🧲',1],
    ['¿Cómo se llama el proceso por el que las plantas fabrican alimento usando luz?',['Evaporación','Fotosíntesis','Congelación','Erosión'],'Fotosíntesis','En la fotosíntesis, las plantas aprovechan la energía de la luz.','🍃',2],
    ['¿Qué fuerza nos mantiene sobre el suelo?',['Gravedad','Electricidad','Luz','Sonido'],'Gravedad','La gravedad atrae los objetos hacia la Tierra.','🌎',2],
    ['¿Qué órgano bombea la sangre?',['Pulmones','Corazón','Estómago','Cerebro'],'Corazón','El corazón impulsa la sangre por nuestro cuerpo.','❤️',2],
    ['¿Qué ocurre cuando el agua líquida se convierte en vapor?',['Condensación','Evaporación','Fusión','Solidificación'],'Evaporación','La evaporación es el paso de líquido a gas.','💧',2],
    ['¿Cuál es el planeta más cercano al Sol?',['Júpiter','Marte','Mercurio','Tierra'],'Mercurio','Mercurio es el planeta que está más cerca del Sol.','🪐',2],
    ['¿Qué insecto ayuda a polinizar flores?',['Abeja','Mosquito','Pulga','Termita'],'Abeja','Las abejas trasladan polen entre flores.','🐝',2],
    ['¿Qué nombre recibe el lugar donde vive un ser vivo?',['Hábitat','Órbita','Volcán','Cristal'],'Hábitat','El hábitat es el ambiente donde vive un organismo.','🏞️',2],
    ['¿Qué gas del aire usamos para respirar?',['Helio','Oxígeno','Metano','Neón'],'Oxígeno','Nuestro organismo utiliza el oxígeno para obtener energía.','🫁',2]
  ];
  const recycling = [
    ['Periódico limpio','📰','Papel','El periódico limpio se puede reciclar como papel.',1],
    ['Botella de agua de plástico vacía','🧴','Plástico','Las botellas plásticas limpias suelen ir a plástico.',1],
    ['Botella de vidrio vacía','🍾','Vidrio','Las botellas de vidrio vacías pueden ir al contenedor de vidrio.',1],
    ['Cáscara de plátano','🍌','Orgánico','La cáscara de fruta puede convertirse en compost.',1],
    ['Caja de cartón limpia','📦','Papel','El cartón limpio se reúne con papel y cartón.',1],
    ['Cáscara de manzana','🍎','Orgánico','Los restos de frutas pueden ir al compostaje.',1],
    ['Frasco de vidrio vacío','🫙','Vidrio','Un frasco de vidrio vacío puede reciclarse como vidrio.',1],
    ['Hoja de cuaderno usada','📄','Papel','Las hojas de papel limpias pueden reciclarse.',1],
    ['Envase plástico limpio de champú','🧴','Plástico','Si tu comuna lo acepta, ese envase limpio puede reciclarse como plástico.',2],
    ['Cáscara de huevo','🥚','Orgánico','Las cáscaras de huevo pueden compostarse.',2],
    ['Papel de oficina usado','📑','Papel','El papel de oficina limpio puede reciclarse.',2],
    ['Frasco de mermelada de vidrio vacío','🫙','Vidrio','Los frascos de vidrio limpios pueden reciclarse.',2],
    ['Botella plástica de bebida vacía','🥤','Plástico','Las botellas de plástico limpias pueden reciclarse.',2],
    ['Restos de hojas secas','🍂','Orgánico','Las hojas secas sirven para crear compost.',2],
    ['Tarro de vidrio vacío','🫙','Vidrio','El vidrio puede reutilizarse o reciclarse.',2],
    ['Tubo de cartón de papel higiénico','🧻','Papel','El tubo de cartón limpio se puede reciclar con papel y cartón.',2]
  ];
  function fromBank(bank, convert) {
    const exact = bank.filter(x => (subject === 'lenguaje' && mode === 'sinonimos' ? x[x.length-2] : x[x.length-1]) === level);
    // Hay ocho o más preguntas para cada nivel. Se mezclan de nuevo al reiniciar.
    return shuffle(exact).slice(0, TOTAL).map(convert);
  }
  function makeQuestions() {
    if (subject === 'matematicas') {
      const generator = mode === 'operaciones' ? mathOperations : mathPatterns;
      const output = [], seen = new Set(); let tries = 0;
      while (output.length < TOTAL && tries < 120) {
        const q = generator(); tries++;
        if (!seen.has(q.prompt)) {seen.add(q.prompt); output.push(q);}
      }
      return output;
    }
    if (subject === 'lenguaje') {
      if (mode === 'letras') return fromBank(wordData, ([gap,letter,word,clue,symbol]) => {
        const distractors = shuffle('abcdefghijklmnopqrstuvwxyz'.split('').filter(ch=>ch!==letter)).slice(0,3);
        return question('Completa la palabra',symbol,`¿Qué letra falta? ${gap.toUpperCase()}`,clue,[letter,...distractors],letter,`La palabra es «${word}».`);
      });
      return fromBank(synonyms, ([term,answer,wrong,explain,_level,symbol]) => question('Palabras parecidas',symbol,`¿Qué palabra significa casi lo mismo que «${term}»?`,'Piensa en su significado.',[answer,...wrong],answer,explain));
    }
    if (mode === 'naturaleza') return fromBank(scienceQuestions, ([prompt,options,answer,explain,symbol])=>question('Pregunta científica',symbol,prompt,'¡Usa tu curiosidad!',options,answer,explain));
    return fromBank(recycling, ([item,symbol,answer,explain]) => question('Cuida el planeta',symbol,`¿Dónde pondrías: ${item.toLowerCase()}?`,'Elige el tipo de residuo. Revisa las normas de tu comuna.',['Papel','Plástico','Vidrio','Orgánico'],answer,explain));
  }
  function updateStats(completed) {
    ui.score.textContent = score;
    ui.progressText.textContent = `${completed} de ${questions.length}`;
    ui.progress.querySelector('.progress-fill').style.width = `${completed / questions.length * 100}%`;
    ui.progress.setAttribute('aria-valuenow',String(completed));
    ui.progress.setAttribute('aria-valuemax',String(questions.length));
  }
  function renderQuestion() {
    answered = false;
    ui.stage.hidden = false; ui.results.hidden = true;
    ui.feedback.textContent = ''; ui.feedback.classList.remove('is-error');
    ui.next.hidden = true;
    const q = questions[index];
    ui.tag.textContent = q.tag;
    ui.number.textContent = `Pregunta ${index+1} de ${questions.length}`;
    ui.symbol.textContent = q.symbol;
    ui.question.textContent = q.prompt;
    ui.hint.textContent = q.hint;
    ui.answers.replaceChildren();
    q.options.forEach(opt => {
      const button = document.createElement('button');
      button.type='button'; button.className='answer-button'; button.textContent=opt;
      button.addEventListener('click',()=>answerQuestion(opt));
      ui.answers.appendChild(button);
    });
    updateStats(index);
  }
  function answerQuestion(selected) {
    if (answered) return;
    answered = true;
    const q = questions[index];
    const success = selected === q.answer;
    if (success) score++;
    ui.answers.querySelectorAll('button').forEach(button => {
      button.disabled=true;
      if (button.textContent === q.answer) button.classList.add('correct');
      else if (button.textContent === selected) button.classList.add('incorrect');
    });
    ui.feedback.textContent = `${success ? '🌟 ¡Muy bien!' : '💛 ¡Buen intento!'} ${q.explain}`;
    ui.feedback.classList.toggle('is-error',!success);
    ui.next.hidden = false;
    ui.next.textContent = index + 1 === questions.length ? 'Ver mi resultado 🎉' : 'Siguiente pregunta →';
    updateStats(index+1);
  }
  function finish() {
    ui.stage.hidden = true; ui.results.hidden = false;
    const ratio = score/questions.length;
    ui.finalScore.textContent = `${score} / ${questions.length}`;
    if (ratio === 1) {ui.resultTitle.textContent='¡Increíble, explorador!';ui.resultMessage.textContent='¡Respondiste todo! Puedes probar el otro desafío.';}
    else if (ratio >= .625) {ui.resultTitle.textContent='¡Gran aventura!';ui.resultMessage.textContent='Aprendiste mucho. ¡Juega otra ronda para seguir practicando!';}
    else {ui.resultTitle.textContent='¡Bien por intentarlo!';ui.resultMessage.textContent='Equivocarse también es aprender. ¡Inténtalo otra vez!';}
    ui.results.querySelector('h2').focus();
  }
  function start() {
    questions = makeQuestions(); index=0; score=0; answered=false;
    renderQuestion();
  }
  document.querySelectorAll('.mode-button').forEach(button=>button.addEventListener('click',()=>{
    mode=button.dataset.mode;
    document.querySelectorAll('.mode-button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    start();
  }));
  document.querySelectorAll('.level-button').forEach(button=>button.addEventListener('click',()=>{
    level=Number(button.dataset.level);
    document.querySelectorAll('.level-button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    start();
  }));
  ui.next.addEventListener('click',()=>{ if(!answered)return; if(index===questions.length-1){finish();return;} index++;renderQuestion(); ui.question.focus(); });
  ui.restart.addEventListener('click',start);
  ui.again.addEventListener('click',start);
  start();
})();
