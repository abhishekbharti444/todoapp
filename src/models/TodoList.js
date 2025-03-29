import Todo from './Todo';

class TodoList {
    constructor(title) {
        this.id = `list_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        this.title = title;
        this.todos = [];
    }

    addTodo(todoText) {
        console.log('Before adding:', this.todos.length); // Debug log

        const todo = new Todo(todoText);
        this.todos.push(todo);
        console.log('After adding:', this.todos.length); // Debug log
        return todo;
    }

    deleteTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }

    toggleTodo(todoId) {
        const todo = this.todos.find(todo => todo.id === todoId);
        if (todo) {
            todo.toggle();
        }
    }

    updateTitle(newTitle) {
        this.title = newTitle;
    }

    getTodos() {
        return this.todos;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            todos: this.todos.map(todo => todo.toJSON())
        };
    }
}

export default TodoList;
