import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Room } from "@/types/room";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="max-w-[300px] p-6">
      <CardContent className="flex flex-col gap-10">
        <Badge variant="outline">{room.name}</Badge>
        <p>{room.topic}</p>
        <p>200</p>
      </CardContent>
    </Card>
  );
}

export default RoomCard;
