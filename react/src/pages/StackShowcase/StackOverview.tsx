import { STORAGE_URL } from "@/config/constants";
import { useStack } from "@/contexts/StackContext";
import usePanelSelection from "@/hooks/usePanelSelection";
import type { Panel } from "@/types/panel";
import PanelShowcase from "./PanelShowcase";

function StackOverview() {
  const { stack, loading, error, setSelectedPanelId, selectedPanelId } =
    usePanelSelection();

  // add a loading spinner
  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (!stack) return error;

  const handleClick = (panel: Panel) => {
    setSelectedPanelId(panel.id);
  };

  return selectedPanelId ? (
    <PanelShowcase />
  ) : (
    <div>
      <h1>{stack.title}</h1>
      {stack.panels.map((panel) => (
        <img
          key={panel.id}
          src={`${STORAGE_URL}/panels/${panel.id}.png`}
          onClick={() => handleClick(panel)}
        />
      ))}
    </div>
  );
}

export default StackOverview;
