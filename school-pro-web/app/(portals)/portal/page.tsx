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
import {
  Bell,
  Calendar,
  CalendarCheck,
  Check,
  CircleEllipsis,
  CircleUser,
  Clock,
  ExternalLink,
  History,
  Home,
  LayoutGrid,
  LineChart,
  LucideIcon,
  Menu,
  Package,
  Package2,
  RefreshCcw,
  Search,
  ShoppingCart,
  Star,
  Stethoscope,
  Users,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import PortalSidebar from "@/components/portal/PortalSidebar";
export function getInitials(name: string | null | undefined): string {
  if (name) {
    // Split the name into an array of words
    const nameParts = name.split(" ");

    // Map each word to its first letter and convert to uppercase
    const initials = nameParts.map((part) => part.charAt(0).toUpperCase());

    // Join the initials to form the final string
    return initials.join("");
  } else {
    return "CN";
  }
}
export interface PatientProps {
  patientId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  gender: string;
  occupation: string;
  dob: string;
}
export type DoctorAnalyticsProps = {
  title: string;
  count: number;
  icon: LucideIcon;
  unit: string;
  detailLink: string;
};
export default function SidebarV1() {
  const analytics: DoctorAnalyticsProps[] = [
    {
      title: "Total Patients",
      count: 1234,
      icon: Users,
      unit: "",
      detailLink: "/analytics/patients",
    },
    {
      title: "Consultations",
      count: 156,
      icon: Stethoscope,
      unit: "",
      detailLink: "/analytics/consultations",
    },
    {
      title: "Appointments",
      count: 42,
      icon: Calendar,
      unit: "",
      detailLink: "/analytics/appointments",
    },
    {
      title: "Rating",
      count: 4.8,
      icon: Star,
      unit: "",
      detailLink: "/analytics/ratings",
    },
    // {
    //   title: "Average Wait Time",
    //   count: 15,
    //   icon: Clock,
    //   unit: "",
    //   detailLink: "/analytics/wait-time",
    // },
  ];
  const status = "APPROVED";
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      
       <PortalSidebar />

      <div className="flex flex-col">
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
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-center">
                Jb web developer
              </DropdownMenuLabel>
              <DropdownMenuLabel className="text-center font-light text-sm text-slate-500">
                jbwebdeveloper@gmail.com
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        
        <div className="flex min-h-screen w-full flex-col">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">
                Welcome, Dr. JB Web Developer
              </h1>
              <div className="">
                <button
                  className={cn(
                    "py-2 px-3 rounded-md text-xs flex items-center space-x-2",
                    status === "APPROVED"
                      ? "bg-green-500 text-white"
                      : status === "PENDING"
                      ? "bg-orange-400"
                      : "bg-red-500 text-white"
                  )}
                >
                  {status === "APPROVED" ? (
                    <Check />
                  ) : status === "PENDING" ? (
                    <RefreshCcw />
                  ) : (
                    <X />
                  )}

                  {status}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
              {analytics.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {item.title}
                      </CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {item.unit}
                        {item.count.toString().padStart(2, "0")}
                      </div>
                      <Link
                        href={item.detailLink}
                        className="text-xs text-muted-foreground"
                      >
                        View Details
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
