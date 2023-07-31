
const apiKey = 'https://striveschool-api.herokuapp.com/books';


let carrelloAggiunte = [];
let bookData = [];

// funzione che crea la card

function createCard(imageUrl, price, title) {

    // crea card
    const card = document.createElement('div');
    card.className = 'card';

    // crea/pesca img
    const image = document.createElement('img');
    image.src = imageUrl;

    // crea/pesca prezzo
    const priceElement = document.createElement('p');
    priceElement.innerText = 'Prezzo: $' + price;

    // crea/pesca titolo
    const titleElement = document.createElement('span');
    titleElement.innerText = title;

    // tasto togli/ nascondi card
    const togliCard = document.createElement('i');
    togliCard.classList.add('fa-solid', 'fa-xmark', 'fa-2xl', 'customTogliCard');
    togliCard.addEventListener('click', function() {
        const cardToRemove = this.parentElement;
        cardToRemove.remove();
    });

    // tasto togli dal carrello
    const togliCarrello = document.createElement('i');
    togliCarrello.classList.add('fa-solid', 
    'fa-trash', 'fa-2xl', 'customTogliCarrello');
    togliCarrello.addEventListener('click', function() {
        togliDalCarrello(imageUrl, price, title);
    });

    // tasto aggiungi al carrello
    const carrello = document.createElement('i');
    carrello.classList.add('fa-solid', 'fa-cart-arrow-down', 'fa-xl', 'customCarrello');
    carrello.addEventListener('click', function() {
        aggiungiAlCarrello(imageUrl, price, title);
    });

    // appendi tutto
    card.appendChild(image);
    card.appendChild(priceElement);
    card.appendChild(titleElement);
    card.appendChild(carrello);
    card.appendChild(togliCarrello); 
    card.appendChild(togliCard); 

    return card;
}



function sito() {
    fetch(apiKey)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            bookData = data; 
            const cardsContainer = document.getElementById('main');
            cardsContainer.innerHTML = '';

            const cardElements = bookData.map(book => createCard(book.img, book.price, book.title));
            cardElements.forEach(card => cardsContainer.appendChild(card));
        })
        .catch(err => console.log('risposta negativa: ', err));
}

function aggiungiAlCarrello(imageUrl, price, title) {
    const displayCarrello = document.getElementById('aggiunteCarrello');
    const cardData = {
        imageUrl,
        price,
        title
    };
    
    carrelloAggiunte.push(cardData);

    console.log('Card aggiunta al carrello:', cardData);

    totaleCarrello(carrelloAggiunte);
    stampaDatiCarrello();
    aggiornaBadgeCarrello();
}

function togliDalCarrello(imageUrl, price, title) {
    for (let i = 0; i < carrelloAggiunte.length; i++) {
        const cardData = carrelloAggiunte[i];
        if (cardData.imageUrl === imageUrl && cardData.price === price && cardData.title === title) {
            carrelloAggiunte.splice(i, 1);
            console.log('Card rimossa dal carrello:', imageUrl, price, title);

            break;
        }
    }
    totaleCarrello(carrelloAggiunte);
    stampaDatiCarrello();
    aggiornaBadgeCarrello();

}

function totaleCarrello(carrelloItems) {
    const sectionContainCarrello = document.getElementById('divPushCarrelloResult');
    sectionContainCarrello.innerHTML = '';

    const cardElements = carrelloItems.map(item => createCard(item.imageUrl, item.price, item.title));
    cardElements.forEach(card => sectionContainCarrello.appendChild(card));
    stampaDatiCarrello();
    aggiornaBadgeCarrello();
}

function stampaDatiCarrello() {

    const testoNumeroRisultati = document.getElementById('testoNumeroRisultati');
    const testoPrezzoTotale = document.getElementById('testoPrezzoTotale');

    const lunghezzaCarrello = carrelloAggiunte.length;

    testoNumeroRisultati.innerText = 'Il numero totale di articoli nel tuo carrello è: ' + lunghezzaCarrello;

    const totalePrezzi = carrelloAggiunte.reduce((total, item) => total + item.price, 0);
    console.log('Totale prezzi dei libri nel carrello:', totalePrezzi);
    const totalePrezziFormatted = totalePrezzi.toFixed(2);
    testoPrezzoTotale.innerText = 'Il prezzo totale degli articoli aggiunti è: ' + totalePrezziFormatted + ' euro';
}

function cercaLibri(event) {
    event.preventDefault(); // Evita il comportamento predefinito del form

    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value.toLowerCase(); 

    const mainContainer = document.getElementById('main');
    const cards = mainContainer.getElementsByClassName('card');

    const risultatiRicerca = [];

    for (const card of cards) {
        const titleElement = card.querySelector('span');
        const titleText = titleElement.innerText.toLowerCase(); 

        if (titleText.includes(searchText)) {
            risultatiRicerca.push(card); // 
        }
    }

    mostraRisultatiRicerca(risultatiRicerca);
}

function mostraRisultatiRicerca(risultati) {
    const risultatiContainer = document.getElementById('risultatiRicerca');
    risultatiContainer.innerHTML = '';

    if (risultati.length === 0) {
        risultatiContainer.innerText = 'Nessun risultato trovato.';
    } else {
        for (const risultato of risultati) {
            risultatiContainer.appendChild(risultato.cloneNode(true));
        }
    }
}

function aggiornaBadgeCarrello() {
    const numeroCarrello = document.getElementById('numeroCarrello');
    const lunghezzaCarrello = carrelloAggiunte.length;
    numeroCarrello.innerText = lunghezzaCarrello;
    console.log('carrello aggiunte: ', carrelloAggiunte);
}

sito();