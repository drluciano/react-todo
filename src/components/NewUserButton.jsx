import { CirclePlus, User2Icon, UserPlus } from "lucide-react";

function NewUserButton({ toggleNewUserDialog }) {
  return (
    <>
      <button
        onClick={toggleNewUserDialog}
        className={
          "bg-gray-50 flex flex-col gap-4 text-center justify-center items-center p-4 w-50 h-50 border border-gray-300 shadow-sm rounded-lg hover:scale-110 hover:rounded-[100px] transition-[scale,border-radius] ease-in-out cursor-pointer hover:shadow-xl hover:shadow-emerald-200"
        }
      >
        <UserPlus size={48} />
        <h1 className={"w-auto text-xl uppercase"}>Create User</h1>
      </button>
    </>
  );
}
export default NewUserButton;
