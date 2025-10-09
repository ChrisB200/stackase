import { StackProvider } from "@/contexts/StackContext";
import StackOverview from "./StackOverview";
import { useParams } from "react-router-dom";

function StackShowcase() {
  const { username, stackTitle } = useParams();

  if (!username || !stackTitle) return <div>404</div>;

  return (
    <StackProvider username={username} stackTitle={stackTitle}>
      <StackOverview />
    </StackProvider>
  );
}

export default StackShowcase;
