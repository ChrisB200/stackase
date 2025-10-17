import { useUser } from "@/contexts/UserContext";
import { getPanelsOnHomepage } from "@/services/panelsService";
import { useQuery } from "@tanstack/react-query";
import PanelMasonry from "@/components/PanelMasonry";
import { useNavigate } from "react-router-dom";
import PanelImg from "./PanelImg";
import PageLayout from "@/layouts/PageLayout";
import { createStackURL } from "@/utils/url";
import type { PanelIncludeStack } from "@/types/panel";

function Home() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getPanelsOnHomepage,
    queryKey: ["home", "panels"],
  });

  if (isLoading) return <div>Loading</div>;

  if (isError || !data) return <div>error</div>;

  const handleClick = (panel: PanelIncludeStack) => {
    navigate(createStackURL(panel.username, panel.title));
  };

  return (
    <PageLayout>
      <div className="mt-6 px-6">
        <h1 className="text-center text-comic text-5xl mb-15 mt-15">Panels</h1>
        <PanelMasonry panels={data} onPanelClick={handleClick} />
      </div>
    </PageLayout>
  );
}

export default Home;
