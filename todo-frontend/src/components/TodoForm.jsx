import { useState } from 'react'

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = () => {
    if (!title.trim()) return
    onAdd(title, priority)
    setTitle('')
    setPriority('medium')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div style={{ marginBottom: '24px' }}>

      <div className="todo-form">
        <input
          className="todo-input"
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn" onClick={handleSubmit}>
          + Add
        </button>
      </div>

      <div className="filter-bar">
        {['low', 'medium', 'high'].map(p => (
          <button
            key={p}
            className={`filter-btn ${priority === p ? 'active' : ''}`}
            onClick={() => setPriority(p)}
          >
            {p}
          </button>
        ))}
      </div>

    </div>
  )
}