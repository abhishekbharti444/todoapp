import React, { Component } from 'react';
import './TodoListItem.css';

class TodoListItem extends Component {
    render() {
        const { todos, onToggle, onDelete } = this.props;

        // Return null if todos is empty or undefined
        if (!todos || todos.length === 0) {
            return null;
        }

        return (
            <div className="card">
                <ul className="todo-list">
                    {todos.map(todo => (
                        <li key={todo.id} className="todo-item">
                            <label className='todo-label'>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => onToggle(todo.id)}
                                />
                                <span
                                    className={`todo-text ${todo.completed ? 'completed' : ''}`}
                                >
                                    {todo.todoText}
                                </span>
                            </label>
                            <button
                                className='delete-button'
                                onClick={() => onDelete(todo.id)}
                                aria-label='Delete todo'
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoListItem;
