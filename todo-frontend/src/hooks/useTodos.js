import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://127.0.0.1:8000/api/todos/'

export function useTodos() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API)
      setTodos(res.data)
    } catch (err) {
      console.error('Error fetching todos:', err)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (title, priority = 'medium') => {
    try {
      const res = await axios.post(API, { title, priority, completed: false })
      setTodos(prev => [res.data, ...prev])
    } catch (err) {
      console.error('Error adding todo:', err)
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.patch(`${API}${id}/`, { completed: !completed })
      setTodos(prev => prev.map(t => t.id === id ? res.data : t))
    } catch (err) {
      console.error('Error toggling todo:', err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}${id}/`)
      setTodos(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      console.error('Error deleting todo:', err)
    }
  }

  return { todos, loading, addTodo, toggleTodo, deleteTodo }
}