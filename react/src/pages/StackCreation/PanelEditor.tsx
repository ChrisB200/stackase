import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpload } from "@/contexts/UploadContext";

function PanelEditor() {
  const { currentPanel, handleCaptionChange } = useUpload();

  if (!currentPanel.file) return;

  const { file, caption } = currentPanel;

  return (
    <div className="flex flex-col items-center">
      <div className="max-h-[60vh] max-w-[80vw]">
        <img className="w-full h-full rounded-md" src={file.url} />
      </div>
      <div className="mt-6 w-full max-w-[80vw]">
        <Label className="py-3">Caption</Label>
        <Textarea onChange={handleCaptionChange} value={caption} />
      </div>
    </div>
  );
}

export default PanelEditor;
