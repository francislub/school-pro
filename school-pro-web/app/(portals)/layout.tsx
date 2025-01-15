import { getServerUser } from '@/actions/auth'
import PortalHeader from '@/components/portal/PortalHeader'
import PortalSidebar from '@/components/portal/PortalSidebar'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

export default async function PortalLayout({children}: {children:ReactNode}) {
  const user = await getServerUser()
    if(!user){
      redirect("/login")
    }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          
           <PortalSidebar />
    
          <div className="flex flex-col">
            <PortalHeader />
            
            <div className="flex min-h-screen w-full flex-col">
              {children}
            </div>
          </div>
        </div>
  )
}
