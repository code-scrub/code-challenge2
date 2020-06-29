// Global Variable
let storeKey = 'todoListItems';

// Orchestrator method
function orchestrator() {
    document.getElementById('addToDo').addEventListener('click', addItems);

    // Render the result on page
    renderItems();
}

// Method to retrieve data from the localStorage
function getItems () { 
    console.log('In getItems: ');
    let todos = new Array();
    let todoString = localStorage.getItem(storeKey);
    console.log(todoString);
    if (todoString !== null) {
        todos = JSON.parse(todoString); 
    }
    return todos;
}

// Method to add new item to the existing list
function addItems () {
    console.log('In addItems: ');
    let getExistingListItems = getItems();
    let itemToAdd = document.getElementById('itemToAdd').value; 
    console.log(itemToAdd);
    getExistingListItems.push(itemToAdd);
    localStorage.setItem(storeKey , JSON.stringify(getExistingListItems));
    renderItems();
}

// Method to render the list on to the page
function renderItems() {
    console.log('In renderItems: ');
    let todos = getItems();
 
    let html = '<ul>';
    for(let i=0; i<todos.length; i++) {
        html += '<li>' + todos[i] + '<button class="remove" id="' + i  + '">x</button></li>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    let buttons = document.getElementsByClassName('remove');
    for (let i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', clearItem);
    };
}

// Method to remove items from the list
function clearItem() {
    console.log('In clearItem: ');
    let id = this.getAttribute('id');
    let todos = getItems();
    todos.splice(id, 1);
    localStorage.setItem(storeKey, JSON.stringify(todos));
    renderItems();
}

orchestrator()