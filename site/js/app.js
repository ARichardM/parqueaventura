/**
 * Lógica principal de PractiJuegos
 * Matemática 3° Básico - Preparación Evaluación Final
 */

class PractiJuegosApp {
  constructor() {
    this.currentView = 'home';
    this.currentMode = null; // 'simulacro' o 'tema'
    this.currentTemaId = null;
    this.questionsList = [];
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;

    // Estadísticas guardadas
    this.stars = parseInt(localStorage.getItem('pj_stars') || '0', 10);
    this.streak = parseInt(localStorage.getItem('pj_streak') || '0', 10);

    this.initElements();
    this.bindEvents();
    this.updateStatsDisplay();
    this.renderTemasGrid();
    this.renderFichasGrid();
  }

  initElements() {
    this.views = {
      home: document.getElementById('view-home'),
      quiz: document.getElementById('view-quiz'),
      results: document.getElementById('view-results'),
      fichas: document.getElementById('view-fichas')
    };

    this.tabs = document.querySelectorAll('.nav-tab');
    this.starsDisplay = document.getElementById('stat-stars');
    this.streakDisplay = document.getElementById('stat-streak');
  }

  bindEvents() {
    // Pestañas de navegación
    this.tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const viewTarget = tab.dataset.view;
        this.switchView(viewTarget);
      });
    });

    // Logo vuelve al home
    document.querySelector('.logo-group').addEventListener('click', () => {
      this.switchView('home');
    });

    // Botón Iniciar Simulacro en el Hero
    document.getElementById('btn-start-simulacro').addEventListener('click', () => {
      this.startSimulacro();
    });

    // Botón Salir del Quiz
    document.getElementById('btn-quit-quiz').addEventListener('click', () => {
      if (confirm('¿Quieres salir y volver al menú principal?')) {
        this.switchView('home');
      }
    });

    // Botón Leer Pregunta en voz alta
    document.getElementById('btn-speak-question').addEventListener('click', () => {
      const q = this.questionsList[this.currentIndex];
      if (q) {
        window.soundFx.speak(q.pregunta);
      }
    });

    // Botones de resultados
    document.getElementById('btn-retry-quiz').addEventListener('click', () => {
      if (this.currentMode === 'simulacro') {
        this.startSimulacro();
      } else {
        this.startTemaQuiz(this.currentTemaId);
      }
    });

    document.getElementById('btn-home-from-results').addEventListener('click', () => {
      this.switchView('home');
    });
  }

  switchView(viewName) {
    this.currentView = viewName;
    Object.keys(this.views).forEach(v => {
      if (this.views[v]) {
        this.views[v].style.display = (v === viewName) ? 'block' : 'none';
      }
    });

    this.tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === viewName);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateStatsDisplay() {
    if (this.starsDisplay) this.starsDisplay.textContent = this.stars;
    if (this.streakDisplay) this.streakDisplay.textContent = this.streak;
  }

  renderTemasGrid() {
    const grid = document.getElementById('temas-grid-container');
    if (!grid) return;

    grid.innerHTML = '';
    Object.values(TEMAS_INFO).forEach(t => {
      const card = document.createElement('div');
      card.className = 'tema-card';
      card.innerHTML = `
        <div class="tema-card-header">
          <div class="tema-icon-box" style="background: ${t.color}20; color: ${t.color}">
            ${t.icono}
          </div>
          <span class="tema-oa-badge">OA ${t.oa}</span>
        </div>
        <h3 class="tema-title">${t.nombre}</h3>
        <p class="tema-desc">Practica ejercicios clave de este tema basados en el libro escolar.</p>
        <button class="tema-btn">Practicar este tema →</button>
      `;
      card.addEventListener('click', () => {
        this.startTemaQuiz(t.id);
      });
      grid.appendChild(card);
    });
  }

  renderFichasGrid() {
    const container = document.getElementById('fichas-grid-container');
    if (!container) return;

    container.innerHTML = '';
    FICHAS_ESTUDIO.forEach(f => {
      const card = document.createElement('div');
      card.className = 'ficha-card';
      const itemsHtml = f.puntos.map(p => `<li>${p}</li>`).join('');
      card.innerHTML = `
        <h3><span>${f.icono}</span> ${f.tema}</h3>
        <ul>${itemsHtml}</ul>
      `;
      container.appendChild(card);
    });
  }

  startSimulacro() {
    this.currentMode = 'simulacro';
    this.currentTemaId = null;

    // Seleccionar al menos 1 pregunta de cada uno de los 11 temas
    const selected = [];
    Object.keys(TEMAS_INFO).forEach(temaId => {
      const temaQuestions = PREGUNTAS_DB.filter(q => q.temaId === parseInt(temaId, 10));
      if (temaQuestions.length > 0) {
        const randQ = temaQuestions[Math.floor(Math.random() * temaQuestions.length)];
        selected.push(randQ);
      }
    });

    // Barajar preguntas
    this.questionsList = selected.sort(() => Math.random() - 0.5);
    this.currentIndex = 0;
    this.score = 0;

    this.switchView('quiz');
    this.renderQuestion();
  }

  startTemaQuiz(temaId) {
    this.currentMode = 'tema';
    this.currentTemaId = temaId;

    const filtered = PREGUNTAS_DB.filter(q => q.temaId === temaId);
    this.questionsList = filtered.length > 0 ? filtered : PREGUNTAS_DB.slice(0, 3);
    this.currentIndex = 0;
    this.score = 0;

    this.switchView('quiz');
    this.renderQuestion();
  }

  renderQuestion() {
    this.answered = false;
    const q = this.questionsList[this.currentIndex];
    const total = this.questionsList.length;

    // Actualizar barra de progreso y título
    document.getElementById('quiz-counter').textContent = `Pregunta ${this.currentIndex + 1} de ${total}`;
    const percent = ((this.currentIndex) / total) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${percent}%`;

    const temaInfo = TEMAS_INFO[q.temaId] || { nombre: "Matemática", icono: "📘" };
    document.getElementById('quiz-tema-badge').innerHTML = `${temaInfo.icono} ${temaInfo.nombre} (OA ${temaInfo.oa})`;

    // Texto de la pregunta
    document.getElementById('question-text').textContent = q.pregunta;

    // Renderizar gráfico o ilustración visual
    const visualBox = document.getElementById('visual-container');
    visualBox.innerHTML = this.buildVisualHtml(q.grafico);

    // Opciones
    const optionsContainer = document.getElementById('options-grid');
    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.opciones.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `
        <span class="option-letter">${letters[idx]}</span>
        <span class="option-text">${opt}</span>
      `;
      btn.addEventListener('click', () => this.handleAnswer(idx, btn));
      optionsContainer.appendChild(btn);
    });

    // Ocultar feedback previo
    document.getElementById('feedback-container').innerHTML = '';
  }

  buildVisualHtml(grafico) {
    if (!grafico) return '';

    switch (grafico.tipo) {
      case 'pictograma': {
        const rows = grafico.datos.map(d => `
          <tr>
            <td style="width: 110px;">${d.etiqueta}</td>
            <td style="font-size: 1.4rem; letter-spacing: 4px;">${d.icono.repeat(d.cantidad)}</td>
            <td style="width: 40px; color: #64748B;">(${d.cantidad})</td>
          </tr>
        `).join('');
        return `
          <div style="width: 100%; max-width: 420px;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #6366F1; margin-bottom: 0.5rem; text-align: center;">
              📗 Pictograma: Cada símbolo = 1 libro
            </div>
            <table class="pictograma-table">${rows}</table>
          </div>
        `;
      }

      case 'barras': {
        const cols = grafico.datos.map(d => `
          <div class="barra-col">
            <div class="barra-rect" style="height: ${d.valor * 24}px; background: ${d.color};">
              ${d.valor}
            </div>
            <div class="barra-label">${d.etiqueta}</div>
          </div>
        `).join('');
        return `<div class="barras-container">${cols}</div>`;
      }

      case 'cuadrado': {
        return `
          <svg class="figura-svg" width="160" height="160" viewBox="0 0 160 160">
            <rect x="25" y="25" width="110" height="110" fill="#E0E7FF" stroke="#4F46E5" stroke-width="4" rx="8"/>
            <text x="80" y="18" font-size="14" font-weight="bold" fill="#4F46E5" text-anchor="middle">${grafico.lado}</text>
            <text x="80" y="152" font-size="14" font-weight="bold" fill="#4F46E5" text-anchor="middle">${grafico.lado}</text>
            <text x="12" y="85" font-size="14" font-weight="bold" fill="#4F46E5" text-anchor="middle">${grafico.lado}</text>
            <text x="148" y="85" font-size="14" font-weight="bold" fill="#4F46E5" text-anchor="middle">${grafico.lado}</text>
          </svg>
        `;
      }

      case 'rectangulo': {
        return `
          <svg class="figura-svg" width="220" height="130" viewBox="0 0 220 130">
            <rect x="25" y="25" width="170" height="80" fill="#D1FAE5" stroke="#10B981" stroke-width="4" rx="8"/>
            <text x="110" y="18" font-size="14" font-weight="bold" fill="#059669" text-anchor="middle">${grafico.largo}</text>
            <text x="110" y="122" font-size="14" font-weight="bold" fill="#059669" text-anchor="middle">${grafico.largo}</text>
            <text x="12" y="70" font-size="14" font-weight="bold" fill="#059669" text-anchor="middle">${grafico.ancho}</text>
            <text x="208" y="70" font-size="14" font-weight="bold" fill="#059669" text-anchor="middle">${grafico.ancho}</text>
          </svg>
        `;
      }

      case 'pizza': {
        // Pizza dividida en 4 partes con 1 resaltada
        return `
          <svg class="pizza-svg" width="150" height="150" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#FFEAA7" stroke="#FDCB6E" stroke-width="4"/>
            <!-- Porción 1 comidita -->
            <path d="M 50 50 L 50 5 A 45 45 0 0 1 95 50 Z" fill="#FF7675" stroke="#D63031" stroke-width="2"/>
            <!-- Líneas de corte -->
            <line x1="50" y1="5" x2="50" y2="95" stroke="#D63031" stroke-width="2"/>
            <line x1="5" y1="50" x2="95" y2="50" stroke="#D63031" stroke-width="2"/>
            <circle cx="50" cy="50" r="4" fill="#D63031"/>
          </svg>
        `;
      }

      case 'chocolate': {
        return `
          <svg width="200" height="90" viewBox="0 0 200 90">
            <rect x="10" y="15" width="90" height="60" fill="#6C5CE7" stroke="#4834D4" stroke-width="3" rx="6"/>
            <rect x="100" y="15" width="90" height="60" fill="#DFE6E9" stroke="#B2BEC3" stroke-width="3" rx="6"/>
            <text x="55" y="52" fill="white" font-weight="bold" font-size="16" text-anchor="middle">1 / 2</text>
            <text x="145" y="52" fill="#636E72" font-weight="bold" font-size="16" text-anchor="middle">1 / 2</text>
          </svg>
        `;
      }

      case 'operacion_vertical': {
        return `
          <div style="background: white; padding: 1rem 1.5rem; border-radius: 12px; border: 2px solid #E2E8F0; box-shadow: var(--shadow-sm);">
            <div class="operacion-box">
              <div>&nbsp;&nbsp;${grafico.n1}</div>
              <div>${grafico.op} ${grafico.n2}</div>
            </div>
          </div>
        `;
      }

      case 'secuencia': {
        const chips = grafico.numeros.map(n => `
          <div class="chip-num ${n === '❓' ? 'chip-q' : ''}">${n}</div>
        `).join('<span style="font-size: 1.5rem; color: #94A3B8;">➜</span>');
        return `<div class="secuencia-chips">${chips}</div>`;
      }

      case 'balanza': {
        return `
          <div style="font-size: 3rem; text-align: center;">
            ⚖️
            <div style="font-size: 1.1rem; font-weight: 800; color: #0284C7; margin-top: 0.5rem;">
              1 kilogramo = 1.000 gramos
            </div>
          </div>
        `;
      }

      case 'figuras3d': {
        return `
          <div style="display: flex; gap: 2rem; font-size: 3rem; justify-content: center; align-items: center;">
            <div title="Cubo">🎲<span style="display:block; font-size: 0.85rem; font-weight:700; color:#475569;">Cubo</span></div>
            <div title="Cilindro">🛢️<span style="display:block; font-size: 0.85rem; font-weight:700; color:#475569;">Cilindro</span></div>
            <div title="Esfera">⚽<span style="display:block; font-size: 0.85rem; font-weight:700; color:#475569;">Esfera</span></div>
          </div>
        `;
      }

      default:
        return '';
    }
  }

  handleAnswer(selectedIdx, btnElement) {
    if (this.answered) return;
    this.answered = true;

    const q = this.questionsList[this.currentIndex];
    const isCorrect = (selectedIdx === q.correcta);
    const allButtons = document.querySelectorAll('.option-btn');

    allButtons.forEach((b, idx) => {
      b.style.pointerEvents = 'none';
      if (idx === q.correcta) {
        b.classList.add('correct');
      } else if (idx === selectedIdx && !isCorrect) {
        b.classList.add('wrong');
      }
    });

    if (isCorrect) {
      this.score++;
      this.stars += 2;
      this.streak++;
      localStorage.setItem('pj_stars', this.stars);
      localStorage.setItem('pj_streak', this.streak);
      this.updateStatsDisplay();

      window.soundFx.playCorrect();
      window.confetti.burst(50);
      this.showFeedback(true, q.explicacion);
    } else {
      this.streak = 0;
      localStorage.setItem('pj_streak', '0');
      this.updateStatsDisplay();

      window.soundFx.playWrong();
      this.showFeedback(false, q.explicacion);
    }
  }

  showFeedback(isCorrect, explicacion) {
    const container = document.getElementById('feedback-container');
    const isLast = (this.currentIndex === this.questionsList.length - 1);

    container.innerHTML = `
      <div class="feedback-card ${isCorrect ? 'correct' : 'wrong'}">
        <div class="feedback-icon">${isCorrect ? '🌟' : '💡'}</div>
        <div class="feedback-body" style="flex: 1;">
          <h4>${isCorrect ? '¡Excelente respuesta!' : '¡Buen intento! Recuerda:'}</h4>
          <p>${explicacion}</p>
          <button id="btn-next-question" class="btn-next">
            ${isLast ? 'Ver Resultados Finales 🏆' : 'Siguiente Desafío ➜'}
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-next-question').addEventListener('click', () => {
      this.nextQuestion();
    });
  }

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.questionsList.length) {
      this.renderQuestion();
    } else {
      this.showResults();
    }
  }

  showResults() {
    this.switchView('results');
    const total = this.questionsList.length;
    const percent = Math.round((this.score / total) * 100);

    document.getElementById('results-score-text').textContent = `${this.score} / ${total} Correctas`;
    
    let starsStr = '⭐';
    let msg = '¡Buen entrenamiento! Sigue practicando un poco más.';
    if (percent >= 90) {
      starsStr = '⭐⭐⭐';
      msg = '¡EXTRAORDINARIO! ¡Dominas la materia y estás 100% lista para la prueba!';
      window.soundFx.playWin();
      window.confetti.burst(120);
    } else if (percent >= 60) {
      starsStr = '⭐⭐';
      msg = '¡Muy buen trabajo! Ya tienes casi todos los temas dominados.';
      window.soundFx.playWin();
      window.confetti.burst(70);
    } else {
      starsStr = '⭐';
      msg = '¡Buen intento! Revisa las Fichas de Estudio y vuelve a intentarlo para sacar 3 estrellas.';
    }

    document.getElementById('results-stars').textContent = starsStr;
    document.getElementById('results-msg').textContent = msg;
  }
}

// Iniciar aplicación al cargar
document.addEventListener('DOMContentLoaded', () => {
  window.app = new PractiJuegosApp();
});
