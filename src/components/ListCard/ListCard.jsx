import React from 'react';
import TodoForm from '../TodoForm/TodoForm';
import TodoListItem from '../TodoListItem/TodoListItem';
import './ListCard.css';

export function ListCard({ list, onRename, onDelete, onAddTodo, onToggleTodo, onDeleteTodo }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isRenaming, setIsRenaming] = React.useState(false);
    const [editableTitle, setEditableTitle] = React.useState(list.title);
    const [, forceUpdate] = React.useState({});
    const inputRef = React.useRef(null);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    React.useEffect(() => {
        // Update editable title when list title changes
        setEditableTitle(list.title);
    }, [list.title]);
    const startRenaming = () => {
        setIsMenuOpen(false);
        setIsRenaming(true);
    };

    const handleRename = (e) => {
        setEditableTitle(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            finishRenaming();
        } else if (e.key === 'Escape') {
            cancelRenaming();
        }
    };
    const finishRenaming = () => {
        if (editableTitle.trim()) {
            onRename(list.id, editableTitle);
        } else {
            setEditableTitle(list.title);
        }
        setIsRenaming(false);
    };

    const cancelRenaming = () => {
        setEditableTitle(list.title);
        setIsRenaming(false);
    };

    const handleDelete = () => {
        onDelete(list.id);
    };
    const handleReorderTodos = (dragIndex, hoverIndex) => {
        list.reorderTodos(dragIndex, hoverIndex);
        // Force a re-render by creating a new reference
        const updatedList = { ...list };
        // You might need to add an onUpdate prop to handle state updates
        if (typeof onUpdate === 'function') {
            onUpdate(updatedList);
        }
        forceUpdate({});
    };

    return (
        <div className="todo-card">
            <div className='card-header'>
                {isRenaming ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={editableTitle}
                        onChange={handleRename}
                        onBlur={finishRenaming}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className='list-title-input'
                    />
                ) : (
                    <h3
                        className="list-title"
                        onDoubleClick={startRenaming}>{list.title}</h3>
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
                onReorder={handleReorderTodos}
            />
        </div>
    );
}
