// Function to handle the login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const loginEmail = document.querySelector('#login-email').value;
    const loginPassword = document.querySelector('#login-password').value;
    
    // Check if the login credentials are valid
    if (loginEmail && loginPassword) {
        // Simulate saving the login information
        localStorage.setItem('loginInfo', JSON.stringify({ email: loginEmail, password: loginPassword }));
        
        // Show success alert
        alert('Login successfully!');
    } else {
        // Show error alert
        alert('Please enter valid login credentials');
    }
}

// Function to check if a user exists
function checkUserExists() {
    const loginEmail = document.querySelector('#login-email').value;
    
    // Check if a user with the same email exists
    const savedLoginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    
    if (savedLoginInfo && savedLoginInfo.email === loginEmail) {
        // Show alert for existing user
        alert('User already exists');
    }
}

// Add event listener to the login form submit button
const loginForm = document.querySelector('form');
loginForm.addEventListener('submit', handleLogin);

// Add event listener to the login email input to check for existing user
const loginEmailInput = document.querySelector('#login-email');
loginEmailInput.addEventListener('blur', checkUserExists);
