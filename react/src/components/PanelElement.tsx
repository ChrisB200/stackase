import { STORAGE_URL } from "@/config/constants";
import { cn } from "@/lib/utils";
import type { Panel, PanelIncludeStack } from "@/types/panel";

interface PanelElementProps extends React.HTMLAttributes<HTMLDivElement> {
  panel?: Panel | PanelIncludeStack;
  /** Local preview (e.g. object URL) during stack creation */
  previewSrc?: string;
  /** 1-based order label above the panel (draft editor) */
  orderDisplay?: number;
  isOrder?: boolean;
  isOrderOffset?: number;
  skipFirstPanel?: boolean;
}

function PanelElement({
  panel,
  previewSrc,
  orderDisplay,
  className = "",
  isOrder,
  isOrderOffset = 0,
  onClick,
  skipFirstPanel,
  ...rest
}: PanelElementProps) {
  const src =
    previewSrc ??
    (panel != null ? `${STORAGE_URL}/panels/${panel.id}.png` : "");

  const showDraftOrder = orderDisplay != null;
  const showSavedOrder = Boolean(isOrder && panel);

  return (
    <div className="relative">
      {showDraftOrder ? (
        <p className="absolute -top-6 text-muted-foreground">{orderDisplay}.</p>
      ) : showSavedOrder ? (
        <p className="absolute -top-6 text-muted-foreground">
          {panel!.position + (skipFirstPanel ? 0 : 1) + isOrderOffset}.
        </p>
      ) : null}
      <div
        className={cn(
          "mb-12 w-full rounded-xl hover:cursor-pointer",
          className,
        )}
        onClick={onClick}
        {...rest}
      >
        {src ? (
          <img
            className="w-full rounded-xl border-2 border-transparent transition-colors duration-300 hover:border-accent"
            src={src}
            alt=""
          />
        ) : null}
      </div>
    </div>
  );
}

export default PanelElement;
