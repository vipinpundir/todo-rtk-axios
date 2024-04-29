
import { useEffect } from 'react';
import './App.css'
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import axiosInstance from 'axios'
import axios from 'axios';

function App() {

  const refreshToken = (): Promise<string> => {
    return fetch('http://localhost:3000/refresh/token',{
      credentials: 'include', 
    })
      .then((res) => res.json())
      .then((data) => {
        return data.token;
      });
  };


  axiosInstance.interceptors.response.use(response => response,
    async error => {
      if (error.response.status === 401) {
        const newToken = await refreshToken();
        localStorage.setItem('token', newToken);
        // Retry the original request
        return axios(error.config);
      }
      return Promise.reject(error);
    }
  );


  useEffect(() => {
    fetch('http://localhost:3000/login',{
      credentials: 'include', 
    })
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
