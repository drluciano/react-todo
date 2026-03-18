import { User } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router";

function UserCard({ name, email }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => {
          setCurrentUser(name);
          navigate(`todos/${name}`);
        }}
        className={
          "bg-gray-50 flex flex-col gap-4 text-center justify-center items-center p-4 w-50 h-50 border border-gray-300 shadow-sm rounded-lg hover:scale-110 hover:rounded-[100px] transition-[scale,border-radius] ease-in-out cursor-pointer hover:shadow-xl hover:shadow-emerald-200"
        }
      >
        <div
          className={`w-24 h-24 bg-green-700 rounded-full flex items-center justify-center`}
        >
          <User color={"white"} />
        </div>
        <h1 className={"w-auto text-xl uppercase"}>{name}</h1>
      </div>
    </>
  );
}
export default UserCard;
