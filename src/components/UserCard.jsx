import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function UserCard({ name }) {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Card
      className="w-44 h-44 flex flex-col items-center justify-center cursor-pointer hover:bg-accent transition-colors"
      onClick={() => {
        setCurrentUser(name);
        navigate(`todos/${name}`);
      }}
    >
      <CardContent className="flex flex-col items-center gap-3 pt-6">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="text-xl">
            {name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium uppercase">{name}</p>
      </CardContent>
    </Card>
  );
}

export default UserCard;
