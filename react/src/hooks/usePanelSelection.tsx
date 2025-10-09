import { STORAGE_URL } from "@/config/constants";
import { useStack } from "@/contexts/StackContext";
import type { Panel } from "@/types/panel";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function usePanelSelection() {
  const [searchParams, setURLSearchParams] = useSearchParams();
  const [selectedPanelId, setSelectedPanelId] = useState<number | null>(null);
  const [selectedPanel, setSelectedPanel] = useState<Panel | null>(null);
  const { stack, panels, loading, error } = useStack();

  const preloadPanel = (panel: Panel) => {
    const img = new Image();
    img.src = `${STORAGE_URL}/panels/${panel.id}.png`;
  };

  const preloadSurroundingPanels = () => {
    if (!selectedPanel) return;

    const nextPanel = getNextPanelPosition();
    const prevPanel = getPrevPanelPosition();

    if (nextPanel) preloadPanel(nextPanel);
    if (prevPanel) preloadPanel(prevPanel);
  };

  const getNextPanelPosition = () => {
    if (!selectedPanel) return;

    if (selectedPanel.position < panels.length) {
      return panels[selectedPanel.position + 1];
    } else {
      return panels[0];
    }
  };

  const getPrevPanelPosition = () => {
    if (!selectedPanel) return;

    if (selectedPanel.position > 0) {
      return panels[selectedPanel.position - 1];
    } else {
      return panels[panels.length - 1];
    }
  };

  const setPanelByPosition = (position: number) => {
    if (position < 0 || position >= panels.length) return;
    setSelectedPanelId(panels[position].id);
  };

  const setPanelQueryParam = (id: number) => {
    setURLSearchParams({ panel: id.toString() });
  };

  const getPanelIdFromQueryParam = () => {
    const id = searchParams.get("panel");
    if (!id) return;

    const parsedId = parseInt(id);
    if (!parsedId) return;

    return parsedId;
  };

  // setting the panel from query params
  useEffect(() => {
    const id = getPanelIdFromQueryParam();
    if (!id) return;

    // deduplicates
    if (id === selectedPanelId) return;

    setSelectedPanelId(id);
  }, [stack]);

  // synchronising selectedPanel and selectedPanelId
  useEffect(() => {
    const panel = panels.find((p) => p.id === selectedPanelId);
    setSelectedPanel(panel ? panel : null);
  }, [selectedPanelId]);

  // setting the query params from panel
  useEffect(() => {
    if (!selectedPanelId) return;

    const oldId = getPanelIdFromQueryParam();
    if (!oldId) return setPanelQueryParam(selectedPanelId);

    if (oldId === selectedPanelId) return;

    setPanelQueryParam(selectedPanelId);
  }, [selectedPanelId]);

  // images are already loaded before seen
  useEffect(() => {
    if (!selectedPanel) return;

    preloadSurroundingPanels();
  }, [selectedPanel]);

  return {
    loading,
    error,
    stack,
    panels,
    selectedPanelId,
    setSelectedPanelId,
    setPanelQueryParam,
    selectedPanel,
    getNextPanelPosition,
    getPrevPanelPosition,
    setPanelByPosition,
  };
}

export default usePanelSelection;
