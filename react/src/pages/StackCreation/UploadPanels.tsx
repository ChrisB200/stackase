import { Button } from "@/components/ui/button";
import { useUpload } from "@/contexts/UploadContext";
import { Upload } from "lucide-react";
import { useRef, type DragEvent, ChangeEvent } from "react";

function UploadPanels() {
  const { getFile } = useUpload();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    getFile(files, "*");
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFilePick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      getFile(e.target.files, "*");
    }
  };

  const openPicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDrag}
      className="flex flex-col gap-4 justify-center items-center border-6 border-border border-dashed w-[60vw] h-[40vh] max-w-[500px] max-h-[400px]"
    >
      <Upload size={"48px"} />
      <p>Drag photos here</p>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFilePick}
        multiple
        className="hidden"
      />

      <Button variant="accent" onClick={openPicker}>
        Select From Device
      </Button>
    </div>
  );
}

export default UploadPanels;
