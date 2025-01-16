import { getServerUser } from '@/actions/auth'
import AppSidebar from '@/components/dashboard/sidebar/app-sidebar'
import SidebarHeader from '@/components/dashboard/sidebar/sidebar-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

export default async function DashboardLayout({children}: {children:ReactNode}) {
  const user = await getServerUser();
  //  const allowedRole = 
  if (!user){
    redirect("/login")
  }
    if (user.role!=="ADMIN"){
      redirect("/login")
    }
  return (
    <div>
       <SidebarProvider>
      <AppSidebar/>
      
      <SidebarInset>
      {/* Side bar header */}
      <SidebarHeader/>
      {children}
      </SidebarInset>
    </SidebarProvider>
    </div>
  )
}
