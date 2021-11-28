import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import ListItem from './components/ListItem';
import axios from 'axios';
import loadingGif from './loading.gif';

function App() {
  const apiUrl = 'https://61a2549d014e1900176de8fa.mockapi.io';
  const notifications = {
    delete: 'Todo deleted successfully',
    create: 'Todo created successfully',
    update: 'Todo updated successfully',
  }

  const fetchData = async () => {
    const response = await axios.get(`${apiUrl}/todos`);
    setTodos(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    return () => {
    };
  }, []);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [notification, setNotification] = useState();
  const [loading, setLoading] = useState(true)
  const handleChange = (event) => {
    setNewTodo(event.target.value);
  }

  const addTodo = async () => {
    const response = await axios.post(`${apiUrl}/todos`, {
      name: newTodo
    });
    setTodos([...todos, response.data])
    setNewTodo('');
    alert(notifications.create);
  }

  const deleteTodo = async (id) => {
    const response = await axios.delete(`${apiUrl}/todos/${id}`);
    console.log(response)
    setTodos(todos.filter(todo => todo.id !== id))
    alert(notifications.delete)
  }

  const editTodo = (id) => {
    setEditId(id);
    setNewTodo(todos.find(todo => todo.id === id).name)
    setEditMode(true);
  }

  const updateTodo = async () => {
    const response = await axios.put(`${apiUrl}/todos/${editId}`, {
      name: newTodo
    });
    setTodos(todos.map(todo => todo.id === editId ? response.data : todo))
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

        {loading &&
          <img src={loadingGif} alt="loading" />
        }

        {(!editMode || loading) && <ul className="list-group">
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
