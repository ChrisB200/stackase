import type { CreateRoom, Room } from "@/types/room";
import request from "@/utils/request";

export const getRoomsRequest = async () => {
  return request<Room[]>("get", "rooms/");
};

export const getRoomRequest = async (roomId: string) => {
  return request<Room>("get", `rooms/${roomId}`);
};

export const createRoomRequest = async (values: CreateRoom) => {
  return request<string>("post", "rooms/", values);
};
