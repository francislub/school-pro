'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PeriodForm from '../forms/academics/period-form'
import { getNormalDate } from "@/lib/getNormalDate"

interface Period {
  id: string
  year: number
  term: number
  startDate: Date
  endDate: Date
  isActive: boolean
}

export default function PeriodsPage({ periods }: { periods: Period[] | undefined }) {
    // Ensure periods is always an array
    const periodsArray = Array.isArray(periods) ? periods : [];
  
    const groupedPeriods = periodsArray.reduce((acc, period) => {
      if (!acc[period.year]) {
        acc[period.year] = [];
      }
      acc[period.year].push(period);
      return acc;
    }, {} as Record<number, Period[]>);

  const sortedYears = Object.keys(groupedPeriods).map(Number).sort((a, b) => b - a)


  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Academic Periods</CardTitle>
          {/* <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create New Period
          </Button> */}
          <PeriodForm />
        </CardHeader>
        <CardContent>
          {sortedYears.map((year) => (
            <div key={year} className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{year}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Term</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedPeriods[year].sort((a, b) => a.term - b.term).map((period) => (
                    <TableRow key={period.id}>
                      <TableCell>Term {period.term}</TableCell>
                      <TableCell>{getNormalDate(period.startDate)}</TableCell>
                      <TableCell>{getNormalDate(period.endDate)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          period.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {period.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

