import { useContext, useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import "../App.css";
import { ToDoForm } from "./ToDoForm.jsx";
import { ToDoList } from "./ToDoList.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { useParams } from "react-router";

function UserToDoList() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [todos, setTodos] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    if (!currentUser) return;

    const userTodos =
      JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) ?? [];
    const householdTodos =
      JSON.parse(localStorage.getItem(`tasks_household`)) ?? [];
    const allTodos = [...userTodos, ...householdTodos];
    setTodos(allTodos ? allTodos : []);
  }, [currentUser]);

  const handleAddTodo = ({
    type,
    text,
    isStruck,
    currentUser,
    completedBy,
  }) => {
    const currentTodos = [
      ...todos,
      { type, text, isStruck, currentUser, completedBy },
    ];
    setTodos(currentTodos);

    localStorage.setItem(
      `tasks_household`,
      JSON.stringify(currentTodos.filter((t) => t.type === "Household")),
    );
    localStorage.setItem(
      `tasks_${currentUser}`,
      JSON.stringify(currentTodos.filter((t) => t.type === "Personal")),
    );
  };

  const handleArchiveTodo = (index) => {
    const currentTodos = [...todos];
    currentTodos.splice(index, 1);

    setTodos(currentTodos);
    localStorage.setItem(
      `tasks_household`,
      JSON.stringify(currentTodos.filter((t) => t.type === "Household")),
    );
    localStorage.setItem(
      `tasks_${currentUser}`,
      JSON.stringify(currentTodos.filter((t) => t.type === "Personal")),
    );
  };

  const handleStriking = (index) => {
    const currentTodos = [...todos];
    const updatedTodos = currentTodos.map((todo, i) =>
      i === index ? { ...todo, isStruck: !todo.isStruck } : todo,
    );
    setTodos(updatedTodos);
    localStorage.setItem(
      `tasks_household`,
      JSON.stringify(updatedTodos.filter((t) => t.type === "Household")),
    );
    localStorage.setItem(
      `tasks_${currentUser}`,
      JSON.stringify(updatedTodos.filter((t) => t.type === "Personal")),
    );
  };

  if (!todos || !currentUser)
    return <div>Could not load todos, or no user was selected.</div>;

  return (
    <div className={"flex flex-col gap-4 w-150 md:w-190 lg:w-250"}>
      <div className={"flex flex-col gap-4"}>
        <div className={"flex flex-col gap-3 text-center"}>
          <CircleCheckBig size={64} color={"green"} className={"self-center"} />
          <h1 className={"font-black uppercase text-3xl"}>
            {currentUser}'s To-Do List
          </h1>
          <p>For the Chronically Lazy.</p>
        </div>
        <ToDoForm onAdd={handleAddTodo}></ToDoForm>
        <hr className={"text-gray-200"} />
        <ToDoList
          items={todos}
          archiveTodo={handleArchiveTodo}
          handleStrike={handleStriking}
        ></ToDoList>
      </div>
    </div>
  );
}

export default UserToDoList;
