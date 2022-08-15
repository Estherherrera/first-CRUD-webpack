import { Todo } from '../class'
import { todoList } from '../index';

//Referencia en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnDelete = document.querySelector('.clear-completed')
const ulFilters = document.querySelector('.filters')
const anchorFilter = document.querySelectorAll('.filter')


export const createTodoHtml = (todo) => {
    const htmlTodo = `<li class="${ (todo.completed) ? 'completed': ''}" data-id="${ todo.id }">
                        <div class="view">
                            <input class="toggle" type="checkbox" ${ (todo.completed) ? 'checked': ''}>
                            <label id="task">${todo.task}</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="Create a TodoMVC template">
                      </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

//eventos
txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        console.log(txtInput.value)
        const addTodo = new Todo(txtInput.value)
        todoList.addTodo(addTodo)

        createTodoHtml(addTodo)
    }
});

divTodoList.addEventListener('click', (event) => {

    console.log(event.target.parentElement.parentElement)

    const nameElement = event.target.localName; //Input Button, label
    const todoElement = event.target.parentElement.parentElement
    const todoId = todoElement.getAttribute('data-id')
    console.log(event.target.parentElement.parentElement)


    if (nameElement.includes('input')) { //Click en el check
        todoList.markDone(todoId)
        todoElement.classList.toggle('completed');

    }

    if (nameElement.includes('label')) {

        document.querySelector("#task").innerHTML = `<input class="modify" type="text" value="">`
        const modify = document.querySelector('.modify')
        modify.addEventListener('keyup', (event) => {

            if (event.keyCode === 13 && modify.value.length > 0) {

                const updateTodo = new Todo(modify.value)
                todoList.addTodo(updateTodo)
                todoList.deleteTodo(todoId)
                divTodoList.removeChild(todoElement)
                createTodoHtml(updateTodo)
            }
        })
    }



    if (nameElement.includes('button')) {
        todoList.deleteTodo(todoId)
        divTodoList.removeChild(todoElement)
    }


})

btnDelete.addEventListener('click', (event) => {
    todoList.deleteDones()

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const element = divTodoList.children[i];

        if (element.classList.contains('completed')) {
            divTodoList.removeChild(element)
        }
    }
})

ulFilters.addEventListener('click', (event) => {
    console.log(event.target.text)
    const filters = event.target.text;
    if (!filters) {
        return;
    }

    anchorFilter.forEach(elem => elem.classList.remove('selected'))
    event.target.classList.add('selected');

    for (const element of divTodoList.children) {
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed')

        switch (filters) {
            case 'Pendientes':
                if (completed) {
                    element.classList.add('hidden')
                }
                break;
            case 'Completados':
                if (!completed) {
                    element.classList.add('hidden')
                }
                break;
        }
    }
})