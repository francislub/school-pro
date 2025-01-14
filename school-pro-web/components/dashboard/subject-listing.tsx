"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Beaker, Book, BookOpen, BookOpenCheck, Calendar, CheckCircle, DollarSign, GraduationCap, Pencil, Plus, School, Trash2, User, Users } from 'lucide-react'
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SubjectForm from "./forms/academics/subject-form"
import { Subject } from "@/types/types"

// This is sample data - replace with your actual data fetching logic
const subjects = [
  {
    id: "1",
    name: "Mathematics",
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
  // Add more sample subjects...
];
export type DepartmentOption={
    label:string;
    value:string;
};

export default function SubjectListing({
    departments,
    subjects
}: {
    departments:DepartmentOption[];
    subjects: Subject[]

}) {
    const [selectedSubject, setSelectedSubject] = useState(subjects[0])
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <div className="flex h-screen bg-background">
            <div className="hidden md:flex w-80 flex-col border-r">
                <div className="pb-1 border-b flex justify-between items-center px-3 py-2">
                <div className="flex items-center justify-between gap-2 px-4 py-2">
                    {/* <div className="flex items-center gap-2"> */}
                    <BookOpenCheck className="h-6 w-6"/>
                    <h2 className="text-xl font-semibold">Subjects</h2>
                    </div>
                    <SubjectForm departments={departments}/>
                {/* </div> */}

                </div>
                {subjects.length>0 ? (
                    <ScrollArea className="flex-1">
                    {subjects.map((subject) => (
                        <div key={subject.id}
                        className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer ${
                            selectedSubject.id === subject.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedSubject(subject)}
                        >
                            <span className="font-medium">
                              {subject.name}
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
                    <div className="p-4">
                        <h2>No Subject</h2>
                    </div>
                )}
                </div>

                {/* Mobile sidebar */}
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetContent side="left" className="w-80">
                    <SheetHeader className="flex justify-between items-center">
                    <SheetTitle>Subject</SheetTitle>
                    <Button variant="ghost" size="icon" title="Add Subject">
                        <Pencil className="h-4 w-4" />
                    </Button>
                    </SheetHeader>

                    {subjects.length>0 ? (
                        <ScrollArea className="flex-1 mt-4">
                        {subjects.map((subject, i) => (
                            <div 
                            key={i}
                            className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer ${
                                selectedSubject?.id === subject?.id ? "bg-muted" : ""
                            }`}
                            onClick={() => {
                                setSelectedSubject(subject)
                                setIsMobileOpen(false)
                            }}
                            >
                            <span className="font-medium">
                              {subject.name}
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
                    ): (
                        <div className="p-4">
                            <h2>No Subjects</h2>
                        </div>
                    )}

                </SheetContent>
                </Sheet>

                {/* main content  */}

                {subjects.length>0 && selectedSubject && <div className="flex-1 flex flex-col h-full overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-4">
                          <Button 
                          variant="ghost"
                          size="icon"
                          className="md:hidden"
                          onClick={() => setIsMobileOpen(true)}
                          >
                            <Book className="h-4 w-4"/>
                          </Button>
                          <h1 className="text-2xl font-bold">{selectedSubject.name}</h1>
                        </div>
                    </div>

                    <ScrollArea className="flex-1 p-4">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
                        <Card>
                           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                 subject Code
                            </CardTitle>

                            <Book  className="h-4 w-4 text-muted-foreground"/>
                                
                           </CardHeader>

                           <CardContent>
                               <div className="text-2xl font-bold">
                               {selectedSubject.code}

                               </div>
                               <p className="text-xs text-muted-foreground">
                                {selectedSubject.shortName}
                            </p>
                           </CardContent>
                        </Card>

                        {/* second */}
                        <Card>
                           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                 Category
                            </CardTitle>

                            <Beaker  className="h-4 w-4 text-muted-foreground"/>
                                
                           </CardHeader>

                           <CardContent>
                               <div className="text-2xl font-bold">
                               {selectedSubject.category}
                               </div>
                               <p className="text-xs text-muted-foreground">
                                {selectedSubject.type}
                            </p>
                           </CardContent>
                        </Card>

                        {/* Third */}
                        <Card>
                           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                 Marks
                            </CardTitle>

                            <CheckCircle  className="h-4 w-4 text-muted-foreground"/>
                           </CardHeader>
                           <CardContent>
                               <div className="text-2xl font-bold">
                               {selectedSubject.totalMarks}
                               </div>
                               <p className="text-xs text-muted-foreground">
                                Passing: {selectedSubject.passingMarks}
                            </p>
                           </CardContent>
                        </Card>
                       </div>

                       <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Subject Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />

                                    <span className="text-sm text-muted-foreground"> 
                                     Depatment
                                    </span>
                                    <span className="text-sm">
                                    {selectedSubject.departmentName}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    
                                    <span className="text-sm text-muted-foreground">
                                       Created
                                    </span>

                                    <span className="text-sm font-medium">
                                       {selectedSubject.createdAt}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground"/>
                                    <span className="text-sm text-muted-foreground"> Last Updated </span>
                                    <span className="text-sm ">
                                       {selectedSubject.updatedAt}
                                    </span>

                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground"/>
                                    <span className="text-sm text-muted-foreground"> Slug </span>
                                    <span className="text-sm ">
                                       {selectedSubject.slug}
                                    </span>

                                </div>

                            </CardContent>
                        </Card>
                        <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Subject Properties</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid ">
                                {subjects.map((subject) => (
                                    <div
                                    key={subject.id}
                                    className={`p-4 border rounded ${
                                        subject.id === selectedSubject.id ? "bg-white-100" : ""
                                    }`}
                                    >
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">Active</span>
                                        <span
                                        className={`text-sm ${
                                            selectedSubject.isActive ? "bg-blue-500 text-white px-2 py-1 rounded" : ""
                                        }`}
                                        >
                                        {selectedSubject.isActive ? "YES" : "NO"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">Optional</span>
                                        <span
                                        className={`text-sm ${
                                            selectedSubject.isOptional ? "bg-blue-500 text-white px-2 py-1 rounded" : ""
                                        }`}
                                        >
                                        {selectedSubject.isOptional ? "YES" : "NO"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">Has Theory</span>
                                        <span
                                        className={`text-sm ${
                                            selectedSubject.hasTheory ? "bg-blue-500 text-white px-2 py-1 rounded" : ""
                                        }`}
                                        >
                                        {selectedSubject.hasTheory ? "YES" : "NO"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">Has Practical</span>
                                        <span
                                        className={`text-sm ${
                                            selectedSubject.hasPractical ? "bg-blue-500 text-white px-2 py-1 rounded" : ""
                                        }`}
                                        >
                                        {selectedSubject.hasPractical ? "YES" : "NO"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">Lab Required</span>
                                        <span
                                        className={`text-sm ${
                                            selectedSubject.labRequired ? "bg-blue-500 text-white px-2 py-1 rounded" : ""
                                        }`}
                                        >
                                        {selectedSubject.labRequired ? "YES" : "NO"}
                                        </span>
                                    </div>
                                    </div>
                                ))}
                                </div>
                            </CardContent>
                        </Card>
                        </div>
                        

                            
                        {/* <div className="mt-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Subjects
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {selectedSubject.subjects.map((subject) => (
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
                        </div> */}

                            {/* </CardContent> */}
                        {/* </Card> */}
                       </div>
                    </ScrollArea>
                </div>}
            </div>
    )
}


