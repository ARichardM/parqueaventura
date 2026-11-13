/**
 * Banco completo de preguntas interactivas para Matemática 3° Básico
 * Basado estrictamente en la Guía de Estudio Oficial (11 OA) y las páginas del libro.
 */

const TEMAS_INFO = {
  1: { id: 1, oa: 25, nombre: "Pictogramas y Gráficos", icono: "📊", color: "#FF7675" },
  2: { id: 2, oa: 15, nombre: "Figuras 2D y 3D", icono: "🔷", color: "#6C5CE7" },
  3: { id: 3, oa: 21, nombre: "Perímetro", icono: "📐", color: "#00CEC9" },
  4: { id: 4, oa: 22, nombre: "Medidas de Peso", icono: "⚖️", color: "#FD9644" },
  5: { id: 5, oa: "2, 5 y 3", nombre: "Números hasta el 1.000", icono: "🔢", color: "#0984E3" },
  6: { id: 6, oa: 6, nombre: "Adición y Sustracción", icono: "➕➖", color: "#E84393" },
  7: { id: 7, oa: 8, nombre: "Multiplicación", icono: "✖️", color: "#2ED573" },
  8: { id: 8, oa: 9, nombre: "División", icono: "➗", color: "#1E90FF" },
  9: { id: 9, oa: 10, nombre: "Problemas Cotidianos", icono: "🛒", color: "#FFA502" },
  10: { id: 10, oa: 11, nombre: "Fracciones", icono: "🍕", color: "#FF4757" },
  11: { id: 11, oa: 12, nombre: "Patrones Numéricos", icono: "🔁", color: "#8E44AD" }
};

