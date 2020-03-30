'use-strict'

const KEY = 'books';
var gBooks;
var gSortBooks = name;


function getBooks() {
    return gBooks;
}

function addBook(name, genre, price) {

    var book = _createBook(name, genre, price);
    gBooks.unshift(book);
    _saveBooksToStorage()
}

function createBooks() {

    var books = loadFromLocalStorage(KEY);
    if (!books || !books.length) {
        books = [];
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _createBook(name, genre, price) {

    if (!price) price = getRandomIntInclusive(5, 20)
    var book = {
        id: makeId(),
        name: name,
        genre: genre,
        price: price,
        details: makeLorem(),
        rating: 0
    }
    return book;
}

function sortBooks(sortBy) {

    gSortBooks = sortBy;
    gBooks.sort(_sortBooksFunc)
    _saveBooksToStorage();

}

function _sortBooksFunc(book1, book2) {

    switch (gSortBooks) {
        case 'name':
            if (book1.name.toLowerCase() > book2.name.toLowerCase()) return 1;
            else if (book1.name.toLowerCase() < book2.name.toLowerCase()) return -1;
            else return 0;
        case 'genre':
            if (book1.genre.toLowerCase() > book2.genre.toLowerCase()) return 1;
            else if (book1.genre.toLowerCase() < book2.genre.toLowerCase()) return -1;
            else return 0;
        case 'price':
            return book1.price - book2.price
        default:
            break;
    }
}

function updateBook(bookId, newPrice) {

    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks[bookIdx].price = newPrice
    _saveBooksToStorage();
}

function removeBook(bookId) {

    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function updateBookRating(bookidx, diff) {

    const book = gBooks[bookidx];

    if (diff === +1 && book.rating === 10 || diff === -1 && book.rating === 0) return
    book.rating += diff
}

function _saveBooksToStorage() {
    saveToLocalStorage(KEY, gBooks);
}