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
    // let the page grow if the caption goes below the fold
    <>
      <InteractionButton
        onClick={removeSelectedPanel}
        className="absolute top-4 left-4"
        Icon={MoveLeft}
      />
      <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <PanelCarousel />

          {/* docked 20px under the carousel, horizontally centered */}

          <div className="flex flex-col gap-8 absolute left-1/2 -translate-x-1/2 top-full mt-[32px] text-center">
            <AnimatePresence mode="wait">
              {selectedPanel ? (
                <motion.p
                  key={selectedPanel.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {selectedPanel.caption}
                </motion.p>
              ) : (
                <Skeleton className="w-[200px] h-[20px]" />
              )}
            </AnimatePresence>
            <div className="flex gap-6">
              <LikeButton />
              <ShareButton />
              <ImageDrawer />
              <MoreDropdown />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PanelShowcase;
