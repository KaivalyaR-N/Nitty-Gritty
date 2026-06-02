import { useState } from 'react'
import { useTodos } from './hooks/useTodos'
import TodoForm from './components/TodoForm'
import FilterBar from './components/FilterBar'
import TodoItem from './components/TodoItem'
import './App.css'

export default function App() {
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos()
  const [filter, setFilter] = useState('all')

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter(t => t.completed).length

  if (loading) {
    return (
      <div className="app-container">
        <div className="empty-state">
          <h3>Loading...</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">

      <div className="app-header">
        <h1 className="app-title">
         NITTY <span>GRITTY</span>
        </h1>
        <p className="app-subtitle">Load Up. Load Inn.</p>
      </div>

      <TodoForm onAdd={addTodo} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        total={todos.length}
        completed={completedCount}
      />

      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks here!</h3>
            <p>Add something above to get started.</p>
          </div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>

    </div>
  )
}