// let expenseAmount = document.querySelector('#expense-amount');
// let expenseInfo = document.querySelector('#expense-info');
// let expenseCategory = document.querySelector('#expense-category');
// let btn = document.querySelector('.btn');
// let expenseList = document.querySelector('.expense-list');
// document.addEventListener('DOMContentLoaded', getExpenses);
// btn.addEventListener('click', addExpense);
// expenseList.addEventListener('click', editExpense);
// expenseList.addEventListener('click', deleteExpense);

// async function getExpenses() {

//     try {
//         const response = await axios.get("http://localhost:3000/expenses");
//         response.data.forEach(expense => {
//             const li = document.createElement('li');
//             li.className = ('list-group-item d-flex justify-content-between align-items-center');
//             const span = document.createElement('span');
//             span.appendChild(document.createTextNode(`${expense.amount} ${expense.description} ${expense.category}`));
//             li.appendChild(span);
//             const div = document.createElement('div');
//             const edit = document.createElement('a');
//             edit.appendChild(document.createTextNode('Edit'));
//             edit.className = ('edit btn btn-primary');
//             edit.setAttribute('id', `${expense.id}`);
//             div.appendChild(edit);
//             const deleteIcon = document.createElement('a');
//             deleteIcon.appendChild(document.createTextNode('Delete'));
//             deleteIcon.className = ('delete btn btn-danger');
//             deleteIcon.setAttribute('id', `${expense.id}`);
//             div.appendChild(deleteIcon);
//             li.appendChild(div);
//             expenseList.appendChild(li);
//         })

//     } catch (error) {
//         console.log(error);
//     }
// }

// async function addExpense(e) {
//     e.preventDefault();
//     const id = document.getElementById('expense-id').value;
//     let obj = {
//         "amount": parseInt(expenseAmount.value),
//         "description": expenseInfo.value,
//         "category": expenseCategory.value
//     };
//     if (id) {
//     const token = localStorage.getItem('token');
//     if (token) {
//         try {
//             const response = await axios.put(`http://localhost:3000/expenses/${id}`, obj);
//             window.location.reload();
//         } catch (error) {
//             console.log(error);
//         }
//     } else {
//         if (!id && expenseAmount.value && expenseInfo.value && expenseCategory.value) {
//             try {
//                 const res = await axios.post("http://localhost:3000/expenses", obj);
//             const response = await axios.get(`http://localhost:3000/expenses?token=${token}`);
//             console.log(response.data)
//             response.data.forEach(expense => {
//                 const li = document.createElement('li');
//                 li.className = ('list-group-item d-flex justify-content-between align-items-center');
//                 const span = document.createElement('span');
//                 span.appendChild(document.createTextNode(`${response.data.amount} ${response.data.description} ${response.data.category}`));
//                 span.appendChild(document.createTextNode(`${expense.amount} ${expense.description} ${expense.category}`));
//                 li.appendChild(span);
//                 const div = document.createElement('div');
//                 const edit = document.createElement('a');
//                 edit.appendChild(document.createTextNode('Edit'));
//                 edit.className = ('edit btn btn-primary');
//                 edit.setAttribute('id', `${response.data.id}`);
//                 edit.setAttribute('id', `${expense.id}`);
//                 div.appendChild(edit);
//                 const deleteIcon = document.createElement('a');
//                 deleteIcon.appendChild(document.createTextNode('Delete'));
//                 deleteIcon.className = ('delete btn btn-danger');
//                 deleteIcon.setAttribute('id', `${response.data.id}`);
//                 deleteIcon.setAttribute('id', `${expense.id}`);
//                 div.appendChild(deleteIcon);
//                 li.appendChild(div);
//                 expenseList.appendChild(li);
//                 expenseAmount.value = '';
//                 expenseInfo.value = '';
//                 expenseCategory.value = '';
//             } catch (err)=>{
//                 console.log(err);
//             })
        

//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

// async function addExpense(e) {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     if (token) {
//         const id = document.getElementById('expense-id').value;
//         let obj = {
//             "amount": parseInt(expenseAmount.value),
//             "description": expenseInfo.value,
//             "category": expenseCategory.value,
//             "token": token
//         };
//         if (id) {
//             try {
//                 const response = await axios.put(`http://localhost:3000/expenses/${id}`, obj);
//                 window.location.reload();
//             } catch (error) {
//                 console.log(error);
//             }
//         } else {
//             alert('Please fill all fields');
//             if (!id && expenseAmount.value && expenseInfo.value && expenseCategory.value) {
//                 try {
//                     const response = await axios.post("http://localhost:3000/expenses", obj);
//                     const li = document.createElement('li');
//                     li.className = ('list-group-item d-flex justify-content-between align-items-center');
//                     const span = document.createElement('span');
//                     span.appendChild(document.createTextNode(`${response.data.amount} ${response.data.description} ${response.data.category}`));
//                     li.appendChild(span);
//                     const div = document.createElement('div');
//                     const edit = document.createElement('a');
//                     edit.appendChild(document.createTextNode('Edit'));
//                     edit.className = ('edit btn btn-primary');
//                     edit.setAttribute('id', `${response.data.id}`);
//                     div.appendChild(edit);
//                     const deleteIcon = document.createElement('a');
//                     deleteIcon.appendChild(document.createTextNode('Delete'));
//                     deleteIcon.className = ('delete btn btn-danger');
//                     deleteIcon.setAttribute('id', `${response.data.id}`);
//                     div.appendChild(deleteIcon);
//                     li.appendChild(div);
//                     expenseList.appendChild(li);
//                     expenseAmount.value = '';
//                     expenseInfo.value = '';
//                     expenseCategory.value = '';
//                 } catch (err) {
//                     console.log(err);
//                 }
//             } else {
//                 alert('Please fill all fields');
//             }
//         }
//     } else {
//         alert('Please login to add expense');
//         window.location.href = 'http://localhost:3000/login.html';
//     }
// }

