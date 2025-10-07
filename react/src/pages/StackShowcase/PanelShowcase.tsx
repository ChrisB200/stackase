import { useStack } from "@/contexts/StackContext";

function PanelShowcase() {
  const { panel } = useStack();

  if (!panel) return;

  return <div>{panel.id}</div>;
}

export default PanelShowcase;
