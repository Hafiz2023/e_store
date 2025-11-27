"use client";

import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { ThemeProvider } from "@/components/theme-provider";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

export default function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );

}
