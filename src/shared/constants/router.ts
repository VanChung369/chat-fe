export const AppRoutes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  verify: "/verify",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  chat: "/",
  monitoring: "/monitoring",
  hub: "/hub",
  contacts: "/contacts",
  settings: "/settings/profile",
  demoUpload: "/demo/upload",
} as const;

export type AppRouteKey = keyof typeof AppRoutes;

export function pathWithQuery(
  route: AppRouteKey | string,
  query?: Record<string, string | number | boolean | undefined | null>
): string {
  if (!query || Object.keys(query).length === 0) {
    return route;
  }

  const serialized = Object.entries(query)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join("&");

  return serialized ? `${route}?${serialized}` : route;
}
