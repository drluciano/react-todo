import { CirclePlus } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

export function ToDoForm({ onAdd }) {
  const { currentUser } = useContext(UserContext);

  const handleAddTodo = (event) => {
    event.preventDefault();
    const inputValue = event.target.elements.toDoInput.value;
    const toDoType = event.target.elements.toDoType.value;
    onAdd({
      type: toDoType,
      text: inputValue,
      isStruck: false,
      currentUser: currentUser,
      completedBy: null,
    });
    event.target.reset();
  };

  return (
    <>
      <form
        onSubmit={handleAddTodo}
        className={"flex flex-row gap-2 items-center justify-center w-full"}
      >
        <select
          id={"toDoType"}
          className={
            "flex flex-row gap-1 items-center h-10.5 bg-gray-50 border border-gray-300 rounded-md px-4 shadow-sm hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
          }
        >
          <option>Personal</option>
          <option>Household</option>
        </select>
        <input
          type={"text"}
          name={"toDoInput"}
          id={"toDoInput"}
          className={
            "bg-gray-50 rounded-md h-10.5 text-black border border-gray-300 w-full shadow-sm hover:scale-105 transition duration-300 ease-in-out"
          }
        />
        <button
          type={"submit"}
          className={
            "flex flex-row gap-1 items-center h-10.5 bg-gray-50 border border-gray-300 rounded-md px-4 shadow-sm hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
          }
        >
          <CirclePlus size={18} />
          <span>Add</span>
        </button>
      </form>
    </>
  );
}
