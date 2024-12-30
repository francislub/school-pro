import { getServerUser } from '@/actions/auth'
import SchoolOnboardingForm from '@/components/dashboard/forms/school/school-onboarding-form'
import { Card, CardContent } from '@/components/ui/card'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
  const user = await getServerUser()
  const role = user?.role 
  if(!user || role!=="SUPER_ADMIN"){
    redirect("/login")
  }
  return (
    <div>
      <div className="max-w-3xl mx-auto p-16">
        {/* Tab Content */}
        <Card className="border-t-4 border-blue-600 shadow">
          <CardContent className="p-6">
             <SchoolOnboardingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
