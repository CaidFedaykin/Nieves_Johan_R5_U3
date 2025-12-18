const boton = document.getElementById("btnCargar");
const contenedor = document.getElementById("contenedorNoticias");

const GNEWS_URL = "https://gnews.io/api/v4/top-headlines?lang=es&country=mx&token=529cd014951abe518ddf8783f53a9026";
const PROXY_BASE = "https://api.allorigins.win/raw?url=";

function cargarNoticias() {
    contenedor.innerHTML = "Cargando noticias...";

    const urlFinal = PROXY_BASE + encodeURIComponent(
        GNEWS_URL + "&_=" + new Date().getTime()
    );

    fetch(urlFinal, { cache: "no-store" })
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("Error HTTP");
            }
            return respuesta.json();
        })
        .then(function (datos) {
            contenedor.innerHTML = "";

            if (!datos.articles || datos.articles.length === 0) {
                contenedor.innerHTML = "No hay noticias disponibles.";
                return;
            }

            datos.articles.forEach(function (noticia) {
                const div = document.createElement("div");
                div.className = "noticia";

                div.innerHTML = `
                    <h3>
                        <a href="${noticia.url}" target="_blank">
                            ${noticia.title}
                        </a>
                    </h3>
                    <p>${noticia.description || "Sin descripción disponible."}</p>
                `;

                contenedor.appendChild(div);
            });
        })
        .catch(function (error) {
            console.error(error);
            contenedor.innerHTML = "Error al cargar las noticias.";
        });
}

boton.addEventListener("click", cargarNoticias);
cargarNoticias();