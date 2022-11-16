const ISBNForm = document.getElementById('ValidateForm')
const search = document.getElementById('ValidateInput')
const msg1 = document.querySelector('#msg1')

ISBNForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const ISBN = search.value

    msg1.textContent = 'Loading...'

    fetch('/validateISBN?ISBN=' + ISBN).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.boolean
            }
        })
    })
})