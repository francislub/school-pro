import { getServerSchool } from '@/actions/auth';
import { getAllPeriods } from '@/actions/periods';
import PeriodsPage from '@/components/dashboard/academics/periods-page'
import React from 'react'

export default async function page() {
    const school = await getServerSchool();
    const terms = await getAllPeriods(school?.id?? "") || [];
  return (
    <div>
      <PeriodsPage periods = {terms}/>
    </div>
  )
}
