import PanelMasonry from "@/components/PanelMasonry";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import usePanelSelection from "@/hooks/usePanelSelection";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function ImageDrawer({ children }: Props) {
  const { panels } = usePanelSelection();

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <PanelMasonry panels={panels} />
      </DrawerContent>
    </Drawer>
  );
}

export default ImageDrawer;
