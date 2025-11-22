export async function checkEmailRequest(email: string) {
  try {
    const res = await fetch("/api/auth/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();
    return { ok: res.ok, result };
  } catch {
    return { ok: false, result: { message: "Network Error" } };
  }
}
