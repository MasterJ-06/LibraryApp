const ISBNForm = document.getElementById('ReturnForm')
const Namevalue = document.getElementById('Name')
const msg1 = document.querySelector('#msg1')

ISBNForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const Name_regex = document.cookie.match(/&.+&/)
    if (Name_regex == null) {
        return msg1.textContent = 'Please login'
    }
    const Name = Name_regex[0].slice(1, -1)
    const t_regex = document.cookie.match(/\^.+\^/)
    const t = t_regex[0].slice(1, -1)

    url = window.location.href

    title = url.match(/=.+$/)

    if (title !== null) {
        string = title[0].slice(1)
        ISBNvalue = string
    } else {
        return msg1.textContent = 'Please click the book name from your profile page to return a book.'
    }

    const bookUpdates = {
        "Borrowed": false,
        "Status": "Return",
        "Name": Name
    };

    msg1.textContent = 'Loading...'

    fetch(`/books/update?ISBNNumber=${ISBNvalue}`, {
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
                    msg1.textContent = 'Book returned succesfully ' + Name
                } else {
                    msg1.textContent = value + ' ' + Name + '!'
                }
            }
        })
    })
})