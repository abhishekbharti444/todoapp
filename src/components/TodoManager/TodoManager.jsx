import { Component } from "react";
// import { preview } from "vite";
import Todo from "../../models/Todo.js";
import TodoList from "../../models/TodoList.js";
import { ListCard } from '../ListCard/ListCard';
import './TodoManager.css'
class TodoManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoLists: this.loadFromLocalStorage() || [],
            activeMenu: null
        };
    }

    // Storage methods
    loadFromLocalStorage = () => {
        try {
            const saved = localStorage.getItem('todoLists');
            if (!saved) return [];

            const parsedData = JSON.parse(saved);
            return parsedData.map(listData => {
                const list = new TodoList(listData.title);
                list.id = listData.id;
                list.todos = listData.todos.map(todoData => {
                    const todo = new Todo(todoData.todoText);
                    todo.id = todoData.id;
                    todo.completed = todoData.completed;
                    todo.createdAt = new Date(todoData.createdAt);
                    return todo;
                });
                return list;
            });
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return [];
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.saveToLocalStorage();
    }
    saveToLocalStorage = () => {
        try {
            const data = this.state.todoLists.map(list => list.toJSON());
            localStorage.setItem('todoLists', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }


    addNewList = () => {
        const newList = new TodoList(`List ${this.state.todoLists.length + 1}`);
        this.setState(prevState => ({
            todoLists: [newList, ...prevState.todoLists]
        }));
    }
    deleteList = (listId) => {
        this.setState(prevState => ({
            todoLists: prevState.todoLists.filter(list => list.id !== listId)
        }))
    }

    // In TodoManager.jsx
    updateListTitle = (listId, newTitle) => {
        this.setState(prevState => ({
            todoLists: prevState.todoLists.map(list => {
                if (list.id === listId) {
                    // Create new TodoList instance to maintain methods
                    const updatedList = new TodoList(newTitle);
                    updatedList.id = list.id;
                    // Copy existing todos
                    updatedList.todos = list.todos.map(todo => {
                        const newTodo = new Todo(todo.todoText);
                        newTodo.id = todo.id;
                        newTodo.completed = todo.completed;
                        newTodo.createdAt = todo.createdAt;
                        return newTodo;
                    });
                    return updatedList;
                }
                return list;
            })
        }));
    }


    // In TodoManager.jsx
    addTodoToList = (listId, todoData) => {
        this.setState(prevState => {
            const newLists = prevState.todoLists.map(list => {
                if (list.id === listId) {
                    // Create a new instance of TodoList to maintain methods
                    const updatedList = new TodoList(list.title);
                    updatedList.id = list.id;
                    updatedList.todos = [...list.todos];
                    // Add the new todo using the class method
                    updatedList.addTodo(todoData.todoText);
                    return updatedList;
                }
                return list;
            });

            return { todoLists: newLists };
        });
    }

    deleteTodoFromList = (listId, todoId) => {
        this.setState(prevState => ({
            todoLists: prevState.todoLists.map(list => {
                if (list.id === listId) {
                    list.deleteTodo(todoId);
                }
                return list;
            })
        }))
    }

    toggleTodoInList = (listId, todoId) => {
        this.setState(prevState => {
            const newLists = prevState.todoLists.map(list => {
                if (list.id === listId) {
                    const updatedList = new TodoList(list.title);
                    updatedList.id = list.id;
                    updatedList.todos = list.todos.map(todo => {
                        const newTodo = new Todo(todo.todoText);
                        newTodo.id = todo.id;
                        newTodo.completed = todo.completed;
                        newTodo.createdAt = todo.createdAt;
                        return newTodo;
                    });
                    updatedList.toggleTodo(todoId);
                    return updatedList;
                }
                return list;
            });
            return { todoLists: newLists };
        })
    }
    // Add method to handle reordering todos within a list
    reorderTodos(listId, dragIndex, hoverIndex) {
        const list = this.getList(listId);
        if (!list) return;

        const todos = list.getTodos();
        const reorderedTodos = [...todos];
        const [draggedItem] = reorderedTodos.splice(dragIndex, 1);
        reorderedTodos.splice(hoverIndex, 0, draggedItem);

        list.setTodos(reorderedTodos);
        this.saveLists(); // If you're persisting to localStorage

        return reorderedTodos;
    }

    render() {
        return (
            <div className="app-wrapper">
                <div className="app-header">
                    <h1 className="app-title">Todo Lists</h1>
                    <button onClick={this.addNewList} className="add-list-button">
                        Create New List
                    </button>
                </div>
                <div className="app-content">
                    <div className="todo-manager">
                        <div className="lists-container">
                            {this.state.todoLists.map(list => (
                                <ListCard
                                    key={list.id}
                                    list={list}
                                    onRename={this.updateListTitle}
                                    onDelete={this.deleteList}
                                    onAddTodo={this.addTodoToList}
                                    onToggleTodo={this.toggleTodoInList}
                                    onDeleteTodo={this.deleteTodoFromList}
                                    onReorderTodos={this.handleReorderTodos}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }



}

export default TodoManager;