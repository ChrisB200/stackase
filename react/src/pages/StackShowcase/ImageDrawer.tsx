import InteractionButton from "@/components/InteractionButton";
import PanelMasonry from "@/components/PanelMasonry";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import usePanelSelection from "@/hooks/usePanelSelection";
import { Search } from "lucide-react";
import type { ReactNode } from "react";

function ImageDrawer() {
  const { panels } = usePanelSelection();

  return (
    <Drawer direction="bottom">
      <Tooltip>
        <TooltipTrigger asChild>
          <DrawerTrigger asChild>
            <InteractionButton Icon={Search} />
          </DrawerTrigger>
        </TooltipTrigger>
        <TooltipContent>Find Similar</TooltipContent>
      </Tooltip>
      <DrawerContent>
        <PanelMasonry panels={panels} />
      </DrawerContent>
    </Drawer>
  );
}

export default ImageDrawer;
