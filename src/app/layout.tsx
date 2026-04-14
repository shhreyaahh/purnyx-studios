import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';



const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'], // Add the desired font weights
});


export const metadata: Metadata = {
  title: "Purnyx Studios - Movie Website",
  description: "Premium movie streaming experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased font-['Inter'] leading-relaxed tracking-[0.025em]">
      <body>{children}</body>
    </html>
  );
}
