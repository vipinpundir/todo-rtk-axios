import { useGetTodosQuery } from "../api/todoApi"
import TodoItem from "./TodoItem";
import { Todo } from "../types";


const TodoList = () => {

    const {data: todos, isLoading} = useGetTodosQuery('')

    return (
      <div className="todo-list">
       {isLoading
       ? <p>Loading...</p>
      :<>
       {todos?.length === 0 
          ? <p>No todo...</p>
          : <>  {todos?.map((todo: Todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))} </>}
      </>}
      </div>);
  };
export default TodoList