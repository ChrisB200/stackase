import { getPanelsReq, getSimilarPanelsReq } from "@/api/panelsRequests";
import type { PanelIncludeStack } from "@/types/panel";

export async function getPanelsOnHomepage() {
  const { data, ok } = await getPanelsReq({ include: "stacks" });
  if (ok) return data as PanelIncludeStack[];

  throw new Error(data.error);
}

export async function getSimilarPanels(id: number | string | undefined) {
  if (!id) return [];
  const { data, ok } = await getSimilarPanelsReq(id);
  if (ok) return data;

  throw new Error(data.error);
}
