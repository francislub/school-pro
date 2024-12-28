import { getAllDepartments } from '@/actions/departments'
import DepartmentListing from '@/components/dashboard/department-listing'
import React from 'react'

export default async function page() {
  const departments = await getAllDepartments()||[]
  return (
    <div>
      <div>
        <DepartmentListing departments={departments}/>
      </div>
    </div>
  )
}
