import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import InputField from './components/InputField';
import { Todo } from './model';
import TodoList from './components/TodoList';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

// let name:string;
// let age:number | string;
// let isStudent:boolean;
// let hobbies:string[];
// //this one is a tuple
// let role:[number,string];
// let lastName:unknown;

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

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  const [image, setImage] = useState<File | null>()
  const [images, setImages] = useState<File[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
      setTodo("")
    }
  }
  console.log(todos)

  const printref = useRef<HTMLDivElement>(null)

  const handleDownloadPdf = async () => {
    const element = printref.current;
    console.log(element)
    if (!element) {
      return;
    }
    const canvas = await html2canvas(element)
    const data = canvas.toDataURL("image/png")

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'a4'
    });
    pdf.addImage(data, "PNG", 0, 0, 460, 400)
    pdf.save("example.pdf");
  }
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages(fileArray);
      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setImageURLs(urls);
    }
  };

  useEffect(() => {
    return () => {
      imageURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageURLs]);

  return (
    <div className="App" >
      <span className="heading">Task App</span>
      <button className='btn' onClick={() => { handleDownloadPdf() }}>Download Pdf</button>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

      <input
        type="file"
        name="images"
        multiple
        onChange={handleImageChange}
      />
      <div>
        {imageURLs.map((url, index) => (
          <img key={index} src={url} alt={`Preview ${index}`} width={100} height={100} />
        ))}
      </div>
      <div className='large' ref={printref}>
        <div>
          <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
        </div>
      </div>
      {/* {todos.map((t)=>(
        <li>{t.todo}</li>
      ))} */}
    </div>
  )
}

export default App
