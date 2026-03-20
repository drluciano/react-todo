import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { newUser } from "@/api/api.js";
import UserAvatar from "@/components/UserAvatar.jsx";
import { toast } from "sonner";

function NewUserDialog({ open, setOpen, onOpenChange }) {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPin, setInputPin] = useState("");
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 9999));

  const handleNewUser = async (e) => {
    e.preventDefault();
    await newUser(inputName, inputEmail, inputPin, seed);
    setInputName("");
    setInputEmail("");
    setSeed(Math.floor(Math.random() * 9999));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"flex flex-col"}>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <UserAvatar seed={seed} />
        <Button onClick={() => setSeed(Math.floor(Math.random() * 9999))}>
          Randomize Avatar
        </Button>
        <form onSubmit={handleNewUser} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="userName">Name</Label>
            <Input
              id="userName"
              placeholder="Enter a name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <Label htmlFor="userName">Email</Label>
            <Input
              id="email"
              placeholder={"Enter your email"}
              value={inputEmail}
              onChange={(e) => {
                setInputEmail(e.target.value);
              }}
            />
            <Label htmlFor="userName">Input desired PIN</Label>
            <Input
              maxLength={4}
              type={"password"}
              onChange={(e) => setInputPin(e.target.value)}
            />
            <Label htmlFor="userName">Verify desired PIN</Label>
            <Input maxLength={4} type={"password"} />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                toast.success("Created new user!");
              }}
            >
              Create User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NewUserDialog;
