'use client'
import { useSidebar } from "@/components/ui/sidebar";
import ThemeSwitch from "./ThemeSwitch";
import UserDropdown from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { RiMenu4Fill } from "react-icons/ri";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className=" fixed border h-14 w-full top-0 left-0 z-30 md:ps-72 flex justify-between items-center bg-white dark:bg-card md:pe-8 px-5">
      <div>search</div>

      <div className=" flex items-center gap-2 ">
        <ThemeSwitch />
        <UserDropdown />
        <Button
          type="button"
          size="icon"
          className="ms-2 md:hidden"
          onClick={toggleSidebar}
        >
          <RiMenu4Fill />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
