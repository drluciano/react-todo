import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

function NewUserButton({ toggleNewUserDialog }) {
  return (
    <Button onClick={toggleNewUserDialog} variant="outline">
      <UserPlus /> Create User
    </Button>
  );
}

export default NewUserButton;
