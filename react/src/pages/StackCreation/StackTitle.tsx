import { useUpload } from "@/contexts/UploadContext";
import AutoResizingInput from "./AutoResizingInput";

interface Props {
  username: string;
}

function StackTitle({ username }: Props) {
  const { stackTitle, setStackTitle } = useUpload();

  let parsedUsername = `${username}'`.toUpperCase();
  if (!username.endsWith("s")) parsedUsername = `${parsedUsername}S`;

  return (
    <h1 className="text-center text-comic text-5xl mt-15 mb-15">
      <span className="text-accent">{parsedUsername} </span>
      <AutoResizingInput
        value={stackTitle}
        onChange={(e) => setStackTitle(e.target.value)}
      />
    </h1>
  );
}

export default StackTitle;
