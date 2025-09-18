import {
  createRoomRequest,
  getRoomRequest,
  getRoomsRequest,
} from "@/api/roomRequests";
import type { CreateRoom } from "@/types/room";
import { AppError } from "@/utils/errors";

const getRooms = async () => {
  const { data, ok } = await getRoomsRequest();
  if (ok) return data;

  throw new Error(data.error);
};

const getRoom = async (roomId: string) => {
  const { data, ok } = await getRoomRequest(roomId);
  if (ok) return data;

  throw new Error(data.error);
};

const createRoom = async (values: CreateRoom) => {
  const { data, ok } = await createRoomRequest(values);
  if (ok) return data;

  return AppError({ title: "Room creation error", description: data.error });
};

export { getRooms, getRoom, createRoom };
