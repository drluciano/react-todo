import UserList from "./components/UserList.jsx";
import UserToDoList from "./components/UserToDoList.jsx";
import { useEffect, useState } from "react";
import { UserContext } from "./context/UserContext.jsx";
import Navbar from "./components/Navbar.jsx";
import { Route, Routes } from "react-router";
import { PageContext } from "./context/PageContext.jsx";
import ArchivePage from "./components/ArchivePage.jsx";
import { ArchiveContext } from "./context/ArchiveContext.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")),
  );
  const [page, setPage] = useState("todos");
  const currentArchive = JSON.parse(localStorage.getItem("archive")) ?? [];
  const [archive, setArchive] = useState(currentArchive);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <PageContext.Provider value={{ page, setPage }}>
        <ArchiveContext.Provider value={{ archive, setArchive }}>
          <Navbar />
          <div className="flex flex-col gap-8 items-center justify-start min-h-screen pt-20 px-4 pb-8">
            <Routes>
              <Route path="todos/:userId" element={<UserToDoList />} />
              <Route path="archive" element={<ArchivePage />} />
              <Route path="/" element={<UserList />} />
            </Routes>
          </div>
        </ArchiveContext.Provider>
      </PageContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
