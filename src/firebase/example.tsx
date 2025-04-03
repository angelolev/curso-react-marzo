import { useState, useEffect } from "react";
import {
  addDocument,
  getCollection,
  updateDocument,
  deleteDocument,
} from "./firestore";

// Example Todo type
interface Todo {
  id?: string;
  title: string;
  completed: boolean;
  userId: string;
}

export function TodoList() {
  const [todos, setTodos] = useState<(Todo & { id: string })[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await getCollection<Todo>("todos");
        setTodos(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching todos:", err);
        setError("Failed to load todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Add a new todo
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTodo.trim()) return;

    try {
      const todoData: Todo = {
        title: newTodo,
        completed: false,
        userId: "user123", // In a real app, this would be the authenticated user's ID
      };

      const addedTodo = await addDocument<Todo>("todos", todoData);
      setTodos([...todos, addedTodo as Todo & { id: string }]);
      setNewTodo("");
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Failed to add todo");
    }
  };

  // Toggle todo completion status
  const toggleTodoStatus = async (todo: Todo & { id: string }) => {
    try {
      await updateDocument<Todo>("todos", todo.id, {
        completed: !todo.completed,
      });

      setTodos(
        todos.map((t) =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err) {
      console.error("Error updating todo:", err);
      setError("Failed to update todo");
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteDocument("todos", id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("Failed to delete todo");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="todo-list">
      <h2>Todo List</h2>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodoStatus(todo)}
            />
            <span>{todo.title}</span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p>No todos yet! Add one above.</p>}
    </div>
  );
}
