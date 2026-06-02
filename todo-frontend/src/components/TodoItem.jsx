import { useState } from 'react'
import confetti from 'canvas-confetti'

export default function TodoItem({ todo, onToggle, onDelete }) {
  const [removing, setRemoving] = useState(false)

  const handleToggle = () => {
    if (!todo.completed) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ffd60a', '#000000', '#ff3f3f', '#06d6a0'],
        shapes: ['square'],
        scalar: 0.8
      })
    }
    onToggle(todo.id, todo.completed)
  }

  const handleDelete = () => {
    setRemoving(true)
    setTimeout(() => onDelete(todo.id), 250)
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${removing ? 'removing' : ''}`}>

      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />

      <span className="todo-title">{todo.title}</span>

      <span className={`priority-tag priority-${todo.priority}`}>
        {todo.priority}
      </span>

      <button
        className="btn btn-danger btn-small"
        onClick={handleDelete}
      >
        ✕
      </button>

    </div>
  )
}