import React, { Component } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './TodoListItem.css';

// Create a functional component for the draggable item
const DraggableTodoItem = ({ todo, index, onToggle, onDelete, moveTodo }) => {
    const ref = React.useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'TODO_ITEM',
        item: { id: todo.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, drop] = useDrop({
        accept: 'TODO_ITEM',
        hover: (draggedItem, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex = draggedItem.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveTodo(dragIndex, hoverIndex);
            draggedItem.index = hoverIndex;
        }
    });

    drag(drop(ref));

    return (
        <li
            ref={ref}
            className={`todo-item ${isDragging ? 'dragging' : ''}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {/* <div className="drag-handle">⋮⋮</div> */}
            <label className='todo-label'>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
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
    );
};

// Main TodoListItem class component
class TodoListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCompletedVisible: false
        };
    }
    render() {
        const { todos, onToggle, onDelete, onReorder } = this.props;
        const { isCompletedVisible } = this.state;
        if (!todos || todos.length === 0) {
            return null;
        }

        // Separate active and completed todos
        const activeTodos = todos.filter(todo => !todo.completed);
        const completedTodos = todos.filter(todo => todo.completed);

        return (
            <div className="card">
                <ul className="todo-list">
                    {/* Active todos */}
                    {activeTodos.map((todo, index) => (
                        <DraggableTodoItem
                            key={todo.id}
                            todo={todo}
                            index={index}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            moveTodo={onReorder}
                        />
                    ))}

                    {/* Completed todos section */}
                    {completedTodos.length > 0 && (
                        <div className="completed-section">
                            <button
                                className="completed-toggle"
                                onClick={() => this.setState(prev => ({
                                    isCompletedVisible: !prev.isCompletedVisible
                                }))}
                            >
                                <span className="toggle-icon">
                                    {isCompletedVisible ? '▼' : '▶'}
                                </span>
                                Completed ({completedTodos.length})
                            </button>

                            {isCompletedVisible && (
                                <ul className="completed-list">
                                    {completedTodos.map((todo, index) => (
                                        <DraggableTodoItem
                                            key={todo.id}
                                            todo={todo}
                                            index={activeTodos.length + index}
                                            onToggle={onToggle}
                                            onDelete={onDelete}
                                            moveTodo={onReorder}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </ul>
            </div>
        );
    }
}

export default TodoListItem;
