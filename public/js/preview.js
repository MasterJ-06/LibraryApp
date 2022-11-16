const error = document.getElementById('error')
let string = ''

error.textContent = ''

url = window.location.href

title = url.match(/=.+$/)

if (title !== null) {
    string = title[0].slice(1)
    ISBNvalue = string
} else {
    error.textContent = 'Please specify a book.'
}

google.books.load();

function alertNotFound() {
    error.textContent = "There is no preview avalible for that book!";
}

function initialize() {
    var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    if (string === '') {
        error.textContent = 'Please specify a book.'
    } else if (string !== '') {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${string}`).then((response) => {
        response.json().then((data) => {
            const JSONdata = data
            data2 = JSONdata.items[0].id.toString()
            viewer.load(data2, alertNotFound);
        })
    })
    }
}

google.books.setOnLoadCallback(initialize);