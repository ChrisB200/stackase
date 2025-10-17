import { STORAGE_URL } from "@/config/constants";
import { cn } from "@/lib/utils";
import type { PanelIncludeStack } from "@/types/panel";
import { createStackURL } from "@/utils/url";
import type { HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";

interface Props extends HTMLAttributes<HTMLDivElement> {
  panel: PanelIncludeStack;
}

function PanelImg({ panel, className, ...rest }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className={cn("w-full mb-6 hover:cursor-pointer", className)}
      {...rest}
    >
      <img
        className="w-full rounded-xl"
        src={`${STORAGE_URL}/panels/${panel.id}.png`}
        {...rest}
      />
    </div>
  );
}

export default PanelImg;
