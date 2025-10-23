import React, { createContext, useReducer } from 'react'
import { TodoItemsReducer } from './TodoItemsReducer';

export const ThemeContext=createContext();

export const TodoItemsProvider = ({children}) => {
const [currentItems,dispatch]=useReducer(TodoItemsReducer,[]);

const addTodoItem=(id,todoText,todoDate)=>{
 dispatch({
  type : 'ADD_ITEM',
  payload : {
  id,todoText,todoDate
}
 })


}

const addAllTodoItem=(currentItems)=>{
console.log("Loading all items : ");
 dispatch({
  type : 'LOAD_ALL',
  payload : {
allItems : currentItems
}
 })
 
}


const deleteTodoItem=(todoId)=>{
   dispatch({
  type : 'DELETE_ITEM',
  payload : {
  todoId
}
 })

}

  return (
  <ThemeContext.Provider value={{currentItems,addTodoItem,deleteTodoItem,addAllTodoItem}}>
    {children}
     </ThemeContext.Provider>
  )
}

