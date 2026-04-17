import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    <html lang="en" className="h-full antialiased leading-relaxed tracking-[0.025em]">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
