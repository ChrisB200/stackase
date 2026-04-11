import PanelCarousel from "./PanelCarousel";
import { motion, AnimatePresence } from "motion/react";
import usePanelSelection from "@/hooks/usePanelSelection";
import { Skeleton } from "@/components/ui/skeleton";
import InteractionButton from "@/components/InteractionButton";
import { MoveLeft } from "lucide-react";
import ImageDrawer from "./ImageDrawer";
import MoreDropdown from "./MoreDropdown";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";

function PanelShowcase() {
  const { selectedPanel, removeSelectedPanel } = usePanelSelection();

  return (
    <>
      <InteractionButton
        onClick={removeSelectedPanel}
        className="absolute top-4 left-4"
        Icon={MoveLeft}
      />

      <div className="w-full flex justify-center">
        <div className="relative flex flex-col items-center">
          <PanelCarousel />

          <div className="absolute top-full mt-8 left-1/2 -translate-x-1/2 w-full max-w-md flex flex-col items-center gap-8 text-center">
            <AnimatePresence mode="wait">
              {selectedPanel ? (
                <motion.p
                  key={selectedPanel.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full"
                >
                  {selectedPanel.caption}
                </motion.p>
              ) : (
                <Skeleton className="w-[200px] h-[20px]" />
              )}
            </AnimatePresence>

            <div className="flex justify-center gap-6">
              <LikeButton />
              <ShareButton />
              <ImageDrawer id={selectedPanel?.id || undefined} />
              <MoreDropdown />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PanelShowcase;
