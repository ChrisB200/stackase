import type { IncompletePanel } from "@/types/panel";
import { createContext, useContext, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";

interface UploadContextType {
  currentPanel: IncompletePanel;
  getFile: (files: FileList, filetypes: string[] | "*") => void;
  handleCaptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const UploadContext = createContext<UploadContextType | null>(null);

interface UploadProviderProps {
  children: ReactNode;
}

export const UploadProvider = ({ children }: UploadProviderProps) => {
  const [currentPanel, setCurrentPanel] = useState<IncompletePanel>({
    caption: "",
    file: undefined,
  });

  const getFile = (files: FileList, filetypes: string[] | "*") => {
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file && (filetypes === "*" || filetypes.includes(file.type))) {
          const fileWithURL = { ...file, url: URL.createObjectURL(file) };
          setCurrentPanel((prev) => ({ ...prev, file: fileWithURL }));
        }
      }
    }
  };

  const handleCaptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentPanel((prev) => ({ ...prev, caption: e.target.value }));
  };

  return (
    <UploadContext.Provider
      value={{ currentPanel, getFile, handleCaptionChange }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = (): UploadContextType => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useStack must be used within a StackProvider");
  }
  return context;
};
