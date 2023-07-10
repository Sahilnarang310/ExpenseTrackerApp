
function saveExpense(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const userId = 1;
    const obj = {
      amount,
      description,
      category,
      userId
    };
    const token = localStorage.getItem('token');
    axios.post("http://localhost:4000/expense/add-expense", obj, {
        headers: {
          "Authorization": token
        }
      })
      .then((response) => {
        showNewExpenseOnScreen(response.data.newExpense);
        console.log(response);
      })
      .catch((error) => {
        document.body.innerHTML =
          document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(error);
      });
  }
  
  function showPremiumuserMessage() {
    document.getElementById('buy premium').style.visibility = "hidden";
    document.getElementById('message').innerHTML = "You are a Premium User";
  }
  
  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');
    const decodeToken = parseJwt(token);
    console.log(decodeToken);
    const ispremiumuser = decodeToken.ispremiumuser;
    if (ispremiumuser) {
      showPremiumuserMessage();
      showLeaderboard();
    }
    axios.get("http://localhost:4000/expense/get-expenses", {
        headers: {
          "Authorization": token
        }
      })
      .then((response) => {
        console.log(response);
        for (var i = 0; i < response.data.expenses.length; i++) {
          showNewExpenseOnScreen(response.data.expenses[i]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  function showNewExpenseOnScreen(expense) {
    const parentNode = document.getElementById("items");
    const childHTML = `<div><li id=${expense.id}>${expense.amount}-${expense.category}-${expense.description}
         <button class="btn btn-primary" onclick=deleteExpense('${expense.id}') > Delete Expense</button>
         <button class="btn btn-primary" onclick=editExpense('${expense.amount}','${expense.description}','${expense.category}','${expense.id}')> Edit Expense</button>
         </li></div>`;
    parentNode.innerHTML += childHTML;
  }
  
  function editExpense(amount, description, category, expenseid) {
    document.getElementById("amount").value = amount;
    document.getElementById("description").value = description;
    document.getElementById("category").value = category;
    deleteExpense(expenseid);
  }
  
  function deleteExpense(expenseid) {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:4000/expense/delete-expense/${expenseid}`, {
        headers: {
          "Authorization": token
        }
      })
      .then((response) => {
        removeExpenseFromScreen(expenseid);
      })
      .catch((err) => console.log(err));
  }
  
  function removeExpenseFromScreen(expenseid) {
    const childNodeToBeDeleted = document.getElementById(expenseid);
    if (childNodeToBeDeleted) {
      childNodeToBeDeleted.parentNode.removeChild(childNodeToBeDeleted);
    }
  }
  
  async function showLeaderboard() {
    try {
      const inputElement = document.createElement("input");
      inputElement.type = "button";
      inputElement.className = "btn btn-dark";
      inputElement.value = 'Show Leaderboard';
      inputElement.onclick = async() => {
        const token = localStorage.getItem('token');
        const userLeaderBoardArray = await axios.get("http://localhost:4000/premium/showLeaderBoard", {
          headers: {
            "Authorization": token
          }
        });
        console.log(userLeaderBoardArray);
        var leaderboardElem = document.getElementById('leaderboard');
        leaderboardElem.innerHTML += '<h2> Leader Board </h2>';
  
        userLeaderBoardArray.data.forEach((userDetails) => {
          leaderboardElem.innerHTML += `<li>Name - ${userDetails.name} -Total Expenses -${userDetails.totalExpenses || 0} </li>`;
        });
      };
      document.getElementById("message").appendChild(inputElement);
    } catch (err) {
      console.log(err);
    }
  }
  
  document.getElementById('buy premium').onclick = async function(e) {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:4000/purchase/premiummembership', {
      headers: {
        "Authorization": token
      }
    });
    console.log(response);
    var options = {
      "key": response.data.key_id,
      "order_id": response.data.order.id,
      "handler": async function(response) {
        const res = await axios.post('http://localhost:4000/purchase/updatetransactionstatus', {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        }, {
          headers: {
            "Authorization": token
          }
        });
        alert('You are a Premium User Now');
        document.getElementById('buy premium').style.visibility = "hidden";
        document.getElementById('message').innerHTML = "You are a Premium User";
        localStorage.setItem('isadmin', true);
        localStorage.setItem('token', res.data.token);
        showLeaderboard();
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed', function(response) {
      console.log(response);
      alert('Something went wrong');
    });
  }
  
  async function download() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/user/download', {
        headers: {
          "Authorization": token
        }
      });
      if (response.status === 201) {
        var a = document.createElement("a");
        a.href = response.data.fileUrl;
        a.download = 'myexpense.csv';
        a.click();
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  async function showDownloadedFiles() {
    try {
      const downloadedFiles = document.getElementById('downloadedFiles');
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/expense/downloadedFiles', {
        headers: {
          "Authorization": token
        }
      });
      const data = response.data;
      console.log('all downloads', data);
      if (data.length > 0) {
        downloadedFiles.hidden = false;
        const urls = document.getElementById('fileList');
        urls.textContent = 'Downloaded Files';
        urls.style.fontWeight = "500";
  
        for (let i = 0; i < data.length; i++) {
          const link = document.createElement('a');
          link.href = data[i];
          link.textContent = data[i
          ].slice(0, 50 - 3) + "...";
          const urlList = document.createElement('li');
          urlList.appendChild(link);
          urls.appendChild(urlList);
        }
      } else {
        alert(`You haven't downloaded any file yet`);
      }
    } catch (err) {
      console.log(err);
    }
  }
  