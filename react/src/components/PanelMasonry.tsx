import PanelImg from "@/pages/Home/PanelImg";
import type { Panel, PanelIncludeStack } from "@/types/panel";
import PanelElement from "./PanelElement";

interface Props {
  panels: PanelIncludeStack[] | Panel[];
  onPanelClick?: any;
}

function PanelMasonry({ panels, onPanelClick }: Props) {
  const handleClick = (panel: PanelIncludeStack | Panel) => {
    if (onPanelClick) {
      onPanelClick(panel);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="columns-[250px] md:columns-[300px] w-full max-w-[1200px]">
        {panels.map((panel) => (
          <PanelElement
            panel={panel}
            key={panel.id}
            onClick={() => handleClick(panel)}
          />
        ))}
      </div>
    </div>
  );
}

export default PanelMasonry;
