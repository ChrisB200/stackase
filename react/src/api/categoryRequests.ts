import request from "@/utils/request";
import type { Category } from "@/types/categories";

export const getCategoriesRequest = async () => {
  return request<Category[]>("get", "/categories");
};
