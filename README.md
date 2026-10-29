# 🌟 Mundo Curioso

**Página educativa para niñas y niños de 7 a 10 años** creada con HTML, CSS y JavaScript. Se adapta a celulares y funciona en un navegador, incluso abriendo el HTML directamente desde la computadora.

## 🎮 ¿Qué incluye?

- **Matemáticas:** operaciones y series numéricas.
- **Lenguaje:** completa la letra que falta y reconoce sinónimos.
- **Ciencias:** preguntas sobre la naturaleza y clasificación de residuos.
- **2 niveles:** 7–8 años y 9–10 años.
- **8 preguntas por partida**, resultado, explicaciones y opción de volver a jugar.
- **Privacidad:** no se solicitan nombres, cuentas, correos ni contraseñas. No hay publicidad, analítica, cookies, APIs, envío de datos ni almacenamiento de respuestas. La puntuación existe solo mientras se juega, dentro de la memoria del navegador.

## 🚀 Publicar en GitHub Pages (sin programar)

1. **Descomprime** el archivo `.zip` que recibiste. Aparecerá la carpeta `mundo-curioso-proyecto` con `site`, `.github`, `README.md` y `GUIA_FACIL.txt` dentro. **No subas el ZIP sin extraer.**
2. Entra a [github.com](https://github.com/), inicia sesión o crea una cuenta (para quien administra la página, **no para los niños**).
3. Arriba a la derecha pulsa **+ → New repository**. Escribe, por ejemplo, `mundo-curioso`; selecciona **Public** y crea el repositorio. Deja seleccionada la rama `main` (habitual en GitHub). Puedes marcar «Add a README file» si GitHub te solicita inicializar el repositorio.
4. En el repositorio, pulsa **Add file → Upload files**. Abre la carpeta descomprimida en el explorador de archivos y **arrastra las carpetas `site` y `.github`** (y opcionalmente `README.md` / `GUIA_FACIL.txt`) al navegador. Si GitHub no conserva las subcarpetas, prueba arrastrar las carpetas una por una. Debes ver al menos `site/index.html` y `.github/workflows/deploy.yml` en la lista de archivos.
5. Abajo, escribe `Subir juegos educativos` y selecciona **Commit changes** (guardar los archivos en `main`). Si aparece un cuadro de confirmación, acepta.
6. Abre la pestaña **Settings → Pages**. En **Build and deployment → Source**, selecciona **GitHub Actions**. **No elijas Deploy from a branch**: este proyecto ya incluye su propio flujo de GitHub Actions.
7. Abre la pestaña **Actions**. Verás el proceso **Publicar Mundo Curioso en GitHub Pages**. Si el primer proceso ocurrió antes de elegir GitHub Actions, entra a ese flujo y utiliza **Run workflow**, con la rama `main`.
8. Cuando el flujo aparezca con el símbolo verde ✅, abre **Settings → Pages → Visit site**. La dirección suele ser `https://TU-USUARIO.github.io/mundo-curioso/` (reemplaza `TU-USUARIO` por tu nombre de usuario de GitHub). ¡Comparte ese enlace!

> 💡 Si el proyecto es un repositorio especial llamado `TU-USUARIO.github.io`, la dirección de publicación es `https://TU-USUARIO.github.io/`.

### Si algo no aparece

- **No se publica:** revisa que el repositorio tenga la rama `main`, que exista `.github/workflows/deploy.yml` y que en Settings → Pages → Source esté seleccionado **GitHub Actions**.
- **La página aparece en blanco o sale 404:** confirma que `site/index.html` esté en ese lugar (y no `mundo-curioso-proyecto/site/index.html` dentro de GitHub). Comprueba el enlace de **Settings → Pages**.
- **El flujo está rojo:** haz clic en **Actions → Publicar Mundo Curioso en GitHub Pages → ejecución con error** para leer qué paso falló. En algunos repositorios las políticas de Actions o Pages pueden restringir la publicación.
- **No ves `.github` al arrastrar:** en el explorador de archivos, habilita «Mostrar archivos ocultos» si hace falta. También puedes crear el archivo con **Add file → Create new file**, usando exactamente la ruta `.github/workflows/deploy.yml`, y copiar el contenido de ese archivo descomprimido.

## 🧪 Probar antes de publicar

1. Abre la carpeta **`site`**.
2. Haz doble clic en **`index.html`**.
3. Entra en Matemáticas, Lenguaje y Ciencias. Prueba una respuesta y pulsa «Siguiente pregunta».

No es necesario instalar programas, servidores o dependencias.

## 🗂️ Estructura

```text
mundo-curioso-proyecto/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← publica cuando actualizas main
├── site/                       ← esta carpeta se publica
│   ├── index.html              ← portada
│   ├── paginas/
│   │   ├── matematicas.html
│   │   ├── lenguaje.html
│   │   └── ciencias.html
│   └── recursos/
│       ├── estilos.css
│       ├── juegos.js
│       ├── icono.svg
│       └── mascota.svg
├── README.md
└── GUIA_FACIL.txt
```

## ✏️ ¿Cómo modificarla?

- Cambia textos en `site/index.html` o en las páginas dentro de `site/paginas/`.
- Cambia colores y tamaños en `site/recursos/estilos.css`.
- Para agregar preguntas, edita las listas de preguntas de `site/recursos/juegos.js`.
- Vuelve a subir los archivos modificados a la **rama `main`**. GitHub Actions publicará la nueva versión automáticamente.

La página no usa dependencias, no requiere compilación y no introduce cuentas para niños.

## ♻️ Nota educativa

En el juego de reciclaje se usan clasificaciones sencillas; la aceptación real de cada material puede variar según la comuna y su programa de reciclaje.
