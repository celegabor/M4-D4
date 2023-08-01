
function mostraDettagliLibro() {
    const params = new URLSearchParams(location.search);

    const imageUrl = params.get("imageUrl");
    const price = params.get("price");
    const title = params.get("title");

    // Crea gli elementi HTML per visualizzare i dettagli del libro
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;

    const priceElement = document.createElement("p");
    priceElement.innerText = "Prezzo: $" + price;

    const titleElement = document.createElement("h2");
    titleElement.innerText = title;

    // Aggiungi gli elementi HTML al div dei dettagli del libro
    const dettagliLibroDiv = document.getElementById("dettagliLibro");
    dettagliLibroDiv.appendChild(imageElement);
    dettagliLibroDiv.appendChild(priceElement);
    dettagliLibroDiv.appendChild(titleElement);
}


document.addEventListener("DOMContentLoaded", mostraDettagliLibro);
