import React, { useContext, useState } from 'react'
import Button from './Button'

import TodoItems from './TodoItems';
import { useRef } from 'react';
import { ThemeContext } from '../store/TodoItemsProvider';
import {todoItemClientModel} from '../utils/ModelUtil';

const AddTodo = () => { 
  const {addTodoItem}=useContext(ThemeContext);
const toDoText=useRef();
const toDoDate=useRef();
    const addhandler = () => {
    const todoText=toDoText.current.value;
    const todoDate=toDoDate.current.value;
console.log(todoDate,todoText);
  toDoText.current.value='';
  toDoDate.current.value='';

    fetch("https://todoapp-hy56.onrender.com/todos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task: todoText,
        date: todoDate
      })
    }).then(res => res.json())
    .then(serverItem => {
      const {id, todoText, todoDate} = todoItemClientModel(serverItem);
      console.log("trying to add item with id ",id,typeof(id));
      addTodoItem(id, todoText, todoDate);
    })
  }

  return (
    <>
    <div className="container text-center">
  <div className="row kg-row align-items-center">
    <div className="col-5">
    <input 
    className="form-control border border-black rounded" type="text" placeholder="Enter your task"  ref={toDoText}/>
    </div>
    <div className="col-4">
    <input type="date" ref ={toDoDate}/>
    </div>
    <div className="col-2">
  <Button btnType='success' btnText='Add' handler={addhandler}></Button>
    </div>
  </div>
  
  
  </div>

  </>
  )
}

export default AddTodo