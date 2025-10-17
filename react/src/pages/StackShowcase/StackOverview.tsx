import { STORAGE_URL } from "@/config/constants";
import usePanelSelection from "@/hooks/usePanelSelection";
import type { Panel } from "@/types/panel";
import PanelShowcase from "./PanelShowcase";
import PanelElement from "@/components/PanelElement";
import PanelMasonry from "@/components/PanelMasonry";

function StackOverview() {
  const { stack, panels, loading, error, setPanelQueryParam, selectedPanelId } =
    usePanelSelection();

  // add a loading spinner
  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (!stack) return error;

  const handleClick = (panel: Panel) => {
    setPanelQueryParam(panel.id);
  };

  return (
    <div className="px-6">
      <h1 className="text-center text-comic text-5xl mt-15 mb-15">
        {stack.title.toUpperCase()}
      </h1>
      {selectedPanelId ? (
        <PanelShowcase />
      ) : (
        <PanelMasonry panels={panels} onPanelClick={handleClick} />
      )}
    </div>
  );
}

export default StackOverview;
