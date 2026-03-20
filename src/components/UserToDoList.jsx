import { useContext, useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { ToDoForm } from "./ToDoForm.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { Separator } from "@/components/ui/separator";
import { getTasks } from "@/api/api.js";
import { ToDoItem } from "@/components/ToDoItem.jsx";

function UserToDoList() {
  const { currentUser } = useContext(UserContext);
  const [todo, setTodo] = useState([]);

  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    if (!currentUser) return;
    getTasks(currentUser.id).then(setTodo);
  }, [currentUser, refreshCount]);

  if (!todo || !currentUser) {
    return (
      <p className="text-muted-foreground">
        Could not load todos, or no user was selected.
      </p>
    );
  } else {
    return (
      <div className="flex flex-col gap-4 w-full max-w-2xl">
        <div className="flex flex-col gap-2 text-center">
          <CircleCheckBig size={48} className="self-center text-primary" />
          <h1 className="font-black uppercase text-3xl">
            {currentUser.name}'s To-Do List
          </h1>
          <p className="text-muted-foreground">For the Chronically Lazy.</p>
        </div>
        <ToDoForm onTaskAdded={() => setRefreshCount((c) => c + 1)} />
        <Separator />
        <div className={"flex flex-col gap-2"}>
          {todo.map((task, index) => (
            <ToDoItem key={index} task={task} index={index}></ToDoItem>
          ))}
        </div>
      </div>
    );
  }
}

export default UserToDoList;
