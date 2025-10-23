import { StackProvider } from "@/contexts/StackContext";
import StackOverview from "./StackOverview";
import { useParams } from "react-router-dom";
import PageLayout from "@/layouts/PageLayout";

function StackShowcase() {
  const { username, stackTitle } = useParams();

  if (!username || !stackTitle) return <div>404</div>;

  return (
    <PageLayout>
      <StackProvider username={username} stackTitle={stackTitle}>
        <StackOverview />
      </StackProvider>
    </PageLayout>
  );
}

export default StackShowcase;
