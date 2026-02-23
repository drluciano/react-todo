import NewUserButton from "./NewUserButton.jsx";
import UserCard from "./UserCard.jsx";
import { useState } from "react";
import NewUserDialog from "./NewUserDialog.jsx";

function UserList({ currentUser }) {
  const localStorageKeys = JSON.parse(localStorage.getItem("users"));

  const [newUserDialog, setNewUserDialog] = useState(true);
  const [users, setUsers] = useState(localStorageKeys ? localStorageKeys : []);
  const [activeUser, setActiveUser] = useState(false);

  const handleNewUser = (newUser) => {
    const userList = [...users, newUser];
    setUsers(userList);
    localStorage.setItem("users", JSON.stringify(userList));
    setNewUserDialog(!newUserDialog);
  };

  const logIn = (name) => {
    setActiveUser(name);
    console.log(`Logging in as: ${name}`);
    currentUser(name);
  };

  // localStorage.clear();
  // console.log(localStorage);

  return (
    <>
      <div className={"flex flex-col gap-4"}>
        <div className={"flex flex-col gap-0 items-start pb-8"}>
          <h1 className={"self-center text-3xl"}>
            <span className={"font-bold"}>Welcome! </span>Please select a user.
          </h1>
          <h2 className={"self-center text-xl"}>
            or create a new user to get started.
          </h2>
        </div>
        {!newUserDialog ? <NewUserDialog handleSubmit={handleNewUser} /> : null}
        <div
          className={
            "flex flex-row gap-4 max-w-250 flex-wrap items-center justify-center"
          }
        >
          {users.map((user, index) => (
            <UserCard name={user} key={index} logIn={logIn} />
          ))}
        </div>
        <hr className={"border-gray-400 w-100 self-center"} />
        <div className={"flex flex-row items-center justify-center"}>
          <NewUserButton
            toggleNewUserDialog={() => setNewUserDialog(!newUserDialog)}
          />
        </div>
      </div>
    </>
  );
}

export default UserList;
