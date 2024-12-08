import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div>
      <Button asChild>
        <Link href={"/dashboard/user/parents/new"}>New Parent</Link>
      </Button>
    </div>
  )
}
