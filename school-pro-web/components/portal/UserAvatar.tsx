"use client";
import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/types";
import { getInitials } from "@/lib/getInitials";

export default function UserAvatar({user}:{user:User}) {
    const initials = getInitials(user?.name);
  return (
   <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <Avatar className="cursor-pointer">
                   {user && user.image && (<AvatarImage
                     src={user.image}
                     alt={user.name}
                   />)}
                   <AvatarFallback>{initials}</AvatarFallback>
                 </Avatar>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                 <DropdownMenuLabel className="text-center">
                   {user?.name}
                 </DropdownMenuLabel>
                 <DropdownMenuLabel className="text-center font-light text-sm text-slate-500">
                 {user?.email}
                 </DropdownMenuLabel>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem>Settings</DropdownMenuItem>
                 <DropdownMenuItem>Support</DropdownMenuItem>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem>Logout</DropdownMenuItem>
               </DropdownMenuContent>
             </DropdownMenu>
  )
}
