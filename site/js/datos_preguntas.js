/**
 * Banco completo de preguntas y fichas interactivas para Matemática 3° Básico
 * Basado estrictamente en la Guía de Estudio Oficial (11 OA) y las páginas del libro.
 * Texto 100% anónimo, neutral y sin errores ortográficos.
 */

const TEMAS_INFO = {
  1: { id: 1, oa: 25, categoria: "datos", nombre: "Pictogramas y Gráficos", icono: "📊", color: "#FF7675" },
  2: { id: 2, oa: 15, categoria: "geometria", nombre: "Figuras 2D y 3D", icono: "🔷", color: "#6C5CE7" },
  3: { id: 3, oa: 21, categoria: "geometria", nombre: "Perímetro", icono: "📐", color: "#00CEC9" },
  4: { id: 4, oa: 22, categoria: "geometria", nombre: "Medidas de Peso", icono: "⚖️", color: "#FD9644" },
  5: { id: 5, oa: "2, 5 y 3", categoria: "numeros", nombre: "Números hasta el 1.000", icono: "🔢", color: "#0984E3" },
  6: { id: 6, oa: 6, categoria: "numeros", nombre: "Adición y Sustracción", icono: "➕➖", color: "#E84393" },
  7: { id: 7, oa: 8, categoria: "numeros", nombre: "Multiplicación", icono: "✖️", color: "#2ED573" },
  8: { id: 8, oa: 9, categoria: "numeros", nombre: "División", icono: "➗", color: "#1E90FF" },
  9: { id: 9, oa: 10, categoria: "numeros", nombre: "Problemas Cotidianos", icono: "🛒", color: "#FFA502" },
  10: { id: 10, oa: 11, categoria: "datos", nombre: "Fracciones", icono: "🍕", color: "#FF4757" },
  11: { id: 11, oa: 12, categoria: "numeros", nombre: "Patrones Numéricos", icono: "🔁", color: "#8E44AD" }
};

