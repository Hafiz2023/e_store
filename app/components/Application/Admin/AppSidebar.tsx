"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logoBlack from "@/public/assets/images/logo-black.png";
import logowhite from "@/public/assets/images/logo-white.png";
import { Button } from "@/components/ui/button";

import { IoMdClose } from "react-icons/io";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { adminAppSidebarMenu } from "@/lib/AdminSidebarMenu";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar className=" z-50 ">
      <SidebarHeader className="border-b h-14 p-0">
        <div className="flex justify-between items-center px-4">
          <Image
            src={logoBlack.src}
            height={50}
            width={logoBlack.width}
            className="black dark:hidden h-[50px] w-auto"
            alt="logo dark"
          />
          <Image
            src={logowhite.src}
            height={50}
            width={logowhite.width}
            className="hidden dark:block h-[50px] w-auto"
            alt="logo white"
          />
          <Button
            type="button"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <IoMdClose />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-3">
        <SidebarMenu>
          {adminAppSidebarMenu.map((menu, index) => (
            <Collapsible key={index} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    className="font-semibold px-2 py-5 "
                  >
                    <Link href={menu?.url}>
                      <menu.icon />
                      {menu.title}
                      {menu.submenu && menu.submenu.length > 0 && (
                        <LuChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {menu.submenu && menu.submenu.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menu.submenu.map((submenuItem, submenuIndex) => (
                        <SidebarMenuItem key={submenuIndex}>
                          <SidebarMenuSubButton asChild className="px-2 py-5">
                            <Link href={submenuItem.url}>
                              {submenuItem.title}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
