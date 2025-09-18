import { getCategories } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";
import RoomCreationForm from "./RoomCreationForm";
import useForm from "@/hooks/useForm";
import type { CreateRoom } from "@/types/room";
import { createRoom } from "@/services/roomService";

function RoomCreation() {
  const { data, isLoading, error } = useQuery({
    queryFn: getCategories,
    queryKey: ["get", "categories"],
    staleTime: Infinity,
  });

  const { values } = useForm<CreateRoom>("create-room");

  const handleSubmit = async () => {
    const response = await createRoom(values);
    console.log(response);

    alert(response);
  };

  if (isLoading) return <div>Loading</div>;

  if (error || !data) return <div>error</div>;

  return <RoomCreationForm options={data} handleSubmit={handleSubmit} />;
}

export default RoomCreation;
