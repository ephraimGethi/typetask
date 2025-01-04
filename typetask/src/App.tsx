import React, { useEffect, useState } from 'react'
import './App.css'
import InputField from './components/InputField';
import { Todo } from './model';
import TodoList from './components/TodoList';
import {DragDropContext} from "react-beautiful-dnd"

let name:string;
let age:number | string;
let isStudent:boolean;
let hobbies:string[];
//this one is a tuple
let role:[number,string];
let lastName:unknown;

// let printName:(name:string)=>void;

// printName = (name: string) => {
//   console.log(`Hello, ${name}!`);
// };

// // Call the function
// printName("Alice");


// function printName(name:string="ephraim",age:number){
//   console.log(name,age)
// }
//  printName("eph",24)
// type Person = {
//   name:string;
//   age:number;
// }
// let person:Person = {
//   name:"ephraim",
//   age:24
// }

// let alotofpeople:Person[];
// type X ={
//   a:string;
// }
// type Y = X & {
//   b:number;
// }

// let y:Y ={
//   a:"Ephraim",
//   b:24
// }

const App:React.FC = ()=> {
  const[todo,setTodo] = useState<string>("")
  const[todos,setTodos] = useState<Todo[]>([])
  const[completedTodos,setCompletedTodos] = useState<Todo[]>([])

 
  const handleAdd = (e:React.FormEvent)=>{
    e.preventDefault()

    if(todo){
      setTodos([...todos,{id:Date.now(),todo:todo,isDone:false}])
      setTodo("")
    }
  }
  console.log(todos)
   return (
       <div className="App">
      <span className="heading">Task App</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd = {handleAdd}/>
      <TodoList todos = {todos} setTodos = {setTodos} completedTodos = {completedTodos} setCompletedTodos = {setCompletedTodos}/>
      {/* {todos.map((t)=>(
        <li>{t.todo}</li>
      ))} */}
    </div>
  )
}

export default App
