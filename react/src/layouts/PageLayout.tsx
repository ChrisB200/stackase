import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar/AppSidebar";
import type { ReactNode } from "react";

function PageLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}

export default PageLayout;
