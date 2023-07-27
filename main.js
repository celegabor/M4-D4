const apiKey = 'https://striveschool-api.herokuapp.com/books';

function createCard(imageUrl, price) {
    const card = document.createElement('div');
    card.className = 'card';

    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = 'Immagine';

    const priceElement = document.createElement('p');
    priceElement.innerText = 'Prezzo: $' + price;

    card.appendChild(image);
    card.appendChild(priceElement);

    return card;
}

function sito() {
    fetch(apiKey)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const bookData = data;

            const cardsContainer = document.getElementById('main');
            cardsContainer.innerHTML = '';

            const cardElements = bookData.map(book => createCard(book.img, book.price));
            cardElements.forEach(card => cardsContainer.appendChild(card));
        })
        .catch(err => console.log('risposta negativa: ', err));
}

sito();
