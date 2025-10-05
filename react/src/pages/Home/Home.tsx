import { useUser } from "@/contexts/UserContext";
import { getPanelsOnHomepage } from "@/services/panelsService";
import { useQuery } from "@tanstack/react-query";
import PanelImg from "./PanelImg";

function Home() {
  const { user } = useUser();
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getPanelsOnHomepage,
    queryKey: ["home", "panels"],
  });

  if (isLoading) return <div>Loading</div>;

  if (isError || !data) return <div>error</div>;

  return (
    <div className="columns-[200px] md:columns-[300px]">
      {data.map((panel) => (
        <PanelImg panel={panel} key={panel.id} />
      ))}
    </div>
  );
}

export default Home;
