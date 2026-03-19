import { Trash2, UserRound, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ToDoItem({ toDo, index, archiveTodo, handleStrike }) {
  return (
    <div className="flex flex-row gap-2 items-stretch">
      <Button
        variant="outline"
        size="icon"
        onClick={() => archiveTodo(index)}
        className="shrink-0"
      >
        <Trash2 />
      </Button>
      <div
        className={`flex flex-row justify-between items-center w-full px-3 py-2 rounded-md border bg-card cursor-pointer hover:bg-accent transition-colors ${toDo.isStruck ? "line-through opacity-50" : ""}`}
        onClick={() => handleStrike(index)}
      >
        <div>
          <span className="font-bold">Entry #{index + 1}: </span>
          <span>{toDo.text}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          {toDo.type === "Household" ? (
            <>
              <Users className="h-4 w-4" />
              <span>Household · {toDo.currentUser}</span>
            </>
          ) : (
            <>
              <UserRound className="h-4 w-4" />
              <span>Personal</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
