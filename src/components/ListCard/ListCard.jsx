import React from 'react';
import TodoForm from '../TodoForm/TodoForm';
import TodoListItem from '../TodoListItem/TodoListItem';
import './ListCard.css';

export function ListCard({ list, onRename, onDelete, onAddTodo, onToggleTodo, onDeleteTodo }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isRenaming, setIsRenaming] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const startRenaming = () => {
        setIsMenuOpen(false);
        setIsRenaming(true);
    };

    const handleRename = (e) => {
        onRename(list.id, e.target.value);
    };

    const endRenaming = () => {
        setIsRenaming(false);
    };

    const handleDelete = () => {
        onDelete(list.id);
    };

    return (
        <div className="todo-card">
            <div className='card-header'>
                {isRenaming ? (
                    <input
                        type="text"
                        value={list.title}
                        onChange={handleRename}
                        onBlur={endRenaming}
                        autoFocus
                        className='list-title-input'
                    />
                ) : (
                    <h3 className="list-title">{list.title}</h3>
                )}
                <div className="menu-container">
                    <button
                        onClick={toggleMenu}
                        className='menu-button'
                        aria-label="List options"
                    >
                        ⋮
                    </button>
                    {isMenuOpen && (
                        <div className="menu-dropdown">
                            <button
                                onClick={startRenaming}
                                className="menu-item"
                            >
                                Rename List
                            </button>
                            <button
                                onClick={handleDelete}
                                className="menu-item delete"
                            >
                                Delete List
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <TodoForm
                onAddTodo={(todoData) => onAddTodo(list.id, todoData)}
                placeholder="Add a new task..."
            />
            <TodoListItem
                todos={list.getTodos()}
                onToggle={(todoId) => onToggleTodo(list.id, todoId)}
                onDelete={(todoId) => onDeleteTodo(list.id, todoId)}
            />
        </div>
    );
}
