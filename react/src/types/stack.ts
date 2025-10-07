import type { Panel } from "./panel";

export interface DBStack {
  id: number;
  title: string;
  description: string;
}

export interface Stack extends DBStack {
  userId: string;
  username: string;
  name: string;
}

export interface StackWithPanels extends Stack {
  panels: Panel[];
}
