import type { Panel, PanelIncludeStack } from "@/types/panel";
import PanelElement from "./PanelElement";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  panels: PanelIncludeStack[] | Panel[];
  onPanelClick?: any;
  className?: string;
  isOrder?: boolean;
  /** When true, the first panel is omitted (e.g. similar-results drawer matches current image). */
  skipFirstPanel?: boolean;
}

function PanelMasonry({
  panels,
  onPanelClick,
  isOrder,
  className,
  skipFirstPanel = false,
}: Props) {
  const handleClick = (panel: PanelIncludeStack | Panel) => {
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
        {(skipFirstPanel ? panels.filter((_, i) => i !== 0) : panels).map(
          (panel) => (
            <Tooltip key={panel.id}>
              <TooltipTrigger asChild>
                <PanelElement
                  panel={panel}
                  onClick={() => handleClick(panel)}
                  isOrder={isOrder}
                  skipFirstPanel
                />
              </TooltipTrigger>
              <TooltipContent>
                {"title" in panel
                  ? panel.title
                  : "media" in panel
                    ? panel.caption
                    : ""}
              </TooltipContent>
            </Tooltip>
          ),
        )}
      </div>
    </div>
  );
}

export default PanelMasonry;
