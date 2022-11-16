const $username = document.getElementById('uname')
const $pswlogin = document.getElementById('psw')
const $form_login = document.getElementById('log-in')
const $loginerror = document.getElementById('loginmsg')

$form_login.addEventListener('submit', (e) => {
    e.preventDefault()

    if ($pswlogin.value.length < 7) {
        return $loginerror.textContent = 'Password must be at least seven characters.'
    }
    fetch('/admins/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        },
        body: JSON.stringify({
            "name": $username.value,
            "password": $pswlogin.value
        })
    }).then((response) => {
        if (response.status === 400) {
            return $loginerror.textContent = 'Invalid username or password.'
        } else {
            response.json().then((data) => {
                admin = data
                document.cookie = `admin_logged_in=yes; max-age=7200; path=/;`
                document.cookie = `admin_token=#${admin.token}#; max-age=7200; path=/;`;
                document.cookie = `admin_name=@${data.admin.name}@; max-age=7200; path=/;`;
                // Get the modal
                var modal = document.getElementById('id01');
                modal.style.display = "none"
                window.location.reload()
            })
        }
    })
})