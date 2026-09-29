import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanProvider from "@/context/PlanContext";

import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library and Training Planner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0d0f12] text-white">
        <PlanProvider>
          <Navbar />

          {children}

          <Footer />

          <Toaster position="top-right" />
        </PlanProvider>
      </body>
    </html>
  );
}