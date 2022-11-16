const ISBNForm = document.getElementById('BorrowForm')
const ISBNvalue = document.getElementById('ISBN')
const Namevalue = document.getElementById('Name')
const msg1 = document.querySelector('#msg1')

var url_string = window.location.href
var url = new URL(url_string);
var ISBNNUM = url.searchParams.get("ISBNNumber");
ISBNvalue.value = ISBNNUM

ISBNForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const Name_regex = document.cookie.match(/&.+&/)
    if (Name_regex == null) {
        return msg1.textContent = 'Please login'
    }
    const Name = Name_regex[0].slice(1, -1)
    const t_regex = document.cookie.match(/\^.+\^/)
    const t = t_regex[0].slice(1, -1)
    const ISBN = ISBNvalue.value
    const bookUpdates = {
        "Borrowed": true,
        "Status": "Borrow",
        "Name": Name
    };

    msg1.textContent = 'Loading...'

    fetch(`/books/update?ISBNNumber=${ISBN}`, {
        method: 'PATCH',
        body: JSON.stringify(bookUpdates),
        headers: {
            'Authorization': t,
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then((response) => {
        response.text().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                const regexp = data.match(/:".+"/)
                const value = regexp[0].slice(2, -2)
                if (value.includes('ISBN')) {
                    msg1.textContent = 'Book borrowed succesfully ' + Name
                } else {
                    msg1.textContent = value + ' ' + Name + '!'
                }
            }
        })
    })
})