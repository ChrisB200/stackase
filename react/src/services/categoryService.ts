import { getCategoriesRequest } from "@/api/categoryRequests";
import { AppError } from "@/utils/errors";

const getCategories = async () => {
  const { data, ok } = await getCategoriesRequest();
  if (ok) return data;

  throw new Error(data.error);
};

export { getCategories };
