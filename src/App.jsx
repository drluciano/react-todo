import UserList from "./components/UserList.jsx";
import UserToDoList from "./components/UserToDoList.jsx";
import { useEffect, useState } from "react";
import { UserContext } from "./context/UserContext.jsx";
import Navbar from "./components/Navbar.jsx";
import { Route, Router, Routes } from "react-router";
import { PageContext } from "./context/PageContext.jsx";
import ArchivePage from "./components/ArchivePage.jsx";
import { ArchiveContext } from "./context/ArchiveContext.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("todos");
  const currentArchive = JSON.parse(localStorage.getItem("archive")) ?? [];
  const [archive, setArchive] = useState(currentArchive);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <PageContext.Provider value={{ page, setPage }}>
        <ArchiveContext.Provider value={{ archive, setArchive }}>
          <Navbar></Navbar>
          <div
            className={
              "flex flex-col gap-8 items-center justify-start h-screen pt-60 overflow-y-auto"
            }
          >
            <Routes>
              <Route path={`todos/:userId`} element={<UserToDoList />} />
              <Route path={"archive"} element={<ArchivePage />} />
              <Route path={"/"} element={<UserList />} />
            </Routes>
          </div>
        </ArchiveContext.Provider>
      </PageContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
