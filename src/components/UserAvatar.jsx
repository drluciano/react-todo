import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

export default function UserAvatar({ seed }) {
  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      seed: seed,
      size: 128,
      backgroundType: ["solid"],
      backgroundColor: ["ffffff"],
      radius: 50,
    }).toDataUri();
  }, [seed]);

  return <img src={avatar} alt="Avatar" className={"w-40 self-center"} />;
}
