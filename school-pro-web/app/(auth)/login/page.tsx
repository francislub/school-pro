import { getServerUser } from '@/actions/auth'
import Login from '@/components/frontend/auth/login'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
  const user = await getServerUser()
      if(user){
        redirect("/dashboard")
      }
  return (
    <div> 
      <Login/>
    </div>
  )
}
