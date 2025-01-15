"use client";
import React from "react";
import Link from "next/link";
import {
  Calendar,
  LucideIcon,
  Star,
  Stethoscope,
  Users,
  X,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type DoctorAnalyticsProps = {
    title: string;
    count: number;
    icon: LucideIcon;
    unit: string;
    detailLink: string;
  };

export default function PortalAnalytics() {
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
      ];
  return (
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
  )
}
