const ISBNForm = document.getElementById('ISBNForm')
const search = document.getElementById('ISBNSearch')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')
const msg4 = document.querySelector('#msg4')
const msg5 = document.querySelector('#msg5')
const msg6 = document.querySelector('#msg6')
const msg7 = document.querySelector('#msg7')
const msg8 = document.querySelector('#msg8')
const msg9 = document.querySelector('#msg9')

ISBNForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const ISBN = search.value

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent = ''
    msg4.textContent = ''
    msg5.textContent = ''
    msg6.textContent = ''
    msg7.textContent = ''
    msg8.textContent = ''
    msg9.textContent = ''

    fetch('/infoISBN?ISBN=' + ISBN).then((response) => {
        response.text().then((data) => {
            try {
                let JSONdata = JSON.parse(data)
                msg1.textContent = 'Title: ' + JSONdata.book.book.title
                msg2.textContent = 'Authors: ' + JSONdata.book.book.authors
                msg3.textContent = 'Publisher: ' + JSONdata.book.book.publisher
                msg4.textContent = 'Published Date: ' + JSONdata.book.book.publishedDate
                msg5.textContent = 'ISBN: ' + ISBN
                msg6.textContent = 'Page Count: ' + JSONdata.book.book.pageCount
                msg7.textContent = 'Print Type: ' + JSONdata.book.book.printType
                msg8.textContent = 'Categories: ' + JSONdata.book.book.categories
                msg9.textContent = 'Language: ' + JSONdata.book.book.language
            } catch (err) {
                msg1.textContent = 'Book not found'
            }
        })
    })
})