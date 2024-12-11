
document.addEventListener('click', function (event) {
    const password = document.getElementById('password');
    const eye = document.getElementById('show');
    if (event.target == eye) {
        if (password.type == 'password') {
            password.type = 'text';
        }
        else {
            password.type = 'password'
        }
    }
})