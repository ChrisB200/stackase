import InteractionButton from "@/components/InteractionButton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart } from "lucide-react";

function LikeButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <InteractionButton Icon={Heart} />
      </TooltipTrigger>
      <TooltipContent>Like</TooltipContent>
    </Tooltip>
  );
}

export default LikeButton;
