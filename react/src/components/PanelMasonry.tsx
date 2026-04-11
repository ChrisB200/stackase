import type { Panel, PanelIncludeStack } from "@/types/panel";
import PanelElement from "./PanelElement";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  panels: PanelIncludeStack[];
  onPanelClick?: any;
  className?: string;
  isOrder?: boolean;
}

function PanelMasonry({ panels, onPanelClick, isOrder, className }: Props) {
  const handleClick = (panel: PanelIncludeStack) => {
    if (onPanelClick) {
      onPanelClick(panel);
    }
  };
  return (
    <div className="flex justify-center">
      <div
        className={cn(
          "columns-[250px] md:columns-[300px] w-full max-w-[1200px]",
          className,
        )}
      >
        {panels
          .filter((panel, i) => i != 0)
          .map((panel) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <PanelElement
                  panel={panel}
                  key={panel.id}
                  onClick={() => handleClick(panel)}
                  isOrder={isOrder}
                  isOrderOffset={-1}
                />
              </TooltipTrigger>
              <TooltipContent>{panel?.title}</TooltipContent>
            </Tooltip>
          ))}
      </div>
    </div>
  );
}

export default PanelMasonry;
