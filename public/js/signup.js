const $name = document.getElementById('sign-up-name')
const $signupEmail = document.getElementById('sign-up-email')
const $psw = document.getElementById('sign-up-psw')
const $repeatpsw = document.getElementById('sign-up-psw-repeat')
const $submit_form = document.getElementById('signup')
const $signup_msg = document.getElementById('signup_msg')

$submit_form.addEventListener('submit', (e) => {
    e.preventDefault()

    $signup_msg.textContent = ''
    if ($repeatpsw.value.length < 7) {
        return $signup_msg.textContent = 'Password must be at least seven characters.'
    }
    if ($psw.value !== $repeatpsw.value) {
        alert('Password and repeated password should match.')
    } else if ($psw.value === $repeatpsw.value) {
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            },
            body: JSON.stringify({
                "email": $signupEmail.value,
                "name": $name.value,
                "password": $repeatpsw.value
            }),
            redirect: 'follow'
        }).then((response) => {
            response.json().then((data) => {
                if (data.email === 'MongoError') {
                    $signup_msg.textContent = 'Name is taken'
                } else {
                    user = data
                    console.log(user)
                    document.cookie = `logged_in=yes; max-age=7200; path=/;`
                    document.cookie = `token=^${user.token}^; max-age=7200; path=/;`;
                    document.cookie = `name=&${data.user.name}&; max-age=7200; path=/;`;
                    document.cookie = `email=%${data.user.email}%; max-age=7200; path=/;`;
                    // Get the modal
                    var modal = document.getElementById('id02');
                    modal.style.display = "none";
                    window.location.reload()
                }
            })
        })
    }
})