// async function deleteExpense(e) {
//     if (e.target.classList.contains('delete')) {
//         const id = e.target.getAttribute('id');
//         e.target.parentElement.parentElement.remove();
//         try {
//             const response = await axios.delete(`http://localhost:3000/expenses/${id}`)
//             expenseAmount.value = '';
//             expenseInfo.value = '';
//             expenseCategory.value = '';
//         } catch (e) {
//             console.log(e);
//         const token = localStorage.getItem('token');
//         if (token) {
//             try {
//                 const response = await axios.delete(`http://localhost:3000/expenses/${id}?token=${token}`);
//                 expenseAmount.value = '';
//                 expenseInfo.value = '';
//                 expenseCategory.value = '';
//             } catch (e) {
//                 console.log(e);
//             }
//         }
//     }
// }

// async function editExpense(e) {
//     if (e.target.classList.contains('edit')) {
//         const id = e.target.getAttribute('id');

//         try {
//             const response = await axios.get(`http://localhost:3000/expenses/${id}`);
//             console.log(response)
//             document.getElementById('expense-id').value = response.data.id;
//             expenseAmount.value = response.data.amount;
//             expenseInfo.value = response.data.description;
//             expenseCategory.value = response.data.category;
//         } catch (e) {
//             console.log(e);
//         const token = localStorage.getItem('token');
//         if (token) {
//             try {
//                 const response = await axios.get(`http://localhost:3000/expenses/${id}?token=${token}`);
//                 console.log(response)
//                 document.getElementById('expense-id').value = response.data.id;
//                 expenseAmount.value = response.data.amount;
//                 expenseInfo.value = response.data.description;
//                 expenseCategory.value = response.data.category;
//             } catch (e) {
//                 console.log(e);
//             }
//         }
//     }
// }




let expenseAmount = document.querySelector('#expense-amount');
let expenseInfo = document.querySelector('#expense-info');
let expenseCategory = document.querySelector('#expense-category');
let btn = document.querySelector('.btn');
let expenseList = document.querySelector('.expense-list');
document.addEventListener('DOMContentLoaded', getExpenses);
btn.addEventListener('click', addExpense);

async function getExpenses() {
  try {
    const response = await axios.get("http://localhost:3000/expenses");
    response.data.forEach(expense => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      const span = document.createElement('span');
      span.appendChild(document.createTextNode(`${expense.amount} ${expense.description} ${expense.category}`));
      li.appendChild(span);
      const div = document.createElement('div');
      const edit = document.createElement('a');
      edit.appendChild(document.createTextNode('Edit'));
      edit.className = 'edit btn btn-primary';
      edit.setAttribute('data-id', expense.id);
      div.appendChild(edit);
      const deleteIcon = document.createElement('a');
      deleteIcon.appendChild(document.createTextNode('Delete'));
      deleteIcon.className = 'delete btn btn-danger';
      deleteIcon.setAttribute('data-id', expense.id);
      div.appendChild(deleteIcon);
      li.appendChild(div);
      expenseList.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
}

async function addExpense(e) {
  e.preventDefault();
  const id = document.getElementById('expense-id').value;
  const token = localStorage.getItem('token');
  if (token) {
    let obj = {
      amount: parseInt(expenseAmount.value),
      description: expenseInfo.value,
      category: expenseCategory.value,
      token: token
    };

    try {
      if (id) {
        await axios.put(`http://localhost:3000/expenses/${id}`, obj);
      } else {
        await axios.post("http://localhost:3000/expenses", obj);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  } else {
    alert('Please login to add an expense');
    window.location.href = 'http://localhost:3000/login.html';
  }
}

async function deleteExpense(e) {
  if (e.target.classList.contains('delete')) {
    const id = e.target.getAttribute('data-id');
    e.target.parentElement.parentElement.remove();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.delete(`http://localhost:3000/expenses/${id}?token=${token}`);
        expenseAmount.value = '';
        expenseInfo.value = '';
        expenseCategory.value = '';
      } catch (e) {
        console.log(e);
      }
    }
  }
}

async function editExpense(e) {
  if (e.target.classList.contains('edit')) {
    const id = e.target.getAttribute('data-id');
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`http://localhost:3000/expenses/${id}?token=${token}`);
        document.getElementById('expense-id').value = response.data.id;
        expenseAmount.value = response.data.amount;
        expenseInfo.value = response.data.description;
        expenseCategory.value = response.data.category;
      } catch (e) {
        console.log(e);
      }
    }
  }
}

expenseList.addEventListener('click', editExpense);
expenseList.addEventListener('click', deleteExpense);
