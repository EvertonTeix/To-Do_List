// Seleção de elementos
const todoForm = document.querySelector("#toDo-form");
const todoInput = document.querySelector("#toDo-input");
const todoList = document.querySelector("#toDo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const filterSelect = document.querySelector('#filter-select');

let oldInputValue;

// Funções
const saveToDo = (text) => {

    const toDo = document.createElement("div");
    toDo.classList.add("toDo");

    const toDoTitle = document.createElement("h3");
    toDoTitle.innerText = text;
    toDo.appendChild(toDoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-toDo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    toDo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-toDo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    toDo.appendChild(editBtn);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-toDo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    toDo.appendChild(deleteBtn);

    todoList.appendChild(toDo);
    todoInput.value = "";
    todoInput.focus();


}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateToDo = (text) => {

    const todos = document.querySelectorAll(".toDo");

    todos.forEach((todo) => {

        let toDoTitle = todo.querySelector("h3");

        if(toDoTitle.innerText === oldInputValue){
            toDoTitle.innerText = text;
        }
    })

}

const filterToDos = (status) => {
    const todos = document.querySelectorAll('.toDo');

    todos.forEach(todo => {
        if (status === 'todos') {
            todo.classList.remove('hidden');
        } else if (status === 'feitos' && !todo.classList.contains('done')) {
            todo.classList.add('hidden');
        } else if (status === 'fazer' && todo.classList.contains('done')) {
            todo.classList.add('hidden');
        } else {
            todo.classList.remove('hidden');
        }
    });
}


// Eventos
todoForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const inputValue = todoInput.value

    if(inputValue){
        saveToDo(inputValue)
    }
});

document.addEventListener("click", (e) =>{

    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let toDoTitle;


    if(parentEl && parentEl.querySelector("h3")){
        toDoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-toDo")){
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("remove-toDo")){
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-toDo")){

        toggleForms();

        editInput.value = toDoTitle;
        oldInputValue = toDoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e) =>{
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const editInputValue = editInput.value;

    if(editInputValue){
        updateToDo(editInputValue);
    }

    toggleForms();

});


filterSelect.addEventListener('change', (e) => {
    const status = e.target.value;
    filterToDos(status);
});


