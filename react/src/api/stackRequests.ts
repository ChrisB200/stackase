import type { Stack, StackWithPanels } from "@/types/stack";
import request from "@/utils/request";

export function getStack(id: number) {
  return request<Stack>("get", `/stacks/${id}`);
}

export function getStackByUsernameTitle(username: string, stackTitle: string) {
  return request<StackWithPanels>("get", `stacks/${username}/${stackTitle}`);
}

export function createStackRequest(title: string) {
  return request<Stack>("post", "/stacks", { title });
}
