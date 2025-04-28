
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <ScrollArea className="flex-1">
          <main className="container py-6 md:py-8">
            {children}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MainLayout;
