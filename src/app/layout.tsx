import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Sans_Tamil, Noto_Serif_Tamil, Poppins } from "next/font/google";
import { ta } from "@/lib/i18n/ta";
import { indexingEnabled, siteUrl } from "@/lib/site";
import "./globals.css";

const serifTa = Noto_Serif_Tamil({
  variable: "--font-serif-ta",
  subsets: ["tamil", "latin"],
  display: "swap",
});

const sansTa = Noto_Sans_Tamil({
  variable: "--font-sans-ta",
  subsets: ["tamil", "latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  preload: false,
});

const themeScript = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}`;

export const metadata: Metadata = {
  title: ta.meta.title,
  description: ta.meta.description,
  metadataBase: new URL(siteUrl),
  robots: indexingEnabled ? undefined : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ta"
      suppressHydrationWarning
      className={`${serifTa.variable} ${sansTa.variable} ${poppins.variable} antialiased`}
    >
      <body className="min-h-screen">
        {/* Sets the saved (or system) theme before first paint so there is no flash. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
