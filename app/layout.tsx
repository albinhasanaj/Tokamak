import type { Metadata } from "next";
import "./globals.css";
import { Component, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { Toaster } from "react-hot-toast";
import Countdown from "@/components/Countdown";

export const metadata: Metadata = {
  title: "Tokamak",
  description: "Tokamak is an amazing website, thats all you have to know :)",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >

      <html lang="en">
        <body className="bg-primary flex" suppressHydrationWarning>
          <Sidebar />
          {children}
          <Toaster />
          <Countdown />
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout