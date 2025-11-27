import "./globals.css";
import ProviderWrapper from "./ProviderWrapper";

export const metadata = {
  title: "Your App",
  description: "Next.js app with Redux setup",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ProviderWrapper>
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
