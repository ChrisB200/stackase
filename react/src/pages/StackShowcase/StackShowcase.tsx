import { useParams } from "react-router-dom";

function StackShowcase() {
  const { username, stackTitle } = useParams();

  if (!username || !stackTitle) return <div>404 Not Found</div>;

  return <div>hey</div>;
}

export default StackShowcase;
