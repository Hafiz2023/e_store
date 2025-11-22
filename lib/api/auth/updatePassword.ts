export async function updatePasswordRequest(token: string, password: string) {
  try {
    const res = await fetch("/api/auth/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const result = await res.json();
    return { ok: res.ok, result };
  } catch {
    return { ok: false, result: { message: "Network Error" } };
  }
}
