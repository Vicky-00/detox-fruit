import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Detox Juice & Water Builder",
  description: "Create your perfect detox drink with fresh fruits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
          {children}
        </main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
