import { useUser } from "@/contexts/UserContext";
import StackTitle from "./StackTitle";
import UploadPanels from "./UploadPanels";
import { useUpload } from "@/contexts/UploadContext";
import PanelEditor from "./PanelEditor";
import PageLayout from "@/layouts/PageLayout";

function StackCreation() {
  const { user } = useUser();
  const { currentPanel } = useUpload();

  if (!user) return;

  return (
    <PageLayout>
      <StackTitle username={user.username!} count={19} />
      <div className="">
        {!currentPanel.file ? <UploadPanels /> : <PanelEditor />}
      </div>
    </PageLayout>
  );
}

export default StackCreation;
