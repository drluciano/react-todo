import { useState, useContext, useEffect } from "react";
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
import { getSubtypes, getTypes, newTask } from "@/api/api.js";
import { toast } from "sonner";

export function ToDoForm({ onTaskAdded }) {
  const { currentUser } = useContext(UserContext);
  const [taskText, setTaskText] = useState("");

  const [todoTypes, setTodoTypes] = useState(null);
  const [todoSubtypes, setTodoSubtypes] = useState(null);

  const [selectedType, setSelectedType] = useState(null);
  const [selectedSubtype, setSelectedSubtype] = useState(null);

  useEffect(() => {
    const getTypesSubtypes = async () => {
      if (!currentUser) return;
      getTypes().then((data) => {
        setTodoTypes(data);
        setSelectedType(data[0].name); // set default to first item's name
      });
      getSubtypes().then((data) => {
        setTodoSubtypes(data);
        setSelectedSubtype(data[0].name);
      });
    };
    getTypesSubtypes();
  }, [currentUser]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const type = todoTypes.find((t) => t.name === selectedType);
    const subtype = todoSubtypes.find((s) => s.name === selectedSubtype);

    await newTask(
      taskText,
      currentUser.id,
      type.id,
      subtype.id,
      false,
      null,
      null,
      false,
    );
    setTaskText("");
    onTaskAdded();
  };

  if (todoTypes && todoSubtypes)
    return (
      <form
        onSubmit={handleAddTodo}
        className="flex flex-row gap-2 items-center"
      >
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {todoTypes.map((type, index) => (
              <SelectItem value={type.name} key={index}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedSubtype} onValueChange={setSelectedSubtype}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {todoSubtypes.map((subtype, index) => (
              <SelectItem value={subtype.name} key={index}>
                {subtype.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Add a todo..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="flex-1"
        />
        <Button
          type="submit"
          onClick={() => {
            toast.success("Task has been created!", {
              description: taskText,
            });
          }}
        >
          <CirclePlus /> Add
        </Button>
      </form>
    );
}
