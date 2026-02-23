import { ToDoItem } from "./ToDoItem.jsx";

export function ToDoList({ items, archiveTodo }) {
  if (items.length === 0) {
    return (
      <>
        <h2>No todos created.</h2>
      </>
    );
  } else {
    return (
      <>
        <div className={"flex flex-col gap-2"}>
          {items.map((toDo, index) => (
            <ToDoItem
              key={index}
              toDo={toDo}
              index={index}
              archiveTodo={archiveTodo}
            ></ToDoItem>
          ))}
        </div>
      </>
    );
  }
}
