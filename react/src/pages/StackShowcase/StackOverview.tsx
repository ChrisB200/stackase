import { STORAGE_URL } from "@/config/constants";
import { useStack } from "@/contexts/StackContext";
import type { Panel } from "@/types/panel";

function StackOverview() {
  const { stack, setPanelURL } = useStack();

  if (!stack) return;

  const handleClick = (panel: Panel) => {
    setPanelURL(panel);
  };

  return (
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
