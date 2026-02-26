import UserList from "./components/UserList.jsx";
import UserToDoList from "./components/UserToDoList.jsx";
import { useState } from "react";
import { UserContext } from "./context/UserContext.jsx";
import Navbar from "./components/Navbar.jsx";
import { Route, Router, Routes } from "react-router";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Navbar></Navbar>
      <div
        className={
          "flex flex-col gap-8 items-center justify-start h-screen pt-60 overflow-y-auto"
        }
      >
        <Routes>
          <Route path={`todos/:userId`} element={<UserToDoList />} />
          <Route path={"/"} element={<UserList />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
