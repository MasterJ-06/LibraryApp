const ISBNval = require('simple-isbn').isbn;
const ISBNnode = require('node-isbn');

// add the users name to the book in the database with update req

// remove the users name from the selected book with update req

// with database list books with the users name with get req

// website Compatible
const validateISBN = (ISBN, callback) => {
    if (ISBNval.isValidIsbn(ISBN) === true) {
        callback(undefined, 'ISBN is valid')
    } else if (ISBNval.isValidIsbn(ISBN) === false) {
        callback(undefined, 'ISBN is not valid')
    }
}

// website Compatible
const ISBNinfo = (ISBN, callback) => {
    ISBNnode.resolve(ISBN, { timeout: 15000 }, function (err, book) {
        if (err) {
            callback('Book not found', undefined)
        } else {
            callback(undefined, {
                book
            })
        }
    });
}


module.exports = {
    validateISBN: validateISBN,
    ISBNinfo: ISBNinfo
}