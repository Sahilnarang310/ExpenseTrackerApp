const signup = document.querySelector('.signup');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

signup.addEventListener('click', userSignup);
email.addEventListener('keydown', validateEmail);

async function userSignup(e) {
    e.preventDefault();
    try {
        if (name.value && email.value && password.value) {
            const response = await axios.post('http://localhost:3000/user/signup', { "name": name.value, "email": email.value, "password": password.value });
            console.log(response);
        } else {
            alert('Please fill in all fields');
        }
    } catch (error) {
        console.log(error);
    }
}

function validateEmail(event) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log(email.value, event);
    if (email.value.match(validRegex)) {
        email.style.backgroundColor = 'green';
        return true;
    } else {
        email.style.backgroundColor = 'red';
        return false;
    }
}