"use client";
import React from "react";
import Link from "next/link";
import {
    Bell,
    ExternalLink,
    Home,
    LayoutGrid,
    LineChart,
    LucideIcon,
    Package,
    Package2,
    ShoppingCart,
    Users,
  } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { User, UserRole } from "@/types/types";
import { useUserSession } from "@/store/auth";

interface NavLink {
    title: string
    href: string
    icon: LucideIcon
    count?: number
}


type RoleLinks = {
    [K in UserRole]: NavLink[]
}
function renderLoggedInUserLinks(role:UserRole):NavLink[] {
  const commonLinks =[
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
      },
  ]
  const links:RoleLinks = {
    SUPER_ADMIN:[
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: Home,
          },
    ],
    ADMIN: [
        
          {
            title: "Orders",
            href: "/dashboard/orders",
            icon: ShoppingCart,
            count: 6,
          },
          {
            title: "Products",
            href: "/dashboard/products",
            icon: Package,
          },
          {
            title: "Customers",
            href: "/dashboard/customers",
            icon: Users,
          },
          {
            title: "Categories",
            href: "/dashboard/categories",
            icon: LayoutGrid,
          },
          {
            title: "Analytics",
            href: "/dashboard/analytics",
            icon: LineChart,
          },
    ],
    TEACHER: [
        
          {
            title: "Exams",
            href: "/dashboard/orders",
            icon: ShoppingCart,
            count: 6,
          },
          {
            title: "Products",
            href: "/dashboard/products",
            icon: Package,
          },
    ],
    PARENT: [
        
          {
            title: "Students",
            href: "/dashboard/orders",
            icon: ShoppingCart,
            count: 6,
          },
          {
            title: "Products",
            href: "/dashboard/products",
            icon: Package,
          },
    ],
    SECRETARY: [
        
        {
          title: "Users",
          href: "/dashboard/orders",
          icon: ShoppingCart,
          count: 6,
        },
        {
          title: "Products",
          href: "/dashboard/products",
          icon: Package,
        },
  ],
    STUDENT: [
        
        {
          title: "Timetable",
          href: "/dashboard/orders",
          icon: ShoppingCart,
          count: 6,
        },
        {
          title: "Products",
          href: "/dashboard/products",
          icon: Package,
        },
  ]
  }
  return [...commonLinks, ...(links[role])]
}

export default function PortalSidebar({userRole}:{userRole:UserRole}) {
    const sidebarLinks = renderLoggedInUserLinks(userRole);

    const {user:data, clearSession} = useUserSession();
        
          const router = useRouter();
    
          async function handleLogout(){
            await clearSession();
            router.push("/login")
          }

      const pathname = usePathname();
  return (
    <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>

          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sidebarLinks.map((item, i) => {
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
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                )}
              >
                <ExternalLink className="h-4 w-4" />
                Live Website
              </Link>
            </nav>
          </div>


          <div className="mt-auto p-4">
          <Button onClick={handleLogout} size="sm" className="w-full">
            Logout
          </Button>
          </div>


        </div>
      </div>
  )
}
