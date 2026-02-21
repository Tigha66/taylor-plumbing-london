import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taylor Plumbing | Central London's Trusted Plumbers | 24/7 Emergency",
  description: "Fast, reliable plumbing services across Central London. Gas Safe registered engineers, 30-minute response, 12-month guarantee. Call 020 7946 0123",
  keywords: "plumber, plumbing, central london, emergency plumber, gas safe, boiler installation, bathroom installation",
  openGraph: {
    title: "Taylor Plumbing | Central London's Trusted Plumbers",
    description: "24/7 Emergency Service | Gas Safe Registered | Call 020 7946 0123",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
