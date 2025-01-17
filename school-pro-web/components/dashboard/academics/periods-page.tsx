'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Calendar } from 'lucide-react'
import { CreatePeriodModal } from './periods-create'
import PeriodForm from '../forms/academics/period-form'

interface Period {
  id: string
  year: number
  term: number
  startDate: Date
  endDate: Date
  isActive: boolean
}

// Mock data for periods
const mockPeriods: Period[] = [
  { id: '1', year: 2024, term: 1, startDate: new Date('2024-01-01'), endDate: new Date('2024-04-30'), isActive: true },
  { id: '2', year: 2024, term: 2, startDate: new Date('2024-05-01'), endDate: new Date('2024-08-31'), isActive: false },
  { id: '3', year: 2024, term: 3, startDate: new Date('2024-09-01'), endDate: new Date('2024-12-31'), isActive: false },
  { id: '4', year: 2023, term: 1, startDate: new Date('2023-01-01'), endDate: new Date('2023-04-30'), isActive: false },
  { id: '5', year: 2023, term: 2, startDate: new Date('2023-05-01'), endDate: new Date('2023-08-31'), isActive: false },
  { id: '6', year: 2023, term: 3, startDate: new Date('2023-09-01'), endDate: new Date('2023-12-31'), isActive: false },
]

export default function PeriodsPage() {
  const [periods, setPeriods] = useState<Period[]>(mockPeriods)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const groupedPeriods = periods.reduce((acc, period) => {
    if (!acc[period.year]) {
      acc[period.year] = []
    }
    acc[period.year].push(period)
    return acc
  }, {} as Record<number, Period[]>)

  const sortedYears = Object.keys(groupedPeriods).map(Number).sort((a, b) => b - a)

  const handleCreatePeriod = (newPeriod: Omit<Period, 'id'>) => {
    const periodToAdd = {
      ...newPeriod,
      id: (periods.length + 1).toString(), // In a real app, this would be handled by the backend
    }
    setPeriods([...periods, periodToAdd])
    setIsCreateModalOpen(false)
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Academic Periods</CardTitle>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create New Period
          </Button>
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
                      <TableCell>{period.startDate.toLocaleDateString()}</TableCell>
                      <TableCell>{period.endDate.toLocaleDateString()}</TableCell>
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
      <PeriodForm
        // open={isCreateModalOpen}
        // onOpenChange={setIsCreateModalOpen}
        // onCreatePeriod={handleCreatePeriod}
      />
    </div>
  )
}

