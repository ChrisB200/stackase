import usePanelSelection from "@/hooks/usePanelSelection";
import type { Panel } from "@/types/panel";
import PanelShowcase from "./PanelShowcase";
import PanelMasonry from "@/components/PanelMasonry";
import PanelTitle from "@/components/PanelTitle";
import { AnimatePresence, motion } from "motion/react";

function StackOverview() {
  const {
    stack,
    panels,
    loading,
    error,
    setPanelQueryParam,
    hasSelectedPanel,
  } = usePanelSelection();

  // add a loading spinner
  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (!stack) return error;

  const handleClick = (panel: Panel) => {
    setPanelQueryParam(panel.id);
  };

  return (
    <div className="px-6">
      <PanelTitle username={stack.username} title={stack.title} />
      <AnimatePresence mode="wait">
        {hasSelectedPanel ? (
          <motion.div
            key="showcase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PanelShowcase />
          </motion.div>
        ) : (
          <motion.div
            key="masonry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PanelMasonry
              panels={panels}
              onPanelClick={handleClick}
              isOrder={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default StackOverview;
