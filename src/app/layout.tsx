import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer"


export const metadata: Metadata = {
  title: "CloudStack Daily",
  description: "Expert insights and practical guides for cloud architecture and DevOps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
