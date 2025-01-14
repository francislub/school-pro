"use client"

import { useState } from "react"
import { format } from "date-fns"
import { BookOpen, Calendar, DollarSign, GraduationCap, Pencil, School, Trash2, User, Users } from 'lucide-react'
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import ClassForm from "./forms/academics/class-form"
import DepartmentForm from "./forms/academics/department-form"
import { Department } from "@/types/types"

// This is sample data - replace with your actual data fetching logic
const departments = [
  {
    id: "1",
    name: "Mathematics Department",
    slug: "mathematics",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-12-01"),
    hodId: "teacher1",
    hodName: "Dr. Lubanjwa Francis",
    hodStartDate: new Date("2023-01-01"),
    budget: 50000,
    budgetYear: "2023",
    teachers: [
      { id: "1", name: "John Doe", email: "john@example.com", subject: ["Algebra", "Calculus"] },
      { id: "2", name: "Jane Smith", email: "jane@example.com", subject: ["Geometry"] },
    ],
    subjects: [
      { id: "1", name: "Algebra", code: "MATH101", teachers: ["John Doe"] },
      { id: "2", name: "Geometry", code: "MATH102", teachers: ["Jane Smith"] },
      { id: "3", name: "Calculus", code: "MATH201", teachers: ["John Doe"] },
    ],
  },
  // Add more sample departments...
]

export default function DepartmentListing({departments, }:{departments:Department[];}) {
    const [selectedDept, setSelectedDept] = useState(departments[0]);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex h-screen bg-background">
            <div className="hidden md:flex w-80 flex-col border-r">
                <div className="border-b pb-1">
                <div className="flex items-center justify-between gap-2 px-4 py-2">
                    <div className="flex items-center gap-2">
                    <School className="h-6 w-6"/>
                    <h2 className="text-xl font-semibold">Departments</h2>
                    </div>
                    <DepartmentForm />
                </div>

                </div>
                {departments.length>0?(
                    <ScrollArea className="flex-1">
                    {departments.map((dept) => (
                        <div key={dept.id}
                        className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer ${
                            selectedDept.id === dept.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedDept(dept)}
                        >
                            <span className="font-medium">
                              {dept.name} Department
                            </span>

                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                </Button>

                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
                ):(
                    <div className="">
                        <h2 className="p-4">No Departments</h2>
                    </div>
                )}
                </div>

                {/* Mobile sidebar */}
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetContent side="left" className="w-80">
                    <SheetHeader>
                    <SheetTitle>Department</SheetTitle>
                    </SheetHeader>

                    {departments.length>0 ?(
                        <ScrollArea className="flex-1 mt-4">
                        {departments.map((dept) => (
                            <div key={dept.id}
                            className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer ${
                                selectedDept.id === dept.id ? "bg-muted" : ""
                            }`}
                            onClick={() => {
                                setSelectedDept(dept)
                                setIsMobileOpen(false)
                            }}
                            >
                            <span className="font-medium">
                              {dept.name} Department
                            </span>

                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon">
                                    <Pencil className="h-4 w-4" />
                                    </Button>

                                    <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        
                    </ScrollArea>
                    ):(
                        <div className="">
                            <h2 className="p-4">No Departments</h2>
                        </div>
                    )}

                </SheetContent>
                </Sheet>

                {/* main content  */}

                {selectedDept && (
                    <div className="flex-1 flex flex-col h-full overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-4">
                          <Button 
                          variant="ghost"
                          size="icon"
                          className="md:hidden"
                          onClick={() => setIsMobileOpen(true)}
                          >
                            <Users className="h-4 w-4"/>
                          </Button>
                          <h1 className="text-2xl font-bold">{selectedDept.name} Department</h1>
                        </div>
                    </div>

                    <ScrollArea className="flex-1 p-4">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
                        <Card>
                           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                 Teachers
                            </CardTitle>

                            <Users  className="h-4 w-4 text-muted-foreground"/>
                                
                           </CardHeader>

                           <CardContent>
                               <div className="text-2xl font-bold">
                                {selectedDept.teachers.length}

                               </div>
                           </CardContent>
                        </Card>

                        <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              Subjects
                            </CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">
                                {selectedDept.subjects.length}
                            </div>
                        </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Annual Budget 
                                </CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />

                            </CardHeader>

                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {/* ${selectedDept.budget?.toLocaleString()} */}
                                    $ 75000
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {/* FY {selectedDept.budgetYear} */}
                                    FY 2023 - 2024
                                </p>
                            </CardContent>
                        </Card>
                       </div>

                       <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Department Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />

                                    <span className="text-sm text-muted-foreground"> 
                                     Created:
                                    </span>
                                    <span className="text-sm">
                                      {format(selectedDept.createdAt, "PPP")}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    
                                    <span className="text-sm text-muted-foreground">
                                       HOD:
                                    </span>

                                    <span className="text-sm font-medium">
                                       {selectedDept.hodName}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground"/>
                                    <span className="text-sm text-muted-foreground"> HOD Since: </span>
                                    <span className="text-sm ">
                                       {selectedDept.hodStartDate ? format(selectedDept.hodStartDate, "PPP") : "Not assigned"}
                                    </span>

                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Teachers</CardTitle>
                        </CardHeader>  
                        <CardContent>
                        <div className="space-y-4">
                            {selectedDept.teachers.map((teacher) => (
                            <div
                            key={teacher.id}
                            className="flex items-center justify-between"
                            >
                            <div>
                                <p className="font-medium">{teacher.name}</p>
                                <p className=" text-sm text-muted-foreground">{teacher.subject}</p>
                            </div>
                            </div>
                        ))}
                        </div>
                        </CardContent>
                        </Card>
                            
                        <div className="mt-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Subjects
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {selectedDept.subjects.map((subject) => (
                                            <div
                                            key={subject.id}
                                            className="flex items-center justify-between p-3 border rounded-lg"
                                            >
                                            <div>
                                                <p className="font-medium">
                                                    {subject.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">{subject.code}</p>
                                            </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                            {/* </CardContent> */}
                        {/* </Card> */}
                       </div>
                    </ScrollArea>
                </div>
                )}
        </div>
    )
}


