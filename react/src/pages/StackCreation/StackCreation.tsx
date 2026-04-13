import { useUser } from "@/contexts/UserContext";
import StackTitle from "./StackTitle";
import UploadPanels from "./UploadPanels";
import { useUpload } from "@/contexts/UploadContext";
import PanelEditor from "./PanelEditor";
import PageLayout from "@/layouts/PageLayout";

function StackCreation() {
  const { user } = useUser();
  const { panels } = useUpload();

  if (!user) return;

  return (
    <PageLayout>
      <StackTitle username={user.username!} />
      <div className="flex justify-center items-center px-4">
        {panels.length === 0 ? <UploadPanels /> : <PanelEditor />}
      </div>
    </PageLayout>
  );
}

export default StackCreation;
