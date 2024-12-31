import NotFound from '@/app/not-found';
import SchoolAdminForm from '@/components/dashboard/forms/school/school-admin-form';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react'

export default async function page({ 
    params,
    searchParams,
 }: { 
    params: Promise<{ schoolId: string }> 
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const schoolId = (await params).schoolId;
    const name = (await searchParams).name;
  

    if(!schoolId || !name) {
      return <NotFound />;
    }

  return (
    <div className="max-w-3xl mx-auto p-16">
        {/* Tab Content */}
        <Card className="border-t-4 border-blue-600 shadow">
          <CardContent className="p-6">
             <SchoolAdminForm schoolId={schoolId} schoolName={name as string}/>
          </CardContent>
        </Card>
      </div>
  )
}
