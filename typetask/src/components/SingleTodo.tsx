import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import "./styles.css"
import { Input } from 'reactstrap';



interface Props{
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todo:Todo;
  todos:Todo[];
  setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo:React.FC<Props> = ({todo,todos,setTodos,completedTodos,setCompletedTodos}) => {

  const[edit,setEdit] = useState<boolean>(false)
  const[editTodo,setEditTodo] = useState<string>(todo.todo)
  const handleDone = (id:number)=>{
    setTodos(todos.map((todo)=>
      todo.id===id?{...todo,isDone:!todo.isDone}:todo))
    todos.map((todo)=>{
       if (todo.isDone===true){
        setCompletedTodos((completed=>[...completed,todo]))
        console.log("These are the completed tasks",completedTodos)
        setTodos(todos.filter((todo)=>todo.id !== id));
      }
    }
      )
  
    
  }
  const handleDelete = (id:number)=>{
    setTodos(todos.filter((todo)=>todo.id !== id));
  }

  const handleEdit = (e:React.FormEvent,id:number)=>{
    e.preventDefault()
    setTodos(
      todos.map((todo)=>(
        todo.id===id?{...todo,todo:editTodo}:todo
      ))
    )
    setEdit(false)
  }
  useEffect(()=>{
    inputRef.current?.focus()
  },[edit])
  const inputRef = useRef<HTMLInputElement>(null)
  return (
   <form className='todos__single' onSubmit={(e)=>{handleEdit(e,todo.id)}}>
   {edit?(<input ref={inputRef} type='text' value={editTodo} onChange={(e)=>{setEditTodo(e.target.value)}} className='todos__single--text'/>):( 
    todo.isDone?
    <s className='todos__single--text'>{todo.todo}</s>:
    <span className='todos__single--text'>{todo.todo}</span>
  )}      
      <div>
        <span className="icon" 
        onClick={()=>{
          if(!edit&&!todo.isDone){
            setEdit(!edit)
          }
        }}>
          <AiFillEdit/>
        </span>
        <span className="icon" onClick={()=>handleDelete(todo.id)}>
          <AiFillDelete/>
        </span>
        <span className="icon" onClick={()=>handleDone(todo.id)}>
          <MdDone/>
        </span>
      </div>
   </form>
  )
}

export default SingleTodo