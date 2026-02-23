import { CirclePlus } from "lucide-react";

export function ToDoForm({ onAdd }) {
  const handleAddTodo = (event) => {
    event.preventDefault();
    const inputValue = event.target.elements.toDoInput.value;

    onAdd(inputValue);
    event.target.reset();
  };

  return (
    <>
      <form
        onSubmit={handleAddTodo}
        className={"flex flex-row gap-2 items-center justify-center w-full"}
      >
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
