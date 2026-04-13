import { HttpStatusCode } from "../constants";

interface ErrorResponse {
  message: string;
  cause: {
    message: string;
    statusCode: HttpStatusCode;
  };
}

export type { ErrorResponse };
