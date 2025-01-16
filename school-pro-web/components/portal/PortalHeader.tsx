"use client";
import React from "react";
import Link from "next/link";
import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import UserAvatar from "./UserAvatar";
import {User } from "@/types/types";
import { renderLoggedInUserLinks } from "./PortalSidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function PortalHeader({user}:{user:User}) {
   const Links = renderLoggedInUserLinks(user.role);
   const pathname =usePathname();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
              {Links.map((item, i) => {
                const Icon = item.icon;
                const isActive = item.href === pathname;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      isActive && " bg-muted  text-primary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                    {item.count && (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        {item.count}
                      </Badge>
                    )}
                  </Link>
                );
              })}
              </nav>
              <div className="mt-auto">
              <Button size="sm" className="w-full">
                Logout
            </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
           <UserAvatar user={user}/>
        </header>
  )
}
