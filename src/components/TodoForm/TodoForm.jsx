import React, { Component } from 'react';
import './TodoForm.css';

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoText: ''
        };
    }

    handleInputChange = (e) => {
        this.setState({
            todoText: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { todoText } = this.state;
        const { onAddTodo } = this.props;

        if (!todoText.trim()) return;

        onAddTodo({ todoText: todoText });
        console.log("You submitted one TODO", todoText);

        this.setState({
            todoText: ''
        });
    }

    render() {
        const { todoText } = this.state;

        return (

            <form onSubmit={this.handleSubmit} className='todo-form'>
                <input
                    type='text'
                    value={todoText}
                    onChange={this.handleInputChange}
                    placeholder='Add a new item...'
                    aria-label='New todo item'
                    className='todo-input'
                />
                <button type='submit' className='todo-button'>
                    Add
                </button>
            </form>
        )
    }
}

export default TodoForm;
