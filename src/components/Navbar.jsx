import { Link, useNavigate } from "react-router";
import { ArrowBigLeft, LogOut } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { PageContext } from "../context/PageContext.jsx";

export default function Navbar() {
  const { page, setPage } = useContext(PageContext);
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
              setPage("todos");
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

  const navLinks = () => {
    if (currentUser)
      return (
        <>
          <div className={"flex flex-row gap-2"}>
            <p
              onClick={() => {
                navigate("todos/:userId");
                setPage("todos");
              }}
              className={`hover:scale-110 transition-all ease-in-out cursor-pointer ${page === "todos" ? "font-bold" : page === "archive" ? "font-normal" : "font-normal"}`}
            >
              Todos
            </p>
            <p
              onClick={() => {
                navigate("archive");
                setPage("archive");
              }}
              className={`hover:scale-110 transition-all ease-in-out cursor-pointer ${page === "archive" ? "font-bold" : page === "todos" ? "font-normal" : "font-normal"}`}
            >
              Archive
            </p>
          </div>
        </>
      );
  };

  return (
    <div
      className={
        "w-full text-black flex flex-row justify-between items-center px-4 border-b shadow-sm border-gray-300 bg-linear-to-t from-green-100 to-white h-22.5 fixed"
      }
    >
      <h1
        className={
          "font-bold text-xl hover:scale-110 cursor-pointer transition-all ease-in-out"
        }
        onClick={() => {
          navigate("/");
          setCurrentUser(null);
          setPage("todos");
        }}
      >
        {userName} To-Do List
      </h1>
      {navLinks()}
      {logOutButton()}
    </div>
  );
}
