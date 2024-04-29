
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../api/todoApi";
import { Todo } from "../types";


interface TodoItemProps {
    todo: Todo;
}


const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {

    const [deleteTodo] = useDeleteTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();

    const handleCheckboxChange = () => {
        updateTodo({ id: todo._id, updatedData: { completed: !todo.completed, title: todo.title } });
    }

    const handleDelete = () => {
        deleteTodo(todo._id);
    }
    return (
        <div className="todo-item">
            <input type="checkbox" checked={todo.completed} onChange={handleCheckboxChange} />
            <span className="title">{todo.title}</span>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default TodoItem;
