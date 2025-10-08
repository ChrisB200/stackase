import { useStack } from "@/contexts/StackContext";
import StackOverview from "./StackOverview";
import PanelShowcase from "./PanelShowcase";

function StackShowcase() {
  const { stack, loading, error, hasSelectedPanel } = useStack();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>error</div>;

  if (!stack) return <div>Stack does not exist</div>;

  return <>{!hasSelectedPanel ? <StackOverview /> : <PanelShowcase />}</>;
}

export default StackShowcase;
