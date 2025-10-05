import { getPanelsReq } from "@/api/panelsRequests";
import type { PanelIncludeStack } from "@/types/panel";

export async function getPanelsOnHomepage() {
  const { data, ok } = await getPanelsReq({ include: "stacks" });
  if (ok) return data as PanelIncludeStack[];

  throw new Error(data.error);
}
