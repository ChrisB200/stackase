import { STORAGE_URL } from "@/config/constants";
import type { Panel, PanelIncludeStack } from "@/types/panel";

interface PanelElementProps extends React.HTMLAttributes<HTMLDivElement> {
  panel: PanelIncludeStack | Panel;
  isOrder?: boolean;
  isOrderOffset?: number;
}

function PanelElement({
  panel,
  className = "",
  isOrder,
  isOrderOffset = 0,
  onClick,
  ...rest
}: PanelElementProps) {
  return (
    <div className="relative">
      {isOrder ? (
        <p className="absolute -top-6 text-muted-foreground">
          {panel.position + 1 + isOrderOffset}.
        </p>
      ) : (
        ""
      )}
      <div
        className={`w-full hover:cursor-pointer rounded-xl mb-12  ${className}`}
        onClick={onClick}
        {...rest}
      >
        <img
          className="w-full border-transparent rounded-xl border-2 hover:border-accent transition-colors duration-300"
          src={`${STORAGE_URL}/panels/${panel.id}.png`}
        />
      </div>
    </div>
  );
}

export default PanelElement;
