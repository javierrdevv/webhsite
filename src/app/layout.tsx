import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollToTop from "@/components/ui/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://landingpage2.ndadev.my.id"),
  title: "nda.dev | Digital Artifacts",
  description:
    "Multidisciplinary developer focused on high-fidelity interfaces and cinematic web experiences.",
  keywords: [
    "creative developer",
    "frontend developer",
    "interface designer",
    "web animation",
    "motion design",
    "nda.dev",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "nda.dev",
    title: "nda.dev | Digital Artifacts",
    description:
      "Multidisciplinary developer focused on high-fidelity interfaces and cinematic web experiences.",
    images: [
      {
        url: "/hero.jpg",
        width: 2560,
        height: 1440,
        alt: "nda.dev — digital artifacts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "nda.dev | Digital Artifacts",
    description:
      "Multidisciplinary developer focused on high-fidelity interfaces and cinematic web experiences.",
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
