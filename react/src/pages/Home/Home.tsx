import { useUser } from "@/contexts/UserContext";

function Home() {
  const { user } = useUser();

  return <div></div>;
}

export default Home;
