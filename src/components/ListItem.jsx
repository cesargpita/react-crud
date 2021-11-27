import React from 'react'

const ListItem = ({ name, editTodo, deleteTodo }) => {
  return (
    <li className="list-group-item">
      <button
        className="btn-sm ml-4 btn btn-info"
        onClick={editTodo}>U</button>
      {name}
      <button
        className="btn-sm ml-4 btn btn-danger"
        onClick={deleteTodo}>X</button>
    </li>
  )
}

export default ListItem
