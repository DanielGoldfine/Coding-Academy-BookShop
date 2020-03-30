'use-strict'

var gIsAddBook = false;
var gIsDetails = false;
var gBookDetailsIdx;

function onInit() {
    createBooks()
    renderBooks()
}

function renderBooks() {

    var books = getBooks()
    var strHtmls = books.map(function getBookHTML(book) {

        return `<tr>
        <th class="id-cell">${book.id}</th>
        <th>${book.name}</th>
        <th>${book.genre}</th>
        <th>${book.price}</th>
        <th><button class="button read-button" onclick="onReadDetails('${book.id}')">Details</button></th>
        <th><button class="button update-button" onclick="onUpdateBook('${book.id}')">Update</button></th>
        <th><button class="button delete-button" onclick="onRemoveBook('${book.id}')">Delete</button></th>
    </tr>`

    });
    document.querySelector('.table-container').innerHTML = strHtmls.join('');
}

function onAddBook(name, genre, price) {
    createBooks(name, genre, price);
    saveToLocalStorage(KEY)
}

function toggleAddBook() {

    var elAddBook = document.querySelector('.add-book')
    if (!gIsAddBook) {
        elAddBook.hidden = false;
        gIsAddBook = true;
    } else {
        elAddBook.hidden = true;
        gIsAddBook = false;
    }
}

function onSaveBook() {

    const elAddBook = document.querySelector('.add-book')

    const elNameInput = elAddBook.querySelector('[name="book-name"]')
    const elGenreInput = elAddBook.querySelector('select')
    const elPriceInput = elAddBook.querySelector('[name="price"]')

    const name = elNameInput.value
    const genre = elGenreInput.value
    const price = elPriceInput.value

    if (!name || !price || !genre) return;

    toggleAddBook()
    addBook(name, genre, price);
    renderBooks();

    elNameInput.value = ''
    elGenreInput.value = ''
    elPriceInput.value = ''

}

function onSortBy(sortBy) {
    sortBooks(sortBy);
    renderBooks();
}

function onUpdateBook(bookId) {

    const newPrice = +prompt('Enter new price');
    updateBook(bookId, newPrice);
    renderBooks();
}


function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks();
}

function onReadDetails(bookId) {

    const books = getBooks()
    const bookIdx = books.findIndex(book => book.id === bookId)

    if (gBookDetailsIdx === bookIdx) {
        toggleDetails()
        return;
    }

    gBookDetailsIdx = bookIdx
    book = books[bookIdx];
    const elDetails = document.querySelector('.details-container');

    var bookImg;

    if (book.genre === 'litrature') bookImg = 'green'
    if (book.genre === 'drama') bookImg = 'red'
    if (book.genre === 'comedy') bookImg = 'purple'
    if (book.genre === 'sci-fi') bookImg = 'blue'
    if (book.genre === 'horror') bookImg = 'yellow'

    const elBookName = elDetails.querySelector('.details-book-name');
    const elBookGenre = elDetails.querySelector('.details-genre');
    const elBookDetails = elDetails.querySelector('.book-details');
    const elBookRating = elDetails.querySelector('.details-rating-value');
    const elBookImg = elDetails.querySelector('.book-img');

    elBookName.innerText = book.name;
    elBookGenre.innerText = book.genre;
    elBookDetails.innerText = book.details;
    elBookRating.innerText = book.rating;
    elBookImg.innerHTML = `<img src="img/${bookImg}.png" alt="book image">`

    if (gIsDetails === true) return

    toggleDetails();

}

function onCloseDetails() {
    toggleDetails();
}

function toggleDetails() {
    elDetails = document.querySelector('.details-container')
    if (!gIsDetails) {
        elDetails.style.left = "-20px";
        gIsDetails = true;
    } else {
        elDetails.style.left = "-670px";
        gIsDetails = false;
    }
}

function onChangeRating(diff) {

    updateBookRating(gBookDetailsIdx, diff)

    const books = getBooks()
    var book = books[gBookDetailsIdx];
    const elDetails = document.querySelector('.details-container');
    const elBookRating = elDetails.querySelector('.details-rating-value');

    elBookRating.innerText = book.rating;

}