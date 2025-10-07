import { useStack } from "@/contexts/StackContext";
import PanelShowcase from "./PanelShowcase";
import StackOverview from "./StackOverview";

function StackShowcase() {
  const { stack, loading, error, panel } = useStack();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>error</div>;

  if (!stack) return <div>Stack does not exist</div>;

  return <>{!panel ? <StackOverview /> : <PanelShowcase />}</>;
}

export default StackShowcase;
