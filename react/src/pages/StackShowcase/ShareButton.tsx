import InteractionButton from "@/components/InteractionButton";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Share } from "lucide-react";
import { toast } from "sonner";

function ShareButton() {
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link has been copied");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy link");
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <InteractionButton Icon={Share} onClick={handleClick} />
      </TooltipTrigger>
      <TooltipContent>Share</TooltipContent>
    </Tooltip>
  );
}

export default ShareButton;
