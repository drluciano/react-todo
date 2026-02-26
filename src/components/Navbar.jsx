import { Link, useNavigate } from "react-router";
import { ArrowBigLeft, LogOut } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

export default function Navbar() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const userName = currentUser ? `${currentUser}'s` : "The";
  const navigate = useNavigate();

  const logOutButton = () => {
    if (currentUser)
      return (
        <>
          <button
            onClick={() => {
              setCurrentUser(null);
              navigate("/");
            }}
            className={
              "bg-gray-100 hover:bg-green-900 hover:text-white border shadow-sm border-gray-400 px-4 items-center h-10.5 rounded-xl text-black hover:font-bold flex flex-row gap-2 transition-all ease-in-out cursor-pointer"
            }
          >
            <LogOut></LogOut> Log Out
          </button>
        </>
      );
  };

  return (
    <div
      className={
        "w-full text-black flex flex-row items-center px-4 border-b shadow-sm border-gray-300 bg-linear-to-t from-green-100 to-white h-22.5 fixed"
      }
    >
      <h1 className={"font-bold text-xl flex-1"}>{userName} To-Do List</h1>
      {logOutButton()}
    </div>
  );
}
