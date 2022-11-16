const $email = document.getElementById('email')
const $psw_login = document.getElementById('psw')
const $submit_login_form = document.getElementById('log-in')
const $login_error = document.getElementById('loginmsg')

$submit_login_form.addEventListener('submit', (e) => {
    e.preventDefault()

    if ($psw_login.value.length < 7) {
        return $login_error.textContent = 'Password must be at least seven characters.'
    }
    fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        },
        body: JSON.stringify({
            "email": $email.value,
            "password": $psw_login.value
        }),
        redirect: 'follow'
    }).then((response) => {
        if (response.status === 400) {
             return $login_error.textContent = 'Invalid username or password.'
        } else {
            document.getElementById('logout_button').style.display='inline-block'
            document.getElementById('login_button').style.display='none'
            document.getElementById('signup_button').style.display='none'
            response.json().then((data) => {
                user = data
                document.cookie = `logged_in=yes; max-age=7200; path=/;`
                document.cookie = `token=^${user.token}^; max-age=7200; path=/;`;
                document.cookie = `name=&${data.user.name}&; max-age=7200; path=/;`;
                document.cookie = `email=%${user.user.email}%; max-age=7200; path=/;`;
                // Get the modal
                var modal = document.getElementById('id01');
                modal.style.display = "none";
                window.location.reload()
            })
        }
    })
})