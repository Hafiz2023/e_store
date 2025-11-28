"use client";

import React from "react";
import Link from "next/link";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import admin from "@/public/assets/images/admin.jpg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import LogoutButton from "./LogoutButton";

// ✅ Replace `useSelect` with proper state management (e.g. Redux useSelector)
import { useSelector } from "react-redux";

const UserDropdown = () => {
  // ✅ Corrected selector hook
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const auth = useSelector((store: any) => store.authStore.auth);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={admin.src} alt="Admin Avatar" />
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>
            <p className="font-semibold">{auth?.name || "Admin User"}</p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/admin/Dashboard/products/add" className="flex items-center gap-2 cursor-pointer">
              <IoShirtOutline />
              <span>New Product</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/admin/Dashboard/orders" className="flex items-center gap-2 cursor-pointer">
              <MdOutlineShoppingBag />
              <span>Orders</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <LogoutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropdown;
