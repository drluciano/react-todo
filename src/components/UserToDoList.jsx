import { useState } from "react";
import { CircleCheckBig } from "lucide-react";
import "../App.css";
import { ToDoForm } from "./ToDoForm.jsx";
import { ToDoList } from "./ToDoList.jsx";

function UserToDoList({ user }) {
  const currentTodos = JSON.parse(localStorage.getItem("task"));
  const [todos, setTodos] = useState(currentTodos ? currentTodos : []);

  const handleAddTodo = (toDoText) => {
    const currentTodos = [...todos, toDoText];
    setTodos(currentTodos);
    localStorage.setItem("task", JSON.stringify(currentTodos));
  };

  const handleArchiveTodo = (index) => {
    const todosCopy = [...todos];
    todosCopy.splice(index, 1);
    // console.log(todosCopy);
    setTodos(todosCopy);
    localStorage.setItem("task", JSON.stringify(todosCopy));
  };

  return (
    <>
      <div className={"flex flex-col gap-4"}>
        <div className={"flex flex-col gap-3 text-center"}>
          <CircleCheckBig size={64} color={"green"} className={"self-center"} />
          <h1 className={"font-black uppercase text-3xl"}>
            Dylan's To-Do List
          </h1>
          <p className={""}>For the Chronically Lazy.</p>
        </div>
        <ToDoForm onAdd={handleAddTodo}></ToDoForm>
        <hr className={"text-gray-200"} />
        <ToDoList items={todos} archiveTodo={handleArchiveTodo}></ToDoList>
      </div>
    </>
  );
}

export default UserToDoList;
