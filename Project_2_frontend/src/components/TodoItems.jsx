import React, { useContext } from 'react'
import TodoItem from './TodoItem'
import { ThemeContext } from '../store/TodoItemsProvider';
const TodoItems = () => {
  const {currentItems}=useContext(ThemeContext);
  return (
    <>
      {currentItems.map(item => (
        <TodoItem
          key={item.id}
          id={item.id}
          toDoText={item.todoText}
          toDoDate={item.todoDate}
          completed={item.completed}
        />
      ))}
    </>
  )
}

export default TodoItems