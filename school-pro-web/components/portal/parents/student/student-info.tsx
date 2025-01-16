import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function StudentInfo() {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Student Information</CardTitle>
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Student" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2">
          <div className="flex justify-between">
            <dt className="font-medium text-gray-500">Name:</dt>
            <dd>John Doe</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-gray-500">Grade:</dt>
            <dd>10th</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-gray-500">Student ID:</dt>
            <dd>12345</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-gray-500">Date of Birth:</dt>
            <dd>01/01/2007</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}


