export async function updatePassword(token: string, password: string) {
  if (!token) return { ok: false, message: "Invalid or expired token" };
  if (!password || password.length < 6)
    return { ok: false, message: "Password must be at least 6 characters" };

  // Example DB update logic
  const updated = true;

  if (!updated) return { ok: false, message: "Failed to update password" };

  return { ok: true, message: "Password updated successfully" };
}
