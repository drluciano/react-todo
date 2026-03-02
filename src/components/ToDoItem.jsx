import { Trash2, UserRound, Users } from "lucide-react";

export function ToDoItem({ toDo, index, archiveTodo, handleStrike }) {
  const handleArchiveTodo = () => {
    archiveTodo(index);
  };

  const handleStriking = () => {
    handleStrike(index);
  };

  const checkUserIfHouseholdTodo = () => {
    if (toDo.type === "Household" && toDo.type !== "Personal") {
      return (
        <span className={"flex flex-row gap-2"}>
          <Users />
          {toDo.type} task created by: {toDo.currentUser}
        </span>
      );
    } else if (toDo.type === "Personal" && toDo.type !== "Household") {
      return (
        <span className={"flex flex-row gap-2"}>
          <UserRound />
          Personal
        </span>
      );
    }
  };

  return (
    <>
      <div className={"max-w-full flex flex-row gap-2"}>
        <button
          className={
            "px-2 py-2 align-top max-h-10.5 bg-gray-50 rounded-md text-left border border-gray-300 shadow-sm cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
          }
          onClick={handleArchiveTodo}
        >
          <Trash2 />
        </button>
        <div
          className={`toDoListItem px-2 py-2 wrap-normal flex flex-row justify-between w-full bg-gray-50 rounded-md text-left border border-gray-300 shadow-sm cursor-pointer hover:scale-105 transition duration-300 ease-in-out ${toDo.isStruck ? "line-through text-green-600 opacity-50" : "no-underline"}`}
          onClick={handleStriking}
        >
          <div>
            <span className={"font-bold"}>Entry #{index + 1}: </span>
            <span className={"toDoText"}>{toDo.text}</span>
          </div>
          <span className={"text-gray-400"}>{checkUserIfHouseholdTodo()}</span>
        </div>
      </div>
    </>
  );
}
