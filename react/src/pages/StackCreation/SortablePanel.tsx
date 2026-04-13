import PanelElement from "@/components/PanelElement";
import { useUpload } from "@/contexts/UploadContext";
import type { IncompletePanel } from "@/types/panel";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface Props {
  panel: IncompletePanel;
  orderDisplay: number;
}

function SortablePanel({ panel, orderDisplay }: Props) {
  const { updateCaption } = useUpload();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: panel.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-lg border bg-background p-3 shadow-sm"
    >
      <div className="mb-2 flex items-start gap-2">
        <button
          type="button"
          className="mt-1 shrink-0 cursor-grab touch-none rounded p-1 text-muted-foreground hover:bg-muted active:cursor-grabbing"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          {panel.file?.url ? (
            <PanelElement
              previewSrc={panel.file.url}
              orderDisplay={orderDisplay}
              className="mb-4"
            />
          ) : null}
          <textarea
            value={panel.caption ?? ""}
            onChange={(e) => updateCaption(panel.id, e.target.value)}
            className="w-full rounded-md border bg-background p-2 text-sm"
            placeholder="Add a caption…"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}

export default SortablePanel;
