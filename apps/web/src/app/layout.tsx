// import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Link from "next/link";

// @ts-ignore: side-effect import of CSS module without type declarations
import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Full-Stack Blog",
  description: "Blog about full stack development",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <header className="p-4 border-b">
          <nav className="flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/categories">Categories</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
