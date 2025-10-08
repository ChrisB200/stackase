import { STORAGE_URL } from "@/config/constants";
import type { Panel } from "@/types/panel";

interface Props {
  panel: Panel;
}

function PanelCard({ panel }: Props) {
  return (
    <div
      className="
        flex items-center justify-center
        overflow-hidden
        w-full h-full
        max-w-[75vw] max-h-[60vh]
        md:max-w-[800px] md:max-h-[600px]
      "
    >
      <img
        src={`${STORAGE_URL}/panels/${panel.id}.png`}
        className="object-contain w-full h-full"
      />
    </div>
  );
}

export default PanelCard;
