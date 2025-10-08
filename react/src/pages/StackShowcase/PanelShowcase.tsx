import { useStack } from "@/contexts/StackContext";
import PanelCarousel from "./PanelCarousel";
import { motion, AnimatePresence } from "motion/react";

function PanelShowcase() {
  const { panel } = useStack();
  if (!panel) return null;

  return (
    // let the page grow if the caption goes below the fold
    <div className="min-h-screen grid place-items-center">
      {/* this box is what we center; caption is positioned relative to it */}
      <div className="relative">
        <PanelCarousel />

        {/* docked 20px under the carousel, horizontally centered */}

        <AnimatePresence mode="wait">
          <motion.p
            key={panel.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-[20px] text-center"
          >
            {panel.caption}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PanelShowcase;
