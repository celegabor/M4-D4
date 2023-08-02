
function mostraDettagliLibro() {
    const params = new URLSearchParams(location.search);

    const imageUrl = params.get("imageUrl");
    const price = params.get("price");
    const title = params.get("title");

    // Crea gli elementi HTML per visualizzare i dettagli del libro
    const dettagliLibroDiv = document.getElementById("dettagliLibro");

    const divCard = document.createElement("div");
    divCard.classList.add("cardDettails")

    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;

    const imageUrlLink = document.createElement("p");
    imageUrlLink.innerText = "URL immagine: " + imageUrl;


    const priceElement = document.createElement("p");
    priceElement.innerText = "Prezzo: $" + price;

    const titleElement = document.createElement("h2");
    titleElement.innerText = title;

    divCard.appendChild(imageElement);
    divCard.appendChild(imageUrlLink);
    divCard.appendChild(priceElement);
    divCard.appendChild(titleElement);
    
    dettagliLibroDiv.appendChild(divCard)
}


document.addEventListener("DOMContentLoaded", mostraDettagliLibro);
