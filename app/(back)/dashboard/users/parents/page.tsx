import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div>
      <Button asChild>
        <Link href={"/dashboard/users/parents/new"}>New Parent</Link>
      </Button>
    </div>
  )
}
