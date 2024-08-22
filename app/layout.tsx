import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tokamak",
  description: "Tokamak is an amazing website, thats all you have to know :)",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-primary">
        {children}
      </body>
    </html>
  )
}

export default RootLayout