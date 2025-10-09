import PanelCarousel from "./PanelCarousel";
import { motion, AnimatePresence } from "motion/react";
import usePanelSelection from "@/hooks/usePanelSelection";
import { Skeleton } from "@/components/ui/skeleton";

function PanelShowcase() {
  const { selectedPanel } = usePanelSelection();

  return (
    // let the page grow if the caption goes below the fold
    <div className="min-h-screen grid place-items-center">
      {/* this box is what we center; caption is positioned relative to it */}
      <div className="relative">
        <PanelCarousel />

        {/* docked 20px under the carousel, horizontally centered */}

        <AnimatePresence mode="wait">
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-[20px] text-center">
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
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PanelShowcase;
