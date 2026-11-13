/**
 * Banco Extendido de Preguntas Interactivas - Matemática 3° Básico
 * Extraídas directamente de las páginas del texto escolar Santillana y la Guía Oficial.
 * 100% Anónimo, sin nombres personales, y con gráficos visuales para CADA pregunta.
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
  // ==========================================
  // TEMA 1: PICTOGRAMAS Y GRÁFICOS (OA 25)
  // ==========================================
  {
    temaId: 1,
    origen: "Libro Tomo 2 - Pág. 236",
    pregunta: "En la feria del libro del colegio se registraron los libros recolectados en un pictograma donde cada 📕 representa 1 libro. ¿Cuál fue el tipo de libro MÁS recolectado?",
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
    explicacion: "¡Muy bien! La fila de 'Cuentos' tiene 7 libros representados, siendo la fila más larga del pictograma."
  },
  {
    temaId: 1,
    origen: "Libro Tomo 2 - Pág. 82 (Huerto escolar)",
    pregunta: "En el huerto escolar se plantaron diferentes hortalizas durante la semana. Cada 🌱 representa 2 plantas. Si hay 4 plantitas de Lechuga en el pictograma, ¿cuántas lechugas se plantaron en total?",
    grafico: {
      tipo: "pictograma_escala",
      escala: "Cada 🌱 = 2 plantas",
      datos: [
        { etiqueta: "Tomates", icono: "🌱", cantidad: 3, total: 6 },
        { etiqueta: "Lechugas", icono: "🌱", cantidad: 4, total: 8 },
        { etiqueta: "Zanahorias", icono: "🌱", cantidad: 2, total: 4 }
      ]
    },
    opciones: ["4 lechugas", "6 lechugas", "8 lechugas", "10 lechugas"],
    correcta: 2,
    explicacion: "Como cada 🌱 vale 2 plantas (escala de 2 en 2): 4 símbolos × 2 plantas = 8 lechugas en total."
  },
  {
    temaId: 1,
    origen: "Libro Tomo 2 - Gráfico de Barras Reciclaje",
    pregunta: "En una campaña de reciclaje del barrio se recolectaron sacos de residuos: Plástico (8 sacos) y Vidrio (5 sacos). ¿Cuántos sacos MÁS de plástico que de vidrio se recolectaron?",
    grafico: {
      tipo: "barras_reciclaje",
      datos: [
        { etiqueta: "Plástico 🧴", valor: 8, color: "#3B82F6" },
        { etiqueta: "Vidrio 🍾", valor: 5, color: "#10B981" },
        { etiqueta: "Papel 📦", valor: 6, color: "#F59E0B" }
      ]
    },
    opciones: ["2 sacos", "3 sacos más", "5 sacos más", "13 sacos"],
    correcta: 1,
    explicacion: "Restamos los sacos de plástico menos los de vidrio para hallar la diferencia: 8 - 5 = 3 sacos más de plástico."
  },

  // ==========================================
  // TEMA 2: FIGURAS 2D Y 3D (OA 15)
  // ==========================================
  {
    temaId: 2,
    origen: "Libro Tomo 2 - Pág. 139 (Apilar torres)",
    pregunta: "En una actividad de geometría se quiere construir una torre apilando figuras (poniendo una encima de otra). ¿Cuál de estas figuras NO se puede usar porque rodaría y botaría la torre?",
    grafico: {
      tipo: "figuras3d"
    },
    opciones: ["El cubo", "El cilindro", "La esfera", "Un prisma rectangular"],
    correcta: 2,
    explicacion: "La esfera es un cuerpo redondo sin caras planas. Si intentas poner algo sobre ella o apilarla, rodará y se caerá."
  },
  {
    temaId: 2,
    origen: "Libro Tomo 2 - Cuerpos Geométricos",
    pregunta: "¿Qué cuerpo geométrico 3D tiene exactamente 6 caras cuadradas iguales, 8 vértices y 12 aristas?",
    grafico: {
      tipo: "cubo_3d"
    },
    opciones: ["Cilindro", "Cubo", "Pirámide triangular", "Cono"],
    correcta: 1,
    explicacion: "¡Exacto! El cubo tiene 6 caras que son cuadrados idénticos, como un dado de juego clásico."
  },
  {
    temaId: 2,
    origen: "Libro Tomo 2 - Caras de Cuerpos 3D",
    pregunta: "El cilindro tiene dos caras planas. ¿Qué forma geométrica 2D tienen esas dos caras?",
    grafico: {
      tipo: "cilindro_despiece"
    },
    opciones: ["Cuadrados", "Círculos", "Triángulos", "Rectángulos"],
    correcta: 1,
    explicacion: "¡Muy bien! Las dos bases planas del cilindro (la de arriba y la de abajo) son círculos perfectos."
  },

  // ==========================================
  // TEMA 3: PERÍMETRO (OA 21)
  // ==========================================
  {
    temaId: 3,
    origen: "Libro Tomo 2 - Pág. 149 (Cuadrículas de perímetro)",
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
    origen: "Libro Tomo 2 - Pág. 149 (Rectángulos)",
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
  {
    temaId: 3,
    origen: "Libro Tomo 2 - Cuadrícula 1x1 cm",
    pregunta: "Un patio de juegos cuadrado mide 5 metros en cada lado. Si se cerca con una cuerda alrededor de todo su contorno, ¿cuántos metros de cuerda se necesitan?",
    grafico: {
      tipo: "cuadrado_5m"
    },
    opciones: ["10 metros", "15 metros", "20 metros", "25 metros"],
    correcta: 2,
    explicacion: "Sumamos los 4 lados del patio: 5 m + 5 m + 5 m + 5 m = 20 metros de contorno (perímetro)."
  },

  // ==========================================
  // TEMA 4: MEDIDAS DE PESO (OA 22)
  // ==========================================
  {
    temaId: 4,
    origen: "Libro Tomo 1 - Balanzas y Peso",
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
    origen: "Libro Tomo 1 - Comparación de Peso",
    pregunta: "Si en la despensa hay dos paquetes de azúcar de 500 gramos cada uno, ¿cuánto pesan juntos?",
    grafico: {
      tipo: "paquetes"
    },
    opciones: ["1 kilogramo (1 kg)", "2 kilogramos (2 kg)", "500 gramos", "750 gramos"],
    correcta: 0,
    explicacion: "500 g + 500 g = 1.000 gramos, y 1.000 gramos equivalen exactamente a 1 kilogramo (1 kg)."
  },
  {
    temaId: 4,
    origen: "Libro Tomo 1 - Estimar Pesos Cotidianos",
    pregunta: "¿Cuál de estos objetos se mide habitualmente en GRAMOS (g) y NO en kilogramos (kg) porque es muy liviano?",
    grafico: {
      tipo: "estimar_peso"
    },
    opciones: ["Un saco de papas", "Una manzana pequeña", "Una bicicleta", "Una persona adulta"],
    correcta: 1,
    explicacion: "Una manzana pequeña pesa aproximadamente 150 gramos. Los sacos de papas, bicicletas y personas se miden en kilogramos."
  },

  // ==========================================
  // TEMA 5: NÚMEROS HASTA EL 1.000 (OA 2, 5 Y 3)
  // ==========================================
  {
    temaId: 5,
    origen: "Libro Tomo 1 - Pág. 10 (Bloques multibase)",
    pregunta: "¿Cuál es la descomposición aditiva correcta del número 356 según su valor posicional?",
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
    origen: "Libro Tomo 1 - Lectura y Escritura",
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
  {
    temaId: 5,
    origen: "Libro Tomo 1 - Comparar Números hasta 1.000",
    pregunta: "¿Cuál de los siguientes números es el MAYOR de todos?",
    grafico: {
      tipo: "comparar_numeros",
      numeros: [789, 879, 897, 798]
    },
    opciones: ["789", "879", "897", "798"],
    correcta: 2,
    explicacion: "Comparamos primero las centenas: 879 y 897 tienen 8 centenas. Luego las decenas: 897 tiene 9 decenas, por lo tanto 897 es el mayor."
  },

  // ==========================================
  // TEMA 6: ADICIÓN Y SUSTRACCIÓN HASTA EL 1.000 (OA 6)
  // ==========================================
  {
    temaId: 6,
    origen: "Libro Tomo 1 - Pág. 230 (Suma con reserva)",
    pregunta: "Calcula la suma alineando columnas: 268 + 157",
    grafico: {
      tipo: "operacion_vertical",
      op: "+",
      n1: 268,
      n2: 157
    },
    opciones: ["415", "425", "435", "325"],
    correcta: 1,
    explicacion: "8 + 7 = 15 (colocamos 5 y reservamos 1); 6 + 5 + 1 = 12 (colocamos 2 y reservamos 1); 2 + 1 + 1 = 4. Resultado: 425."
  },
  {
    temaId: 6,
    origen: "Libro Tomo 1 - Pág. 88 (Resta con canje)",
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
  {
    temaId: 6,
    origen: "Libro Tomo 1 - Pág. 88 (Estrategias de cálculo mental)",
    pregunta: "En una biblioteca escolar habían 340 libros y llegaron 120 libros nuevos. ¿Cuántos libros hay ahora en total?",
    grafico: {
      tipo: "operacion_vertical",
      op: "+",
      n1: 340,
      n2: 120
    },
    opciones: ["450 libros", "460 libros", "470 libros", "360 libros"],
    correcta: 1,
    explicacion: "Sumamos centenas y decenas: 300 + 100 = 400; 40 + 20 = 60. Resultado: 460 libros en total."
  },

  // ==========================================
  // TEMA 7: MULTIPLICACIÓN (OA 8)
  // ==========================================
  {
    temaId: 7,
    origen: "Libro Tomo 2 - Lección 3 (Suma reiterada)",
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
    origen: "Libro Tomo 2 - Cajas de lápices",
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
  {
    temaId: 7,
    origen: "Libro Tomo 2 - Tablas del 7",
    pregunta: "Un paquete de galletas trae 7 galletas. Si compras 4 paquetes iguales, ¿cuántas galletas compraste?",
    grafico: {
      tipo: "multiplicacion_grupos",
      grupos: 4,
      porGrupo: 7
    },
    opciones: ["21 galletas", "24 galletas", "28 galletas", "32 galletas"],
    correcta: 2,
    explicacion: "4 paquetes × 7 galletas cada uno = 28 galletas (4 × 7 = 28)."
  },

  // ==========================================
  // TEMA 8: DIVISIÓN (OA 9)
  // ==========================================
  {
    temaId: 8,
    origen: "Libro Tomo 2 - Pág. 30 (Campeonato de fútbol)",
    pregunta: "Los 30 estudiantes de 3º básico deciden formar equipos para un torneo de fútbol. Si forman 5 equipos con igual cantidad de integrantes, ¿cuántos jugadores tiene cada equipo?",
    grafico: {
      tipo: "division_reparto",
      total: 30,
      grupos: 5
    },
    opciones: ["5 jugadores", "6 jugadores", "7 jugadores", "8 jugadores"],
    correcta: 1,
    explicacion: "Dividimos el total de estudiantes entre la cantidad de equipos: 30 ÷ 5 = 6 jugadores por equipo (porque 6 × 5 = 30)."
  },
  {
    temaId: 8,
    origen: "Libro Tomo 2 - Pág. 167 (Sara y los pinches)",
    pregunta: "Sara tiene 36 pinches y los reparte en 4 bolsitas en partes exactamente iguales. ¿Cuántos pinches habrá en cada bolsita?",
    grafico: {
      tipo: "division_reparto",
      total: 36,
      grupos: 4
    },
    opciones: ["8 pinches", "9 pinches", "7 pinches", "6 pinches"],
    correcta: 1,
    explicacion: "36 ÷ 4 = 9 pinches en cada bolsita (porque 9 × 4 = 36)."
  },
  {
    temaId: 8,
    origen: "Libro Tomo 2 - Pág. 167 (Restas sucesivas)",
    pregunta: "¿Cuánto es 15 ÷ 5 resolviendo con restas sucesivas: 15 - 5 = 10, 10 - 5 = 5, 5 - 5 = 0?",
    grafico: {
      tipo: "restas_sucesivas"
    },
    opciones: ["15 ÷ 5 = 2", "15 ÷ 5 = 3", "15 ÷ 5 = 4", "15 ÷ 5 = 5"],
    correcta: 1,
    explicacion: "Como pudimos restar el número 5 exactamente 3 veces hasta llegar a cero, el resultado es 3."
  },

  // ==========================================
  // TEMA 9: PROBLEMAS COTIDIANOS (OA 10)
  // ==========================================
  {
    temaId: 9,
    origen: "Guía de Estudio Oficial (OA 10)",
    pregunta: "Si compras 3 lápices que cuestan $200 cada uno, ¿cuánto debes pagar en total en el almacén?",
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
    origen: "Guía de Estudio Oficial (OA 10)",
    pregunta: "Si pagas los $600 de la compra con una moneda de $1.000, ¿cuánto dinero te deben dar de vuelto?",
    grafico: {
      tipo: "problema_vuelto",
      pago: 1000,
      costo: 600
    },
    opciones: ["$300", "$400", "$500", "$200"],
    correcta: 1,
    explicacion: "Restamos el dinero entregado menos el costo: $1.000 - $600 = $400 de vuelto."
  },
  {
    temaId: 9,
    origen: "Libro Tomo 1 - Problemas de lectura",
    pregunta: "Un estudiante está leyendo un libro de 60 páginas. Si lee 10 páginas cada día, ¿en cuántos días terminará de leer el libro completo?",
    grafico: {
      tipo: "problema_lectura"
    },
    opciones: ["5 días", "6 días", "7 días", "10 días"],
    correcta: 1,
    explicacion: "Dividimos las 60 páginas entre las 10 páginas diarias: 60 ÷ 10 = 6 días."
  },

  // ==========================================
  // TEMA 10: FRACCIONES (OA 11)
  // ==========================================
  {
    temaId: 10,
    origen: "Guía Oficial - Partes de un todo",
    pregunta: "Una pizza redonda se dividió en 4 porciones iguales. Si alguien se come 1 porción, ¿qué fracción de la pizza se comió?",
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
    origen: "Libro Tomo 2 - Fracciones de barra",
    pregunta: "Una barra de chocolate tiene 2 partes iguales. Si le compartes 1 mitad a un compañero, ¿qué fracción le diste?",
    grafico: {
      tipo: "chocolate"
    },
    opciones: ["1/4 (un cuarto)", "1/2 (un medio)", "2/2 (toda la barra)", "1/3 (un tercio)"],
    correcta: 1,
    explicacion: "1 parte de un total de 2 partes iguales es 1/2, que se lee 'un medio' o la mitad."
  },
  {
    temaId: 10,
    origen: "Libro Tomo 2 - Tres cuartos",
    pregunta: "Si un pastel se divide en 4 trozos iguales y se sirven 3 trozos en una fiesta, ¿qué fracción del pastel se sirvió?",
    grafico: {
      tipo: "pizza_tres_cuartos"
    },
    opciones: ["1/4", "2/4", "3/4 (tres cuartos)", "4/4"],
    correcta: 2,
    explicacion: "Se sirvieron 3 partes de un total de 4: representa 3/4 (tres cuartos) del pastel."
  },

  // ==========================================
  // TEMA 11: PATRONES NUMÉRICOS (OA 12)
  // ==========================================
  {
    temaId: 11,
    origen: "Guía Oficial - Secuencia creciente",
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
    origen: "Libro Tomo 1 - Secuencia decreciente",
    pregunta: "Observa esta secuencia hacia atrás: 100 - 90 - 80 - 70 - ... ¿Qué número sigue?",
    grafico: {
      tipo: "secuencia",
      numeros: ["100", "90", "80", "70", "❓"]
    },
    opciones: ["80", "65", "60", "50"],
    correcta: 2,
    explicacion: "La regla es restar 10 en cada paso (patrón decreciente): 70 - 10 = 60."
  },
  {
    temaId: 11,
    origen: "Libro Tomo 1 - Patrones de 5 en 5",
    pregunta: "Observa la secuencia del libro: 5 - 10 - 15 - 20 - ... ¿Cuál es el siguiente número?",
    grafico: {
      tipo: "secuencia",
      numeros: ["5", "10", "15", "20", "❓"]
    },
    opciones: ["22", "25", "30", "35"],
    correcta: 1,
    explicacion: "La regla es sumar 5 en cada paso: 20 + 5 = 25."
  }
];

// Fichas de estudio enriquecidas con soporte interactivo y mini-juegos
const FICHAS_ESTUDIO = [
  {
    id: 1,
    tema: "Pictogramas y Gráficos (OA 25)",
    categoria: "datos",
    icono: "📊",
    color: "#FF7675",
    mision: "¡Llena las canastas de frutas y observa cómo cobran vida en el pictograma!",
    secreto: "En un pictograma cada dibujo representa datos. La fila más larga es la favorita y contando todos sabes el total.",
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
    mision: "¡Construye torres con cuerpos 3D y descubre cuáles ruedan y cuáles se apilan firmes!",
    secreto: "Para apilar sin caerse, el cuerpo DEBE tener caras planas (como el cubo o cilindro). Las esferas ruedan porque son redondas.",
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
    mision: "¡Modifica el tamaño de la granja de ovejitas y cuenta los metros de cerca!",
    secreto: "El Perímetro (P) es la suma de TODO el contorno: P = Lado + Lado + Lado + Lado.",
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
    mision: "¡Coloca paquetes en la balanza mágica hasta equilibrar exactamente 1 Kilogramo!",
    secreto: "1 Kilogramo (1 kg) son exactamente 1.000 gramos. Dos paquetes de 500 g logran el equilibrio perfecto.",
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
    mision: "¡Fabrica números de 3 cifras con placas de 100, barras de 10 y cubitos de 1!",
    secreto: "Todo número de 3 cifras se desarma en Centenas (100), Decenas (10) y Unidades (1).",
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
    mision: "¡Activa la máquina sumadora y mira volar el cohete de reserva a la siguiente columna!",
    secreto: "Si al sumar una columna llegas a 10 o más, el 1 vuela como reserva a la columna vecina de la izquierda.",
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
    mision: "¡Hornea filas y columnas de galletitas con chispas de chocolate y cómetelas!",
    secreto: "Multiplicar es sumar el mismo número varias veces. ¡Y si cambias el orden de los factores, da exactamente el mismo total!",
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
    mision: "¡Reparte dulces en partes exactamente iguales a los 3 monstruos amigos!",
    secreto: "Dividir es repartir sin que sobre nada. La división es lo contrario de multiplicar (12 ÷ 3 = 4 porque 3 × 4 = 12).",
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
    mision: "¡Compra en el kiosco escolar con un billete de $1.000 y recibe tus monedas de vuelto!",
    secreto: "Para saber tu vuelto restas: Lo que pagas - Lo que gastas = Tu dinero de vuelta.",
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
    mision: "¡Corta la pizza en porciones iguales y toca las rebanadas para servirlas!",
    secreto: "El número de abajo (denominador) indica los cortes totales. El de arriba (numerador) los que te comes.",
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
    mision: "¡Averigua el número secreto que falta en el vagón para que el tren a vapor avance!",
    secreto: "Todo patrón sigue una regla fija: para descubrirla resta dos números vecinos seguidos.",
    regla: "Un patrón sigue una regla constante que se repite en cada paso.",
    puntos: [
      "Patrón creciente (suma): 2, 4, 6, 8, 10... (Regla: sumar 2).",
      "Patrón decreciente (resta): 100, 90, 80, 70, 60... (Regla: restar 10).",
      "Para encontrar la regla, resta dos números consecutivos de la secuencia."
    ],
    widget: "patrones"
  }
];
