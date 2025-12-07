import { useUser } from "@/contexts/UserContext";
import StackTitle from "./StackTitle";
import UploadPanels from "./UploadPanels";
import { useUpload } from "@/contexts/UploadContext";
import PanelEditor from "./PanelEditor";

function StackCreation() {
  const { user } = useUser();
  const { currentPanel } = useUpload();

  if (!user) return;

  return (
    <div>
      <StackTitle username={user.username!} count={19} />
      <div className="">
        {!currentPanel.file ? <UploadPanels /> : <PanelEditor />}
      </div>
    </div>
  );
}

export default StackCreation;
