import { getServerUser } from '@/actions/auth'
import { getStudentsByParentId } from '@/actions/parents'
import { getProfileId } from '@/actions/users'
import { StudentList } from '@/components/portal/parents/StudentList'
import React from 'react'

export default async function page() {
  const user = await getServerUser()
  if(!user){
    return;
  }
  const profileId = await getProfileId(user?.id, user?.role)
  const students = await getStudentsByParentId(profileId??"")|| []
  return (
    <div className='p-8'>
      {students?.length>0?(
        <StudentList students={students}/>
      ):(
        <div className="">
          <h2>You Dont have any Children</h2>
        </div>
      )}
    </div>
  );
}
