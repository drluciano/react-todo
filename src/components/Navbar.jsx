import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { PageContext } from "../context/PageContext.jsx";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  const { page, setPage } = useContext(PageContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const userName = currentUser ? `${currentUser.name}'s` : "The";
  const navigate = useNavigate();

  return (
    <header className="w-full border-b bg-background fixed top-0 z-50">
      <div className="flex h-14 items-center justify-between px-6">
        <h1
          className="font-bold text-xl cursor-pointer"
          onClick={() => {
            if (!currentUser) return;
            navigate(`todos/${currentUser.name}`);
            setPage("todos");
          }}
        >
          {userName} To-Do List
        </h1>
        {currentUser && (
          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1">
              <Button
                variant={page === "todos" ? "default" : "ghost"}
                onClick={() => {
                  navigate(`todos/${currentUser.name}`);
                  setPage("todos");
                }}
              >
                Todos
              </Button>
              <Button
                variant={page === "archive" ? "default" : "ghost"}
                onClick={() => {
                  navigate("archive");
                  setPage("archive");
                }}
              >
                Archive
              </Button>
            </nav>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="outline"
              onClick={() => {
                setCurrentUser(null);
                setPage("todos");
                navigate("/");
              }}
            >
              <LogOut /> Log Out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
