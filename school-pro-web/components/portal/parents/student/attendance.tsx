import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from 'lucide-react'

type AttendanceProps = {
  selectedTerm: { term: string; year: string }
}

export function Attendance({ selectedTerm }: AttendanceProps) {
  // This is where you'd fetch data based on the selected term
  // For now, we'll use mock data
  const attendanceData = {
    '2023': {
      '1': { percentage: 95, present: 57, absent: 3 },
      '2': { percentage: 97, present: 58, absent: 2 },
      '3': { percentage: 93, present: 56, absent: 4 },
    },
    '2022': {
      '1': { percentage: 94, present: 56, absent: 4 },
      '2': { percentage: 96, present: 58, absent: 2 },
      '3': { percentage: 92, present: 55, absent: 5 },
    },
  }[selectedTerm.year]?.[selectedTerm.term] || { percentage: 0, present: 0, absent: 0 }

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Attendance</CardTitle>
        <Calendar className="h-6 w-6 text-blue-600" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-blue-600">{attendanceData.percentage}%</div>
        <p className="text-sm text-gray-500">Present: {attendanceData.present} days</p>
        <p className="text-sm text-gray-500">Absent: {attendanceData.absent} days</p>
        <p className="mt-2 text-sm font-medium">
          Term {selectedTerm.term}, {selectedTerm.year}
        </p>
      </CardContent>
    </Card>
  )
}

