"use client"

import * as React from "react";
import {
  ArrowRight,
  Clock,
  DollarSign,
  LayoutDashboard,
  LayoutGrid,
  Package,
  ShoppingCart,
  
} from "lucide-react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Analytics } from "@/actions/analytics";
import { ColorWheelIcon } from "@radix-ui/react-icons";

const salesData = [
  { name: "Sun", value: 0 },
  { name: "Mon", value: 0 },
  { name: "Tue", value: 0 },
  { name: "Wed", value: 0 },
  { name: "Thu", value: 0 },
  { name: "Fri", value: 0 },
  { name: "Sat", value: 0 },
];

const revenueData = [
  { name: "Jun", value: 15000000 },
  { name: "Jul", value: 4000000 },
  { name: "Aug", value: 8000000 },
  { name: "Sep", value: 200000 },
  { name: "Oct", value: 100000 },
  { name: "Nov", value: 50000 },
];

const recentOrders = [
  {
    customer: "Walk In Customer",
    email: "pywomugub@mailinator.com",
    source: "pos",
    status: "DELIVERED",
    date: "2024-10-14",
    amount: "$630",
  },
  {
    customer: "Walk In Customer",
    email: "pywomugub@mailinator.com",
    source: "pos",
    status: "DELIVERED",
    date: "2024-10-14",
    amount: "$630",
  },
  {
    customer: "fatma abdallah",
    email: "fatma@gmail.com",
    source: "store",
    status: "DELIVERED",
    date: "2024-10-14",
    amount: "$30,000",
  },
  {
    customer: "test test",
    email: "test@gmail.pro",
    source: "store",
    status: "DELIVERED",
    date: "2024-10-14",
    amount: "$30,000",
  },
  {
    customer: "Rahul Kumar",
    email: "wedaho2854@jzexport.com",
    source: "store",
    status: "PROCESSING",
    date: "2024-10-07",
    amount: "$600",
  },
];

export default function DashbaordDetails({analytics}:{analytics:Analytics[]}) {
  const colors = [
      "bg-blue-500",
      "bg-teal-500",
      "bg-green-500",
      "bg-orange-500",
  ]
  return (
    <div className="space-y-6">
          {analytics.length>0 && <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {analytics.map((item, i)=> {
              const color =colors[i % colors.length]

              return (
                <Card key={i}>
              <CardHeader className="relative overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {item.title}
                    </p>
                    <p className="text-2xl font-semibold tracking-tight">
                      {item.count.toLocaleString()}
                    </p>

                  </div>
                  <div className={`${color} bg-opacity-10 p-2 rounded-full`}>

                    <LayoutGrid className={`h-4 w-4 ${color.replace("bg-", "text-")}`}/>

                  </div>
                </div>

                <button className="mt-3 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">
                   View Details <span className="ml-1">→</span>
                </button>

                </CardContent>
              </CardHeader>
            </Card>
            
              )
            })}
        </div>
        }
          {/* <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">Sales Chart</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Sun 27th Oct - Sat 2nd Nov
                  </p>
                </div>
                <Button variant="ghost" className="h-8 text-xs">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#f97316"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-muted-foreground">
                  The day with highest sales is{" "}
                  <span className="font-medium">with 0 sales</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Showing the sales for the last 7 days including today
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">
                    Revenue By Category Chart
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Total: $17,722,013
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Bar
                        dataKey="value"
                        fill="#f97316"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-muted-foreground">
                  Leading Month is July and leading Category is Computers
                </div>
                <div className="text-xs text-muted-foreground">
                  Showing total revenue for the past 6 months
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <Tabs defaultValue="recent-orders" className="w-full">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="recent-orders">
                      Recent Orders
                    </TabsTrigger>
                    <TabsTrigger value="best-selling">
                      Best Selling Products
                    </TabsTrigger>
                    <TabsTrigger value="recent-customers">
                      Recent Customers
                    </TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                  <Button variant="ghost" className="h-8 text-xs">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <TabsContent
                  value="recent-orders"
                  className="border-none p-0 pt-3"
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {order.customer}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {order.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{order.source}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === "DELIVERED"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card> */}
      
    </div>
  )
}
