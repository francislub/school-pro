import { getServerSchool } from '@/actions/auth';
import { getAllDepartments } from '@/actions/departments'
import DepartmentListing from '@/components/dashboard/department-listing'
import React from 'react'

export default async function page() {
  const school = await getServerSchool();
  const departments = (await getAllDepartments(school?.id??"")) || [];
  return (
    <div>
        <DepartmentListing departments={departments}/>
      </div>
  );
}
