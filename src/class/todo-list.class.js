export class TodoList {

    constructor() {
        this.loadTheLocalStorage()
    }

    addTodo(todo) {
        this.todos.push(todo);
        this.saveInLocalStorage()
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id)
        this.saveInLocalStorage()
    }

    markDone(id) {
        for (const todo of this.todos) {

            if (todo.id === id) {
                todo.completed = !todo.completed
                break
            }
        }
    }

    deleteDones() {
        this.todos = this.todos.filter(todo => !todo.completed)
        this.saveInLocalStorage()
    }

    saveInLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos))
    }

    loadTheLocalStorage() {

        this.todos = (localStorage.getItem('todo')) ?
            JSON.parse(localStorage.getItem('todo')) : [];

    }
}