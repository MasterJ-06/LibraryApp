var admin = ''
setInterval(function(){
    if (admin !== '') {
        admin = ''
    }
    document.cookie = `admin_logged_in=no; max-age=7200; path=/;`
    document.cookie = `admin_token=; max-age=-7200; path=/;`;
    document.cookie = `admin_name=; max-age=-7200; path=/;`;
},900000);

setInterval(() => {
    let x = document.cookie
    const t_regex = document.cookie.match(/\#.+\#/)
    const t = t_regex[0].slice(1, -1)
    if (x.includes("logged_in=yes")) {
        fetch('/admins/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            },
            body: JSON.stringify({
                'token': t
            }),
            redirect: 'follow'
        }).then((response) => {
            if (response.status === 400) {
                return $login_error.textContent = 'Invalid token.'
            } else {
                response.json().then((data) => {
                    user = data
                    document.cookie = `token=^${admin.token}^; max-age=7200; path=/;`;
                    document.cookie = `name=&${data.admin.name}&; max-age=7200; path=/;`;
                })
            }
        })
    }
}, 900000);