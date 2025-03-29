import { useState, useEffect } from 'react'
import './App.css'

import TodoForm from './components/TodoForm/TodoForm.jsx';
import TodoList from './components/TodoListItem/TodoListItem.jsx';
import TodoManager from './components/TodoManager/TodoManager.jsx';

// function App() {
//   // const [todos, setTodos] = useState(() => {
//   //   const savedTodos = localStorage.getItem('todos');
//   //   return savedTodos ? JSON.parse(savedTodos) : [];
//   // });

//   // useEffect(() => {
//   //   console.log('Todos updated: ', todos);
//   //   localStorage.setItem('todos', JSON.stringify(todos));
//   // }, [todos]);

//   // const addTodo = (todoData) => {
//   //   const newTodo = {
//   //     id: Date.now(),
//   //     ...todoData,
//   //     completed: false,
//   //     createdAt: new Date()
//   //   };
//   //   setTodos(prevTodos => [...prevTodos, newTodo]);
//   // }
//   // const toggleTodo = (id) => {
//   //   setTodos(prevTodos =>
//   //     prevTodos.map(todo =>
//   //       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//   //     )
//   //   );
//   // };

//   // const deleteTodo = (id) => {
//   //   console.log("I am inside onDelete");
//   //   setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
//   // };
//   return (
//     <div className='app-container'>
//       <h1 className='app-title'>To Do....</h1>
//       {/* <div className='content-wrapper'>
//         <TodoForm onAddTodo={addTodo} />
//         <TodoList
//           todos={todos}
//           onToggle={toggleTodo}
//           onDelete={deleteTodo}
//         />


//       </div> */}


//     </div>
//   )
// }
function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Todo Lists</h1>
      <TodoManager />
    </div>
  );
}
export default App
