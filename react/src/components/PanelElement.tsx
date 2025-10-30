import { STORAGE_URL } from "@/config/constants";
import type { Panel, PanelIncludeStack } from "@/types/panel";

interface PanelElementProps extends React.HTMLAttributes<HTMLDivElement> {
  panel: PanelIncludeStack | Panel;
}

function PanelElement({
  panel,
  className = "",
  onClick,
  ...rest
}: PanelElementProps) {
  return (
    <div>
      <div
        className={`w-full hover:cursor-pointer rounded-xl mb-6  ${className}`}
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
