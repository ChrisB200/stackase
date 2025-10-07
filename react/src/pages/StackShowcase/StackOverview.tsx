import { STORAGE_URL } from "@/config/constants";
import { useStack } from "@/contexts/StackContext";

function StackOverview() {
  const { stack } = useStack();

  if (!stack) return;

  return (
    <div>
      <h1>{stack.title}</h1>
      {stack.panels.map((panel) => (
        <img key={panel.id} src={`${STORAGE_URL}/panels/${panel.id}.png`} />
      ))}
    </div>
  );
}

export default StackOverview;
