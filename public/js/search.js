const SearchForm = document.getElementById('search')
const search = document.getElementById('value')
const thumb = document.querySelector('#thumb')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')
const msg4 = document.querySelector('#msg4')
const msg5 = document.querySelector('#msg5')
const msg6 = document.querySelector('#msg6')
const msg7 = document.querySelector('#msg7')
const msg8 = document.querySelector('#msg8')
const msg9 = document.querySelector('#msg9')
const msg10 = document.querySelector('#msg10')
const sortBy = document.getElementById("sortBy");


SearchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const ISBN = search.value
    const value = sortBy.options[sortBy.selectedIndex].text

    thumb.src = ''
    msg1.textContent = ''
    msg2.textContent = 'Loading... '
    msg3.textContent = ''
    msg4.textContent = ''
    msg5.textContent = ''
    msg6.textContent = ''
    msg7.textContent = ''
    msg8.textContent = ''
    msg9.textContent = ''
    msg10.textContent = ''

    if (search.value !== '') {
        fetch(`/books/ISBN?${value}=${ISBN}&filter=${value}`).then((response) => {
            console.log(response)
            if (response.status===500 || response.status===404) {
                msg2.textContent = 'Book not found'
            } else {
                response.json().then((data) => {
                    const JSONdata = data
                    thumb.src = JSONdata.Image
                    msg1.textContent = 'Title: ' + JSONdata.Title
                    msg1.href = '/preview?title=' + JSONdata.Title
                    msg2.textContent = 'Authors: ' + JSONdata.Authors
                    msg3.textContent = 'Publisher: ' + JSONdata.Publisher
                    msg4.textContent = 'Published Date: ' + JSONdata.PublishedDate
                    msg5.textContent = 'ISBN: ' + JSONdata.ISBNNumber
                    msg5.href = `/borrow?ISBNNumber=${JSONdata.ISBNNumber}`
                    msg6.textContent = 'Page Count: ' + JSONdata.PageCount
                    msg7.textContent = 'Print Type: ' + JSONdata.PrintType
                    msg8.textContent = 'Language: ' + JSONdata.Language
                    msg9.innerHTML = 'Description: <br/> <br/> ' + JSONdata.Description
                })
            }
        })
    } else if (search.value === '') {
        fetch(`/books`).then((response) => {
            response.text().then((data) => {
                const JSONdata = JSON.parse(data)
                let value = ''
                JSONdata.forEach(function (arrayItem) {
                    value = value + '<br />' + arrayItem.Title;
                });
                text = value.slice(6);
                msg2.innerHTML = text
            })
        })
    }
})