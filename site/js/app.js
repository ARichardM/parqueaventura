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
      const countQuestions = PREGUNTAS_DB.filter(q => q.temaId === t.id).length;
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
        <p class="tema-desc">${countQuestions} ejercicios extraídos del texto escolar y guía oficial.</p>
        <button class="tema-btn">Practicar ${countQuestions} retos →</button>
      `;
      card.addEventListener('click', () => {
        this.startTemaQuiz(t.id);
      });
      grid.appendChild(card);
    });
  }

  // Renderizado de Fichas Interactivas tipo Mini-Juego (Cero texto plano, 100% interactivo)
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
      const widgetHtml = this.buildInteractiveWidget(f.widget, f.id);
      const temaInfo = TEMAS_INFO[f.id];
      const oaText = temaInfo ? `OA ${temaInfo.oa}` : '';
      const tituloLimpio = f.tema.split('(')[0].trim();

      card.innerHTML = `
        <div class="ficha-header-bar" style="background: linear-gradient(135deg, ${f.color}, #6366F1);">
          <div class="ficha-header-top">
            <span class="ficha-oa-tag">${oaText}</span>
            <span class="badge-interactive">⚡ Mini-Juego</span>
          </div>
          <div class="ficha-header-main">
            <span class="ficha-header-icon">${f.icono}</span>
            <h3>${tituloLimpio}</h3>
          </div>
        </div>

        <div class="ficha-content-body">
          <div class="mision-banner">
            <span class="mision-icon">🎯</span>
            <div>
              <div class="mision-label">Misión Interactiva:</div>
              <div class="mision-desc">${f.mision || f.regla}</div>
            </div>
          </div>

          <div class="ficha-playground-arena">
            ${widgetHtml}
          </div>

          <div class="ficha-secreto-box" id="secreto-${f.id}">
            <span class="secreto-star">✨</span>
            <div class="secreto-text">${f.secreto || f.regla}</div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    this.bindWidgetInteractions();
  }

  buildInteractiveWidget(tipo, fichaId) {
    switch (tipo) {
      case 'pictograma':
        return `
          <div>
            <div class="mini-game-controls" style="margin-bottom: 0.75rem;">
              <span style="font-size: 0.82rem; font-weight: 800; color: #475569;">Canastas:</span>
              <button class="btn-game-chip" id="btn-add-manzana">🍎 +1 Manzana</button>
              <button class="btn-game-chip" id="btn-add-platano">🍌 +1 Plátano</button>
              <button class="btn-game-chip" id="btn-add-frutilla">🍓 +1 Frutilla</button>
              <button class="btn-game-chip" id="btn-reset-frutas" style="color: #64748B;">🔄 Reiniciar</button>
            </div>
            <div class="mini-game-stage" style="align-items: stretch; text-align: left;">
              <div style="font-size: 0.8rem; font-weight: 800; color: #64748B; margin-bottom: 0.4rem; text-transform: uppercase;">
                📊 Pictograma en vivo (1 dibujo = 1 fruta):
              </div>
              <div id="demo-picto-rows" style="display: flex; flex-direction: column; gap: 0.4rem; background: #F8FAFC; padding: 0.6rem; border-radius: 8px;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span style="width: 75px; font-weight: 800; font-size: 0.85rem;">🍎 Manzanas</span>
                  <span id="picto-row-manzana" style="font-size: 1.3rem; letter-spacing: 3px; flex: 1;">🍎🍎🍎</span>
                  <span id="picto-count-manzana" style="font-weight: 900; color: #DC2626; background: #FEE2E2; padding: 0.1rem 0.5rem; border-radius: 6px;">3</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span style="width: 75px; font-weight: 800; font-size: 0.85rem;">🍌 Plátanos</span>
                  <span id="picto-row-platano" style="font-size: 1.3rem; letter-spacing: 3px; flex: 1;">🍌🍌</span>
                  <span id="picto-count-platano" style="font-weight: 900; color: #D97706; background: #FEF3C7; padding: 0.1rem 0.5rem; border-radius: 6px;">2</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span style="width: 75px; font-weight: 800; font-size: 0.85rem;">🍓 Frutillas</span>
                  <span id="picto-row-frutilla" style="font-size: 1.3rem; letter-spacing: 3px; flex: 1;">🍓🍓🍓🍓</span>
                  <span id="picto-count-frutilla" style="font-weight: 900; color: #E11D48; background: #FFE4E6; padding: 0.1rem 0.5rem; border-radius: 6px;">4</span>
                </div>
              </div>
            </div>
            <div id="demo-picto-stats" class="mini-game-banner" style="margin-top: 0.65rem; background: #FF7675;">
              🍓 La fruta más elegida es la Frutilla (4). Total de frutas: 9 🌟
            </div>
          </div>
        `;

      case 'figuras3d':
        return `
          <div>
            <div class="mini-game-controls" style="margin-bottom: 0.75rem;">
              <button class="btn-game-chip active demo-shape-btn" data-shape="cubo">🎲 Cubo</button>
              <button class="btn-game-chip demo-shape-btn" data-shape="cilindro">🛢️ Cilindro</button>
              <button class="btn-game-chip demo-shape-btn" data-shape="esfera">⚽ Esfera</button>
              <button class="btn-game-chip demo-shape-btn" data-shape="cono">🍦 Cono</button>
            </div>
            <div id="demo-shape-stage" class="mini-game-stage" style="min-height: 140px;">
              <div id="demo-shape-visual" style="font-size: 3.5rem; line-height: 1; margin-bottom: 0.4rem; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.15));">
                🎲
              </div>
              <div id="demo-shape-info" style="font-size: 0.88rem; font-weight: 800; color: #1E293B; text-align: center;">
                6 caras planas cuadradas • 8 vértices • 12 aristas
              </div>
            </div>
            <div id="demo-shape-result" class="mini-game-banner" style="margin-top: 0.65rem; background: #10B981;">
              🧱 ¡APILADO PERFECTO! Tiene caras planas para apoyarse firmemente en la torre.
            </div>
          </div>
        `;

      case 'perimetro':
        return `
          <div>
            <div style="display: flex; gap: 0.75rem; justify-content: space-around; margin-bottom: 0.6rem;">
              <div style="display: flex; align-items: center; gap: 0.35rem;">
                <span style="font-weight: 800; font-size: 0.88rem;">Largo: <b id="val-largo" style="color:#0284C7;">6</b> m</span>
                <button class="btn-stepper" id="btn-sub-largo" style="width:30px; height:30px; font-size:1rem;">-</button>
                <button class="btn-stepper" id="btn-add-largo" style="width:30px; height:30px; font-size:1rem;">+</button>
              </div>
              <div style="display: flex; align-items: center; gap: 0.35rem;">
                <span style="font-weight: 800; font-size: 0.88rem;">Ancho: <b id="val-ancho" style="color:#0284C7;">4</b> m</span>
                <button class="btn-stepper" id="btn-sub-ancho" style="width:30px; height:30px; font-size:1rem;">-</button>
                <button class="btn-stepper" id="btn-add-ancho" style="width:30px; height:30px; font-size:1rem;">+</button>
              </div>
            </div>
            <div class="mini-game-stage" style="background: #F0FDF4; border-color: #86EFAC; padding: 0.75rem;">
              <svg id="svg-granja-perimetro" width="260" height="130" viewBox="0 0 260 130">
                <!-- Pasto verde -->
                <rect x="35" y="25" width="190" height="80" fill="#DCFCE7" stroke="#16A34A" stroke-width="4" stroke-dasharray="6,4" rx="10"/>
                <!-- Ovejitas dentro -->
                <text x="80" y="70" font-size="22">🐑</text>
                <text x="140" y="70" font-size="22">🐑</text>
                <text x="180" y="70" font-size="20">🌱</text>
                <!-- Etiquetas de los 4 lados con píldoras -->
                <rect x="105" y="6" width="50" height="20" fill="#16A34A" rx="5"/>
                <text id="lbl-perim-top" x="130" y="20" font-size="11" font-weight="900" fill="#FFF" text-anchor="middle">6 m</text>
                <rect x="105" y="104" width="50" height="20" fill="#16A34A" rx="5"/>
                <text id="lbl-perim-bottom" x="130" y="118" font-size="11" font-weight="900" fill="#FFF" text-anchor="middle">6 m</text>
                <rect x="4" y="55" width="45" height="20" fill="#16A34A" rx="5"/>
                <text id="lbl-perim-left" x="26" y="69" font-size="11" font-weight="900" fill="#FFF" text-anchor="middle">4 m</text>
                <rect x="211" y="55" width="45" height="20" fill="#16A34A" rx="5"/>
                <text id="lbl-perim-right" x="233" y="69" font-size="11" font-weight="900" fill="#FFF" text-anchor="middle">4 m</text>
              </svg>
            </div>
            <div id="demo-perimetro-calc" class="mini-game-banner" style="margin-top: 0.65rem; background: #00CEC9;">
              P = 6 m + 4 m + 6 m + 4 m = 20 metros de cerca 🪵
            </div>
          </div>
        `;

      case 'peso':
        return `
          <div>
            <div class="mini-game-controls" style="margin-bottom: 0.6rem;">
              <button class="btn-game-chip" id="btn-add-peso-500">🍚 +500 g Azúcar</button>
              <button class="btn-game-chip" id="btn-add-peso-250">🌾 +250 g Harina</button>
              <button class="btn-game-chip" id="btn-add-peso-100">🍬 +100 g Dulces</button>
              <button class="btn-game-chip" id="btn-reset-peso" style="color:#64748B;">🔄 Vaciar</button>
            </div>
            <div class="mini-game-stage" style="padding: 0.5rem; background: #FFFBEB;">
              <svg id="svg-balanza-demo" width="240" height="110" viewBox="0 0 240 110">
                <!-- Base -->
                <polygon points="120,50 90,100 150,100" fill="#64748B"/>
                <!-- Brazo que se inclina -->
                <g id="balanza-brazo" style="transform-origin: 120px 50px; transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);">
                  <line x1="30" y1="50" x2="210" y2="50" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
                  <!-- Platillo Izquierdo (Fijo 1 kg) -->
                  <line x1="45" y1="50" x2="30" y2="85" stroke="#94A3B8" stroke-width="2"/>
                  <line x1="45" y1="50" x2="60" y2="85" stroke="#94A3B8" stroke-width="2"/>
                  <ellipse cx="45" cy="85" rx="28" ry="6" fill="#CBD5E1"/>
                  <rect x="33" y="65" width="24" height="20" fill="#F59E0B" rx="3"/>
                  <text x="45" y="79" font-size="9" font-weight="900" fill="#FFFFFF" text-anchor="middle">1 kg</text>
                  <!-- Platillo Derecho (Interactiva) -->
                  <line x1="195" y1="50" x2="180" y2="85" stroke="#94A3B8" stroke-width="2"/>
                  <line x1="195" y1="50" x2="210" y2="85" stroke="#94A3B8" stroke-width="2"/>
                  <ellipse cx="195" cy="85" rx="28" ry="6" fill="#CBD5E1"/>
                  <rect x="180" y="65" width="30" height="20" fill="#0284C7" rx="3"/>
                  <text id="txt-balanza-der" x="195" y="79" font-size="8" font-weight="900" fill="#FFFFFF" text-anchor="middle">0 g</text>
                </g>
              </svg>
            </div>
            <div id="demo-peso-result" class="mini-game-banner" style="margin-top: 0.65rem; background: #FD9644;">
              ⚖️ Platillo derecho vacío (0 g). ¡Agrega paquetes hasta equilibrar 1.000 g!
            </div>
          </div>
        `;

      case 'descomposicion':
        return `
          <div>
            <div class="mini-game-controls" style="margin-bottom: 0.6rem;">
              <button class="btn-game-chip" id="btn-add-c" style="background:#DCFCE7; border-color:#86EFAC; color:#15803D;">🟩 +100 (C)</button>
              <button class="btn-game-chip" id="btn-add-d" style="background:#EFF6FF; border-color:#93C5FD; color:#1D4ED8;">🟦 +10 (D)</button>
              <button class="btn-game-chip" id="btn-add-u" style="background:#FEF3C7; border-color:#FDE047; color:#A16207;">🟨 +1 (U)</button>
              <button class="btn-game-chip" id="btn-reset-desc" style="color:#64748B;">🔄 Borrar</button>
            </div>
            <div class="mini-game-stage" style="background: white; padding: 0.75rem;">
              <div id="desc-blocks-visual" style="display: flex; gap: 0.75rem; align-items: center; justify-content: center; min-height: 50px; flex-wrap: wrap;">
                <div style="background:#DCFCE7; border:2px solid #22C55E; padding:0.3rem 0.6rem; border-radius:8px; font-weight:800; font-size:0.9rem;">🟩 3 Placas (300)</div>
                <div style="background:#EFF6FF; border:2px solid #3B82F6; padding:0.3rem 0.6rem; border-radius:8px; font-weight:800; font-size:0.9rem;">🟦 5 Barras (50)</div>
                <div style="background:#FEF3C7; border:2px solid #EAB308; padding:0.3rem 0.6rem; border-radius:8px; font-weight:800; font-size:0.9rem;">🟨 4 Cubitos (4)</div>
              </div>
            </div>
            <div id="demo-desc-result" class="mini-game-banner" style="margin-top: 0.65rem; background: #0984E3;">
              354 = 300 + 50 + 4 (3C + 5D + 4U) ⭐ "Trescientos cincuenta y cuatro"
            </div>
          </div>
        `;

      case 'operaciones':
        return `
          <div>
            <div class="mini-game-controls" style="margin-bottom: 0.6rem;">
              <button class="btn-game-chip active" id="btn-op-suma">➕ Suma con Reserva (158 + 274)</button>
              <button class="btn-game-chip" id="btn-op-resta">➖ Resta con Canje (432 - 168)</button>
            </div>
            <div class="mini-game-stage" style="background: white; padding: 0.75rem;">
              <div id="demo-col-calc" style="font-family: monospace; font-size: 1.35rem; font-weight: 900; line-height: 1.5; text-align: right; width: 160px; margin: 0 auto; background: #F8FAFC; border: 2px solid #CBD5E1; padding: 0.6rem 1rem; border-radius: 10px;">
                <div id="demo-op-reserva-line" style="color: #EF4444; font-size: 0.95rem; text-align: center; border-bottom: 1px dashed #CBD5E1;">¹ ¹ (Reserva)</div>
                <div id="demo-op-line1">&nbsp; 1 5 8</div>
                <div id="demo-op-line2" style="border-bottom: 3px solid #1E293B;">+ 2 7 4</div>
                <div id="demo-op-line3" style="color: #10B981; font-weight: 900;">&nbsp; 4 3 2</div>
              </div>
            </div>
            <div id="demo-op-result" class="mini-game-banner" style="margin-top: 0.65rem; background: #E84393;">
              🚀 ¡El cohete de reserva sube a la siguiente columna al llegar a 10!
            </div>
          </div>
        `;

      case 'multiplicacion':
        return `
          <div>
            <div style="display: flex; gap: 0.6rem; align-items: center; justify-content: center; margin-bottom: 0.6rem; flex-wrap: wrap;">
              <span style="font-weight: 800; font-size: 0.85rem;">Filas:</span>
              <button class="btn-game-chip btn-mult-filas" data-filas="2">2</button>
              <button class="btn-game-chip active btn-mult-filas" data-filas="3">3</button>
              <button class="btn-game-chip btn-mult-filas" data-filas="4">4</button>
              <span style="font-weight: 800; font-size: 0.85rem; margin-left: 0.4rem;">Columnas:</span>
              <button class="btn-game-chip btn-mult-cols" data-cols="3">3</button>
              <button class="btn-game-chip active btn-mult-cols" data-cols="4">4</button>
              <button class="btn-game-chip btn-mult-cols" data-cols="5">5</button>
            </div>
            <div class="bandeja-horno">
              <div style="font-size: 0.78rem; font-weight: 900; color: #CBD5E1; text-transform: uppercase; letter-spacing: 1px;">
                🍪 Bandeja de Horno (¡Toca las galletas para probarlas!):
              </div>
              <div id="bandeja-galletas-display" class="bandeja-grid" style="grid-template-columns: repeat(4, 45px);">
                <!-- Galletas generadas dinámicamente -->
              </div>
            </div>
            <div id="mult-res-banner" class="mini-game-banner" style="margin-top: 0.65rem; background: #2ED573;">
              3 filas × 4 columnas = 12 galletas 🍪 (Suma reiterada: 4 + 4 + 4 = 12)
            </div>
          </div>
        `;

      case 'division':
        return `
          <div>
            <div class="mini-game-controls" style="margin-bottom: 0.6rem;">
              <span style="font-weight: 800; font-size: 0.85rem;">Total dulces:</span>
              <button class="btn-game-chip btn-div-total" data-total="6">6</button>
              <button class="btn-game-chip btn-div-total" data-total="9">9</button>
              <button class="btn-game-chip active btn-div-total" data-total="12">12</button>
              <button class="btn-game-chip btn-div-total" data-total="15">15</button>
              <button class="btn-game-chip" id="btn-repartir-monstruos" style="background:#10B981; border-color:#059669; color:white; font-weight:900;">🍬 ¡Repartir!</button>
            </div>
            <div class="mini-game-stage" style="padding: 0.6rem; background: #F0F9FF;">
              <div style="display: flex; gap: 0.6rem; justify-content: space-around; width: 100%;">
                <div style="background: white; border: 2px solid #C084FC; border-radius: 10px; padding: 0.5rem; text-align: center; flex: 1;">
                  <span style="font-size: 1.8rem;">👾</span><br>
                  <b style="font-size: 0.8rem; color:#7E22CE;">Bobi</b><br>
                  <span id="monstruo-1-candies" style="font-size: 1rem; letter-spacing: 2px;">🍬🍬🍬🍬</span><br>
                  <small id="monstruo-1-count" style="font-weight:900; color:#7E22CE;">(4)</small>
                </div>
                <div style="background: white; border: 2px solid #86EFAC; border-radius: 10px; padding: 0.5rem; text-align: center; flex: 1;">
                  <span style="font-size: 1.8rem;">🐸</span><br>
                  <b style="font-size: 0.8rem; color:#15803D;">Piti</b><br>
                  <span id="monstruo-2-candies" style="font-size: 1rem; letter-spacing: 2px;">🍬🍬🍬🍬</span><br>
                  <small id="monstruo-2-count" style="font-weight:900; color:#15803D;">(4)</small>
                </div>
                <div style="background: white; border: 2px solid #FDE047; border-radius: 10px; padding: 0.5rem; text-align: center; flex: 1;">
                  <span style="font-size: 1.8rem;">🐥</span><br>
                  <b style="font-size: 0.8rem; color:#A16207;">Tito</b><br>
                  <span id="monstruo-3-candies" style="font-size: 1rem; letter-spacing: 2px;">🍬🍬🍬🍬</span><br>
                  <small id="monstruo-3-count" style="font-weight:900; color:#A16207;">(4)</small>
                </div>
              </div>
            </div>
            <div id="demo-div-banner" class="mini-game-banner" style="margin-top: 0.65rem; background: #1E90FF;">
              12 dulces ÷ 3 amigos = 4 dulces para cada uno (¡Resto 0, reparto justo!) 🥳
            </div>
          </div>
        `;

      case 'problemas':
        return `
          <div>
            <div class="mini-game-controls" style="margin-bottom: 0.6rem;">
              <span style="font-weight: 800; font-size: 0.85rem;">Elige qué comprar:</span>
              <button class="btn-game-chip active btn-kiosco-item" data-price="400" data-name="Helado">🍦 Helado ($400)</button>
              <button class="btn-game-chip btn-kiosco-item" data-price="600" data-name="Libreta">📓 Libreta ($600)</button>
              <button class="btn-game-chip btn-kiosco-item" data-price="350" data-name="Jugo">🧃 Jugo ($350)</button>
              <button class="btn-game-chip btn-kiosco-item" data-price="700" data-name="Estuche">✏️ Estuche ($700)</button>
            </div>
            <div class="mini-game-stage" style="background: #FFFBEB; padding: 0.6rem;">
              <div style="display: flex; gap: 0.75rem; align-items: center; justify-content: center; flex-wrap: wrap;">
                <div style="background: white; border: 2px solid #CBD5E1; padding: 0.4rem 0.8rem; border-radius: 8px; text-align: center;">
                  <span style="font-size: 1.5rem;">💵</span><br>
                  <b style="font-size: 0.85rem;">Pagas: $1.000</b>
                </div>
                <span style="font-size: 1.3rem; color: #94A3B8;">➜</span>
                <div style="background: white; border: 2px solid #CBD5E1; padding: 0.4rem 0.8rem; border-radius: 8px; text-align: center;">
                  <span id="kiosco-item-icon" style="font-size: 1.5rem;">🍦</span><br>
                  <b id="kiosco-item-label" style="font-size: 0.85rem; color:#DC2626;">Cuesta: $400</b>
                </div>
                <span style="font-size: 1.3rem; color: #94A3B8;">➜</span>
                <div style="background: #ECFDF5; border: 2px solid #10B981; padding: 0.4rem 0.8rem; border-radius: 8px; text-align: center;">
                  <span style="font-size: 1.5rem;">🪙</span><br>
                  <b id="kiosco-vuelto-label" style="font-size: 0.85rem; color:#059669;">Vuelto: $600</b>
                </div>
              </div>
            </div>
            <div id="demo-kiosco-banner" class="mini-game-banner" style="margin-top: 0.65rem; background: #FFA502;">
              🛒 $1.000 (pago) - $400 (costo) = $600 de vuelto (🪙 $500 + 🪙 $100)
            </div>
          </div>
        `;

      case 'fracciones':
        return `
          <div>
            <div class="mini-game-controls" style="margin-bottom: 0.6rem;">
              <span style="font-weight: 800; font-size: 0.85rem;">Cortes de pizza:</span>
              <button class="btn-game-chip btn-pizza-cut" data-cut="2">2 mitades (1/2)</button>
              <button class="btn-game-chip active btn-pizza-cut" data-cut="4">4 cuartos (1/4)</button>
              <button class="btn-game-chip btn-pizza-cut" data-cut="6">6 sextos (1/6)</button>
              <button class="btn-game-chip btn-pizza-cut" data-cut="8">8 octavos (1/8)</button>
            </div>
            <div class="mini-game-stage" style="padding: 0.4rem; background: #FFF7ED;">
              <svg id="svg-pizza-demo" width="160" height="160" viewBox="0 0 160 160" style="cursor: pointer;">
                <!-- Pizza interactiva generada dinámicamente -->
              </svg>
            </div>
            <div id="demo-pizza-banner" class="mini-game-banner" style="margin-top: 0.65rem; background: #FF4757;">
              🍕 Toca las porciones de la pizza: 1 de 4 pedazos servidos = 1/4 (un cuarto)
            </div>
          </div>
        `;

      case 'patrones':
        return `
          <div>
            <div class="mini-game-controls" style="margin-bottom: 0.6rem;">
              <span style="font-weight: 800; font-size: 0.85rem;">Regla del tren:</span>
              <button class="btn-game-chip btn-train-rule" data-rule="2">+2</button>
              <button class="btn-game-chip btn-train-rule" data-rule="5">+5</button>
              <button class="btn-game-chip active btn-train-rule" data-rule="10">+10</button>
              <button class="btn-game-chip btn-train-rule" data-rule="-5">-5</button>
            </div>
            <div class="mini-game-stage" style="padding: 0.6rem; background: #FAF5FF; border-color:#E9D5FF;">
              <div class="train-wagon-track" id="train-track-display">
                <span class="train-loco">🚂</span>
                <span class="train-wagon">10</span>
                <span style="color:#94A3B8;">➔</span>
                <span class="train-wagon">20</span>
                <span style="color:#94A3B8;">➔</span>
                <span class="train-wagon">30</span>
                <span style="color:#94A3B8;">➔</span>
                <span class="train-wagon missing" id="train-wagon-q" style="cursor:pointer;" title="¡Tócame para revelar!">❓</span>
                <span style="color:#94A3B8;">➔</span>
                <span class="train-wagon">50</span>
              </div>
            </div>
            <div id="demo-train-banner" class="mini-game-banner" style="margin-top: 0.65rem; background: #8E44AD;">
              🚂 ¡Regla constante: Sumar 10 en cada vagón! Toca el vagón ❓ para comprobar.
            </div>
          </div>
        `;

      default:
        return `<div class="mini-game-banner" style="background:#6366F1;">¡A practicar!</div>`;
    }
  }

  bindWidgetInteractions() {
    // 1. PICTOGRAMA
    let manzanas = 3;
    let platanos = 2;
    let frutillas = 4;
    const addM = document.getElementById('btn-add-manzana');
    const addP = document.getElementById('btn-add-platano');
    const addF = document.getElementById('btn-add-frutilla');
    const resetFrutas = document.getElementById('btn-reset-frutas');
    const rowM = document.getElementById('picto-row-manzana');
    const rowP = document.getElementById('picto-row-platano');
    const rowF = document.getElementById('picto-row-frutilla');
    const cntM = document.getElementById('picto-count-manzana');
    const cntP = document.getElementById('picto-count-platano');
    const cntF = document.getElementById('picto-count-frutilla');
    const statsFrutas = document.getElementById('demo-picto-stats');

    const updateFrutas = () => {
      if (rowM) rowM.textContent = '🍎'.repeat(manzanas);
      if (rowP) rowP.textContent = '🍌'.repeat(platanos);
      if (rowF) rowF.textContent = '🍓'.repeat(frutillas);
      if (cntM) cntM.textContent = manzanas;
      if (cntP) cntP.textContent = platanos;
      if (cntF) cntF.textContent = frutillas;
      if (statsFrutas) {
        const total = manzanas + platanos + frutillas;
        let fav = '🍓 Frutillas';
        if (manzanas >= platanos && manzanas >= frutillas) fav = '🍎 Manzanas';
        else if (platanos >= manzanas && platanos >= frutillas) fav = '🍌 Plátanos';
        statsFrutas.textContent = `Fruta más elegida: ${fav}. Total de frutas recolectadas: ${total} 🌟`;
      }
      if (window.soundFx) window.soundFx.playCorrect();
    };

    if (addM) addM.addEventListener('click', () => { if (manzanas < 8) manzanas++; updateFrutas(); });
    if (addP) addP.addEventListener('click', () => { if (platanos < 8) platanos++; updateFrutas(); });
    if (addF) addF.addEventListener('click', () => { if (frutillas < 8) frutillas++; updateFrutas(); });
    if (resetFrutas) resetFrutas.addEventListener('click', () => { manzanas = 1; platanos = 1; frutillas = 1; updateFrutas(); });

    // 2. FIGURAS 3D
    document.querySelectorAll('.demo-shape-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.demo-shape-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const shape = btn.dataset.shape;
        const visual = document.getElementById('demo-shape-visual');
        const info = document.getElementById('demo-shape-info');
        const res = document.getElementById('demo-shape-result');
        if (!res || !visual || !info) return;

        if (shape === 'cubo') {
          visual.textContent = '🎲';
          info.textContent = '6 caras planas cuadradas • 8 vértices • 12 aristas';
          res.textContent = '🧱 ¡APILADO PERFECTO! Tiene caras planas para apoyarse firmemente en la torre.';
          res.style.background = '#10B981';
        } else if (shape === 'cilindro') {
          visual.textContent = '🛢️';
          info.textContent = '2 caras planas circulares • 1 superficie curva • 0 vértices';
          res.textContent = '🛢️ ¡SE APILA DE PIE! Sus 2 bases circulares son planas. Si lo acuestas, rueda.';
          res.style.background = '#6366F1';
        } else if (shape === 'esfera') {
          visual.textContent = '⚽';
          info.textContent = '0 caras planas • Toda su superficie es curva • 0 vértices';
          res.textContent = '💨 ¡RUEDA Y SE CAE! Es totalmente redonda y NO tiene ninguna cara plana para apoyarse.';
          res.style.background = '#EF4444';
        } else if (shape === 'cono') {
          visual.textContent = '🍦';
          info.textContent = '1 cara plana circular • 1 superficie curva • 1 cúspide o vértice';
          res.textContent = '⚠️ ¡SOLO POR SU BASE! Se sostiene si apoyas su círculo plano abajo; por la punta se cae.';
          res.style.background = '#F59E0B';
        }
        if (window.soundFx) window.soundFx.playCorrect();
      });
    });

    // 3. PERÍMETRO GRANJA
    let largoP = 6;
    let anchoP = 4;
    const valLargo = document.getElementById('val-largo');
    const valAncho = document.getElementById('val-ancho');
    const calcPerim = document.getElementById('demo-perimetro-calc');
    const lblTop = document.getElementById('lbl-perim-top');
    const lblBottom = document.getElementById('lbl-perim-bottom');
    const lblLeft = document.getElementById('lbl-perim-left');
    const lblRight = document.getElementById('lbl-perim-right');

    const updateGranjaPerim = () => {
      if (valLargo) valLargo.textContent = largoP;
      if (valAncho) valAncho.textContent = anchoP;
      if (lblTop) lblTop.textContent = `${largoP} m`;
      if (lblBottom) lblBottom.textContent = `${largoP} m`;
      if (lblLeft) lblLeft.textContent = `${anchoP} m`;
      if (lblRight) lblRight.textContent = `${anchoP} m`;
      const p = 2 * (largoP + anchoP);
      if (calcPerim) calcPerim.textContent = `P = ${largoP} m + ${anchoP} m + ${largoP} m + ${anchoP} m = ${p} metros de cerca 🪵`;
      if (window.soundFx) window.soundFx.playCorrect();
    };

    const btnAddL = document.getElementById('btn-add-largo');
    const btnSubL = document.getElementById('btn-sub-largo');
    const btnAddA = document.getElementById('btn-add-ancho');
    const btnSubA = document.getElementById('btn-sub-ancho');

    if (btnAddL) btnAddL.addEventListener('click', () => { if (largoP < 12) largoP++; updateGranjaPerim(); });
    if (btnSubL) btnSubL.addEventListener('click', () => { if (largoP > 2) largoP--; updateGranjaPerim(); });
    if (btnAddA) btnAddA.addEventListener('click', () => { if (anchoP < 8) anchoP++; updateGranjaPerim(); });
    if (btnSubA) btnSubA.addEventListener('click', () => { if (anchoP > 1) anchoP--; updateGranjaPerim(); });

    // 4. BALANZA PESO
    let pesoActualDer = 0;
    const txtDer = document.getElementById('txt-balanza-der');
    const brazoBalanza = document.getElementById('balanza-brazo');
    const resPeso = document.getElementById('demo-peso-result');

    const updateBalanza = () => {
      if (txtDer) txtDer.textContent = `${pesoActualDer} g`;
      if (brazoBalanza) {
        if (pesoActualDer < 1000) {
          brazoBalanza.style.transform = 'rotate(-10deg)';
        } else if (pesoActualDer === 1000) {
          brazoBalanza.style.transform = 'rotate(0deg)';
        } else {
          brazoBalanza.style.transform = 'rotate(10deg)';
        }
      }
      if (resPeso) {
        if (pesoActualDer < 1000) {
          resPeso.textContent = `⚖️ Llevas ${pesoActualDer} g en el platillo. Faltan ${1000 - pesoActualDer} g para equilibrar 1 kg.`;
          resPeso.style.background = '#FD9644';
        } else if (pesoActualDer === 1000) {
          resPeso.textContent = `🎉 ¡EQUILIBRIO EXACTO! 1.000 gramos = 1 Kilogramo (1 kg).`;
          resPeso.style.background = '#10B981';
          if (window.soundFx) window.soundFx.playWin();
          if (window.confettiEffect) window.confettiEffect.fire(window.innerWidth / 2, window.innerHeight / 2);
          return;
        } else {
          resPeso.textContent = `⚖️ ¡Demasiado pesado! Llevas ${pesoActualDer} g (> 1 kg). Quita paquetes para equilibrar.`;
          resPeso.style.background = '#EF4444';
        }
      }
      if (window.soundFx) window.soundFx.playCorrect();
    };

    const btnP500 = document.getElementById('btn-add-peso-500');
    const btnP250 = document.getElementById('btn-add-peso-250');
    const btnP100 = document.getElementById('btn-add-peso-100');
    const btnPReset = document.getElementById('btn-reset-peso');

    if (btnP500) btnP500.addEventListener('click', () => { if (pesoActualDer < 2000) pesoActualDer += 500; updateBalanza(); });
    if (btnP250) btnP250.addEventListener('click', () => { if (pesoActualDer < 2000) pesoActualDer += 250; updateBalanza(); });
    if (btnP100) btnP100.addEventListener('click', () => { if (pesoActualDer < 2000) pesoActualDer += 100; updateBalanza(); });
    if (btnPReset) btnPReset.addEventListener('click', () => { pesoActualDer = 0; updateBalanza(); });

    // 5. DESCOMPOSICIÓN MULTIBASE
    let cantC = 3;
    let cantD = 5;
    let cantU = 4;
    const visualBlocks = document.getElementById('desc-blocks-visual');
    const resDesc = document.getElementById('demo-desc-result');

    const updateDescBlocks = () => {
      const num = (cantC * 100) + (cantD * 10) + cantU;
      if (visualBlocks) {
        visualBlocks.innerHTML = `
          <div style="background:#DCFCE7; border:2px solid #22C55E; padding:0.35rem 0.65rem; border-radius:8px; font-weight:800; font-size:0.9rem;">🟩 ${cantC} Placas (${cantC * 100})</div>
          <div style="background:#EFF6FF; border:2px solid #3B82F6; padding:0.35rem 0.65rem; border-radius:8px; font-weight:800; font-size:0.9rem;">🟦 ${cantD} Barras (${cantD * 10})</div>
          <div style="background:#FEF3C7; border:2px solid #EAB308; padding:0.35rem 0.65rem; border-radius:8px; font-weight:800; font-size:0.9rem;">🟨 ${cantU} Cubitos (${cantU})</div>
        `;
      }
      if (resDesc) {
        resDesc.textContent = `${num} = ${cantC * 100} + ${cantD * 10} + ${cantU} (${cantC}C + ${cantD}D + ${cantU}U) ⭐ Valor posicional en acción`;
      }
      if (window.soundFx) window.soundFx.playCorrect();
    };

    const btnAddC = document.getElementById('btn-add-c');
    const btnAddD = document.getElementById('btn-add-d');
    const btnAddU = document.getElementById('btn-add-u');
    const btnResetDesc = document.getElementById('btn-reset-desc');

    if (btnAddC) btnAddC.addEventListener('click', () => { if (cantC < 9) cantC++; updateDescBlocks(); });
    if (btnAddD) btnAddD.addEventListener('click', () => { if (cantD < 9) cantD++; updateDescBlocks(); });
    if (btnAddU) btnAddU.addEventListener('click', () => { if (cantU < 9) cantU++; updateDescBlocks(); });
    if (btnResetDesc) btnResetDesc.addEventListener('click', () => { cantC = 1; cantD = 1; cantU = 1; updateDescBlocks(); });

    // 6. OPERACIONES (SUMA / RESTA)
    const btnOpSuma = document.getElementById('btn-op-suma');
    const btnOpResta = document.getElementById('btn-op-resta');
    const resOp = document.getElementById('demo-op-result');
    const opLineReserva = document.getElementById('demo-op-reserva-line');
    const opLine1 = document.getElementById('demo-op-line1');
    const opLine2 = document.getElementById('demo-op-line2');
    const opLine3 = document.getElementById('demo-op-line3');

    if (btnOpSuma && btnOpResta) {
      btnOpSuma.addEventListener('click', () => {
        btnOpSuma.classList.add('active');
        btnOpResta.classList.remove('active');
        if (opLineReserva) opLineReserva.textContent = '¹ ¹ (Reserva)';
        if (opLine1) opLine1.textContent = '  1 5 8';
        if (opLine2) opLine2.textContent = '+ 2 7 4';
        if (opLine3) opLine3.textContent = '  4 3 2';
        if (resOp) resOp.textContent = '🚀 ¡El cohete de reserva sube a la siguiente columna al llegar a 10!';
        if (window.soundFx) window.soundFx.playCorrect();
      });
      btnOpResta.addEventListener('click', () => {
        btnOpResta.classList.add('active');
        btnOpSuma.classList.remove('active');
        if (opLineReserva) opLineReserva.textContent = '³ ¹² (Canje)';
        if (opLine1) opLine1.textContent = '  4 3 2';
        if (opLine2) opLine2.textContent = '- 1 6 8';
        if (opLine3) opLine3.textContent = '  2 6 4';
        if (resOp) resOp.textContent = '🤝 ¡Canje! Como al 2 no le alcanza para restar 8, le pide 1 decena a su compañero.';
        if (window.soundFx) window.soundFx.playCorrect();
      });
    }

    // 7. MULTIPLICACIÓN (BANDEJA DE GALLETAS)
    let mFilas = 3;
    let mCols = 4;
    const bandeja = document.getElementById('bandeja-galletas-display');
    const bannerMult = document.getElementById('mult-res-banner');

    const renderBandejaGalletas = () => {
      if (!bandeja) return;
      bandeja.style.gridTemplateColumns = `repeat(${mCols}, 45px)`;
      bandeja.innerHTML = '';
      const totalGalletas = mFilas * mCols;
      for (let i = 0; i < totalGalletas; i++) {
        const btnG = document.createElement('button');
        btnG.className = 'galletita-btn';
        btnG.textContent = '🍪';
        btnG.title = '¡Tócame para comer!';
        btnG.addEventListener('click', () => {
          btnG.textContent = btnG.textContent === '🍪' ? '😋' : '🍪';
          if (window.soundFx) window.soundFx.playCorrect();
        });
        bandeja.appendChild(btnG);
      }
      if (bannerMult) {
        bannerMult.textContent = `${mFilas} filas × ${mCols} columnas = ${totalGalletas} galletas 🍪 (Suma: ${Array(mFilas).fill(mCols).join(' + ')} = ${totalGalletas})`;
      }
      if (window.soundFx) window.soundFx.playCorrect();
    };

    document.querySelectorAll('.btn-mult-filas').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.btn-mult-filas').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        mFilas = parseInt(b.dataset.filas, 10);
        renderBandejaGalletas();
      });
    });

    document.querySelectorAll('.btn-mult-cols').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.btn-mult-cols').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        mCols = parseInt(b.dataset.cols, 10);
        renderBandejaGalletas();
      });
    });
    renderBandejaGalletas();

    // 8. DIVISIÓN (MONSTRUOS AMIGOS)
    let totalDulces = 12;
    const m1Candies = document.getElementById('monstruo-1-candies');
    const m2Candies = document.getElementById('monstruo-2-candies');
    const m3Candies = document.getElementById('monstruo-3-candies');
    const m1Count = document.getElementById('monstruo-1-count');
    const m2Count = document.getElementById('monstruo-2-count');
    const m3Count = document.getElementById('monstruo-3-count');
    const bannerDiv = document.getElementById('demo-div-banner');
    const btnRepartir = document.getElementById('btn-repartir-monstruos');

    const repartirDulces = () => {
      const cadaUno = Math.floor(totalDulces / 3);
      const candiesStr = '🍬'.repeat(cadaUno);
      if (m1Candies) m1Candies.textContent = candiesStr;
      if (m2Candies) m2Candies.textContent = candiesStr;
      if (m3Candies) m3Candies.textContent = candiesStr;
      if (m1Count) m1Count.textContent = `(${cadaUno})`;
      if (m2Count) m2Count.textContent = `(${cadaUno})`;
      if (m3Count) m3Count.textContent = `(${cadaUno})`;
      if (bannerDiv) {
        bannerDiv.textContent = `${totalDulces} dulces ÷ 3 amigos = ${cadaUno} para cada uno (¡Resto 0, reparto justo!) 🥳`;
      }
      if (window.soundFx) window.soundFx.playWin();
    };

    document.querySelectorAll('.btn-div-total').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.btn-div-total').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        totalDulces = parseInt(b.dataset.total, 10);
        repartirDulces();
      });
    });

    if (btnRepartir) btnRepartir.addEventListener('click', repartirDulces);

    // 9. PROBLEMAS Y MONEDAS (KIOSCO)
    document.querySelectorAll('.btn-kiosco-item').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.btn-kiosco-item').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const price = parseInt(b.dataset.price, 10);
        const name = b.dataset.name;
        const icon = b.textContent.trim().split(' ')[0];
        const vuelto = 1000 - price;

        const iconEl = document.getElementById('kiosco-item-icon');
        const lblEl = document.getElementById('kiosco-item-label');
        const vueltoEl = document.getElementById('kiosco-vuelto-label');
        const bannerK = document.getElementById('demo-kiosco-banner');

        if (iconEl) iconEl.textContent = icon;
        if (lblEl) lblEl.textContent = `Cuesta: $${price}`;
        if (vueltoEl) vueltoEl.textContent = `Vuelto: $${vuelto}`;
        if (bannerK) {
          bannerK.textContent = `🛒 Pagas $1.000 - Cuesta $${price} = $${vuelto} de vuelto 💵 (¡Excelente cálculo!)`;
        }
        if (window.soundFx) window.soundFx.playCorrect();
      });
    });

    // 10. FRACCIONES (PIZZA)
    let cortesPizza = 4;
    let porcionesComidas = 1;
    const svgPizza = document.getElementById('svg-pizza-demo');
    const bannerPizza = document.getElementById('demo-pizza-banner');

    const renderPizzaInteractive = () => {
      if (!svgPizza) return;
      svgPizza.innerHTML = '';
      const r = 68;
      const cx = 80;
      const cy = 80;

      // Fondo plato
      const basePlate = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      basePlate.setAttribute('cx', cx);
      basePlate.setAttribute('cy', cy);
      basePlate.setAttribute('r', r + 6);
      basePlate.setAttribute('fill', '#FED7AA');
      basePlate.setAttribute('stroke', '#EA580C');
      basePlate.setAttribute('stroke-width', '4');
      svgPizza.appendChild(basePlate);

      // Rebanadas
      const angleStep = (2 * Math.PI) / cortesPizza;
      for (let i = 0; i < cortesPizza; i++) {
        const a1 = i * angleStep;
        const a2 = (i + 1) * angleStep;
        const isComida = i < porcionesComidas;

        const x1 = cx + r * Math.cos(a1);
        const y1 = cy + r * Math.sin(a1);
        const x2 = cx + r * Math.cos(a2);
        const y2 = cy + r * Math.sin(a2);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
        path.setAttribute('d', d);
        path.setAttribute('fill', isComida ? '#EF4444' : '#FEF08A');
        path.setAttribute('stroke', '#EA580C');
        path.setAttribute('stroke-width', '2');
        path.style.cursor = 'pointer';

        path.addEventListener('click', () => {
          porcionesComidas = (porcionesComidas % cortesPizza) + 1;
          renderPizzaInteractive();
        });

        svgPizza.appendChild(path);
      }

      // Nombre de la fracción
      const nombresFrac = { 2: 'medios', 4: 'cuartos', 6: 'sextos', 8: 'octavos' };
      if (bannerPizza) {
        bannerPizza.textContent = `🍕 ${porcionesComidas} de ${cortesPizza} porciones comidas = ${porcionesComidas}/${cortesPizza} (${porcionesComidas} ${nombresFrac[cortesPizza] || 'partes'}). ¡Toca la pizza!`;
      }
      if (window.soundFx) window.soundFx.playCorrect();
    };

    document.querySelectorAll('.btn-pizza-cut').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.btn-pizza-cut').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        cortesPizza = parseInt(b.dataset.cut, 10);
        porcionesComidas = 1;
        renderPizzaInteractive();
      });
    });
    renderPizzaInteractive();

    // 11. PATRONES (TREN A VAPOR)
    const wagonQ = document.getElementById('train-wagon-q');
    const bannerTrain = document.getElementById('demo-train-banner');
    if (wagonQ) {
      wagonQ.addEventListener('click', () => {
        wagonQ.textContent = '40';
        wagonQ.classList.remove('missing');
        wagonQ.style.background = '#86EFAC';
        wagonQ.style.borderColor = '#16A34A';
        wagonQ.style.color = '#15803D';
        if (bannerTrain) {
          bannerTrain.textContent = '🎉 ¡Excelente! 30 + 10 = 40. El tren avanza feliz a vapor 🚂💨';
        }
        if (window.soundFx) window.soundFx.playWin();
      });
    }

    document.querySelectorAll('.btn-train-rule').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.btn-train-rule').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const rule = parseInt(b.dataset.rule, 10);
        const start = 10;
        const w1 = start;
        const w2 = start + rule;
        const w3 = start + (2 * rule);
        const w4 = start + (3 * rule);
        const w5 = start + (4 * rule);

        const track = document.getElementById('train-track-display');
        if (track) {
          track.innerHTML = `
            <span class="train-loco">🚂</span>
            <span class="train-wagon">${w1}</span>
            <span style="color:#94A3B8;">➔</span>
            <span class="train-wagon">${w2}</span>
            <span style="color:#94A3B8;">➔</span>
            <span class="train-wagon">${w3}</span>
            <span style="color:#94A3B8;">➔</span>
            <span class="train-wagon missing" id="train-wagon-q" style="cursor:pointer;" title="¡Tócame para revelar!">❓</span>
            <span style="color:#94A3B8;">➔</span>
            <span class="train-wagon">${w5}</span>
          `;
          const newWQ = document.getElementById('train-wagon-q');
          if (newWQ) {
            newWQ.addEventListener('click', () => {
              newWQ.textContent = w4;
              newWQ.classList.remove('missing');
              newWQ.style.background = '#86EFAC';
              newWQ.style.borderColor = '#16A34A';
              newWQ.style.color = '#15803D';
              if (bannerTrain) {
                bannerTrain.textContent = `🎉 ¡Correcto! El número es ${w4}. Regla: ${rule > 0 ? '+' + rule : rule} en cada vagón.`;
              }
              if (window.soundFx) window.soundFx.playWin();
            });
          }
        }
        if (bannerTrain) {
          bannerTrain.textContent = `🚂 Regla activa: ${rule > 0 ? 'Sumar ' + rule : 'Restar ' + Math.abs(rule)} en cada vagón. ¿Cuál número falta en el ❓?`;
        }
        if (window.soundFx) window.soundFx.playCorrect();
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
    const origenBadge = q.origen ? `<span style="opacity: 0.8; font-weight: 600; margin-left: 0.4rem;">📖 ${q.origen}</span>` : '';
    document.getElementById('quiz-tema-badge').innerHTML = `${temaInfo.icono} ${temaInfo.nombre} (OA ${temaInfo.oa}) ${origenBadge}`;

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

    document.getElementById('feedback-container').innerHTML = '';
  }

  // Renderizador integral de ilustraciones para CADA tipo de pregunta
  buildVisualHtml(grafico) {
    if (!grafico) return '';

    switch (grafico.tipo) {
      // 1. CUADRADO DE PERÍMETRO CON PÍLDORAS
      case 'cuadrado': {
        return `
          <svg class="figura-svg" width="280" height="230" viewBox="0 0 280 230" style="overflow: visible;">
            <rect x="84" y="58" width="112" height="112" fill="#E2E8F0" rx="14"/>
            <rect x="80" y="54" width="112" height="112" fill="#EEF2FF" stroke="#4F46E5" stroke-width="4" rx="12"/>
            <rect x="111" y="14" width="50" height="26" fill="#4F46E5" rx="6"/>
            <text x="136" y="32" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">4 cm</text>
            <rect x="111" y="180" width="50" height="26" fill="#4F46E5" rx="6"/>
            <text x="136" y="198" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">4 cm</text>
            <rect x="16" y="97" width="50" height="26" fill="#4F46E5" rx="6"/>
            <text x="41" y="115" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">4 cm</text>
            <rect x="206" y="97" width="50" height="26" fill="#4F46E5" rx="6"/>
            <text x="231" y="115" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">4 cm</text>
          </svg>
        `;
      }

      // 2. RECTÁNGULO DE PERÍMETRO CON PÍLDORAS
      case 'rectangulo': {
        return `
          <svg class="figura-svg" width="300" height="200" viewBox="0 0 300 200" style="overflow: visible;">
            <rect x="69" y="54" width="170" height="90" fill="#E2E8F0" rx="14"/>
            <rect x="65" y="50" width="170" height="90" fill="#D1FAE5" stroke="#10B981" stroke-width="4" rx="12"/>
            <rect x="125" y="14" width="50" height="26" fill="#10B981" rx="6"/>
            <text x="150" y="32" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">6 cm</text>
            <rect x="125" y="150" width="50" height="26" fill="#10B981" rx="6"/>
            <text x="150" y="168" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">6 cm</text>
            <rect x="8" y="82" width="50" height="26" fill="#10B981" rx="6"/>
            <text x="33" y="100" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">3 cm</text>
            <rect x="242" y="82" width="50" height="26" fill="#10B981" rx="6"/>
            <text x="267" y="100" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">3 cm</text>
          </svg>
        `;
      }

      // 3. PATIO CUADRADO DE 5 METROS
      case 'cuadrado_5m': {
        return `
          <svg class="figura-svg" width="260" height="200" viewBox="0 0 260 200">
            <rect x="70" y="40" width="120" height="120" fill="#FEF3C7" stroke="#D97706" stroke-width="3" rx="10"/>
            <rect x="105" y="8" width="50" height="24" fill="#D97706" rx="6"/>
            <text x="130" y="24" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">5 m</text>
            <rect x="105" y="168" width="50" height="24" fill="#D97706" rx="6"/>
            <text x="130" y="184" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">5 m</text>
            <rect x="10" y="88" width="50" height="24" fill="#D97706" rx="6"/>
            <text x="35" y="104" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">5 m</text>
            <rect x="200" y="88" width="50" height="24" fill="#D97706" rx="6"/>
            <text x="225" y="104" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">5 m</text>
          </svg>
        `;
      }

      // 4. PIZZA CON REBANADA DE 1/4 DESTACADA
      case 'pizza': {
        return `
          <svg class="pizza-svg" width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="75" fill="#FED7AA" stroke="#F97316" stroke-width="5"/>
            <circle cx="90" cy="90" r="66" fill="#FEF08A"/>
            <g transform="translate(6, -6)">
              <path d="M 90 90 L 90 24 A 66 66 0 0 1 156 90 Z" fill="#F87171" stroke="#DC2626" stroke-width="2.5"/>
              <circle cx="118" cy="55" r="7" fill="#B91C1C"/>
              <circle cx="132" cy="74" r="6" fill="#B91C1C"/>
              <rect x="105" y="62" width="36" height="22" fill="#FFFFFF" rx="4"/>
              <text x="123" y="77" font-size="12" font-weight="900" fill="#DC2626" text-anchor="middle">1/4</text>
            </g>
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

      // 5. PASTEL DE TRES CUARTOS (3/4)
      case 'pizza_tres_cuartos': {
        return `
          <svg class="pizza-svg" width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="72" fill="#FED7AA" stroke="#F97316" stroke-width="4"/>
            <!-- 3 porciones servidas (rojas/rosadas) -->
            <path d="M 90 90 L 90 18 A 72 72 0 1 1 18 90 Z" fill="#FB7185" stroke="#E11D48" stroke-width="2.5"/>
            <!-- 1 porción vacía / restante -->
            <path d="M 90 90 L 18 90 A 72 72 0 0 1 90 18 Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-dasharray="4" stroke-width="2"/>
            <rect x="90" y="80" width="50" height="26" fill="#BE123C" rx="6"/>
            <text x="115" y="98" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle">3 / 4</text>
          </svg>
        `;
      }

      // 6. CHOCOLATE (1/2)
      case 'chocolate': {
        return `
          <svg width="220" height="110" viewBox="0 0 220 110">
            <g transform="translate(10, 10)">
              <rect x="0" y="0" width="90" height="70" fill="#78350F" stroke="#451A03" stroke-width="3" rx="8"/>
              <rect x="8" y="8" width="74" height="54" fill="#92400E" rx="4"/>
              <rect x="25" y="22" width="40" height="26" fill="#F59E0B" rx="6"/>
              <text x="45" y="40" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">1 / 2</text>
              <text x="45" y="88" font-size="12" font-weight="800" fill="#78350F" text-anchor="middle">Mitad 1</text>
            </g>
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

      // 7. BALANZA ILUSTRADA (1 kg = 1.000 g)
      case 'balanza': {
        return `
          <svg width="240" height="140" viewBox="0 0 240 140">
            <path d="M 70 130 L 170 130 L 140 105 L 100 105 Z" fill="#94A3B8"/>
            <rect x="116" y="35" width="8" height="75" fill="#64748B"/>
            <circle cx="120" cy="35" r="7" fill="#F59E0B"/>
            <rect x="30" y="32" width="180" height="6" fill="#64748B" rx="3"/>
            <line x1="45" y1="35" x2="30" y2="75" stroke="#94A3B8" stroke-width="2"/>
            <line x1="45" y1="35" x2="60" y2="75" stroke="#94A3B8" stroke-width="2"/>
            <line x1="195" y1="35" x2="180" y2="75" stroke="#94A3B8" stroke-width="2"/>
            <line x1="195" y1="35" x2="210" y2="75" stroke="#94A3B8" stroke-width="2"/>
            <ellipse cx="45" cy="75" rx="25" ry="6" fill="#CBD5E1"/>
            <ellipse cx="195" cy="75" rx="25" ry="6" fill="#CBD5E1"/>
            <rect x="33" y="55" width="24" height="20" fill="#F59E0B" rx="3"/>
            <text x="45" y="69" font-size="9" font-weight="900" fill="#FFFFFF" text-anchor="middle">1 kg</text>
            <rect x="178" y="55" width="34" height="20" fill="#0EA5E9" rx="3"/>
            <text x="195" y="69" font-size="8" font-weight="900" fill="#FFFFFF" text-anchor="middle">1000g</text>
            <text x="120" y="15" font-size="14" font-weight="900" fill="#0F172A" text-anchor="middle">1 kg = 1.000 g</text>
          </svg>
        `;
      }

      // 8. DOS PAQUETES DE 500g (AZÚCAR / HARINA)
      case 'paquetes': {
        return `
          <svg width="280" height="130" viewBox="0 0 280 130" class="figura-svg">
            <g transform="translate(15, 8)">
              <rect x="0" y="10" width="80" height="85" fill="#E0F2FE" stroke="#0284C7" stroke-width="3" rx="10"/>
              <rect x="10" y="0" width="60" height="16" fill="#BAE6FD" stroke="#0284C7" stroke-width="2" rx="4"/>
              <text x="40" y="42" font-size="10" font-weight="900" fill="#0369A1" text-anchor="middle">AZÚCAR</text>
              <rect x="15" y="52" width="50" height="26" fill="#0284C7" rx="6"/>
              <text x="40" y="70" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle">500 g</text>
            </g>
            <circle cx="140" cy="55" r="18" fill="#EEF2FF"/>
            <text x="140" y="63" font-size="24" font-weight="900" fill="#4F46E5" text-anchor="middle">+</text>
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

      // 9. ESTIMAR PESO (MANZANA VS BICICLETA)
      case 'estimar_peso': {
        return `
          <div style="display: flex; gap: 1.5rem; justify-content: center; align-items: center; background: white; padding: 1rem 1.5rem; border-radius: 12px; border: 2px solid #E2E8F0;">
            <div style="text-align: center;">🍎<br><b style="color: #059669;">~150 gramos</b><br><span style="font-size: 0.75rem; color:#64748B;">(Liviana)</span></div>
            <span style="font-size: 1.5rem; color: #94A3B8;">vs</span>
            <div style="text-align: center;">🚲<br><b style="color: #DC2626;">~12 kilogramos</b><br><span style="font-size: 0.75rem; color:#64748B;">(Pesada)</span></div>
          </div>
        `;
      }

      // 10. FIGURAS 3D PARA APILAR
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

      // 11. CUBO 3D DETALLADO
      case 'cubo_3d': {
        return `
          <svg width="150" height="150" viewBox="0 0 150 150">
            <polygon points="75,25 125,50 75,75 25,50" fill="#A5B4FC" stroke="#4F46E5" stroke-width="2"/>
            <polygon points="25,50 75,75 75,130 25,105" fill="#818CF8" stroke="#4F46E5" stroke-width="2"/>
            <polygon points="75,75 125,50 125,105 75,130" fill="#6366F1" stroke="#4F46E5" stroke-width="2"/>
            <text x="75" y="145" font-size="11" font-weight="800" fill="#4F46E5" text-anchor="middle">6 caras cuadradas iguales</text>
          </svg>
        `;
      }

      // 12. CILINDRO DESPIECE (BASES CIRCULARES)
      case 'cilindro_despiece': {
        return `
          <div style="display: flex; gap: 1.5rem; align-items: center; justify-content: center; background: white; padding: 0.8rem 1.5rem; border-radius: 12px; border: 2px solid #E2E8F0;">
            <div style="text-align: center;"><span style="font-size: 2.5rem;">🛢️</span><br><b style="font-size: 0.85rem;">Cilindro</b></div>
            <span style="font-size: 1.5rem; color: #6366F1;">➔</span>
            <div style="text-align: center;"><span style="font-size: 2rem;">⭕ ⭕</span><br><b style="font-size: 0.85rem; color: #10B981;">2 caras planas circulares</b></div>
          </div>
        `;
      }

      // 13. DESCOMPOSICIÓN BLOQUES MULTIBASE
      case 'descomposicion': {
        const n = grafico.numero;
        const c = Math.floor(n / 100);
        const d = Math.floor((n % 100) / 10);
        const u = n % 10;
        return `
          <div style="background: white; border: 2px solid #93C5FD; border-radius: 14px; padding: 1rem 1.5rem; text-align: center; max-width: 440px; margin: 0 auto; box-shadow: var(--shadow-sm);">
            <div style="font-size: 0.8rem; font-weight: 800; color: #0284C7; text-transform: uppercase; margin-bottom: 0.4rem;">Número: <span style="font-size: 1.6rem; color: #0369A1; font-weight: 900;">${n}</span></div>
            <div style="display: flex; gap: 0.8rem; justify-content: center; align-items: flex-end; margin-top: 0.5rem; flex-wrap: wrap;">
              <div style="background: #EFF6FF; border: 1.5px solid #3B82F6; padding: 0.4rem 0.6rem; border-radius: 8px; text-align: center;">
                <span style="font-size: 1.5rem;">🟦</span><br>
                <b style="font-size: 0.95rem; color: #1D4ED8;">${c} Centenas</b><br>
                <span style="font-size: 0.8rem; color: #64748B;">(${c * 100})</span>
              </div>
              <span style="font-size: 1.2rem; font-weight: 800; color: #94A3B8;">+</span>
              <div style="background: #FEF2F2; border: 1.5px solid #EF4444; padding: 0.4rem 0.6rem; border-radius: 8px; text-align: center;">
                <span style="font-size: 1.5rem;">🔴</span><br>
                <b style="font-size: 0.95rem; color: #B91C1C;">${d} Decenas</b><br>
                <span style="font-size: 0.8rem; color: #64748B;">(${d * 10})</span>
              </div>
              <span style="font-size: 1.2rem; font-weight: 800; color: #94A3B8;">+</span>
              <div style="background: #FEFCE8; border: 1.5px solid #EAB308; padding: 0.4rem 0.6rem; border-radius: 8px; text-align: center;">
                <span style="font-size: 1.5rem;">🟨</span><br>
                <b style="font-size: 0.95rem; color: #A16207;">${u} Unidades</b><br>
                <span style="font-size: 0.8rem; color: #64748B;">(${u})</span>
              </div>
            </div>
          </div>
        `;
      }

      // 14. COMPARAR NÚMEROS HASTA 1.000
      case 'comparar_numeros': {
        const cards = grafico.numeros.map(n => `
          <div style="background: white; border: 2px solid #6366F1; border-radius: 10px; padding: 0.6rem 0.8rem; font-size: 1.3rem; font-weight: 900; color: #4F46E5; box-shadow: var(--shadow-sm);">
            ${n}
          </div>
        `).join('');
        return `
          <div style="text-align: center;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #64748B; margin-bottom: 0.5rem;">Compara las centenas y decenas:</div>
            <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">${cards}</div>
          </div>
        `;
      }

      // 15. OPERACIÓN VERTICAL (CUADRÍCULA ESCOLAR)
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

      // 16. MULTIPLICACIÓN GRUPOS
      case 'multiplicacion_grupos': {
        const rows = [];
        for (let g = 0; g < grafico.grupos; g++) {
          rows.push(`<div style="background: white; border: 1.5px solid #CBD5E1; padding: 0.4rem 0.6rem; border-radius: 8px; font-weight: 700;">📦 Grupo ${g+1}: <span style="letter-spacing: 2px;">${'⭐'.repeat(grafico.porGrupo)}</span></div>`);
        }
        return `
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; max-width: 450px;">
            ${rows.join('')}
          </div>
        `;
      }

      // 17. DIVISIÓN REPARTO
      case 'division_reparto': {
        const porGrupo = Math.floor(grafico.total / grafico.grupos);
        const boxes = [];
        for (let g = 0; g < grafico.grupos; g++) {
          boxes.push(`<div style="background: white; border: 2px solid #93C5FD; padding: 0.5rem 0.75rem; border-radius: 8px; text-align: center;"><b>Equipo ${g+1}</b><br><span style="font-size: 1.2rem;">${'⚽'.repeat(porGrupo)}</span><br><small style="color:#0284C7; font-weight:800;">${porGrupo} niños</small></div>`);
        }
        return `<div style="display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap;">${boxes.join('')}</div>`;
      }

      // 18. RESTAS SUCESIVAS
      case 'restas_sucesivas': {
        return `
          <div style="background: white; border: 2px solid #E2E8F0; border-radius: 12px; padding: 0.8rem 1.25rem; font-family: monospace; font-size: 1.1rem; text-align: center; font-weight: 800;">
            <div style="color: #6366F1;">15 - 5 = 10 (1ª resta)</div>
            <div style="color: #8B5CF6;">10 - 5 = 5  (2ª resta)</div>
            <div style="color: #10B981;"> 5 - 5 = 0  (3ª resta)</div>
            <div style="margin-top: 0.4rem; font-size: 0.85rem; color: #64748B;">¡Se restó el 5 exactamente 3 veces!</div>
          </div>
        `;
      }

      // 19. PROBLEMAS DE COMPRA Y VUELTO
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

      case 'problema_lectura': {
        return `
          <div style="display: flex; gap: 1rem; align-items: center; background: white; padding: 0.85rem 1.5rem; border-radius: 12px; border: 2px solid #DDD6FE;">
            <span style="font-size: 2.5rem;">📖</span>
            <div>
              <b style="font-size: 1.1rem; color: #6D28D9;">Libro de 60 páginas</b>
              <div style="font-weight: 700; color: #64748B;">Meta: 10 páginas por día</div>
            </div>
          </div>
        `;
      }

      // 20. SECUENCIA NUMÉRICA
      case 'secuencia': {
        const chips = grafico.numeros.map(n => `
          <div class="chip-num ${n === '❓' ? 'chip-q' : ''}">${n}</div>
        `).join('<span style="font-size: 1.3rem; color: #94A3B8;">➜</span>');
        return `<div class="secuencia-chips">${chips}</div>`;
      }

      // 21. PICTOGRAMA CLÁSICO
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
              📗 Pictograma: Cada 📕 = 1 libro
            </div>
            <table class="pictograma-table">${rows}</table>
          </div>
        `;
      }

      // 22. PICTOGRAMA CON ESCALA (CADA 🌱 = 2 PLANTAS)
      case 'pictograma_escala': {
        const rows = grafico.datos.map(d => `
          <tr>
            <td style="width: 110px;">${d.etiqueta}</td>
            <td style="font-size: 1.4rem; letter-spacing: 4px;">${d.icono.repeat(d.cantidad)}</td>
            <td style="width: 70px; color: #059669; font-weight: 800;">= ${d.total}</td>
          </tr>
        `).join('');
        return `
          <div style="width: 100%; max-width: 420px;">
            <div style="background: #ECFDF5; border: 1.5px solid #A7F3D0; color: #065F46; padding: 0.35rem; border-radius: 6px; font-size: 0.85rem; font-weight: 800; text-align: center; margin-bottom: 0.5rem;">
              🌱 Escala del huerto: Cada símbolo 🌱 = 2 plantas
            </div>
            <table class="pictograma-table">${rows}</table>
          </div>
        `;
      }

      // 23. BARRAS RECICLAJE
      case 'barras_reciclaje': {
        const cols = grafico.datos.map(d => `
          <div class="barra-col">
            <div class="barra-rect" style="height: ${d.valor * 16}px; background: ${d.color};">
              ${d.valor}
            </div>
            <div class="barra-label">${d.etiqueta}</div>
          </div>
        `).join('');
        return `<div class="barras-container">${cols}</div>`;
      }

      default:
        return `<div style="text-align:center; font-size: 2.5rem;">🎯</div>`;
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
