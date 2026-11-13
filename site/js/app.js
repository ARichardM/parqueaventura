/**
 * Lógica principal de PractiJuegos
 * Matemática 3° Básico - Desafíos y Repaso Interactivo
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

    // Filtro activo para fichas
    this.activeFilter = 'all';

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
      tab.addEventListener('click', () => {
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

    // Botón Leer Pregunta en voz alta con animación amigable
    const speakBtn = document.getElementById('btn-speak-question');
    speakBtn.addEventListener('click', () => {
      const q = this.questionsList[this.currentIndex];
      if (q) {
        speakBtn.textContent = '🗣️';
        speakBtn.style.transform = 'scale(1.15)';
        speakBtn.style.background = '#FEF08A';
        window.soundFx.speak(
          q.pregunta,
          () => {
            speakBtn.textContent = '🗣️';
          },
          () => {
            speakBtn.textContent = '🔊';
            speakBtn.style.transform = 'scale(1)';
            speakBtn.style.background = '#FFFBEB';
          }
        );
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

    // Filtros de fichas
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.activeFilter = chip.dataset.filter;
        this.renderFichasGrid();
      });
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

  // Renderizado de Fichas Interactivas y vistosas
  renderFichasGrid() {
    const container = document.getElementById('fichas-grid-container');
    if (!container) return;

    container.innerHTML = '';
    const filteredFichas = FICHAS_ESTUDIO.filter(f => {
      if (this.activeFilter === 'all') return true;
      return f.categoria === this.activeFilter;
    });

    filteredFichas.forEach(f => {
      const card = document.createElement('div');
      card.className = 'ficha-card-interactive';
      const itemsHtml = f.puntos.map(p => `<li>${p}</li>`).join('');
      const widgetHtml = this.buildInteractiveWidget(f.widget, f.id);

      card.innerHTML = `
        <div class="ficha-header-bar" style="background: linear-gradient(135deg, ${f.color}, #6366F1);">
          <div class="ficha-header-title">
            <span style="font-size: 1.8rem;">${f.icono}</span>
            <h3>${f.tema}</h3>
          </div>
          <span class="badge-interactive">⚡ Interactivo</span>
        </div>

        <div class="ficha-content-body">
          <div class="regla-oro-box">
            <strong>💡 Regla de oro:</strong> ${f.regla}
          </div>

          <div class="ficha-widget-box">
            <div class="widget-label">🛠️ Mini-Laboratorio Interactivo</div>
            ${widgetHtml}
          </div>

          <div>
            <strong style="display:block; font-size: 0.95rem; margin-bottom: 0.4rem; color: #1E293B;">
              📋 Puntos clave del libro:
            </strong>
            <ul class="ficha-puntos-list">${itemsHtml}</ul>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    // Enlazar interactividad de los widgets después de montarlos
    this.bindWidgetInteractions();
  }

  // Generador de Mini-Laboratorios interactivos para las Fichas
  buildInteractiveWidget(tipo, fichaId) {
    switch (tipo) {
      case 'pictograma':
        return `
          <div>
            <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.5rem;">
              Haz clic para agregar frutas y mira cómo cambia el pictograma:
            </p>
            <div style="display: flex; gap: 0.4rem; margin-bottom: 0.75rem;">
              <button class="btn-stepper" id="btn-add-manzana" title="Agregar manzana" style="width: auto; padding: 0 0.6rem; font-size: 0.9rem;">🍎 +1</button>
              <button class="btn-stepper" id="btn-add-platano" title="Agregar plátano" style="width: auto; padding: 0 0.6rem; font-size: 0.9rem;">🍌 +1</button>
              <button class="btn-stepper" id="btn-reset-frutas" title="Reiniciar" style="width: auto; padding: 0 0.6rem; font-size: 0.85rem; color: #64748B;">🔄</button>
            </div>
            <div id="demo-pictograma-display" style="font-size: 1.1rem; line-height: 1.6; background: white; padding: 0.5rem; border-radius: 8px; border: 1px solid #E2E8F0;">
              Manzanas: 🍎🍎🍎 (3)<br>
              Plátanos: 🍌🍌 (2)
            </div>
          </div>
        `;

      case 'figuras3d':
        return `
          <div>
            <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.5rem;">
              Toca una figura para probar si se puede apilar en una torre:
            </p>
            <div style="display: flex; gap: 0.5rem; justify-content: space-around;">
              <button class="btn-stepper demo-shape-btn" data-shape="cubo" style="width: auto; padding: 0.4rem 0.6rem; font-size: 1.2rem;">🎲 Cubo</button>
              <button class="btn-stepper demo-shape-btn" data-shape="cilindro" style="width: auto; padding: 0.4rem 0.6rem; font-size: 1.2rem;">🛢️ Cilindro</button>
              <button class="btn-stepper demo-shape-btn" data-shape="esfera" style="width: auto; padding: 0.4rem 0.6rem; font-size: 1.2rem;">⚽ Esfera</button>
            </div>
            <div id="demo-shape-result" class="widget-result-badge" style="width: 100%; margin-top: 0.6rem; background: #6366F1;">
              🎲 ¡El cubo tiene caras planas! Se puede apilar perfectamente.
            </div>
          </div>
        `;

      case 'perimetro':
        return `
          <div>
            <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.5rem;">
              Cambia las medidas del rectángulo y observa el perímetro:
            </p>
            <div class="widget-control-row">
              <span style="font-weight: 700; font-size: 0.9rem;">Largo: <b id="val-largo">6</b> cm</span>
              <div style="display: flex; gap: 0.3rem;">
                <button class="btn-stepper" id="btn-sub-largo">-</button>
                <button class="btn-stepper" id="btn-add-largo">+</button>
              </div>
            </div>
            <div class="widget-control-row">
              <span style="font-weight: 700; font-size: 0.9rem;">Ancho: <b id="val-ancho">3</b> cm</span>
              <div style="display: flex; gap: 0.3rem;">
                <button class="btn-stepper" id="btn-sub-ancho">-</button>
                <button class="btn-stepper" id="btn-add-ancho">+</button>
              </div>
            </div>
            <div id="demo-perimetro-calc" class="widget-result-badge" style="width: 100%;">
              P = 6 + 3 + 6 + 3 = 18 cm
            </div>
          </div>
        `;

      case 'peso':
        return `
          <div>
            <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.5rem;">
              Convertidor instantáneo de Kilogramos a Gramos:
            </p>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="range" id="slider-peso" min="1" max="10" value="2" style="flex: 1; accent-color: #FD9644;">
              <span id="slider-peso-label" style="font-weight: 800; font-size: 1rem; width: 50px;">2 kg</span>
            </div>
            <div id="demo-peso-result" class="widget-result-badge" style="width: 100%; background: #FD9644;">
              ⚖️ 2 kg equivalen a 2.000 gramos
            </div>
          </div>
        `;

      case 'descomposicion':
        return `
          <div>
            <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.5rem;">
              Escribe un número hasta 999 para descomponerlo:
            </p>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <input type="number" id="input-desc-num" value="356" min="1" max="999" style="width: 80px; padding: 0.35rem 0.5rem; font-weight: 800; font-size: 1.1rem; border: 2px solid #CBD5E1; border-radius: 8px;">
              <button class="btn-stepper" id="btn-desc-calc" style="width: auto; padding: 0 0.8rem; font-size: 0.9rem;">Descomponer ➜</button>
            </div>
            <div id="demo-desc-result" class="widget-result-badge" style="width: 100%; background: #0984E3; margin-top: 0.5rem;">
              356 = 300 + 50 + 6 (3C + 5D + 6U)
            </div>
          </div>
        `;

      case 'operaciones':
        return `
          <div>
            <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.5rem;">
              Ejemplo visual con reserva y canje:
            </p>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn-stepper" id="btn-demo-suma" style="flex: 1; font-size: 0.9rem; font-weight: 700;">➕ Suma (268 + 157)</button>
              <button class="btn-stepper" id="btn-demo-resta" style="flex: 1; font-size: 0.9rem; font-weight: 700;">➖ Resta (452 - 178)</button>
            </div>
            <div id="demo-op-result" style="background: white; border: 1.5px solid #CBD5E1; border-radius: 8px; padding: 0.6rem; margin-top: 0.5rem; font-family: monospace; font-size: 1.1rem; text-align: center; font-weight: 800;">
              268 + 157 = 425 (con reserva)
            </div>
          </div>
        `;

      case 'multiplicacion':
        return `
          <div>
            <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.5rem;">
              Suma reiterada: <b id="demo-mult-label">4 veces 3</b>
            </p>
            <div style="display: flex; gap: 0.4rem; margin-bottom: 0.5rem;">
              <button class="btn-stepper" id="btn-mult-3x3" style="width: auto; padding: 0 0.5rem; font-size: 0.85rem;">3 × 3</button>
              <button class="btn-stepper" id="btn-mult-4x3" style="width: auto; padding: 0 0.5rem; font-size: 0.85rem;">4 × 3</button>
              <button class="btn-stepper" id="btn-mult-5x4" style="width: auto; padding: 0 0.5rem; font-size: 0.85rem;">5 × 4</button>
            </div>
            <div id="demo-mult-visual" class="widget-result-badge" style="width: 100%; background: #2ED573;">
              3 + 3 + 3 + 3 = 12 ⭐ (4 × 3 = 12)
            </div>
          </div>
        `;

      case 'division':
        return `
          <div>
            <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.5rem;">
              Reparto equitativo: <b>9 bolitas en 3 grupos</b>
            </p>
            <div id="demo-div-visual" style="display: flex; gap: 0.5rem; justify-content: center; background: white; padding: 0.5rem; border-radius: 8px; border: 1px solid #E2E8F0;">
              <div style="background: #EFF6FF; border: 1px solid #93C5FD; padding: 0.3rem 0.6rem; border-radius: 6px;">🔵🔵🔵 (3)</div>
              <div style="background: #EFF6FF; border: 1px solid #93C5FD; padding: 0.3rem 0.6rem; border-radius: 6px;">🔵🔵🔵 (3)</div>
              <div style="background: #EFF6FF; border: 1px solid #93C5FD; padding: 0.3rem 0.6rem; border-radius: 6px;">🔵🔵🔵 (3)</div>
            </div>
            <div class="widget-result-badge" style="width: 100%; background: #1E90FF; margin-top: 0.5rem;">
              9 ÷ 3 = 3 bolitas por grupo
            </div>
          </div>
        `;

      case 'problemas':
        return `
          <div>
            <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.5rem;">
              Simulador de compras: Compras 3 lápices de $200 y pagas con $1.000
            </p>
            <div id="demo-prob-result" class="widget-result-badge" style="width: 100%; background: #FFA502;">
              Total: $600 | Tu vuelto: $400 💵
            </div>
          </div>
        `;

      case 'fracciones':
        return `
          <div>
            <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.5rem;">
              Toca una porción para ver su nombre:
            </p>
            <div style="display: flex; gap: 0.4rem; justify-content: center;">
              <button class="btn-stepper demo-frac-btn" data-frac="1/4" style="width: auto; padding: 0 0.6rem; font-size: 0.9rem;">1 / 4</button>
              <button class="btn-stepper demo-frac-btn" data-frac="1/2" style="width: auto; padding: 0 0.6rem; font-size: 0.9rem;">1 / 2</button>
              <button class="btn-stepper demo-frac-btn" data-frac="3/4" style="width: auto; padding: 0 0.6rem; font-size: 0.9rem;">3 / 4</button>
            </div>
            <div id="demo-frac-result" class="widget-result-badge" style="width: 100%; background: #FF4757; margin-top: 0.5rem;">
              🍕 1/4 representa un cuarto (1 de 4 partes iguales)
            </div>
          </div>
        `;

      case 'patrones':
        return `
          <div>
            <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.5rem;">
              Prueba secuencias con distintas reglas:
            </p>
            <div style="display: flex; gap: 0.4rem; justify-content: center;">
              <button class="btn-stepper demo-pat-btn" data-rule="+2" style="width: auto; padding: 0 0.6rem; font-size: 0.9rem;">+2</button>
              <button class="btn-stepper demo-pat-btn" data-rule="+5" style="width: auto; padding: 0 0.6rem; font-size: 0.9rem;">+5</button>
              <button class="btn-stepper demo-pat-btn" data-rule="-10" style="width: auto; padding: 0 0.6rem; font-size: 0.9rem;">-10</button>
            </div>
            <div id="demo-pat-result" class="widget-result-badge" style="width: 100%; background: #8E44AD; margin-top: 0.5rem;">
              🔁 2, 4, 6, 8, 10... (Sumar 2)
            </div>
          </div>
        `;

      default:
        return `<div class="widget-result-badge" style="background:#6366F1;">¡A practicar!</div>`;
    }
  }

  // Enlazar eventos de los Mini-Laboratorios
  bindWidgetInteractions() {
    // 1. Pictograma
    let manzanas = 3;
    let platanos = 2;
    const addManzana = document.getElementById('btn-add-manzana');
    const addPlatano = document.getElementById('btn-add-platano');
    const resetFrutas = document.getElementById('btn-reset-frutas');
    const displayFrutas = document.getElementById('demo-pictograma-display');

    if (addManzana && displayFrutas) {
      addManzana.addEventListener('click', () => {
        if (manzanas < 8) manzanas++;
        displayFrutas.innerHTML = `Manzanas: ${'🍎'.repeat(manzanas)} (${manzanas})<br>Plátanos: ${'🍌'.repeat(platanos)} (${platanos})`;
      });
      addPlatano.addEventListener('click', () => {
        if (platanos < 8) platanos++;
        displayFrutas.innerHTML = `Manzanas: ${'🍎'.repeat(manzanas)} (${manzanas})<br>Plátanos: ${'🍌'.repeat(platanos)} (${platanos})`;
      });
      resetFrutas.addEventListener('click', () => {
        manzanas = 1; platanos = 1;
        displayFrutas.innerHTML = `Manzanas: 🍎 (1)<br>Plátanos: 🍌 (1)`;
      });
    }

    // 2. Figuras 3D
    document.querySelectorAll('.demo-shape-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const shape = btn.dataset.shape;
        const res = document.getElementById('demo-shape-result');
        if (!res) return;
        if (shape === 'cubo') {
          res.textContent = '🎲 ¡El cubo tiene 6 caras planas! Se puede apilar perfectamente.';
          res.style.background = '#10B981';
        } else if (shape === 'cilindro') {
          res.textContent = '🛢️ ¡El cilindro tiene 2 caras planas circulares! Se puede apilar verticalmente.';
          res.style.background = '#6366F1';
        } else {
          res.textContent = '⚽ ¡La esfera no tiene caras planas! Rueda y NO se puede apilar en una torre.';
          res.style.background = '#EF4444';
        }
      });
    });

    // 3. Perímetro
    let largo = 6;
    let ancho = 3;
    const valLargo = document.getElementById('val-largo');
    const valAncho = document.getElementById('val-ancho');
    const calcPerim = document.getElementById('demo-perimetro-calc');

    const updatePerim = () => {
      if (valLargo) valLargo.textContent = largo;
      if (valAncho) valAncho.textContent = ancho;
      const p = 2 * (largo + ancho);
      if (calcPerim) calcPerim.textContent = `P = ${largo} + ${ancho} + ${largo} + ${ancho} = ${p} cm`;
    };

    const btnAddL = document.getElementById('btn-add-largo');
    const btnSubL = document.getElementById('btn-sub-largo');
    const btnAddA = document.getElementById('btn-add-ancho');
    const btnSubA = document.getElementById('btn-sub-ancho');

    if (btnAddL) btnAddL.addEventListener('click', () => { if (largo < 15) largo++; updatePerim(); });
    if (btnSubL) btnSubL.addEventListener('click', () => { if (largo > 2) largo--; updatePerim(); });
    if (btnAddA) btnAddA.addEventListener('click', () => { if (ancho < 10) ancho++; updatePerim(); });
    if (btnSubA) btnSubA.addEventListener('click', () => { if (ancho > 1) ancho--; updatePerim(); });

    // 4. Peso
    const sliderPeso = document.getElementById('slider-peso');
    const labelPeso = document.getElementById('slider-peso-label');
    const resPeso = document.getElementById('demo-peso-result');

    if (sliderPeso && labelPeso && resPeso) {
      sliderPeso.addEventListener('input', () => {
        const kg = sliderPeso.value;
        labelPeso.textContent = `${kg} kg`;
        const g = (kg * 1000).toLocaleString('es-CL');
        resPeso.textContent = `⚖️ ${kg} kg equivalen a ${g} gramos`;
      });
    }

    // 5. Descomposición
    const inputDesc = document.getElementById('input-desc-num');
    const btnDesc = document.getElementById('btn-desc-calc');
    const resDesc = document.getElementById('demo-desc-result');

    if (inputDesc && btnDesc && resDesc) {
      btnDesc.addEventListener('click', () => {
        let n = parseInt(inputDesc.value, 10);
        if (isNaN(n) || n < 1) n = 100;
        if (n > 999) n = 999;
        inputDesc.value = n;
        const c = Math.floor(n / 100) * 100;
        const d = Math.floor((n % 100) / 10) * 10;
        const u = n % 10;
        resDesc.textContent = `${n} = ${c} + ${d} + ${u} (${c/100}C + ${d/10}D + ${u}U)`;
      });
    }

    // 6. Operaciones
    const btnDemoSuma = document.getElementById('btn-demo-suma');
    const btnDemoResta = document.getElementById('btn-demo-resta');
    const resOp = document.getElementById('demo-op-result');
    if (btnDemoSuma && btnDemoResta && resOp) {
      btnDemoSuma.addEventListener('click', () => {
        resOp.textContent = '268 + 157 = 425 (reserva en decenas y centenas)';
      });
      btnDemoResta.addEventListener('click', () => {
        resOp.textContent = '452 - 178 = 274 (canje en unidades y decenas)';
      });
    }

    // 7. Fracciones
    document.querySelectorAll('.demo-frac-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const frac = btn.dataset.frac;
        const res = document.getElementById('demo-frac-result');
        if (!res) return;
        if (frac === '1/4') {
          res.textContent = '🍕 1/4 representa un cuarto (1 de 4 partes iguales)';
        } else if (frac === '1/2') {
          res.textContent = '🍕 1/2 representa un medio (la mitad justa)';
        } else {
          res.textContent = '🍕 3/4 representa tres cuartos (3 de 4 partes iguales)';
        }
      });
    });

    // 8. Patrones
    document.querySelectorAll('.demo-pat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const rule = btn.dataset.rule;
        const res = document.getElementById('demo-pat-result');
        if (!res) return;
        if (rule === '+2') {
          res.textContent = '🔁 2, 4, 6, 8, 10, 12... (Regla: Sumar 2)';
        } else if (rule === '+5') {
          res.textContent = '🔁 5, 10, 15, 20, 25, 30... (Regla: Sumar 5)';
        } else {
          res.textContent = '🔁 100, 90, 80, 70, 60, 50... (Regla: Restar 10)';
        }
      });
    });
  }

  startSimulacro() {
    this.currentMode = 'simulacro';
    this.currentTemaId = null;

    // Seleccionar 1 pregunta de cada uno de los 11 temas
    const selected = [];
    Object.keys(TEMAS_INFO).forEach(temaId => {
      const temaQuestions = PREGUNTAS_DB.filter(q => q.temaId === parseInt(temaId, 10));
      if (temaQuestions.length > 0) {
        const randQ = temaQuestions[Math.floor(Math.random() * temaQuestions.length)];
        selected.push(randQ);
      }
    });

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

    const temaInfo = TEMAS_INFO[q.temaId] || { nombre: "Matemática", icono: "📘", oa: "" };
    document.getElementById('quiz-tema-badge').innerHTML = `${temaInfo.icono} ${temaInfo.nombre} (OA ${temaInfo.oa})`;

    // Texto de la pregunta
    document.getElementById('question-text').textContent = q.pregunta;

    // Renderizar gráfico con CERO solapamientos
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

  // Construcción de Gráficos Visuales Impecables (Garantiza que ningún texto se corte)
  buildVisualHtml(grafico) {
    if (!grafico) return '';

    switch (grafico.tipo) {
      // 1. CUADRADO DE PERÍMETRO CON PÍLDORAS CLARAS
      case 'cuadrado': {
        return `
          <svg class="figura-svg" width="260" height="220" viewBox="0 0 260 220" style="overflow: visible;">
            <!-- Sombra -->
            <rect x="74" y="54" width="120" height="120" fill="#E2E8F0" rx="14"/>
            <!-- Cuadrado Principal -->
            <rect x="70" y="50" width="120" height="120" fill="#EEF2FF" stroke="#4F46E5" stroke-width="4" rx="12"/>
            
            <!-- Etiqueta Arriba -->
            <rect x="105" y="14" width="50" height="26" fill="#4F46E5" rx="6"/>
            <text x="130" y="32" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">4 cm</text>
            
            <!-- Etiqueta Abajo -->
            <rect x="105" y="180" width="50" height="26" fill="#4F46E5" rx="6"/>
            <text x="130" y="198" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">4 cm</text>
            
            <!-- Etiqueta Izquierda (Con margen seguro) -->
            <rect x="10" y="97" width="50" height="26" fill="#4F46E5" rx="6"/>
            <text x="35" y="115" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">4 cm</text>
            
            <!-- Etiqueta Derecha (Con margen seguro) -->
            <rect x="200" y="97" width="50" height="26" fill="#4F46E5" rx="6"/>
            <text x="225" y="115" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">4 cm</text>
          </svg>
        `;
      }

      // 2. RECTÁNGULO DE PERÍMETRO CON PÍLDORAS CLARAS
      case 'rectangulo': {
        return `
          <svg class="figura-svg" width="300" height="200" viewBox="0 0 300 200" style="overflow: visible;">
            <!-- Sombra -->
            <rect x="69" y="54" width="170" height="90" fill="#E2E8F0" rx="14"/>
            <!-- Rectángulo Principal -->
            <rect x="65" y="50" width="170" height="90" fill="#D1FAE5" stroke="#10B981" stroke-width="4" rx="12"/>
            
            <!-- Arriba (Largo) -->
            <rect x="125" y="14" width="50" height="26" fill="#10B981" rx="6"/>
            <text x="150" y="32" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">6 cm</text>
            
            <!-- Abajo (Largo) -->
            <rect x="125" y="150" width="50" height="26" fill="#10B981" rx="6"/>
            <text x="150" y="168" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">6 cm</text>
            
            <!-- Izquierda (Ancho) -->
            <rect x="8" y="82" width="50" height="26" fill="#10B981" rx="6"/>
            <text x="33" y="100" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">3 cm</text>
            
            <!-- Derecha (Ancho) -->
            <rect x="242" y="82" width="50" height="26" fill="#10B981" rx="6"/>
            <text x="267" y="100" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">3 cm</text>
          </svg>
        `;
      }

      // 3. PIZZA CON REBANADA DE 1/4 DESTACADA
      case 'pizza': {
        return `
          <svg class="pizza-svg" width="180" height="180" viewBox="0 0 180 180">
            <!-- Base de masa -->
            <circle cx="90" cy="90" r="75" fill="#FED7AA" stroke="#F97316" stroke-width="5"/>
            <circle cx="90" cy="90" r="66" fill="#FEF08A"/>
            
            <!-- Rebanada 1/4 destacada (desplazada hacia arriba) -->
            <g transform="translate(6, -6)">
              <path d="M 90 90 L 90 24 A 66 66 0 0 1 156 90 Z" fill="#F87171" stroke="#DC2626" stroke-width="2.5"/>
              <circle cx="118" cy="55" r="7" fill="#B91C1C"/>
              <circle cx="132" cy="74" r="6" fill="#B91C1C"/>
              <rect x="105" y="62" width="36" height="22" fill="#FFFFFF" rx="4"/>
              <text x="123" y="77" font-size="12" font-weight="900" fill="#DC2626" text-anchor="middle">1/4</text>
            </g>
            
            <!-- Otras 3 porciones de 1/4 -->
            <path d="M 90 90 L 156 90 A 66 66 0 0 1 90 156 Z" fill="#FEF08A" stroke="#EA580C" stroke-width="2"/>
            <circle cx="120" cy="120" r="7" fill="#EA580C"/>
            <path d="M 90 90 L 90 156 A 66 66 0 0 1 24 90 Z" fill="#FEF08A" stroke="#EA580C" stroke-width="2"/>
            <circle cx="60" cy="120" r="7" fill="#EA580C"/>
            <path d="M 90 90 L 24 90 A 66 66 0 0 1 90 24 Z" fill="#FEF08A" stroke="#EA580C" stroke-width="2"/>
            <circle cx="60" cy="60" r="7" fill="#EA580C"/>
            <circle cx="90" cy="90" r="5" fill="#9A3412"/>
          </svg>
        `;
      }

      // 4. BARRA DE CHOCOLATE PARTIDA EN 2 MITADES (1/2)
      case 'chocolate': {
        return `
          <svg width="220" height="110" viewBox="0 0 220 110">
            <!-- Mitad 1 -->
            <g transform="translate(10, 10)">
              <rect x="0" y="0" width="90" height="70" fill="#78350F" stroke="#451A03" stroke-width="3" rx="8"/>
              <rect x="8" y="8" width="74" height="54" fill="#92400E" rx="4"/>
              <rect x="25" y="22" width="40" height="26" fill="#F59E0B" rx="6"/>
              <text x="45" y="40" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">1 / 2</text>
              <text x="45" y="88" font-size="12" font-weight="800" fill="#78350F" text-anchor="middle">Mitad 1</text>
            </g>
            <!-- Mitad 2 -->
            <g transform="translate(115, 10)">
              <rect x="0" y="0" width="90" height="70" fill="#78350F" stroke="#451A03" stroke-width="3" rx="8"/>
              <rect x="8" y="8" width="74" height="54" fill="#92400E" rx="4"/>
              <rect x="25" y="22" width="40" height="26" fill="#64748B" rx="6"/>
              <text x="45" y="40" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">1 / 2</text>
              <text x="45" y="88" font-size="12" font-weight="800" fill="#78350F" text-anchor="middle">Mitad 2</text>
            </g>
          </svg>
        `;
      }

      // 5. BALANZA ILUSTRADA 1 kg = 1.000 g
      case 'balanza': {
        return `
          <svg width="240" height="140" viewBox="0 0 240 140">
            <!-- Base -->
            <path d="M 70 130 L 170 130 L 140 105 L 100 105 Z" fill="#94A3B8"/>
            <rect x="116" y="35" width="8" height="75" fill="#64748B"/>
            <circle cx="120" cy="35" r="7" fill="#F59E0B"/>
            <!-- Barra horizontal nivelada -->
            <rect x="30" y="32" width="180" height="6" fill="#64748B" rx="3"/>
            <!-- Cuerdas -->
            <line x1="45" y1="35" x2="30" y2="75" stroke="#94A3B8" stroke-width="2"/>
            <line x1="45" y1="35" x2="60" y2="75" stroke="#94A3B8" stroke-width="2"/>
            <line x1="195" y1="35" x2="180" y2="75" stroke="#94A3B8" stroke-width="2"/>
            <line x1="195" y1="35" x2="210" y2="75" stroke="#94A3B8" stroke-width="2"/>
            <!-- Platillos -->
            <ellipse cx="45" cy="75" rx="25" ry="6" fill="#CBD5E1"/>
            <ellipse cx="195" cy="75" rx="25" ry="6" fill="#CBD5E1"/>
            <!-- Pesa 1 kg -->
            <rect x="33" y="55" width="24" height="20" fill="#F59E0B" rx="3"/>
            <text x="45" y="69" font-size="9" font-weight="900" fill="#FFFFFF" text-anchor="middle">1 kg</text>
            <!-- Pesa 1000g -->
            <rect x="178" y="55" width="34" height="20" fill="#0EA5E9" rx="3"/>
            <text x="195" y="69" font-size="8" font-weight="900" fill="#FFFFFF" text-anchor="middle">1000g</text>
            <text x="120" y="15" font-size="14" font-weight="900" fill="#0F172A" text-anchor="middle">1 kg = 1.000 g</text>
          </svg>
        `;
      }

      // 6. DOS PAQUETES DE 500g (AZÚCAR)
      case 'paquetes': {
        return `
          <svg width="280" height="130" viewBox="0 0 280 130" class="figura-svg">
            <!-- Paquete 1 -->
            <g transform="translate(15, 8)">
              <rect x="0" y="10" width="80" height="85" fill="#E0F2FE" stroke="#0284C7" stroke-width="3" rx="10"/>
              <rect x="10" y="0" width="60" height="16" fill="#BAE6FD" stroke="#0284C7" stroke-width="2" rx="4"/>
              <text x="40" y="42" font-size="10" font-weight="900" fill="#0369A1" text-anchor="middle">AZÚCAR</text>
              <rect x="15" y="52" width="50" height="26" fill="#0284C7" rx="6"/>
              <text x="40" y="70" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle">500 g</text>
            </g>
            <!-- Signo Más -->
            <circle cx="140" cy="55" r="18" fill="#EEF2FF"/>
            <text x="140" y="63" font-size="24" font-weight="900" fill="#4F46E5" text-anchor="middle">+</text>
            <!-- Paquete 2 -->
            <g transform="translate(185, 8)">
              <rect x="0" y="10" width="80" height="85" fill="#E0F2FE" stroke="#0284C7" stroke-width="3" rx="10"/>
              <rect x="10" y="0" width="60" height="16" fill="#BAE6FD" stroke="#0284C7" stroke-width="2" rx="4"/>
              <text x="40" y="42" font-size="10" font-weight="900" fill="#0369A1" text-anchor="middle">AZÚCAR</text>
              <rect x="15" y="52" width="50" height="26" fill="#0284C7" rx="6"/>
              <text x="40" y="70" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle">500 g</text>
            </g>
            <text x="140" y="118" font-size="12" font-weight="800" fill="#64748B" text-anchor="middle">500 g + 500 g = ?</text>
          </svg>
        `;
      }

      // 7. FIGURAS 3D PARA APILAR
      case 'figuras3d': {
        return `
          <div style="display: flex; gap: 1.5rem; justify-content: center; align-items: center; flex-wrap: wrap;">
            <div style="text-align: center; background: white; padding: 0.6rem 1rem; border-radius: 10px; border: 1.5px solid #CBD5E1;">
              <span style="font-size: 2.2rem;">🎲</span>
              <b style="display: block; font-size: 0.85rem; color: #1E293B;">Cubo</b>
              <span style="font-size: 0.75rem; color: #10B981; font-weight: 800;">Caras planas</span>
            </div>
            <div style="text-align: center; background: white; padding: 0.6rem 1rem; border-radius: 10px; border: 1.5px solid #CBD5E1;">
              <span style="font-size: 2.2rem;">🛢️</span>
              <b style="display: block; font-size: 0.85rem; color: #1E293B;">Cilindro</b>
              <span style="font-size: 0.75rem; color: #10B981; font-weight: 800;">Caras planas</span>
            </div>
            <div style="text-align: center; background: white; padding: 0.6rem 1rem; border-radius: 10px; border: 1.5px solid #CBD5E1;">
              <span style="font-size: 2.2rem;">⚽</span>
              <b style="display: block; font-size: 0.85rem; color: #1E293B;">Esfera</b>
              <span style="font-size: 0.75rem; color: #EF4444; font-weight: 800;">Rueda (sin cara plana)</span>
            </div>
          </div>
        `;
      }

      // 8. CUBO 3D DETALLADO
      case 'cubo_3d': {
        return `
          <svg width="150" height="150" viewBox="0 0 150 150">
            <!-- Cara Superior -->
            <polygon points="75,25 125,50 75,75 25,50" fill="#A5B4FC" stroke="#4F46E5" stroke-width="2"/>
            <!-- Cara Izquierda -->
            <polygon points="25,50 75,75 75,130 25,105" fill="#818CF8" stroke="#4F46E5" stroke-width="2"/>
            <!-- Cara Derecha -->
            <polygon points="75,75 125,50 125,105 75,130" fill="#6366F1" stroke="#4F46E5" stroke-width="2"/>
            <text x="75" y="145" font-size="11" font-weight="800" fill="#4F46E5" text-anchor="middle">6 caras cuadradas iguales</text>
          </svg>
        `;
      }

      // 9. OPERACIÓN VERTICAL CON CUADRÍCULA ESCOLAR
      case 'operacion_vertical': {
        return `
          <div class="cuadricula-operacion">
            <div class="cuadricula-headers">
              <span>C</span>
              <span>D</span>
              <span>U</span>
            </div>
            <div class="cuadricula-filas">
              <div>&nbsp;&nbsp;${grafico.n1}</div>
              <div>${grafico.op} ${grafico.n2}</div>
            </div>
            <div class="cuadricula-linea"></div>
          </div>
        `;
      }

      // 10. DESCOMPOSICIÓN ADITIVA (BLOQUES MULTIBASE)
      case 'descomposicion': {
        const n = grafico.numero;
        const c = Math.floor(n / 100);
        const d = Math.floor((n % 100) / 10);
        const u = n % 10;
        return `
          <div style="background: white; border: 2px solid #93C5FD; border-radius: 14px; padding: 1rem 1.5rem; text-align: center; max-width: 440px; margin: 0 auto; box-shadow: var(--shadow-sm);">
            <div style="font-size: 0.8rem; font-weight: 800; color: #0284C7; text-transform: uppercase; margin-bottom: 0.4rem;">Número: <span style="font-size: 1.6rem; color: #0369A1; font-weight: 900;">${n}</span></div>
            <div style="display: flex; gap: 0.8rem; justify-content: center; align-items: flex-end; margin-top: 0.5rem; flex-wrap: wrap;">
              <!-- Centenas -->
              <div style="background: #EFF6FF; border: 1.5px solid #3B82F6; padding: 0.4rem 0.6rem; border-radius: 8px; text-align: center;">
                <span style="font-size: 1.5rem;">🟦</span><br>
                <b style="font-size: 0.95rem; color: #1D4ED8;">${c} Centenas</b><br>
                <span style="font-size: 0.8rem; color: #64748B;">(${c * 100})</span>
              </div>
              <span style="font-size: 1.2rem; font-weight: 800; color: #94A3B8;">+</span>
              <!-- Decenas -->
              <div style="background: #FEF2F2; border: 1.5px solid #EF4444; padding: 0.4rem 0.6rem; border-radius: 8px; text-align: center;">
                <span style="font-size: 1.5rem;">🔴</span><br>
                <b style="font-size: 0.95rem; color: #B91C1C;">${d} Decenas</b><br>
                <span style="font-size: 0.8rem; color: #64748B;">(${d * 10})</span>
              </div>
              <span style="font-size: 1.2rem; font-weight: 800; color: #94A3B8;">+</span>
              <!-- Unidades -->
              <div style="background: #FEFCE8; border: 1.5px solid #EAB308; padding: 0.4rem 0.6rem; border-radius: 8px; text-align: center;">
                <span style="font-size: 1.5rem;">🟨</span><br>
                <b style="font-size: 0.95rem; color: #A16207;">${u} Unidades</b><br>
                <span style="font-size: 0.8rem; color: #64748B;">(${u})</span>
              </div>
            </div>
          </div>
        `;
      }

      // 11. MULTIPLICACIÓN GRUPOS
      case 'multiplicacion_grupos': {
        const rows = [];
        for (let g = 0; g < grafico.grupos; g++) {
          rows.push(`<div style="background: white; border: 1.5px solid #CBD5E1; padding: 0.4rem 0.6rem; border-radius: 8px;">📦 ${'⭐'.repeat(grafico.porGrupo)}</div>`);
        }
        return `
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;">
            ${rows.join('')}
          </div>
        `;
      }

      // 12. DIVISIÓN REPARTO
      case 'division_reparto': {
        const porGrupo = Math.floor(grafico.total / grafico.grupos);
        const boxes = [];
        for (let g = 0; g < grafico.grupos; g++) {
          boxes.push(`<div style="background: white; border: 2px solid #93C5FD; padding: 0.5rem 0.8rem; border-radius: 8px; text-align: center;"><b>Grupo ${g+1}</b><br>${'🔵'.repeat(porGrupo)}</div>`);
        }
        return `<div style="display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap;">${boxes.join('')}</div>`;
      }

      // 13. PROBLEMAS DE COMPRA Y VUELTO
      case 'problema_compra': {
        return `
          <div style="display: flex; gap: 1rem; align-items: center; background: white; padding: 1rem 1.5rem; border-radius: 12px; border: 2px solid #FED7AA;">
            <span style="font-size: 2.5rem;">✏️✏️✏️</span>
            <div>
              <b style="font-size: 1.1rem; color: #C2410C;">${grafico.items} Lápices</b>
              <div style="font-weight: 700; color: #64748B;">Precio: $${grafico.precio} cada uno</div>
            </div>
          </div>
        `;
      }

      case 'problema_vuelto': {
        return `
          <div style="display: flex; gap: 1.5rem; align-items: center; justify-content: center; background: white; padding: 0.85rem 1.5rem; border-radius: 12px; border: 2px solid #E2E8F0;">
            <div style="text-align: center;">🪙<br><b style="color:#059669;">Pagas: $${grafico.pago}</b></div>
            <span style="font-size: 1.5rem; color: #94A3B8;">➜</span>
            <div style="text-align: center;">🏷️<br><b style="color:#DC2626;">Cuenta: $${grafico.costo}</b></div>
          </div>
        `;
      }

      // 14. SECUENCIA
      case 'secuencia': {
        const chips = grafico.numeros.map(n => `
          <div class="chip-num ${n === '❓' ? 'chip-q' : ''}">${n}</div>
        `).join('<span style="font-size: 1.3rem; color: #94A3B8;">➜</span>');
        return `<div class="secuencia-chips">${chips}</div>`;
      }

      // 15. PICTOGRAMA
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

      // 16. BARRAS
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
      this.showFeedback(true, q.explicacion, "+2 ⭐ Estrellas | +1 🔥 Racha");
    } else {
      this.streak = 0;
      localStorage.setItem('pj_streak', '0');
      this.updateStatsDisplay();

      window.soundFx.playWrong();
      this.showFeedback(false, q.explicacion);
    }
  }

  showFeedback(isCorrect, explicacion, puntosTexto) {
    const container = document.getElementById('feedback-container');
    const isLast = (this.currentIndex === this.questionsList.length - 1);

    container.innerHTML = `
      <div class="feedback-card ${isCorrect ? 'correct' : 'wrong'}">
        <div class="feedback-icon">${isCorrect ? '🌟' : '💡'}</div>
        <div class="feedback-body" style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.35rem;">
            <h4>${isCorrect ? '¡Excelente respuesta!' : '¡Buen intento! Recuerda:'}</h4>
            ${isCorrect && puntosTexto ? `<span style="background: #10B981; color: white; font-size: 0.82rem; font-weight: 800; padding: 0.25rem 0.65rem; border-radius: 999px; box-shadow: var(--shadow-sm);">${puntosTexto}</span>` : (!isCorrect ? `<span style="background: #F59E0B; color: white; font-size: 0.8rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 999px;">Racha a 0 (¡a seguir!)</span>` : '')}
          </div>
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
    let msg = '¡Buen entrenamiento! Sigue practicando para mejorar aún más.';
    if (percent >= 90) {
      starsStr = '⭐⭐⭐';
      msg = '¡EXTRAORDINARIO! ¡Dominas todos los contenidos y estás lista/o para cualquier desafío!';
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

// Iniciar aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  window.app = new PractiJuegosApp();
});
