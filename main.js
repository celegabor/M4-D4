
const apiKey = 'https://striveschool-api.herokuapp.com/books';


let carrelloAggiunte = [];
let bookData = [];

function createCard(imageUrl, price, category) {
    const card = document.createElement('div');
    card.className = 'card';

    const image = document.createElement('img');
    image.src = imageUrl;

    const priceElement = document.createElement('p');
    priceElement.innerText = 'Prezzo: $' + price;

    const categoryElement = document.createElement('p');
    categoryElement.innerText = category;

    const carrello = document.createElement('i');
    carrello.classList.add('fa-solid', 'fa-cart-arrow-down', 'fa-2xl');
    carrello.addEventListener('click', function() {
        aggiungiAlCarrello(imageUrl, price, category);
    });

    card.appendChild(image);
    card.appendChild(priceElement);
    card.appendChild(categoryElement);
    card.appendChild(carrello);

    return card;
}



function sito() {
    fetch(apiKey)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            bookData = data; // Inizializza la variabile bookData con i dati dei libri
            const cardsContainer = document.getElementById('main');
            cardsContainer.innerHTML = '';

            const cardElements = bookData.map(book => createCard(book.img, book.price, book.category));
            cardElements.forEach(card => cardsContainer.appendChild(card));
        })
        .catch(err => console.log('risposta negativa: ', err));
}

function aggiungiAlCarrello(imageUrl, price, category) {
    const displayCarrello = document.getElementById('aggiunteCarrello');
    const cardData = {
        imageUrl,
        price,
        category
    };
    carrelloAggiunte.push(cardData);
    console.log('Card aggiunta al carrello:', cardData);
    console.log(carrelloAggiunte);

    totaleCarrello(carrelloAggiunte);
}

function totaleCarrello(carrelloItems) {
    const aggiunteCarrello = document.getElementById('aggiunteCarrello');
    aggiunteCarrello.innerHTML = '';

    const cardElements = carrelloItems.map(item => createCard(item.imageUrl, item.price, item.category));
    cardElements.forEach(card => aggiunteCarrello.appendChild(card));
}

sito();

