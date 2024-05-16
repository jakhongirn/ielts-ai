import Header from "@/components/Dashboard/layout/header";
import Sidebar from "@/components/Dashboard/layout/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16 overflow-scroll">{children}</main>
      </div>
    </>
  );
}
