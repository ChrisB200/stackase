import request from "@/utils/request";

export function getStack(id: number) {
  return request("get", `/stacks/${id}`);
}
