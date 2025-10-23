import { STORAGE_URL } from "@/config/constants";
import usePanelSelection from "@/hooks/usePanelSelection";
import type { Panel } from "@/types/panel";
import PanelShowcase from "./PanelShowcase";
import PanelElement from "@/components/PanelElement";
import PanelMasonry from "@/components/PanelMasonry";
import PanelTitle from "@/components/PanelTitle";
import { AnimatePresence, LayoutGroup } from "motion/react";

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
      <AnimatePresence initial={false}>
        <LayoutGroup>
          {hasSelectedPanel ? (
            <PanelShowcase />
          ) : (
            <PanelMasonry panels={panels} onPanelClick={handleClick} />
          )}
        </LayoutGroup>
      </AnimatePresence>
    </div>
  );
}

export default StackOverview;
