import { useState } from "react";
import styles from "./App.module.css";
import { Form } from "./components/Form/Form";
import { TodoItem } from "./components/TodoItem/TodoItem";
import { getSubheading } from "./utils/getSubheading";



function App() {
  const [isFormShown, setIsFormShown] = useState(false)
  const [todos, setTodos] = useState([
    {name: "Nie dać się zwariować", done: true, id:1}, 
    
  ])



  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Do zrobienia</h1>
          <h2>{getSubheading(todos.length)}</h2>
        </div>
        {!isFormShown && <button className={styles.button} onClick={() => {setIsFormShown(true)}}>+</button>}
      </header>
      {isFormShown && <Form onFormSubmit={(newTodoName) => {setTodos((prevTodos) => [...prevTodos, {
        name: newTodoName,
         done: false,
          id: prevTodos.length > 0 ? prevTodos.at(-1).id + 1 : 0},
      ]);
      setIsFormShown(false)
      }}/>}
      <ul>
        {todos.map(({id, name, done}) => (<TodoItem key={id} name= {name} done= {done} onDeleteButtonClick={() => {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
        }}
        onDoneButtonClick={() => {
          setTodos((prevTodos) => prevTodos.map((todo) => {
            if (todo.id !== id){
              return todo
            }
            return{
              ...todo,
              done: true,
            }
          }))
        }}
        />))}
        
        
      </ul>
    </div>
  );
}

export default App;
