// Se obtiene la referencia al botón que permitirá actualizar las noticias
const boton = document.getElementById("btnCargar");


// Se obtiene el contenedor donde se mostrarán dinámicamente las noticias
const contenedor = document.getElementById("contenedorNoticias");

// URL base de la API GNews con parámetros de idioma, país y token
const GNEWS_URL = "https://gnews.io/api/v4/top-headlines?lang=es&country=mx&token=529cd014951abe518ddf8783f53a9026";

// Proxy utilizado para evitar problemas de CORS al consumir la API desde el navegador
const PROXY_BASE = "https://api.allorigins.win/raw?url=";



/**
 * Función principal que realiza la carga de noticias.
 * Implementa Fetch para obtener datos en formato JSON desde la API.
 */
function cargarNoticias() {

    // Mensaje mostrado mientras se realiza la petición asíncrona
    contenedor.innerHTML = "Cargando noticias...";

    // Se genera una URL única agregando un timestamp para evitar el uso de caché
    const urlFinal = PROXY_BASE + encodeURIComponent(
        GNEWS_URL + "&_=" + new Date().getTime()
    );

    // Implementación del método Fetch para realizar la petición HTTP
    fetch(urlFinal, { cache: "no-store" })

        // Se valida que la respuesta HTTP sea correcta
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("Error HTTP");
            }
            // Conversión de la respuesta a formato JSON
            return respuesta.json();
        })

        // Procesamiento del objeto JSON recibido desde la API
        .then(function (datos) {

            // Se limpia el contenedor antes de mostrar nuevas noticias
            contenedor.innerHTML = "";

            // Validación de que existan noticias en la respuesta
            if (!datos.articles || datos.articles.length === 0) {
                contenedor.innerHTML = "No hay noticias disponibles.";
                return;
            }

            // Se recorre el arreglo de noticias contenido en el JSON
            datos.articles.forEach(function (noticia) {

                // Se crea un elemento contenedor para cada noticia
                const div = document.createElement("div");
                div.className = "noticia";

                // Se inserta dinámicamente el contenido de la noticia
                div.innerHTML = `
                    <h3>
                        <a href="${noticia.url}" target="_blank">
                            ${noticia.title}
                        </a>
                    </h3>
                    <p>${noticia.description || "Sin descripción disponible."}</p>
                `;

                // Se agrega la noticia al contenedor principal
                contenedor.appendChild(div);
            });
        })

        // Manejo de errores en caso de fallo en la petición o el procesamiento
        .catch(function (error) {
            console.error(error);
            contenedor.innerHTML = "Error al cargar las noticias.";
        });
}

// Manejo de errores en caso de fallo en la petición o el procesamiento
boton.addEventListener("click", cargarNoticias);

// Se ejecuta la función al cargar la página por primera vez
cargarNoticias();