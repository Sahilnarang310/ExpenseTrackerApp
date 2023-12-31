const signup = document.querySelector('.signup');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
const login = document.querySelector('.login');

login.addEventListener('click', userLogin);
signup.addEventListener('click', userSignup);
email.addEventListener('keydown', validateEmail);

async function userLogin(e) {
    e.preventDefault();
    if (loginEmail.value && loginPassword.value) {
        try {
            const response = await axios.post('http://localhost:3000/user/login', { "email": loginEmail.value, "password": loginPassword.value });
            console.log(response);
            // localStorage.setItem('token', response.data.token);
            window.location.href = 'http://localhost:3000/index.html';
        } catch (error) {
            console.log(error.response.data.error);
            alert(error.response.data.error);
        }
    } else {
        alert('Enter All the Fields');
    }
}


async function userSignup(e) {
    e.preventDefault();
    if (matchPassword(password.value, confirmPassword.value)) {
        try {
            if (name.value && email.value && password.value) {
                const response = await axios.post('http://localhost:3000/user/signup', { "name": name.value, "email": email.value, "password": password.value });
                console.log(response);
                console.log(response.data);
                alert('User signed up successfully');
                window.location.href = 'http://localhost:3000/login.html';
            } else {
                alert('Please fill in all fields');
            }
        } catch (error) {
            alert('User Already Exists');
            alert('User Already Exists', error.response.data.error);
        }
    } else {
        alert('Passwords do not match');
    }
}
function matchPassword(password, confirmPassword) {
    if (password === confirmPassword) {
        return true;
    }
    return false;
}
function validateEmail(event) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value.match(validRegex)) {
        email.style.backgroundColor = 'white';
        return true;
    } else {
        email.style.backgroundColor = '#FA7E7C';
        return false;
    }
}