function logout() { 
    window.onbeforeunload = function(event)
    {
        document.cookie = `admin_logged_in=no; max-age=7200; path=/;`
        document.cookie = `admin_token=; max-age=-7200; path=/;`;
        document.cookie = `admin_name=; max-age=-7200; path=/;`;
        admin = ''
    }
    window.location.reload()
}