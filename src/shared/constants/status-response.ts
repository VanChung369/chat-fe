export const STATUS_RESPONSE = {
  SUCCESS: "success",
  ERROR: "error",
  UNAUTHORIZED: "unauthorized",
  FORBIDDEN: "forbidden",
  NOT_FOUND: "not_found",
  VALIDATION_ERROR: "validation_error",
  PENDING: "pending",
  LOADING: "loading",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;

export const HTTP_STATUS_RESPONSE_MAP = {
  200: STATUS_RESPONSE.SUCCESS,
  201: STATUS_RESPONSE.SUCCESS,
  202: STATUS_RESPONSE.PENDING,
  204: STATUS_RESPONSE.SUCCESS,
  400: STATUS_RESPONSE.ERROR,
  401: STATUS_RESPONSE.UNAUTHORIZED,
  403: STATUS_RESPONSE.FORBIDDEN,
  404: STATUS_RESPONSE.NOT_FOUND,
  409: STATUS_RESPONSE.ERROR,
  422: STATUS_RESPONSE.VALIDATION_ERROR,
  500: STATUS_RESPONSE.FAILED,
} as const;

export type StatusResponse = (typeof STATUS_RESPONSE)[keyof typeof STATUS_RESPONSE];

export type HttpStatusCode = keyof typeof HTTP_STATUS_RESPONSE_MAP;
export type HttpStatusResponse = (typeof HTTP_STATUS_RESPONSE_MAP)[HttpStatusCode];

export function mapHttpStatusToResponse(status: number): StatusResponse {
  return HTTP_STATUS_RESPONSE_MAP[status as HttpStatusCode] ?? STATUS_RESPONSE.ERROR;
}
