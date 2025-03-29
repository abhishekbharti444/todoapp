import { Component } from "react";
// import { preview } from "vite";
import Todo from "../../models/Todo.js";
import TodoList from "../../models/TodoList.js";
import TodoForm from '../TodoForm/TodoForm.jsx';
import TodoListItem from '../TodoListItem/TodoListItem.jsx';

class TodoManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoLists: this.loadFromLocalStorage() || []
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
        // Add debug logs
        console.log('Component did update');
        // console.log('Previous todos:', prevState.todoLists);
        // console.log('Current todos:', this.state.todoLists);

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
            todoLists: [...prevState.todoLists, newList]
        }));
    }
    deleteList = (listId) => {
        this.setState(prevState => ({
            todoLists: prevState.todoLists.filter(list => list.id !== listId)
        }))
    }

    updateListTitle = (listId, newTitle) => {
        this.setState(prevState => ({
            todoLists: prevState.todoLists.map(list => {
                if (list.id === listId) {
                    list.updateTitle(newTitle);
                }
                return list;
            })
        }))
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

    render() {
        return (
            <div className="todo-manager">
                <button onClick={this.addNewList} className="add-list-button">
                    + New Todo List
                </button>
                <div className="lists-container">
                    {this.state.todoLists.map(list => (
                        <div key={list.id} className="todo-card">
                            <div className='card-header'>
                                <input
                                    type="text"
                                    value={list.title}
                                    onChange={(e) => this.updateListTitle(list.id, e.target.value)}
                                    className='list-title-input'
                                />
                                <button
                                    onClick={() => this.deleteList(list.id)}
                                    className='delete-list-button'
                                    aria-label="Delete list"
                                >
                                    ×
                                </button>
                            </div>
                            <TodoForm
                                onAddTodo={(todoData) => this.addTodoToList(list.id, todoData)}
                                placeholder="Add a new task..."
                            />
                            <TodoListItem
                                todos={list.getTodos()}
                                onToggle={(todoId) => this.toggleTodoInList(list.id, todoId)}
                                onDelete={(todoId) => this.deleteTodoFromList(list.id, todoId)}
                            />
                        </div>

                    ))}

                </div>

            </div>
        )
    }



}

export default TodoManager;