import { getStackWithPanels } from "@/services/stackService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PanelImg from "../Home/PanelImg";
import { STORAGE_URL } from "@/config/constants";

function StackShowcase() {
  const { username, stackTitle } = useParams();
  if (!username || !stackTitle) return <div>404 Not Found</div>;

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getStackWithPanels(username, stackTitle),
    queryKey: ["get", "stack", username, stackTitle],
  });

  if (isLoading || !data) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  console.log(data);

  return (
    <div>
      <h1>{data.title}</h1>
      {data.panels.map((panel) => (
        <img src={`${STORAGE_URL}/panels/${panel.id}.png`} />
      ))}
    </div>
  );
}

export default StackShowcase;
