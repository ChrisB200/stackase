import { useQuery } from "@tanstack/react-query";
import { getRooms } from "@/services/roomService";
import type { Room } from "@/types/room";
import RoomCard from "./RoomCard";

function HomeGrid() {
  const { data, isLoading, error } = useQuery({
    queryFn: getRooms,
    queryKey: ["get", "rooms"],
    staleTime: 5000,
  });

  if (isLoading || !data) return <div>loading</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {data.map((room: Room) => {
        return <RoomCard key={room.id} room={room} />;
      })}
    </div>
  );
}

export default HomeGrid;
