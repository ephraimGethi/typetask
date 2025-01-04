import React from 'react'
import "./styles.css"
import { Todo } from '../model'
import SingleTodo from './SingleTodo';

interface Props{
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos:Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList:React.FC<Props> = ({todos,setTodos,completedTodos,setCompletedTodos}) => {
  return (
    <div className="container">
      <div className="todos">
        <span className="todos__heading">
          Undone Activities
        </span>
        {todos.map(todo=>(
          <SingleTodo todo={todo} key={todo.id} todos={todos} 
          setTodos={setTodos} completedTodos ={completedTodos}
           setCompletedTodos={setCompletedTodos}/>
        ))}
      </div>
      <div className="todos remove">
      <span className="todos__heading">
          Done Activities
        </span>
        {completedTodos.map(todo=>(
          <SingleTodo todo={todo} key={todo.id} todos={completedTodos} setTodos={setCompletedTodos}
          completedTodos ={completedTodos}
           setCompletedTodos={setCompletedTodos}/>
        ))}
      </div>
    </div>
  )
}

export default TodoList