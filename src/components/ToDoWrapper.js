import React, { useState } from 'react'
import { ToDoForm } from './ToDoForm'
import { ToDo } from './ToDo';
import {v4 as uuidv4} from 'uuid';
import { EditToDoForm } from './EditToDoForm';
uuidv4();

export const ToDoWrapper = () => {

    const [todos, setTodos] = useState([]);
    const [currentDate, setCurrentDate] = useState(getDate());

    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${date}/${month}/${year}`;
      }

    const addTodo = todo => {
        setTodos([...todos, 
            {id: uuidv4(), task:todo, completed:false, isEditing:false}
        ])
    }

    const toggleComplete = id => {
        setTodos(todos.map( todo => todo.id === id ?
            {...todo, completed: !todo.completed} : todo
        ))
    }

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id ))
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, isEditing: !todo.editing} : todo ))
    }

    const editTask = (task,id) => {
        setTodos(todos.map(todo => todo.id === id ? 
        {...todo, task, isEditing : !todo.isEditing} : todo))
    }


  return (
    <div className='TodoWrapper'>
        <div className='date'>Today's Date : {currentDate}</div>
        <h1>Get Things Done !!!</h1>
        <ToDoForm addTodo={addTodo}/>
        {todos.map((todo, index)=>(
            todo.isEditing ? (
                <EditToDoForm editTodo={editTask} 
                task={todo}/>
            ):(
            <ToDo task={todo} key={index}
            toggleComplete={toggleComplete}
            deleteTodo = {deleteTodo}
            editTodo={editTodo}/>
            )
        ))}
        
    </div>
  )
}
