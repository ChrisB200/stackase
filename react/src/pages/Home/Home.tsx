import { useUser } from "@/contexts/UserContext";
import HomeGrid from "./HomeGrid";

function Home() {
  const { user } = useUser();

  return (
    <div>
      <HomeGrid />
    </div>
  );
}

export default Home;
