'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function TermSelector({ onTermChange }: { onTermChange: (term: string, year: string) => void }) {
  const [term, setTerm] = useState('1')
  const [year, setYear] = useState('2023')

  const handleTermChange = (newTerm: string) => {
    setTerm(newTerm)
    onTermChange(newTerm, year)
  }

  const handleYearChange = (newYear: string) => {
    setYear(newYear)
    onTermChange(term, newYear)
  }

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Select Term</CardTitle>
      </CardHeader>
      <CardContent className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="term-select">Term</Label>
          <Select onValueChange={handleTermChange} defaultValue={term}>
            <SelectTrigger id="term-select">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Term 1</SelectItem>
              <SelectItem value="2">Term 2</SelectItem>
              <SelectItem value="3">Term 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label htmlFor="year-select">Year</Label>
          <Select onValueChange={handleYearChange} defaultValue={year}>
            <SelectTrigger id="year-select">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}


