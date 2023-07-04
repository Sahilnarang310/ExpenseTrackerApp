async function login(event) {
    event.preventDefault();
  
    try {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      const loginDetails = {
        email,
        password
      };
  
      console.log(loginDetails);
      const response = await axios.post("http://localhost:4000/user/login", loginDetails);
  
      if (response.status === 200) {
        alert(response.data.message);
        localStorage.setItem('token', response.data.token);
        window.location.href = "../ExpTracker/expense.html";
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      document.body.innerHTML += `<div style="color:red;">${err.message}</div>`;
    }
  }
  
  const submitbtn = document.getElementById('login');
  submitbtn.addEventListener('click', login);
  