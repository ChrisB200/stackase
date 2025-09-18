export interface Room {
  id: string;
  topic: string;
  userId: string;
  createdAt: Date | null;
  categoryId: string;
  name: string;
}

export interface CreateRoom {
  topic: string;
  categoryId: string;
}
