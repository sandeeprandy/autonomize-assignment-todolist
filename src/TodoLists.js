// TodoList.js
import React, { useState } from 'react';
import './Todolist.css'; 

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const matches = newTodo.match(/(.+?)\s*(\d+)?$/); 
      const taskName = matches[1].trim();
      const taskQuantity = parseInt(matches[2], 10) || 1;

      const newId = Date.now(); //

    
      const newTodos = Array.from({ length: taskQuantity }, (_, index) => ({
        id: newId + index, 
        text: taskName,
        completed: false,
        createdAt: new Date().toLocaleString(),
      }));

      setTodos([...todos, ...newTodos]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Day Goals!</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text} - Created at: {todo.createdAt}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter task name and quantity (e.g., Write code 3)"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default TodoList;
