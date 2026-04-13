import type {
  getPanelsReqQuery,
  Panel,
  PanelIncludeStack,
} from "@/types/panel";
import api from "@/config/api";
import request from "@/utils/request";
import { makeURL } from "@/utils/url";
import { handleRequestError } from "@/utils/errors";
import type { ApiError, ApiFailure, ApiSuccess } from "@/types/api";

export const getPanelsReq = async ({ include }: getPanelsReqQuery) => {
  const url = makeURL({ baseUrl: "/panels", queryParams: { include } });
  return request<PanelIncludeStack[]>("get", url);
};

export const getSimilarPanelsReq = async (id: number | string) => {
  return request<PanelIncludeStack[]>("post", "panels/search", { id: id });
};

export async function createPanelUpload(
  formData: FormData,
): Promise<ApiSuccess<Panel> | ApiFailure<ApiError>> {
  try {
    const response = await api.post<Panel>("/panels", formData, {
      timeout: 120_000,
      transformRequest: [
        (data, headers) => {
          if (data instanceof FormData) {
            delete headers["Content-Type"];
          }
          return data;
        },
      ],
    });
    return { data: response.data, status: response.status, ok: true };
  } catch (e: unknown) {
    return handleRequestError(e) as ApiFailure<ApiError>;
  }
}
