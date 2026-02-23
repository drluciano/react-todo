import { User } from "lucide-react";

function UserCard({ name, logIn }) {
  const userName = !name ? "User" : name;

  return (
    <>
      <div
        onClick={() => logIn(userName)}
        className={
          "bg-gray-50 flex flex-col gap-4 text-center justify-center items-center p-4 w-50 h-50 border border-gray-300 shadow-sm rounded-lg hover:scale-110 hover:rounded-[100px] transition-[scale,border-radius] ease-in-out cursor-pointer hover:shadow-xl hover:shadow-emerald-200"
        }
      >
        <div
          className={`w-24 h-24 bg-emerald-400 rounded-full flex items-center justify-center`}
        >
          <User />
        </div>
        <h1 className={"w-auto text-xl uppercase"}>{userName}</h1>
      </div>
    </>
  );
}
export default UserCard;
