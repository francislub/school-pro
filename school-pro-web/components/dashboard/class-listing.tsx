"use client"

import * as React from "react"
import { ChevronLeft, GraduationCap, Users, Search,Plus, Trash2, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import ClassForm from "./forms/academics/class-form"
import StreamForm from "./forms/academics/stream-form"
import { Class } from "@/types/types"
import Image from "next/image"

interface ClassItem{
    id: number
    name: string
    sections: number
    totalStudents: number
}
interface Section {
    name: string
    students: number
    classTeacher: string
}
interface SectionsData {
    [key: number]: Section[]
}

//sample data -
const classes: ClassItem[] = [
    {id: 1, name: "Class 5", sections: 3, totalStudents: 120 },
    {id: 2, name: "Class 6", sections: 2, totalStudents: 80 },
    {id: 3, name: "Class 7", sections: 4, totalStudents: 160 },
    {id: 4, name: "Class 8", sections: 3, totalStudents: 115 },
    {id: 5, name: "Class 9", sections: 2, totalStudents: 75 },
]

const sections: SectionsData = {
    1: [
    { name: "5A", students: 40, classTeacher: "Ms. Sarah"},
    { name: "5B", students: 38, classTeacher: "Mr. John"},
    { name: "5c", students: 42, classTeacher: "Ms. Emily"},
    ],
};
export default function ClassListing({classes}:{classes:Class[]}){
    const [selectedClass, setSelectedClass] = React.useState<string>("");
    const streams = classes.find((c) => c.id === selectedClass)?.streams ||[]

    return (
        <div className="grid lg:grid-cols-[280px_1fr] h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] gap-2 p-4 pt-2">
         <div className="flex flex-col gap-2">
         <div className="flex items-center justify-between gap-2 px-4 py-2">
            <div className="flex items-center gap-2">
             <GraduationCap className="h-6 w-6"/>
             <h2 className="text-xl font-semibold">Classes</h2>
            </div>
            <ClassForm />
         </div>
            <div className="px-4 py-2">
                <Input 
                placeholder="Search Classes...."
                className="h-9"
                type="search"
                />
                
            </div>
            <ScrollArea className="flex-1">
                <div className="px-2 space-y-3">
                    {classes.map((classItem) => (
                        <div
                        key={classItem.id}
                        className={cn("flex item-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                            selectedClass === classItem.id
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-muted text-muted-foreground"
                        )}
                        >
                            <button 
                            onClick={() => setSelectedClass(classItem.id)}
                            className="flex flex-col items-start gap-1 text-left"
                            >
                                <div className="flex w-full items-center justify-between gap-2">
                                    <span className="font-medium"> {classItem.title}
                                    </span>
                                    <span className="text-xs"> {classItem.streams.length} streams
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Users  className="h-3 w-3"/>
                                {classItem._count.students} students
                                </div>
                            </button>
                            <div className="flex items-center gap-1">
                               <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                       <Button variant="ghost" size="icon" className="h-7 w-7">
                                          <Pencil className="h-3 w-3"/>
                                          <span className="sr-only"> Edit Class</span>
                                       </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Edit Class</p>
                                    </TooltipContent>
                                  </Tooltip>
                               </TooltipProvider>
                               <TooltipProvider>
                                 <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-7 w-7">
                                          <Trash2 className="h-3 w-3"/>
                                          <span className="sr-only">Delete Class</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Delete Class</p>
                                    </TooltipContent>
                                 </Tooltip>
                               </TooltipProvider>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

         </div>
        {/* //  Main content */}
        {selectedClass ?(
            <div className="flex flex-col gap-2 rounded-lg border bg-card">
            <div className="flex items-center justify-between gap-2 px-4 py-2 border-b">
                <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4"/>
                <span className="sr-only">Go back</span>
               </Button>
               <div>
               <h2 className="text-lg font-semibold">
                {classes.find((c) => c.id === selectedClass)?.title}
                    </h2>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span> Classes</span>
                        <span>/</span>
                        <span>{classes.find((c) => c.id === selectedClass)?.title}</span>
                    </div>
               </div>
                </div>
                <StreamForm classId={selectedClass}/>
            </div>
            {/* stream part */}
            {streams.length >0 ? (
                <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {classes.find((c) => c.id === selectedClass)?.streams.map((section) => (
                    <Card key={section.title}>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{section.title}</CardTitle>
                            </div>
                            <div className="flex items-center gap-1">
                                <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                    <Button variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    >
                                        <Pencil className="h-3 w-3"/>
                                        <span className="sr-only">
                                            Edit Stream
                                        </span>
                                    </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Edit Stream</p>
                                    </TooltipContent>
                                </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                        <Button variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    >
                                        <Trash2 className="h-3 w-3"/>
                                        <span className="sr-only">
                                            Delete Stream
                                        </span>
                                    </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                        <p>Delete Stream</p>
                                    </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        <CardDescription>
                            Class Teacher: Francis
                            {/* {section.classTeacher} */}
                        </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-4 w-4"/>
                                {/* {section.students}  */}
                                {section._count.students} students
                            </div>
                        </CardContent>
                    </Card>
                ))}
                </div>
            ):(
                <div className="flex items-center min-h-96 justify-center">

                    <div className="flex flex-col items-center justify-center">
                        <Image src={"/images/empty-box.png"}
                        alt="empty"
                        width={412}
                        height={412}
                        />
                        <p>
                        No Stream For this class
                        </p>
                    </div>
                </div>
            )}
        </div>
        ):(
            <div className="">
                <p>Select the class to see the stream Details</p>
            </div>
        )}
     </div>
    );
}