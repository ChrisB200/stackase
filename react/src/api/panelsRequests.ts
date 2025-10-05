import type { getPanelsReqQuery, GetPanelsRequest } from "@/types/panel";
import request from "@/utils/request";
import { makeURL } from "@/utils/url";

export const getPanelsReq = async ({ include }: getPanelsReqQuery) => {
  const url = makeURL({ baseUrl: "/panels", queryParams: { include } });
  return request<GetPanelsRequest[]>("get", url);
};
