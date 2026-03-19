import NewUserButton from "./NewUserButton.jsx";
import UserCard from "./UserCard.jsx";
import { useEffect, useState } from "react";
import NewUserDialog from "./NewUserDialog.jsx";
import { getUsers } from "../api/api.js";
import { Separator } from "@/components/ui/separator";

function UserList() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, [dialogOpen]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <p className="text-muted-foreground mt-1">
          Please select a user, or create a new one to get started.
        </p>
      </div>
      <div className="flex flex-row gap-4 flex-wrap items-center justify-center">
        {users.map((user, index) => (
          <UserCard name={user.name} key={index} />
        ))}
      </div>
      <Separator />
      <div className="flex justify-center">
        <NewUserButton toggleNewUserDialog={() => setDialogOpen(true)} />
      </div>
      <NewUserDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}

export default UserList;
