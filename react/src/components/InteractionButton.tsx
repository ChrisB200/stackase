import { ArrowLeft } from "lucide-react";
import { Button, type ButtonProps } from "./ui/button";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props extends ButtonProps {
  Icon: any;
}

function InteractionButton({ Icon, className, ...rest }: Props) {
  return (
    <Button
      variant="secondary"
      className={cn(className, "w-fit h-fit rounded-full aspect-square")}
      {...rest}
    >
      <Icon />
    </Button>
  );
}

export default InteractionButton;
