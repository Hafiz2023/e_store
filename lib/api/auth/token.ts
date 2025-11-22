export function getResetToken() {
  if (typeof window === "undefined") return null;

  const params = new URL(window.location.href).searchParams;
  return params.get("token");
}
