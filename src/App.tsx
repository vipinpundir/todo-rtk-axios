
import { useEffect } from 'react';
import './App.css'
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

function App() {

  useEffect(() => {
    fetch('http://localhost:3000/login')
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem('token', data.token); 
    })
  }, [])


  return (
    <div className="todo-app">
      <h1>Todo App with RTK Query</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
};
export default App
