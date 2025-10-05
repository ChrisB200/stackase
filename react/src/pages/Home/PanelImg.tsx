import { STORAGE_URL } from "@/config/constants";
import type { PanelIncludeStack } from "@/types/panel";
import { createStackURL } from "@/utils/url";
import { useNavigate } from "react-router-dom";

interface Props {
  panel: PanelIncludeStack;
}

function PanelImg({ panel }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(createStackURL(panel.username, panel.title));
  };

  return (
    <div className="w-full mb-6 hover:cursor-pointer" onClick={handleClick}>
      <img
        className="w-full rounded-xl"
        src={`${STORAGE_URL}/panels/${panel.id}.png`}
      />
    </div>
  );
}

export default PanelImg;
