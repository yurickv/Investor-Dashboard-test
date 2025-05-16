import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Investor Dashboard",
  description: "Simplified investor dashboard using Supabase and Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-gray-50 text-gray-900 font-sans'>
        <Toaster position='top-right' />
        {children}
      </body>
    </html>
  );
}
