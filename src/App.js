import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import ListItem from './components/ListItem';

function App() {
  const apiUrl = 'https://61a2549d014e1900176de8fa.mockapi.io/';
  const notifications = {
    delete: 'Todo deleted successfully',
    create: 'Todo created successfully',
    update: 'Todo updated successfully',
  }
  const [todos, setTodos] = useState();
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [notification, setNotification] = useState();
  const handleChange = (event) => {
    setNewTodo(event.target.value);
  }

  const addTodo = () => {
    setTodos([...todos,
    {
      id: generateId(),
      name: newTodo
    }])
    setNewTodo('');
    alert(notifications.create);
  }

  const generateId = () => todos.length ? todos[todos.length - 1].id + 1 : 1;

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
    alert(notifications.delete)
  }

  const editTodo = (id) => {
    setEditId(id);
    setNewTodo(todos.find(todo => todo.id === id).name)
    setEditMode(true);
  }

  const updateTodo = () => {
    setTodos(todos.map(todo => todo.id === editId ? ({ ...todo, name: newTodo }) : todo))
    setNewTodo('');
    setEditId(null);
    setEditMode(false)
    alert(notifications.update)
  }

  const alert = (notification) => {
    setNotification(notification);
    setTimeout(() => setNotification(null), 3000);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">CRUD React</h1>
      </header>
      <div className="container">
        {notification &&
          <div className="alert mt-3 alert-success">
            <p className="text-center">{notification}</p>
          </div>
        }
        <input type="text"
          className="my-4 form-control"
          name="todo"
          placeholder="Add a new ToDo"
          value={newTodo}
          onChange={handleChange} />
        <button
          type="button"
          className="btn-primary btn mb-3 form-control"
          disabled={newTodo.length < 5}
          onClick={editMode ? updateTodo : addTodo}>
          {`${editMode ? 'Update' : 'Add'} todo`}
        </button>

        {!editMode && <ul className="list-group">
          {todos.map((todo) =>
            <ListItem
              key={todo.id}
              name={todo.name}
              deleteTodo={() => deleteTodo(todo.id)}
              editTodo={() => editTodo(todo.id)} />
          )}
        </ul>}
      </div>
    </div>
  );
}

export default App;
