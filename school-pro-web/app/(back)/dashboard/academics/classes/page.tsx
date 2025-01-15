import { getServerSchool } from '@/actions/auth';
import { getAllClasses } from '@/actions/classes'
import ClassListing from '@/components/dashboard/class-listing'
import React from 'react'

export default async function page() {

  const school = await getServerSchool();
  console.log(school)
  const classes = (await getAllClasses(school?.id??""))||[];
  return (
    <div>
      <ClassListing classes={classes}/>
    </div>
  )
}
