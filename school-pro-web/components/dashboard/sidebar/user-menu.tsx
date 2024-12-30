"use client"

import { AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { getInitials } from '@/lib/getInitials'
import { useUserSession } from '@/store/auth'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react'
import { useRouter } from 'next/router'
import React from 'react'

export default function UserMenu() {

     const {user:data, clearSession} = useUserSession();
    
      const user = {
        name: data?.name,
        email: data?.email,
        avatar: data?.image??"/avatars/shadcn.jpg",
      };
      const initials = getInitials(user.name);
      const router = useRouter();

      async function handleLogout(){
        await clearSession();
        router.push("/login")
      }

  return (
    <div>
      <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                        src={user.avatar}
                        alt={user.name}
                        />
                        <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                        {user.name}
                        </span>
                        <span className="truncate text-xs">
                        {user.email}
                        </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                >
                    <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                            src={user.avatar}
                            alt={user.name}
                        />
                        <AvatarFallback className="rounded-lg">
                            {initials}
                        </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            {user.name}
                        </span>
                        <span className="truncate text-xs">
                            {user.email}
                        </span>
                        </div>
                    </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Sparkles />
                        Upgrade to Pro
                    </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <BadgeCheck />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCard />
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bell />
                        Notifications
                    </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                    <button
                     className="flex items-center space-x-2 w-full"
                     onClick={handleLogout}>
                        <LogOut className="mr-2" />
                        Log out
                    </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
    </div>
  )
}
