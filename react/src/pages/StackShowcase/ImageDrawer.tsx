import { getSimilarPanelsReq } from "@/api/panelsRequests";
import InteractionButton from "@/components/InteractionButton";
import PanelMasonry from "@/components/PanelMasonry";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import usePanelSelection from "@/hooks/usePanelSelection";
import { getSimilarPanels } from "@/services/panelsService";
import type { PanelIncludeStack } from "@/types/panel";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

function ImageDrawer({ id }: { id?: number }) {
  const [panels, setPanels] = useState<PanelIncludeStack[] | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const panels = await getSimilarPanels(id);
      panels.forEach((panel, i) => {
        panel.position = i;
      });
      setPanels(panels);
    };
    fetch();
  }, [id]);

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
        <div className="overflow-y-scroll py-20">
          {panels ? <PanelMasonry panels={panels} /> : ""}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default ImageDrawer;
