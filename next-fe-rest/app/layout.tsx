import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { ApolloProvider } from "@/providers/apollo-provider";
import { SheetProvider } from "@/providers/sheet-provider";

import "./globals.css";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "WarehousY",
  description: "Manage your warehouses like a PRO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ApolloProvider>
          <Navbar />
          <main className="h-full">{children}</main>
          <SheetProvider />
          <Toaster />
        </ApolloProvider>
      </body>
    </html>
  );
}
