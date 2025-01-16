'use client'

import { useState } from 'react'
import { TermSelector } from './term-selector'
import { StudentInfo } from './student-info'
import { Performance } from './performance'
import { Attendance } from './attendance'
import { ReportCard } from './report-card'
import { Leadership } from './leadership'
import { TeacherRemarks } from './teachers-remarks'
import { MedicalReport } from './medical-report'
import { ClassTimetable } from './class-timetable'

export default function StudentDetailPage() {
  const [selectedTerm, setSelectedTerm] = useState({ term: '1', year: '2023' })

  const handleTermChange = (term: string, year: string) => {
    setSelectedTerm({ term, year })
  }

  return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-blue-50 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TermSelector onTermChange={handleTermChange} />
        <StudentInfo />
        <Performance selectedTerm={selectedTerm} />
        <Attendance selectedTerm={selectedTerm} />
        <ReportCard selectedTerm={selectedTerm} />
        <Leadership selectedTerm={selectedTerm} />
        <TeacherRemarks selectedTerm={selectedTerm} />
        <MedicalReport selectedTerm={selectedTerm} />
        <ClassTimetable selectedTerm={selectedTerm} />
        </div>
    </main>
  )
}