const PREGUNTAS_DB = [
  // --- TEMA 1: PICTOGRAMAS Y GRÁFICOS (OA 25) ---
  {
    temaId: 1,
    pregunta: "En la feria del libro del colegio, Elena registró los libros recolectados en un pictograma donde cada 📕 representa 1 libro. ¿Cuál fue el tipo de libro MÁS recolectado?",
    grafico: {
      tipo: "pictograma",
      datos: [
        { etiqueta: "Novelas", icono: "📕", cantidad: 4 },
        { etiqueta: "Poesía", icono: "📕", cantidad: 2 },
        { etiqueta: "Cuentos", icono: "📕", cantidad: 7 },
        { etiqueta: "Ciencia", icono: "📕", cantidad: 1 }
      ]
    },
    opciones: ["Poesía", "Cuentos", "Novelas", "Ciencia"],
    correcta: 1,
    explicacion: "¡Muy bien! Cuentos tiene 7 libros representados (es la fila más larga), por lo tanto es el más recolectado."
  },
  {
    temaId: 1,
    pregunta: "Según la encuesta de 'Frutas favoritas' del curso: Manzana tiene 5 votos, Plátano tiene 3 votos y Naranja tiene 5 votos. ¿Cuántos niños en TOTAL respondieron la encuesta?",
    grafico: {
      tipo: "barras",
      datos: [
        { etiqueta: "Manzana 🍎", valor: 5, color: "#ff7675" },
        { etiqueta: "Plátano 🍌", valor: 3, color: "#ffeaa7" },
        { etiqueta: "Naranja 🍊", valor: 5, color: "#fdcb6e" }
      ]
    },
    opciones: ["10 niños", "12 niños", "13 niños", "15 niños"],
    correcta: 2,
    explicacion: "Sumamos los votos de todas las frutas: 5 (manzana) + 3 (plátano) + 5 (naranja) = 13 niños en total."
  },

  // --- TEMA 2: FIGURAS 2D Y 3D (OA 15) ---
  {
    temaId: 2,
    pregunta: "En una clase de matemáticas se quiere construir una torre apilando figuras (poniendo una encima de otra). ¿Cuál de estas figuras NO se puede usar porque rodaría y botaría la torre?",
    grafico: {
      tipo: "figuras3d",
      figuras: ["cubo", "cilindro", "esfera"]
    },
    opciones: ["El cubo", "El cilindro", "La esfera", "Un bloque rectangular"],
    correcta: 2,
    explicacion: "La esfera es un cuerpo redondo sin caras planas. Si intentas poner algo sobre ella o apilarla, rodará y se caerá."
  },
  {
    temaId: 2,
    pregunta: "¿Qué cuerpo geométrico 3D tiene exactamente 6 caras cuadradas iguales, 8 vértices y 12 aristas?",
    grafico: {
      tipo: "cubo_3d"
    },
    opciones: ["Cilindro", "Cubo", "Pirámide triangular", "Cono"],
    correcta: 1,
    explicacion: "¡Excelente! El cubo (o hexaedro) tiene 6 caras que son cuadrados idénticos, como un dado de juego."
  },

  // --- TEMA 3: PERÍMETRO (OA 21) ---
  {
    temaId: 3,
    pregunta: "Un cuadrado mide 4 cm en cada uno de sus 4 lados. ¿Cuál es su perímetro (P)?",
    grafico: {
      tipo: "cuadrado",
      lado: "4 cm"
    },
    opciones: ["8 cm", "12 cm", "16 cm", "20 cm"],
    correcta: 2,
    explicacion: "El perímetro es el contorno de la figura: sumamos sus 4 lados: 4 cm + 4 cm + 4 cm + 4 cm = 16 cm."
  },
  {
    temaId: 3,
    pregunta: "Una tarjeta rectangular mide 6 cm de largo y 3 cm de ancho. ¿Cuál es su perímetro total?",
    grafico: {
      tipo: "rectangulo",
      largo: "6 cm",
      ancho: "3 cm"
    },
    opciones: ["9 cm", "18 cm", "12 cm", "24 cm"],
    correcta: 1,
    explicacion: "El rectángulo tiene 2 lados de 6 cm y 2 lados de 3 cm: 6 + 3 + 6 + 3 = 18 cm."
  },

  // --- TEMA 4: MEDIDAS DE PESO (OA 22) ---
  {
    temaId: 4,
    pregunta: "¿A cuántos gramos (g) equivale exactamente 1 kilogramo (1 kg)?",
    grafico: {
      tipo: "balanza",
      peso: "1 kg = ?"
    },
    opciones: ["100 gramos", "500 gramos", "1.000 gramos", "10 gramos"],
    correcta: 2,
    explicacion: "¡Regla de oro! 1 kilogramo (1 kg) son exactamente 1.000 gramos (1.000 g)."
  },
  {
    temaId: 4,
    pregunta: "Si en la cocina tenemos dos paquetes de azúcar de 500 gramos cada uno, ¿cuánto pesan juntos?",
    grafico: {
      tipo: "paquetes",
      p1: "500 g",
      p2: "500 g"
    },
    opciones: ["1 kilogramo (1 kg)", "2 kilogramos (2 kg)", "500 gramos", "750 gramos"],
    correcta: 0,
    explicacion: "500 g + 500 g = 1.000 gramos, y 1.000 gramos equivalen exactamente a 1 kilogramo (1 kg)."
  },

  // --- TEMA 5: NÚMEROS HASTA EL 1.000 (OA 2, 5 Y 3) ---
  {
    temaId: 5,
    pregunta: "¿Cuál es la descomposición aditiva correcta del número 356?",
    grafico: {
      tipo: "tabla_posicional",
      c: 3, d: 5, u: 6
    },
    opciones: [
      "30 + 50 + 6",
      "300 + 50 + 6",
      "300 + 5 + 6",
      "300 + 500 + 6"
    ],
    correcta: 1,
    explicacion: "El 3 vale 300 (3 centenas), el 5 vale 50 (5 decenas) y el 6 vale 6 (6 unidades): 300 + 50 + 6 = 356."
  },
  {
    temaId: 5,
    pregunta: "¿Cómo se escribe con palabras el número 125?",
    grafico: { tipo: "texto_numero", numero: "125" },
    opciones: [
      "Ciento veinte y cinco",
      "Ciento veinticinco",
      "Cien veinticinco",
      "Doscientos veinticinco"
    ],
    correcta: 1,
    explicacion: "Los números entre el 21 y el 29 se escriben en una sola palabra: 'veinticinco', por eso es 'ciento veinticinco'."
  },

  // --- TEMA 6: ADICIÓN Y SUSTRACCIÓN HASTA EL 1.000 (OA 6) ---
  {
    temaId: 6,
    pregunta: "Calcula la suma con reserva: 268 + 157",
    grafico: {
      tipo: "operacion_vertical",
      op: "+",
      n1: 268,
      n2: 157
    },
    opciones: ["415", "425", "435", "325"],
    correcta: 1,
    explicacion: "8 + 7 = 15 (5 y reservamos 1); 6 + 5 + 1 = 12 (2 y reservamos 1); 2 + 1 + 1 = 4. Resultado: 425."
  },
  {
    temaId: 6,
    pregunta: "Calcula la resta con canje: 452 - 178",
    grafico: {
      tipo: "operacion_vertical",
      op: "-",
      n1: 452,
      n2: 178
    },
    opciones: ["274", "284", "326", "276"],
    correcta: 0,
    explicacion: "Al 2 no le podemos restar 8, pedimos canje a la decena (12 - 8 = 4). Luego 14 - 7 = 7 y 3 - 1 = 2. Resultado: 274."
  },

  // --- TEMA 7: MULTIPLICACIÓN (OA 8) ---
  {
    temaId: 7,
    pregunta: "¿Qué multiplicación representa la suma reiterada: 3 + 3 + 3 + 3 = 12?",
    grafico: {
      tipo: "grupos",
      cantGrupos: 4,
      itemsPorGrupo: 3,
      icono: "⭐"
    },
    opciones: ["3 × 3 = 9", "4 × 3 = 12", "4 + 3 = 7", "3 × 5 = 15"],
    correcta: 1,
    explicacion: "El número 3 se repite 4 veces, por eso se escribe 4 × 3 = 12 (4 veces 3)."
  },
  {
    temaId: 7,
    pregunta: "En una librería hay 6 cajas con 5 lápices cada una. ¿Cuántos lápices hay en total?",
    grafico: {
      tipo: "cajas",
      cajas: 6,
      lapices: 5
    },
    opciones: ["11 lápices", "25 lápices", "30 lápices", "35 lápices"],
    correcta: 2,
    explicacion: "Multiplicamos 6 cajas × 5 lápices cada una = 30 lápices en total."
  },

  // --- TEMA 8: DIVISIÓN (OA 9) ---
  {
    temaId: 8,
    pregunta: "Si repartes 9 bolitas en 3 grupos iguales, ¿cuántas bolitas quedan en cada grupo?",
    grafico: {
      tipo: "reparto",
      total: 9,
      grupos: 3,
      icono: "🔵"
    },
    opciones: ["2 bolitas", "3 bolitas", "4 bolitas", "6 bolitas"],
    correcta: 1,
    explicacion: "9 dividido en 3 partes iguales es 3 (porque 3 × 3 = 9). Operación: 9 ÷ 3 = 3."
  },
  {
    temaId: 8,
    pregunta: "Sara tiene 36 pinches y los reparte en 4 bolsitas en partes iguales. ¿Cuántos pinches habrá en cada bolsa?",
    grafico: {
      tipo: "reparto",
      total: 36,
      grupos: 4,
      icono: "🎀"
    },
    opciones: ["8 pinches", "9 pinches", "7 pinches", "6 pinches"],
    correcta: 1,
    explicacion: "36 ÷ 4 = 9 pinches por bolsita (porque 9 × 4 = 36)."
  },

  // --- TEMA 9: PROBLEMAS COTIDIANOS (OA 10) ---
  {
    temaId: 9,
    pregunta: "Si compras 3 lápices que cuestan $200 cada uno, ¿cuánto debes pagar en total en el almacén?",
    grafico: {
      tipo: "monedas",
      precio: "$200 c/u",
      cantidad: 3
    },
    opciones: ["$500", "$600", "$700", "$200"],
    correcta: 1,
    explicacion: "3 lápices × $200 cada uno = $600 en total (200 + 200 + 200 = 600)."
  },
  {
    temaId: 9,
    pregunta: "Si pagas los $600 con una moneda de $1.000, ¿cuánto dinero te deben dar de vuelto?",
    grafico: {
      tipo: "vuelto",
      pago: "$1.000",
      costo: "$600"
    },
    opciones: ["$300", "$400", "$500", "$200"],
    correcta: 1,
    explicacion: "Restamos lo que entregaste menos lo que gastaste: $1.000 - $600 = $400 de vuelto."
  },

  // --- TEMA 10: FRACCIONES (OA 11) ---
  {
    temaId: 10,
    pregunta: "Una pizza se dividió en 4 porciones iguales. Si alguien se come 1 porción, ¿qué fracción de la pizza se comió?",
    grafico: {
      tipo: "pizza",
      totalPartes: 4,
      pintadas: 1
    },
    opciones: ["1/2 (un medio)", "1/4 (un cuarto)", "3/4 (tres cuartos)", "1/3 (un tercio)"],
    correcta: 1,
    explicacion: "La pizza tiene 4 partes en total (denominador = 4) y comió 1 (numerador = 1): se comió 1/4 (un cuarto)."
  },
  {
    temaId: 10,
    pregunta: "Una barra de chocolate tiene 2 partes iguales. Si le compartes 1 mitad a tu mejor amigo, ¿qué fracción le diste?",
    grafico: {
      tipo: "chocolate",
      totalPartes: 2,
      pintadas: 1
    },
    opciones: ["1/4 (un cuarto)", "1/2 (un medio)", "2/2 (todo)", "1/3 (un tercio)"],
    correcta: 1,
    explicacion: "1 parte de 2 en total es 1/2, que se lee 'un medio' o la mitad."
  },

  // --- TEMA 11: PATRONES NUMÉRICOS (OA 12) ---
  {
    temaId: 11,
    pregunta: "Observa la secuencia: 2 - 4 - 6 - 8 - ... ¿Cuál es la regla del patrón y qué número viene a continuación?",
    grafico: {
      tipo: "secuencia",
      numeros: ["2", "4", "6", "8", "❓"]
    },
    opciones: [
      "Regla: Sumar 1 / Viene el 9",
      "Regla: Sumar 2 / Viene el 10",
      "Regla: Restar 2 / Viene el 6",
      "Regla: Sumar 4 / Viene el 12"
    ],
    correcta: 1,
    explicacion: "Cada número se obtiene sumando 2 al anterior (2+2=4, 4+2=6, 6+2=8). 8 + 2 = 10."
  },
  {
    temaId: 11,
    pregunta: "Observa esta secuencia hacia atrás: 100 - 90 - 80 - 70 - ... ¿Qué número sigue?",
    grafico: {
      tipo: "secuencia",
      numeros: ["100", "90", "80", "70", "❓"]
    },
    opciones: ["80", "65", "60", "50"],
    correcta: 2,
    explicacion: "La regla es restar 10 en cada paso (patrón decreciente): 70 - 10 = 60."
  }
];

