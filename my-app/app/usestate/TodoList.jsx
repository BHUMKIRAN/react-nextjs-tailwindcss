import React, { useState } from 'react'

const TodoList = () => {

   const [todos , settodos] = useState([])
   const [input , setinput] = useState("")

   const addtodos = () =>{
    if(!input) return;
     settodos([...todos , {id:Date.now() , input}]);
     setinput("")
   }

   const deletetodo = (id) =>{
    settodos(todos.filter((items)=> items.id !== id))
   }
  return (
    <div>
       <h1>Todo list</h1>
       <input 
       type="text" 
       name="todos" 
       id="id"
       placeholder='Todos'
       value={input}
       onChange={(e)=>setinput(e.target.value)}
        />
       <button 
       type="button"
       onClick={addtodos}>AddTodo</button>
        <ul 
        >
            {todos.map(items => 
                <li 
                key={items.id}
                >
                    {items.input}
                <button 
                type="button"
                 onClick={()=>{deletetodo(items.id)}}
                 >
                    <span>Delete</span>
                </button>
                </li>
                
            )}
        </ul>
    </div>
  )
}

export default TodoList