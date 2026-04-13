import { Button } from "@/components/ui/button";
import { useUpload } from "@/contexts/UploadContext";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Loader2 } from "lucide-react";
import SortablePanel from "./SortablePanel";

function PanelEditor() {
  const {
    panels,
    reorderPanels,
    stackTitle,
    isSubmitting,
    submitStack,
  } = useUpload();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    reorderPanels(String(active.id), String(over.id));
  };

  const canSubmit =
    stackTitle.trim().length > 0 && panels.length > 0 && !isSubmitting;

  return (
    <div className="relative flex w-full max-w-[600px] flex-col items-center gap-8">
      {isSubmitting ? (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-lg bg-background/80 backdrop-blur-sm"
          aria-live="polite"
          aria-busy="true"
        >
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
          <p className="text-sm text-muted-foreground">Uploading your stack…</p>
        </div>
      ) : null}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={panels.map((panel) => panel.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex w-full flex-col gap-10">
            {panels.map((panel, index) => (
              <SortablePanel
                key={panel.id}
                panel={panel}
                orderDisplay={index + 1}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button
        type="button"
        variant="accent"
        className="w-full max-w-sm"
        disabled={!canSubmit}
        onClick={() => void submitStack()}
      >
        Create stack
      </Button>
    </div>
  );
}

export default PanelEditor;