// Fichas resumen de estudio para repasar rápido (Machete amigable)
const FICHAS_ESTUDIO = [
  {
    tema: "Pictogramas y Gráficos (OA 25)",
    icono: "📊",
    puntos: [
      "Los pictogramas usan símbolos o dibujos para representar cantidades (ej. 📕 = 1 libro).",
      "Para saber el total, suma todos los símbolos.",
      "Para saber la diferencia entre dos elementos, resta el mayor menos el menor."
    ]
  },
  {
    tema: "Figuras 2D y Cuerpos 3D (OA 15)",
    icono: "🔷",
    puntos: [
      "Figuras 2D (planas): Círculo, Triángulo (3 lados), Cuadrado (4 lados iguales), Rectángulo.",
      "Cuerpos 3D (con volumen): Cubo (6 caras cuadradas), Cilindro (2 círculos y rueda), Esfera (rueda), Cono.",
      "Para apilar torres, el cuerpo DEBE tener al menos una cara plana (como el cubo o cilindro)."
    ]
  },
  {
    tema: "Perímetro (OA 21)",
    icono: "📐",
    puntos: [
      "El Perímetro (P) es la medida del CONTORNO de una figura.",
      "Se calcula sumando las medidas de TODOS sus lados.",
      "Cuadrado de lado 4 cm: P = 4 + 4 + 4 + 4 = 16 cm.",
      "Rectángulo de 6 cm y 3 cm: P = 6 + 3 + 6 + 3 = 18 cm."
    ]
  },
  {
    tema: "Medidas de Peso (OA 22)",
    icono: "⚖️",
    puntos: [
      "1 kilogramo (1 kg) = 1.000 gramos (1.000 g).",
      "Objetos livianos se miden en gramos (g): una manzana (150 g), un lápiz (10 g).",
      "Objetos pesados se miden en kilogramos (kg): una persona, un saco de papas."
    ]
  },
  {
    tema: "Números hasta 1.000 (OA 2, 5 y 3)",
    icono: "🔢",
    puntos: [
      "Centenas (C) = 100, Decenas (D) = 10, Unidades (U) = 1.",
      "Descomposición aditiva: 356 = 300 + 50 + 6.",
      "Se escribe: 'trescientos cincuenta y seis'."
    ]
  },
  {
    tema: "Adición y Sustracción (OA 6)",
    icono: "➕➖",
    puntos: [
      "Alinear siempre unidades con unidades, decenas con decenas y centenas con centenas.",
      "Suma con reserva: si pasa de 9, pasas la decena a la siguiente columna.",
      "Resta con canje: si no alcanza, le pides prestada 1 decena a la columna vecina."
    ]
  },
  {
    tema: "Multiplicación (OA 8)",
    icono: "✖️",
    puntos: [
      "Multiplicar es sumar el mismo número varias veces (suma reiterada).",
      "3 + 3 + 3 + 3 = 12 es lo mismo que 4 × 3 = 12 (4 veces 3).",
      "Cualquier número multiplicado por 0 es 0; por 1 es el mismo número."
    ]
  },
  {
    tema: "División (OA 9)",
    icono: "➗",
    puntos: [
      "Dividir significa repartir una cantidad en partes exactamente IGUALES.",
      "9 ÷ 3 = 3 porque si repartes 9 bolitas en 3 platos, quedan 3 en cada plato.",
      "También se puede resolver restando el divisor sucesivamente hasta llegar a 0."
    ]
  },
  {
    tema: "Problemas Cotidianos (OA 10)",
    icono: "🛒",
    puntos: [
      "Paso 1: Lee con calma y anota los datos.",
      "Paso 2: ¿Qué me están preguntando? (¿total, vuelto, diferencia?).",
      "Paso 3: Elige la operación (Sumar, Restar, Multiplicar o Dividir) y comprueba tu respuesta."
    ]
  },
  {
    tema: "Fracciones (OA 11)",
    icono: "🍕",
    puntos: [
      "Una fracción representa una o varias partes iguales de un todo.",
      "1/2 = Un medio (la mitad).",
      "1/4 = Un cuarto (1 de 4 partes).",
      "3/4 = Tres cuartos (3 de 4 partes)."
    ]
  },
  {
    tema: "Patrones Numéricos (OA 12)",
    icono: "🔁",
    puntos: [
      "Descubre la regla mirando los primeros números.",
      "Creciente (suma): 2, 4, 6, 8... (Regla: +2).",
      "Decreciente (resta): 100, 90, 80... (Regla: -10)."
    ]
  }
];

