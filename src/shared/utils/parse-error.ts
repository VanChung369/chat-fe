import type { ErrorResponse } from "@/shared/types/errors";

export function parseError(
  error: unknown,
  fallback = "An unexpected error occurred",
  isUseFallback = false
): string {
  if (isUseFallback) {
    return fallback;
  }

  if (
    error !== null &&
    typeof error === "object" &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  ) {
    return (error as ErrorResponse).message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}
