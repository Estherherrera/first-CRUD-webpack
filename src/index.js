import './styles.css';

import { Todo, TodoList } from './class'
import { createTodoHtml } from './js/componentes';


export const todoList = new TodoList

todoList.todos.forEach(todo => createTodoHtml(todo));
//todoList.todos.forEach(createTodoHtml) //cumple la misma función de la línea de arriba