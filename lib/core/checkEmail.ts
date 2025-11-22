export async function checkEmail(email: string) {
  if (!email || !email.includes("@")) {
    return { ok: false, message: "Invalid email address" };
  }

  // Example DB check (replace with real DB logic)
  const userExists = email === "test@gmail.com";

  if (!userExists) {
    return { ok: false, message: "Email not found" };
  }

  // Generate mock reset token (replace with real token/JWT logic)
  const token = "reset-token-123";

  return { ok: true, message: "Email verified", token };
}
