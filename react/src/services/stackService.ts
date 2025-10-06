import { getStackByUsernameTitle } from "@/api/stackRequests";
import { decodeStackURL } from "@/utils/url";

export async function getStackWithPanels(username: string, stackTitle: string) {
  const title = decodeStackURL(stackTitle);
  const { data, ok } = await getStackByUsernameTitle(username, title);
  if (ok) return data;

  throw new Error(data.error);
}
