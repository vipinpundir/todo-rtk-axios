import { useState, FormEvent } from 'react';
import { useAddTodoMutation } from '../api/todoApi';

function AddTodoForm() {

    const [addTodo, {isLoading}] = useAddTodoMutation()
    const [text, setText] = useState('');
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.length >= 1) {
            addTodo({ "title": text, "completed": false });
            setText('');
        }
    };


    return (
        <div className="AddTodo">
            <form onSubmit={handleSubmit}>
                <input
                placeholder='Add todo...'
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" disabled={isLoading}>
                    Add Todo
                </button>
            </form>
        </div>

    );
}

export default AddTodoForm;
