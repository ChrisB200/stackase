import { getSimilarPanelsReq } from "@/api/panelsRequests";
import InteractionButton from "@/components/InteractionButton";
import PanelMasonry from "@/components/PanelMasonry";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSimilarPanels } from "@/services/panelsService";
import type { PanelIncludeStack } from "@/types/panel";
import { createStackURL } from "@/utils/url";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ImageDrawer({ id }: { id?: number }) {
  const [panels, setPanels] = useState<PanelIncludeStack[] | null>(null);
  const navigate = useNavigate();

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

  const onPanelClick = (panel: PanelIncludeStack) => {
    const url = createStackURL(panel.username, panel.title, panel.id);
    navigate(`/${url}`);
    window.location.reload();
  };

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
          {panels ? (
            <PanelMasonry
              panels={panels}
              isOrder={true}
              skipFirstPanel
              onPanelClick={onPanelClick}
            />
          ) : (
            ""
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default ImageDrawer;