const PREGUNTAS_DB = [
  // --- TEMA 1: PICTOGRAMAS Y GRÁFICOS (OA 25) ---
  {
    temaId: 1,
    pregunta: "En una feria escolar de lectura se registraron los libros recolectados en un pictograma donde cada 📕 representa 1 libro. ¿Cuál fue el tipo de libro MÁS recolectado?",
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
    explicacion: "¡Muy bien! La categoría 'Cuentos' tiene 7 libros representados (es la fila más larga), por lo tanto es la más recolectada."
  },
  {
    temaId: 1,
    pregunta: "En la votación de 'Frutas favoritas' del curso: Manzana obtuvo 5 votos, Plátano obtuvo 3 votos y Naranja obtuvo 5 votos. ¿Cuántos estudiantes en TOTAL participaron?",
    grafico: {
      tipo: "barras",
      datos: [
        { etiqueta: "Manzana 🍎", valor: 5, color: "#FF7675" },
        { etiqueta: "Plátano 🍌", valor: 3, color: "#FDCB6E" },
        { etiqueta: "Naranja 🍊", valor: 5, color: "#FFA502" }
      ]
    },
    opciones: ["10 estudiantes", "12 estudiantes", "13 estudiantes", "15 estudiantes"],
    correcta: 2,
    explicacion: "Sumamos los votos de todas las frutas: 5 (manzana) + 3 (plátano) + 5 (naranja) = 13 estudiantes en total."
  },

  // --- TEMA 2: FIGURAS 2D Y 3D (OA 15) ---
  {
    temaId: 2,
    pregunta: "En una clase de matemáticas se quiere construir una torre apilando figuras (poniendo una encima de otra). ¿Cuál de estas figuras NO se puede usar porque rodaría y botaría la torre?",
    grafico: {
      tipo: "figuras3d"
    },
    opciones: ["El cubo", "El cilindro", "La esfera", "Un prisma rectangular"],
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
    explicacion: "¡Exacto! El cubo tiene 6 caras que son cuadrados idénticos, como un dado de juego clásico."
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
    explicacion: "El perímetro es la medida de todo el contorno: sumamos sus 4 lados: 4 cm + 4 cm + 4 cm + 4 cm = 16 cm."
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
    explicacion: "El rectángulo tiene dos lados de 6 cm y dos lados de 3 cm: 6 + 3 + 6 + 3 = 18 cm."
  },

  // --- TEMA 4: MEDIDAS DE PESO (OA 22) ---
  {
    temaId: 4,
    pregunta: "¿A cuántos gramos (g) equivale exactamente 1 kilogramo (1 kg)?",
    grafico: {
      tipo: "balanza"
    },
    opciones: ["100 gramos", "500 gramos", "1.000 gramos", "10 gramos"],
    correcta: 2,
    explicacion: "¡Regla fundamental! 1 kilogramo (1 kg) son exactamente 1.000 gramos (1.000 g)."
  },
  {
    temaId: 4,
    pregunta: "Si en la despensa hay dos paquetes de harina de 500 gramos cada uno, ¿cuánto pesan juntos?",
    grafico: {
      tipo: "paquetes"
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
      tipo: "descomposicion",
      numero: 356
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
    pregunta: "¿Cómo se escribe en palabras el número 125?",
    grafico: {
      tipo: "descomposicion",
      numero: 125
    },
    opciones: [
      "Ciento veinte y cinco",
      "Ciento veinticinco",
      "Cien veinticinco",
      "Doscientos veinticinco"
    ],
    correcta: 1,
    explicacion: "Los números de la familia del veinte se escriben en una sola palabra: 'veinticinco', por lo tanto es 'ciento veinticinco'."
  },

  // --- TEMA 6: ADICIÓN Y SUSTRACCIÓN HASTA EL 1.000 (OA 6) ---
  {
    temaId: 6,
    pregunta: "Calcula la suma con reserva: 268 + 157",
    grafico: {
      tipo: "operacion_vertical",
      op: "+",
      n1: 268,
      n2: 157,
      reserva: "1 1"
    },
    opciones: ["415", "425", "435", "325"],
    correcta: 1,
    explicacion: "8 + 7 = 15 (colocamos 5 y reservamos 1); 6 + 5 + 1 = 12 (colocamos 2 y reservamos 1); 2 + 1 + 1 = 4. Resultado: 425."
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
    explicacion: "Al 2 no le podemos restar 8, hacemos canje con la decena (12 - 8 = 4). Luego 14 - 7 = 7 y 3 - 1 = 2. Resultado: 274."
  },

  // --- TEMA 7: MULTIPLICACIÓN (OA 8) ---
  {
    temaId: 7,
    pregunta: "¿Qué multiplicación representa la suma reiterada: 3 + 3 + 3 + 3 = 12?",
    grafico: {
      tipo: "multiplicacion_grupos",
      grupos: 4,
      porGrupo: 3
    },
    opciones: ["3 × 3 = 9", "4 × 3 = 12", "4 + 3 = 7", "3 × 5 = 15"],
    correcta: 1,
    explicacion: "El número 3 se repite 4 veces, por eso se expresa como 4 × 3 = 12 (4 veces 3)."
  },
  {
    temaId: 7,
    pregunta: "En una librería hay 6 cajas con 5 lápices cada una. ¿Cuántos lápices hay en total?",
    grafico: {
      tipo: "multiplicacion_grupos",
      grupos: 6,
      porGrupo: 5
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
      tipo: "division_reparto",
      total: 9,
      grupos: 3
    },
    opciones: ["2 bolitas", "3 bolitas", "4 bolitas", "6 bolitas"],
    correcta: 1,
    explicacion: "9 dividido en 3 partes iguales es 3 (porque 3 × 3 = 9). Operación: 9 ÷ 3 = 3."
  },
  {
    temaId: 8,
    pregunta: "En un taller de manualidades hay 36 botones y se guardan en 4 cajitas en cantidades iguales. ¿Cuántos botones van en cada cajita?",
    grafico: {
      tipo: "division_reparto",
      total: 36,
      grupos: 4
    },
    opciones: ["8 botones", "9 botones", "7 botones", "6 botones"],
    correcta: 1,
    explicacion: "36 ÷ 4 = 9 botones en cada cajita (porque 9 × 4 = 36)."
  },

  // --- TEMA 9: PROBLEMAS COTIDIANOS (OA 10) ---
  {
    temaId: 9,
    pregunta: "Si compras 3 lápices que cuestan $200 cada uno, ¿cuánto debes pagar en total?",
    grafico: {
      tipo: "problema_compra",
      items: 3,
      precio: 200
    },
    opciones: ["$500", "$600", "$700", "$200"],
    correcta: 1,
    explicacion: "3 lápices × $200 cada uno = $600 en total (200 + 200 + 200 = 600)."
  },
  {
    temaId: 9,
    pregunta: "Si pagas los $600 con una moneda de $1.000, ¿cuánto dinero te deben dar de vuelto?",
    grafico: {
      tipo: "problema_vuelto",
      pago: 1000,
      costo: 600
    },
    opciones: ["$300", "$400", "$500", "$200"],
    correcta: 1,
    explicacion: "Restamos el dinero entregado menos el costo: $1.000 - $600 = $400 de vuelto."
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
    explicacion: "La pizza está dividida en 4 partes iguales (denominador = 4) y se tomó 1 (numerador = 1): representa 1/4 (un cuarto)."
  },
  {
    temaId: 10,
    pregunta: "Una barra de chocolate tiene 2 partes iguales. Si le compartes 1 mitad a un amigo, ¿qué fracción le diste?",
    grafico: {
      tipo: "chocolate"
    },
    opciones: ["1/4 (un cuarto)", "1/2 (un medio)", "2/2 (toda la barra)", "1/3 (un tercio)"],
    correcta: 1,
    explicacion: "1 parte de un total de 2 partes iguales es 1/2, que se lee 'un medio' o la mitad."
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
    explicacion: "Cada número se obtiene sumando 2 al número anterior: 2+2=4, 4+2=6, 6+2=8. Por lo tanto, 8 + 2 = 10."
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

// Fichas de estudio enriquecidas con soporte interactivo
const FICHAS_ESTUDIO = [
  {
    id: 1,
    tema: "Pictogramas y Gráficos (OA 25)",
    categoria: "datos",
    icono: "📊",
    color: "#FF7675",
    regla: "Los pictogramas usan símbolos o dibujos para representar cantidades (ejemplo: 📕 = 1 libro).",
    puntos: [
      "Para saber el total, suma todos los símbolos de todas las filas.",
      "Para saber cuál es el más elegido o menos elegido, busca la fila más larga o más corta.",
      "Para encontrar diferencias, resta el valor mayor menos el valor menor."
    ],
    widget: "pictograma"
  },
  {
    id: 2,
    tema: "Figuras 2D y Cuerpos 3D (OA 15)",
    categoria: "geometria",
    icono: "🔷",
    color: "#6C5CE7",
    regla: "Para apilar una torre, el cuerpo 3D DEBE tener al menos una cara plana (como el cubo o cilindro). La esfera rueda y no se puede apilar.",
    puntos: [
      "Figuras 2D (planas): Círculo, Triángulo (3 lados), Cuadrado (4 lados iguales), Rectángulo.",
      "Cuerpos 3D (volumen): Cubo (6 caras cuadradas), Cilindro (2 caras planas circulares), Esfera (redonda), Cono (1 cara plana circular).",
      "Los vértices son las esquinas y las aristas son los bordes que unen las caras."
    ],
    widget: "figuras3d"
  },
  {
    id: 3,
    tema: "Perímetro (OA 21)",
    categoria: "geometria",
    icono: "📐",
    color: "#00CEC9",
    regla: "El Perímetro (P) es la medida de TODO el contorno. Se calcula sumando la longitud de TODOS sus lados.",
    puntos: [
      "Cuadrado de lado 4 cm: P = 4 + 4 + 4 + 4 = 16 cm.",
      "Rectángulo de 6 cm y 3 cm: P = 6 + 3 + 6 + 3 = 18 cm.",
      "Si está en una cuadrícula, cuenta el borde exterior de cada cuadrito (cada cuadrito = 1 cm)."
    ],
    widget: "perimetro"
  },
  {
    id: 4,
    tema: "Medidas de Peso (OA 22)",
    categoria: "geometria",
    icono: "⚖️",
    color: "#FD9644",
    regla: "1 kilogramo (1 kg) equivale exactamente a 1.000 gramos (1.000 g).",
    puntos: [
      "Objetos livianos se miden en gramos (g): una manzana (150 g), un lápiz (10 g).",
      "Objetos pesados se miden en kilogramos (kg): una persona, un saco de arroz.",
      "Dos paquetes de 500 g hacen exactamente 1 kg (500 + 500 = 1.000 g)."
    ],
    widget: "peso"
  },
  {
    id: 5,
    tema: "Números hasta 1.000 (OA 2, 5 y 3)",
    categoria: "numeros",
    icono: "🔢",
    color: "#0984E3",
    regla: "Descomposición aditiva según el valor posicional: Centenas (C = 100), Decenas (D = 10), Unidades (U = 1).",
    puntos: [
      "Ejemplo: 356 = 300 + 50 + 6 (3 centenas, 5 decenas y 6 unidades).",
      "Escritura: Números del 21 al 29 van en una sola palabra ('veinticinco').",
      "Para comparar números de 3 cifras, mira primero las centenas; si empatan, mira las decenas."
    ],
    widget: "descomposicion"
  },
  {
    id: 6,
    tema: "Adición y Sustracción (OA 6)",
    categoria: "numeros",
    icono: "➕➖",
    color: "#E84393",
    regla: "Suma con reserva y resta con canje: alinear siempre columnas de unidades, decenas y centenas.",
    puntos: [
      "Suma con reserva: si la suma da 10 o más, anotas la unidad y pasas la decena a la siguiente columna como reserva.",
      "Resta con canje: si el número de arriba es menor, le pides prestada 1 decena al compañero de la izquierda.",
      "Ejemplo suma: 268 + 157 = 425 | Ejemplo resta: 452 - 178 = 274."
    ],
    widget: "operaciones"
  },
  {
    id: 7,
    tema: "Multiplicación (OA 8)",
    categoria: "numeros",
    icono: "✖️",
    color: "#2ED573",
    regla: "Multiplicar es sumar el mismo número varias veces (suma reiterada).",
    puntos: [
      "3 + 3 + 3 + 3 = 12 se escribe 4 × 3 = 12 (4 veces 3).",
      "El orden de los factores no altera el producto: 4 × 3 = 3 × 4 = 12.",
      "Todo número multiplicado por 1 es el mismo número; multiplicado por 0 es 0."
    ],
    widget: "multiplicacion"
  },
  {
    id: 8,
    tema: "División (OA 9)",
    categoria: "numeros",
    icono: "➗",
    color: "#1E90FF",
    regla: "Dividir es repartir una cantidad en partes exactamente IGUALES sin que sobre nada.",
    puntos: [
      "9 ÷ 3 = 3 porque al repartir 9 elementos en 3 grupos, cada grupo recibe 3.",
      "La división es la operación inversa de la multiplicación (3 × 3 = 9).",
      "También se puede resolver restando el divisor sucesivamente: 15 - 5 - 5 - 5 = 0 (3 veces)."
    ],
    widget: "division"
  },
  {
    id: 9,
    tema: "Problemas Cotidianos (OA 10)",
    categoria: "numeros",
    icono: "🛒",
    color: "#FFA502",
    regla: "Para resolver problemas: lee con atención la pregunta, identifica los datos y selecciona la operación correcta.",
    puntos: [
      "Si juntas o agregas cosas: SUMA (+).",
      "Si quitas, buscas una diferencia o calculas un vuelto: RESTA (-).",
      "Si repites la misma cantidad varias veces: MULTIPLICACIÓN (×).",
      "Si repartes equitativamente en partes iguales: DIVISIÓN (÷)."
    ],
    widget: "problemas"
  },
  {
    id: 10,
    tema: "Fracciones (OA 11)",
    categoria: "datos",
    icono: "🍕",
    color: "#FF4757",
    regla: "Una fracción representa partes iguales de un todo (el denominador indica el total de partes y el numerador las que tomas).",
    puntos: [
      "1/2 = Un medio (la mitad).",
      "1/4 = Un cuarto (1 de 4 partes iguales).",
      "3/4 = Tres cuartos (3 de 4 partes iguales).",
      "Para que sea fracción, las partes SIEMPRE deben ser del mismo tamaño."
    ],
    widget: "fracciones"
  },
  {
    id: 11,
    tema: "Patrones Numéricos (OA 12)",
    categoria: "numeros",
    icono: "🔁",
    color: "#8E44AD",
    regla: "Un patrón sigue una regla constante que se repite en cada paso.",
    puntos: [
      "Patrón creciente (suma): 2, 4, 6, 8, 10... (Regla: sumar 2).",
      "Patrón decreciente (resta): 100, 90, 80, 70, 60... (Regla: restar 10).",
      "Para encontrar la regla, resta dos números consecutivos de la secuencia."
    ],
    widget: "patrones"
  }
];
