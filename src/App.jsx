
import './App.css'
import TodoManager from './components/TodoManager/TodoManager.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <TodoManager />
      </div>
    </DndProvider>
  );
}
export default App
