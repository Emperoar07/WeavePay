import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { ExtensionErrorGuard } from "@/components/extension-error-guard";
import { Providers } from "@/components/providers";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "WeavePay",
  description: "Checkout links and merchant settlement for Initia appchains.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <body>
        <ExtensionErrorGuard />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
