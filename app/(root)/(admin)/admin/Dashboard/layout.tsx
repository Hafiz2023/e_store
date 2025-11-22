
"use client"
import React from "react";
import AppSidebar from "@/app/components/Application/Admin/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Topbar from "@/app/components/Application/Admin/Topbar";
import ThemeProvider from "@/app/components/Application/Admin/ThemeProvider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />

            <main className="ps-2 md:w-[calc(100vw-16rem)]">
              <div className="min-h-[calc(100vh-40px)] pb-10 pt-[70px] px-8">
                <Topbar />
                {children}
              </div>

              <div className="border-t flex justify-center items-center bg-gray-50 dark:bg-background text-sm">
                © 2025 Hafiz Developer. All Rights Reserved.
              </div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
