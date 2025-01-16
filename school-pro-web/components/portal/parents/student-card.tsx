"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { BriefStudent } from "./StudentList"
import Link from "next/link"
import { Button } from "@/components/ui/button"

function calculateAge(dateString: string): number {
    const birthDate = new Date(dateString)

    const currentDate = new Date()

    let age = currentDate.getFullYear() - birthDate.getFullYear()

    const currentMonth = currentDate.getMonth()
    const birthMonth = birthDate.getMonth()

    if (
        birthMonth > currentMonth || 
        (birthMonth === currentMonth && birthDate.getDate() > currentDate.getDate())
    ) {
        age--
    }
    return age
}

export function StudentCard ({
   student
}: {student:BriefStudent}){
    return (
        <Card className="w-full max-w-sm">
            <CardHeader >
                <div className="flex items-center gap-4">
                    <Image 
                      src={student.imageUrl}
                      alt={student.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div>
                        <CardTitle className="text-lg">
                              {student.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{student.regNo}</p>

                    </div>

                </div>

            </CardHeader>

            <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <p>
                        <span className="font-semibold">Class: </span>{student.classTitle}
                    </p>
                    <p>
                        <span className="font-semibold">Stream: </span>{student.streamTitle}
                    </p>

                    <p>
                        <span className="font-semibold">Age: </span>{calculateAge(student.dob)}
                    </p>
                  </div>
            </CardContent>
            <CardFooter>
                <Button asChild variant="outline" className="w-full">
                <Link href={`/portal/parent/student/${student.id}`} >
                   View Details
                </Link>
                </Button>
                

            </CardFooter>

        </Card>
    );
}