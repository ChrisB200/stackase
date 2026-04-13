import { createPanelUpload } from "@/api/panelsRequests";
import { createStackRequest } from "@/api/stackRequests";
import { useUser } from "@/contexts/UserContext";
import type { IncompletePanel } from "@/types/panel";
import { createStackURL } from "@/utils/url";
import { arrayMove } from "@dnd-kit/sortable";
import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UploadContextType {
  panels: IncompletePanel[];
  stackTitle: string;
  setStackTitle: (title: string) => void;
  isAddingFiles: boolean;
  isSubmitting: boolean;
  getFiles: (files: FileList, filetypes: string[] | "*") => void;
  reorderPanels: (activeId: string, overId: string) => void;
  updateCaption: (panelId: string, caption: string) => void;
  submitStack: () => Promise<void>;
}

export const UploadContext = createContext<UploadContextType | null>(null);

interface UploadProviderProps {
  children: ReactNode;
}

export const UploadProvider = ({ children }: UploadProviderProps) => {
  const [panels, setPanels] = useState<IncompletePanel[]>([]);
  const [stackTitle, setStackTitle] = useState("");
  const [isAddingFiles, setIsAddingFiles] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const getFiles = (files: FileList, filetypes: string[] | "*") => {
    if (!files || files.length === 0) return;

    setIsAddingFiles(true);
    window.setTimeout(() => {
      const newPanels: IncompletePanel[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);

        if (file && (filetypes === "*" || filetypes.includes(file.type))) {
          const fileWithURL = Object.assign(file, {
            url: URL.createObjectURL(file),
          });

          newPanels.push({
            id: crypto.randomUUID(),
            caption: "",
            file: fileWithURL,
          });
        }
      }

      setPanels((prev) => [...prev, ...newPanels]);
      setIsAddingFiles(false);
    }, 0);
  };

  const reorderPanels = (activeId: string, overId: string) => {
    setPanels((prev) => {
      const oldIndex = prev.findIndex((panel) => panel.id === activeId);
      const newIndex = prev.findIndex((panel) => panel.id === overId);

      if (oldIndex === -1 || newIndex === -1) return prev;

      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const updateCaption = (panelId: string, caption: string) => {
    setPanels((prev) =>
      prev.map((p) => (p.id === panelId ? { ...p, caption } : p)),
    );
  };

  const submitStack = useCallback(async () => {
    const title = stackTitle.trim();
    if (!title) {
      toast.error("Add a stack title.");
      return;
    }
    if (panels.length === 0) {
      toast.error("Add at least one panel.");
      return;
    }
    if (!user?.username) {
      toast.error("You need to be signed in.");
      return;
    }

    const missingFile = panels.some((p) => !p.file);
    if (missingFile) {
      toast.error("Every panel needs an image.");
      return;
    }

    setIsSubmitting(true);
    try {
      const stackRes = await createStackRequest(title);
      if (!stackRes.ok) {
        toast.error(stackRes.data.error || "Could not create stack.");
        return;
      }

      const stack = stackRes.data;
      let firstPanelId: number | null = null;

      for (let i = 0; i < panels.length; i++) {
        const p = panels[i];
        const file = p.file!;
        const fd = new FormData();
        fd.append("caption", p.caption ?? "");
        fd.append("stackId", String(stack.id));
        fd.append("format", "PANEL");
        fd.append("origin", "USER");
        fd.append("media", file.type || "image/png");
        fd.append("panelImage", file, file.name);

        const res = await createPanelUpload(fd);
        if (!res.ok) {
          toast.error(
            res.data.error || `Could not upload panel ${i + 1} of ${panels.length}.`,
          );
          return;
        }
        if (firstPanelId == null) firstPanelId = res.data.id;
      }

      for (const p of panels) {
        if (p.file?.url) URL.revokeObjectURL(p.file.url);
      }
      setPanels([]);
      setStackTitle("");

      const path = createStackURL(
        user.username,
        stack.title,
        firstPanelId ?? stack.id,
      );
      navigate(`/${path}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [panels, stackTitle, user, navigate]);

  return (
    <UploadContext.Provider
      value={{
        panels,
        stackTitle,
        setStackTitle,
        isAddingFiles,
        isSubmitting,
        getFiles,
        reorderPanels,
        updateCaption,
        submitStack,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = (): UploadContextType => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within an UploadProvider");
  }
  return context;
};
