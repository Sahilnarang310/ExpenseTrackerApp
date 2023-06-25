let expenseAmount = document.querySelector('#expense-amount');
let expenseInfo = document.querySelector('#expense-info');
let expenseCategory = document.querySelector('#expense-category');
let btn = document.querySelector('.btn');
let expenseList = document.querySelector('.expense-list');

document.addEventListener('DOMContentLoaded', getExpenses);
btn.addEventListener('click', addExpense);
expenseList.addEventListener('click', editExpense);
expenseList.addEventListener('click', deleteExpense);

async function getExpenses() {

    try {
        const response = await axios.get("http://localhost:3000/expenses");
        response.data.forEach(expense => {
            const li = document.createElement('li');
            li.className = ('list-group-item d-flex justify-content-between align-items-center');
            const span = document.createElement('span');
            span.appendChild(document.createTextNode(`${expense.amount} ${expense.description} ${expense.category}`));
            li.appendChild(span);
            const div = document.createElement('div');
            const edit = document.createElement('a');
            edit.appendChild(document.createTextNode('Edit'));
            edit.className = ('edit btn btn-primary');
            edit.setAttribute('id', `${expense.id}`);
            div.appendChild(edit);
            const deleteIcon = document.createElement('a');
            deleteIcon.appendChild(document.createTextNode('Delete'));
            deleteIcon.className = ('delete btn btn-danger');
            deleteIcon.setAttribute('id', `${expense.id}`);
            div.appendChild(deleteIcon);
            li.appendChild(div);
            expenseList.appendChild(li);
        })

    } catch (error) {
        console.log(error);
    }
    // let expenses;
    // if (localStorage.getItem('expenses') == null) {
    //     expenses = [];
    // } else {
    //     expenses = JSON.parse(localStorage.getItem('expenses'));   
    // }

}

async function addExpense(e) {
    e.preventDefault();
    const id = document.getElementById('expense-id').value;
    let obj = {
        "amount": parseInt(expenseAmount.value),
        "description": expenseInfo.value,
        "category": expenseCategory.value
    };
    if (id) {
        try {
            const response = await axios.put(`http://localhost:3000/expenses/${id}`, obj);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    } else {
        if (!id && expenseAmount.value && expenseInfo.value && expenseCategory.value) {
            try {
                const response = await axios.post("http://localhost:3000/expenses", obj);
                const li = document.createElement('li');
                li.className = ('list-group-item d-flex justify-content-between align-items-center');
                const span = document.createElement('span');
                span.appendChild(document.createTextNode(`${response.data.amount} ${expenseInfo.description} ${expenseCategory.category}`));
                li.appendChild(span);
                const div = document.createElement('div');
                const edit = document.createElement('a');
                edit.appendChild(document.createTextNode('Edit'));
                edit.className = ('edit btn btn-primary');
                deleteIcon.setAttribute('id', `${expense.id}`);
                div.appendChild(edit);
                const deleteIcon = document.createElement('a');
                deleteIcon.appendChild(document.createTextNode('Delete'));
                deleteIcon.className = ('delete btn btn-danger');
                deleteIcon.setAttribute('id', `${response.data.id}`);
                div.appendChild(deleteIcon);
                li.appendChild(div);
                expenseList.appendChild(li);
                expenseAmount.value = '';
                expenseInfo.value = '';
                expenseCategory.value = '';
            } catch (err) {
                console.log(err);
            }
        } else {
            alert('Please fill all fields');
        }
    }
}

// function addExpenseInLocalStorage(amount, info, category) {
//     let expenses;
//     if (localStorage.getItem('expenses') == null) {
//         expenses = [];
//     } else {
//         expenses = JSON.parse(localStorage.getItem('expenses'));
//     }

//     let isUpdationNotHappening = true;
//     expenses.forEach(expense => {
//         if (expense.amount == amount || expense.info == info || expense.category == category) {
//             expense.amount = amount;
//             expense.info = info;
//             expense.category = category;
//             isUpdationNotHappening = false;
//         }
//     });

//     if (isUpdationNotHappening) {
//         const li = document.createElement('li');
//         li.className = ('list-group-item d-flex justify-content-between align-items-center');
//         const span = document.createElement('span');
//         span.appendChild(document.createTextNode(`${expenseAmount.value} ${expenseInfo.value} ${expenseCategory.value}`));
//         li.appendChild(span);
//         const div = document.createElement('div');
//         const edit = document.createElement('a');
//         edit.appendChild(document.createTextNode('Edit'));
//         edit.className = ('edit btn btn-primary');
//         div.appendChild(edit);
//         const deleteIcon = document.createElement('a');
//         deleteIcon.appendChild(document.createTextNode('Delete'));
//         deleteIcon.className = ('delete btn btn-danger');
//         div.appendChild(deleteIcon);
//         li.appendChild(div);
//         expenseList.appendChild(li);
//         let expense = { 'amount': amount, 'info': info, 'category': category };
//         expenses.push(expense);
//     }
//     localStorage.setItem('expenses', JSON.stringify(expenses));
// }

async function deleteExpense(e) {
    if (e.target.classList.contains('delete')) {
        const id = e.target.getAttribute('id');
        e.target.parentElement.parentElement.remove();
        try {
            const response = await axios.delete(`http://localhost:3000/expenses/${id}`)
            expenseAmount.value = '';
            expenseInfo.value = '';
            expenseCategory.value = '';
        } catch (e) {
            console.log(e);
        }
    }
}

// function deleteExpenseFromLocalStorage(expenseItem) {
//     let expenses;
//     if (localStorage.getItem('expenses') == null) {
//         expenses = [];
//     } else {
//         expenses = JSON.parse(localStorage.getItem('expenses'));
//     }
//     expenses = expenses.filter(expense => {
//         return (expenseItem.textContent.split(' ')[0] != expense.amount);
//     });
//     localStorage.setItem('expenses', JSON.stringify(expenses));
// }

async function editExpense(e) {
    if (e.target.classList.contains('edit')) {
        const id = e.target.getAttribute('id');

        try {
            const response = await axios.get(`http://localhost:3000/expenses/${id}`);
            console.log(response)
            document.getElementById('expense-id').value = response.data.id;
            expenseAmount.value = response.data.amount;
            expenseInfo.value = response.data.description;
            expenseCategory.value = response.data.category;
        } catch (e) {
            console.log(e);
        }
    }
}

// function editExpenseFromLocalStorage(expenseItem) {
//     let expenses;
//     if (localStorage.getItem('expenses') == null) {
//         expenses = [];
//     } else {
//         expenses = JSON.parse(localStorage.getItem('expenses'));
//     }
//     expenses.forEach(expense => {
//         if (expenseItem.textContent.split(' ')[0] == expense.amount) {
//             expenseAmount.value = expense.amount;
//             expenseInfo.value = expense.info;
//             expenseCategory.value = expense.category;
//         }
//     });
// }