import StudentDetailPage from '@/components/portal/parents/student/StudentDetailPage'
import React from 'react'

export default async function page({ params, }: {params: Promise<{ id: string }>}) {
    const studentId = (await params).id
  return (
    <div>
      <StudentDetailPage />
    </div>
  )
}
