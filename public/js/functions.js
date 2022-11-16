const avatar_form = document.getElementById('avatar')
const name_form = document.getElementById('name_form')
const psw_form = document.getElementById('psw_form')
const email_form = document.getElementById('email_form')
const avatar_p = document.getElementById('avatar_img')

window.addEventListener('load', () => {
    const cookie = document.cookie
    const cookie_match = cookie.match(/\^.+\^/)
    const token = cookie_match[0].slice(1, -1)
    fetch(`/users/me/avatar`, {
        headers: {
            'Authorization': token,
        }
    }).then((response) => {
        response.text().then((data) => {
            const JSONdata = data
            if (response.status === 404) {
                avatar_p.src = '../img/avatar.png'
            } else {
                avatar_p.src = JSONdata
            }
        })
    })
})

avatar_form.addEventListener('submit', (e) => {
    e.preventDefault()

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    
    async function Main() {
       const file = document.getElementById('file').files[0];
       const base64 = await toBase64(file)
       const base = {
           "avatar": base64
       }
       const cookie = document.cookie
       const cookie_match = cookie.match(/\^.+\^/)
       const token = cookie_match[0].slice(1, -1)
       fetch(`/users/me/avatar`, {
            method: 'POST',
            body: JSON.stringify(base),
            headers: {
                'Authorization': token,
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => {
            response.text().then((data) => {
                const JSONdata = data
                avatar_p.src = JSONdata
            })
        })
    }
    
    Main();
})

name_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.getElementById('username')
    input.style.display = 'inline-block'
    const cookie = document.cookie
    const cookie_match = cookie.match(/\^.+\^/)
    const token = cookie_match[0].slice(1, -1)
    const update = {
        "name": input.value
    }
    fetch(`/users/me`, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: {
            'Authorization': token,
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then((response) => {
        response.text().then((data) => {
            $user_name.textContent = 'Username updated.'
        })
    })
})

psw_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.getElementById('pword_val')
    input.style.display = 'inline-block'
    const cookie = document.cookie
    const cookie_match = cookie.match(/\^.+\^/)
    const token = cookie_match[0].slice(1, -1)
    const update = {
        "password": input.value
    }
    fetch(`/users/me`, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: {
            'Authorization': token,
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then((response) => {
        response.text().then((data) => {
            $pword.textContent = 'Password updated.'
        })
    })
})

email_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.getElementById('email_val')
    input.style.display = 'inline-block'
    const cookie = document.cookie
    const cookie_match = cookie.match(/\^.+\^/)
    const token = cookie_match[0].slice(1, -1)
    const update = {
        "email": input.value
    }
    fetch(`/users/me`, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: {
            'Authorization': token,
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then((response) => {
        response.text().then((data) => {
            $emailedit.textContent = 'Email updated.'
        })
    })
})