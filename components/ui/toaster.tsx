"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Toast } from "./toast";

export function Toaster() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [toasts, setToasts] = useState<any[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = (e: any) => {
      const toastData = e.detail;

      // Add toast
      setToasts((prev) => [...prev, toastData]);

      // Remove after 10 seconds (SLOW)
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t !== toastData));
      }, 10000); // 10 seconds
    };

    window.addEventListener("toast", listener);
    return () => window.removeEventListener("toast", listener);
  }, []);

  return (
    <div className="fixed top-5 right-5 space-y-4 z-99999">
      <AnimatePresence>
        {toasts.map((t, i) => (
          <Toast key={i} {...t} />
        ))}
      </AnimatePresence>
    </div>
  );
}
