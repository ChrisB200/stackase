import { Home, SquareStack, SquarePlus, Compass } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Explore", url: "/explore", icon: Compass },
  { title: "Create", url: "/create", icon: SquarePlus },
  { title: "Stacks", url: "/stacks", icon: SquareStack },
];

function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="flex items-center justify-center p-4 text-lg font-semibold">
        Logo
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="px-2">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="h-12 justify-start px-3 text-base group-data-[collapsible=icon]:justify-center"
                >
                  <a
                    href={item.url}
                    className="flex w-full items-center gap-3 group-data-[collapsible=icon]:w-auto"
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="truncate group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
