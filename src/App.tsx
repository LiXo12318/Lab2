import { useState } from 'react'
import './App.css'

interface ToDo {
  id: number
  title: string
}

function App() {
  const [toDo, setToDo] = useState<ToDo[]>([])
  const [title, setTitle] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      const newToDo: ToDo = {
        id: Date.now(),
        title,
      }
      setToDo([...toDo, newToDo])
      setTitle('')
    }
  }

  const handleDelete = (id: number) => {
    setToDo(toDo.filter((item) => item.id !== id))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }


  const filteredToDo = toDo.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Add a new task"
          className="input-field"
        />
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>

      <input
        type="text"
        value={searchValue}
        onChange={handleSearchValueChange}
        placeholder="Search tasks"
        className="input-field search-field"
      />

      <ul className="todo-list">
        {filteredToDo.map((item) => (
          <li key={item.id} className="todo-item">
            <span>{item.title}</span>
            <button
              onClick={() => handleDelete(item.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
