class Todo {
    constructor(todoText) {
        this.id = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        this.todoText = todoText;
        this.completed = false;
        this.createdAt = new Date();
    }

    toggle() {
        this.completed = !this.completed;
        return this;
    }

    update(todoText) {
        this.todoText = todoText;
        return this;
    }

    toJSON() {
        return {
            id: this.id,
            todoText: this.todoText,
            completed: this.completed,
            createdAt: this.createdAt
        };
    }
}

export default Todo;
