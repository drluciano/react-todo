import UserCard from "./components/UserCard.jsx";
import UserList from "./components/UserList.jsx";
import { ToDoList } from "./components/ToDoList.jsx";
import UserToDoList from "./components/UserToDoList.jsx";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState("");

  const assignUser = (name) => {
    setCurrentUser(name);
    console.log(name);
  };

  return (
    <>
      <UserList currentUser={assignUser} />
      {/*<UserToDoList />*/}
    </>
  );
}

export default App;
