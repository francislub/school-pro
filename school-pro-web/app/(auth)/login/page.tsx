import { getServerUser } from '@/actions/auth'
import Login from '@/components/frontend/auth/login'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
  const user = await getServerUser()
      if(user){
        const role = user.role
        const path = role=="ADMIN" || role==="SUPER_ADMIN"?"/dashboard":"/portal"
        redirect(path)
      }
  return (
    <div> 
      <Login/>
    </div>
  )
}
