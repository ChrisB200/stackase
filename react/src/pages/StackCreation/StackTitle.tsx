import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import AutoResizingInput from "./AutoResizingInput";

interface Props {
  username: string;
  count: number;
}

function StackTitle({ username, count }: Props) {
  const [adjective, setAdjective] = useState<string>("TOP");

  let parsedUsername = `${username}'`.toUpperCase();
  if (!username.endsWith("s")) parsedUsername = `${parsedUsername}S`;

  return (
    <h1 className="text-center text-comic text-5xl mt-15 mb-15">
      <span className="text-accent">{parsedUsername} </span>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          {adjective}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setAdjective("TOP")}>
            TOP
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setAdjective("BOTTOM")}>
            BOTTOM
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>{" "}
      {count + " "}
      <AutoResizingInput />
    </h1>
  );
}

export default StackTitle;
