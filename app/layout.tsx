import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { MoneyProvider } from "@/lib/money-context";
import { ShopProvider } from "@/lib/shop-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aaron Rhim",
  description: "Aaron Rhim's Project Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
        <MoneyProvider>
          <ShopProvider>
            <Header />
            <main className="mx-auto max-w-5xl px-2 sm:px-6 pt-32">{children}</main>
          </ShopProvider>
        </MoneyProvider>
      </body>
    </html>
  );
}
