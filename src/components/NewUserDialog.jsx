import { CirclePlus } from "lucide-react";
import { useState } from "react";

function NewUserDialog({ handleSubmit }) {
  const [inputText, setInputText] = useState("");
  const handleNewUser = (e) => {
    e.preventDefault();
    handleSubmit(inputText);
    e.currentTarget.previousElementSibling.value = "";
  };

  return (
    <>
      <div className={"flex flex-col gap-4 items-center"}>
        <h1 className={"text-3xl uppercase font-bold"}>New User</h1>
        <form
          className={"flex flex-col gap-2 items-center justify-center w-full"}
          onSubmit={handleNewUser}
        >
          <input
            type={"text"}
            name={"userName"}
            id={"userName"}
            placeholder={"Enter a name"}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            className={
              "bg-gray-50 rounded-md h-10.5 text-black border border-gray-300 w-full shadow-sm hover:scale-105 transition duration-300 ease-in-out px-3"
            }
          />
          <button
            type={"submit"}
            className={
              "flex flex-row gap-1 items-center h-10.5 bg-gray-50 border border-gray-300 rounded-md px-4 shadow-sm hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            }
          >
            <CirclePlus size={18} />
            Create User
          </button>
        </form>
      </div>
    </>
  );
}

export default NewUserDialog;
