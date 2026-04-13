import { Button } from "@/components/ui/button";
import { useUpload } from "@/contexts/UploadContext";
import { Loader2, Upload } from "lucide-react";
import { useRef, type DragEvent, type ChangeEvent } from "react";

function UploadPanels() {
  const { getFiles, isAddingFiles } = useUpload();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    getFiles(files, "*");
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFilePick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      getFiles(e.target.files, "*");
    }
  };

  const openPicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative w-full max-w-[500px]">
      <div
        onDrop={handleDrop}
        onDragOver={handleDrag}
        className="relative flex h-[40vh] max-h-[400px] w-[60vw] max-w-[500px] flex-col items-center justify-center gap-4 border-6 border-dashed border-border"
      >
        {isAddingFiles ? (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-[inherit] bg-background/85 backdrop-blur-sm"
            aria-live="polite"
            aria-busy="true"
          >
            <Loader2 className="h-10 w-10 animate-spin text-accent" />
            <p className="text-sm text-muted-foreground">Adding images…</p>
          </div>
        ) : null}

        <Upload size={"48px"} />
        <p>Drag photos here</p>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFilePick}
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
        />

        <Button variant="accent" onClick={openPicker}>
          Select from device
        </Button>
      </div>
    </div>
  );
}

export default UploadPanels;
