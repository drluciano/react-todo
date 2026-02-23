import { Trash2 } from "lucide-react";
import { useState } from "react";

export function ToDoItem({ toDo, index, archiveTodo }) {
  const handleArchiveTodo = () => {
    archiveTodo(index);
  };
  const retrievedStruckState = localStorage.getItem(toDo);
  const [isStruck, setIsStruck] = useState(JSON.parse(retrievedStruckState));

  const handleClick = () => {
    setIsStruck(!isStruck);
    localStorage.setItem(toDo, !isStruck);
  };

  return (
    <>
      <div className={"max-w-125 flex flex-row gap-2"}>
        <button
          className={
            "px-2 py-2 align-top max-h-10.5 bg-gray-50 rounded-md text-left border border-gray-300 shadow-sm cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
          }
          onClick={handleArchiveTodo}
        >
          <Trash2 />
        </button>
        <p
          className={`toDoListItem px-2 py-2 wrap-normal bg-gray-50 rounded-md text-left border border-gray-300 shadow-sm cursor-pointer hover:scale-105 transition duration-300 ease-in-out ${isStruck ? "line-through text-green-600 opacity-50" : "no-underline"}`}
          onClick={handleClick}
        >
          <span className={"font-bold"}>Entry #{index + 1}: </span>
          <span className={"toDoText"}>{toDo}</span>
        </p>
      </div>
    </>
  );
}
