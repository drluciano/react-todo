import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ToDoForm({ onAdd }) {
  const { currentUser } = useContext(UserContext);
  const [todoText, setTodoText] = useState("");
  const [todoType, setTodoType] = useState("Personal");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!todoText.trim()) return;
    onAdd({
      type: todoType,
      text: todoText,
      isStruck: false,
      currentUser,
      completedBy: null,
    });
    setTodoText("");
    setTodoType("Personal");
  };

  return (
    <form onSubmit={handleAddTodo} className="flex flex-row gap-2 items-center">
      <Select value={todoType} onValueChange={setTodoType}>
        <SelectTrigger className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Personal">Personal</SelectItem>
          <SelectItem value="Household">Household</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="text"
        placeholder="Add a todo..."
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">
        <CirclePlus /> Add
      </Button>
    </form>
  );
}
