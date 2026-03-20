import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import UserAvatar from "@/components/UserAvatar.jsx";

function UserCard({ user }) {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Card
      className="w-44 h-auto flex flex-col items-center justify-center cursor-pointer hover:bg-accent transition-colors"
      onClick={() => {
        setCurrentUser(user);
        navigate(`todos/${user.name}`);
      }}
    >
      <CardContent className="flex flex-col items-center gap-3 pt-6">
        <UserAvatar seed={user.avatarSeed} />
        <p className="text-sm font-medium uppercase">{user.name}</p>
      </CardContent>
    </Card>
  );
}

export default UserCard;
