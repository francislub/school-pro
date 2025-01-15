"use client";
import React from "react";
import Link from "next/link";
import {
    Bell,
    ExternalLink,
    Home,
    LayoutGrid,
    LineChart,
    Package,
    Package2,
    ShoppingCart,
    Users,
  } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function PortalSidebar() {
    const sidebarLinks = [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: Home,
        },
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
      ];
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
          <Button size="sm" className="w-full">
            Logout
          </Button>
          </div>


        </div>
      </div>
  )
}
