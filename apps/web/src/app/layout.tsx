// import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Link from "next/link";

// @ts-ignore: side-effect import for global CSS
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark') {
                  document.body.classList.add('dark-mode');
                }
              } catch (e) {}
            `,
          }} // renders the dark mode class first on the server side to avoid flickering
        />
        {children}
      </body>
    </html>
  ); 
}