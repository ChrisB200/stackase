import type {
  getPanelsReqQuery,
  GetPanelsRequest,
  PanelIncludeStack,
} from "@/types/panel";
import request from "@/utils/request";
import { makeURL } from "@/utils/url";

export const getPanelsReq = async ({ include }: getPanelsReqQuery) => {
  const url = makeURL({ baseUrl: "/panels", queryParams: { include } });
  return request<PanelIncludeStack[]>("get", url);
};

export const getSimilarPanelsReq = async (id: number | string) => {
  return request<PanelIncludeStack[]>("post", "panels/search", { id: id });
};
