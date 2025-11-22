"use client";

export function useToast() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toast = (data: any) => {
    const event = new CustomEvent("toast", { detail: data });
    window.dispatchEvent(event);
  };

  return { toast };
}
