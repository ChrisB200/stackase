import { useStack } from "@/contexts/StackContext";
import PanelCarousel from "./PanelCarousel";
import StackOverview from "./StackOverview";

function StackShowcase() {
  const { stack, loading, error, hasSelectedPanel } = useStack();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>error</div>;

  if (!stack) return <div>Stack does not exist</div>;

  return <>{!hasSelectedPanel ? <StackOverview /> : <PanelCarousel />}</>;
}

export default StackShowcase;
