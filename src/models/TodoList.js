import Todo from './Todo';

class TodoList {
    constructor(title) {
        this.id = `list_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        this.title = title;
        this.todos = [];
    }

    addTodo(todoText) {
        const todo = new Todo(todoText);
        this.todos.push(todo);
        return todo;
    }
    // Modify the existing reorderTodos method
    reorderTodos(dragIndex, hoverIndex) {
        const reorderedTodos = [...this.todos];
        const [draggedItem] = reorderedTodos.splice(dragIndex, 1);
        reorderedTodos.splice(hoverIndex, 0, draggedItem);
        this.todos = reorderedTodos; // Directly update the todos array
        return this.todos;
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
